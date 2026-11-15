-- The Free plan.
-- Every site starts on plan 'free'. Until now a free site could only be designed. From here a free
-- site can also be published, with limits that are checked here in the database, so they hold no
-- matter what the website or the app sends:
--   * only at its free address (<name>.<your domain>), never on the customer's own domain
--   * only a starter design
--   * only so many published free sites per account
--   * with a small "Made with Seaside Haven Studios" badge
-- Paying ($5 a month) lifts all four. Downloading still needs a paid plan.

-- THE LIMITS. Change them here, and change the same numbers in CONFIG.free in assets/config.js
-- (that copy only controls what the screens say and show; this one is the one that is enforced).
create or replace function public.free_limits() returns jsonb
language sql immutable set search_path = '' as $$
  select jsonb_build_object(
    -- how many free sites one account may have online at once
    'sites', 1,
    -- the starter designs a free site may be published with (ids from assets/templates.js)
    'templates', jsonb_build_array('harbor', 'ember', 'velvet', 'pulse', 'counsel', 'bloom', 'tide', 'saltwater', 'driftwood'),
    -- the badge added to free sites; set to '' for no badge
    'badge', '<a href="https://seasidehavenllc.github.io/My-portfolio/?ref=badge" target="_blank" rel="noopener" style="position:fixed;right:12px;bottom:12px;z-index:2147483647;display:inline-flex;align-items:center;padding:8px 13px;border-radius:999px;background:#05080C;color:#F4F7F8;font:600 12px/1 system-ui,-apple-system,Segoe UI,sans-serif;letter-spacing:0;text-decoration:none;border:1px solid rgba(255,255,255,.16);box-shadow:0 6px 18px rgba(0,0,0,.35)">Made with Seaside Haven Studios</a>'
  )
$$;
revoke all on function public.free_limits() from public;
grant execute on function public.free_limits() to anon, authenticated;

create or replace function public.sites_guard() returns trigger
language plpgsql set search_path = '' as $$
declare
  lim jsonb;
  live_now boolean;
  was_live boolean;
  over boolean;
  paid_design boolean;
begin
  if new.slug in ('www', 'app', 'api', 'admin', 'mail', 'email', 'ftp', 'blog', 'shop', 'store', 'help',
                  'support', 'status', 'dashboard', 'account', 'login', 'signup', 'billing', 'editor', 'sites', 'cdn', 'static', 'assets',
                  'webmail', 'autodiscover', 'autoconfig', 'smtp', 'imap', 'pop', 'studios', 'studio', 'seasidehaven', 'portal') then
    raise exception 'That address is reserved. Please pick another.';
  end if;
  if tg_op = 'INSERT' and (select count(*) from public.sites s where s.owner = new.owner) >= 20 then
    raise exception 'You have reached the limit of 20 sites.';
  end if;

  if new.plan = 'free' then
    lim := public.free_limits();
    -- connecting your own domain is a paid feature (a domain kept from a cancelled plan may stay
    -- saved, it just isn't served)
    if new.custom_domain is not null and (tg_op = 'INSERT' or new.custom_domain is distinct from old.custom_domain) then
      raise exception 'Connecting your own domain is part of the paid plan. Upgrade this site to use it.';
    end if;
    live_now := new.html is not null and new.published_at is not null;
    was_live := tg_op = 'UPDATE' and old.plan = 'free' and old.html is not null and old.published_at is not null;
    -- only look when the site is being published (or republished), not on every autosave
    if live_now and (tg_op = 'INSERT' or not was_live or new.published_at is distinct from old.published_at or new.html is distinct from old.html) then
      over := not was_live and (select count(*) from public.sites s
                where s.owner = new.owner and s.id <> new.id and s.plan = 'free' and s.html is not null and s.published_at is not null) >= (lim->>'sites')::int;
      paid_design := not (lim->'templates') ? split_part(coalesce(new.design->>'src', ''), '~', 1);
      if over or paid_design then
        if tg_op = 'UPDATE' and old.plan <> 'free' then
          -- a paid plan just ended and this site doesn't fit the Free plan: take it offline quietly.
          -- The design and the page are kept, and paying again brings it straight back.
          new.published_at := null;
        elsif paid_design then
          raise exception 'This design is part of the paid plan. Upgrade this site, or switch to a starter design to publish free.';
        else
          raise exception 'The Free plan includes % published %. Upgrade this site to publish more.', lim->>'sites',
            case when (lim->>'sites')::int = 1 then 'site' else 'sites' end;
        end if;
      end if;
    end if;
  end if;

  new.updated_at := now();
  return new;
end $$;
revoke execute on function public.sites_guard() from anon, authenticated, public;

-- What the publishing service calls: the page for an address.
--   monthly plan: at the free address or the customer's own domain, as designed
--   free plan:    at the free address only, with the badge added
create or replace function public.site_html(sub text default null, domain text default null) returns text
language sql stable security definer set search_path = '' as $$
  select case when s.plan = 'free' then s.html || coalesce(public.free_limits()->>'badge', '') else s.html end
  from public.sites s
  where s.html is not null
    and ((s.plan = 'monthly' and ((sub is not null and s.slug = lower(sub)) or (domain is not null and s.custom_domain = lower(domain))))
      or (s.plan = 'free' and s.published_at is not null and sub is not null and s.slug = lower(sub)))
  limit 1
$$;
revoke all on function public.site_html(text, text) from public;
grant execute on function public.site_html(text, text) to anon, authenticated;
