# Customer accounts, card payments and automatic publishing

This folder holds the parts of the site that run on servers. The website itself stays plain files.

| Piece | Where it runs | What it does |
| --- | --- | --- |
| `supabase/migrations/0001_sites.sql` | Supabase project **site-builder** (already applied) | Customer accounts and one row per customer site: design, published page, address, own domain and plan. Customers can only see and change their own sites, and can never change their own plan. |
| `supabase/functions/stripe` | Supabase Edge Function (already deployed) | All card payments. Opens Stripe's card checkout for every package and plan, switches a site's plan on after payment, opens Stripe's billing page, and handles cancellations. Prices are set in this file. |
| `cloudflare/worker.js` | Cloudflare Worker | Serves `<name>.seasidehavenllc.com` and connected customer domains. It only serves sites on an active monthly plan. |

On the website: `account.html` (sign in), `dashboard.html` (the customer's sites), `assets/cloud.js` (accounts), `assets/pay.js` (checkout buttons), `paid.html` (where the phone app's checkout lands) and the editor's Publish button. The phone app is in `../app`.

## How it works for a customer

1. They design in the editor for free and press **Get my site**.
2. They create an account, pick a free address such as `joesbakery.seasidehavenllc.com`, and choose a plan.
3. They pay by card, Apple Pay or Google Pay on Stripe's secure page, and the plan switches on by itself.
4. **Monthly:** they press **Publish** and the site is live within a minute. They can edit and publish again any time, change their address or connect their own domain in Settings, and change their card or cancel in Billing. Cancelling takes the site offline at the end of the paid month.
5. **Buy outright:** they press **Save for download** in the editor, then **Download** in their dashboard.

Studio packages (Launch, Business, Growth, Polish, Revamp, care plans) use the same checkout from the pricing pages, then land on the onboarding form.

## Setup (what is left)

### 1. Connect Stripe (2 minutes)
1. In Stripe, open Developers, [API keys](https://dashboard.stripe.com/apikeys), and copy the **Secret key**.
2. In Supabase, open [Edge Functions, Secrets](https://supabase.com/dashboard/project/sspihydntrcmdaxjxjnu/settings/functions), add a secret named `STRIPE_SECRET_KEY`, and paste the key.

That's all. There are no products or payment links to create: the prices are in `supabase/functions/stripe/index.ts`. The first checkout registers the Stripe webhook by itself, and the billing page is set up by itself the first time someone opens it. Until the key is in, every Buy button falls back to the quote form.

To test without real money, paste a `sk_test_` key first and pay with card `4242 4242 4242 4242`, then swap in the `sk_live_` key.

### 2. Move the domain's DNS to Cloudflare (free; the domain, website and email stay at IONOS)
1. In Cloudflare, **Add a domain**, enter `seasidehavenllc.com`, choose the **Free** plan. Cloudflare copies the existing records.
2. Check the list includes the **MX** records (email) and the current website's records.
3. In IONOS, Domains & SSL, seasidehavenllc.com, **Nameservers**, choose custom nameservers and paste Cloudflare's two.
4. Wait for Cloudflare's "active" email, usually within an hour.

### 3. Customer sites on Cloudflare
1. Workers & Pages, **Create**, Worker, paste in `cloudflare/worker.js`, Deploy. Under Settings, Variables add `SUPABASE_URL` = `https://sspihydntrcmdaxjxjnu.supabase.co`, `SUPABASE_KEY` = the publishable key from `assets/config.js`, `BASE_DOMAIN` = `seasidehavenllc.com`, `HOME_URL` = your website.
2. In DNS, add a **proxied** `AAAA` record named `*` pointing to `100::`. Records you already have (like `www`) keep working, because a named record always wins over `*`.
3. On the Worker, Settings, Domains & Routes, add the route `*.seasidehavenllc.com/*`.

Every new customer address now works the moment they publish, with no work from you.

### 4. Sign-in emails
In Supabase, Authentication, URL Configuration, set **Site URL** to your website and add `<your website>/*` under Redirect URLs. Before launch, add your own email sender under Authentication, Emails, SMTP Settings (Resend, Postmark or similar), because Supabase's built-in email only sends a few an hour.

### 5. Customer domains (optional, later)
For customers who connect their own domain, turn on **SSL for SaaS / Custom Hostnames** for the zone (first 100 hostnames are free), set the fallback origin to any address on the domain, and route the Worker to it. Each customer domain is then added as a custom hostname.

## Good to know

- **Limits:** 20 sites per account, about 8 MB of design and 10 MB of published page per site.
- **Download lock:** the editor builds pages in the browser, so a technical customer on the free plan could still copy their own design. Hosting is fully enforced on the server.
- **Changing a price:** change it in `supabase/functions/stripe/index.ts` and redeploy the function, and change the number shown on the site (`CONFIG.editorPrice`, or the pricing pages for studio packages).
- **Phone app:** see `../app/README.md`. The website is also installable from the browser (Add to Home Screen).
