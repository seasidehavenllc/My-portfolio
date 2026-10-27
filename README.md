# Seaside Haven Studios website

Static site (plain HTML, CSS and JS, no build step) for Seaside Haven Studios, the web design arm of Seaside Haven LLC.

| Page | What it's for |
| --- | --- |
| `index.html` | Home: hero, featured templates, revamp offer with before/after slider, brand lab, live feature demos, pricing teaser |
| `templates.html` | Full gallery of original templates with filters, search and a live desktop/tablet/phone preview |
| `revamp.html` | Discounted revamp/polish offer, website health check quiz, before/after |
| `showcase.html` | Skills lab: brand restyler, AI chat, booking, store, micro-interactions |
| `pricing.html` | New-build, revamp and care plans, instant estimator, add-ons, market comparison |
| `faq.html`, `contact.html` | FAQ and quote request form (opens the visitor's email app) |

`work.html`, `capabilities.html` and `redesigns.html` redirect to their new pages so old links keep working.

## Editing

- **Phone and email:** `CONFIG` at the top of `assets/app.js`.
- **Templates:** each one is a data entry in `assets/templates.js`, rendered by `tpRender()` and styled by `assets/templates.css`. Copy an entry to add a new template; it appears in the gallery automatically.
- **Prices:** in `pricing.html`, the plan teasers on `index.html` and `revamp.html`, the estimator tiers in `assets/app.js`, and the chat demo answers in `assets/app.js`.
