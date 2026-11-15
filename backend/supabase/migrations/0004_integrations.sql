-- Integrations: features customers switch on for their own site (maps, booking, contact form inbox,
-- analytics, chat, buy buttons and more). Customers fill in their own link or ID; nobody at the studio
-- sets anything up per customer.
--
-- Which integrations a site may use depends on its plan, and that is decided here on the server:
--   Website plan ($5/month)  maps, booking, form
--   Pro plan ($15/month)     everything
-- Customers can save any settings they like, but the publishing service only ever receives the
-- integrations their plan includes (site_addons below), so nothing can be unlocked from the browser.

-- Pro is the monthly plan with the Pro tier. Only the Stripe function (service role) changes it.
alter table public.sites add column if not exists tier text not null default 'website'
  check (tier in ('website', 'pro'));

-- { "<integration>": { "on": true, ...that integration's fields } }
alter table public.sites add column if not exists integrations jsonb not null default '{}'::jsonb
  check (jsonb_typeof(integrations) = 'object' and pg_column_size(integrations) < 65536);

grant update (integrations) on public.sites to authenticated;

-- What the publishing service calls next to site_html: the switched-on integrations this site's plan
-- includes. The Zapier/webhook address is left out on purpose: it is only used by the forms function,
-- so it is never visible to the public.
create or replace function public.site_addons(sub text default null, domain text default null) returns jsonb
language sql stable security definer set search_path = '' as $$
  select coalesce((
    select jsonb_object_agg(e.key, e.value)
    from jsonb_each(s.integrations) e
    where jsonb_typeof(e.value) = 'object' and e.value -> 'on' = 'true'::jsonb
      and (e.key in ('maps', 'booking', 'form')
        or (s.tier = 'pro' and e.key in ('analytics', 'pixel', 'buy', 'newsletter', 'chat', 'embed')))
  ), '{}'::jsonb)
  from public.sites s
  where s.plan = 'monthly'
    and ((sub is not null and s.slug = lower(sub)) or (domain is not null and s.custom_domain = lower(domain)))
  limit 1
$$;
revoke all on function public.site_addons(text, text) from public;
grant execute on function public.site_addons(text, text) to anon, authenticated;

-- Contact form inbox. Visitors' messages are added by the forms function (service role) only;
-- site owners can read, mark as read and delete the messages for their own sites.
create table if not exists public.form_messages (
  id uuid primary key default gen_random_uuid(),
  site uuid not null references public.sites (id) on delete cascade,
  name text check (name is null or char_length(name) <= 200),
  email text check (email is null or char_length(email) <= 320),
  message text not null check (char_length(message) between 1 and 5000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists form_messages_site_idx on public.form_messages (site, created_at desc);

alter table public.form_messages enable row level security;
create policy "owners read their messages" on public.form_messages for select to authenticated
  using (exists (select 1 from public.sites s where s.id = site and s.owner = (select auth.uid())));
create policy "owners mark their messages" on public.form_messages for update to authenticated
  using (exists (select 1 from public.sites s where s.id = site and s.owner = (select auth.uid())))
  with check (exists (select 1 from public.sites s where s.id = site and s.owner = (select auth.uid())));
create policy "owners delete their messages" on public.form_messages for delete to authenticated
  using (exists (select 1 from public.sites s where s.id = site and s.owner = (select auth.uid())));

revoke all on public.form_messages from anon, authenticated;
grant select, delete on public.form_messages to authenticated;
grant update (read) on public.form_messages to authenticated;
