/* New site: a list of real, rendered designs. Tap one, then "Start editing". */
(() => {
  const $ = s => document.querySelector(s);
  const list = $("#nwList"), cats = $("#nwCats"), bar = $("#nwBar");
  const groups = ["All", "Free", ...new Set(TEMPLATES.map(t => t.cat))];
  const monthly = +(CONFIG.editorPrice || {}).monthly || 0;
  let cat = "All", picked = null;

  cats.innerHTML = groups.map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${c}">${c === "All" ? `All designs <small>${TEMPLATES.length}</small>` : c === "Free" ? `Free <small>${Free.templates.length}</small>` : c}</button>`).join("");

  /* thumbnails: the real template, drawn at phone width and scaled to the card */
  const W = 390;
  const fit = el => { const s = el.clientWidth / W; if (s) el.firstElementChild.style.transform = `scale(${s})`; };
  const draw = el => { const t = tplGet(el.dataset.tid); if (!t) return; el.innerHTML = `<div class="scale" style="width:${W}px">${tpRender(t)}</div>`; fit(el); };
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); draw(e.target); } }), { root: list, rootMargin: "400px 0px" }) : null;

  function render() {
    /* the free starter designs come first; the rest carry a "Paid" tag (free to try, paid to publish) */
    const found = TEMPLATES.filter(t => cat === "All" || (cat === "Free" ? Free.ok(t.id) : t.cat === cat)).sort((a, b) => Free.ok(b.id) - Free.ok(a.id));
    list.innerHTML = found.map(t => `<button class="nw-card" type="button" data-id="${t.id}" aria-pressed="${picked === t.id}">
      <div class="nw-shotw"><div class="nw-shot" data-tid="${t.id}"></div>${Free.ok(t.id) ? `<span class="nw-tag free">Free</span>` : `<span class="nw-tag"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>Paid</span>`}</div>
      <div class="nw-meta"><b>${t.name}</b><span>${t.industry}</span></div></button>`).join("");
    list.querySelectorAll(".nw-shot").forEach(el => io ? io.observe(el) : draw(el));
    list.scrollTop = 0;
  }

  cats.addEventListener("click", e => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    cat = b.dataset.cat;
    cats.querySelectorAll("[data-cat]").forEach(x => x.setAttribute("aria-selected", x === b));
    b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    render();
  });

  list.addEventListener("click", e => {
    const c = e.target.closest(".nw-card"); if (!c) return;
    picked = c.dataset.id;
    list.querySelectorAll(".nw-card").forEach(x => x.setAttribute("aria-pressed", x === c));
    const t = tplGet(picked);
    $("#nwName").textContent = t.name;
    $("#nwInd").textContent = Free.ok(picked) ? t.industry + " · Free to publish" : `Paid design · free to try, $${monthly}/month to publish`;
    $("#nwGoT").textContent = Free.ok(picked) ? "Start editing" : "Try it free";
    $("#nwGo").href = "editor.html?new=1&t=" + encodeURIComponent(picked);
    bar.hidden = false; document.body.classList.add("picking");
  });

  addEventListener("resize", () => list.querySelectorAll(".nw-shot").forEach(el => el.firstElementChild && fit(el)));
  render();
})();
