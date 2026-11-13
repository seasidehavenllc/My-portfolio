/* ======================= CONFIG — edit these ======================= */
const CONFIG = {
  email: "info@seasidehavenllc.com",   // your studio email
  phone: "(434) 233-0231",              // your studio phone

  /* Online checkout. Paste a Stripe Payment Link (https://buy.stripe.com/...) for
     each package. Any left empty keeps its "get a quote" button instead.
     In Stripe, set each link's after-payment page to <your site>/welcome.html */
  pay: {
    launch: "",      // Launch template site, $799 in full
    business: "",    // Business, $1,250 deposit
    growth: "",      // Growth, $2,500 deposit
    polish: "",      // Polish, $299 in full
    revamp: "",      // Revamp, $750 deposit
    revampPlus: "",  // Revamp Plus, $1,500 deposit
    careHost: "",    // Host plan, $29/month subscription
    careCare: "",    // Care plan, $59/month subscription
    careGrow: "",    // Grow plan, $149/month subscription
    editorBuy: "",   // Site editor, buy outright (one-time, price below). In Stripe, set this link's
                     // after-payment redirect to <your site>/editor.html?paid={CHECKOUT_SESSION_ID}
    editorMonthly: "" // Site editor, hosted plan (monthly subscription, price below). In Stripe, set
                     // this link's after-payment redirect to <your site>/welcome.html?design=1
  },

  /* Site editor prices. Designing is always free; these are what a visitor pays to keep the site.
     Change a number and it changes everywhere on the site.
       monthly: you host their site for them, billed monthly. 7 is 40% of Wix's cheapest plan ($17 a month).
       buy:     they pay once and download the site file to host anywhere. 79 is about 40% of a year of
                that same Wix plan. Set buy to 0 to make the download free. */
  editorPrice: { monthly: 7, buy: 79 },

  /* Form inbox. Paste a form endpoint (for example from Formspree) to receive the
     quote and onboarding forms automatically. Empty = opens the visitor's email app. */
  formEndpoint: ""
};
/* =================================================================== */
