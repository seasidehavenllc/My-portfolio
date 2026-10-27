/* ======================= CONFIG — edit these ======================= */
const CONFIG = {
  email: "info@seasidehavenllc.com",   // your studio email
  phone: "(434) 233-0231"               // your studio phone
};
/* =================================================================== */

document.documentElement.classList.remove("no-js");
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const money = n => "$" + Math.round(n).toLocaleString();

$$("[data-cfg]").forEach(el => el.textContent = CONFIG[el.dataset.cfg]);
$$('[data-href="tel"]').forEach(a => a.href = "tel:" + CONFIG.phone.replace(/[^\d+]/g, ""));
$$('[data-href="mail"]').forEach(a => a.href = "mailto:" + CONFIG.email);
$$(".yr").forEach(el => el.textContent = new Date().getFullYear());

function toast(text) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = text; t.classList.add("on");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 2600);
}

/* header, scroll progress, mobile menu */
(() => {
  const hdr = $("#hdr"), bar = $(".progress");
  const onScroll = () => {
    hdr.classList.toggle("scrolled", scrollY > 20);
    if (bar) bar.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100 + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const mb = $("#menuBtn"), mm = $("#mobileMenu");
  mb.addEventListener("click", () => { const o = mm.classList.toggle("open"); mb.setAttribute("aria-expanded", o); hdr.classList.add("scrolled"); });
  $$("a", mm).forEach(a => a.addEventListener("click", () => { mm.classList.remove("open"); mb.setAttribute("aria-expanded", false); }));
})();

/* services dropdown: opens on hover (mouse) and click/keyboard (everyone) */
$$(".dd").forEach(dd => {
  const btn = $(".dd-btn", dd), set = o => { dd.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); };
  btn.addEventListener("click", () => set(!dd.classList.contains("open")));
  if (matchMedia("(hover: hover)").matches) { dd.addEventListener("mouseenter", () => set(true)); dd.addEventListener("mouseleave", () => set(false)); }
  dd.addEventListener("keydown", e => { if (e.key === "Escape") { set(false); btn.focus(); } });
  document.addEventListener("click", e => { if (!dd.contains(e.target)) set(false); });
  dd.addEventListener("focusout", e => { if (!dd.contains(e.relatedTarget)) set(false); });
});

/* reveal on scroll */
(() => {
  const els = $$(".rv");
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
})();

/* run a callback once when an element scrolls into view */
function onView(el, fn) {
  if (!el) return;
  if (!("IntersectionObserver" in window)) return fn();
  const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); fn(); } }, { threshold: .35 });
  io.observe(el);
}

/* cursor spotlight on cards */
$$(".spot").forEach(el => el.addEventListener("pointermove", e => {
  const b = el.getBoundingClientRect();
  el.style.setProperty("--mx", e.clientX - b.left + "px"); el.style.setProperty("--my", e.clientY - b.top + "px");
}));

/* hero word rotator */
(() => {
  const r = $(".rotator"); if (!r || reduce) return;
  const words = $$("span", r); let i = 0;
  setInterval(() => {
    const cur = words[i]; i = (i + 1) % words.length;
    cur.classList.remove("on"); cur.classList.add("out");
    setTimeout(() => cur.classList.remove("out"), 500);
    words[i].classList.add("on");
  }, 2400);
})();

/* ---------- scaled template rendering ---------- */
const DEVICES = { desktop: 1280, tablet: 820, phone: 390 };
function mountScaled(box, t, pal = 0, width = 1280, fill = false, pg = 0) {
  box.innerHTML = `<div class="scale" style="width:${width}px">${tpRender(t, pal, pg)}</div>`;
  const sc = box.firstElementChild, tp = sc.firstElementChild;
  const fit = () => {
    const s = box.clientWidth / width;
    sc.style.transform = `scale(${s})`;
    if (fill) box.style.height = Math.min(+box.dataset.maxh || Infinity, tp.offsetHeight * s) + "px";
    else box.style.setProperty("--scroll", Math.max(0, tp.offsetHeight - box.clientHeight / s) + "px");
  };
  fit();
  if (!box._ro && "ResizeObserver" in window) { box._ro = new ResizeObserver(() => box._fit && box._fit()); box._ro.observe(box); }
  box._fit = fit;
  if (document.fonts) document.fonts.ready.then(fit);
}
/* make a mounted template clickable: its menu, buttons and footer links switch pages */
function liveNav(box, onPage, scroller) {
  if (box._live) return; box._live = true;
  box.addEventListener("click", e => {
    const burger = e.target.closest("[data-burger]");
    if (burger) { burger.closest(".tp").classList.toggle("menu-open"); box._fit && box._fit(); return; }
    const a = e.target.closest("[data-pg]");
    if (a) { e.preventDefault(); onPage(+a.dataset.pg); (scroller || box).scrollTop = 0; }
  });
}
const tplById = id => typeof TEMPLATES !== "undefined" && TEMPLATES.find(t => t.id === id);

