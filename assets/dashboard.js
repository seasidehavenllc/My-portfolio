/* =====================================================================
   SEASIDE HAVEN STUDIOS — customer dashboard (dashboard.html)
   The app's home: one site at a time (switched from the top bar), with
   tabs for Home, Inbox, Design and Manage. From here customers edit,
   publish, pick a plan, change the address, connect a domain, download,
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
  if (!user) { location.replace("account.html?next=" + encodeURIComponent(pageName() + location.search)); return; }
  $("#dWho").textContent = user.email || "";
  /* profile button: initials from the email, like Wix and Squarespace */
  const initials = (user.email || "?").split("@")[0].split(/[._-]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
  $("#dInit").textContent = $("#dInit2").textContent = initials;
  const openMe = () => { $("#dPlanSum").textContent = sites.some(isPro) ? "Pro plan · $" + pro + "/month" : sites.some(s => s.plan === "monthly") ? "Website plan · $" + monthly + "/month" : sites.some(s => s.plan === "owned") ? "Owned site" : "Free plan"; $("#dMe").showModal(); };
  $("#dMeBtn").addEventListener("click", openMe);
  $("#dBill").addEventListener("click", async () => {
    if (!sites.some(s => s.plan !== "free")) { $("#dMe").close(); const s = sites[0]; if (s) { cur = s; openPlans(s); } else location.href = "pricing.html"; return; }
    if (Cloud.portal) { open(Cloud.portal, "_blank", "noopener"); return; }
    try { await Pay.portal(); } catch (err) { $("#dMe").close(); say($("#dMsg"), err.message); }
  });
  $("#dSetBase").textContent = $("#dClaimBase").textContent = "." + (Cloud.domain || "yourdomain.com");

  document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => b.closest("dialog").close()));
  document.querySelectorAll("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));
  $("#dOut").addEventListener("click", async () => { await Cloud.signOut(); location.replace("account.html"); });

  /* ---------- app shell: one site at a time, tabs for Home, Inbox, Design and Manage ---------- */
  const when = d => d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "";
  const ago = d => { const m = Math.round((Date.now() - new Date(d)) / 60000); return m < 1 ? "now" : m < 60 ? m + " min" : m < 1440 ? Math.round(m / 60) + " hr" : m < 10080 ? new Date(d).toLocaleDateString(undefined, { weekday: "short" }) : new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" }); };
  const ic = (id, cls = "") => `<svg class="xi ${cls}" aria-hidden="true"><use href="#x-${id}"/></svg>`;
  const isLive = s => (s.plan === "monthly" && !!s.published_at) || freeLive(s);
  const addrOf = s => s.plan === "free" ? s.slug + "." + base : Cloud.address(s);
  const swatch = s => { const t = typeof tplGet === "function" && tplGet(s.tpl); const p = t && t.pal && t.pal[t.p0 || 0]; return p ? `linear-gradient(160deg,${p.bg} 52%,${p.ac} 52%)` : "var(--grad)"; };
  const pill = s => isLive(s) ? `<span class="ax-pill live"><i></i>Live</span>` : s.plan === "owned" ? `<span class="ax-pill">Owned</span>` : `<span class="ax-pill">Not online yet</span>`;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let tab = "home", msgs = [], msgsFor = null, design = {};
  const CUR_KEY = "shs-cur-site";

  function pickCur() {
    let id = null; try { id = localStorage.getItem(CUR_KEY); } catch (e) { /* private mode */ }
    cur = sites.find(s => s.id === id) || sites[0] || null;
  }
  function setCur(s) { cur = s; try { localStorage.setItem(CUR_KEY, s.id); } catch (e) { /* private mode */ } msgsFor = null; render(); }

  /* the top bar's site picker */
  function topBar() {
    $("#xSiteName").textContent = cur ? cur.name : "Seaside Studios";
    $("#xTh").style.background = cur ? swatch(cur) : "var(--grad)";
    $("#xSiteBtn").disabled = !sites.length;
    const n = sites.reduce((a, s) => a + (unread[s.id] || 0), 0);
    $("#xBadge").textContent = n; $("#xBadge").hidden = !n;
  }
  $("#xSiteBtn").addEventListener("click", () => {
    $("#xSiteList").innerHTML = sites.map(s => `<button type="button" class="ax-srow${cur && s.id === cur.id ? " cur" : ""}" data-site="${esc(s.id)}"><span class="ax-th lg" style="background:${swatch(s)}"></span><span class="ax-tx"><b>${esc(s.name)}</b><small>${esc(isLive(s) ? addrOf(s) : "Edited " + when(s.updated_at))}</small></span>${pill(s)}</button>`).join("");
    $("#xSites").showModal();
  });
  $("#xSiteList").addEventListener("click", e => {
    const b = e.target.closest("[data-site]"); if (!b) return;
    const s = sites.find(x => x.id === b.dataset.site);
    if (s) { setCur(s); setTimeout(() => $("#xSites").close(), 160); }
  });

  /* tabs: the address bar keeps the tab (#inbox), so refreshing or going back stays put */
  function moveInd() {
    const a = document.querySelector(`.ax-tabs [data-tab="${tab}"]`), nav = $("#xTabs");
    if (!a) return;
    const r = a.getBoundingClientRect(), n = nav.getBoundingClientRect();
    $("#xInd").style.transform = `translateX(${r.left - n.left + r.width / 2 - 14}px)`;
  }
  function show(t, first) {
    if (!["home", "inbox", "design", "manage"].includes(t)) t = "home";
    const changed = t !== tab; tab = t;
    document.querySelectorAll(".ax-tabs [data-tab]").forEach(a => a.toggleAttribute("aria-current", a.dataset.tab === t));
    document.querySelectorAll(".ax-view").forEach(v => v.classList.toggle("on", v.dataset.view === t));
    if (changed && !first) scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
    moveInd(); fitPrev();
    if (t === "inbox") loadInbox(true);
  }
  addEventListener("hashchange", () => show(location.hash.slice(1)));
  addEventListener("resize", () => { moveInd(); fitPrev(); });

  /* ---------- render every tab for the current site ---------- */
  function render() {
    topBar();
    if (!cur) return renderEmpty();
    renderHome(); renderDesign(); renderManage();
    if (tab === "inbox") loadInbox(); else $("#vInbox").innerHTML = inboxShell();
    preview(cur);
    homeMsgs();
  }

  function renderEmpty() {
    const n = typeof TEMPLATES !== "undefined" ? TEMPLATES.length : 54;
    $("#vHome").innerHTML = `<div class="ax-card ax-empty axr">
      <div class="fan" aria-hidden="true"><div class="fan-c" data-tid="ember"></div><div class="fan-c" data-tid="harbor"></div><div class="fan-c" data-tid="velvet"></div></div>
      <h2>Your first site <em>starts here.</em></h2>
      <p>Choose from ${n} designs made for real businesses. Your first site goes online free. Upgrade from $${monthly} a month for every design and your own domain.</p>
      <a class="ax-btn pri" href="new.html">Browse designs${ic("right")}</a>
      <p class="ax-fine">Rather have us build it? <a href="pricing.html#new">See studio packages</a></p></div>`;
    const none = (title, text) => `<div class="ax-card ax-empty sm axr"><h2>${title}</h2><p>${text}</p><a class="ax-btn pri" href="new.html">Start a site${ic("right")}</a></div>`;
    $("#vInbox").innerHTML = `<h1 class="ax-h1 axr">Inbox</h1>` + none("No messages yet", "Once you have a site, messages from its contact form land here.");
    $("#vDesign").innerHTML = `<h1 class="ax-h1 axr">Design</h1>` + none("Nothing to design yet", "Pick a design to start. Designing is always free.");
    $("#vManage").innerHTML = `<h1 class="ax-h1 axr">Manage</h1>` + none("No sites yet", "Your plan, address, domain and settings show up here once you have a site.");
    if (typeof tpRender === "function") document.querySelectorAll(".fan-c").forEach(el => {
      const t = tplGet(el.dataset.tid); if (!t) return;
      el.innerHTML = `<div class="scale" style="width:390px">${tpRender(t)}</div>`;
      el.firstElementChild.style.transform = `scale(${el.clientWidth / 390})`;
    });
  }

  /* setup checklist, worked out from the site itself */
  function steps(s) {
    const free = s.plan === "free";
    return [
      { t: "Pick a design", done: true },
      { t: "Publish your site", done: !!s.published_at, act: "publish" },
      { t: free ? "Put it online" : "Choose a plan", done: isLive(s) || s.plan === "owned", act: "plans" },
      { t: "Turn on your contact form", done: s.form === "true", act: "integrations" },
      { t: "Connect your own domain", done: !!s.custom_domain, act: free ? "plans" : "settings" }
    ];
  }

  function renderHome() {
    const s = cur, live = isLive(s), st = steps(s), done = st.filter(x => x.done).length, left = st.length - done;
    const promo = s.plan === "free" ? { h: "Get your own domain", p: `Upgrade from $${monthly} a month for every design and no badge.`, b: "See plans", act: "plans" }
      : s.plan === "monthly" && !isPro(s) ? { h: "Go Pro", p: "Analytics, live chat, buy buttons and more for $" + pro + " a month.", b: "See Pro", act: "pro" } : null;
    $("#vHome").innerHTML = `
      <article class="ax-hero axr">
        <div class="ax-prev" id="xPrev" aria-hidden="true"><div class="ax-sk"></div></div>
        <div class="ax-hmeta">
          <div class="ax-row"><h1>${esc(s.name)}</h1>${pill(s)}</div>
          <p class="ax-url">${ic("globe")}${live ? `<a href="https://${esc(addrOf(s))}" target="_blank" rel="noopener">${esc(addrOf(s))}</a>` : `<span>${esc(addrOf(s))}</span>`}</p>
          <div class="ax-acts">
            <a class="ax-btn pri" href="editor.html?site=${encodeURIComponent(s.id)}">${ic("brush")}Edit site</a>
            ${live ? `<a class="ax-btn" href="https://${esc(addrOf(s))}" target="_blank" rel="noopener">${ic("eye")}View</a>` : `<button class="ax-btn" type="button" data-act="plans">${ic("rocket")}Go live</button>`}
            <button class="ax-btn sq" type="button" data-act="share" aria-label="Share your site">${ic("share")}</button>
          </div>
        </div>
      </article>
      ${left ? `<section class="ax-card ax-setup axr">
        <div class="ax-sethd">
          <div class="ax-ring"><svg viewBox="0 0 52 52" aria-hidden="true"><circle class="bg" cx="26" cy="26" r="22"/><circle class="fg" pathLength="1" cx="26" cy="26" r="22" style="stroke-dashoffset:${reduce ? 1 - done / st.length : 1}" data-to="${1 - done / st.length}"/></svg><b>${done}/${st.length}</b></div>
          <div><h2>Finish setting up</h2><p>${left} step${left > 1 ? "s" : ""} left to get the most out of your site</p></div>
        </div>
        <div class="ax-steps">${st.map(x => `<button type="button" class="ax-step${x.done ? " done" : ""}"${x.done ? " disabled" : ` data-act="${x.act}"`}><span class="ax-ck">${x.done ? ic("check") : ""}</span><span class="ax-st">${x.t}</span>${x.done ? "" : `<small>Start</small>${ic("right", "ax-chev")}`}</button>`).join("")}</div>
      </section>` : ""}
      ${promo ? `<section class="ax-promo axr"><span class="ax-gl">${ic(promo.act === "pro" ? "star" : "globe")}</span><div><h2>${promo.h}</h2><p>${promo.p}</p></div><button class="ax-go" type="button" data-act="${promo.act}">${promo.b}</button></section>` : ""}
      <section class="axr"><div class="ax-sech"><h2>Quick actions</h2></div>
        <div class="ax-qa">
          <a href="editor.html?site=${encodeURIComponent(s.id)}"><span>${ic("brush")}</span>Edit</a>
          <a href="#inbox"><span>${ic("inbox")}</span>Messages</a>
          <button type="button" data-act="integrations"><span>${ic("plug")}</span>Add-ons</button>
          <button type="button" data-act="settings"><span>${ic("gear")}</span>Settings</button>
        </div>
      </section>
      <section class="axr"><div class="ax-sech"><h2>Messages</h2><a href="#inbox">View all</a></div><div class="ax-card ax-rows" id="xHomeMsgs"><div class="ax-sk" style="height:72px;margin:10px"></div></div></section>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { const r = document.querySelector(".ax-ring .fg"); if (r) r.style.strokeDashoffset = r.dataset.to; }));
  }

  /* a live picture of the site, drawn from its saved design */
  async function preview(s) {
    if (!$("#xPrev") || typeof tpRender !== "function") return;
    let d = design[s.id];
    if (!d) { try { const row = await Cloud.getSite(s.id); d = design[s.id] = row && row.design; } catch (e) { d = null; } }
    if (!d || !d.t || cur !== s || !$("#xPrev")) { const t = tplGet(s.tpl); if (!t || !$("#xPrev")) return; d = { t, P: null }; }
    const box = $("#xPrev"); if (!box || cur !== s) return;
    let html = "";
    try { html = tpRender(d.t, d.P); } catch (e) { return; }
    const w = box.clientWidth > 520 ? 1100 : 390;
    box.innerHTML = `<div class="ax-pg"><div class="scale" style="width:${w}px">${html.replace(/ data-(e|sec|img)="[^"]*"| data-rich/g, "")}</div></div>`;
    fitPrev();
  }
  function fitPrev() {
    const box = $("#xPrev"), sc = box && box.querySelector(".scale");
    if (sc && box.clientWidth) sc.style.transform = `scale(${(box.clientWidth - 28) / parseFloat(sc.style.width)})`;
  }

  /* messages for the current site */
  async function getMsgs(force) {
    if (!cur) return [];
    if (msgsFor === cur.id && !force) return msgs;
    try { msgs = await Cloud.messages(cur.id) || []; } catch (e) { msgs = []; }
    msgsFor = cur.id; return msgs;
  }
  const initialsOf = n => (n || "?").split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const hues = ["c1", "c2", "c3", "c4", "c5"];
  const mrow = (m, i, open) => `<article class="ax-msg${m.read ? "" : " new"}${open ? " open" : ""}" data-id="${esc(m.id)}">
      <button type="button" class="ax-mhead" data-msg aria-expanded="${open ? "true" : "false"}"><span class="ax-mav ${hues[i % hues.length]}">${esc(initialsOf(m.name))}</span><span class="ax-mbd"><span class="ax-mtop"><b>${esc(m.name || "Someone")}</b><time>${esc(ago(m.created_at))}</time></span><span class="ax-mtx">${esc(m.message)}</span></span></button>
      <div class="ax-mfull"><div>
        <p>${esc(m.message)}</p>
        ${m.email ? `<span class="ax-mfrom">${ic("mail")}${esc(m.email)}</span>` : ""}
        <div class="ax-mact">${/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email || "") ? `<a class="ax-btn pri sm" href="mailto:${esc(m.email)}?subject=${encodeURIComponent("Re: your message to " + cur.name)}">${ic("mail")}Reply</a>` : ""}<button class="ax-btn sm" type="button" data-del>${ic("trash")}Delete</button></div>
      </div></div></article>`;
  async function homeMsgs() {
    const box = $("#xHomeMsgs"); if (!box) return;
    const rows = await getMsgs(); if (!$("#xHomeMsgs")) return;
    box.innerHTML = rows.length ? rows.slice(0, 2).map((m, i) => mrow(m, i)).join("") : `<div class="ax-none">${ic("inbox")}<div><b>No messages yet</b><p>${cur.form === "true" ? "When someone sends the form on your site, it shows up here." : "Turn on the contact form and messages from your site land here."}</p></div>${cur.form === "true" ? "" : `<button class="ax-btn sm" type="button" data-act="integrations">Turn on</button>`}</div>`;
  }
  let filter = "all";
  const inboxShell = () => `<h1 class="ax-h1 axr">Inbox</h1>
    <div class="ax-seg axr" role="tablist"><button type="button" data-filter="all" aria-selected="${filter === "all"}">All</button><button type="button" data-filter="unread" aria-selected="${filter === "unread"}">Unread</button></div>
    <div class="ax-card ax-rows axr" id="xInboxList"><div class="ax-sk" style="height:72px;margin:10px"></div><div class="ax-sk" style="height:72px;margin:10px"></div></div>
    <p class="ax-fine axr">Messages from the contact form on ${cur ? esc(cur.name) : "your site"}.</p>`;
  let seen = new Set();
  async function loadInbox(force) {
    if (!cur) return;
    if (!$("#xInboxList")) $("#vInbox").innerHTML = inboxShell();
    const rows = await getMsgs(force);
    rows.forEach(m => { if (!m.read) seen.add(m.id); });
    const list = filter === "unread" ? rows.filter(m => seen.has(m.id)) : rows;
    const box = $("#xInboxList"); if (!box) return;
    box.innerHTML = list.length ? list.map((m, i) => mrow(m, i)).join("") : `<div class="ax-none">${ic("inbox")}<div><b>${filter === "unread" ? "You're all caught up" : "No messages yet"}</b><p>${cur.form === "true" ? "When someone sends the form on your site, it shows up here." : "Turn on the contact form and messages from your site land here."}</p></div>${cur.form === "true" ? "" : `<button class="ax-btn sm" type="button" data-act="integrations">Turn on</button>`}</div>`;
    if (tab === "inbox" && rows.some(m => !m.read)) {
      try { await Cloud.markRead(cur.id); rows.forEach(m => { m.read = true; }); delete unread[cur.id]; topBar(); } catch (e) { /* stays new until next time */ }
    }
  }

  function renderDesign() {
    const s = cur, id = encodeURIComponent(s.id), paid = s.plan !== "free";
    $("#vDesign").innerHTML = `<h1 class="ax-h1 axr">Design</h1>
      <div class="ax-tiles axr">
        <a class="ax-tile" href="editor.html?site=${id}"><span class="ax-ic c1">${ic("brush")}</span><b>Open the editor</b><small>Words, photos, colors and fonts</small></a>
        ${isLive(s) ? `<a class="ax-tile" href="https://${esc(addrOf(s))}" target="_blank" rel="noopener"><span class="ax-ic c4">${ic("eye")}</span><b>See it live</b><small class="one">${esc(addrOf(s))}</small></a>` : `<button class="ax-tile" type="button" data-act="plans"><span class="ax-ic c4">${ic("rocket")}</span><b>Put it online</b><small>Free, or from $${monthly} a month</small></button>`}
      </div>
      <div class="ax-sech axr"><h2>Publishing</h2></div>
      <div class="ax-card ax-grp axr">
        <a class="ax-li" href="editor.html?site=${id}&publish=1"><span class="ax-ic c2">${ic("rocket")}</span><span class="ax-tx"><b>Publish your latest changes</b><small>${s.published_at ? "Last published " + when(s.published_at) : "Not published yet"}</small></span>${ic("right", "ax-chev")}</a>
        ${paid && s.published_at ? `<button class="ax-li" type="button" data-act="download"><span class="ax-ic c6">${ic("dl")}</span><span class="ax-tx"><b>Download your site</b><small>One file you can host anywhere</small></span>${ic("right", "ax-chev")}</button>` : ""}
        <button class="ax-li" type="button" data-act="share"><span class="ax-ic c3">${ic("link")}</span><span class="ax-tx"><b>Share your site</b><small>${esc(addrOf(s))}</small></span>${ic("right", "ax-chev")}</button>
      </div>
      <div class="ax-sech axr"><h2>Start something new</h2></div>
      <div class="ax-card ax-grp axr">
        <a class="ax-li" href="new.html"><span class="ax-ic c4">${ic("grid")}</span><span class="ax-tx"><b>New site from a design</b><small>${typeof TEMPLATES !== "undefined" ? TEMPLATES.length : 54} designs for real businesses</small></span>${ic("right", "ax-chev")}</a>
        <a class="ax-li" href="pricing.html#new"><span class="ax-ic c3">${ic("star")}</span><span class="ax-tx"><b>Have us build it</b><small>Studio packages, done for you</small></span>${ic("right", "ax-chev")}</a>
      </div>`;
  }

  function renderManage() {
    const s = cur, free = s.plan === "free", n = unread[s.id] || 0;
    const planName = isPro(s) ? "Pro" : s.plan === "monthly" ? "Website" : s.plan === "owned" ? "Owned" : "Free";
    const planSub = isPro(s) ? "$" + pro + " a month" : s.plan === "monthly" ? "$" + monthly + " a month" : s.plan === "owned" ? "Paid once, yours to keep" : freeLive(s) ? "Online free" : "Not online yet";
    const billing = s.plan !== "free" && (Pay.on || Cloud.portal);
    $("#vManage").innerHTML = `<h1 class="ax-h1 axr">Manage</h1>
      <div class="ax-tiles axr">
        <button class="ax-tile" type="button" data-act="plans"><span class="ax-ic c2">${ic("card")}</span><b>${planName} plan</b><small>${planSub}</small></button>
        <a class="ax-tile" href="#inbox"><span class="ax-ic c1">${ic("inbox")}</span><b>${n ? n + " new" : "Messages"}</b><small>Contact form</small></a>
      </div>
      <div class="ax-card ax-grp axr">
        <div class="ax-acc open">
          <button class="ax-li" type="button" data-acc aria-expanded="true"><span class="ax-ic c1">${ic("globe")}</span><span class="ax-tx"><b>Address and domain</b><small>${esc(s.custom_domain || addrOf(s))}</small></span>${ic("down", "ax-chev")}</button>
          <div class="ax-sub"><div>
            <button type="button" data-act="settings">Free address<span>${esc(s.slug)}.${esc(base)}</span></button>
            <button type="button" data-act="${free ? "plans" : "settings"}">Your own domain<span>${s.custom_domain ? esc(s.custom_domain) : free ? "With a paid plan" : "Not connected"}</span></button>
          </div></div>
        </div>
        <div class="ax-acc">
          <button class="ax-li" type="button" data-acc aria-expanded="false"><span class="ax-ic c2">${ic("card")}</span><span class="ax-tx"><b>Plan and billing</b><small>${planName} · ${planSub}</small></span>${ic("down", "ax-chev")}</button>
          <div class="ax-sub"><div>
            <button type="button" data-act="plans">${s.plan === "monthly" ? "Change plan" : "Choose a plan"}<span>${planName}</span></button>
            ${billing ? `<a data-billing href="${esc(Cloud.portal || "#")}" target="_blank" rel="noopener">Card, receipts and cancelling<span>Opens billing</span></a>` : ""}
            ${s.plan !== "free" && s.published_at ? `<button type="button" data-act="download">Download your site<span>One file</span></button>` : ""}
          </div></div>
        </div>
        <button class="ax-li" type="button" data-act="integrations"><span class="ax-ic c4">${ic("plug")}</span><span class="ax-tx"><b>Add-ons</b><small>Contact form, booking, maps, chat and more</small></span>${ic("right", "ax-chev")}</button>
        <button class="ax-li" type="button" data-act="settings"><span class="ax-ic c6">${ic("gear")}</span><span class="ax-tx"><b>Site settings</b><small>Name and address</small></span>${ic("right", "ax-chev")}</button>
      </div>
      <p class="ax-lbl axr">Danger zone</p>
      <div class="ax-card ax-grp axr">
        <button class="ax-li" type="button" data-act="delete"><span class="ax-ic c5">${ic("trash")}</span><span class="ax-tx"><b class="ax-red">Delete this site</b><small>Takes it offline and deletes the design</small></span>${ic("right", "ax-chev")}</button>
      </div>`;
  }

  async function share(s) {
    const url = "https://" + addrOf(s);
    if (!isLive(s)) { say($("#dMsg"), "Put your site online first, then you can share its link.", "info"); return; }
    try { if (navigator.share) { await navigator.share({ title: s.name, url }); return; } } catch (e) { if (e.name === "AbortError") return; }
    try { await navigator.clipboard.writeText(url); say($("#dMsg"), "Link copied: " + url, "ok"); } catch (e) { say($("#dMsg"), url, "info"); }
    setTimeout(() => say($("#dMsg"), ""), 3500);
  }

  async function refresh() {
    try { sites = await Cloud.listSites() || []; }
    catch (e) { say($("#dMsg"), e.message); return; }
    /* new contact form messages, counted per site (nothing to count before the inbox exists) */
    unread = {};
    try { (await Cloud.unread() || []).forEach(r => { unread[r.site] = (unread[r.site] || 0) + 1; }); } catch (e) { unread = {}; }
    document.body.classList.toggle("no-sites", !sites.length);
    const was = cur && cur.id; pickCur();
    if (cur && was && cur.id !== was) msgsFor = null;
    render();
  }
  /* billing: Stripe's own page for changing a card, seeing receipts or cancelling */
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-billing], #dPortal"); if (!b || !Pay.on) return;
    e.preventDefault();
    try { await Pay.portal(); } catch (err) { say($("#dMsg"), err.message); }
  });
  /* every button in the tabs */
  $("#main").addEventListener("click", async e => {
    const acc = e.target.closest("[data-acc]");
    if (acc) { const w = acc.parentElement; w.classList.toggle("open"); acc.setAttribute("aria-expanded", w.classList.contains("open")); return; }
    const m = e.target.closest("[data-msg]");
    if (m) { const a = m.closest(".ax-msg"); a.classList.toggle("open"); m.setAttribute("aria-expanded", a.classList.contains("open")); return; }
    const del = e.target.closest("[data-del]");
    if (del) {
      const a = del.closest(".ax-msg");
      if (!confirm("Delete this message?")) return;
      try { await Cloud.deleteMessage(a.dataset.id); msgs = msgs.filter(x => x.id !== a.dataset.id); a.remove(); homeMsgs(); if (tab === "inbox") loadInbox(); } catch (err) { say($("#dMsg"), err.message); }
      return;
    }
    const f = e.target.closest("[data-filter]");
    if (f) { filter = f.dataset.filter; document.querySelectorAll("[data-filter]").forEach(x => x.setAttribute("aria-selected", x === f)); loadInbox(); return; }
    const b = e.target.closest("[data-act]"); if (!b || !cur) return;
    const act = b.dataset.act;
    if (act === "share") return share(cur);
    if (act === "publish") { location.href = "editor.html?site=" + encodeURIComponent(cur.id) + "&publish=1"; return; }
    if (act === "pro") return openPlans(cur, "pro");
    if (act === "delete") { openSettings(cur); requestAnimationFrame(() => $("#dDel").scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" })); return; }
    ({ plans: openPlans, download, settings: openSettings, integrations: openInt })[act](cur);
  });

  /* pop-up sheets: swipe down from the top to close, like iPhone sheets */
  document.querySelectorAll("dialog.dlg").forEach(d => {
    let y0 = null, dy = 0;
    d.addEventListener("touchstart", e => { if (d.scrollTop > 0 || e.target.closest("input,textarea,select")) { y0 = null; return; } y0 = e.touches[0].clientY; dy = 0; }, { passive: true });
    d.addEventListener("touchmove", e => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); d.style.transition = "none"; d.style.transform = `translateY(${dy}px)`; }, { passive: true });
    d.addEventListener("touchend", () => { if (y0 == null) return; d.style.transition = ""; d.style.transform = ""; if (dy > 110) d.close(); y0 = null; });
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
    $("#dEmailForm").email.value = user.email || ""; $("#dPassForm").password.value = $("#dPassForm").password2.value = "";
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
    if (p !== e.target.password2.value) return say($("#dPassMsg"), "The passwords don't match. Please type them again.");
    try { await Cloud.setPassword(p); e.target.password.value = e.target.password2.value = ""; say($("#dPassMsg"), "Password changed.", "ok"); } catch (err) { say($("#dPassMsg"), err.message); }
  });

  /* ---------- install as an app ---------- */
  let promptEv = null;
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); promptEv = e; $("#dInstall").classList.add("on"); });
  $("#dInstall").addEventListener("click", async () => { if (!promptEv) return; promptEv.prompt(); await promptEv.userChoice; promptEv = null; $("#dInstall").classList.remove("on"); });

  await refresh();
  show(location.hash.slice(1), true);
  requestAnimationFrame(moveInd);
  if (document.fonts) document.fonts.ready.then(moveInd);

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
