/* New site: a list of real, rendered designs. Tap one, then "Start editing". */
(() => {
  const $ = s => document.querySelector(s);
  const list = $("#nwList"), cats = $("#nwCats"), bar = $("#nwBar");
  const groups = ["All", ...new Set(TEMPLATES.map(t => t.cat))];
  let cat = "All", picked = null;

  cats.innerHTML = groups.map((c, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-cat="${c}">${c === "All" ? `All designs <small>${TEMPLATES.length}</small>` : c}</button>`).join("");

  /* thumbnails: the real template, drawn at phone width and scaled to the card */
  const W = 390;
  const fit = el => { const s = el.clientWidth / W; if (s) el.firstElementChild.style.transform = `scale(${s})`; };
  const draw = el => { const t = tplGet(el.dataset.tid); if (!t) return; el.innerHTML = `<div class="scale" style="width:${W}px">${tpRender(t)}</div>`; fit(el); };
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); draw(e.target); } }), { root: list, rootMargin: "400px 0px" }) : null;

  function render() {
    const found = TEMPLATES.filter(t => cat === "All" || t.cat === cat);
    list.innerHTML = found.map(t => `<button class="nw-card" type="button" data-id="${t.id}" aria-pressed="${picked === t.id}">
      <div class="nw-shot" data-tid="${t.id}"></div>
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
    $("#nwName").textContent = t.name; $("#nwInd").textContent = t.industry;
    $("#nwGo").href = "editor.html?new=1&t=" + encodeURIComponent(picked);
    bar.hidden = false; document.body.classList.add("picking");
  });

  addEventListener("resize", () => list.querySelectorAll(".nw-shot").forEach(el => el.firstElementChild && fit(el)));
  render();
})();
