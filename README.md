# Seaside Haven Studios website

Static site (plain HTML, CSS and JS, no build step) for Seaside Haven Studios, the web design arm of Seaside Haven LLC.

| Page | What it's for |
| --- | --- |
| `index.html` | Home: hero, featured templates, revamp offer with before/after slider, brand lab, live feature demos, pricing teaser |
| `templates.html` | Gallery of 54 original designs and 1,350 ready-made variations, with filters, search and a live desktop/tablet/phone preview |
| `editor.html` | Site editor: visitors pick a design, change colors, fonts, layout, sections, text and photos, then download the site or send it to you to launch |
| `revamp.html` | Discounted revamp/polish offer, website health check quiz, before/after |
| `showcase.html` | Skills lab: brand restyler, AI chat, booking, store, micro-interactions |
| `pricing.html` | New-build, revamp and care plans, instant estimator, add-ons, market comparison |
| `faq.html`, `contact.html` | FAQ and quote request form |
| `welcome.html` | Onboarding form customers land on after paying |

`work.html`, `capabilities.html` and `redesigns.html` redirect to their new pages so old links keep working.

## Editing

- **Phone, email, payment links and prices you can switch:** `CONFIG` in `assets/config.js`.
- **Templates:** each one is a data entry in `assets/templates.js`, rendered by `tpRender()` and styled by `assets/templates.css`. Copy an entry to add a new design; it appears in the gallery and the editor automatically, along with 24 generated variations.
- **Variations:** `PRESET_PALS` (shared color palettes), `FONT_PAIRS` and `LAYOUTS` in `assets/templates.js`. Every design can use any of them, so adding one palette or font pairing adds it to all 54 designs. `VARIANTS_PER_DESIGN` sets how many ready-made looks the gallery shows per design. The counts on the site update themselves.
- **Site editor:** `editor.html`, `assets/editor.js` and `assets/editor.css`. A visitor's design autosaves in their own browser (nothing is stored on a server). Designing is free. "Get my site" offers a monthly hosted plan or a one-time purchase that downloads a single self-contained HTML file; "Launch it for me" sends them to the quote form with a summary of their design attached.
- **Prices:** in `pricing.html`, the plan teasers on `index.html` and `revamp.html`, the estimator tiers in `assets/app.js`, and the chat demo answers in `assets/app.js`.

## Turning on online payments and automatic forms

Everything works without setup: buy buttons fall back to "get a quote", and forms open the visitor's email app. To automate:

1. **Stripe payment links.** In Stripe, create a Payment Link for each package: Launch $449, Polish $199 (paid in full); Business $750, Growth $1,500, Revamp $450, Revamp Plus $900 (50% deposits); Host $19/mo, Care $39/mo, Grow $99/mo (subscriptions). In each link's settings, set the confirmation page to redirect to `https://<your site>/welcome.html`. Paste each link into `CONFIG.pay` in `assets/config.js`.
2. **Form inbox.** Create a form at a service such as Formspree and paste its endpoint into `CONFIG.formEndpoint`. Quote and onboarding forms then arrive in your inbox automatically.
3. **Template orders.** When a customer buys from a template preview, the template and palette show up in Stripe as the payment's client reference ID (for example `harbor-midnight`, or `harbor~7.3.2-midnight` for a variation).
4. **Site editor plans.** Designing is free; visitors pay to keep the site, in one of two ways. Both prices are in `CONFIG.editorPrice` in `assets/config.js` and update everywhere when you change them.
   - **Pay monthly ($5 a month): their site is hosted and published automatically.** Create a Stripe subscription Payment Link for the monthly price and paste it into `CONFIG.pay.editorMonthly`.
   - **Buy it outright ($49 once): they download the file.** Create a one-time Payment Link for the buy price and paste it into `CONFIG.pay.editorBuy`.
   - Set both links' after-payment page to `https://<your site>/dashboard.html?paid=1`. The full setup, including the Stripe webhook, is in `backend/README.md`.
   - Until a link is set, that choice sends the visitor to the quote form with their design attached, so you can invoice by hand.
   - Because this site has no server, the download unlock is checked in the visitor's browser, which stops ordinary visitors but not a determined developer. A small server function that confirms the Stripe payment would close that gap.
5. **Customer accounts, publishing and the app.** Customers can sign up, save sites to their account, publish them to `<name>.<your domain>`, connect their own domain and manage billing from `dashboard.html`. The server parts and the remaining setup steps (Stripe webhook, domain, Cloudflare) are in [`backend/README.md`](backend/README.md). The site can also be installed as a phone app.
