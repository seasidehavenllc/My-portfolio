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
    download: ""     // Site editor download (price below). In Stripe, set this link's
                     // after-payment redirect to <your site>/editor.html?paid={CHECKOUT_SESSION_ID}
  },

  /* What a visitor pays to download the site they built in the editor.
     Change the number to change the price everywhere. 0 makes the download free.
     7 is 40% of the cheapest Wix plan ($17 a month), charged once instead of monthly. */
  downloadPrice: 7,

  /* Form inbox. Paste a form endpoint (for example from Formspree) to receive the
     quote and onboarding forms automatically. Empty = opens the visitor's email app. */
  formEndpoint: ""
};
/* =================================================================== */