/* hero stack + featured thumbs */
$$("[data-thumb]").forEach(el => { const t = tplById(el.dataset.thumb); if (t) mountScaled(el, t, +(el.dataset.pal || 0)); });

/* hero stack follows the cursor a little */
(() => {
  const st = $(".stack"); if (!st || reduce) return;
  const cards = $$(".sc", st), base = cards.map(c => getComputedStyle(c).transform);
  st.closest("section").addEventListener("pointermove", e => {
    const x = (e.clientX / innerWidth - .5) * 2, y = (e.clientY / innerHeight - .5) * 2;
    cards.forEach((c, i) => c.style.transform = `${base[i] === "none" ? "" : base[i]} translate3d(${x * (i + 1) * 6}px,${y * (i + 1) * 5}px,0)`);
  });
})();

/* ---------- template cards + gallery ---------- */
function cardHTML(t) {
  const p = t.pal[0];
  return `<button class="tcard rv" type="button" data-id="${t.id}" data-cat="${t.cat}" aria-label="Preview the ${t.name} template">
    <div class="mbar"><i></i><i></i><i></i></div>
    <div class="thumb" data-tid="${t.id}"></div>
    <div class="meta"><div class="top"><h3>${t.name}</h3><span class="chip">${t.industry}</span></div><p>${t.blurb}</p>
    <div class="sw">${t.pal.map(q => `<i style="background:linear-gradient(135deg,${q.bg} 50%,${q.ac} 50%)"></i>`).join("")}<span class="view">5-page live preview →</span></div></div>
  </button>`;
}
function fillGrid(grid, list) {
  grid.innerHTML = list.map(cardHTML).join("");
  $$(".thumb", grid).forEach(el => mountScaled(el, tplById(el.dataset.tid)));
  $$(".tcard", grid).forEach(c => { c.addEventListener("click", () => openPreview(c.dataset.id)); requestAnimationFrame(() => c.classList.add("in")); });
}
(() => {
  const feat = $("#tfeatured");
  if (feat) fillGrid(feat, feat.dataset.ids.split(",").map(tplById));
  const grid = $("#tgrid"); if (!grid) return;
  fillGrid(grid, TEMPLATES);
  $$("[data-count]").forEach(el => el.textContent = TEMPLATES.length);
  const cats = ["All", ...new Set(TEMPLATES.map(t => t.cat))], fl = $("#filters"), q = $("#tsearch"), empty = $(".empty");
  fl.insertAdjacentHTML("afterbegin", cats.map((c, i) => `<button type="button" aria-pressed="${i === 0}" data-cat="${c}">${c}</button>`).join(""));
  let cat = "All";
  const apply = () => {
    /* loose stem match so "dentist" finds "Dental" and "bakery" finds "Bakery" */
    const raw = q.value.trim().toLowerCase(), s = raw.length > 5 ? raw.slice(0, raw.length - 2) : raw; let n = 0;
    $$(".tcard", grid).forEach(c => {
      const t = tplById(c.dataset.id);
      const ok = (cat === "All" || t.cat === cat) && (!s || (t.name + t.industry + t.blurb + t.cat).toLowerCase().includes(s));
      c.hidden = !ok; if (ok) n++;
    });
    empty.style.display = n ? "none" : "block";
    $$(".thumb", grid).forEach(el => el._fit && el._fit());
  };
  $$("button", fl).forEach(b => b.addEventListener("click", () => { cat = b.dataset.cat; $$("button", fl).forEach(x => x.setAttribute("aria-pressed", x === b)); apply(); }));
  q.addEventListener("input", apply);
  const want = new URLSearchParams(location.search).get("preview");
  if (want && tplById(want)) openPreview(want);
})();

