/* =====================================================================
   CONTENT.JS — ALL TEXTS OF THE WEBSITE, IN ONE PLACE
   =====================================================================

   Everything a visitor reads comes from this file: the statement,
   section titles, buttons, every project, the bio, the full CV and
   the contact block. Edit here, save (Commit on GitHub), and the site
   updates within a minute or two. You never need to touch index.html
   or the scripts in js/ to change words.

   WHAT'S IN THIS FILE (search for the capital words to jump):
     1. PAGE TEXTS     statement, headline, sidebar, section titles, buttons
     2. ABOUT & CV     bio, CV blocks, contact, footer
     3. TAGS & SECTIONS  tag names, practice sections, entry links, highlights
     4. GAME & UX      the studio section
     5. PROJECTS       every work, with texts, links, videos, images

   HOW TO WRITE TEXTS
     • Every text sits between "double quotes". To use a double quote
       inside a text, use typographic quotes “like this” instead.
     • Every entry in a list ends with a comma — except it may also be
       there after the last one; that's fine.
     • Formatting you can use inside any text:
         **bold words**                    → bold
         [link text](https://example.com)  → a link (opens in a new tab)
         [link text](#lithium)             → a link to a project / section
       Nothing else is interpreted, so a text can never break the page
       or run code.
     • Lines starting with  //  are notes for you; the site ignores them.

   IF SOMETHING GOES WRONG
     A missing comma or quote stops the file from loading. The page then
     shows a red message with the line number to check, and GitHub sends
     you an email (see the "Check content" action in the repository).
     Fix that line and save again.
   ===================================================================== */

window.Site = window.Site || {};


/* =====================================================================
   1. PAGE TEXTS
   ===================================================================== */

