/* ======================= CONFIG — edit these ======================= */
const CONFIG = {
  email: "info@seasidehavenllc.com",   // your studio email
  phone: "(434) 233-0231"                   // your studio phone
};
/* =================================================================== */

document.querySelectorAll("[data-cfg]").forEach(el => el.textContent = CONFIG[el.dataset.cfg]);
document.querySelectorAll('[data-href="tel"]').forEach(a => a.href = "tel:" + CONFIG.phone.replace(/[^\d+]/g, ""));
document.querySelectorAll('[data-href="mail"]').forEach(a => a.href = "mailto:" + CONFIG.email);
document.getElementById("yr").textContent = new Date().getFullYear();

/* header background on scroll */
const hdr = document.getElementById("hdr");
const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 20);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* mobile menu */
const mb = document.getElementById("menuBtn"), mm = document.getElementById("mobileMenu");
mb.addEventListener("click", () => { const o = mm.classList.toggle("open"); mb.setAttribute("aria-expanded", o); hdr.classList.add("scrolled"); });
mm.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { mm.classList.remove("open"); mb.setAttribute("aria-expanded", false); }));

/* contact form opens the visitor's email app */
document.getElementById("form")?.addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get("name")}\nCompany: ${f.get("biz")}\nWebsite: ${f.get("site")}\nProject: ${f.get("need")}\nBudget: ${f.get("budget")}\n\n${f.get("msg")}`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("New project inquiry: " + (f.get("biz") || f.get("name")))}&body=${encodeURIComponent(body)}`;
});

/* work carousel */
(() => {
  if (!document.getElementById("track")) return;
  const track = document.getElementById("track"), slides = [...track.children], dots = document.getElementById("dots");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let idx = 0, paused = false, holdT;
  const base = () => slides[0].offsetLeft;
  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-label", "Show " + s.querySelector("h3").textContent);
    b.addEventListener("click", () => { go(i); hold(); });
    dots.appendChild(b);
  });
  const mark = () => [...dots.children].forEach((d, i) => d.setAttribute("aria-current", i === idx ? "true" : "false"));
  function go(i) { idx = (i + slides.length) % slides.length; track.scrollTo({ left: slides[idx].offsetLeft - base(), behavior: reduce ? "auto" : "smooth" }); mark(); }
  let raf;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      let best = 0, d = Infinity;
      slides.forEach((s, i) => { const dd = Math.abs(s.offsetLeft - base() - track.scrollLeft); if (dd < d) { d = dd; best = i; } });
      if (best !== idx) { idx = best; mark(); }
    });
  }, { passive: true });
  const hold = () => { paused = true; clearTimeout(holdT); holdT = setTimeout(() => paused = false, 12000); };
  document.getElementById("prev").addEventListener("click", () => { go(idx - 1); hold(); });
  document.getElementById("next").addEventListener("click", () => { go(idx + 1); hold(); });
  track.addEventListener("keydown", e => { if (e.key === "ArrowRight") { e.preventDefault(); go(idx + 1); hold(); } if (e.key === "ArrowLeft") { e.preventDefault(); go(idx - 1); hold(); } });
  ["pointerdown", "touchstart", "wheel"].forEach(ev => track.addEventListener(ev, hold, { passive: true }));
  track.addEventListener("mouseenter", () => paused = true);
  track.addEventListener("mouseleave", () => paused = false);
  if (!reduce) setInterval(() => { if (!paused && !document.hidden) go(idx + 1); }, 6000);
  mark();
})();

/* before / after */
(() => {
  if (!document.getElementById("ba")) return;
  const ba = document.getElementById("ba"), r = document.getElementById("baR");
  const url = document.getElementById("baUrl"), cap = document.getElementById("baCap");
  const meta = {
    rest:   ["tonystrattoria.com", "a menu PDF, a phone number and a visitor counter.", "online reservations, pickup orders and reviews up front."],
    law:    ["halewhitfield.law", "a wall of text and \"call during business hours.\"", "credibility in seconds and a secure consultation form."],
    clinic: ["lakeviewhealth.com", "printable PDF forms and phone-only scheduling.", "online booking with real open times and digital forms."]
  };
  const set = v => { v = Math.max(0, Math.min(100, v)); ba.style.setProperty("--pos", v + "%"); r.value = v; };
  r.addEventListener("input", () => set(+r.value));
  let drag = false;
  const fromEvent = e => { const b = ba.getBoundingClientRect(); set(((e.clientX - b.left) / b.width) * 100); };
  ba.addEventListener("pointerdown", e => { drag = true; ba.setPointerCapture(e.pointerId); fromEvent(e); });
  ba.addEventListener("pointermove", e => { if (drag) fromEvent(e); });
  ba.addEventListener("pointerup", () => drag = false);
  ba.addEventListener("pointercancel", () => drag = false);
  const tabs = [...document.querySelectorAll(".ba-tabs button")];
  tabs.forEach(t => t.addEventListener("click", () => {
    const k = t.dataset.set;
    tabs.forEach(x => x.setAttribute("aria-selected", x === t));
    ba.querySelectorAll(".ba-set").forEach(s => s.classList.toggle("on", s.dataset.set === k));
    url.textContent = meta[k][0];
    cap.innerHTML = `<span><b>Before:</b> ${meta[k][1]}</span><span><b>After:</b> ${meta[k][2]}</span>`;
    set(42);
  }));
  set(42);
})();

/* estimator */
(() => {
  if (!document.getElementById("pages")) return;
  const r = document.getElementById("pages"), v = document.getElementById("pagesVal");
  const q = document.getElementById("quote"), m = document.getElementById("monthly");
  const feats = [...document.querySelectorAll("#feats button")];
  const k = n => "$" + (Math.round(n / 500) * 500).toLocaleString();
  function calc() {
    const p = +r.value; v.textContent = p;
    const on = feats.filter(b => b.getAttribute("aria-pressed") === "true");
    const base = 6000 + p * 250 + on.reduce((s, b) => s + +b.dataset.v, 0);
    q.textContent = k(base * .95) + " to " + k(base * 1.2);
    m.textContent = "$" + (300 + on.reduce((s, b) => s + +b.dataset.m, 0)).toLocaleString() + "/mo";
  }
  feats.forEach(b => b.addEventListener("click", () => { b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); calc(); }));
  r.addEventListener("input", calc); calc();
})();

/* booking */
(() => {
  if (!document.getElementById("days")) return;
  const days = document.getElementById("days"), slots = [...document.querySelectorAll("#slots button")], msg = document.getElementById("bookMsg");
  const wd = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], mo = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
  document.getElementById("book").addEventListener("click", () => {
    msg.style.color = day && slot ? "" : "#FFB37F";
    msg.textContent = day && slot ? "Booked for " + day.dataset.label + " at " + slot.textContent + ". Confirmation sent." : "Choose a day and a time first.";
  });
})();

/* footer wordmark: scale so it spans the full width */
(() => {
  const el = document.querySelector(".f-big");
  if (!el) return;
  const fit = () => {
    el.style.fontSize = "100px";
    const r = document.createRange(); r.selectNodeContents(el);
    const w = r.getBoundingClientRect().width;
    if (w) el.style.fontSize = (100 * el.clientWidth * 0.97 / w) + "px";
  };
  fit();
  addEventListener("resize", fit);
  if (document.fonts) document.fonts.ready.then(fit);
})();