/* ---------- preview modal ---------- */
function openPreview(id) {
  let dlg = $("#pv");
  if (!dlg) {
    document.body.insertAdjacentHTML("beforeend", `<dialog class="pv" id="pv" aria-labelledby="pvName">
      <div class="pv-bar">
        <div><h3 id="pvName"></h3><small id="pvInd"></small></div>
        <div class="seg" role="group" aria-label="Device">${Object.keys(DEVICES).map((d, i) => `<button type="button" data-dev="${d}" aria-pressed="${i === 0}">${d[0].toUpperCase() + d.slice(1)}</button>`).join("")}</div>
        <div class="pals" role="group" aria-label="Color palette" id="pvPals"></div>
        <label class="pv-page">Page <select id="pvPage"></select></label>
        <div class="pv-x"><a class="btn btn-grad btn-sm" id="pvGo" href="contact.html">Start with this template</a><button class="icon-btn" type="button" id="pvClose" aria-label="Close preview"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
      </div>
      <div class="pv-stage"><div class="pv-device" id="pvDev"></div></div>
    </dialog>`);
    dlg = $("#pv");
    $("#pvClose").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    $$("[data-dev]", dlg).forEach(b => b.addEventListener("click", () => { dlg._dev = b.dataset.dev; $$("[data-dev]", dlg).forEach(x => x.setAttribute("aria-pressed", x === b)); dlg._draw(); }));
    addEventListener("resize", () => dlg.open && dlg._draw());
    const go = n => { dlg._pg = n; $("#pvPage").value = n; dlg._draw(); };
    $("#pvPage").addEventListener("change", e => go(+e.target.value));
    liveNav($("#pvDev"), go, $(".pv-stage", dlg));
  }
  const t = tplById(id); dlg._t = t; dlg._pal = 0; dlg._pg = 0; dlg._dev = dlg._dev || "desktop";
  $("#pvPage").innerHTML = ["Home", ...t.nav].map((n, i) => `<option value="${i}">${n}</option>`).join("");
  $("#pvName").textContent = t.name + " template";
  $("#pvInd").textContent = t.industry + " · included in Launch, from $799";
  const pals = $("#pvPals");
  pals.innerHTML = t.pal.map((q, i) => `<button type="button" aria-label="Palette ${i + 1}" aria-pressed="${i === 0}" style="background:linear-gradient(135deg,${q.bg} 50%,${q.ac} 50%)"></button>`).join("");
  $$("button", pals).forEach((b, i) => b.addEventListener("click", () => { dlg._pal = i; $$("button", pals).forEach(x => x.setAttribute("aria-pressed", x === b)); dlg._draw(); }));
  function draw() {
    const dev = $("#pvDev"), stage = $(".pv-stage", dlg), w = DEVICES[dlg._dev];
    dev.className = "pv-device " + dlg._dev;
    const avail = stage.clientWidth - 48;
    dev.style.width = Math.min(avail, dlg._dev === "desktop" ? avail : dlg._dev === "tablet" ? 600 : 330) + "px";
    mountScaled(dev, dlg._t, dlg._pal, w, true, dlg._pg);
    $("#pvGo").href = `contact.html?template=${dlg._t.id}&palette=${dlg._pal + 1}`;
  }
  dlg._draw = draw;
  dlg.showModal(); draw();
  $(".pv-stage", dlg).scrollTop = 0;
}

