/* =====================================================================
   SEASIDE HAVEN STUDIOS — customer dashboard (dashboard.html)
   Lists the signed-in customer's sites and lets them edit, publish,
   pick a plan, change the address, connect a domain, download,
   manage billing and delete. Data lives in Supabase (assets/cloud.js).
   ===================================================================== */
(async () => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const qp = new URLSearchParams(location.search);
  const say = (el, text, kind = "err") => { el.textContent = text; el.className = "msg " + kind; el.hidden = !text; };
  const EP = CONFIG.editorPrice || {}, monthly = +EP.monthly || 0, pro = +EP.pro || 15, buy = +EP.buy || 0;
  const PLAN = { free: ["Free", "chip"], monthly: ["Live", "chip green"], owned: ["Owned", "chip sea"] };
  /* the Free plan: a free site is online once it has been published, at its free address only */
  const freeLive = s => s.plan === "free" && !!s.published_at;
  const base = Cloud.domain || "yourdomain.com";
  const isPro = s => s.plan === "monthly" && s.tier === "pro";
  let sites = [], user = null, cur = null, unread = {};

  if (!Cloud.on) { say($("#dMsg"), "Customer accounts aren't switched on yet. You can still design for free in the editor.", "info"); return; }
  user = await Cloud.user();
  if (!user) { location.replace("account.html?next=" + encodeURIComponent(location.pathname.split("/").pop() + location.search)); return; }
  $("#dWho").textContent = user.email || "";
  /* profile button: initials from the email, like Wix and Squarespace */
  const initials = (user.email || "?").split("@")[0].split(/[._-]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
  $("#dInit").textContent = $("#dInit2").textContent = initials;
  const openMe = () => { $("#dPlanSum").textContent = sites.some(isPro) ? "Pro plan · $" + pro + "/month" : sites.some(s => s.plan === "monthly") ? "Website plan · $" + monthly + "/month" : sites.some(s => s.plan === "owned") ? "Owned site" : "Free plan"; $("#dMe").showModal(); };
  $("#dMeBtn").addEventListener("click", openMe); $("#dMeTab").addEventListener("click", openMe);
  $("#dBill").addEventListener("click", async () => {
    if (!sites.some(s => s.plan !== "free")) { $("#dMe").close(); const s = sites[0]; if (s) { cur = s; openPlans(s); } else location.href = "pricing.html"; return; }
    if (Cloud.portal) { open(Cloud.portal, "_blank", "noopener"); return; }
    try { await Pay.portal(); } catch (err) { $("#dMe").close(); say($("#dMsg"), err.message); }
  });
  $("#dSetBase").textContent = $("#dClaimBase").textContent = "." + (Cloud.domain || "yourdomain.com");

  document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => b.closest("dialog").close()));
  document.querySelectorAll("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));
  $("#dOut").addEventListener("click", async () => { await Cloud.signOut(); location.replace("account.html"); });

  /* ---------- list ---------- */
  const when = d => d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "";
  function card(s) {
    const live = (s.plan === "monthly" && s.published_at) || freeLive(s), addr = s.plan === "free" ? s.slug + "." + base : Cloud.address(s);
    const [pl, cls] = freeLive(s) ? ["Free · Live", "chip green"] : isPro(s) ? ["Pro · Live", "chip sea"] : PLAN[s.plan] || PLAN.free;
    const n = unread[s.id] || 0;
    const status = s.plan === "monthly" ? (s.published_at ? "Published " + when(s.published_at) : "Not published yet. Open the editor and press Publish.")
      : s.plan === "owned" ? (s.published_at ? "Ready to download" : "Open the editor and press Save for download.")
      : freeLive(s) ? "Published free " + when(s.published_at) + ". Upgrade to remove the badge and use your own domain."
      : "Edited " + when(s.updated_at) + ". Put it online free, or pick a plan.";
    return `<article class="panel site" data-id="${esc(s.id)}">
      <div class="site-top"><h2>${esc(s.name)}</h2><span class="${cls}">${pl}</span></div>
      ${live ? `<a class="addr" href="https://${esc(addr)}" target="_blank" rel="noopener">${esc(addr)} ↗</a>` : `<span class="addr off">${esc(addr)}</span>`}
      <p class="site-meta">${esc(status)}</p>
      <div class="site-acts">
        <a class="btn btn-grad btn-sm" href="editor.html?site=${encodeURIComponent(s.id)}">Edit</a>
        ${s.plan === "free" ? `<button class="btn btn-ghost btn-sm" type="button" data-act="plans">${freeLive(s) ? "Upgrade" : "Put it online"}</button>` : ""}
        ${s.plan !== "free" && s.published_at ? `<button class="btn btn-ghost btn-sm" type="button" data-act="download">Download</button>` : ""}
        ${s.plan !== "free" && (Pay.on || Cloud.portal) ? `<a class="btn btn-ghost btn-sm" data-billing href="${esc(Cloud.portal || "#")}" target="_blank" rel="noopener">Billing</a>` : ""}
        <button class="btn btn-ghost btn-sm" type="button" data-act="integrations">Integrations</button>
        ${s.form === "true" || n ? `<button class="btn btn-ghost btn-sm" type="button" data-act="inbox">Messages${n ? ` <span class="badge" aria-label="${n} new">${n}</span>` : ""}</button>` : ""}
        <button class="btn btn-ghost btn-sm" type="button" data-act="settings">Settings</button>
      </div></article>`;
  }
  async function refresh() {
    try { sites = await Cloud.listSites() || []; }
    catch (e) { say($("#dMsg"), e.message); return; }
    /* new contact form messages, counted per site (nothing to count before the inbox exists) */
    unread = {};
    try { (await Cloud.unread() || []).forEach(r => { unread[r.site] = (unread[r.site] || 0) + 1; }); } catch (e) { unread = {}; }
    document.body.classList.toggle("no-sites", !sites.length);
    $("#dSites").innerHTML = sites.length ? sites.map(card).join("") : `<div class="panel empty first" style="grid-column:1/-1">
      <div class="fan" aria-hidden="true"><div class="fan-c" data-tid="ember"></div><div class="fan-c" data-tid="harbor"></div><div class="fan-c" data-tid="velvet"></div></div>
      <h2>Your first site <em>starts here.</em></h2>
      <p>Choose from ${typeof TEMPLATES !== "undefined" ? TEMPLATES.length : 54} designs made for real businesses. Your first site goes online free. Upgrade from $${monthly} a month for every design and your own domain.</p>
      <a class="e-go" href="new.html">Browse designs<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      <p class="meta-line">Rather have us build it? <a href="pricing.html#new">See studio packages</a></p></div>`;
    if (!sites.length && typeof tpRender === "function") document.querySelectorAll(".fan-c").forEach(el => {
      const t = tplGet(el.dataset.tid); if (!t) return;
      el.innerHTML = `<div class="scale" style="width:390px">${tpRender(t)}</div>`;
      el.firstElementChild.style.transform = `scale(${el.clientWidth / 390})`;
    });
  }
  /* billing: Stripe's own page for changing a card, seeing receipts or cancelling */
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-billing], #dPortal"); if (!b || !Pay.on) return;
    e.preventDefault();
    try { await Pay.portal(); } catch (err) { say($("#dMsg"), err.message); }
  });
  $("#dSites").addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    cur = sites.find(s => s.id === b.closest("[data-id]").dataset.id); if (!cur) return;
    ({ plans: openPlans, download, settings: openSettings, integrations: openInt, inbox: openInbox })[b.dataset.act](cur);
  });

  /* ---------- plans ---------- */
  const pay = Pay.on;
  function openPlans(s, focus) {
    $("#dMoPrice").textContent = "$" + monthly; $("#dProPrice").textContent = "$" + pro; $("#dBuyPrice").textContent = "$" + buy;
    $("#dPayMo").href = `contact.html?design=1&plan=Hosted`; $("#dPayPro").href = `contact.html?design=1&plan=Pro`; $("#dPayBuy").href = `contact.html?design=1&plan=Download`;
    $("#dPayBuy").textContent = `Buy for $${buy}`;
    /* on a monthly plan already: switch between Website and Pro (the old plan is cancelled and the unused days credited) */
    const mo = s.plan === "monthly", tierNow = mo ? (isPro(s) ? "pro" : "website") : "", proFirst = focus === "pro" || tierNow === "website";
    const setBtn = (b, text, current, main) => { b.textContent = text; b.setAttribute("aria-disabled", String(!!current)); b.className = "btn " + (main ? "btn-grad" : "btn-ghost"); };
    setBtn($("#dPayMo"), tierNow === "website" ? "Your current plan" : tierNow === "pro" ? "Switch to Website" : `Start for $${monthly}/month`, tierNow === "website", !proFirst);
    setBtn($("#dPayPro"), tierNow === "pro" ? "Your current plan" : tierNow === "website" ? `Upgrade to Pro · $${pro}/month` : `Go Pro for $${pro}/month`, tierNow === "pro", proFirst);
    $("#dProCard").classList.toggle("best", proFirst);
    $("#dMoCard").classList.toggle("best", !proFirst);
    $("#dBuyRow").hidden = mo;
    $("#dPlansT").textContent = mo ? "Change plan" : focus === "pro" ? "Go Pro" : "Choose a plan";
    $("#dAllN").textContent = typeof TEMPLATES !== "undefined" ? TEMPLATES.length : 54;
    $("#dFreeAddr").textContent = s.slug + "." + base;
    $("#dFreeBadge").hidden = !Free.badge;
    /* the Free card: say plainly when this site can't use it, and why (the server checks the same things) */
    const other = sites.filter(x => x.id !== s.id && freeLive(x)), full = !freeLive(s) && other.length >= Free.sites;
    const why = !Free.ok(s.tpl) ? "This site uses a paid design. Switch to a starter design in the editor to publish free, or upgrade."
      : full ? `Free includes ${Free.sites} published site${Free.sites === 1 ? "" : "s"}, and "${other[0].name}" is using it. Upgrade this one to publish it too.` : "";
    const fb = $("#dPayFree");
    fb.textContent = freeLive(s) && !why ? "Your current plan" : "Publish free";
    fb.href = "editor.html?site=" + encodeURIComponent(s.id) + "&publish=1";
    fb.setAttribute("aria-disabled", String(!!why || freeLive(s)));
    $("#dFreeWhy").textContent = why; $("#dFreeWhy").hidden = !why;
    $("#dFreeCard").hidden = s.plan !== "free";
    $("#dPlans .plans").classList.toggle("three", s.plan === "free");
    $("#dPlansLead").innerHTML = mo ? `Switch plans for <b>${esc(s.name)}</b> any time. Unused days on your old plan are credited to your next bill.` : `Start free and upgrade when you're ready. Pick a plan for <b>${esc(s.name)}</b>.`;
    say($("#dPlansMsg"), "");
    $("#dPlansNote").textContent = pay ? "Pay securely by credit or debit card, Apple Pay or Google Pay, then come straight back here." : "Online payment isn't set up yet, so this sends us a request and we'll be in touch.";
    $("#dPlans").showModal();
    if (focus === "pro") requestAnimationFrame(() => $("#dProCard").scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }
  /* card checkout through Stripe; the server checks the site is theirs and holds the prices */
  [["#dPayMo", "editorMonthly"], ["#dPayPro", "editorPro"], ["#dPayBuy", "editorBuy"]].forEach(([id, item]) => $(id).addEventListener("click", async e => {
    if (e.currentTarget.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
    if (!pay || !cur) return;
    e.preventDefault();
    const b = e.currentTarget, label = b.textContent; b.textContent = "Opening secure checkout…";
    try { await Pay.start(item, { site: cur.id, fallback: b.getAttribute("href") }); }
    catch (err) { say($("#dPlansMsg"), err.message); }
    finally { b.textContent = label; }
  }));
  /* phone app: checkout opens in a sheet; when it closes, look for the new plan */
  try { Pay.onClose(() => { $("#dPlans").open && $("#dPlans").close(); watchPlans(); }); } catch (e) { /* not in the phone app */ }
  async function watchPlans() {
    const before = sites.map(s => s.plan + s.tier).join();
    for (let i = 0; i < 6; i++) { await new Promise(r => setTimeout(r, 2500)); await refresh(); if (sites.map(s => s.plan + s.tier).join() !== before) { say($("#dMsg"), "You're all set. Open the editor and press Publish to put your changes online.", "ok"); return true; } }
    return false;
  }

  /* ---------- integrations and the contact form inbox (assets/integrations.js) ---------- */
  const intOpts = { pro, plans: (s, focus) => { cur = sites.find(x => x.id === s.id) || s; openPlans(cur, focus); }, onChange: () => refresh() };
  function openInt(s) { IntegrationsUI.open(s, intOpts); }
  function openInbox(s) { IntegrationsUI.inbox(s, intOpts); }

  /* ---------- download ---------- */
  async function download(s) {
    try {
      const row = await Cloud.getSite(s.id);
      if (!row || !row.html) return say($("#dMsg"), "Open the editor and press Save for download first.", "info");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([row.html], { type: "text/html" })); a.download = (row.slug || "my-site") + ".html";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } catch (e) { say($("#dMsg"), e.message); }
  }

  /* ---------- settings: name, address, own domain, delete ---------- */
  function dnsRows(s) {
    const target = s.slug + "." + (Cloud.domain || "yourdomain.com");
    $("#dDnsRows").innerHTML = [["CNAME", "www", target], ["CNAME", "@ (or ALIAS / ANAME)", target]].map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("");
  }
  function openSettings(s) {
    const f = $("#dSetForm"); f.name.value = s.name; f.slug.value = s.slug;
    $("#dDomForm").domain.value = s.custom_domain || "";
    $("#dDomOff").hidden = !s.custom_domain; $("#dDns").hidden = !s.custom_domain; dnsRows(s);
    /* your own domain is a paid feature: free sites see what it is and how to get it */
    const paidOnly = s.plan === "free";
    $("#dDomUp").hidden = !paidOnly; $("#dDomForm").hidden = paidOnly; $("#dDomNote").hidden = paidOnly;
    if (paidOnly) $("#dDns").hidden = true;
    ["#dSetMsg", "#dDomMsg"].forEach(m => say($(m), ""));
    $("#dSet").showModal();
  }
  $("#dSetForm").addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, name = f.name.value.trim(), slug = Cloud.cleanSlug(f.slug.value);
    f.slug.value = slug;
    if (!name) return say($("#dSetMsg"), "Please give your site a name.");
    if (slug.length < 3) return say($("#dSetMsg"), "Addresses need at least 3 letters or numbers.");
    try {
      if (slug !== cur.slug && !(await Cloud.slugFree(slug))) return say($("#dSetMsg"), "That address is taken. Please pick another.");
      await Cloud.saveSite(cur.id, { name, slug });
      Object.assign(cur, { name, slug }); dnsRows(cur);
      say($("#dSetMsg"), cur.plan === "monthly" || freeLive(cur) ? "Saved. Your site is now at " + (cur.plan === "free" ? slug + "." + base : Cloud.address(cur)) + "." : "Saved.", "ok"); refresh();
    } catch (err) { say($("#dSetMsg"), err.message); }
  });
  $("#dDomUpGo").addEventListener("click", () => { $("#dSet").close(); openPlans(cur); });
  $("#dDomForm").addEventListener("submit", async e => {
    e.preventDefault();
    const d = Cloud.cleanDomain(e.target.domain.value);
    if (!/^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/.test(d)) return say($("#dDomMsg"), "That doesn't look like a domain. Use something like yourbusiness.com.");
    if (Cloud.domain && (d === Cloud.domain || d.endsWith("." + Cloud.domain))) return say($("#dDomMsg"), "Use the free address field above for addresses on " + Cloud.domain + ".");
    try {
      await Cloud.saveSite(cur.id, { custom_domain: d });
      cur.custom_domain = d; e.target.domain.value = d; $("#dDomOff").hidden = false; $("#dDns").hidden = false;
      say($("#dDomMsg"), cur.plan === "monthly" ? "Domain saved. Add the records below, and your site will show at " + d + " once they're live." : "Domain saved. It goes live once you're on the monthly plan and the records below are added.", "ok"); refresh();
    } catch (err) { say($("#dDomMsg"), err.message); }
  });
  $("#dDomOff").addEventListener("click", async () => {
    try { await Cloud.saveSite(cur.id, { custom_domain: null }); cur.custom_domain = null; $("#dDomForm").domain.value = ""; $("#dDomOff").hidden = true; $("#dDns").hidden = true; say($("#dDomMsg"), "Domain disconnected.", "ok"); refresh(); }
    catch (err) { say($("#dDomMsg"), err.message); }
  });
  $("#dDel").addEventListener("click", async () => {
    if (cur.plan === "monthly" && !confirm("This site is on a monthly plan. Deleting it doesn't cancel billing. Cancel the plan in Billing first. Delete anyway?")) return;
    if (!confirm(`Delete "${cur.name}" for good? This can't be undone.`)) return;
    try { await Cloud.deleteSite(cur.id); $("#dSet").close(); say($("#dMsg"), `"${cur.name}" was deleted.`, "ok"); refresh(); }
    catch (err) { say($("#dSetMsg"), err.message); }
  });

  /* ---------- account ---------- */
  $("#dAcct").addEventListener("click", () => {
    $("#dMe").close();
    $("#dEmailForm").email.value = user.email || ""; $("#dPassForm").password.value = "";
    say($("#dEmailMsg"), ""); say($("#dPassMsg"), "");
    $("#dPortal").hidden = !(Pay.on || Cloud.portal); $("#dPortal").href = Cloud.portal || "#";
    $("#dAcctDlg").showModal();
  });
  $("#dEmailForm").addEventListener("submit", async e => {
    e.preventDefault(); const email = e.target.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say($("#dEmailMsg"), "Please enter a valid email.");
    try { await Cloud.setEmail(email); say($("#dEmailMsg"), "Check both inboxes. We sent a link to confirm the change.", "ok"); } catch (err) { say($("#dEmailMsg"), err.message); }
  });
  $("#dPassForm").addEventListener("submit", async e => {
    e.preventDefault(); const p = e.target.password.value;
    if (p.length < 8) return say($("#dPassMsg"), "Please use at least 8 characters.");
    try { await Cloud.setPassword(p); e.target.password.value = ""; say($("#dPassMsg"), "Password changed.", "ok"); } catch (err) { say($("#dPassMsg"), err.message); }
  });

  /* ---------- install as an app ---------- */
  let promptEv = null;
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); promptEv = e; $("#dInstall").classList.add("on"); });
  $("#dInstall").addEventListener("click", async () => { if (!promptEv) return; promptEv.prompt(); await promptEv.userChoice; promptEv = null; $("#dInstall").classList.remove("on"); });

  await refresh();

  /* ---------- arriving from the editor or from Stripe ---------- */
  if (qp.get("claim")) {
    let design = null;
    try { design = JSON.parse(localStorage.getItem("shs-editor-v1")); } catch (e) { design = null; }
    if (design && design.t && design.P) {
      const f = $("#dClaimForm"); f.slug.value = Cloud.cleanSlug(design.t.brand) || "my-site";
      f.addEventListener("submit", async e => {
        e.preventDefault();
        const slug = Cloud.cleanSlug(f.slug.value); f.slug.value = slug;
        if (slug.length < 3) return say($("#dClaimMsg"), "Addresses need at least 3 letters or numbers.");
        try {
          if (!(await Cloud.slugFree(slug))) return say($("#dClaimMsg"), "That address is taken. Please pick another.");
          const row = await Cloud.createSite({ name: (design.t.brand || "My site").slice(0, 80), slug, design });
          $("#dClaim").close(); history.replaceState(null, "", location.pathname);
          await refresh(); cur = sites.find(s => s.id === row.id); if (cur) openPlans(cur);
        } catch (err) { say($("#dClaimMsg"), err.message); }
      });
      $("#dClaim").showModal();
    } else history.replaceState(null, "", location.pathname);
  }
  if (qp.get("plans")) { cur = sites.find(s => s.id === qp.get("plans")); history.replaceState(null, "", location.pathname); if (cur) openPlans(cur); }
  if (qp.get("paid")) {
    const session = qp.get("paid");
    history.replaceState(null, "", location.pathname);
    say($("#dMsg"), "Thank you! Your payment went through. Your plan switches on in a moment.", "ok");
    /* ask the server to check the payment with Stripe and switch the plan on right away */
    if (Pay.on && /^cs_/.test(session)) { try { await Pay.confirm(session); } catch (e) { /* Stripe's event switches it on shortly anyway */ } }
    const before = sites.map(s => s.plan + s.tier).join();
    await refresh();
    if (sites.map(s => s.plan + s.tier).join() !== before) say($("#dMsg"), "You're all set. Open the editor and press Publish to put your changes online.", "ok");
    else watchPlans();
  }
})();

/* back-to-top button, the same one the website uses (sits above the tab bar on phones) */
(() => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "to-top"; b.setAttribute("aria-label", "Back to top");
  b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  b.addEventListener("click", () => scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  document.body.appendChild(b);
  const show = () => b.classList.toggle("on", scrollY > 500);
  addEventListener("scroll", show, { passive: true }); show();
})();
