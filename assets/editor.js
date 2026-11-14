/* =====================================================================
   SEASIDE HAVEN STUDIOS — site editor
   A visitor's design is one plain object: { src, t, P }
     src  the template (or variation) it started from
     t    a full copy of that template's data, which they edit
     P    the color palette in use
   It is drawn with the same tpRender() the gallery uses, autosaved in
   the browser (localStorage), and can be downloaded as a single HTML
   file or sent to the studio through the contact page.
   ===================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const KEY = "shs-editor-v1";
  const DEV = { desktop: 1280, tablet: 820, phone: 390 };
  const STYLE_KEYS = ["fh", "fb", "hw", "r", "layout", "up", "art", "widget"];
  const COLORS = [["bg", "Background"], ["fg", "Text"], ["mu", "Soft text"], ["ac", "Buttons"], ["acfg", "Button text"], ["sf", "Cards"], ["hi", "Highlights"]];
  const ART = { arch: "Arches", glow: "Warm glow", soft: "Soft shapes", stripes: "Stripes", lines: "Fine lines", orb: "Orbs", house: "Skyline", petal: "Petals", grid: "Blueprint", photo: "Horizon", gloss: "Gloss", leaf: "Leaves", sun: "Sunrise", mesh: "Gradient mesh", waves: "Waves", dots: "Dots" };
  const LISTS = [["stats", "Stats", 2, 4], ["feats", "Highlights", 2, 6], ["list", "Main list items", 1, 12], ["steps", "Steps", 2, 6], ["team", "Team members", 1, 8], ["faq", "Questions", 1, 10], ["gal", "Gallery photos", 3, 12]];

  const canvas = $("#edCanvas"), stage = $("#edStage"), side = $("#edSide"), pop = $("#edPop"), secBar = $("#edSecBar"), file = $("#edFile");
  const clone = o => JSON.parse(JSON.stringify(o));
  /* copies a design without duplicating its (large) uploaded photos in memory */
  const snap = s => { const imgs = s.t.imgs || {}, c = clone({ src: s.src, P: s.P, t: Object.assign({}, s.t, { imgs: undefined }) }); c.t.imgs = Object.assign({}, imgs); return c; };

  let S, dev = "desktop", pg = 0, preview = false, hist = [], hi = -1, hotSec = null, editing = null, needDraw = false;
  /* once someone has put in their own words or photos, switching templates keeps them by default */
  const madeItTheirs = () => { $("#edKeep").checked = true; };

  function toast(text) {
    let t = $(".ed-toast");
    if (!t) { t = document.createElement("div"); t.className = "ed-toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = text; t.classList.add("on");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 3200);
  }

  /* ---------- starting, saving, history ---------- */
  function fresh(id, palIdx) {
    const v = tplGet(id) || TEMPLATES[0], pals = tplAllPals(v);
    const P = clone(pals[palIdx == null ? (v.p0 || 0) : palIdx] || pals[0]);
    const t = clone(v);
    delete t.pal; delete t.p0; delete t.vname; delete t.base;
    t.sections = tpExtra(t).sections.slice();
    return { src: v.id, t, P };
  }
  function save() {
    const el = $("#edSaved");
    try { localStorage.setItem(KEY, JSON.stringify(S)); el.textContent = "Saved"; }
    catch (e) {
      /* photos can outgrow browser storage: keep the design, drop the photos from the saved copy */
      try { localStorage.setItem(KEY, JSON.stringify(Object.assign({}, S, { t: Object.assign({}, S.t, { imgs: {} }) }))); el.textContent = "Saved without photos"; toast("Your photos are too large to autosave. Download your site to keep them."); }
      catch (e2) { el.textContent = "Not saved"; }
    }
  }
  /* With accounts on (CONFIG.cloud) and a site open (?site=<id>), every save also goes to the account. */
  let siteId = null, siteRow = null, cloudT = 0, cloudBusy = false, cloudDirty = false;
  function cloudSave() {
    if (!siteId) return;
    cloudDirty = true; clearTimeout(cloudT);
    cloudT = setTimeout(async () => {
      if (cloudBusy) return cloudSave();
      cloudBusy = true; cloudDirty = false;
      try { await Cloud.saveSite(siteId, { design: S, name: S.t.brand.slice(0, 80) || "My site" }); if (!cloudDirty) $("#edSaved").textContent = "Saved to your account"; }
      catch (e) { $("#edSaved").textContent = "Not saved online"; }
      cloudBusy = false;
    }, 1500);
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.t && s.P && Array.isArray(s.t.nav) && Array.isArray(s.t.list) && s.t.art) return s;
    } catch (e) { /* fall through to a fresh design */ }
    return null;
  }
  function commit() {
    hist = hist.slice(0, hi + 1); hist.push(snap(S)); if (hist.length > 60) hist.shift();
    hi = hist.length - 1; save(); syncHist(); cloudSave();
  }
  function travel(d) {
    if (!hist[hi + d]) return;
    hi += d; S = snap(hist[hi]); save(); syncHist(); syncPanels(); draw();
  }
  const syncHist = () => { $("#edUndo").disabled = hi <= 0; $("#edRedo").disabled = hi >= hist.length - 1; };

  /* ---------- reading and writing the design ---------- */
  function ensure(key) { if (S.t[key] == null) S.t[key] = clone(tpExtra(S.t)[key]); return S.t[key]; }
  function getPath(path) {
    const ks = path.split("."); let o = S.t[ks[0]] == null ? tpExtra(S.t)[ks[0]] : S.t[ks[0]];
    for (let i = 1; i < ks.length && o != null; i++) o = o[ks[i]];
    return o;
  }
  function setPath(path, val) {
    const ks = path.split(".");
    if (ks.length === 1) { S.t[ks[0]] = val; return; }
    let o = ensure(ks[0]);
    for (let i = 1; i < ks.length - 1; i++) o = o[ks[i]];
    o[ks[ks.length - 1]] = val;
  }
  /* headline text may keep <em> highlights and line breaks; everything else is dropped */
  function richText(el) {
    let out = "";
    el.childNodes.forEach(n => {
      if (n.nodeType === 3) out += n.textContent;
      else if (n.nodeType !== 1) return;
      else if (n.tagName === "BR") out += "<br>";
      else if (n.tagName === "EM" || n.tagName === "I") { const inner = richText(n); if (inner) out += "<em>" + inner.replace(/<\/?em>/g, "") + "</em>"; }
      else if (n.tagName === "DIV" || n.tagName === "P") out += (out ? "<br>" : "") + richText(n);
      else out += richText(n);
    });
    return out.replace(/ /g, " ");
  }
  const plainText = (el, multi) => { const s = el.innerText.replace(/ /g, " ").trim(); return multi ? s.replace(/\n{2,}/g, "\n") : s.replace(/\s*\n\s*/g, " "); };

  /* ---------- drawing ---------- */
  function draw(keep = true) {
    const top = stage.scrollTop;
    const pad = innerWidth <= 900 ? 24 : 48, avail = Math.max(240, stage.clientWidth - pad);
    const w = dev === "desktop" ? Math.max(DEV.desktop, Math.min(avail, 1480)) : DEV[dev];
    const cw = Math.min(avail, dev === "tablet" ? 720 : dev === "phone" ? 390 : w), s = cw / w;
    canvas.className = "ed-canvas " + dev + (preview ? "" : " editing");
    canvas.style.width = cw + "px";
    canvas.innerHTML = `<div class="scale" style="width:${w}px;transform:scale(${s})">${tpRender(S.t, S.P, pg)}</div>`;
    const fit = () => { const tp = canvas.firstElementChild && canvas.firstElementChild.firstElementChild; if (tp) canvas.style.height = tp.offsetHeight * s + "px"; };
    fit(); canvas._fit = fit;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    stage.scrollTop = keep ? top : 0;
    secBar.hidden = true; hotSec = null; editing = null; hidePop();
    const sel = $("#edPage");
    sel.innerHTML = ["Home", ...S.t.nav].map((n, i) => `<option value="${i}">${tpEsc(n)}</option>`).join(""); sel.value = pg;
    $("#edLaunch").href = `contact.html?template=${encodeURIComponent(S.src)}&design=1`;
  }
  const change = (redraw = true) => { commit(); if (redraw) draw(); };

  /* ---------- panels ---------- */
  function tab(name) {
    $$(".ed-tabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === name));
    $$(".ed-panel").forEach(p => p.classList.toggle("on", p.dataset.panel === name));
    if (name === "templates") $$(".thumb", side).forEach(t => t._fit && t._fit());
  }
  $$(".ed-tabs button").forEach(b => b.addEventListener("click", () => tab(b.dataset.tab)));

  /* templates */
  const thumbIO = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { thumbIO.unobserve(e.target); thumb(e.target); } }), { root: $('[data-panel="templates"]'), rootMargin: "300px 0px" }) : null;
  function thumb(el) {
    const t = tplGet(el.dataset.tid); if (!t) return;
    el.innerHTML = `<div class="scale" style="width:1280px">${tpRender(t)}</div>`;
    el._fit = () => { if (el.clientWidth) el.firstElementChild.style.transform = `scale(${el.clientWidth / 1280})`; };
    el._fit();
  }
  function listTemplates() {
    const q = $("#edTSearch").value.trim().toLowerCase(), cat = $("#edTCat").value, base = (S.src || "").split("~")[0];
    const words = tplSearchWords(q);
    const found = TEMPLATES.filter(t => (!cat || t.cat === cat) && words.every(w => tplHay(t).includes(w)));
    const list = $("#edTList");
    list.innerHTML = found.length ? found.map(t => `<button class="ed-tcard" type="button" data-id="${t.id}" aria-pressed="${t.id === base}"><div class="thumb" data-tid="${t.id}"></div><div class="meta"><b>${t.name}</b><span>${t.industry}</span></div></button>`).join("") : `<p class="ed-hint">Nothing matches that. Try another word.</p>`;
    $$(".thumb", list).forEach(el => (thumbIO ? thumbIO.observe(el) : thumb(el)));
  }
  $("#edTCat").innerHTML = `<option value="">All categories</option>` + [...new Set(TEMPLATES.map(t => t.cat))].map(c => `<option>${c}</option>`).join("");
  $("#edTSearch").addEventListener("input", listTemplates);
  $("#edTCat").addEventListener("change", listTemplates);
  $("#edTList").addEventListener("click", e => {
    const b = e.target.closest(".ed-tcard"); if (!b) return;
    const next = fresh(b.dataset.id);
    if ($("#edKeep").checked) {
      /* new look, same words and photos */
      STYLE_KEYS.forEach(k => { if (next.t[k] === undefined) delete S.t[k]; else S.t[k] = next.t[k]; });
      S.P = next.P; S.src = next.src;
    } else S = next;
    pg = 0; commit(); syncPanels(); draw(false);
    toast(`${tplGet(b.dataset.id).name} applied`);
  });

  /* design */
  function syncPanels() {
    const pals = tplAllPals(tplGet(S.src) || TEMPLATES[0]);
    const same = p => COLORS.every(([k]) => p[k] === S.P[k]);
    $("#edPals").innerHTML = pals.map((p, i) => `<button type="button" data-i="${i}" title="${p.n}" aria-label="${p.n} palette" aria-pressed="${same(p)}" style="background:linear-gradient(135deg,${p.bg} 50%,${p.ac} 50%)"></button>`).join("");
    $("#edColors").innerHTML = COLORS.map(([k, n]) => `<label>${n}<input type="color" data-c="${k}" value="${/^#[0-9a-f]{6}$/i.test(S.P[k]) ? S.P[k] : "#000000"}"></label>`).join("");
    const cur = FONT_PAIRS.findIndex(f => f.fh === S.t.fh && f.fb === S.t.fb);
    $("#edFonts").innerHTML = FONT_PAIRS.map((f, i) => `<button type="button" data-i="${i}" aria-pressed="${i === cur}" style="font-family:${f.fh};font-weight:${f.hw}">${f.n}<small>${f.fh.split("'")[1]}</small></button>`).join("");
    $("#edUp").checked = !!S.t.up;
    const lay = S.t.layout === "dash" ? "split" : S.t.layout;
    $("#edLayouts").innerHTML = Object.keys(LAYOUTS).map(k => `<button type="button" data-k="${k}" aria-pressed="${k === lay}">${LAYOUTS[k]}</button>`).join("");
    $("#edR").value = Math.min(40, +S.t.r || 0); $("#edRv").textContent = (+S.t.r || 0) > 40 ? "Pill" : (+S.t.r || 0) + "px";
    $("#edArt").innerHTML = Object.keys(ART).map(k => `<button type="button" data-k="${k}" aria-pressed="${k === S.t.art.kind}">${ART[k]}</button>`).join("");
    /* sections */
    const secs = S.t.sections;
    $("#edSecs").innerHTML = secs.map((k, i) => `<li data-k="${k}"><span>${TP_SECTIONS[k] || k}</span><button type="button" data-act="up" aria-label="Move ${TP_SECTIONS[k]} up"${i ? "" : " disabled"}>↑</button><button type="button" data-act="down" aria-label="Move ${TP_SECTIONS[k]} down"${i < secs.length - 1 ? "" : " disabled"}>↓</button><button type="button" data-act="del" aria-label="Remove ${TP_SECTIONS[k]}"${secs.length > 1 ? "" : " disabled"}>✕</button></li>`).join("");
    const rest = Object.keys(TP_SECTIONS).filter(k => !secs.includes(k));
    $("#edAdd").innerHTML = rest.length ? rest.map(k => `<button type="button" data-k="${k}">+ ${TP_SECTIONS[k]}</button>`).join("") : `<p class="ed-hint">Every section is already on the page.</p>`;
    /* content */
    $("#edBrand").value = S.t.brand;
    $("#edNavs").innerHTML = S.t.nav.map((n, i) => `<input class="ed-in" type="text" maxlength="24" data-i="${i}" value="${tpEsc(n)}" aria-label="Menu page ${i + 1}">`).join("");
    $("#edItems").value = S.t.items;
    $("#edCounts").innerHTML = LISTS.filter(([k]) => ["stats", "feats", "list"].includes(k) || secs.includes(k === "gal" ? "gallery" : k)).map(([k, n, min, max]) => { const len = getPath(k).length; return `<div data-k="${k}"><span>${n}</span><button type="button" data-d="-1" aria-label="Fewer ${n}"${len > min ? "" : " disabled"}>−</button><b>${len}</b><button type="button" data-d="1" aria-label="More ${n}"${len < max ? "" : " disabled"}>+</button></div>`; }).join("");
    $$(".ed-tcard").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === S.src.split("~")[0]));
  }
  $("#edPals").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; S.P = clone(tplAllPals(tplGet(S.src) || TEMPLATES[0])[+b.dataset.i]); change(); syncPanels(); });
  $("#edColors").addEventListener("input", e => {
    const k = e.target.dataset.c; if (!k) return;
    S.P[k] = e.target.value; delete S.P.n;
    if (k === "ac") { S.P.acfg = tpOn(S.P.ac); $('[data-c="acfg"]').value = S.P.acfg; }
    draw();
  });
  $("#edColors").addEventListener("change", () => { commit(); syncPanels(); });
  $("#edFonts").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; const f = FONT_PAIRS[+b.dataset.i]; Object.assign(S.t, { fh: f.fh, fb: f.fb, hw: f.hw, up: !!f.up }); change(); syncPanels(); });
  $("#edUp").addEventListener("change", e => { S.t.up = e.target.checked; change(); });
  $("#edLayouts").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; S.t.layout = b.dataset.k; change(); syncPanels(); });
  $("#edR").addEventListener("input", e => { S.t.r = +e.target.value; $("#edRv").textContent = e.target.value + "px"; draw(); });
  $("#edR").addEventListener("change", commit);
  $("#edArt").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; S.t.art = Object.assign({}, S.t.art, { kind: b.dataset.k }); change(); syncPanels(); });

  /* sections */
  function secAct(k, act) {
    const a = S.t.sections, i = a.indexOf(k); if (i < 0) return;
    if (act === "del") { if (a.length > 1) a.splice(i, 1); }
    else { const j = i + (act === "up" ? -1 : 1); if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; }
    change(); syncPanels();
    if (act !== "del") scrollToSec(k);
  }
  function scrollToSec(k) {
    if (pg !== 0) { pg = 0; draw(false); }
    const el = $(`[data-sec="${k}"]`, canvas); if (!el) return;
    stage.scrollTo({ top: el.getBoundingClientRect().top - canvas.getBoundingClientRect().top, behavior: "smooth" });
  }
  $("#edSecs").addEventListener("click", e => {
    const li = e.target.closest("li"); if (!li) return;
    const b = e.target.closest("button");
    b ? secAct(li.dataset.k, b.dataset.act) : scrollToSec(li.dataset.k);
  });
  $("#edAdd").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const a = S.t.sections, k = b.dataset.k, at = a.indexOf("cta");
    at > 0 ? a.splice(at, 0, k) : a.push(k);   /* new sections go just above the closing call to action */
    change(); syncPanels(); scrollToSec(k);
  });
  secBar.addEventListener("click", e => { const b = e.target.closest("button"); if (b && hotSec) secAct(hotSec, b.dataset.act); });

  /* content */
  $("#edBrand").addEventListener("input", e => { S.t.brand = e.target.value; draw(); });
  $("#edBrand").addEventListener("change", commit);
  $("#edNavs").addEventListener("input", e => { if (e.target.dataset.i == null) return; S.t.nav[+e.target.dataset.i] = e.target.value || "Page"; draw(); });
  $("#edNavs").addEventListener("change", commit);
  $("#edItems").addEventListener("change", e => { S.t.items = e.target.value; change(); });
  $("#edCounts").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const k = b.closest("div").dataset.k, arr = ensure(k), spec = LISTS.find(l => l[0] === k);
    if (+b.dataset.d > 0 && arr.length < spec[3]) arr.push(clone(arr[arr.length - 1]));
    else if (+b.dataset.d < 0 && arr.length > spec[2]) arr.pop();
    change(); syncPanels();
  });
  $("#edReset").addEventListener("click", () => {
    if (!confirm("Reset this design back to the original template? Your text, colors and photos will be cleared.")) return;
    S = fresh(S.src); pg = 0; commit(); syncPanels(); draw(false);
  });

  /* ---------- editing right on the page ---------- */
  function hidePop() { pop.hidden = true; pop.innerHTML = ""; }
  function showPop(x, y, buttons) {
    pop.innerHTML = buttons.map((b, i) => `<button type="button" data-i="${i}">${b[0]}</button>`).join("");
    pop.hidden = false;
    const r = pop.getBoundingClientRect();
    pop.style.left = Math.max(8, Math.min(innerWidth - r.width - 8, x - r.width / 2)) + "px";
    pop.style.top = Math.max(8, Math.min(innerHeight - r.height - 8, y)) + "px";
    pop.onmousedown = e => e.preventDefault();   /* keep the text selection while a button is pressed */
    pop.onclick = e => { const b = e.target.closest("button"); if (b) buttons[+b.dataset.i][1](); };
  }
  function startEdit(el) {
    if (editing === el) return;
    const path = el.dataset.e, rich = el.hasAttribute("data-rich"), before = getPath(path);
    editing = el;
    el.setAttribute("contenteditable", rich ? "true" : "plaintext-only");
    if (el.contentEditable !== "plaintext-only" && !rich) el.setAttribute("contenteditable", "true");
    el.focus();
    const read = () => (rich ? richText(el) : plainText(el, path.startsWith("contact.")));
    const onInput = () => { setPath(path, read()); $("#edSaved").textContent = "Editing…"; canvas._fit && canvas._fit(); };
    const onKey = e => {
      if (e.key === "Escape" || (e.key === "Enter" && !e.shiftKey && !path.startsWith("contact."))) { e.preventDefault(); el.blur(); }
    };
    const onPaste = e => { e.preventDefault(); document.execCommand("insertText", false, (e.clipboardData || window.clipboardData).getData("text/plain")); };
    const onBlur = () => {
      el.removeEventListener("input", onInput); el.removeEventListener("keydown", onKey); el.removeEventListener("paste", onPaste);
      const now = read(); setPath(path, now); editing = null; hidePop();
      el.removeAttribute("contenteditable");
      el.innerHTML = rich ? tpRich(now) : tpEsc(now).replace(/\n/g, "<br>");
      canvas._fit && canvas._fit();
      if (now === before) { $("#edSaved").textContent = "Saved"; return; }
      commit(); syncPanels(); madeItTheirs();
      /* text that also shows elsewhere on the page needs a redraw, but not while the
         visitor is in the middle of clicking into the next thing to edit */
      if (/^(brand|cta|b1|nav\.|stats\.)/.test(path)) { needDraw = true; setTimeout(() => { if (needDraw && !editing) { needDraw = false; draw(); } }, 350); }
    };
    el.addEventListener("input", onInput); el.addEventListener("keydown", onKey); el.addEventListener("paste", onPaste);
    el.addEventListener("blur", onBlur, { once: true });
    if (rich) {
      const r = el.getBoundingClientRect();
      showPop(r.left + r.width / 2, r.top - 54, [["Highlight selected words", () => { document.execCommand("italic"); onInput(); }], ["Done", () => el.blur()]]);
    }
  }
  function pickImage(key, x, y) {
    const has = S.t.imgs && S.t.imgs[key];
    const upload = () => { hidePop(); file._key = key; file.value = ""; file.click(); };
    if (!has) return upload();
    showPop(x, y + 12, [["Change photo", upload], ["Remove photo", () => { delete S.t.imgs[key]; hidePop(); change(); }]]);
  }
  file.addEventListener("change", () => {
    const f = file.files[0], key = file._key; if (!f || !key) return;
    if (!/^image\//.test(f.type)) return toast("Please choose an image file.");
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => {
      /* shrink to a web-friendly size so the design stays small enough to save */
      const k = Math.min(1, 1600 / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      (S.t.imgs = S.t.imgs || {})[key] = c.toDataURL("image/jpeg", .82);
      change(); madeItTheirs();
    };
    im.onerror = () => { URL.revokeObjectURL(url); toast("That image couldn't be opened. Try a JPG or PNG."); };
    im.src = url;
  });

  canvas.addEventListener("click", e => {
    const burger = e.target.closest("[data-burger]");
    if (burger) { burger.closest(".tp").classList.toggle("menu-open"); canvas._fit && canvas._fit(); return; }
    if (!preview) {
      const ed = e.target.closest("[data-e]");
      if (ed) { e.preventDefault(); startEdit(ed); return; }
      const im = e.target.closest("[data-img]");
      if (im) { e.preventDefault(); pickImage(im.dataset.img, e.clientX, e.clientY); return; }
    }
    const a = e.target.closest("[data-pg]");
    if (a) { e.preventDefault(); pg = +a.dataset.pg; draw(false); }
  });
  document.addEventListener("mousedown", e => { if (!pop.hidden && !pop.contains(e.target) && !editing) hidePop(); });

  /* floating move / remove bar for the section under the pointer */
  canvas.addEventListener("pointermove", e => {
    if (preview || pg !== 0 || editing || e.pointerType === "touch") return;
    const sec = e.target.closest("[data-sec]");
    if (!sec) return;
    if (hotSec !== sec.dataset.sec) {
      $$(".ed-hot", canvas).forEach(x => x.classList.remove("ed-hot"));
      sec.classList.add("ed-hot"); hotSec = sec.dataset.sec;
      $("#edSecName").textContent = TP_SECTIONS[hotSec] || hotSec;
    }
    const r = sec.getBoundingClientRect(), st = stage.getBoundingClientRect(), c = canvas.getBoundingClientRect();
    secBar.hidden = false;
    secBar.style.top = Math.max(r.top, st.top) - st.top + stage.scrollTop + 10 + "px";
    secBar.style.left = c.right - st.left + stage.scrollLeft - secBar.offsetWidth - 12 + "px";
  });
  stage.addEventListener("pointerleave", () => { secBar.hidden = true; $$(".ed-hot", canvas).forEach(x => x.classList.remove("ed-hot")); hotSec = null; });

  /* ---------- top bar ---------- */
  $$("[data-dev]").forEach(b => b.addEventListener("click", () => { dev = b.dataset.dev; $$("[data-dev]").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); }));
  $("#edPage").addEventListener("change", e => { pg = +e.target.value; draw(false); });
  $("#edUndo").addEventListener("click", () => travel(-1));
  $("#edRedo").addEventListener("click", () => travel(1));
  addEventListener("keydown", e => {
    if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "z" || editing || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    e.preventDefault(); travel(e.shiftKey ? 1 : -1);
  });
  $("#edPreview").addEventListener("click", e => {
    preview = !preview; e.currentTarget.setAttribute("aria-pressed", preview); e.currentTarget.textContent = preview ? "Back to editing" : "Preview";
    document.body.classList.toggle("previewing", preview); draw();
  });
  const fab = $("#edFab");
  fab.addEventListener("click", () => { const o = side.classList.toggle("open"); fab.setAttribute("aria-expanded", o); fab.textContent = o ? "Close tools" : "Tools"; });
  fab.setAttribute("aria-expanded", "false");
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if (!editing) draw(); }, 120); });

  /* ---------- download as one self-contained HTML file ---------- */
  const FONT_URL = {
    "Anton": "Anton", "Archivo Black": "Archivo+Black", "Bricolage Grotesque": "Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800",
    "Cormorant Garamond": "Cormorant+Garamond:ital,wght@0,500;1,500", "DM Serif Display": "DM+Serif+Display", "Fraunces": "Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500",
    "Outfit": "Outfit:wght@400;500;600;700", "Playfair Display": "Playfair+Display:ital,wght@0,500;0,600;1,500", "Space Grotesk": "Space+Grotesk:wght@500;700",
    "Syne": "Syne:wght@700;800", "Geist": "Geist:wght@300;400;500;600;700;800", "Instrument Serif": "Instrument+Serif:ital@0;1"
  };
  async function templateCss() {
    try { const r = await fetch("assets/templates.css"); if (r.ok) return await r.text(); } catch (e) { /* e.g. opened from a file: fall back below */ }
    const sheet = [...document.styleSheets].find(s => (s.href || "").includes("templates.css"));
    return sheet ? [...sheet.cssRules].map(r => r.cssText).join("\n") : "";
  }
  /* Designing is free. Keeping the site is paid, two ways (prices in CONFIG.editorPrice):
       buy      one payment, then the visitor downloads the site file. With a Stripe link in
                (CONFIG.pay || {}).editorBuy, Stripe sends them back to editor.html?paid=<checkout session id>,
                which unlocks the download in this browser.
       monthly  the studio hosts the site. With a Stripe link in (CONFIG.pay || {}).editorMonthly, Stripe sends
                them to welcome.html?design=1, where they hand over their design.
     Without a link, either choice goes to the quote form with the design attached.
     Note: this site has no server, so the download unlock is checked in the browser only. */
  const PAID = "shs-editor-paid", EP = CONFIG.editorPrice || {}, buy = +EP.buy || 0, monthly = +EP.monthly || 0, payDlg = $("#edPay");
  const isPaid = () => { if (!buy) return true; try { return localStorage.getItem(PAID) === "1"; } catch (e) { return false; } };
  const CLOUD = typeof Cloud !== "undefined" && Cloud.on;
  const labelExport = () => { $("#edExport").textContent = CLOUD ? (siteRow && siteRow.plan !== "free" ? (siteRow.plan === "monthly" ? "Publish" : "Save for download") : "Get my site") : isPaid() ? "Download" : "Get my site"; };
  const stripeRef = () => "editor-" + S.src.replace(/[^A-Za-z0-9_-]/g, "_");
  const checkout = (link, plan) => {
    save();
    location.href = link ? link + (link.includes("?") ? "&" : "?") + "client_reference_id=" + stripeRef() : `contact.html?template=${encodeURIComponent(S.src)}&design=1&plan=${plan}`;
  };
  $("#edPayX").addEventListener("click", () => payDlg.close());
  payDlg.addEventListener("click", e => { if (e.target === payDlg) payDlg.close(); });
  $("#edPayGo").addEventListener("click", () => checkout((CONFIG.pay || {}).editorBuy, "Download"));
  $("#edPayMo").addEventListener("click", () => checkout((CONFIG.pay || {}).editorMonthly, "Hosted"));
  $("#edExport").addEventListener("click", async () => {
    if (CLOUD) {
      /* accounts are on: the dashboard handles plans, publishing and downloads */
      save();
      if (!siteId) { location.href = "dashboard.html?claim=1"; return; }
      if (siteRow && siteRow.plan === "free") { clearTimeout(cloudT); try { await Cloud.saveSite(siteId, { design: S }); } catch (e) { /* the dashboard shows the last saved copy */ } location.href = "dashboard.html?plans=" + siteId; return; }
      return publish();
    }
    if (isPaid()) return exportSite();
    $("#edBuyPrice").textContent = "$" + buy; $("#edMoPrice").textContent = "$" + monthly;
    $("#edPayGo").textContent = (CONFIG.pay || {}).editorBuy ? `Buy for $${buy}` : `Request it · $${buy}`;
    $("#edPayMo").textContent = (CONFIG.pay || {}).editorMonthly ? `Start for $${monthly}/month` : `Request it · $${monthly}/month`;
    $(".ed-plan.best").hidden = !monthly;
    $("#edPayLaunch").href = $("#edLaunch").href;
    payDlg.showModal();
  });

  /* ---------- design files: a backup the visitor can keep, and how a design reaches the studio ---------- */
  const slug = () => S.t.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "my-site";
  function saveAs(name, text, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  const validDesign = d => d && d.t && d.P && Array.isArray(d.t.nav) && Array.isArray(d.t.list) && Array.isArray(d.t.stats) && Array.isArray(d.t.feats) && Array.isArray(d.t.quote) && d.t.art && typeof d.t.brand === "string" && typeof d.P.bg === "string";
  $("#edSaveFile").addEventListener("click", () => { saveAs(slug() + "-design.json", JSON.stringify(S), "application/json"); toast("Design file saved."); });
  $("#edOpenFile").addEventListener("click", () => { const f = $("#edDesignFile"); f.value = ""; f.click(); });
  $("#edDesignFile").addEventListener("change", async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!validDesign(d)) throw 0;
      S = { src: tplGet(d.src) ? d.src : "harbor", t: d.t, P: d.P };
      if (!Array.isArray(S.t.sections) || !S.t.sections.length) S.t.sections = tpExtra(S.t).sections.slice();
      pg = 0; commit(); syncPanels(); draw(false); toast("Design opened.");
    } catch (err) { toast("That file isn't a design saved from this editor."); }
  });

  async function publish() {
    const html = await buildSite();
    if (!html) return toast("Couldn't prepare your site. Please try again.");
    const btn = $("#edExport"); btn.disabled = true;
    try {
      clearTimeout(cloudT);
      await Cloud.saveSite(siteId, { design: S, name: S.t.brand.slice(0, 80) || "My site", html, published_at: new Date().toISOString() });
      toast(siteRow.plan === "monthly" ? "Published. Your changes are live within a minute." : "Saved. Your download is ready in your dashboard.");
    } catch (e) { toast(/too large|payload|8000000|10000000/i.test(e.message || "") ? "Your photos are too large to publish. Try smaller photos." : "Couldn't publish. Check your connection and try again."); }
    btn.disabled = false;
  }
  async function exportSite() {
    const html = await buildSite();
    if (!html) return toast("Couldn't prepare the download. Please try again.");
    saveAs(slug() + ".html", html, "text/html");
    toast("Downloaded. Open the file in any browser to see your site.");
  }
  async function buildSite() {
    const css = await templateCss();
    if (!css) return "";
    const fams = [...new Set([S.t.fh, S.t.fb].map(f => (f.split("'")[1] || "").trim()))].map(n => FONT_URL[n]).filter(Boolean);
    const pages = [0, 1, 2, 3, 4].map(i => `<div class="pg${i ? "" : " on"}">${tpRender(S.t, S.P, i).replace(/ data-(e|sec|img)="[^"]*"| data-rich/g, "")}</div>`).join("\n");
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${tpEsc(S.t.brand)}</title>
<meta name="description" content="${tpEsc(S.t.sub)}">
<meta name="theme-color" content="${tpEsc(S.P.bg)}">
${fams.length ? `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?${fams.map(f => "family=" + f).join("&")}&display=swap" rel="stylesheet">` : ""}
<style>
html,body{margin:0;background:${tpEsc(S.P.bg)}}
.pg{display:none}.pg.on{display:block}
${css}
</style>
</head>
<body>
<!-- Designed with the Seaside Haven Studios site editor -->
${pages}
<script>
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-burger]");
  if(b){b.closest(".tp").classList.toggle("menu-open");return}
  var a=e.target.closest("[data-pg]");
  if(a){e.preventDefault();var n=+a.getAttribute("data-pg");document.querySelectorAll(".pg").forEach(function(p,i){p.classList.toggle("on",i===n)});window.scrollTo(0,0)}
});
<\/script>
</body>
</html>`;
    return html;
  }

  /* ---------- go ---------- */
  const qp = new URLSearchParams(location.search), want = qp.get("t"), saved = load();
  if (want && tplGet(want) && (!saved || saved.src !== tplGet(want).id)) {
    S = !saved || confirm(`Start a new design from the ${tplGet(want).name} template? This replaces the design you were working on.`) ? fresh(want, qp.get("p") == null ? null : +qp.get("p")) : saved;
  } else S = qp.has("new") ? fresh("harbor") : saved || fresh("harbor");
  if (!Array.isArray(S.t.sections) || !S.t.sections.length) S.t.sections = tpExtra(S.t).sections.slice();
  /* back from Stripe checkout: unlock and hand over the file */
  const justPaid = /^cs_(live|test)_[A-Za-z0-9]{10,}$/.test(qp.get("paid") || "");
  if (justPaid) { try { localStorage.setItem(PAID, "1"); } catch (e) { /* private mode: the download below still runs */ } }
  if (want || qp.has("paid") || qp.has("new")) history.replaceState(null, "", location.pathname);
  commit(); listTemplates(); syncPanels(); draw(false); labelExport();
  /* opened from the dashboard: swap in the site saved in the account */
  const wantSite = qp.get("site");
  if (CLOUD) {
    $("#edLaunch").textContent = "My sites"; $("#edLaunch").href = "dashboard.html";
    if (wantSite) (async () => {
      try {
        const user = await Cloud.user();
        if (!user) { location.href = "account.html?next=" + encodeURIComponent("editor.html?site=" + wantSite); return; }
        const row = await Cloud.getSite(wantSite);
        if (!row || !validDesign(row.design)) throw 0;
        S = { src: tplGet(row.design.src) ? row.design.src : "harbor", t: row.design.t, P: row.design.P };
        if (!Array.isArray(S.t.sections) || !S.t.sections.length) S.t.sections = tpExtra(S.t).sections.slice();
        hist = []; hi = -1; pg = 0; commit(); siteId = row.id; siteRow = row;
        syncPanels(); draw(false); labelExport(); tab("design");
        $("#edSaved").textContent = "Saved to your account";
        if (qp.get("publish")) publish();
      } catch (e) { toast("Couldn't open that site. Opening your dashboard."); setTimeout(() => { location.href = "dashboard.html"; }, 1600); }
    })();
  }
  if (justPaid) { toast("Payment received. Thank you! Your download is starting."); setTimeout(exportSite, 900); }
  if (saved && S === saved) tab("design");
})();
