/* =====================================================================
   SEASIDE HAVEN STUDIOS — card checkout (Stripe), no libraries.
   Every Buy, Subscribe and plan button calls Pay.start("<item>"). The server
   function (backend/supabase/functions/stripe) holds the prices and opens
   Stripe's secure card page: credit and debit cards, Apple Pay and Google Pay.
   Turned off by CONFIG.cardCheckout = false, or when CONFIG.cloud is empty.
   ===================================================================== */
if (/^(capacitor|ionic):$/.test(location.protocol)) document.documentElement.classList.add("in-app");
const Pay = (() => {
  const C = (typeof CONFIG !== "undefined" && CONFIG.cloud) || {};
  const on = !!(C.url && C.key) && (typeof CONFIG === "undefined" || CONFIG.cardCheckout !== false);
  const fn = (C.url || "").replace(/\/$/, "") + "/functions/v1/stripe";
  /* inside the phone app the pages are local files, so Stripe sends people back to the website */
  const app = /^(capacitor|ionic|file):$/.test(location.protocol);
  const site = (typeof CONFIG !== "undefined" && CONFIG.siteUrl) || "";
  const back = () => app && site ? site.replace(/\/?$/, "/") : location.href.replace(/[^/]*([?#].*)?$/, "");
  async function call(body) {
    const h = { apikey: C.key, "Content-Type": "application/json" };
    let t = null;
    try { if (typeof Cloud !== "undefined" && Cloud.signedIn()) t = await Cloud.token(); } catch (e) { t = null; }
    h.Authorization = "Bearer " + (t || C.key);
    let r;
    try { r = await fetch(fn, { method: "POST", headers: h, body: JSON.stringify(Object.assign({ back: back(), app }, body)) }); }
    catch (e) { throw new Error("Can't reach checkout. Check your connection and try again."); }
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const err = new Error(d.error || "Checkout isn't available right now."); err.status = r.status; throw err; }
    return d;
  }
  /* open a Stripe page: the in-app browser inside the phone app, the same tab on the web */
  function open(url) {
    const B = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser;
    if (B) { B.open({ url, presentationStyle: "popover" }); return; }
    location.href = url;
  }
  return {
    on, app,
    /* item: a key from PRICES in the server function. opts: { site, ref, from, fallback } */
    async start(item, opts = {}) {
      if (!on) { if (opts.fallback) location.href = opts.fallback; return; }
      try { const d = await call({ action: "checkout", item, site: opts.site, ref: opts.ref, from: opts.from }); open(d.url); }
      catch (e) {
        /* payments not switched on yet: fall back to the quote form so no sale is lost */
        if (e.status === 503 && opts.fallback) { location.href = opts.fallback; return; }
        throw e;
      }
    },
    confirm: session => call({ action: "confirm", session }),
    async portal() { const d = await call({ action: "portal" }); open(d.url); },
    /* the phone app: run fn when the Stripe page is closed, so plans refresh */
    onClose(cb) {
      const B = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Browser;
      if (B && B.addListener) B.addListener("browserFinished", cb);
    }
  };
})();

/* buttons marked data-pay="<item>" become card checkout buttons */
document.querySelectorAll("[data-pay]").forEach(a => {
  if (!Pay.on) return;
  const plan = a.closest(".plan") && a.closest(".plan").querySelector("h3");
  a.dataset.fallback = a.getAttribute("href");
  if (a.dataset.paytext) a.textContent = a.dataset.paytext;
  a.insertAdjacentHTML("afterend", `<a class="quote-alt" href="contact.html?plan=${encodeURIComponent(plan ? plan.textContent : "")}">Questions first? Get a free quote</a>`);
  a.addEventListener("click", async e => {
    e.preventDefault();
    if (a.getAttribute("aria-busy") === "true") return;
    const label = a.textContent; a.setAttribute("aria-busy", "true"); a.textContent = "Opening secure checkout…";
    try { await Pay.start(a.dataset.pay, { ref: a.dataset.ref, from: location.pathname.split("/").pop() || "index.html", fallback: a.dataset.fallback }); }
    catch (err) { if (typeof toast === "function") toast(err.message); else console.error(err); }
    finally { a.removeAttribute("aria-busy"); a.textContent = label; }
  });
});
