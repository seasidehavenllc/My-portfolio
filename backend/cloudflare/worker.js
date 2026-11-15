/* Publishing service for customer sites (Cloudflare Worker).

   Every request to <name>.<your domain>, or to a customer's own connected domain, lands here.
   The Worker asks the database for that host's published page and returns it.
   A site is only returned while its plan allows it, so paying and cancelling
   switch sites on and off with no manual step.

   Integrations: the customer switches features on for their site in their dashboard (maps, booking,
   contact form, analytics, chat, buy buttons...). The database only hands this Worker the ones the
   site's plan includes, and the Worker adds them to the page as it goes out, from the customer's own
   links and IDs, checked and escaped here. Nobody at the studio sets anything up per customer.
   Contact form messages are posted to /__form on the customer's site and passed to the forms function.

   Settings (Worker, Settings, Variables):
     SUPABASE_URL   https://<project>.supabase.co
     SUPABASE_KEY   the project's publishable key
     BASE_DOMAIN    the domain customer sites live under, e.g. example.com
     HOME_URL       where to send people who open an address with no site (your main website)
     KEEP           optional: more subdomains you already use, e.g. "shop,portal", left untouched
     APPLE_TEAM_ID  your 10-character Apple Team ID, so the iPhone app can fill in saved passwords

   Route: *.<your domain>/*  (plus a proxied wildcard DNS record "*" for the domain) */

const page = (title, text, home) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05080C;color:#A9B4BC;font:16px/1.5 system-ui,sans-serif;text-align:center;padding:24px}h1{color:#F4F7F8;font-size:1.6rem;margin:0 0 8px}a{color:#7FE6F2}</style></head><body><main><h1>${title}</h1><p>${text}</p>${home ? `<p><a href="${home}">Build your own site</a></p>` : ""}</main></body></html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url), host = url.hostname.toLowerCase();
    /* addresses you already use on your domain (your main website, email) go to where they
       always went. Add more in the KEEP variable, comma separated. */
    const keep = ["www", "mail", "webmail", "autodiscover", "autoconfig", "smtp", "imap", "pop", "ftp", "studios", ...String(env.KEEP || "").split(",")].map(s => s.trim().toLowerCase()).filter(Boolean);
    if (host === env.BASE_DOMAIN || keep.some(k => host === `${k}.${env.BASE_DOMAIN}`)) return fetch(request);
    /* app.<domain> tells iPhones which app may use passwords saved for it (Password AutoFill) */
    if (host === `app.${env.BASE_DOMAIN}`) {
      if (url.pathname === "/.well-known/apple-app-site-association" && env.APPLE_TEAM_ID)
        return new Response(JSON.stringify({ webcredentials: { apps: [`${String(env.APPLE_TEAM_ID).trim()}.com.seasidehaven.sitebuilder`] } }),
          { headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" } });
      return Response.redirect(env.HOME_URL || `https://${env.BASE_DOMAIN}`, 302);
    }
    if (!/^[a-z0-9.-]{1,253}$/.test(host)) return new Response("Bad request", { status: 400 });
    /* joesbakery.example.com looks up the subdomain; any other host is a connected domain */
    const who = host.endsWith("." + env.BASE_DOMAIN) ? { sub: host.slice(0, -(env.BASE_DOMAIN.length + 1)) } : { domain: host.replace(/^www\./, "") };

    if (url.pathname === "/__form" && request.method === "POST") return sendForm(request, env, host, who);
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405 });

    const cache = caches.default, key = new Request(`https://${host}/__site`, { method: "GET" });
    let res = await cache.match(key);
    if (!res) {
      const rpc = name => fetch(`${env.SUPABASE_URL}/rest/v1/rpc/${name}`, {
        method: "POST",
        headers: { apikey: env.SUPABASE_KEY, Authorization: `Bearer ${env.SUPABASE_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(who)
      });
      const [r, a] = await Promise.all([rpc("site_html"), rpc("site_addons").catch(() => null)]);
      if (!r.ok) return new Response(page("We'll be right back", "This site is having a short hiccup. Please try again in a minute."), { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } });
      let html = await r.json();
      if (typeof html !== "string" || !html) {
        return new Response(page("No site here yet", "This address isn't published right now.", env.HOME_URL), { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
      }
      /* integrations: if the lookup fails, the site still goes out, just without them */
      let addons = null;
      try { addons = a && a.ok ? await a.json() : null; } catch (e) { addons = null; }
      if (addons && typeof addons === "object" && Object.keys(addons).length) {
        try { html = await withAddons(new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } }), addons).text(); }
        catch (e) { /* keep the page as published */ }
      }
      res = new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          // short cache: an update, a switched-on integration or a cancelled plan shows up within a minute
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

/* ---------- contact form: pass the visitor's message to the forms function ---------- */
async function sendForm(request, env, host, who) {
  const reply = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  const origin = request.headers.get("Origin");
  if (origin) { try { if (new URL(origin).hostname.toLowerCase() !== host) return reply({ error: "Not allowed" }, 403); } catch (e) { return reply({ error: "Not allowed" }, 403); } }
  const text = await request.text();
  if (text.length > 20000) return reply({ error: "That message is too long." }, 413);
  let b = {};
  try { b = /json/.test(request.headers.get("Content-Type") || "") ? JSON.parse(text) : Object.fromEntries(new URLSearchParams(text)); } catch (e) { return reply({ error: "Bad request" }, 400); }
  const pick = k => (typeof b[k] === "string" ? b[k] : "");
  const r = await fetch(`${env.SUPABASE_URL}/functions/v1/forms`, {
    method: "POST",
    headers: { apikey: env.SUPABASE_KEY, Authorization: `Bearer ${env.SUPABASE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...who, name: pick("name"), email: pick("email"), message: pick("message"), website: pick("website") })
  }).catch(() => null);
  if (!r) return reply({ error: "Couldn't send your message. Please try again." }, 502);
  const d = await r.json().catch(() => ({}));
  return reply(r.ok ? { ok: true } : { error: d.error || "Couldn't send your message. Please try again." }, r.ok ? 200 : r.status);
}

