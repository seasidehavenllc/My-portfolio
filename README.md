# Seaside Haven Studios website

Static site (plain HTML, CSS and JS, no build step) for Seaside Haven Studios, the web design arm of Seaside Haven LLC.

| Page | What it's for |
| --- | --- |
| `index.html` | Home: hero, featured templates, revamp offer with before/after slider, brand lab, live feature demos, pricing teaser |
| `templates.html` | Full gallery of original templates with filters, search and a live desktop/tablet/phone preview |
| `revamp.html` | Discounted revamp/polish offer, website health check quiz, before/after |
| `showcase.html` | Skills lab: brand restyler, AI chat, booking, store, micro-interactions |
| `pricing.html` | New-build, revamp and care plans, instant estimator, add-ons, market comparison |
| `faq.html`, `contact.html` | FAQ and quote request form |
| `welcome.html` | Onboarding form customers land on after paying |

`work.html`, `capabilities.html` and `redesigns.html` redirect to their new pages so old links keep working.

## Editing

- **Phone and email:** `CONFIG` at the top of `assets/app.js`.
- **Templates:** each one is a data entry in `assets/templates.js`, rendered by `tpRender()` and styled by `assets/templates.css`. Copy an entry to add a new template; it appears in the gallery automatically.
- **Prices:** in `pricing.html`, the plan teasers on `index.html` and `revamp.html`, the estimator tiers in `assets/app.js`, and the chat demo answers in `assets/app.js`.

## Turning on online payments and automatic forms

Everything works without setup: buy buttons fall back to "get a quote", and forms open the visitor's email app. To automate:

1. **Stripe payment links.** In Stripe, create a Payment Link for each package: Launch $799, Polish $299 (paid in full); Business $1,250, Growth $2,500, Revamp $750, Revamp Plus $1,500 (50% deposits); Host $29/mo, Care $59/mo, Grow $149/mo (subscriptions). In each link's settings, set the confirmation page to redirect to `https://<your site>/welcome.html`. Paste each link into `CONFIG.pay` in `assets/app.js`.
2. **Form inbox.** Create a form at a service such as Formspree and paste its endpoint into `CONFIG.formEndpoint`. Quote and onboarding forms then arrive in your inbox automatically.
3. **Template orders.** When a customer buys from a template preview, the template and palette show up in Stripe as the payment's client reference ID (for example `harbor-palette-2`).
