// Card payments for the whole site, through Stripe. This one function:
//   - opens Stripe's card checkout for any package or plan (POST {action:"checkout"})
//   - switches a site's plan on the moment the customer lands back on the site (POST {action:"confirm"})
//   - opens Stripe's billing page so customers can change their card or cancel (POST {action:"portal"})
//   - receives Stripe's payment and cancellation events (Stripe posts them here directly)
//
// The only setup is one secret (Supabase dashboard, Edge Functions, Secrets):
//   STRIPE_SECRET_KEY   from Stripe, Developers, API keys (sk_live_... or sk_test_...)
// Prices live in PRICES below, so there are no products or payment links to create in Stripe.
// The first checkout registers this function as a Stripe webhook by itself, and every event is
// checked by fetching it back from Stripe, so no webhook signing secret is needed either.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

type Price = { name: string; cents: number; monthly?: boolean; site?: "monthly" | "owned"; desc?: string };
// Keep these in step with the prices shown on the site (CONFIG.editorPrice and the pricing pages).
const PRICES: Record<string, Price> = {
  editorMonthly: { name: "Website plan", cents: 500, monthly: true, site: "monthly", desc: "Your site online at your own address. Cancel any time." },
  editorBuy: { name: "Website, bought outright", cents: 4900, site: "owned", desc: "Download your finished site and host it anywhere." },
  launch: { name: "Launch: template website", cents: 44900, desc: "One of our templates customized to your brand, live in about a week." },
  business: { name: "Business website, 50% deposit", cents: 75000, desc: "Deposit on a $1,499 custom website. The rest is due at launch." },
  growth: { name: "Growth website, 50% deposit", cents: 150000, desc: "Deposit on a $2,999 store or booking website. The rest is due at launch." },
  polish: { name: "Polish: website refresh", cents: 19900, desc: "We make your current site look and work like new." },
  revamp: { name: "Revamp, 50% deposit", cents: 45000, desc: "Deposit on an $899 redesign. The rest is due at launch." },
  revampPlus: { name: "Revamp Plus, 50% deposit", cents: 90000, desc: "Deposit on a $1,799 redesign with store or booking. The rest is due at launch." },
  careHost: { name: "Host plan", cents: 1900, monthly: true, desc: "Hosting, SSL, backups and 30 minutes of edits a month." },
  careCare: { name: "Care plan", cents: 3900, monthly: true, desc: "Everything in Host plus 2 hours of edits a month." },
  careGrow: { name: "Grow plan", cents: 9900, monthly: true, desc: "Everything in Care plus 5 hours of edits and SEO work a month." },
};
const EVENTS = ["checkout.session.completed", "customer.subscription.updated", "customer.subscription.deleted"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const fail = (error: string, status = 400) => json({ error }, status);

const KEY = () => Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const SELF = Deno.env.get("SUPABASE_URL")!.replace(/\/$/, "") + "/functions/v1/stripe";

// Stripe's API takes form fields with nested keys, e.g. line_items[0][price_data][currency]=usd
function form(o: Record<string, unknown>, pre = "", out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(o)) {
    if (v === undefined || v === null) continue;
    const key = pre ? `${pre}[${k}]` : k;
    if (typeof v === "object") form(v as Record<string, unknown>, key, out);
    else out.append(key, String(v));
  }
  return out;
}
async function stripe(path: string, body?: Record<string, unknown>) {
  const r = await fetch("https://api.stripe.com/v1/" + path, {
    method: body ? "POST" : "GET",
    headers: { Authorization: "Bearer " + KEY(), "Content-Type": "application/x-www-form-urlencoded" },
    body: body ? form(body) : undefined,
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message ?? "Stripe error");
  return data;
}

// Register this function as the Stripe webhook the first time a checkout opens.
let hooked = false;
async function ensureWebhook() {
  if (hooked) return;
  const list = await stripe("webhook_endpoints?limit=100");
  const have = list.data.find((w: { url: string }) => w.url === SELF);
  if (!have) await stripe("webhook_endpoints", { url: SELF, enabled_events: EVENTS, description: "Site builder plans (added automatically)" });
  hooked = true;
}

// Who is calling, from their sign-in token (null when signed out).
async function caller(req: Request) {
  const t = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!t || t.startsWith("sb_")) return null;
  const { data } = await db.auth.getUser(t);
  return data?.user ?? null;
}
// Only plain web addresses may be used to send people back after paying.
function backTo(u: unknown) {
  try {
    const x = new URL(String(u));
    if (x.protocol === "https:" || (x.protocol === "http:" && ["localhost", "127.0.0.1"].includes(x.hostname))) return x.origin + x.pathname.replace(/[^/]*$/, "");
  } catch (_) { /* fall through */ }
  return null;
}

// A finished checkout: switch the site on. Used by both the webhook and the instant confirm.
async function applySession(s: Record<string, any>) {
  const site = String(s.client_reference_id ?? s.metadata?.site ?? "");
  if (!UUID.test(site) || s.payment_status === "unpaid" || s.status !== "complete") return;
  const item = PRICES[String(s.metadata?.item ?? "")];
  if (!item?.site) return;
  const change: Record<string, unknown> = { stripe_customer: s.customer ?? null };
  if (item.site === "monthly") { change.plan = "monthly"; change.stripe_subscription = s.subscription ?? null; }
  else {
    // buying outright never switches off a running monthly plan
    const { data } = await db.from("sites").select("plan").eq("id", site).maybeSingle();
    if (data && data.plan !== "monthly") change.plan = "owned";
  }
  const { error } = await db.from("sites").update(change).eq("id", site);
  if (error) throw error;
}

