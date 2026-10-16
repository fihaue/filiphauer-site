/* =====================================================================
   HELPERS — small reusable functions used by the other scripts.
   ---------------------------------------------------------------------
   The page is built by turning project data into HTML text
   (template strings in `backticks`, with ${value} inserted).
   ===================================================================== */

window.Site = window.Site || {};

Site.helpers = {

  /* Shortcut for document.querySelector — finds one element. */
  $(selector) {
    return document.querySelector(selector);
  },

  /* Makes text safe to put inside HTML (so "<" or "&" can't break the page). */
  escape(text) {
    return String(text ?? "").replace(/[&<>"]/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  },

  /* Reads a text from content.js by its path, e.g. t("ui.readMore").
     If a text is missing, shows the path in [brackets] so it's easy to spot. */
  t(path) {
    const value = path.split(".").reduce((obj, key) => (obj == null ? obj : obj[key]), Site.texts);
    return value == null ? `[${path}]` : value;
  },

  /* Turns a text from content.js into safe HTML.
     Only two formats are understood:  **bold**  and  [link text](address).
     Everything else is shown as plain text, so a text can never inject code. */
  rich(text) {
    let html = Site.helpers.escape(text);
    html = html.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, url) => {
      const raw = url.replace(/&amp;/g, "&");
      if (/^(https?:\/\/|#|mailto:)/.test(raw) === false) return label;   // unknown address type → just the text
      const outside = /^https?:\/\//.test(raw);
      return `<a href="${url}"${outside ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
    });
    return html;
  },

  /* Finds a project by its id, or returns undefined. */
  findProject(id) {
    return Site.projects.find(p => p.id === id);
  },

  /* Year used for sorting, from the text in `year`:
       "2024"    → 2024
       "2023–24" → 2024   (a span counts by its end year)
       "2022/25" → 2022   (a re-edition counts by its first year)
       "2025–"   → 2025   (ongoing counts by its start year)                         */
  sortYear(p) {
    const y = String(p.year || "");
    const nums = y.match(/\d+/g) || ["0"];
    if (y.includes("/") || /[–-]\s*$/.test(y)) return parseInt(nums[0], 10);
    let last = nums[nums.length - 1];
    if (last.length === 2) last = nums[0].slice(0, 2) + last;  // "24" → "2024"
    return parseInt(last, 10);
  },

  /* Comparator: newest first; equal years keep their order in content.js.
     Projects with  pinned: true  always come first. */
  newestFirst(a, b) {
    const pin = Number(!!b.pinned) - Number(!!a.pinned);
    return pin || Site.helpers.sortYear(b) - Site.helpers.sortYear(a);
  },

  /* True if the project opens a popup (has its own text, not only an outside link). */
  hasPopup(project) {
    return !project.external && Array.isArray(project.text) && project.text.length > 0;
  },

  /* ---------- image paths: every layout uses these same files ----------
     All images live in ONE folder, named  category_project_type_number.png:
       images/games_lithium_cover_1.png, images/games_lithium_hero_1.png,
       images/games_lithium_gallery_1.png …
     category = the project's `practice` (games, writing, installations,
     curation, studio), or "archive" for projects without one.
     So if you move a project to another practice, rename its images too. */

  imageName(p, type, n) { return `images/${p.practice || "archive"}_${p.id}_${type}_${n}.png`; },
  coverImage(p)         { return Site.helpers.imageName(p, "cover", 1); },
  heroImage(p)          { return Site.helpers.imageName(p, "hero", 1); },
  galleryImage(p, n)    { return Site.helpers.imageName(p, "gallery", n); },

  /* <img> tag with lazy loading. If the file is missing, a striped box shows instead. */
  img(src, alt, className = "") {
    const e = Site.helpers.escape;
    return `<img class="${className}" src="${src}" alt="${e(alt)}" loading="lazy" decoding="async"
                 onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'img-missing ${className}'}))">`;
  },

  /* Same image, wrapped in a button: clicking it opens it full screen (js/lightbox.js). */
  zoomImg(src, alt, className = "") {
    const e = Site.helpers.escape;
    return `<button type="button" class="zoom" aria-label="${e(Site.helpers.t("ui.showFullScreen"))}: ${e(alt)}">${Site.helpers.img(src, alt, className)}</button>`;
  },

  /* ---------- small pieces of HTML shared by several layouts ---------- */

  /* "ECOGAME · 2025 · NEW" line above titles. */
  kicker(p) {
    const e = Site.helpers.escape;
    return `<p class="kicker">${e(p.type)} · ${e(p.year)}${p.isNew ? ` · <span class="badge">${e(Site.helpers.t("ui.newBadge"))}</span>` : ""}</p>`;
  },

  /* "GAME / Blue Pulsar kolektiv, 2025" line under thumbnails (E, F). */
  categoryLine(p) {
    const e = Site.helpers.escape;
    return `<span class="cat"><b>${e(p.category)}</b> / ${e(p.org)}, ${e(p.year)}</span>`;
  },

  /* "with Philipp Kolychev" credit line for collaborative projects (empty if none). */
  withLine(p) {
    return p.with ? `<span class="with">${Site.helpers.escape(Site.helpers.t("ui.with"))} ${Site.helpers.escape(p.with)}</span>` : "";
  },

  /* Clickable tag pills. Each links to #tag-id. */
  tagPills(p) {
    return `<span class="tag-pills">${(p.tags || [])
      .map(t => `<a href="#${t}">${Site.tags[t] || t}</a>`).join("")}</span>`;
  },

  /* Row of links, each opens in a new tab.
     A PDF stored on this site (e.g. "files/….pdf") gets "download",
     so clicking it saves the file instead of only opening it. */
  linkRow(p) {
    const e = Site.helpers.escape;
    if (!p.links || p.links.length === 0) return "";
    const isOwnPdf = url => /\.pdf$/i.test(url) && !/^https?:/i.test(url);
    return `<p class="link-row">${p.links
      .map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener"${isOwnPdf(url) ? " download" : ""}>${e(label)}</a>`).join("")}</p>`;
  },

  /* Turns the project's text array into paragraphs, headings, quotes, code. */
  fullText(p) {
    const e = Site.helpers.escape;
    return (p.text || []).map(t => {
      if (t.startsWith("## ")) return `<h4>${e(t.slice(3))}</h4>`;
      if (t.startsWith("> "))  return `<blockquote>${e(t.slice(2))}</blockquote>`;
      if (t.startsWith("``"))  return `<pre>${e(t.slice(2))}</pre>`;
      return `<p>${Site.helpers.rich(t)}</p>`;
    }).join("");
  },

  /* Video placeholders: the real player loads only when clicked (faster page). */
  videos(p) {
    const e = Site.helpers.escape;
    return (p.videos || []).map(v =>
      `<button class="video" type="button" data-embed="${e(v.embed)}" aria-label="Play video: ${e(v.label)}">
         <span>${e(v.label)}</span></button>`).join("");
  }
};
