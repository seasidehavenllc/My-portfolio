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

1. **Stripe payment links.** In Stripe, create a Payment Link for each package: Launch $799, Polish $299 (paid in full); Business $1,250, Growth $2,500, Revamp $750, Revamp Plus $1,500 (50% deposits); Host $29/mo, Care $59/mo, Grow $149/mo (subscriptions). In each link's settings, set the confirmation page to redirect to `https://<your site>/welcome.html`. Paste each link into `CONFIG.pay` in `assets/config.js`.
2. **Form inbox.** Create a form at a service such as Formspree and paste its endpoint into `CONFIG.formEndpoint`. Quote and onboarding forms then arrive in your inbox automatically.
3. **Template orders.** When a customer buys from a template preview, the template and palette show up in Stripe as the payment's client reference ID (for example `harbor-midnight`, or `harbor~7.3.2-midnight` for a variation).
4. **Site editor plans.** Designing is free; visitors pay to keep the site, in one of two ways. Both prices are in `CONFIG.editorPrice` in `assets/config.js` and update everywhere when you change them.
   - **Pay monthly ($7 a month): you host their site.** Create a Stripe subscription Payment Link, set its after-payment redirect to `https://<your site>/welcome.html?design=1` and paste it into `CONFIG.pay.editorMonthly`. After paying, the customer lands on the onboarding form, which asks them to save their design file and email it to you. Open that file in the editor (Content tab, "Open file"), press Download, and upload the result to your hosting.
   - **Buy it outright ($79 once): they download the file.** Create a one-time Payment Link, set its redirect to `https://<your site>/editor.html?paid={CHECKOUT_SESSION_ID}` and paste it into `CONFIG.pay.editorBuy`. After paying, the customer lands back in the editor and the file downloads.
   - Until a link is set, that choice sends the visitor to the quote form with their design attached, so you can invoice by hand.
   - Because this site has no server, the download unlock is checked in the visitor's browser, which stops ordinary visitors but not a determined developer. A small server function that confirms the Stripe payment would close that gap.
