# Customer accounts and automatic publishing

This folder holds the parts of the site that run on servers. The website itself stays plain files.

| Piece | Where it runs | What it does |
| --- | --- | --- |
| `supabase/migrations/0001_sites.sql` | Supabase project **site-builder** (already applied) | Customer accounts and one row per customer site: design, published page, address, own domain and plan. Customers can only see and change their own sites, and can never change their own plan. |
| `supabase/functions/stripe-webhook` | Supabase Edge Function (already deployed) | Stripe tells it when someone pays or cancels. It switches the site to `monthly`, `owned` or back to `free`. |
| `cloudflare/worker.js` | Cloudflare Worker (not deployed yet) | Serves `<name>.<your domain>` and connected customer domains. It only serves sites on an active monthly plan. |

On the website: `account.html` (sign in), `dashboard.html` (the customer's sites), `assets/cloud.js` (talks to Supabase) and the editor's Publish button. `CONFIG.cloud` in `assets/config.js` switches all of it on; empty `url` and `key` switch it off.

## How it works for a customer

1. They design in the editor for free and press **Get my site**.
2. They create an account, pick a free address such as `joesbakery.yourdomain.com`, and choose a plan.
3. They pay with Stripe. Stripe tells the webhook, and the plan switches on by itself.
4. **Monthly:** they press **Publish** in the editor and the site is live within a minute. They can edit and publish again any time, change their address or connect their own domain in Settings, and cancel in Billing. Cancelling takes the site offline by itself.
5. **Buy outright:** they press **Save for download** in the editor, then **Download** in their dashboard.

## One-time setup (what is left)

### 1. Supabase sign-in settings
In the Supabase dashboard for **site-builder**, open Authentication, URL Configuration:
- **Site URL:** your website address, for example `https://yourdomain.com`
- **Redirect URLs:** add `https://yourdomain.com/*` (and your GitHub Pages address if you use it)

Supabase's built-in email only sends a few emails an hour, which is fine for testing. Before launch, set up your own email sender under Authentication, Emails, SMTP Settings (Resend, Postmark or similar) so sign-up and password emails always arrive.

### 2. Stripe
1. Create two Payment Links: a **$5 monthly subscription** and a **$49 one-time payment** (the prices in `CONFIG.editorPrice`).
2. Set each link's after-payment page to `https://yourdomain.com/dashboard.html?paid=1`.
3. Paste them into `CONFIG.pay.editorMonthly` and `CONFIG.pay.editorBuy` in `assets/config.js`.
4. Turn on the customer portal (Settings, Billing, Customer portal) and paste its link into `CONFIG.cloud.portal`.
5. Add a webhook (Developers, Webhooks) pointing at
   `https://sspihydntrcmdaxjxjnu.supabase.co/functions/v1/stripe-webhook`
   with the events `checkout.session.completed`, `customer.subscription.updated` and `customer.subscription.deleted`.
6. Copy the webhook's signing secret (`whsec_...`) into Supabase: Edge Functions, Secrets, name `STRIPE_WEBHOOK_SECRET`.

### 3. Your domain and Cloudflare
1. Add your domain to Cloudflare (free plan is fine) and set `CONFIG.cloud.domain` to it, for example `"yourdomain.com"`.
2. In Cloudflare, Workers, create a Worker and paste in `cloudflare/worker.js`. Under Settings, Variables add `SUPABASE_URL` (`https://sspihydntrcmdaxjxjnu.supabase.co`), `SUPABASE_KEY` (the publishable key from `assets/config.js`), `BASE_DOMAIN` (your domain) and `HOME_URL` (your website).
3. In the domain's DNS, add a proxied `AAAA` record named `*` pointing to `100::`, then add the Worker route `*.yourdomain.com/*`.

Every new customer address now works the moment they publish, with no work from you.

### 4. Customer domains (optional, needs Cloudflare for SaaS)
For customers who connect their own domain, turn on **SSL for SaaS / Custom Hostnames** for your zone (first 100 hostnames are free), set the fallback origin to any address on your domain, and route the Worker to it. Each customer domain is then added as a custom hostname. That approval step is manual at first; it can be automated later with a small function that calls the Cloudflare API when a customer saves a domain.

## Good to know

- **Limits:** 20 sites per account, about 8 MB of design and 10 MB of published page per site. Very large photo uploads may need to be smaller to publish.
- **Download lock:** the editor builds pages in the browser, so a technical customer on the free plan could still copy their own design. Hosting is fully enforced on the server.
- **Phone app:** the site is an installable app (`manifest.webmanifest`, `sw.js`). On Android, Chrome offers "Install app"; on iPhone, Safari's Share, Add to Home Screen. Listing in the App Store and Google Play needs your own developer accounts (Apple $99 a year, Google $25 once); the same pages can be wrapped for the stores with Capacitor when you are ready.