/* ---------- integrations: checked, escaped and added to the page ---------- */
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const str = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
/* a https link whose host is one of the allowed ones (an entry "x.com" also allows "*.x.com") */
function link(v, hosts) {
  try {
    const u = new URL(str(v, 2000));
    const h = u.hostname.toLowerCase();
    if (u.protocol !== "https:" || u.username || u.password) return null;
    return hosts.some(a => h === a || h.endsWith("." + a)) ? u : null;
  } catch (e) { return null; }
}
const BOOKING = ["calendly.com", "cal.com", "acuityscheduling.com", "as.me", "setmore.com", "squareup.com", "square.site", "simplybook.me", "zcal.co", "tidycal.com"];
const BUY = ["buy.stripe.com", "square.link", "checkout.square.site", "paypal.com", "paypal.me", "gumroad.com"];

/* turns the switched-on integrations into what goes on the page */
function plan(I) {
  const head = [], body = [], float = [], css = [], on = {};
  const g = k => (I[k] && typeof I[k] === "object" ? I[k] : null);

  let x = g("analytics"), id = x && str(x.id, 20).toUpperCase();
  if (id && /^G-[A-Z0-9]{4,15}$/.test(id))
    head.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${id}");</script>`);

  x = g("pixel"); id = x && str(x.id, 20);
  if (id && /^\d{8,20}$/.test(id))
    head.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${id}");fbq("track","PageView");</script>`);

  x = g("chat");
  if (x) {
    const v = str(x.id, 200), tawk = /^https:\/\/tawk\.to\/chat\/([a-f0-9]{24})\/([a-z0-9]{6,16})\/?$/i.exec(v), crisp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.exec(v);
    if (tawk) body.push(`<script>var Tawk_API=Tawk_API||{};(function(){var s=document.createElement("script");s.async=true;s.src="https://embed.tawk.to/${tawk[1]}/${tawk[2]}";s.charset="UTF-8";s.setAttribute("crossorigin","*");document.body.appendChild(s)})();</script>`);
    else if (crisp) body.push(`<script>window.$crisp=[];window.CRISP_WEBSITE_ID="${crisp[0].toLowerCase()}";(function(){var s=document.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;document.head.appendChild(s)})();</script>`);
  }

  x = g("booking");
  const book = x && link(x.url, BOOKING);
  if (book) {
    float.push(`<a class="shs-pill" href="${esc(book.href)}" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>${esc(str(x.label, 30) || "Book online")}</a>`);
    /* Calendly and Cal.com can also show the calendar right on the Contact page */
    const h = book.hostname.toLowerCase();
    if (h === "calendly.com" || h === "cal.com" || h === "app.cal.com") {
      const e = new URL(book.href);
      if (h === "calendly.com") { e.searchParams.set("embed_type", "Inline"); e.searchParams.set("hide_gdpr_banner", "1"); } else e.searchParams.set("embed", "true");
      on.calendar = `<section class="shs-cal"><iframe src="${esc(e.href)}" title="Book online" loading="lazy"></iframe></section>`;
    }
  }

  x = g("buy");
  const buy = x && link(x.url, BUY);
  if (buy) float.push(`<a class="shs-pill" href="${esc(buy.href)}" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6h15l-2 9H8L6 3H3"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>${esc(str(x.label, 30) || "Buy now")}</a>`);
  /* the buttons sit outside the design, so they borrow its colors and fonts from the first page */
  if (float.length) { body.push(`<div class="shs-float">${float.join("")}</div><script>(function(){var t=document.querySelector(".tp"),f=document.querySelector(".shs-float");if(t&&f)f.setAttribute("style",t.getAttribute("style")||"")})();</script>`); css.push(`.shs-float{position:fixed;left:16px;bottom:16px;z-index:2147483000;display:flex;flex-direction:column;align-items:flex-start;gap:10px}.shs-pill{display:inline-flex;align-items:center;gap:8px;padding:13px 18px;border-radius:999px;background:var(--ac,#111);color:var(--acfg,#fff);font:600 15px/1 var(--fb,system-ui),system-ui,sans-serif;text-decoration:none;box-shadow:0 10px 28px -8px rgba(0,0,0,.45)}.shs-pill:hover{filter:brightness(1.07)}@media(max-width:760px){.shs-float{left:12px;right:12px;bottom:12px;flex-direction:row;flex-wrap:wrap}.shs-pill{padding:11px 15px;font-size:14px}}`); }

  x = g("maps");
  const addr = x && str(x.address, 200);
  if (addr && addr.length >= 3) on.map = `<iframe src="https://maps.google.com/maps?q=${encodeURIComponent(addr)}&z=15&output=embed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;border:0;display:block"></iframe>`;

  if (g("form")) {
    on.form = true;
    css.push(`.tp-form .shs-in{display:block;width:100%;box-sizing:border-box;padding:15px;border:0;border-radius:min(var(--r),10px);background:var(--bg);color:var(--fg);font:inherit;font-size:14px;margin:0 0 10px}.tp-form textarea.shs-in{height:90px;resize:vertical}.tp-form .shs-in::placeholder{color:var(--mu);opacity:1}.tp-form .shs-btn{display:block;width:100%;border:0;font:inherit;text-align:center;background:var(--ac);color:var(--acfg);font-weight:600;padding:15px;border-radius:min(var(--r),999px);margin-top:6px;cursor:pointer}.tp-form .shs-btn[disabled]{opacity:.6}.tp-form .shs-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}.tp-form .shs-msg{margin:10px 0 0;font-size:14px;text-align:center}`);
    body.push(`<script>document.addEventListener("submit",function(e){var f=e.target.closest&&e.target.closest("form[data-shs-form]");if(!f)return;e.preventDefault();var b=f.querySelector(".shs-btn"),m=f.querySelector(".shs-msg"),d={};new FormData(f).forEach(function(v,k){d[k]=v});if(!String(d.message||"").trim()){m.textContent="Please write a message.";return}b.disabled=true;m.textContent="Sending…";fetch("/__form",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then(function(r){return r.json().then(function(j){return{ok:r.ok,j:j}})}).then(function(x){if(x.ok){f.reset();m.textContent="Thank you! Your message was sent."}else{m.textContent=x.j.error||"Couldn't send. Please try again."}}).catch(function(){m.textContent="Couldn't send. Check your connection and try again."}).then(function(){b.disabled=false})});</script>`);
  }

  x = g("newsletter");
  const nl = x && link(x.url, ["list-manage.com"]);
  if (nl) {
    nl.pathname = nl.pathname.replace(/\/subscribe(\/post)?\/?$/, "/subscribe/post");
    if (/\/subscribe\/post$/.test(nl.pathname)) {
      on.newsletter = nl.href;
      css.push(`.shs-sin{flex:1;min-width:0;padding:15px 18px;border:0;border-radius:min(var(--r),999px);background:var(--bg);color:var(--fg);font:inherit;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--fg) 14%,transparent)}.shs-sin::placeholder{color:var(--mu);opacity:1}.shs-sbtn{font:inherit;font-weight:600;white-space:nowrap;padding:15px 24px;border:0;border-radius:min(var(--r),999px);background:var(--ac);color:var(--acfg);cursor:pointer}`);
    }
  }

  x = g("embed");
  const code = x && str(x.code, 20000);
  if (code) {
    const h = Math.max(80, Math.min(1500, parseInt(x.height, 10) || 420)), t = str(x.title, 80);
    /* the customer's own code runs in a sealed frame: it can't reach the page, the visitor's cookies or our domain */
    on.embed = `<section class="shs-embed">${t ? `<h2>${esc(t)}</h2>` : ""}<iframe sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox" srcdoc="${esc(code)}" title="${esc(t || "Embedded content")}" loading="lazy" style="height:${h}px"></iframe></section>`;
  }
  if (on.calendar || on.embed) css.push(`.shs-cal,.shs-embed{padding:0 56px 90px}.shs-embed h2{font-family:var(--fh);font-weight:var(--hw);font-size:clamp(28px,4vw,44px);margin:0 0 22px;color:var(--fg)}.shs-cal iframe,.shs-embed iframe{display:block;width:100%;border:0;border-radius:min(var(--r),18px);background:var(--sf)}.shs-cal iframe{height:720px}@media(max-width:760px){.shs-cal,.shs-embed{padding:0 20px 60px}}`);
  if (css.length) head.push(`<style>${css.join("")}</style>`);
  return { head, body, on };
}

