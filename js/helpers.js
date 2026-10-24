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
     All images live in ONE folder, named  category_project_type_number.jpg:
       images/games_lithium_cover_1.jpg, images/games_lithium_hero_1.jpg,
       images/games_lithium_gallery_1.jpg …
     Photos are JPG. An image that needs transparency can be PNG instead
     (same name, .png): if the .jpg is not there, img() tries the .png.
     category = the project's `practice` (games, writing, installations,
     curation, studio), or "archive" for projects without one.
     So if you move a project to another practice, rename its images too. */

  imageName(p, type, n) { return `images/${p.practice || "archive"}_${p.id}_${type}_${n}.jpg`; },
  /* Screen-reader description of an image (alt text), from content.js:
       alts.cover / alts.hero / alts.gallery[n-1]  for one image, else
       imageAlt  for all images of the project, else the title. */
  altText(p, kind, n = 1) {
    const one = p.alts && (kind === "gallery" ? (p.alts.gallery || [])[n - 1] : p.alts[kind]);
    if (one) return one;
    const base = p.imageAlt || p.title;
    return kind === "gallery" ? `${base} (image ${n} of ${p.gallery})` : base;
  },
  coverImage(p)         { return Site.helpers.imageName(p, "cover", 1); },
  heroImage(p)          { return Site.helpers.imageName(p, "hero", 1); },
  galleryImage(p, n)    { return Site.helpers.imageName(p, "gallery", n); },

  /* <img> tag with lazy loading.
     If the .jpg is missing it tries the same name as .png (images with transparency);
     if that is missing too, a striped box shows instead. */
  img(src, alt, className = "") {
    const e = Site.helpers.escape;
    return `<img class="${className}" src="${src}" alt="${e(alt)}" loading="lazy" decoding="async"
                 onerror="Site.helpers.imgFailed(this, '${className}')">`;
  },

  /* Called when an image fails to load: try .png once, then show the striped box. */
  imgFailed(el, className) {
    if (/\.jpg$/i.test(el.getAttribute("src"))) {
      el.src = el.getAttribute("src").replace(/\.jpg$/i, ".png");
      return;
    }
    el.replaceWith(Object.assign(document.createElement("div"), { className: "img-missing " + className }));
  },

  /* A small icon from icons/ (white SVG), shown as a normal image.
     Decorative: alt="" so screen readers skip it. */
  icon(src, className = "") {
    return src ? `<img class="icon ${className}" src="${Site.helpers.escape(src)}" alt="" aria-hidden="true">` : "";
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

  /* Foldable sections in the popup (like the CV blocks), from the project's
     foldouts in content.js. foldouts(p, "top") = the ones marked  top: true
     (shown above the text); foldouts(p) = all others (shown below it).
     foldouts: [{ title: "Abstract", text: ["paragraph", …] }] in content.js.
     Closed until clicked; add  open: true  to show one open. */
  foldouts(p, where = "below") {
    const e = Site.helpers.escape;
    const list = (p.foldouts || []).filter(f => (where === "top") === !!f.top);
    return list.map(f => `
      <details class="foldout" ${f.open ? "open" : ""}>
        <summary>${e(f.title)}</summary>
        ${(f.text || []).map(t => `<p>${Site.helpers.rich(t)}</p>`).join("")}
      </details>`).join("")
      // textAfter: paragraphs shown below the lower foldouts (e.g. "To request the PDF …")
      + (where === "top" ? "" : (p.textAfter || []).map(t => `<p class="text-after">${Site.helpers.rich(t)}</p>`).join(""));
  },

  /* Videos, two kinds:
       { label, embed: "https://…" }       YouTube / Vimeo: a play button until clicked,
                                           then the outside player loads (faster page).
                                           The button shows a still from this site:
                                           images/<category>_<id>_poster_<n>.jpg (n = the
                                           video's place in the list), or poster: "images/….jpg".
                                           No poster file → plain dark box.
       { label, embed: "https://w.soundcloud.com/player/?url=…", audio: true, height: 166 }
                                           same, but a short bar for a sound player;
                                           height = the player's own height in px
                                           (SoundCloud 166, Bandcamp 120). Can have a
                                           poster too (e.g. the album cover), same naming.
       { label, file: "videos/….mp4",      a video file stored on this site, played by the
         poster: "images/….jpg" }          browser's own player. poster = optional still image.
                                           preload="none": nothing downloads until play. */
  videos(p) {
    const e = Site.helpers.escape;
    return (p.videos || []).map((v, i) => {
      if (v.file) return `<video class="video-file" controls playsinline preload="none" src="${e(v.file)}"${v.poster ? ` poster="${e(v.poster)}"` : ""} aria-label="${e(v.label)}"></video>`;
      const poster = v.poster || Site.helpers.imageName(p, "poster", i + 1);
      return `<button class="video${v.audio ? " audio" : ""}" type="button" data-embed="${e(v.embed)}"${v.height ? ` style="height: ${Number(v.height)}px"` : ""} aria-label="Play ${v.audio ? "sound" : "video"}: ${e(v.label)}">
         ${poster ? `<img class="video-poster" src="${e(poster)}" alt="" loading="lazy" decoding="async" onerror="this.remove()">` : ""}
         <span>${e(v.label)}</span></button>`;
    }).join("");
  }
};
