-- Downloading a site is only for sites bought outright (plan 'owned', the one-time "Own it" price).
-- Free, Website and Pro sites can be edited and published, but their finished page can't be taken away.
--
-- Until now any signed-in customer could read the published page (the html column) of their own sites
-- straight from the database, whatever their plan. From here:
--   * customers can read every column of their sites except html
--   * the page file comes only from site_download(), which checks the plan here on the server
-- The publishing service is unaffected: it reads pages through site_html(), which runs as the owner.
--
-- Run this AFTER the website change that goes with it is live (assets/cloud.js no longer asks for
-- select=*), or the editor and dashboard can't open sites until it is.

revoke select on public.sites from authenticated;
grant select (id, owner, name, slug, custom_domain, design, published_at, plan, stripe_customer,
              stripe_subscription, created_at, updated_at, tier, integrations) on public.sites to authenticated;

-- The Free plan checks in sites_guard() count published pages, which looks at html. Customers can no
-- longer read that column, so the guard now runs as its owner. It only ever looks at the same
-- customer's own rows (s.owner = new.owner), and nobody can call it directly.
alter function public.sites_guard() security definer;
revoke execute on function public.sites_guard() from anon, authenticated, public;

-- The download: the published page of one of your own sites, only when it was bought outright.
create or replace function public.site_download(site uuid) returns text
language plpgsql stable security definer set search_path = '' as $$
declare
  p text;
  h text;
begin
  select s.plan, s.html into p, h from public.sites s where s.id = site and s.owner = (select auth.uid());
  if not found then
    raise exception 'That site isn''t in your account.';
  end if;
  if p <> 'owned' then
    raise exception 'Downloading your site comes with Own it, the one-time plan. Buy this site outright to download it.';
  end if;
  return h;
end $$;
revoke all on function public.site_download(uuid) from public;
revoke execute on function public.site_download(uuid) from anon;
grant execute on function public.site_download(uuid) to authenticated;
