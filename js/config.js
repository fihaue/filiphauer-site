/* =====================================================================
   SITE SETTINGS
   ---------------------------------------------------------------------
   Global switches for the whole site. Think of this as the
   "settings asset": change a value here, save, and every page uses it.
   ===================================================================== */

window.Site = window.Site || {};

Site.config = {

  // Which layout loads when no ?layout= is in the address.
  // "a" … "g" — see the list below. Other layouts stay reachable
  // with ?layout=x in the address (e.g. ?layout=g).
  defaultLayout: "f",

  // Shows the A–G switcher bar at the top of the page.
  // true while testing layouts; false = visitors don't see it.
  showLayoutSwitcher: false,

  // Used for the "Copy link" button in project popups.
  siteUrl: "https://new.filiphauer.com",

  // Names and short descriptions shown in the switcher bar.
  layouts: {
    a: { name: "Grid · expand in place",    note: "Cards in a grid; “Read more” opens the full text inside the card." },
    b: { name: "Grid · popup cards",        note: "Same grid; each card opens a popup with text, videos and gallery." },
    c: { name: "Index list · popup",        note: "A text catalogue (year, title, type). Hover previews, click opens the popup." },
    d: { name: "Editorial rows · popup",    note: "One large image row per project, alternating sides." },
    e: { name: "Full grid · popup",         note: "Dense image grid of all work with a CATEGORY / Organisation line. Tag buttons filter it." },
    f: { name: "Grid by practice · popup",  note: "The full grid grouped into practice sections, without filter buttons." },
    g: { name: "By practice · Game & UX route", note: "Critical games, Research & writing, Art and installation, Game & UX design (#studio), Curation, Collaborations." }
  },

  // Image sizes, used by the README and by the placeholder generator.
  // Every layout reads the SAME files, so one set of images serves all.
  imageSizes: {
    cover:    "1600 × 1200 (4:3) — thumbnail in every layout",
    hero:     "1920 × 1080 (16:9) — top of the project popup",
    gallery:  "1600 × 1200 (4:3) — gallery inside the popup",
    siteHero: "1920 × 1080 (16:9) — big image under the statement",
    portrait: "1200 × 900 (4:3) — About section",
    ogImage:  "1200 × 630 — preview when the link is shared"
  }
};