Site.texts = {

  // Browser tab title and the description search engines show.
  page: {
    title: "Filip Hauer — game designer, artist and researcher",
    description: "Filip Hauer is an intermedia artist, game designer and researcher currently based in Copenhagen. Critical and speculative games about work, game exchange and shared futures."
  },

  // Short news line above the statement. Set text to "" to hide it.
  news: {
    text: "Andre Miri Cipa launches 22 October 2026 on Steam",
    link: "#andre-miri-cipa"
  },

  // The green line above the headline (shown with " / " between items).
  roles: ["Researcher", "Critical game designer", "Intermedia artist"],

  headline: "Filip Hauer is an intermedia artist, game designer and researcher currently based in Copenhagen. Critical and speculative games about work, game exchange and shared futures.",

  // Statement under the headline. One text = one paragraph.
  statement: [
    "Filip explores the speculative potential of digital games. His projects address game exchange, ideology, performativity and labour through critical, speculative and alienated game art. Working within game studies and artistic research, with a focus on critical play and player agency in fictional economies, Filip seeks to question stereotypical communication practices."
  ],

  // Description of the big image under the statement (for screen readers).
  heroImageAlt: "Workers Out of Office, city overview",

  // Left sidebar. Some links only show in certain layouts.
  sidebar: {
    name: "Filip Hauer",
    place: "Copenhagen/Prague",
    work: "Work",
    research: "Research",
    games: "Critical games",
    writing: "Research",
    installations: "Art",
    studio: "Game & UX design",
    archive: "Archive",
    about: "About & CV",
    contact: "Contact"
  },

  // Section headings.
  sections: {
    work: "Work",
    research: "Research & writing",
    archive: "Archive",
    about: "About & CV",
    contact: "Contact",
    studio: "Game & UX design"
  },

  // Small interface words: buttons, labels.
  ui: {
    skipLink: "Skip to work",
    all: "All",
    noProjects: "No projects with this tag.",
    readMore: "Read more",
    openProject: "Open project",
    readAbstract: "Read the abstract",
    copyLink: "Copy link",
    linkCopied: "Link copied",
    close: "Close",
    previous: "Previous",
    next: "Next",
    newBadge: "new",
    with: "with",
    cvForStudios: "CV for studios (PDF)"
  },


/* =====================================================================
   2. ABOUT & CV
   ===================================================================== */

  portraitAlt: "Filip Hauer",

  // Bio next to the CV. One text = one paragraph.
  bio: [
    "Filip Hauer is an intermedia artist, game designer and researcher working in game studies and on the critical possibilities of play in art and mainstream culture.",
    "In his dissertation, defended at the Academy of Fine Arts in Prague, Filip explored the links between game worlds, the future of work and player agency. From 2018 to 2025 he worked at Bohemia Interactive, most recently as a UI/UX designer on Arma Reforger, and co-founded Blue Pulsar Games, which released 11th Dream on Steam. Together with Blue Pulsar kolektiv he made Lithium, released on Steam in 2025. Following his PhD, in 2025–26 he was the lead game designer and researcher on Andre Miri Cipa at the Faculty of Fine Arts, Brno University of Technology."
  ],

  // CV blocks, in display order. Each block folds open/closed on the page.
  //   title   heading of the block
  //   open    true = shown open when the page loads
  //   entries [ "years", "text" ]          normal line
  //           [ "years", "text", "sub" ]   indented line (a part of the line above,
  //                                         e.g. a studio or study stay within a degree)
  cv: [
    {
      title: "Education & study stays",
      open: true,
      entries: [
        ["2020–25", "**PhD**, Academy of Fine Arts in Prague, Studio of New Media I. Dissertation: [Digital Games and Allegorithmic Work: The Politics of Exchange, Alienation and Performative Ideology](#thesis). Supervisor: Tomáš Svoboda; consultant: Vjera Borozan. Defended in May 2025."],
        ["2022",    "**Research internship**, [CoFUTURES](https://cofutures.org/), University of Oslo, Norway (May 2022)"],
        ["2012–18", "**MgA**, Academy of Fine Arts in Prague"],
        ["2016–18", "School of Tomáš Vaněk, Academy of Fine Arts in Prague", "sub"],
        ["2016",    "**Study stay**, In Situ3, Royal Academy of Fine Arts Antwerp, Belgium", "sub"],
        ["2015",    "School of Dušan Záhoranský and Pavla Sceránková, Academy of Fine Arts in Prague", "sub"],
        ["2012–15", "School of Jiří Příhoda, Academy of Fine Arts in Prague", "sub"],
        ["2010–12", "Institute of Art and Design, Pilsen — Multimedia Design"]
        // TODO: add any other study stays, exchanges or residencies here
      ]
    },
    {
      title: "Games",
      entries: [
        ["2026", "Andre Miri Cipa — iOS, Android, Windows, macOS"],
        ["2025", "Lithium — Steam (Blue Pulsar kolektiv)"],
        ["2024", "Workers Out of Office: London DLC"],
        ["2023", "Workers Out of Office: Dreaming About Work"],
        ["2022", "For How Many Are Your Futures? — print & play"],
        ["2021", "Dreaming About Work 0.9: For Loop Contingency — itch.io"],
        ["2021", "11th Dream — Steam (Blue Pulsar Games)"],
        ["2018", "Perfect Strike: After Vita Activa — itch.io"]
      ]
    },
    {
      title: "Positions",
      entries: [
        ["2025–26", "Lead game designer & researcher, Andre Miri Cipa (SEGROMA), [Faculty of Fine Arts, Brno University of Technology](https://www.favu.vut.cz/)"],
        ["2021–25", "UI/UX designer, Bohemia Interactive — Arma Reforger (UI/UX design system and design manual)"],
        ["2018–21", "Junior graphic designer and artist, Bohemia Interactive"],
        ["2018–25", "Co-founder & game designer, Blue Pulsar Games"],
        ["2017–19", "Co-founder & curator, [IDEAL Prostor](https://www.facebook.com/iideal.space/), Prague"]
      ]
    },
    {
      title: "Solo exhibitions",
      entries: [
        ["2024", "Roman Road & London DLC, with Zuzana Jírová, POP-UP Galerie AVU, Prague — [text by Ondřej Trhoň](https://ondrejtrhon.substack.com/p/gauce-zpackane-utopie-a-stiny-na)"],
        ["2023", "Workers Out of Office: Dreaming About Work, Industra, Brno"],
        ["2021", "Dreaming About Work 0.9: For Loop Contingency, Galerie mladých, TIC Brno"],
        ["2018", "Workcraft 5.0, with Jakub Pospíšil, Studio Prám, Prague"],
        ["2017", "Your Sustainable Future, with Jakub Pospíšil, Galerie 123, Prague"],
        ["2017", "Never Ending Story; Life After Art, with Tereza Brussmannová, Galerie Alternativa, OGV Jihlava"],
        ["2016", "Spend Your Day Right, Ateliér intermediální tvorby 1, AVU"],
        ["2016", "Open Source domovy, with Jakub Pospíšil, GAVU"],
        ["2016", "Re Time, UKG Prague"],
        ["2015", "Spatial Cuts, with Jakub Pospíšil, Studio Letná, AVU"]
      ]
    },
    {
      title: "Selected group exhibitions",
      entries: [
        ["2025",    "[Enter the Room](https://www.ghmp.cz/vystavy/enter-the-room/), Prague City Gallery — Ultimate Spread Logics 2.0, with Philipp Kolychev"],
        ["2024–25", "[Symptomy budoucnosti](https://hranicar-usti.cz/program/symptomy-budoucnosti-zahajeni/), Hraničář, Ústí nad Labem — Lithium, with Blue Pulsar kolektiv"],
        ["2024",    "[Y: Lan Party](https://www.divadlox10.cz/en/y-events/y-lan-party), Y Events, Divadlo X10, Prague"],
        ["2022",    "Ultimate Spread Logics, with Philipp Kolychev, Pole v množném čísle, Pragovka Gallery, Prague"],
        ["2020",    "Inhabited, Dům umění Ústí nad Labem"],
        ["2020",    "Být sněný / Being Dreamed, GAMPA Pardubice"],
        ["2019",    "Leinemann Kunstpreis — Negative Realism, Czech Centre Berlin"],
        ["2019",    "A co nám zbývá teď?, Galerie Emila Filly, Ústí nad Labem"],
        ["2018",    "Civilizace na rozcestí: strůjci vědecko-technické revoluce, Display, Prague"],
        ["2018",    "Přechodné zóny / Transient Zones, Prague"],
        ["2016",    "A Report on the Party and Guests, Royal Academy of Fine Arts Antwerp"],
        ["2015",    "MONUMENT 1, Galerie NoD, Prague"],
        ["2015",    "Oh-oh-oh-ohh, oh-oh-oh-ohh, Just for one day, Greenhouse Berlin"],
        ["2015",    "Halo!, Galerie AVU"],
        ["2014",    "Art and Shadow, Galerie NoD"],
        ["2011",    "Nine Pictures from Legnava, with Jan Petýrek, Legnava, Slovakia"],
        ["2011",    "Symposium Consonance, Sýpka Klenová"]
      ]
    },
    {
      title: "Curating",
      entries: [
        ["2022",    "[Earthly Survival: Monstrous Games](https://etcgalerie.cz/en/earthly-survival-monstrous-games/), with John Hill, etc. galerie, Prague"],
        ["2017–19", "IDEAL Prostor, artist-run space, Prague"]
      ]
    }
  ],

  // Contact section.
  contact: {
    intro: "For collaborations, exhibitions, teaching and game design work:",
    email: "fi.hauer@gmail.com",
    links: [
      ["itch.io",   "https://filip-hauer.itch.io"],
      ["Instagram", "https://www.instagram.com/fihauer/"],
      ["Facebook",  "https://www.facebook.com/fihauer/"],
      ["Blog",      "http://filiphauer.blogspot.com"],
      ["ORCID",     "https://orcid.org/0009-0004-3111-6345"]
    ]
  },

  footer: "© 2011–2026 Filip Hauer. All works and images are copyrighted by the author and collaborators."
};


