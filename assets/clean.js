/* Clean addresses: the website shows /app instead of /app.html, and / instead of /index.html.
   GitHub Pages serves /app from app.html on its own, so only the links and the address bar
   change. The iPhone app loads its pages from files, so it keeps the .html names. */
(() => {
  if (location.protocol !== "https:") return;
  const clean = p => p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  const here = clean(location.pathname);
  if (here !== location.pathname) history.replaceState(history.state, "", here + location.search + location.hash);
  const fix = a => {
    let u; try { u = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
    if (u.origin !== location.origin || !/\.html$/.test(u.pathname)) return;
    a.setAttribute("href", clean(u.pathname) + u.search + u.hash);
  };
  const run = r => r.querySelectorAll('a[href*=".html"]').forEach(fix);
  const start = () => {
    run(document);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => {
      if (n.nodeType !== 1) return;
      if (n.matches('a[href*=".html"]')) fix(n);
      run(n);
    }))).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

/* the page's file name, with or without a clean address: "app.html", "index.html" */
function pageName() { return (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") + ".html"; }

/* Sheets and menus: when one opens, the browser focuses the first button or field inside it.
   On iPhone that draws a focus ring around the close button, pops the keyboard for forms and
   scrolls the screen to "reveal" that button, which pushed the account menu up under the clock
   and off the side of the screen. The sheet takes focus itself instead, and nothing moves. */
(() => {
  const D = window.HTMLDialogElement && HTMLDialogElement.prototype;
  if (!D || !D.showModal || D.showModal.__calm) return;
  const show = D.showModal;
  D.showModal = function () {
    const x = scrollX, y = scrollY;
    if (!this.hasAttribute("tabindex")) this.tabIndex = -1;
    this.setAttribute("autofocus", "");
    show.call(this);
    try { this.focus({ preventScroll: true }); } catch (e) { this.focus(); }
    this.scrollTop = 0;
    if (scrollX !== x || scrollY !== y) scrollTo(x, y);
  };
  D.showModal.__calm = true;
})();
