/* Publishing service for customer sites (Cloudflare Worker).

   Every request to <name>.<your domain>, or to a customer's own connected domain, lands here.
   The Worker asks the database for that host's published page and returns it.
   A site is only returned while its monthly plan is active, so paying and cancelling
   switch sites on and off with no manual step.

   Settings (Worker, Settings, Variables):
     SUPABASE_URL   https://<project>.supabase.co
     SUPABASE_KEY   the project's publishable key
     BASE_DOMAIN    the domain customer sites live under, e.g. example.com
     HOME_URL       where to send people who open an address with no site (your main website)

   Route: *.<your domain>/*  (plus a proxied wildcard DNS record "*" for the domain) */

const page = (title, text, home) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05080C;color:#A9B4BC;font:16px/1.5 system-ui,sans-serif;text-align:center;padding:24px}h1{color:#F4F7F8;font-size:1.6rem;margin:0 0 8px}a{color:#7FE6F2}</style></head><body><main><h1>${title}</h1><p>${text}</p>${home ? `<p><a href="${home}">Build your own site</a></p>` : ""}</main></body></html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url), host = url.hostname.toLowerCase();
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });
    if (!/^[a-z0-9.-]{1,253}$/.test(host)) return new Response("Bad request", { status: 400 });

    const cache = caches.default, key = new Request(`https://${host}/__site`, { method: "GET" });
    let res = await cache.match(key);
    if (!res) {
      const r = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/site_html`, {
        method: "POST",
        headers: { apikey: env.SUPABASE_KEY, Authorization: `Bearer ${env.SUPABASE_KEY}`, "Content-Type": "application/json" },
        /* joesbakery.example.com looks up the subdomain; any other host is a connected domain */
        body: JSON.stringify(host.endsWith("." + env.BASE_DOMAIN) ? { sub: host.slice(0, -(env.BASE_DOMAIN.length + 1)) } : { domain: host.replace(/^www\./, "") })
      });
      if (!r.ok) return new Response(page("We'll be right back", "This site is having a short hiccup. Please try again in a minute."), { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } });
      const html = await r.json();
      if (typeof html !== "string" || !html) {
        return new Response(page("No site here yet", "This address isn't published right now.", env.HOME_URL), { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
      }
      res = new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          // short cache: an update or a cancelled plan shows up within a minute
          "Cache-Control": "public, max-age=60",
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        }
      });
      ctx.waitUntil(cache.put(key, res.clone()));
    }
    return request.method === "HEAD" ? new Response(null, { status: res.status, headers: res.headers }) : res;
  }
};