/* =====================================================================
   3. TAGS & SECTIONS
   ===================================================================== */


/* Tags shown as filter buttons (layouts A–E) and on cards. */
Site.tags = {
  games:          "Games",
  installations:  "Installations",
  collaborations: "Collaborations",
  studio:         "Studio work",
  research:       "Research games",
  writing:        "Writing",
  curation:       "Curation",
  video:          "Video",
  sound:          "Sound"
};

/* Practice sections for layout F, in display order. */
Site.practices = [
  { id: "games",         label: "Critical games",       blurb: "Critical and speculative games, working with artistic research and game studies methods to enter into dialogue with political and social themes." },
  { id: "writing",       label: "Research & writing",   blurb: "PhD research and essays on game exchange, alienation and player agency." },
  { id: "installations", label: "Art and installation", blurb: "Installations and video works on automation, play and labour." },
  { id: "curation",      label: "Curation",             blurb: "Exhibitions and artist-run spaces." },
  { id: "collaborations", label: "Collaborations",      blurb: "Projects made together with artists, designers, researchers and collectives." },
  { id: "studio",        label: "Studio work",          blurb: "UI/UX and design for commercial games." }
];

/* Layout G — critical games, research, art, then the Game & UX route. */

/* The three entry links under the statement. `target` = section id. */
Site.pathways = [
  { label: "Critical games & art",     target: "games",   note: "Games, installations, video, curation" },
  { label: "Research & teaching",      target: "writing", note: "PhD, publications, critical game design" },
  { label: "Game & UX design",         target: "studio",  note: "Shipped titles, roles, UI/UX systems" }
];

/* Order of the sections in layout G. "studio" = the Game & UX design section. */
Site.practiceOrderG = ["games", "writing", "installations", "studio", "curation", "collaborations"];

/* Projects shown as large cards at the top of their section in layout G. */
Site.highlights = ["andre-miri-cipa", "lithium", "workers-out-of-office-london-dlc", "workers-out-of-office"];

/* =====================================================================
   4. GAME & UX — the studio section (layout G)
   ===================================================================== */

/* Studio section: shipped work described for game studios.
   Each entry points to a project (same popup, same images) and adds
   the role-focused facts a studio reviewer looks for. */
Site.studio = {
  intro: "Game designer and researcher with a focus on speculative game design and game studies. I have shipped titles on Steam and mobile and spent four years building the UI/UX system of a AAA game. Systems design, game economies, narrative and interface design.",
  skills: ["Systems & game design", "Game economies", "UI/UX design systems", "Narrative design", "2D/3D art", "Unity (C#)"], // TODO: check this list
  cvLink: "", // TODO: link to a studio CV PDF, e.g. "files/filip-hauer-cv-games.pdf"
  entries: [
    {
      project: "arma-reforger",
      role: "UI/UX designer",
      team: "Bohemia Interactive · large studio team",
      shipped: "Released title",
      did: [
        "Built the UI/UX design system for the game",
        "Wrote the design manual the team used to build interfaces",
        // TODO: one more concrete line, e.g. which systems' interfaces you designed
      ]
    },
    {
      project: "11th-dream",
      role: "Game designer & artist",
      team: "Blue Pulsar · team of three · in-house engine",
      shipped: "Steam, 2021",
      did: [
        "Designed the game mechanics",
        "Wrote the narrative",
        "Made all 2D and 3D visuals"
      ]
    },
    {
      project: "lithium",
      role: "Game designer",
      team: "Blue Pulsar kolektiv · team of five",
      shipped: "Steam, Windows & macOS, 2025",
      did: [
        "Coalition mechanic that decentralises the player's agency",
        "Integrated interviews with local actors and experts",
        "Shown in a gallery exhibition before release"
      ]
    },
    {
      project: "andre-miri-cipa",
      role: "Lead game designer & researcher",
      team: "FaVU VUT Brno · interdisciplinary research team",
      shipped: "iOS, Android, Windows, macOS, 2026",
      did: [
        "Led game design within a research project",
        "Turned ethnographic and participatory research into play",
        "Czech and English release on four platforms"
      ]
    }
  ]
};

/* =====================================================================
   5. PROJECTS
   ---------------------------------------------------------------------
   One project = one { ... } block. Fields:

     id        unique, lowercase, dashes. Used in the web address
               (new.filiphauer.com/#lithium) AND as the start of its
               image file names (images/lithium-cover.jpg …).
     title     full title.
     short     optional shorter title for tight spaces (prev/next).
     year      shown as text, so "2023–24" or "2022/25" is fine.
               Grids are sorted by it, newest first.
     level     where it appears:
                 "featured" → main project view in ALL layouts
                 "grid"     → main view in layouts E, F, G;
                              in A–D it appears in Archive or Research
                 "archive"  → only in the Archive list
     practice  section in layouts F/G: games | writing | installations |
               curation | studio
     category  first word of the small line under thumbnails.
     org       second part of that line: "CATEGORY / org, year".
     type      short label above the title in cards.
     meta      one line: role · venue · platform.
     tags      list of tag ids (see Site.tags above).
     summary   1–2 sentences for cards. Start with what the player does.
     text      full text for the popup. One text = one paragraph.
               Special starts:  "## " sub-heading,  "> " quote,
                                "``" monospaced block (keeps line breaks)
     gallery   how many gallery images exist: images/<id>-gallery-1.jpg …
     videos    list of { label, embed }: embed plays in the popup.
     links     list of [ "Label", "https://…" ].
     external  optional URL: the card links straight to it (↗) instead
               of opening a popup. Used for texts that live elsewhere.
     isNew     optional true → shows a "new" badge.
     with      optional collaborators, e.g. "Philipp Kolychev". Shown as
               a "with …" line on cards and in the popup, and the project
               is listed in the Collaborations section (layout G).
   ===================================================================== */

