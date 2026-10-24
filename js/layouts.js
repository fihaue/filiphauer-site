/* =====================================================================
   LAYOUTS — one function per layout (A–G, plus P = presentation).
   ---------------------------------------------------------------------
   Each function receives a list of projects and returns HTML text.
   main.js decides which function to call and puts the result into
   <div id="work-view"> on the page.

   To tweak a layout: find its function below and edit the HTML
   inside the backticks. Styling for each layout is in
   css/layouts.css under the matching letter.
   ===================================================================== */

window.Site = window.Site || {};

(function () {
  const h = Site.helpers;
  const e = h.escape;

  /* Which projects appear in the main "Work" view for a layout.
     A–D: featured projects only.  E, F, G, P: featured + grid level. */
  function mainList(layoutKey) {
    const wide = ["e", "f", "g", "p"].includes(layoutKey);
    return Site.projects
      .filter(p => p.level === "featured" || (wide && p.level === "grid"))
      .filter(p => !(p.hideIn || []).includes(layoutKey))   // hideIn: ["p"] in content.js
      .sort(h.newestFirst);                       // newest first in every layout
  }

  /* Cover image that opens the project when clicked (same link as the title).
     Mouse only: the title next to it is the link for keyboard and screen readers.
     The link uses display: contents in CSS, so card layouts treat the image as before. */
  function coverLink(p) {
    return `<a class="cover-link" ${openHref(p)} tabindex="-1" aria-hidden="true">${h.img(h.coverImage(p), h.altText(p, "cover"), "cover")}</a>`;
  }

  /* Link that opens a project: popup link, or outside link for external items. */
  function openHref(p) {
    return p.external
      ? `href="${p.external}" target="_blank" rel="noopener"`
      : `href="#${p.id}" data-open="${p.id}"`;
  }

  /* -------------------------------------------------------------------
     A — Grid, expand in place (no popup)
     ------------------------------------------------------------------- */
  function layoutA(list) {
    return `<div class="grid-a">${list.map(p => `
      <article class="card-a" id="card-${p.id}">
        ${coverLink(p)}
        <div class="card-body">
          ${h.kicker(p)}
          <h3>${e(p.title)}</h3>
          <p class="meta">${e(p.meta)}</p>
          <p>${e(p.summary)}</p>
          ${h.tagPills(p)}
          <details id="details-${p.id}">
            <summary>${e(h.t("ui.readMore"))}</summary>
            <div class="full-text">${h.foldouts(p, "top")}${h.fullText(p)}${h.foldouts(p)}${h.videos(p)}${gallery(p)}</div>
          </details>
          ${h.linkRow(p)}
        </div>
      </article>`).join("")}</div>`;
  }

  /* -------------------------------------------------------------------
     B — Grid with popup cards (first card is wide)
     ------------------------------------------------------------------- */
  function layoutB(list, isFiltered) {
    return `<div class="grid-b">${list.map((p, i) => `
      <article class="card-b ${i === 0 && !isFiltered ? "wide" : ""}" id="card-${p.id}">
        ${coverLink(p)}
        <div class="card-body">
          ${h.kicker(p)}
          <h3><a ${openHref(p)}>${e(p.title)}</a></h3>
          <p class="meta">${e(p.meta)}</p>
          <p>${e(p.summary)}</p>
          ${h.tagPills(p)}
          <span class="open-hint">${e(h.t("ui.openProject"))}</span>
        </div>
      </article>`).join("")}</div>`;
  }

  /* -------------------------------------------------------------------
     C — Index list with hover preview
     ------------------------------------------------------------------- */
  function layoutC(list) {
    return `<div class="index-c">
      <div class="index-rows">${list.map(p => `
        <a class="index-row" id="card-${p.id}" ${openHref(p)} data-preview="${p.id}">
          <span class="year">${e(p.year)}</span>
          <span class="title">${e(p.title)}<small>${e(p.meta)}</small></span>
          <span class="type">${e(p.type)}</span>
        </a>`).join("")}
      </div>
      <aside class="index-preview" id="index-preview" aria-hidden="true"></aside>
    </div>`;
  }

  /* Fills the preview box on the right of layout C (called on hover/focus). */
  function showPreview(id) {
    const box = document.getElementById("index-preview");
    const p = h.findProject(id);
    if (!box || !p) return;
    box.innerHTML = `${h.img(h.coverImage(p), h.altText(p, "cover"), "cover")}${h.kicker(p)}<p>${e(p.summary)}</p>`;
  }

  /* -------------------------------------------------------------------
     D — Editorial rows, alternating sides
     ------------------------------------------------------------------- */
  function layoutD(list) {
    const count = String(list.length).padStart(2, "0");
    return `<div class="rows-d">${list.map((p, i) => `
      <article class="row-d" id="card-${p.id}">
        ${coverLink(p)}
        <div class="card-body">
          <span class="row-number">${String(i + 1).padStart(2, "0")} / ${count}</span>
          ${h.kicker(p)}
          <h3>${e(p.title)}</h3>
          <p class="meta">${e(p.meta)}</p>
          <p>${e(p.summary)}</p>
          ${h.tagPills(p)}
          <a class="button" ${openHref(p)}>${e(h.t("ui.openProject"))}</a>
        </div>
      </article>`).join("")}</div>`;
  }

  /* -------------------------------------------------------------------
     E — Full grid of all work (thumbnail, title, CATEGORY / org line)
     ------------------------------------------------------------------- */
  function thumbCard(p) {
    return `
      <a class="thumb-card" id="card-${p.id}" ${openHref(p)}>
        ${h.img(h.coverImage(p), h.altText(p, "cover"), "cover")}
        <span class="title">${e(p.title)}${p.external ? ' <span class="external" aria-label="opens another site">↗</span>' : ""}</span>
        ${h.categoryLine(p)}
        ${h.withLine(p)}
      </a>`;
  }

  function layoutE(list) {
    return `<div class="grid-e">${list.map(thumbCard).join("")}</div>`;
  }

  /* -------------------------------------------------------------------
     F — Full grid grouped by practice (no filter buttons)
     ------------------------------------------------------------------- */
  function layoutF(list) {
    const jump = Site.practices.map(s => {
      const n = list.filter(p => p.practice === s.id).length;
      return n ? `<a href="#${s.id}">${s.label}<sup>${n}</sup></a>` : "";
    }).join("");

    const sections = Site.practices.map(s => {
      const items = list.filter(p => p.practice === s.id);
      if (items.length === 0) return "";
      return `
        <section class="practice" id="${s.id}" aria-labelledby="practice-${s.id}">
          <header class="practice-head">
            <h3 id="practice-${s.id}">${s.label}<sup>${items.length}</sup></h3>
            <p>${s.blurb}</p>
          </header>
          <div class="grid-f">${items.map(thumbCard).join("")}</div>
        </section>`;
    }).join("");

    return `<nav class="practice-jump" aria-label="Practices">${jump}</nav>${sections}`;
  }

  /* -------------------------------------------------------------------
     G — Research first, critical games, then a route for game studios
     ------------------------------------------------------------------- */
  function highlightCard(p) {
    return `
      <article class="highlight" id="card-${p.id}">
        ${coverLink(p)}
        <div class="card-body">
          ${h.kicker(p)}
          <h4><a ${openHref(p)}>${e(p.title)}</a></h4>
          <p class="meta">${e(p.meta)}</p>
          ${h.withLine(p)}
          <p>${e(p.summary)}</p>
          ${h.tagPills(p)}
          <a class="button" ${openHref(p)}>${e(h.t("ui.openProject"))}</a>
        </div>
      </article>`;
  }

  function studioCard(entry) {
    const p = h.findProject(entry.project);
    return `
      <article class="studio-card" id="studio-${p.id}">
        ${coverLink(p)}
        <div class="card-body">
          <p class="kicker">${e(entry.role)}</p>
          <h4>${e(p.short || p.title)}</h4>
          <p class="meta">${e(entry.team)}<br>${e(entry.shipped)}</p>
          <ul class="did">${entry.did.map(d => `<li>${e(d)}</li>`).join("")}</ul>
          <div class="studio-actions">
            ${h.hasPopup(p) ? `<a class="button" href="#${p.id}" data-open="${p.id}">${e(h.t("ui.openProject"))}</a>` : ""}
            ${h.linkRow(p)}
          </div>
        </div>
      </article>`;
  }

  function layoutG(list) {
    const label = id => Site.practices.find(s => s.id === id);

    const st = Site.studio;
    const studioSection = `
      <section class="practice studio" id="studio" aria-labelledby="practice-studio">
        <header class="practice-head">
          <h3 id="practice-studio">${h.icon((Site.sectionIcons || {}).studio, "section-icon")}${e(h.t("sections.studio"))}</h3>
          <p>${e(st.intro)}</p>
          <p class="skills">${st.skills.map(s => `<span>${e(s)}</span>`).join("")}</p>
          ${st.cvLink ? `<p><a class="button" href="${st.cvLink}" target="_blank" rel="noopener">${e(h.t("ui.cvForStudios"))}</a></p>` : ""}
        </header>
        <div class="practice-body"><div class="studio-grid">${[...st.entries].sort((a, b) => h.newestFirst(h.findProject(a.project), h.findProject(b.project))).map(studioCard).join("")}</div></div>
      </section>`;

    // Sections in the order of Site.practiceOrderG ("studio" = the Game & UX design section).
    return Site.practiceOrderG.map(pid => {
      if (pid === "studio") return studioSection;
      const s = label(pid);
      const items = list.filter(p => p.practice === pid);
      let body;

      if (pid === "writing") {
        // Research is read, not browsed: thesis card + plain publication list.
        body = researchSection();
      } else if (pid === "collaborations") {
        // Every project with collaborators, from all sections, names first.
        body = collaborationList();
      } else {
        const big = Site.highlights.map(h.findProject).filter(p => p && items.includes(p)).sort(h.newestFirst);
        const rest = items.filter(p => !big.includes(p))
                          .sort(h.newestFirst);
        body = `
          ${big.length ? `<div class="highlights">${big.map(highlightCard).join("")}</div>` : ""}
          ${rest.length ? `<div class="grid-f">${rest.map(thumbCard).join("")}</div>` : ""}`;
      }

      const count = pid === "writing"        ? Site.projects.filter(p => p.practice === "writing").length
                  : pid === "collaborations" ? Site.projects.filter(p => p.with).length
                  : items.length;
      return `
        <section class="practice" id="${pid}" aria-labelledby="practice-${pid}">
          <header class="practice-head">
            <h3 id="practice-${pid}">${h.icon((Site.sectionIcons || {})[pid], "section-icon")}${s.label}<sup>${count}</sup></h3>
            <p>${s.blurb}</p>
          </header>
          <div class="practice-body">${body}</div>
        </section>`;
    }).join("");
  }

  /* Collaborations list (layout G): year / project / collaborators.
     Links open the popup, the outside page, or the archive entry. */
  function collaborationList() {
    const items = Site.projects.filter(p => p.with)
                               .sort(h.newestFirst);
    return `<div class="collab-list">${items.map(p => {
      const href = p.external ? `href="${p.external}" target="_blank" rel="noopener"`
                 : h.hasPopup(p) ? `href="#${p.id}" data-open="${p.id}"`
                 : `href="#archive-${p.id}"`;
      return `
        <a class="collab-row" ${href}>
          <span class="year">${e(p.year)}</span>
          <span class="title">${e(p.title)}<small>${e(p.type)}</small></span>
          <span class="names">${e(p.with)}</span>
        </a>`;
    }).join("")}</div>`;
  }

  /* Gallery images for a project (used in layout A and in the popup). */
  function gallery(p) {
    if (!p.gallery) return "";
    let html = "";
    for (let n = 1; n <= p.gallery; n++) html += h.zoomImg(h.galleryImage(p, n), h.altText(p, "gallery", n), "gallery-img");
    return `<div class="gallery${p.galleryUncropped ? " uncropped" : ""}">${html}</div>`;
  }

  /* -------------------------------------------------------------------
     Archive list and Research section (shown under the main view)
     ------------------------------------------------------------------- */
  function archiveList(layoutKey) {
    // A–D also list grid-level works here (except writing/curation, which have their own places).
    const wide = layoutKey === "e" || layoutKey === "f" || layoutKey === "g";
    const items = Site.projects.filter(p =>
      p.level === "archive" ||
      (!wide && p.level === "grid" && p.practice !== "writing" && p.practice !== "curation"));
    items.sort(h.newestFirst);

    // Every archive entry has one image: images/<category>_<id>_cover_1.jpg (small in the row, larger when opened).
    return items.map(p => `
      <details class="archive-item" id="archive-${p.id}">
        <summary>
          <span class="year">${e(p.year)}</span>
          <span class="title">${h.img(h.coverImage(p), "", "archive-thumb")}${e(p.title)}</span>
          <span class="type">${e(p.type)}</span>
        </summary>
        <div class="archive-body">
          ${h.zoomImg(h.coverImage(p), h.altText(p, "cover"), "archive-img")}
          <div class="archive-text">
            ${p.summary ? `<p>${e(p.summary)}</p>` : ""}
            ${h.hasPopup(p) ? `<p><a href="#${p.id}" data-open="${p.id}">${e(h.t("ui.openProject"))}</a></p>` : ""}
            ${h.linkRow(p)}
          </div>
        </div>
      </details>`).join("");
  }

  function researchSection() {
    const thesis = h.findProject("thesis");
    const texts = Site.projects.filter(p => p.practice === "writing" && p.id !== "thesis");
    return `
      <div class="research">
        <article class="thesis-card" id="card-thesis">
          ${h.kicker(thesis)}
          <h3>${e(thesis.title)}</h3>
          <p class="meta">${e(thesis.meta)}</p>
          <p>${e(thesis.summary)}</p>
          <p><a class="button" href="#thesis" data-open="thesis">${e(h.t("ui.readAbstract"))}</a></p>
          ${h.linkRow(thesis)}
        </article>
        <ul class="publications">${texts.map(p => `
          <li><span class="year">${e(p.year)}</span>
              <span><a href="${p.external}" target="_blank" rel="noopener">${e(p.title)}</a><br><small>${e(p.type)} / ${e(p.org)}</small></span></li>`).join("")}
        </ul>
      </div>`;
  }

  /* -------------------------------------------------------------------
     P — Presentation: one full-screen slide per project, newest first.
     For artist talks: scroll (or press ↓ / Space / Page Down) to move
     one slide at a time. Archive and About are hidden (css/layouts.css).
     ------------------------------------------------------------------- */
  function layoutP(list) {
    return list.map((p, i) => `
      <article class="slide" id="card-${p.id}">
        ${coverLink(p)}
        <div class="slide-text">
          ${h.kicker(p)}
          <h3><a ${openHref(p)}>${e(p.title)}</a></h3>
          ${p.meta ? `<p class="meta">${e(p.meta)}</p>` : ""}
          ${h.withLine(p)}
          ${p.summary ? `<p class="slide-summary">${e(p.summary)}</p>` : ""}
          <a class="button" ${openHref(p)}>${e(h.t("ui.openProject"))}</a>
          <p class="slide-count">${i + 1} / ${list.length}</p>
        </div>
      </article>`).join("");
  }

  /* Everything other scripts may call. */
  Site.layouts = {
    a: layoutA, b: layoutB, c: layoutC, d: layoutD, e: layoutE, f: layoutF, g: layoutG, p: layoutP,
    mainList, showPreview, gallery, archiveList, researchSection
  };
})();
