/* =====================================================================
   MAIN — starts the page and reacts to the web address.
   ---------------------------------------------------------------------
   Like Start() + Update() in Unity:
     start()  runs once when the page has loaded,
     route()  runs every time the part after "#" in the address changes.

   Addresses the site understands:
     ?layout=f             choose layout A–F   (new.filiphauer.com/?layout=b)
     #lithium              open a project       (any project id)
     #games, #writing …    filter by tag (A–E) or jump to a section (F, G)
     #studio               layout G: the "Game & UX design" section
     #work, #about …       normal jump to a section on the page
   ===================================================================== */

window.Site = window.Site || {};

(function () {
  const h = Site.helpers;

  const state = {
    layout: Site.config.defaultLayout, // current layout letter
    tag: "all"                          // current tag filter
  };

  /* ----------------------------------------------------------- page texts */

  /* Fills every text on the page from content.js (Site.texts). Runs once at start. */
  function renderPageTexts() {
    const T = Site.texts;

    // Browser tab + search description
    document.title = h.t("page.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", h.t("page.description"));

    // Simple slots: <element data-text="path.in.content"> and aria labels (data-label)
    document.querySelectorAll("[data-text]").forEach(el => { el.textContent = h.t(el.dataset.text); });
    document.querySelectorAll("[data-label]").forEach(el => { el.setAttribute("aria-label", h.t(el.dataset.label)); });

    // News line (hidden when empty)
    const news = h.$("#news");
    news.hidden = !T.news || !T.news.text;
    if (!news.hidden) { h.$("#news-text").textContent = T.news.text; news.href = T.news.link || "#top"; }

    // Roles line: "Researcher / Critical game designer / …"
    h.$("#roles").innerHTML = (T.roles || []).map(h.escape).join(" <i>/</i> ");

    // Statement and bio paragraphs (may contain **bold** and [links](…))
    h.$("#statement").innerHTML = (T.statement || []).map(p => `<p>${h.rich(p)}</p>`).join("");
    h.$("#bio").insertAdjacentHTML("beforeend", (T.bio || []).map(p => `<p>${h.rich(p)}</p>`).join(""));
    const heroImage = h.$("#intro-image");   // the big image under the statement (may be removed)
    if (heroImage) heroImage.alt = T.heroImageAlt || "";
    h.$("#portrait").alt = T.portraitAlt || "";

    // CV: one folding block per entry in Site.texts.cv.
    // hideIn: ["f"] adds class "hide-in-f", which the CSS hides in layout F.
    h.$("#cv").innerHTML = (T.cv || []).map(block => `
      <details class="${(block.hideIn || []).map(k => "hide-in-" + k).join(" ")}" ${block.open ? "open" : ""}>
        <summary>${h.escape(block.title)}</summary>
        <ul>${(block.entries || []).map(([years, text, kind]) => `
          <li><span>${h.escape(years)}</span><span${kind === "sub" ? ' class="sub"' : ""}>${h.rich(text)}</span></li>`).join("")}
        </ul>
      </details>`).join("");

    // Contact
    const email = (T.contact && T.contact.email) || "";
    h.$("#email").textContent = email;
    h.$("#email").href = "mailto:" + email;
    h.$("#contact-links").innerHTML = ((T.contact && T.contact.links) || [])
      .map(([label, url]) => `<a href="${h.escape(url)}" target="_blank" rel="noopener">${h.escape(label)}</a>`).join("");
  }

  /* ----------------------------------------------------------- drawing */

  /* Draws the Work section, tag buttons, archive and research. */
  function render() {
    const key = state.layout;
    document.body.dataset.layout = key;      // CSS uses this, e.g. hides Research in E/F
    if (key === "f" || key === "g") state.tag = "all";   // F and G have no filter buttons
    renderPathways();

    const all = Site.layouts.mainList(key);
    const list = state.tag === "all" ? all : all.filter(p => (p.tags || []).includes(state.tag));

    renderTagButtons(all);
    h.$("#work-view").innerHTML = list.length
      ? Site.layouts[key](list, state.tag !== "all")
      : `<p class="empty">${h.escape(h.t("ui.noProjects"))}</p>`;

    if (key === "c" && list.length) Site.layouts.showPreview(list[0].id);

    h.$("#archive-list").innerHTML = Site.layouts.archiveList(key);
    h.$("#research-view").innerHTML = Site.layouts.researchSection();

    renderSwitcher();
  }

  /* Layout G: three entry links under the statement (Research / Critical games / Studios). */
  function renderPathways() {
    const nav = h.$("#pathways");
    nav.hidden = state.layout !== "g";
    if (nav.hidden) return;
    nav.innerHTML = Site.pathways.map(p => `
      <a href="#${p.target}"><b>${p.label} →</b><span>${p.note}</span></a>`).join("");
  }

  /* Tag filter buttons above the Work view (hidden in layouts F and G). */
  function renderTagButtons(all) {
    const nav = h.$("#tag-filter");
    nav.hidden = state.layout === "f" || state.layout === "g";
    const count = t => t === "all" ? all.length : all.filter(p => (p.tags || []).includes(t)).length;
    const tags = ["all", ...Object.keys(Site.tags)].filter(t => count(t) > 0);
    nav.innerHTML = tags.map(t => `
      <a class="tag-button" href="#${t === "all" ? "work" : t}" data-tag="${t}" ${state.tag === t ? 'aria-current="true"' : ""}>
        ${h.escape(t === "all" ? h.t("ui.all") : Site.tags[t])}<span>${count(t)}</span></a>`).join("");
  }

  /* Layout switcher bar (only while testing — see config.js). */
  function renderSwitcher() {
    const bar = h.$("#layout-switcher");
    bar.hidden = !Site.config.showLayoutSwitcher;
    if (bar.hidden) return;
    const L = Site.config.layouts;
    bar.innerHTML = `
      <div class="switcher-inner">
        <span class="switcher-label">Layout</span>
        ${Object.keys(L).map(k => `
          <a class="switcher-option" href="?layout=${k}" ${k === state.layout ? 'aria-current="true"' : ""}>
            <b>${k.toUpperCase()}</b> ${L[k].name}</a>`).join("")}
        <p class="switcher-note">${L[state.layout].note}</p>
      </div>`;
  }

  /* ----------------------------------------------------------- address */

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));

    // A project id → open its popup (or expand it in layout A).
    const project = h.findProject(id);
    if (project && h.hasPopup(project)) {
      if (state.layout === "a" && project.level === "featured") {
        Site.popup.close();
        const details = document.getElementById("details-" + id);
        if (!details) { state.tag = "all"; render(); }
        document.getElementById("details-" + id).open = true;
        document.getElementById("card-" + id).scrollIntoView({ block: "start" });
      } else {
        const order = [...document.querySelectorAll("#work-view [id^='card-']")].map(el => el.id.slice(5));
        Site.popup.open(id, order);
      }
      return;
    }

    // A practice or tag id.
    const isPractice = Site.practices.some(s => s.id === id) || id === "studio";
    if ((state.layout === "f" || state.layout === "g") && isPractice && document.getElementById(id)) {
      Site.popup.close();
      document.getElementById(id)?.scrollIntoView({ block: "start" });
      return;
    }
    if (Site.tags[id]) {
      Site.popup.close();
      state.tag = id;
      render();
      h.$("#work").scrollIntoView({ block: "start" });
      return;
    }
    // An archive entry (#archive-…): open it so its text is visible.
    const target = document.getElementById(id);
    if (target && target.tagName === "DETAILS") target.open = true;

    if (id === "work" && state.tag !== "all") { state.tag = "all"; render(); }
    Site.popup.close();
  }

  /* ----------------------------------------------------------- clicks */

  function setupClicks() {
    // Videos: replace the play button with the real player when clicked.
    document.addEventListener("click", ev => {
      const btn = ev.target.closest(".video[data-embed]");
      if (!btn) return;
      const frame = document.createElement("iframe");
      frame.src = btn.dataset.embed + (btn.dataset.embed.includes("?") ? "&" : "?") + "autoplay=1";
      frame.allow = "autoplay; fullscreen; picture-in-picture";
      frame.allowFullscreen = true;
      frame.title = btn.getAttribute("aria-label");
      const wrap = document.createElement("div");
      wrap.className = "video playing";
      wrap.appendChild(frame);
      btn.replaceWith(wrap);
    });

    // Clicking the same project link twice: the address doesn't change, so open it directly.
    document.addEventListener("click", ev => {
      const a = ev.target.closest("a[data-open]");
      if (a && location.hash === "#" + a.dataset.open) { ev.preventDefault(); route(); }
    });

    // Layout C: hovering or focusing a row shows its preview.
    const preview = ev => {
      const row = ev.target.closest("[data-preview]");
      if (row) Site.layouts.showPreview(row.dataset.preview);
    };
    document.addEventListener("mouseover", preview);
    document.addEventListener("focusin", preview);
  }

  /* Small message at the bottom of the screen. */
  Site.toast = function (text) {
    const t = h.$("#toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(Site.toast.timer);
    Site.toast.timer = setTimeout(() => t.classList.remove("show"), 2200);
  };

  /* Highlights the current section in the sidebar while scrolling. */
  function setupNavHighlight() {
    const links = [...document.querySelectorAll(".sidebar nav a")];
    const observer = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }), { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) observer.observe(s); });
  }

  /* ----------------------------------------------------------- start */

  function start() {
    // content.js failed to load (a typing mistake) → the red message explains; stop here.
    if (!Site.texts || !Site.projects) {
      const box = h.$("#content-error");
      if (box.hidden) { box.hidden = false; box.textContent = "content.js could not be loaded. Check the file for a typing mistake."; }
      return;
    }
    renderPageTexts();

    const fromAddress = new URLSearchParams(location.search).get("layout");
    if (fromAddress && Site.config.layouts[fromAddress]) state.layout = fromAddress;

    render();
    Site.popup.setup();
    setupClicks();
    setupNavHighlight();
    window.addEventListener("hashchange", route);
    route();
  }

  document.addEventListener("DOMContentLoaded", start);
})();
