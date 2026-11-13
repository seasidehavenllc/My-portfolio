/* Service worker for the installable app.
   Pages and files from this site: network first, falling back to the last copy when offline.
   Account data (Supabase) and other sites are never cached here. */
const CACHE = "shs-app-v1";
const SHELL = ["dashboard.html", "account.html", "editor.html", "assets/styles.css", "assets/dash.css", "assets/editor.css", "assets/templates.css",
  "assets/config.js", "assets/cloud.js", "assets/dashboard.js", "assets/editor.js", "assets/templates.js", "assets/logo.svg", "assets/favicon.svg", "assets/icon-192.png"];

self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => {
    if (res.ok && res.type === "basic") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match("dashboard.html"))));
});
