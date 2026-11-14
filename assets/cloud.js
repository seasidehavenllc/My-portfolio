/* =====================================================================
   SEASIDE HAVEN STUDIOS — customer accounts (Supabase), no libraries.
   Used by account.html, dashboard.html and the editor. Turned on by
   CONFIG.cloud in assets/config.js; with it empty, Cloud.on is false
   and the rest of the site works exactly as before.
   ===================================================================== */
const Cloud = (() => {
  const C = (typeof CONFIG !== "undefined" && CONFIG.cloud) || {};
  const on = !!(C.url && C.key), base = (C.url || "").replace(/\/$/, "");
  const SK = "shs-session";
  let session = null;
  try { session = JSON.parse(localStorage.getItem(SK)); } catch (e) { session = null; }
  const keep = s => { session = s; try { s ? localStorage.setItem(SK, JSON.stringify(s)) : localStorage.removeItem(SK); } catch (e) { /* private mode: signed in for this page only */ } };
  const stamp = s => s && s.access_token ? Object.assign({}, s, { expires_at: s.expires_at || Math.floor(Date.now() / 1000) + (+s.expires_in || 3600) }) : null;

  /* friendlier words for the errors people actually hit */
  function nice(msg, status) {
    const m = String(msg || "");
    if (/invalid login|invalid_credentials/i.test(m)) return "That email and password don't match.";
    if (/already registered|already exists|user_already_exists/i.test(m)) return "There's already an account with that email. Try signing in.";
    if (/email not confirmed/i.test(m)) return "Please confirm your email first. Check your inbox for our link.";
    if (/password.*(at least|short|weak)/i.test(m)) return "Please use a longer password (at least 8 characters).";
    if (/sites_slug_key|duplicate key.*slug/i.test(m)) return "That address is taken. Please pick another.";
    if (/sites_custom_domain_key|duplicate key.*custom_domain/i.test(m)) return "That domain is already connected to another site.";
    if (/sites_slug_check/i.test(m)) return "Addresses use 3 to 40 lowercase letters, numbers or dashes.";
    if (/sites_custom_domain_check/i.test(m)) return "That doesn't look like a domain. Use something like yourbusiness.com.";
    if (/rate limit|too many/i.test(m) || status === 429) return "Too many tries. Please wait a minute and try again.";
    if (/reserved|limit of 20/i.test(m)) return m;
    return m || "Something went wrong. Please try again.";
  }
  async function call(path, opt = {}, auth = true) {
    if (!on) throw new Error("Accounts aren't set up yet.");
    const h = Object.assign({ apikey: C.key, "Content-Type": "application/json" }, opt.headers || {});
    if (auth) { const t = await token(); if (!t) throw new Error("Please sign in again."); h.Authorization = "Bearer " + t; }
    let r;
    try { r = await fetch(base + path, Object.assign({}, opt, { headers: h })); }
    catch (e) { throw new Error("Can't reach the server. Check your connection and try again."); }
    const text = await r.text();
    let data = null; try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    if (!r.ok) {
      if (r.status === 401 && auth) keep(null);
      throw new Error(nice(data && (data.msg || data.message || data.error_description || data.error_code || data.error), r.status));
    }
    return data;
  }
  async function token() {
    if (!session) return null;
    if (session.expires_at - 60 > Date.now() / 1000) return session.access_token;
    try {
      const s = await call("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: session.refresh_token }) }, false);
      keep(stamp(s)); return session.access_token;
    } catch (e) { keep(null); return null; }
  }
  /* email links must point at the website, also when this runs inside the phone app */
  const web = /^https?:$/.test(location.protocol), site = (typeof CONFIG !== "undefined" && CONFIG.siteUrl) || "";
  const here = p => (web || !site ? location.href.replace(/[^/]*([?#].*)?$/, "") : site.replace(/\/?$/, "/")) + p;

  /* links in our emails come back with the session in the address (#access_token=...) */
  let linkType = null;
  if (on && /access_token=/.test(location.hash)) {
    const q = new URLSearchParams(location.hash.slice(1));
    keep(stamp({ access_token: q.get("access_token"), refresh_token: q.get("refresh_token"), expires_in: q.get("expires_in"), expires_at: +q.get("expires_at") || 0 }));
    linkType = q.get("type");
    history.replaceState(null, "", location.pathname + location.search);
  }

  const api = {
    on, domain: (C.domain || "").toLowerCase(), portal: C.portal || "", linkType: () => linkType,
    signedIn: () => !!session, token,
    async user() {
      if (!session) return null;
      try { return await call("/auth/v1/user"); } catch (e) { return null; }
    },
    async signUp(email, password) {
      const s = await call("/auth/v1/signup?redirect_to=" + encodeURIComponent(here(web ? "dashboard.html" : "confirmed.html")), { method: "POST", body: JSON.stringify({ email, password }) }, false);
      if (s && s.access_token) { keep(stamp(s)); return "in"; }
      return "confirm"; // email confirmation is on: they finish from the link we email
    },
    async signIn(email, password) {
      keep(stamp(await call("/auth/v1/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) }, false)));
    },
    async signOut() { try { await call("/auth/v1/logout", { method: "POST" }); } catch (e) { /* signing out locally is what matters */ } keep(null); },
    async resetPassword(email) { await call("/auth/v1/recover?redirect_to=" + encodeURIComponent(here("account.html")), { method: "POST", body: JSON.stringify({ email }) }, false); },
    async setPassword(password) { await call("/auth/v1/user", { method: "PUT", body: JSON.stringify({ password }) }); },
    async setEmail(email) { await call("/auth/v1/user?redirect_to=" + encodeURIComponent(here("dashboard.html")), { method: "PUT", body: JSON.stringify({ email }) }); },

    /* sites (the database only ever shows people their own) */
    listSites: () => call("/rest/v1/sites?select=id,name,slug,custom_domain,plan,published_at,updated_at,created_at&order=updated_at.desc"),
    async getSite(id) { const r = await call("/rest/v1/sites?id=eq." + encodeURIComponent(id) + "&select=*"); return r && r[0]; },
    async createSite(row) { const r = await call("/rest/v1/sites?select=id,slug", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(row) }); return r && r[0]; },
    saveSite: (id, patch) => call("/rest/v1/sites?id=eq." + encodeURIComponent(id), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(patch) }),
    deleteSite: id => call("/rest/v1/sites?id=eq." + encodeURIComponent(id), { method: "DELETE" }),
    slugFree: wanted => call("/rest/v1/rpc/slug_free", { method: "POST", body: JSON.stringify({ wanted }) }),
    address: site => site.custom_domain || (site.slug + "." + (C.domain || "yourdomain.com")),
    cleanSlug: s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40),
    cleanDomain: s => String(s || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "")
  };
  return api;
})();

/* installable app: works offline for the pages people already opened */
if ("serviceWorker" in navigator && location.protocol === "https:") addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