function withAddons(res, I) {
  const { head, body, on } = plan(I);
  let rw = new HTMLRewriter()
    .on("head", { element(e) { if (head.length) e.append(head.join(""), { html: true }); } })
    .on("body", { element(e) { if (body.length) e.append(body.join(""), { html: true }); } });
  if (on.map) rw = rw.on(".tp-info .map", { element(e) { e.setAttribute("style", "padding:0;overflow:hidden;background:var(--sf)"); e.setInnerContent(on.map, { html: true }); } });
  if (on.calendar) rw = rw.on(".tp-contact", { element(e) { e.after(on.calendar, { html: true }); } });
  if (on.embed) rw = rw.on(".pg.on .tp-foot", { element(e) { e.before(on.embed, { html: true }); } });
  if (on.form) {
    /* the template's form picture becomes a real form, keeping its title, button text and look */
    let n = 0;
    const fields = [["name", "Your name", "name"], ["email", "Email or phone", "email"]];
    const form = { element(e) { n = 0; e.tagName = "form"; e.setAttribute("data-shs-form", ""); e.setAttribute("novalidate", ""); e.append(`<input class="shs-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p class="shs-msg" role="status"></p>`, { html: true }); } };
    const span = { element(e) {
      if ((e.getAttribute("class") || "").includes("big")) { e.replace(`<textarea class="shs-in" name="message" placeholder="How can we help?" required maxlength="5000"></textarea>`, { html: true }); return; }
      const f = fields[n++]; if (!f) { e.remove(); return; }
      e.replace(`<input class="shs-in" name="${f[0]}" placeholder="${f[1]}" autocomplete="${f[2]}" maxlength="${f[0] === "name" ? 200 : 320}">`, { html: true });
    } };
    const btn = { element(e) { e.tagName = "button"; e.setAttribute("type", "submit"); e.setAttribute("class", "shs-btn"); } };
    for (const s of [".tp-contact .tp-form", ".tp-hero .tp-form"]) rw = rw.on(s, form).on(s + " span", span).on(s + " i", btn);
  }
  if (on.newsletter) rw = rw
    .on(".tp-signf", { element(e) { e.tagName = "form"; e.setAttribute("action", on.newsletter); e.setAttribute("method", "post"); e.setAttribute("target", "_blank"); } })
    .on(".tp-signf span", { element(e) { e.replace(`<input class="shs-sin" type="email" name="EMAIL" placeholder="Email address" required autocomplete="email">`, { html: true }); } })
    .on(".tp-signf i", { element(e) { e.tagName = "button"; e.setAttribute("type", "submit"); e.setAttribute("class", "shs-sbtn"); } });
  return rw.transform(res);
}
