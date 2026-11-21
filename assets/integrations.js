/* =====================================================================
   SEASIDE HAVEN STUDIOS — integrations (dashboard.html, website and app)
   Features customers switch on for their own site with a toggle and their
   own link or ID. Nobody at the studio sets anything up per customer.

   This list controls what the dashboard shows. What actually goes on a live
   site is decided on the server: the database only passes on the
   integrations the site's plan includes (site_addons in
   backend/supabase/migrations/0004_integrations.sql), and the Worker checks
   every value again before adding it (backend/cloudflare/worker.js).
   To move an integration to another plan, change it here and there.
   ===================================================================== */
const INTEGRATIONS = (() => {
  const url = (v, hosts) => { try { const u = new URL(String(v).trim()); return u.protocol === "https:" && hosts.some(h => u.hostname === h || u.hostname.endsWith("." + h)); } catch (e) { return false; } };
  const BOOKING = ["calendly.com", "cal.com", "acuityscheduling.com", "as.me", "setmore.com", "squareup.com", "square.site", "simplybook.me", "zcal.co", "tidycal.com"];
  const BUY = ["buy.stripe.com", "square.link", "checkout.square.site", "paypal.com", "paypal.me", "gumroad.com"];
  const I = (d) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const label = { k: "label", label: "Button text", ph: "", optional: true, max: 30 };
  return [
    { k: "form", tier: "website", name: "Contact form inbox", color: "#2EC5E0",
      icon: I('<path d="M4 4h16v12H5.2L4 17.2z"/><path d="M8 9h8M8 12h5"/>'),
      desc: "Turns the form on your Contact page into a real one. Messages land in your inbox here and in the app.",
      fields: [] },
    { k: "maps", tier: "website", name: "Google Maps", color: "#4ADE9B",
      icon: I('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
      desc: "Shows a live map of your location on your Contact page.",
      fields: [{ k: "address", label: "Your business address", ph: "214 Harbor Street, Norfolk, VA", max: 200, ok: v => v.length >= 3, bad: "Please enter your address." }] },
    { k: "booking", tier: "website", name: "Online booking", color: "#A78BFA",
      icon: I('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
      desc: "Adds a Book button to every page. Works with Calendly, Cal.com, Acuity, Square, Setmore and more. Calendly and Cal.com calendars also show on your Contact page.",
      fields: [{ k: "url", label: "Your booking page link", ph: "https://calendly.com/yourname", ok: v => url(v, BOOKING), bad: "Paste the link to your booking page, like https://calendly.com/yourname." }, Object.assign({}, label, { ph: "Book online" })] },
    { k: "analytics", tier: "pro", name: "Google Analytics", color: "#F9AB00",
      icon: I('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
      desc: "See how many people visit your site, which pages they read and where they came from.",
      fields: [{ k: "id", label: "Measurement ID", ph: "G-XXXXXXXXXX", help: "In Google Analytics: Admin, Data streams, then your website.", ok: v => /^G-[A-Z0-9]{4,15}$/i.test(v), bad: "A measurement ID starts with G-, like G-AB12CD34EF." }] },
    { k: "pixel", tier: "pro", name: "Meta Pixel", color: "#4F8DF7",
      icon: I('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>'),
      desc: "Measure your Facebook and Instagram ads and reach people who visited your site.",
      fields: [{ k: "id", label: "Pixel ID", ph: "123456789012345", help: "In Meta Events Manager, under Data sources.", ok: v => /^\d{8,20}$/.test(v), bad: "A Pixel ID is a long number, like 123456789012345." }] },
    { k: "buy", tier: "pro", name: "Buy button", color: "#FF8A5B",
      icon: I('<path d="M6 6h15l-2 9H8L6 3H3"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>'),
      desc: "Sell a product, gift card or deposit from every page. Paste a payment link from Stripe, Square or PayPal.",
      fields: [{ k: "url", label: "Payment link", ph: "https://buy.stripe.com/…", help: "Stripe: Payment Links, New. Square: Online checkout, Payment links.", ok: v => url(v, BUY), bad: "Paste a Stripe, Square, PayPal or Gumroad payment link." }, Object.assign({}, label, { ph: "Buy now" })] },
    { k: "newsletter", tier: "pro", name: "Mailchimp newsletter", color: "#FFE01B",
      icon: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
      desc: "Your site's newsletter sign-up adds people straight to your Mailchimp list. Turn on the Newsletter sign-up section in the editor.",
      fields: [{ k: "url", label: "Mailchimp sign-up form link", ph: "https://yourname.us21.list-manage.com/subscribe?u=…&id=…", help: "In Mailchimp: Audience, Signup forms, Form builder, then copy the Signup form URL.", ok: v => url(v, ["list-manage.com"]) && /\/subscribe/.test(v), bad: "Paste the Signup form URL from Mailchimp. It contains list-manage.com/subscribe." }] },
    { k: "chat", tier: "pro", name: "Live chat", color: "#34D399",
      icon: I('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
      desc: "Chat with visitors right from your phone. Free with Tawk.to or Crisp.",
      fields: [{ k: "id", label: "Tawk.to direct chat link, or Crisp website ID", ph: "https://tawk.to/chat/…", help: "Tawk.to: Administration, Chat widget, Direct chat link. Crisp: Settings, Website settings, Setup instructions.", ok: v => /^https:\/\/tawk\.to\/chat\/[a-f0-9]{24}\/[a-z0-9]{6,16}\/?$/i.test(v) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v), bad: "Paste your Tawk.to direct chat link (https://tawk.to/chat/…) or your Crisp website ID." }] },
    { k: "embed", tier: "pro", name: "Custom embed", color: "#F472B6",
      icon: I('<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/>'),
      desc: "Add a YouTube video, Google Form, Typeform, Spotify player or any embed code to your home page.",
      fields: [{ k: "title", label: "Section title", ph: "Watch our story", optional: true, max: 80 }, { k: "code", label: "Embed code", ph: '<iframe src="https://www.youtube.com/embed/…"></iframe>', type: "textarea", max: 20000, ok: v => v.length > 6, bad: "Paste the embed code." }, { k: "height", label: "Height in pixels", ph: "420", optional: true, max: 4, ok: v => !v || (+v >= 80 && +v <= 1500), bad: "Use a height between 80 and 1500." }] },
    { k: "zapier", tier: "pro", name: "Zapier and webhooks", color: "#FF6A3D",
      icon: I('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
      desc: "Send every contact form message to Zapier, Make or your own app, to add it to Google Sheets, your CRM or your email.",
      needs: "form",
      fields: [{ k: "url", label: "Webhook address", ph: "https://hooks.zapier.com/hooks/catch/…", help: "In Zapier: make a Zap with Webhooks by Zapier, Catch Hook, then copy the address.", ok: v => /^https:\/\/[^/\s]+\.[^/\s]+/.test(v), bad: "Paste a web address that starts with https://." }] }
  ];
})();

/* the Integrations screen and the Messages inbox, both opened from a site card */
const IntegrationsUI = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const lock = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  let site = null, saved = {}, opts = {};

  /* what this site's plan includes: "pro", "website" or "" (not hosted) */
  const tierOf = s => (s && s.plan === "monthly" ? (s.tier === "pro" ? "pro" : "website") : "");
  const allowed = (s, it) => { const t = tierOf(s); return it.tier === "website" ? !!t : t === "pro"; };

  function card(it) {
    const v = saved[it.k] || {}, ok = allowed(site, it), on = ok && v.on === true;
    const tag = it.tier === "pro" ? `<span class="int-tag pro">Pro</span>` : "";
    const ctl = ok
      ? `<label class="sw" title="Switch ${esc(it.name)} on or off"><input type="checkbox" role="switch" ${on ? "checked" : ""} aria-label="${esc(it.name)}"><i></i></label>`
      : `<button class="btn btn-ghost btn-sm int-up" type="button">${lock}${it.tier === "pro" ? "Go Pro" : "Choose a plan"}</button>`;
    const fields = it.fields.map(f => `<label>${esc(f.label)}${f.optional ? ' <span class="opt">optional</span>' : ""}
        ${f.type === "textarea" ? `<textarea name="${f.k}" rows="4" placeholder="${esc(f.ph)}" maxlength="${f.max || 20000}" spellcheck="false">${esc(v[f.k] || "")}</textarea>`
          : `<input name="${f.k}" value="${esc(v[f.k] || "")}" placeholder="${esc(f.ph)}" maxlength="${f.max || 2000}" autocapitalize="off" autocomplete="off" spellcheck="false"${f.k === "height" ? ' inputmode="numeric"' : ""}>`}
        ${f.help ? `<small>${esc(f.help)}</small>` : ""}</label>`).join("");
    return `<article class="int${ok ? "" : " locked"}${on ? " on" : ""}" data-k="${it.k}">
      <div class="int-top"><span class="int-ic" style="--ic:${it.color}">${it.icon}</span><div class="int-t"><b>${esc(it.name)}</b>${tag}</div>${ctl}</div>
      <p class="int-d">${esc(it.desc)}</p>
      ${ok && it.fields.length ? `<form class="f int-f" novalidate ${on ? "" : "hidden"}>${fields}<div class="row"><button class="btn btn-grad btn-sm" type="submit">${on ? "Save changes" : "Save and switch on"}</button></div></form>` : ""}
      <p class="msg" hidden></p></article>`;
  }
  function render() {
    const t = tierOf(site), live = !!site.published_at;
    $("#dIntName").textContent = site.name;
    $("#dIntPlan").textContent = t === "pro" ? "Pro plan" : t === "website" ? "Website plan" : site.plan === "owned" ? "Owned (downloaded)" : "Free plan";
    $("#dIntPlan").className = "chip " + (t === "pro" ? "sea" : t ? "green" : "");
    const note = $("#dIntNote");
    note.innerHTML = !t ? (site.plan === "owned"
        ? "Integrations run on sites we host. Your site is downloaded, so switch to the Website or Pro plan to use them."
        : "Integrations come with the Website and Pro plans. Pick a plan to switch them on.") + ` <button class="linkish" type="button" data-plans>See plans</button>`
      : t === "website" ? `Your plan includes the first three. Go Pro for $${opts.pro || 15} a month to unlock all of them. <button class="linkish" type="button" data-plans="pro">See Pro</button>`
      : live ? "Every integration is included. Changes show on your live site within a minute, no need to publish again." : "Every integration is included. They show on your site once you publish it.";
    const groups = [["website", "Included with the Website plan"], ["pro", "Pro"]];
    $("#dIntList").innerHTML = groups.map(([g, h]) => `<h3 class="int-h">${h}</h3><div class="int-grid">${INTEGRATIONS.filter(it => it.tier === g).map(card).join("")}</div>`).join("");
  }
  async function save(k, val, el) {
    const msg = $(".msg", el), next = Object.assign({}, saved, { [k]: val });
    msg.hidden = true;
    try {
      await Cloud.saveSite(site.id, { integrations: next });
      saved = next; site.integrations = next;
      const t = $("button[type=submit]", el); if (t) t.textContent = val.on ? "Save changes" : "Save and switch on";
      el.classList.toggle("on", !!val.on);
      msg.textContent = val.on ? (site.published_at ? "Saved. It's on your live site within a minute." : "Saved. It shows once you publish your site.") : "Switched off.";
      msg.className = "msg ok"; msg.hidden = false;
      if (opts.onChange) opts.onChange(site);
      return true;
    } catch (e) {
      msg.textContent = /integrations/.test(e.message || "") ? "Integrations aren't switched on for accounts yet. Please try again later." : e.message;
      msg.className = "msg err"; msg.hidden = false; return false;
    }
  }
  function read(it, form) {
    const v = { on: true };
    for (const f of it.fields) {
      const raw = form.elements[f.k].value.trim(); form.elements[f.k].value = raw;
      if (!raw && f.optional) continue;
      if (!raw && !f.optional) return { error: f.bad || "Please fill this in.", el: form.elements[f.k] };
      if (f.ok && !f.ok(raw)) return { error: f.bad, el: form.elements[f.k] };
      v[f.k] = f.k === "id" && it.k === "analytics" ? raw.toUpperCase() : raw;
    }
    return { v };
  }

  function wire() {
    const list = $("#dIntList");
    list.addEventListener("change", async e => {
      const sw = e.target.closest(".sw input"); if (!sw) return;
      const el = sw.closest(".int"), it = INTEGRATIONS.find(x => x.k === el.dataset.k), form = $(".int-f", el), prev = saved[it.k] || {};
      if (sw.checked) {
        if (it.needs && !(saved[it.needs] || {}).on) {
          sw.checked = false; const m = $(".msg", el);
          m.textContent = `Switch on ${INTEGRATIONS.find(x => x.k === it.needs).name} first.`; m.className = "msg err"; m.hidden = false; return;
        }
        if (!form) { if (!(await save(it.k, Object.assign({}, prev, { on: true }), el))) sw.checked = false; return; }
        form.hidden = false; const first = form.querySelector("input,textarea"); if (first && !first.value) first.focus();
      } else {
        if (form && !prev.on) { form.hidden = true; return; } // never saved: just fold it away
        if (!(await save(it.k, Object.assign({}, prev, { on: false }), el))) { sw.checked = true; return; }
        if (form) form.hidden = true;
      }
    });
    list.addEventListener("submit", async e => {
      e.preventDefault();
      const form = e.target, el = form.closest(".int"), it = INTEGRATIONS.find(x => x.k === el.dataset.k), r = read(it, form), msg = $(".msg", el);
      if (r.error) { msg.textContent = r.error; msg.className = "msg err"; msg.hidden = false; if (r.el) r.el.focus(); return; }
      const b = $("button[type=submit]", form); b.disabled = true;
      await save(it.k, r.v, el); b.disabled = false;
    });
    $("#dInt").addEventListener("click", e => {
      const up = e.target.closest(".int-up, [data-plans]"); if (!up) return;
      const card = up.closest(".int"), it = card && INTEGRATIONS.find(x => x.k === card.dataset.k);
      $("#dInt").close();
      if (opts.plans) opts.plans(site, up.dataset.plans || (it && it.tier === "pro" ? "pro" : "website"));
    });
  }

  /* ---------- Messages inbox ---------- */
  const when = d => new Date(d).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  async function inbox(s) {
    site = s;
    $("#dInboxName").textContent = s.name;
    const list = $("#dInboxList");
    list.innerHTML = `<div class="panel skel" style="min-height:90px"></div>`;
    $("#dInbox").showModal();
    let rows = [];
    try { rows = await Cloud.messages(s.id) || []; } catch (e) { list.innerHTML = `<p class="msg err">${esc(e.message)}</p>`; return; }
    const formOn = s.form === "true" || ((s.integrations || {}).form || {}).on === true;
    list.innerHTML = rows.length ? rows.map(m => {
      const mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email || "");
      return `<article class="note${m.read ? "" : " new"}" data-id="${esc(m.id)}">
        <div class="note-top"><b>${esc(m.name || "Someone")}</b><time>${esc(when(m.created_at))}</time></div>
        ${m.email ? `<span class="note-from">${esc(m.email)}</span>` : ""}
        <p>${esc(m.message)}</p>
        <div class="row">${mail ? `<a class="btn btn-grad btn-sm" href="mailto:${esc(m.email)}?subject=${encodeURIComponent("Re: your message to " + s.name)}">Reply</a>` : ""}<button class="btn btn-ghost btn-sm" type="button" data-del>Delete</button></div></article>`;
    }).join("") : `<div class="inbox-empty"><b>No messages yet</b><p>${formOn ? "When someone sends the form on your Contact page, it shows up here." : "Switch on Contact form inbox in Integrations and messages from your site show up here."}</p></div>`;
    if (rows.some(m => !m.read)) { try { await Cloud.markRead(s.id); if (opts.onChange) opts.onChange(s); } catch (e) { /* stays bold until next time */ } }
  }
  function wireInbox() {
    $("#dInboxList").addEventListener("click", async e => {
      const b = e.target.closest("[data-del]"); if (!b) return;
      const n = b.closest(".note");
      if (!confirm("Delete this message?")) return;
      try { await Cloud.deleteMessage(n.dataset.id); n.remove(); if (!$("#dInboxList .note")) inbox(site); } catch (err) { alert(err.message); }
    });
  }

  let wired = false;
  return {
    tierOf,
    /* opts: { plans(site, focus), onChange(site), pro } */
    async open(s, o = {}) {
      opts = o; site = s;
      if (!wired) { wire(); wireInbox(); wired = true; }
      saved = {};
      $("#dIntList").innerHTML = `<div class="panel skel" style="min-height:120px"></div>`;
      $("#dInt").showModal();
      try { const row = await Cloud.getSite(s.id); saved = (row && row.integrations) || {}; site = Object.assign({}, s, { integrations: saved, tier: row && row.tier || s.tier }); }
      catch (e) { saved = s.integrations || {}; }
      render();
    },
    async inbox(s, o = {}) { opts = o; if (!wired) { wire(); wireInbox(); wired = true; } return inbox(s); }
  };
})();
