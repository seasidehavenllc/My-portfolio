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
                Set buy to 0 to make the download free. */
  editorPrice: { monthly: 5, buy: 49 },

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
