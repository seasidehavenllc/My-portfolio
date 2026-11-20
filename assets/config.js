/* ======================= CONFIG — edit these ======================= */
const CONFIG = {
  email: "info@seasidehavenllc.com",   // your studio email
  phone: "(434) 233-0231",              // your studio phone

  /* Card checkout. Every Buy, Subscribe and plan button opens Stripe's secure card page
     (credit and debit cards, Apple Pay, Google Pay). Prices are set in
     backend/supabase/functions/stripe/index.ts, and the only setup is pasting your Stripe
     secret key into Supabase (see backend/README.md). Until then, buttons fall back to the
     quote form. Set to false to turn checkout off. */
  cardCheckout: true,

  /* The Seaside Studios iPhone app's App Store link, e.g. "https://apps.apple.com/us/app/seaside-studios/id1234567890".
     Every "Download on the App Store" button on the site uses it. Leave it empty and those
     buttons open the App Store search for the app instead. */
  appStore: "https://apps.apple.com/us/app/seaside-studios/id0000000000",   // placeholder: swap in the real link once the app is listed

  /* Your website's address. The phone app sends people here after they pay. */
  siteUrl: "https://seasidehavenllc.github.io/My-portfolio/",

  /* Site editor prices. Designing is always free; these are what a visitor pays to keep the site.
     Change a number and it changes everywhere on the site. Change the same price in
     backend/supabase/functions/stripe/index.ts so checkout charges the new amount.
     Set below every major builder (checked November 2026):
       Wix Light $17/month yearly ($24 month to month), Squarespace Basic $19 ($25), GoDaddy $9.99 ($16.99),
       Hostinger $2.99 intro that renews at $10.99, WordPress.com Personal $4 yearly ($5 after year one).
       monthly: we host their site. 5 is under a third of Wix's cheapest plan, with no yearly contract.
       buy:     they pay once and download the site file. 49 is less than three months of Wix Light.
                Set buy to 0 to make the download free.
       pro:     the Pro plan: hosting plus every integration (analytics, live chat, buy buttons,
                newsletter, custom embeds, Zapier). Wix's plans with these start at $29 a month.
                The Website plan includes the basic integrations (contact form inbox, maps, booking).
                Which integrations each plan includes is decided in the database
                (backend/supabase/migrations/0004_integrations.sql) and listed in assets/integrations.js. */
  editorPrice: { monthly: 5, pro: 15, buy: 49 },

  /* The Free plan. Every site starts free and can be published without paying, within these limits.
     Paying lifts them: every design, no badge, your own domain, more sites.
       sites:      how many free sites one account can have online at once
       templates:  the starter designs a free site can be published with (ids from assets/templates.js).
                   Every other design shows a "Paid" tag: free to try in the editor, paid to publish.
       badge:      free sites show a small "Made with Seaside Haven Studios" badge
     These control what the screens say. The limits are enforced in the database, so change the same
     values in free_limits() in backend/supabase/migrations/0003_free_plan.sql (see backend/README.md). */
  free: { sites: 1, templates: ["harbor", "ember", "velvet", "pulse", "counsel", "bloom", "tide", "saltwater", "driftwood"], badge: true },

  /* Customer accounts and automatic publishing (see backend/README.md).
     Leave url empty and the site works without accounts, exactly as before.
       url:     your Supabase project URL, https://<project>.supabase.co
       key:     that project's publishable key (safe to put here; it is meant for browsers)
       domain:  the domain customer sites live under, e.g. "example.com" gives joesbakery.example.com
       portal:  optional. Leave empty: the Billing button opens Stripe's billing page by itself */
  cloud: { url: "https://sspihydntrcmdaxjxjnu.supabase.co", key: "sb_publishable_oDyJG7fyu7TK4SmQs8sOdw_IIdUUdT6", domain: "seasidehavenllc.com", portal: "" },

  /* Form inbox. Paste a form endpoint (for example from Formspree) to receive the
     quote and onboarding forms automatically. Empty = opens the visitor's email app. */
  formEndpoint: ""
};
/* =================================================================== */

/* The Free plan, for every page: Free.ok("harbor") says whether a design can be published free.
   Anything marked data-free="templates" or data-free="sites" is filled with the numbers above. */
const Free = (() => {
  const F = CONFIG.free || {}, list = Array.isArray(F.templates) ? F.templates : [];
  return { sites: +F.sites || 1, templates: list, badge: F.badge !== false, ok: id => list.includes(String(id || "").split("~")[0]) };
})();
document.addEventListener("DOMContentLoaded", () => document.querySelectorAll("[data-free]").forEach(el => { el.textContent = el.dataset.free === "sites" ? Free.sites : Free.templates.length; }));

