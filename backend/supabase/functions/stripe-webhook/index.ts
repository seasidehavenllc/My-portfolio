// Stripe webhook: turns a customer's site on when they pay and off when they cancel.
//
// Secrets this function needs (Supabase dashboard, Edge Functions, Secrets):
//   STRIPE_WEBHOOK_SECRET   the signing secret of the Stripe webhook endpoint (whsec_...)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
//
// In Stripe, point a webhook at this function's URL and send it these events:
//   checkout.session.completed, customer.subscription.deleted, customer.subscription.updated
//
// The site editor adds ?client_reference_id=<site id> to each payment link, which is how a
// payment is matched to a site. A subscription checkout means the monthly plan; a one-time
// payment means the site was bought outright.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const enc = new TextEncoder();
const hex = (b: ArrayBuffer) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");

// Stripe signs "<timestamp>.<body>" with HMAC-SHA256. Reject anything unsigned, altered or old.
async function verified(body: string, header: string | null, secret: string): Promise<boolean> {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = parts["t"], sigs = header.split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const want = hex(await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${body}`)));
  return sigs.some((s) => {
    if (s.length !== want.length) return false;
    let d = 0;
    for (let i = 0; i < s.length; i++) d |= s.charCodeAt(i) ^ want.charCodeAt(i);
    return d === 0;
  });
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!secret) return new Response("Webhook secret is not set", { status: 500 });
  const body = await req.text();
  if (!(await verified(body, req.headers.get("stripe-signature"), secret))) return new Response("Bad signature", { status: 400 });

  const event = JSON.parse(body), o = event.data?.object ?? {};
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  let error = null;

  if (event.type === "checkout.session.completed" && o.payment_status !== "unpaid") {
    const site = String(o.client_reference_id ?? "");
    if (UUID.test(site)) {
      const sub = o.mode === "subscription";
      const change: Record<string, unknown> = { stripe_customer: o.customer ?? null };
      if (sub) { change.plan = "monthly"; change.stripe_subscription = o.subscription ?? null; }
      else {
        // buying outright never switches off a running monthly plan
        const { data } = await db.from("sites").select("plan").eq("id", site).maybeSingle();
        if (data && data.plan !== "monthly") change.plan = "owned";
      }
      ({ error } = await db.from("sites").update(change).eq("id", site));
    }
  } else if (event.type === "customer.subscription.deleted") {
    ({ error } = await db.from("sites").update({ plan: "free", stripe_subscription: null }).eq("stripe_subscription", o.id));
  } else if (event.type === "customer.subscription.updated") {
    // unpaid or paused subscriptions take the site offline; paying again brings it back
    const live = ["active", "trialing", "past_due"].includes(o.status);
    ({ error } = await db.from("sites").update({ plan: live ? "monthly" : "free" }).eq("stripe_subscription", o.id));
  }

  if (error) return new Response("Database error", { status: 500 }); // Stripe retries on a 500
  return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
});