async function onEvent(body: string) {
  // Never trust the posted body: fetch the event back from Stripe by its id.
  const id = JSON.parse(body)?.id;
  if (typeof id !== "string" || !id.startsWith("evt_")) return fail("Not a Stripe event");
  const event = await stripe("events/" + encodeURIComponent(id));
  const o = event.data?.object ?? {};
  let error = null;
  if (event.type === "checkout.session.completed") await applySession(o);
  else if (event.type === "customer.subscription.deleted") {
    ({ error } = await db.from("sites").update({ plan: "free", stripe_subscription: null }).eq("stripe_subscription", o.id));
  } else if (event.type === "customer.subscription.updated") {
    // unpaid or paused subscriptions take the site offline; paying again brings it back
    const live = ["active", "trialing", "past_due"].includes(o.status);
    ({ error } = await db.from("sites").update({ plan: live ? "monthly" : "free" }).eq("stripe_subscription", o.id));
  }
  if (error) return fail("Database error", 500); // Stripe retries on a 500
  return json({ received: true });
}

async function checkout(req: Request, b: Record<string, any>) {
  const item = PRICES[String(b.item)];
  if (!item) return fail("Unknown package");
  const back = backTo(b.back);
  if (!back) return fail("Missing return address");
  const user = await caller(req);
  let site: string | null = null, customer: string | null = null;
  if (item.site) {
    if (!user) return fail("Please sign in first.", 401);
    site = String(b.site ?? "");
    const { data } = await db.from("sites").select("id, owner").eq("id", site).maybeSingle();
    if (!UUID.test(site) || !data || data.owner !== user.id) return fail("That site isn't in your account.", 403);
    // reuse their Stripe customer so every plan shows up on one billing page
    const { data: prev } = await db.from("sites").select("stripe_customer").eq("owner", user.id).not("stripe_customer", "is", null).limit(1);
    customer = prev?.[0]?.stripe_customer ?? null;
  }
  try { await ensureWebhook(); } catch (e) { console.error("webhook setup", e); /* the instant confirm still works */ }
  // the phone app shows checkout in a sheet, so it lands on a small page that says "tap Done"
  const done = item.site && b.app ? `${back}paid.html?session={CHECKOUT_SESSION_ID}` : item.site ? `${back}dashboard.html?paid={CHECKOUT_SESSION_ID}` : `${back}welcome.html?paid={CHECKOUT_SESSION_ID}&item=${b.item}`;
  const cancel = item.site ? `${back}dashboard.html` : `${back}${b.from && /^[a-z]+\.html$/.test(b.from) ? b.from : "pricing.html"}`;
  const ref = String(b.ref ?? "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 120);
  const s = await stripe("checkout/sessions", {
    mode: item.monthly ? "subscription" : "payment",
    line_items: [{ quantity: 1, price_data: { currency: "usd", unit_amount: item.cents, product_data: { name: item.name, description: item.desc }, recurring: item.monthly ? { interval: "month" } : undefined } }],
    success_url: done, cancel_url: cancel,
    client_reference_id: site ?? (ref || undefined),
    customer: customer ?? undefined,
    customer_email: customer ? undefined : (user?.email ?? undefined),
    customer_creation: !customer && !item.monthly ? "always" : undefined,
    metadata: { item: b.item, site: site ?? undefined, ref: ref || undefined },
    subscription_data: item.monthly ? { metadata: { item: b.item, site: site ?? undefined } } : undefined,
    allow_promotion_codes: "true",
    billing_address_collection: "auto",
  });
  return json({ url: s.url });
}

async function confirm(b: Record<string, any>) {
  const id = String(b.session ?? "");
  if (!/^cs_[A-Za-z0-9_]+$/.test(id)) return fail("Missing checkout");
  const s = await stripe("checkout/sessions/" + id);
  await applySession(s);
  return json({ paid: s.status === "complete" && s.payment_status !== "unpaid", item: s.metadata?.item ?? null });
}

async function portal(req: Request, b: Record<string, any>) {
  const user = await caller(req);
  if (!user) return fail("Please sign in first.", 401);
  const { data } = await db.from("sites").select("stripe_customer").eq("owner", user.id).not("stripe_customer", "is", null).limit(1);
  const customer = data?.[0]?.stripe_customer;
  if (!customer) return fail("You don't have any paid plans yet.", 404);
  // Stripe's billing page needs a settings record; make one the first time.
  const conf = await stripe("billing_portal/configurations?is_default=true&active=true&limit=1");
  let configuration: string | undefined;
  if (!conf.data.length) {
    configuration = (await stripe("billing_portal/configurations", {
      features: {
        customer_update: { enabled: "true", allowed_updates: ["email", "address"] },
        payment_method_update: { enabled: "true" },
        invoice_history: { enabled: "true" },
        subscription_cancel: { enabled: "true", mode: "at_period_end" },
      },
    })).id;
  }
  const back = backTo(b.back);
  const s = await stripe("billing_portal/sessions", { customer, configuration, return_url: back ? back + "dashboard.html" : undefined });
  return json({ url: s.url });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return fail("Method not allowed", 405);
  if (!KEY()) return fail("Card payments aren't switched on yet.", 503);
  const body = await req.text();
  try {
    if (req.headers.get("stripe-signature")) return await onEvent(body);
    const b = JSON.parse(body || "{}");
    if (b.object === "event") return await onEvent(body);
    if (b.action === "checkout") return await checkout(req, b);
    if (b.action === "confirm") return await confirm(b);
    if (b.action === "portal") return await portal(req, b);
    return fail("Unknown action");
  } catch (e) {
    console.error(e);
    return fail(e instanceof Error ? e.message : "Something went wrong", 500);
  }
});
