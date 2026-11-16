// Contact form inbox for customer sites.
//
// When a customer switches on the "Contact form" integration, the publishing service (Cloudflare
// Worker) turns the form on their Contact page into a real form. Visitors' messages are posted to the
// Worker at /__form, and the Worker passes them here. This function:
//   - checks the site is live and has the contact form switched on
//   - keeps out spam bots (a hidden field) and floods (30 messages an hour per site)
//   - saves the message, so the customer reads it under Messages in their dashboard or the app
//   - Pro plan: also sends it to the customer's own Zapier, Make or webhook address, if they added one
//
// There is nothing to set up: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
// Deploy with JWT verification off (the Worker calls it with the project's publishable key).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
const clip = (v: unknown, n: number) => String(v ?? "").replace(/\u0000/g, "").trim().slice(0, n);
const PER_HOUR = 30;

// only plain https web addresses on the public internet may receive messages
function hookUrl(u: unknown) {
  try {
    const x = new URL(String(u));
    if (x.protocol !== "https:" || x.username || x.password || x.port) return null;
    if (/^(localhost|.*\.local|.*\.internal|\d+\.\d+\.\d+\.\d+|\[.*\])$/i.test(x.hostname)) return null;
    return x.href;
  } catch (_) { return null; }
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch (_) { return json({ error: "Bad request" }, 400); }

  // a hidden field people never see: bots fill it in. Pretend it worked.
  if (clip(b.website, 200)) return json({ ok: true });

  const message = clip(b.message, 5000), name = clip(b.name, 200), email = clip(b.email, 320);
  if (!message) return json({ error: "Please write a message." }, 400);

  const sub = typeof b.sub === "string" ? b.sub.toLowerCase() : null, domain = typeof b.domain === "string" ? b.domain.toLowerCase() : null;
  if (!sub && !domain) return json({ error: "Unknown site" }, 400);
  let q = db.from("sites").select("id, name, slug, plan, tier, integrations").eq("plan", "monthly");
  q = sub ? q.eq("slug", sub) : q.eq("custom_domain", domain!);
  const { data: site } = await q.maybeSingle();
  const I = (site?.integrations ?? {}) as Record<string, Record<string, unknown>>;
  if (!site || I.form?.on !== true) return json({ error: "This form isn't taking messages right now." }, 404);

  const since = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await db.from("form_messages").select("id", { count: "exact", head: true }).eq("site", site.id).gte("created_at", since);
  if ((count ?? 0) >= PER_HOUR) return json({ error: "This site has had a lot of messages. Please try again in a little while." }, 429);

  const { error } = await db.from("form_messages").insert({ site: site.id, name: name || null, email: email || null, message });
  if (error) { console.error(error); return json({ error: "Couldn't send your message. Please try again." }, 500); }

  // Pro: pass it on to Zapier, Make or the customer's own app
  const hook = site.tier === "pro" && I.zapier?.on === true ? hookUrl(I.zapier.url) : null;
  if (hook) {
    try {
      await fetch(hook, {
        method: "POST", headers: { "Content-Type": "application/json" }, redirect: "manual", signal: AbortSignal.timeout(5000),
        body: JSON.stringify({ site: site.name, address: site.slug, name, email, message, received_at: new Date().toISOString() }),
      });
    } catch (e) { console.error("webhook", e); /* the message is saved either way */ }
  }
  return json({ ok: true });
});
