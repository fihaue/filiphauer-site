/* =====================================================================
   PROJECT POPUP — the window that opens over the page.
   ---------------------------------------------------------------------
   Uses the browser's built-in <dialog>, which already handles:
   Esc to close, keeping keyboard focus inside, and screen readers.
   We add: filling it with project content and previous/next.
   ===================================================================== */

window.Site = window.Site || {};

(function () {
  const h = Site.helpers;
  const e = h.escape;

  const dialog = () => document.getElementById("project-popup");
  let order = [];          // project ids in the order the page shows them
  let returnFocus = null;  // element to focus again after closing

  /* Opens the popup for one project. `pageOrder` = ids for prev/next. */
  function open(id, pageOrder) {
    const p = h.findProject(id);
    if (!p || !h.hasPopup(p)) return;
    if (pageOrder) order = pageOrder.filter(pid => h.hasPopup(h.findProject(pid)));
    if (!order.includes(id)) order = Site.projects.filter(h.hasPopup).map(x => x.id);

    const i = order.indexOf(id);
    const prev = h.findProject(order[(i - 1 + order.length) % order.length]);
    const next = h.findProject(order[(i + 1) % order.length]);

    h.$("#popup-address").textContent = `${Site.config.siteUrl.replace(/^https?:\/\//, "")}/#${p.id}`;
    h.$("#popup-content").innerHTML = `
      ${h.zoomImg(h.heroImage(p), h.altText(p, "hero"), "popup-hero")}
      ${p.credits && p.credits.hero ? `<p class="photo-credit">${e(p.credits.hero)}</p>` : ""}
      <div class="popup-text">
        ${h.kicker(p)}
        <h2 id="popup-title">${e(p.title)}</h2>
        <p class="meta">${e(p.meta)}</p>
        ${h.withLine(p)}
        ${h.tagPills(p)}
        <div class="full-text">${h.fullText(p)}</div>
        ${h.foldouts(p)}
        ${h.videos(p)}
        ${Site.layouts.gallery(p)}
        ${h.linkRow(p)}
      </div>`;
    h.$("#popup-content").scrollTop = 0;

    const prevBtn = h.$("#popup-prev"), nextBtn = h.$("#popup-next");
    prevBtn.dataset.go = prev.id; prevBtn.innerHTML = `← ${e(h.t("ui.previous"))}<span>${e(prev.short || prev.title)}</span>`;
    nextBtn.dataset.go = next.id; nextBtn.innerHTML = `${e(h.t("ui.next"))} →<span>${e(next.short || next.title)}</span>`;

    const d = dialog();
    if (!d.open) {
      returnFocus = document.activeElement;
      d.showModal();
      document.documentElement.classList.add("popup-open"); // stops the page behind from scrolling
    }
    h.$("#popup-close").focus();
    document.title = `${p.title} — ${h.t("sidebar.name")}`;
  }

  function close() {
    const d = dialog();
    if (d.open) d.close();
  }

  /* Moves to another project inside the popup and updates the address. */
  function go(id) {
    history.replaceState(null, "", location.pathname + location.search + "#" + id);
    open(id);
  }

  /* Runs once when the page loads: connects buttons and keys. */
  function setup() {
    const d = dialog();

    d.addEventListener("close", () => {
      document.documentElement.classList.remove("popup-open");
      document.title = h.t("page.title");
      // Remove the project id from the address so the page stays where it is.
      if (Site.projects.some(p => "#" + p.id === location.hash)) {
        history.replaceState(null, "", location.pathname + location.search);
      }
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
    });

    // Click on the dark area around the popup closes it.
    d.addEventListener("click", ev => { if (ev.target === d) close(); });

    // Left / right arrow keys move between projects.
    d.addEventListener("keydown", ev => {
      if (ev.key === "ArrowRight") go(h.$("#popup-next").dataset.go);
      if (ev.key === "ArrowLeft")  go(h.$("#popup-prev").dataset.go);
    });

    h.$("#popup-close").addEventListener("click", close);
    h.$("#popup-prev").addEventListener("click", ev => go(ev.currentTarget.dataset.go));
    h.$("#popup-next").addEventListener("click", ev => go(ev.currentTarget.dataset.go));
  }

  Site.popup = { open, close, setup, isOpen: () => dialog().open };
})();
