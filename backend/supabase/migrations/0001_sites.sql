-- Customer sites for the site editor.
-- One row per site. The owner edits `design`; publishing stores the finished page in `html`.
-- `plan` is only ever changed by the Stripe webhook (service role), never by the customer.

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null default 'My site' check (char_length(name) between 1 and 80),
  -- the part before the dot: joesbakery.<your domain>
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'),
  -- the customer's own domain, if they connect one (lowercase host name, no scheme)
  custom_domain text unique check (custom_domain is null or custom_domain ~ '^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$'),
  design jsonb not null check (pg_column_size(design) < 8000000),
  html text check (html is null or octet_length(html) < 10000000),
  published_at timestamptz,
  -- free: design only. monthly: hosted and live. owned: bought outright, may download.
  plan text not null default 'free' check (plan in ('free', 'monthly', 'owned')),
  stripe_customer text,
  stripe_subscription text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sites_owner_idx on public.sites (owner);

-- addresses customers may not take
create or replace function public.sites_guard() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.slug in ('www', 'app', 'api', 'admin', 'mail', 'email', 'ftp', 'blog', 'shop', 'store', 'help',
                  'support', 'status', 'dashboard', 'account', 'login', 'signup', 'billing', 'editor', 'sites', 'cdn', 'static', 'assets') then
    raise exception 'That address is reserved. Please pick another.';
  end if;
  if tg_op = 'INSERT' and (select count(*) from public.sites s where s.owner = new.owner) >= 20 then
    raise exception 'You have reached the limit of 20 sites.';
  end if;
  new.updated_at := now();
  return new;
end $$;

create trigger sites_guard before insert or update on public.sites
  for each row execute function public.sites_guard();

alter table public.sites enable row level security;

create policy "owners read their sites" on public.sites for select to authenticated using (owner = (select auth.uid()));
create policy "owners add sites" on public.sites for insert to authenticated with check (owner = (select auth.uid()));
create policy "owners change their sites" on public.sites for update to authenticated using (owner = (select auth.uid())) with check (owner = (select auth.uid()));
create policy "owners delete their sites" on public.sites for delete to authenticated using (owner = (select auth.uid()));

-- Customers can only write the columns that are theirs to change. plan and the Stripe ids are not.
revoke all on public.sites from anon, authenticated;
grant select, delete on public.sites to authenticated;
grant insert (name, slug, design) on public.sites to authenticated;
grant update (name, slug, custom_domain, design, html, published_at) on public.sites to authenticated;

-- What the publishing service calls: the page for an address, only while the site is on the monthly plan.
-- Pass the subdomain (joesbakery) for <name>.<your domain>, or the full host for a connected domain.
create or replace function public.site_html(sub text default null, domain text default null) returns text
language sql stable security definer set search_path = '' as $$
  select s.html from public.sites s
  where s.plan = 'monthly' and s.html is not null
    and ((sub is not null and s.slug = lower(sub)) or (domain is not null and s.custom_domain = lower(domain)))
  limit 1
$$;
revoke all on function public.site_html(text, text) from public;
grant execute on function public.site_html(text, text) to anon, authenticated;

-- Lets the dashboard say "that address is taken" before saving.
create or replace function public.slug_free(wanted text) returns boolean
language sql stable security definer set search_path = '' as $$
  select not exists (select 1 from public.sites s where s.slug = lower(wanted))
$$;
revoke all on function public.slug_free(text) from public;
grant execute on function public.slug_free(text) to authenticated;

-- Supabase grants new functions to anon by default; these two are for signed-in customers and triggers only.
revoke execute on function public.slug_free(text) from anon;
revoke execute on function public.sites_guard() from anon, authenticated, public;
-- site_html stays callable without signing in on purpose: the publishing service uses it, and it only
-- returns pages that are already public on the internet.
