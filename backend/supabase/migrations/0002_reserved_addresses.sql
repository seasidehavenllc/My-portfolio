-- Customer sites live on seasidehavenllc.com, next to the studio's own website and email,
-- so the subdomains those use can't be taken as customer addresses.
create or replace function public.sites_guard() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.slug in ('www', 'app', 'api', 'admin', 'mail', 'email', 'ftp', 'blog', 'shop', 'store', 'help',
                  'support', 'status', 'dashboard', 'account', 'login', 'signup', 'billing', 'editor', 'sites', 'cdn', 'static', 'assets',
                  'webmail', 'autodiscover', 'autoconfig', 'smtp', 'imap', 'pop', 'studios', 'studio', 'seasidehaven', 'portal') then
    raise exception 'That address is reserved. Please pick another.';
  end if;
  if tg_op = 'INSERT' and (select count(*) from public.sites s where s.owner = new.owner) >= 20 then
    raise exception 'You have reached the limit of 20 sites.';
  end if;
  new.updated_at := now();
  return new;
end $$;
