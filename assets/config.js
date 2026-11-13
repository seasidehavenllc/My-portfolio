/* ======================= CONFIG — edit these ======================= */
const CONFIG = {
  email: "info@seasidehavenllc.com",   // your studio email
  phone: "(434) 233-0231",              // your studio phone

  /* Online checkout. Paste a Stripe Payment Link (https://buy.stripe.com/...) for
     each package. Any left empty keeps its "get a quote" button instead.
     In Stripe, set each link's after-payment page to <your site>/welcome.html */
  pay: {
    launch: "",      // Launch template site, $449 in full
    business: "",    // Business, $750 deposit
    growth: "",      // Growth, $1,500 deposit
    polish: "",      // Polish, $199 in full
    revamp: "",      // Revamp, $450 deposit
    revampPlus: "",  // Revamp Plus, $900 deposit
    careHost: "",    // Host plan, $19/month subscription
    careCare: "",    // Care plan, $39/month subscription
    careGrow: "",    // Grow plan, $99/month subscription
    editorBuy: "",   // Site editor, buy outright (one-time, price below). In Stripe, set this link's
                     // after-payment redirect to <your site>/dashboard.html?paid=1 when accounts are on
                     // (CONFIG.cloud), otherwise <your site>/editor.html?paid={CHECKOUT_SESSION_ID}
    editorMonthly: "" // Site editor, hosted plan (monthly subscription, price below). In Stripe, set
                     // this link's after-payment redirect to <your site>/dashboard.html?paid=1 when
                     // accounts are on, otherwise <your site>/welcome.html?design=1
  },

  /* Site editor prices. Designing is always free; these are what a visitor pays to keep the site.
     Change a number and it changes everywhere on the site.
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
       portal:  your Stripe customer portal link, so customers can update a card or cancel */
  cloud: { url: "https://sspihydntrcmdaxjxjnu.supabase.co", key: "sb_publishable_oDyJG7fyu7TK4SmQs8sOdw_IIdUUdT6", domain: "", portal: "" },

  /* Form inbox. Paste a form endpoint (for example from Formspree) to receive the
     quote and onboarding forms automatically. Empty = opens the visitor's email app. */
  formEndpoint: ""
};
/* =================================================================== */