Site.projects = [

  /* ------------------------------------------------------------ FEATURED */

  {
    id: "andre-miri-cipa", with: "SEGROMA research team, FaVU VUT Brno",
    title: "Andre Miri Cipa",
    year: "2026", level: "featured", practice: "games", isNew: true,
    category: "Game", org: "FaVU VUT Brno",
    type: "Educational & research game",
    meta: "Lead game designer & researcher · SEGROMA, Faculty of Fine Arts, Brno University of Technology · iOS, Android, Windows, macOS",
    tags: ["games", "research", "collaborations"],
    summary: "An educational and research game on the position of Roma in the Czech Republic, built on ethnographic and participatory research with the Roma community.",
    // TODO: add one sentence on what the player does at the start of the summary.
    text: [
      "Andre Miri Cipa is an educational and research game on the position of Roma in the Czech Republic, referencing the global position of Roma culture and its lack of representation in contemporary game culture. The game builds on ethnographic and participatory research from the project's sociological and design branches, and serves as a platform for participatory inputs conveying experiences of racism from the perspective of the Roma community.",
      "In the design branch, Filip brought in his research on critical and speculative games working with utopia and María Lugones's concepts of “world-travelling” and “loving perception”.",
      "Public release on 22 October 2026 at the gala evening of the Museum of Romani Culture in Brno, concluding the project together with the community it represents."
    ],
    gallery: 4,
    videos: [],
    links: [
      ["View on Steam", "https://store.steampowered.com/app/4972430/Andre_Miri_Cipa/"]
    ] // TODO: App Store, Google Play, event page
  },

  {
    id: "lithium", with: "Blue Pulsar kolektiv: Gabriela Štvrtňová, Veronika Petrova, Michal Žák, Vojtěch Košař",
    title: "Lithium",
    year: "2025", level: "featured", practice: "games",
    category: "Game", org: "Blue Pulsar kolektiv",
    type: "Ecogame",
    meta: "Blue Pulsar kolektiv · Steam, Windows & macOS · Czech & English · Hraničář Gallery",
    tags: ["games", "collaborations", "installations"],
    summary: "The player defends a landscape from lithium mining not as a lone hero, but by building a coalition with the local community.",
    text: [
      "Lithium investigates lithium mining in Cínovec, Czech Republic, within the global context of energy transformation, and focuses on how local communities can mobilise to defend their landscapes. Its original game mechanic decentralises the player's agency: instead of acting as a hegemonic hero, the player builds a coalition with the local population to innovate democratic decision-making from below.",
      "The game includes interviews with local actors and experts on the environmental impacts of lithium mining, and asks whether lithium mining is a solution to the climate crisis at all.",
      "Developed by Blue Pulsar kolektiv for the exhibition Symptoms of the Future, Hraničář Gallery, Ústí nad Labem (14 September 2024 – 16 February 2025). Released on Steam on 28 March 2025.",
      "Blue Pulsar kolektiv: Filip Hauer, Gabriela Štvrtňová, Veronika Petrova, Michal Žák, Vojtěch Košař."
    ],
    gallery: 4,
    videos: [
      { label: "Trailer", embed: "https://www-ccv.adobe.io/v1/player/ccv/U_skw3vpbGu/embed?bgcolor=%23222222&lazyLoading=true&api_key=BehancePro2View" }
    ],
    links: [
      ["Play on Steam", "https://store.steampowered.com/app/3439740/Lithium/"],
      ["Symptoms of the Future", "https://hranicar-usti.cz/program/symptomy-budoucnosti-zahajeni/"]
    ]
  },

  {
    id: "workers-out-of-office",
    title: "Workers Out of Office: Dreaming About Work",
    short: "Workers Out of Office",
    year: "2023", level: "featured", practice: "games",
    category: "Game & installation", org: "Industra Brno",
    type: "Digital game · Installation",
    meta: "Industra, Brno",
    tags: ["games", "installations"],
    summary: "Players lead a group of workers displaced by automation, searching for emancipation and meaningful survival in a post-work, climate-stricken near future.",
    text: [
      "Players take control of a group of former corporate employees displaced by automation, living on the outskirts of a simulated near-future city. Navigating poor material conditions and a deteriorating climate, they must find new positions in society, political stances and an agenda, while preserving their collective well-being. They can become researchers of future politics, succumb to the illusion of being re-employed in an automated society, or struggle to survive a fictional breakdown of the welfare state.",
      "The game draws on RPG adventure and TTRPG mechanics, and its collective world is shaped by interviews with participants. It lets players speculate about futures that encompass emancipation as well as, in the bad scenario, planetary extinction. To speculate here means to become critically aware of one's own (perhaps limited, but existing) possibilities for political struggle beyond the game.",
      "Installation at Industra, Brno. The first instalment of the Workers Out of Office series; continued by London DLC (2024)."
    ],
    gallery: 4,
    videos: [
      { label: "Video", embed: "https://www-ccv.adobe.io/v1/player/ccv/SiTNg8Che87/embed?bgcolor=%23222222&lazyLoading=true&api_key=BehancePro2View" }
    ],
    links: [
      ["Industra", "https://industra.space/program/workers-out-of-office-dreaming-about-work"]
    ]
  },

  {
    id: "workers-out-of-office-london-dlc", with: "Zuzana Jírová",
    title: "Workers Out of Office: London DLC",
    short: "London DLC",
    year: "2024", level: "featured", practice: "games",
    category: "Game & installation", org: "POP-UP Galerie AVU",
    type: "Digital game · Installation",
    meta: "Roman Road & London DLC · POP-UP Galerie AVU, Prague",
    tags: ["games", "installations", "collaborations"],
    summary: "You save money for a trip abroad while texting Zuzana in London, in a 2040 of drought, a collapsing job market and capitalist feudalism.",
    text: [
      "You are saving money for a trip abroad, texting Zuzana, who has just returned to London to look for a new job. London DLC takes place in 2040, ten years before Workers Out of Office: Central Europe suffers from drought, the conservative right is gaining power, a desert is expanding on the border of Bohemia and Austria, and the job market is slowly collapsing. Zuzana wants to make it in the arts, but both of you spend most of your time fighting for economic survival.",
      "Through your conversations with Zuzana, the game opens questions about survival, the search for one's ability to act meaningfully, and the emerging technocracy and capitalist feudalism in a world of crisis. The crisis also opens a new way of finding one's ability to take meaningful agency, and the question of how to organise ourselves in new ways.",
      "Roman Road & London DLC, a joint project with Zuzana Jírová, POP-UP Galerie AVU, Prague. Accompanying text by Ondřej Trhoň."
    ],
    gallery: 4,
    videos: [
      { label: "Video", embed: "https://www-ccv.adobe.io/v1/player/ccv/UTZ3uVmWUNi/embed?bgcolor=%23222222&lazyLoading=true&api_key=BehancePro2View" }
    ],
    links: [
      ["Text by Ondřej Trhoň", "https://ondrejtrhon.substack.com/p/gauce-zpackane-utopie-a-stiny-na"]
    ]
  },

  {
    id: "arma-reforger",
    title: "Arma Reforger — UI/UX",
    short: "Arma Reforger",
    year: "2021–25", level: "featured", practice: "studio",
    category: "UI/UX", org: "Bohemia Interactive",
    type: "Studio work",
    meta: "UI/UX designer · Bohemia Interactive",
    tags: ["studio"],
    summary: "UI/UX designer on Arma Reforger, where Filip built the game's UI/UX design system and design manual.",
    text: [
      "From 2021 to 2025 Filip worked as UI/UX designer on Arma Reforger, where he built the UI/UX design system and the manual the team used to design interfaces across the game.",
      // TODO: two concrete systems you designed + one problem you solved.
      "Before that, he worked at Bohemia Interactive as junior graphic designer and artist (from 2018)."
    ],
    gallery: 4,
    videos: [],
    links: []
  },

  {
    id: "ultimate-spread-logics", with: "Philipp Kolychev",
    title: "Ultimate Spread Logics",
    year: "2022/25", level: "featured", practice: "games",
    category: "Game", org: "Prague City Gallery",
    type: "Digital tarot game",
    meta: "with Philipp Kolychev · Pragovka Gallery · Enter the Room, Prague City Gallery",
    tags: ["games", "installations", "collaborations"],
    summary: "A digital tarot deck in which the game's algorithm draws the spread, generating speculative images of the future for players to read.",
    text: [
      "Ultimate Spread Logics is a critical examination of the intertwining of the spiritual and material worlds. The logic in its name refers to the symbolic logic of tarot interpretation, where the relationships between cards force the player to look for affective meanings. In our deck, the game's algorithm draws the spread: speculative cards combine into patterns that procedurally generate random images of the future.",
      "The images and icons we use are not magical but real and cybernetic, inspired by radical imagination. The project playfully critiques conservative politics and their attempt to recover lost goals and means of production through magical thinking, and wants to at least symbolically return power over technology to the public sphere. New combinations of cards challenge anxieties about lost futures and generate alternatives to them.",
      "Shown at Pole v množném čísle, Pragovka Gallery, Prague (2022), and as Ultimate Spread Logics 2.0 at Enter the Room, Prague City Gallery (2025)."
    ],
    gallery: 4,
    videos: [],
    links: [["Enter the Room", "https://www.ghmp.cz/vystavy/enter-the-room/"]]
  },

  {
    id: "dreaming-about-work-09",
    title: "Dreaming About Work 0.9: For Loop Contingency",
    short: "For Loop Contingency",
    year: "2021", level: "featured", practice: "games",
    category: "Simulation", org: "TIC Brno",
    type: "Game simulation · Installation",
    meta: "Concept, design, programming · Galerie mladých, TIC Brno",
    tags: ["games", "installations"],
    summary: "The player becomes an office manager who must keep workers meeting an unsustainable production norm while they are slowly replaced by algorithms.",
    text: [
      "The game simulation places the player in the role of an office manager. She has to control the work of other employees and manage her own time: maintain the workers' performance and keep a production norm that is not sustainable in the long run, as employees are slowly replaced by algorithms. Every interaction is a moral dilemma: whether to keep the work loop running, send an unproductive employee home, take a break, or replace human workers with fully automated machines. The game loop works with explicit boredom, anxiety and alienation of the workspace, and the game allegory of control becomes a critique of contemporary alienated work.",
      "Dreaming About Work explores the dromena of work and repetitive activity, closely connected with the automation of work and the loss of one's own individuality in the labour process. The office is being replaced by digital logic; feedback and recursion erase the distance between employees.",
      "> “We work in a culture where the workplace is a battlefield.” — GPT-2",
      "Solo project by Filip Hauer. Installation at Galerie mladých, TIC Brno.",
      "## Thanks",
      "Václav Janoščík (soundtrack), Michal Žák (programming)."
    ],
    gallery: 4,
    videos: [{ label: "Video", embed: "https://www.youtube-nocookie.com/embed/RR33j3hAPXE" }],
    links: [
      ["Play on itch.io", "https://filip-hauer.itch.io"],
      ["Video on YouTube", "https://www.youtube.com/watch?v=RR33j3hAPXE"]
    ]
  },

  {
    id: "for-how-many-are-your-futures",
    title: "For How Many Are Your Futures?",
    year: "2022", level: "featured", practice: "games",
    category: "Board game", org: "CoFUTURES Oslo",
    type: "Research board game",
    meta: "CoFUTURES, University of Oslo · print & play",
    tags: ["games", "research"],
    summary: "Each turn, players choose agendas that alter their stats and decide which future of work they end up in. Free to print and play.",
    text: [
      "In this speculative research game, you play for the futures of work and workers. Each turn you choose agendas that alter your stats and determine your final future; your goal is to finish with the future that suits you best.",
      "Made during a research internship at CoFUTURES, University of Oslo, as part of the Dreaming About Work series. Intended to be shared and played freely."
    ],
    gallery: 4,
    videos: [],
    links: [
      ["Download PDF", "https://drive.google.com/file/d/1Qs66h5hBtht6Ngj3zdueSChmLeAdfF6h/view?usp=sharing"],
      ["Website", "https://futurework.cofutures.org"],
      ["CoFUTURES", "https://cofutures.org/"]
    ]
  },

  {
    id: "11th-dream", with: "Blue Pulsar: Michal Žák, Vojtěch Košař",
    title: "11th Dream",
    year: "2021", level: "featured", practice: "games",
    category: "Game", org: "Blue Pulsar",
    type: "Third-person abstract shooter",
    meta: "Blue Pulsar: Filip Hauer, Michal Žák, Vojtěch Košař · mechanics, narrative, all 2D/3D visuals · Steam",
    tags: ["games", "collaborations"],
    summary: "A fast-paced abstract shooter set after biological history, where bots became tools for other tools. Built by a team of three on Blue Pulsar's own engine.",
    text: [
      "``0X0010 AFTER BIOLOGICAL HISTORY\n0X0020 WHEN BOTS BECAME\n0X0030 TOOLS FOR OTHER TOOLS\n0X0040 WITH NO WORK\n0X0050 BUT UNCOMFORTABLE.\n0X0060 THE SYSTEM STARTED TO FAINT",
      "11th Dream is a fast-paced third-person abstract shooter for hard-core difficulty enthusiasts and speedrunners. Visit a place after biological history, where bots became tools for other tools: a world of automation without work, where the system has started to faint.",
      "Built by a team of three on Blue Pulsar's own in-house engine. Filip designed the game mechanics and narrative and made all 2D and 3D visuals."
    ],
    gallery: 4,
    videos: [{ label: "Trailer", embed: "https://www.youtube-nocookie.com/embed/HgfAPOjKP9A" }],
    links: [
      ["Steam", "https://store.steampowered.com/app/949450/11th_Dream/"],
      ["Website", "https://11thdreamgame.bluepulsar.cz"]
    ]
  },

  {
    id: "perfect-strike",
    title: "Perfect Strike: After Vita Activa",
    short: "Perfect Strike",
    year: "2018", level: "featured", practice: "games",
    category: "Game installation", org: "itch.io",
    type: "Game installation",
    meta: "Computer game installation · 4K video 40:00",
    tags: ["games", "installations"],
    summary: "Do you ever imagine a world without your body? A game about work, staged as a cognitive test of the future.",
    text: [
      "Do you ever imagine a world without your body? Perfect Strike is a game about work, a cognitive test of the future. Today, as in games, objects become goals in themselves, for which we create our tools and equipment. The game mechanic is a series of questions freely based on Hannah Arendt's The Human Condition."
    ],
    gallery: 2,
    videos: [
      { label: "Video 1", embed: "https://www.youtube-nocookie.com/embed/dDO0Ct3ELNo" },
      { label: "Video 2", embed: "https://www.youtube-nocookie.com/embed/rGHIQhImUFE" }
    ],
    links: [["Play on itch.io", "https://filip-hauer.itch.io"]]
  },

  /* ---------------------------------------------- GRID (E/F main view) */

  {
    id: "thesis",
    title: "Digital Games and Allegorithmic Work",
    year: "2025", level: "grid", practice: "writing",
    category: "Research", org: "Academy of Fine Arts Prague",
    type: "PhD thesis",
    meta: "The Politics of Exchange, Alienation and Performative Ideology · Supervisor: Tomáš Svoboda · Consultant: Vjera Borozan",
    tags: ["writing"],
    summary: "A framework of game exchange, alienation and performative player agency for critical game design.",
    text: [
      "The dissertation examines market, ideological and extractivist stereotypes in the exchange of player labour for game progress, and uses them as lenses for a conceptual framework of critical game design and art. Analysing capitalist allegories in selected games, it defines capitalist, authoritarian, colonial and extractive tendencies in both mainstream games and games with critical aspirations.",
      "It argues that games can articulate a narrative and procedural critique of economic and social systems in dynamic dialogue with players, and proposes a three-level heuristic framework of game exchange, alienation and performative player agency, with shared agency and troubled utopia as alternatives to game ideological stereotypes.",
      "## Keywords",
      "Games, game exchange, alienation, performativity, ideology, inner game markets, game work & labour, capitalism, game economies, speculative mechanics, critical games, game art, critical design, allegorithms, ecogames, game studies, artistic research.",
      "To request the PDF, write to the email address in Contact."
    ],
    gallery: 0, videos: [],
    links: [["AVU", "https://avu.cz/student/hauer"], ["ORCID", "https://orcid.org/0009-0004-3111-6345"]]
  },
  { id: "cedit-critical-game-infrastructures", title: "Zažívat a simulovat kritické herní infrastruktury?", year: "2025", level: "grid", practice: "writing",
    category: "Writing", org: "CEDIT 16, CED Brno", type: "Essay", tags: ["writing"], external: "https://www.ced-brno.cz/files/4702.pdf" },
  { id: "power-relations-in-games", with: "Ondřej Trhoň", title: "Power Relations in Games", year: "2025", level: "grid", practice: "writing",
    category: "Writing", org: "Prague City Gallery", type: "Essay", tags: ["writing"], external: "https://eshop.ghmp.cz/enter-the-room/" },
  { id: "allegorithmic-politics", title: "Allegorithmic Politics of Game Exchange", year: "2023", level: "grid", practice: "writing",
    category: "Writing", org: "DiGRA 2023", type: "Conference paper", tags: ["writing"], external: "https://dl.digra.org/index.php/dl/article/view/1929" },
  { id: "vecny-navrat-do-tamrielu", with: "Ondřej Trhoň", title: "Věčný návrat do Tamrielu", year: "2022", level: "grid", practice: "writing",
    category: "Writing", org: "A2", type: "Essay", tags: ["writing"], external: "https://www.advojka.cz/archiv/2022/5/vecny-navrat-do-tamrielu" },
  { id: "automatizace", title: "Automatizace", year: "2022", level: "grid", practice: "writing",
    category: "Writing", org: "Utopia Libri", type: "Essay", tags: ["writing"], external: "https://www.pagefive.com/product/23484-neuplny-atlas-regenerace" },

  {
    id: "workcraft", with: "Jakub Pospíšil",
    title: "Workcraft 5.0", year: "2018", level: "grid", practice: "installations",
    category: "Installation", org: "Studio Prám", type: "Gallery game",
    meta: "with Jakub Pospíšil · Studio Prám, Prague", tags: ["installations", "collaborations", "games"],
    summary: "You score points for the physical labour of a paid performer.",
    text: ["A game in the gallery where you control a generic activity carried out for you by a paid worker, for whom the game creates work. You score points for his physical labour. Open source, playable at home."],
    gallery: 2, videos: [{ label: "Video", embed: "https://www.youtube-nocookie.com/embed/qGfdxLXwqlI" }], links: []
  },
  {
    id: "little-xeno-chemistry",
    title: "Little Xeno-Chemistry (If The Bot Was a Socialist)", short: "Little Xeno-Chemistry", year: "2018", level: "grid", practice: "installations",
    category: "Simulation", org: "Unity", type: "Simulation, C# in Unity",
    meta: "Simulation (C# in Unity)", tags: ["installations"],
    summary: "A live game-engine image that removes the player's input entirely.",
    text: ["Radovan Richta's Civilisation at the Crossroads (1966), with “society” replaced by “artificial intelligence”, runs beside two screens generating a world and a society that infinitely approach 100%. A live game-engine image that removes the player's input entirely."],
    gallery: 2,
    videos: [{ label: "Video 1", embed: "https://www.youtube-nocookie.com/embed/vonMgDhrdvc" }, { label: "Video 2", embed: "https://www.youtube-nocookie.com/embed/bn6GLo7-v-k" }],
    links: [["Function", "https://www.wolframalpha.com/input/?i=%2528100*x%2529%252F%2528x+%252B+100%2529+from+0+to+3600"]]
  },
  {
    id: "your-sustainable-future", with: "Jakub Pospíšil",
    title: "Your Sustainable Future", year: "2017", level: "grid", practice: "installations",
    category: "Installation", org: "Galerie 123", type: "Installation",
    meta: "with Jakub Pospíšil · Galerie 123, Prague", tags: ["installations", "collaborations"],
    summary: "Two computers play Counter-Strike: GO against each other for the whole exhibition.",
    text: ["Two computers play a competitive match of Counter-Strike: GO against each other for the whole exhibition. A cognitive map of a near future from which humans may be excluded by AI and automation; for the visitor, only rice scattered on the table remains."],
    gallery: 2, videos: [], links: []
  },
  {
    id: "rooms",
    title: "Rooms / Pokoje", year: "2015", level: "grid", practice: "installations",
    category: "Installation", org: "AVU Prague", type: "Installation",
    meta: "Installation", tags: ["installations"],
    summary: "An archetypal room drawn in iron, with sound and video from six friends' rooms.",
    text: ["A spatial drawing of an archetypal room (iron, 400 × 220 × 220 cm), video on two canvases and three-channel audio from the rooms of six friends, with interviews about where they spend most of their time. Asynchronous sound and image force viewers to thread their own story of the house."],
    gallery: 2, videos: [{ label: "Video", embed: "https://player.vimeo.com/video/134356504" }],
    links: [["Blog", "http://filiphauer.blogspot.com/2015/08/rooms-pokoje.html"]]
  },
  {
    id: "dreaming-about-work-01",
    title: "Dreaming About Work 0.1", year: "2020", level: "grid", practice: "installations",
    category: "Video", org: "Job Quitting Simulator", type: "4K video, simulation",
    meta: "4K video 07:54, computer simulation", tags: ["video", "games"],
    summary: "Machine-learning text introduces a Job Quitting Simulator spread across an eight-hour working day.",
    text: ["A video of text generated by a machine learning algorithm from the question “What if algorithms take our jobs?” introduces Job Quitting Simulator: a game spread across the 8 hours of a standard working day, in which the player rewrites displayed text or agrees with entered statements. An “allegorithmic” dream of work, where algorithms appear as xeno-players with their own program and motivation."],
    gallery: 2, videos: [{ label: "Video", embed: "https://player.vimeo.com/video/436219285" }], links: []
  },
  {
    id: "neural-network-death-song",
    title: "Neural Network Death Song I.", year: "2019", level: "grid", practice: "installations",
    category: "Video", org: "4K video", type: "4K video",
    meta: "4K video", tags: ["video"],
    summary: "A neural network rewrites a call to bow to the impersonal market forces.",
    text: ["A neural network rewrites Václav Klaus's 2002 call to bow to the impersonal market forces, read by a synthesised voice over a still of a tree in rain. A death song for the age of climate denial and corporate machine learning."],
    gallery: 0, videos: [{ label: "Video", embed: "https://www.youtube-nocookie.com/embed/0sCeRYWGi2U" }], links: []
  },
  {
    id: "some-of-my-friends-are-killers",
    title: "Some of My Friends Are Killers", year: "2016", level: "grid", practice: "installations",
    category: "Video", org: "Arma", type: "Full HD video, 38 min",
    meta: "Full HD video 38 min", tags: ["video"],
    summary: "Six takes of friends playing Arma; each ends with a friend's death.",
    text: ["Six takes of my friends playing the military simulation Arma, in three scenarios I built from my idea of battle. Each take ends with the death of a friend."],
    gallery: 0, videos: [{ label: "Video", embed: "https://www.youtube-nocookie.com/embed/RNKlx8Gl7hs" }], links: []
  },
  { id: "earthly-survival", with: "John Hill", title: "Earthly Survival: Monstrous Games", year: "2022", level: "grid", practice: "curation",
    category: "Curation", org: "etc. galerie", type: "Exhibition", tags: ["curation"], external: "https://etcgalerie.cz/en/earthly-survival-monstrous-games/" },
  { id: "ideal-prostor", with: "Jolanta Nowaczyk, Jakub Pospíšil, Argišt Alaverdyan, Šimon Sýkora", title: "IDEAL Prostor", year: "2017–19", level: "grid", practice: "curation",
    category: "Curation", org: "Prague", type: "Artist-run space", tags: ["curation", "collaborations"], external: "https://www.facebook.com/iideal.space/" },

  /* ------------------------------------------------------------ ARCHIVE */

  {
    id: "never-ending-story", with: "Tereza Brussmannová",
    title: "Never Ending Story; Life After Art", short: "Never Ending Story",
    year: "2017", level: "grid", practice: "installations",
    category: "Installation", org: "OGV Jihlava", type: "Multimedia installation",
    meta: "Galerie Alternativa, Oblastní galerie Vysočiny, Jihlava",
    tags: ["installations", "collaborations"],
    summary: "Multimedia installation on aggression, commerce and new conceptions of work, drawing a symbolic map of moral and technical means for the future.",
    text: [
      "Multimedia installation on aggression, commerce and new conceptions of work in contemporary and future society. The installation illustrates a shared artistic research into the moral and technical means for the future, using confrontation with the ethical limits of social arrangements as its basic method. The result is a symbolic map of the future and a design of art."
    ],
    gallery: 2,
    videos: [{ label: "Video", embed: "https://player.vimeo.com/video/230955812" }],
    links: [["Video on Vimeo", "https://vimeo.com/230955812"]]
  },
  { id: "sugar-hydroxylamine", title: "Sugar – Hydroxylamine", year: "2017", level: "archive", type: "4K video installation 06:26", links: [["Video", "https://vimeo.com/227646658"]] },
  { id: "perfect-time", title: "Perfect Time", year: "2017", level: "archive", type: "HD video 15:17", links: [["Video", "https://vimeo.com/248768646"]] },
  { id: "spend-your-day-right", title: "Spend Your Day Right", year: "2016", level: "archive", type: "2-channel HD video 06:23", links: [["Video", "https://vimeo.com/197099202"]] },
  { id: "re-time", title: "Re Time", year: "2016", level: "archive", type: "Full HD video 03:19", links: [["Video", "https://vimeo.com/176368174"]] },
  { id: "mediated-time", title: "Mediated Time", year: "2016", level: "archive", type: "Installation",
    summary: "“Dear, put on the headphones. Close your eyes and walk slowly up and down the stairs. Count one hundred steps.” A hidden microphone plays back the ambient sound of the stairs.", links: [] },
  { id: "melting-butter", title: "Melting Butter & Sustainable Time", year: "2016", level: "archive", type: "Full HD video 11:16, 04:04",
    links: [["Video 1", "https://vimeo.com/179033558"], ["Video 2", "https://vimeo.com/183681112"]] },
  { id: "taking-a-short-nap", title: "Taking a Short Nap", year: "2014", level: "archive", type: "Sound & video installation",
    summary: "Viewers climb two wooden steps along the wall and listen to sound recordings from headphones hanging above them.", links: [["Blog", "http://filiphauer.blogspot.com/2014/07/kratka-prestavka-taking-short-nap.html"]] },
  { id: "formal-garden", title: "Formal Garden", year: "2014", level: "archive", type: "Installation",
    summary: "A felled tree placed horizontally into an upright chipboard desk, with a blog documenting the process from studio to installation. A reference to the 17th-century French formal garden.", links: [["Blog", "http://formal-garden.tumblr.com/"]] },
  { id: "friends-talking-about-art", title: "Some of My Friends Talking About Art", year: "2014", level: "archive", type: "3-channel video 43:31",
    summary: "Six interviews with friends (approx. 7 minutes each) about basic questions of art practice.", links: [["Video", "https://www.youtube.com/watch?v=rcb23t3IPPs"]] },
  { id: "import-export", title: "Import/Export (Monoliths A, B)", year: "2013", level: "archive", type: "Polystyrene",
    summary: "Two monoliths named after the dictionary definitions of import and export.", links: [] },
  { id: "ulysses", title: "Ulysses", year: "2012", level: "archive", type: "Photography", summary: "Tourist photography series.", links: [] },
  {
    id: "weather-tax",
    title: "Weather Tax",
    year: "2025–", level: "grid", practice: "installations",
    category: "Music", org: "Bandcamp", type: "Music · speculative ambience",
    meta: "Speculative ambience for a non-existent game · three EPs on Bandcamp",
    tags: ["sound"],
    summary: "Speculative ambience for a non-existent game.",
    text: [
      "Weather Tax is speculative ambience for a non-existent game. Three EPs so far: Weather Camp 2008, Weather in 2025, and Spring & Mítov 2065."
    ],
    gallery: 0,
    videos: [],
    links: [
      ["Weather Camp 2008 EP", "https://weathertax.bandcamp.com/album/weather-camp-2008-ep"],
      ["Weather in 2025 EP", "https://weathertax.bandcamp.com/album/weather-in-2025-ep"],
      ["Spring & Mítov 2065 EP", "https://weathertax.bandcamp.com/album/spring-m-tov-2065-ep"]
    ]
  }
];