/* ---------- brand lab: restyle a live site ---------- */
(() => {
  const lab = $("#lab"); if (!lab) return;
  const frame = $("#labFrame"), box = $("#labBox");
  const st = { vibe: "harbor", pal: 0, accent: null, r: null, font: null, dev: "desktop", pg: 0 };
  box.classList.add("live");
  liveNav(box, n => { st.pg = n; draw(); });
  function draw() {
    const t = Object.assign({}, tplById(st.vibe));
    t.pal = t.pal.map(p => Object.assign({}, p));
    if (st.accent) { t.pal[st.pal].ac = st.accent; t.pal[st.pal].hi = st.accent; t.pal[st.pal].acfg = "#FFFFFF"; }
    if (st.r !== null) t.r = st.r;
    if (st.font) { t.fh = st.font[0]; t.hw = st.font[1]; t.up = false; }
    frame.style.maxWidth = { desktop: "100%", tablet: "560px", phone: "320px" }[st.dev];
    mountScaled(box, t, st.pal, DEVICES[st.dev], true, st.pg);
  }
  const group = (sel, fn) => $$(sel, lab).forEach(b => b.addEventListener("click", () => { $$(sel, lab).forEach(x => x.setAttribute("aria-pressed", x === b)); fn(b); draw(); }));
  group("[data-vibe]", b => { st.vibe = b.dataset.vibe; st.pal = 0; st.pg = 0; });
  group("[data-accent]", b => { st.accent = b.dataset.accent || null; });
  group("[data-font]", b => { st.font = b.dataset.font ? [b.dataset.font, +b.dataset.w] : null; });
  group("[data-ldev]", b => { st.dev = b.dataset.ldev; });
  $("#labR").addEventListener("input", e => { st.r = +e.target.value; $("#labRv").textContent = e.target.value + "px"; draw(); });
  $("#labTheme").addEventListener("click", e => { const b = e.currentTarget; const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", on); st.pal = on ? 2 : 0; draw(); });
  addEventListener("resize", draw);
  draw();
})();

/* ---------- before / after ---------- */
(() => {
  const ba = $("#ba"); if (!ba) return;
  const r = $("#baR"), url = $("#baUrl"), cap = $("#baCap");
  const meta = {
    rest:   ["tonystrattoria.com", "a menu PDF, a phone number and a visitor counter.", "online reservations, pickup orders and reviews up front."],
    law:    ["halewhitfield.law", "a wall of text and \"call during business hours.\"", "credibility in seconds and a secure consultation form."],
    clinic: ["lakeviewhealth.com", "printable PDF forms and phone-only scheduling.", "online booking with real open times and digital forms."]
  };
  const set = v => { v = Math.max(0, Math.min(100, v)); ba.style.setProperty("--pos", v + "%"); r.value = v; };
  r.addEventListener("input", () => set(+r.value));
  let drag = false, touched = false;
  const fromEvent = e => { const b = ba.getBoundingClientRect(); set(((e.clientX - b.left) / b.width) * 100); };
  ba.addEventListener("pointerdown", e => { drag = touched = true; ba.setPointerCapture(e.pointerId); fromEvent(e); });
  ba.addEventListener("pointermove", e => { if (drag) fromEvent(e); });
  ba.addEventListener("pointerup", () => drag = false);
  ba.addEventListener("pointercancel", () => drag = false);
  r.addEventListener("pointerdown", () => touched = true);
  const tabs = $$(".ba-tabs button");
  tabs.forEach(t => t.addEventListener("click", () => {
    const k = t.dataset.set;
    tabs.forEach(x => x.setAttribute("aria-selected", x === t));
    $$(".ba-set", ba).forEach(s => s.classList.toggle("on", s.dataset.set === k));
    url.textContent = meta[k][0];
    cap.innerHTML = `<span><b>Before:</b> ${meta[k][1]}</span><span><b>After:</b> ${meta[k][2]}</span>`;
    set(42);
  }));
  set(50);
  /* a gentle sweep the first time it comes into view, so people see it's draggable */
  if (!reduce) onView(ba, () => {
    let t0; const step = ts => { if (touched) return; t0 = t0 || ts; const p = (ts - t0) / 2200; if (p > 1) return set(42); set(50 + Math.sin(p * Math.PI * 2) * 30); requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
})();

/* ---------- price estimator ---------- */
(() => {
  const root = $("#est"); if (!root) return;
  const TIERS = [
    { max: 5,  name: "Launch",   base: 799,  incl: 5,  weeks: "about 1 week",   care: 29 },
    { max: 10, name: "Business", base: 2499, incl: 10, weeks: "3 to 4 weeks",  care: 59 },
    { max: 20, name: "Growth",   base: 4999, incl: 20, weeks: "5 to 7 weeks",  care: 149 },
    { max: 99, name: "Custom",   base: 9500, incl: 30, weeks: "8 to 12 weeks", care: 149 }
  ];
  const pages = $("#pages"), pv = $("#pagesVal"), feats = $$("#feats button"), rev = $("#revamp"), rush = $("#rush");
  function calc() {
    const p = +pages.value; pv.textContent = p >= 30 ? "30+" : p;
    const on = feats.filter(b => b.getAttribute("aria-pressed") === "true");
    let tier = TIERS.find(t => p <= t.max);
    if (on.some(b => b.dataset.tier === "growth") && tier.base < 4999) tier = TIERS[2];
    if (on.some(b => b.dataset.tier === "custom")) tier = TIERS[3];
    const extra = Math.max(0, p - tier.incl) * 99;
    let build = tier.base + extra;
    const add = on.reduce((s, b) => s + +b.dataset.v, 0);
    const isRev = rev.getAttribute("aria-pressed") === "true";
    const saved = isRev ? build * .4 : 0;
    let total = build - saved + add;
    if (rush.getAttribute("aria-pressed") === "true") total *= 1.25;
    $("#quote").textContent = (tier.name === "Custom" ? "from " : "") + money(Math.round(total / 50) * 50 - 1);
    $("#tierName").textContent = (isRev ? "Revamp · " : "") + tier.name;
    $("#weeks").textContent = tier.weeks;
    $("#monthly").textContent = "+ " + money(tier.care) + "/mo hosting & care (optional)";
    $("#saved").textContent = "You save " + money(saved) + " with revamp pricing";
    root.querySelector(".est-r").classList.toggle("rev", isRev);
  }
  feats.concat([rev, rush]).forEach(b => b.addEventListener("click", () => { b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); calc(); }));
  pages.addEventListener("input", calc); calc();
})();

/* ---------- pricing tabs ---------- */
(() => {
  const tabs = $$(".ptabs [role=tab]"); if (!tabs.length) return;
  const pick = t => {
    tabs.forEach(x => { const on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; $("#" + x.getAttribute("aria-controls")).hidden = !on; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => pick(t));
    t.addEventListener("keydown", e => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; pick(n); n.focus(); } });
  });
  const h = location.hash.slice(1), match = tabs.find(t => t.getAttribute("aria-controls") === "p-" + h);
  if (match) pick(match);
})();

/* ---------- booking demo ---------- */
(() => {
  const days = $("#days"); if (!days) return;
  const slots = $$("#slots button"), msg = $("#bookMsg");
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let day, slot;
  for (let n = 1; days.children.length < 5; n++) {
    const d = new Date(); d.setDate(d.getDate() + n);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-pressed", "false");
    b.innerHTML = wd[d.getDay()] + "<b>" + d.getDate() + "</b>";
    b.dataset.label = wd[d.getDay()] + ", " + mo[d.getMonth()] + " " + d.getDate();
    b.addEventListener("click", () => { day = b; [...days.children].forEach(x => x.setAttribute("aria-pressed", x === b)); msg.textContent = ""; });
    days.appendChild(b);
  }
  slots.forEach(s => s.addEventListener("click", () => { slot = s; slots.forEach(x => x.setAttribute("aria-pressed", x === s)); msg.textContent = ""; }));
  $("#book").addEventListener("click", () => {
    msg.style.color = day && slot ? "" : "#FFB49E";
    msg.textContent = day && slot ? "✓ Booked for " + day.dataset.label + " at " + slot.textContent + ". Confirmation texted." : "Choose a day and a time first.";
  });
})();

/* ---------- chat assistant demo ---------- */
(() => {
  const box = $("#chat"); if (!box) return;
  const form = $("#chatForm"), input = $("#chatIn");
  const A = [
    [/price|cost|much|cheap|budget/i, "Websites start at $799 for one of our templates customized to your brand. Fully custom sites start at $2,499, and online stores at $4,999. Want me to send the full price list?"],
    [/old|redo|revamp|refresh|redesign|existing|polish/i, "Yes! If you already have a site, our revamp pricing is 40% off a new build since we reuse your content. A quick polish starts at just $299."],
    [/fast|long|time|when|week/i, "Template sites launch in about a week. Custom builds take 3 to 4 weeks, and stores 5 to 7."],
    [/template|look|design|example/i, "We have 18 original templates, from cafés to law firms. Each one can be restyled to your colors and fonts."],
    [/book|call|talk|meet|schedule/i, "Happy to! I have openings Tuesday at 10:00 or Thursday at 2:30. Which works better?"],
    [/tue|thu|10|2:30/i, "You're booked! You'll get a text confirmation and a calendar invite in a moment. 🎉"],
    [/host|domain|email|monthly/i, "Hosting & care starts at $29/month and covers hosting, SSL, backups, security and small edits. You always own your domain."],
    [/wix|squarespace|diy/i, "Wix and Squarespace are great DIY tools. We design and build it for you, and our prices start in the same range as hiring a pro on those platforms."],
    [/hi|hello|hey/i, "Hey there! 👋 I'm a demo of the chat assistant we can add to your site. Ask me about prices, timelines or revamps."]
  ];
  const add = (txt, who) => { const m = document.createElement("div"); m.className = "msg " + who; m.textContent = txt; box.appendChild(m); box.scrollTop = box.scrollHeight; return m; };
  function reply(q) {
    add(q, "me");
    const t = document.createElement("div"); t.className = "msg bot typing"; t.innerHTML = "<i></i><i></i><i></i>"; box.appendChild(t); box.scrollTop = box.scrollHeight;
    const hit = A.find(a => a[0].test(q));
    setTimeout(() => { t.remove(); add(hit ? hit[1] : "Good question! A real assistant would be trained on your business, but this demo knows about pricing, revamps, timelines and booking. Try one of those.", "bot"); }, 900);
  }
  $$("#quick button").forEach(b => b.addEventListener("click", () => reply(b.textContent)));
  form.addEventListener("submit", e => { e.preventDefault(); const v = input.value.trim(); if (v) { reply(v); input.value = ""; } });
  add("Hi! 👋 I'm a demo of the AI assistant we build into client sites. Ask me anything about our websites.", "bot");
})();

/* ---------- mini store demo ---------- */
(() => {
  const shop = $("#shop"); if (!shop) return;
  let n = 0, total = 0;
  const cn = $("#cartN"), ct = $("#cartT");
  $$("button", shop).forEach(b => b.addEventListener("click", () => {
    n++; total += +b.dataset.p;
    cn.textContent = n; ct.textContent = money(total);
    cn.classList.add("bump"); setTimeout(() => cn.classList.remove("bump"), 300);
    b.textContent = "Added ✓"; b.classList.add("added");
    setTimeout(() => { b.textContent = "Add to cart"; b.classList.remove("added"); }, 1200);
  }));
  $("#checkout").addEventListener("click", () => toast(n ? "Demo checkout: " + n + " item" + (n > 1 ? "s" : "") + ", " + money(total) : "Add something to the cart first"));
})();

/* ---------- micro-interactions ---------- */
(() => {
  $$(".magnet").forEach(m => {
    const p = m.parentElement;
    p.addEventListener("pointermove", e => { const b = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * .35}px,${(e.clientY - b.top - b.height / 2) * .35}px)`; });
    p.addEventListener("pointerleave", () => m.style.transform = "");
  });
  $$(".tilt").forEach(t => {
    const p = t.parentElement;
    p.addEventListener("pointermove", e => { const b = p.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5; t.style.transform = `perspective(500px) rotateY(${x * 30}deg) rotateX(${-y * 30}deg)`; });
    p.addEventListener("pointerleave", () => t.style.transform = "");
  });
  $$(".ripple").forEach(b => b.addEventListener("click", e => {
    const r = b.getBoundingClientRect(), s = document.createElement("span"), d = Math.max(r.width, r.height);
    s.className = "rp"; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(s); setTimeout(() => s.remove(), 600);
  }));
  $$(".sw-toggle").forEach(b => b.addEventListener("click", () => {
    const on = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", on);
    const card = b.closest("[data-themed]"); if (card) card.style.background = on ? "#0A1A2F" : "#F4F1EA";
    if (card) card.style.color = on ? "#E7ECF7" : "#2B2420";
  }));
  $$(".scramble").forEach(el => {
    const final = el.textContent, chars = "!<>-_\\/[]{}=+*^?#", go = () => {
      let f = 0; clearInterval(el._i);
      el._i = setInterval(() => { el.textContent = final.split("").map((c, i) => i < f / 2 ? c : c === " " ? " " : chars[Math.random() * chars.length | 0]).join(""); if (++f > final.length * 2) { clearInterval(el._i); el.textContent = final; } }, 35);
    };
    el.parentElement.addEventListener("pointerenter", go); onView(el, go);
  });
  $$(".count").forEach(el => onView(el, () => {
    const to = +el.dataset.to, pre = el.dataset.pre || "", suf = el.dataset.suf || "", t0 = performance.now();
    const step = ts => { const p = Math.min(1, (ts - t0) / 1400), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = pre + Math.round(v).toLocaleString() + suf; if (p < 1) requestAnimationFrame(step); };
    reduce ? el.textContent = pre + to.toLocaleString() + suf : requestAnimationFrame(step);
  }));
  $$(".ring").forEach(r => onView(r, () => {
    const to = +r.dataset.v, t0 = performance.now(), b = $("b", r);
    const step = ts => { const p = Math.min(1, (ts - t0) / 1300), v = Math.round(to * (1 - Math.pow(1 - p, 3))); r.style.setProperty("--p", v); b.textContent = v; if (p < 1) requestAnimationFrame(step); };
    reduce ? (r.style.setProperty("--p", to), b.textContent = to) : requestAnimationFrame(step);
  }));
})();

/* ---------- website health check ---------- */
(() => {
  const qs = $("#qs"); if (!qs) return;
  const boxes = $$("input", qs), g = $("#gauge"), h = $("#verdict"), p = $("#verdictP"), cta = $("#verdictCta");
  function calc() {
    const hit = boxes.filter(b => b.checked).reduce((s, b) => s + +b.dataset.w, 0);
    const v = Math.max(5, 100 - hit);
    g.style.setProperty("--v", v); $("b", g).textContent = v;
    g.style.setProperty("--gc", v >= 80 ? "var(--green)" : v >= 55 ? "var(--sun)" : "var(--coral)");
    if (v >= 80) { h.textContent = "Looking healthy"; p.textContent = "A Polish ($299) will tighten up speed, mobile and SEO details."; cta.textContent = "Book a Polish"; cta.href = "contact.html?plan=Polish"; }
    else if (v >= 55) { h.textContent = "Ready for a refresh"; p.textContent = "A Revamp keeps your content and rebuilds the design. From $1,499, 40% off a new build."; cta.textContent = "Get a Revamp quote"; cta.href = "contact.html?plan=Revamp"; }
    else { h.textContent = "Costing you customers"; p.textContent = "Your site is likely losing visitors. A full Revamp, from $1,499, is the fastest fix."; cta.textContent = "Claim revamp pricing"; cta.href = "contact.html?plan=Revamp"; }
  }
  boxes.forEach(b => b.addEventListener("change", calc)); calc();
})();

/* ---------- contact form ---------- */
(() => {
  const form = $("#form"); if (!form) return;
  const qp = new URLSearchParams(location.search), tid = qp.get("template"), plan = qp.get("plan");
  if (tid && typeof TEMPLATES !== "undefined" && tplById(tid)) {
    const t = tplById(tid), pal = qp.get("palette") || "1";
    $(".picked").classList.add("on");
    $(".picked span").textContent = `${t.name} template (${t.industry}), palette ${pal}`;
    form.elements.need.value = "Launch: template site ($799)";
    form.elements.tpl.value = `${t.name}, palette ${pal}`;
  }
  if (plan) { const o = [...form.elements.need.options].find(o => o.text.toLowerCase().startsWith(plan.toLowerCase())); if (o) form.elements.need.value = o.text; }
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(form);
    const body = `Name: ${f.get("name")}\nBusiness: ${f.get("biz")}\nPhone: ${f.get("phone")}\nCurrent website: ${f.get("site")}\nPackage: ${f.get("need")}\nTemplate: ${f.get("tpl") || "n/a"}\nTimeline: ${f.get("when")}\n\n${f.get("msg")}`;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("New website inquiry: " + (f.get("biz") || f.get("name")))}&body=${encodeURIComponent(body)}`;
  });
})();

/* footer wordmark: scale so it spans the full width */
(() => {
  const el = $(".f-big"); if (!el) return;
  const fit = () => {
    el.style.fontSize = "100px";
    const r = document.createRange(); r.selectNodeContents(el);
    const w = r.getBoundingClientRect().width;
    if (w) el.style.fontSize = (100 * el.clientWidth * .97 / w) + "px";
  };
  fit(); addEventListener("resize", fit);
  if (document.fonts) document.fonts.ready.then(fit);
})();
