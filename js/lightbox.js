/* =====================================================================
   LIGHTBOX — shows one image full screen.
   ---------------------------------------------------------------------
   Click any image wrapped by helpers.zoomImg() (popup hero and gallery
   images, and the image of an opened Archive entry). The viewer opens
   on top of the popup, using a second built-in <dialog>, so Esc closes
   only the viewer.

   Inside the viewer:  ← / → keys or buttons = previous / next image,
                       Esc, ✕ or a click beside the image = close.
   ===================================================================== */

window.Site = window.Site || {};

(function () {
  const h = Site.helpers;

  let images = [];          // the <img> elements you can step through
  let index = 0;            // which one is shown
  let returnFocus = null;   // the button to focus again after closing
  let lockedScroll = false; // true if the viewer stopped the page from scrolling

  const box = () => document.getElementById("lightbox");

  /* Shows image number i (wraps around at both ends). */
  function show(i) {
    index = (i + images.length) % images.length;
    const src = images[index];
    h.$("#lightbox-img").src = src.currentSrc || src.src;
    h.$("#lightbox-img").alt = src.alt;
    h.$("#lightbox-count").textContent = images.length > 1 ? `${index + 1} / ${images.length}` : "";
    h.$("#lightbox-prev").hidden = h.$("#lightbox-next").hidden = images.length < 2;
  }

  /* Opens the viewer for the clicked button's image. */
  function open(button) {
    const clicked = button.querySelector("img");
    if (!clicked) return;   // image file missing (striped box) → nothing to show

    // Step through all images of the same popup (or the same gallery on the page).
    // An archive entry or the portrait has one image, so it opens alone.
    const group = button.closest("#popup-content, .gallery, .archive-body") || button;
    images = [...group.querySelectorAll(".zoom img")];

    returnFocus = button;
    lockedScroll = !document.documentElement.classList.contains("popup-open");
    document.documentElement.classList.add("popup-open");
    box().showModal();
    show(images.indexOf(clicked));
  }

  function setup() {
    const d = box();

    // Any click on a zoomable image opens the viewer.
    document.addEventListener("click", ev => {
      const button = ev.target.closest("button.zoom");
      if (button) open(button);
    });

    h.$("#lightbox-close").addEventListener("click", () => d.close());
    h.$("#lightbox-prev").addEventListener("click", () => show(index - 1));
    h.$("#lightbox-next").addEventListener("click", () => show(index + 1));

    // Click beside the image (on the dark background) closes.
    d.addEventListener("click", ev => { if (ev.target === d) d.close(); });

    d.addEventListener("keydown", ev => {
      if (ev.key === "ArrowRight") show(index + 1);
      if (ev.key === "ArrowLeft")  show(index - 1);
    });

    d.addEventListener("close", () => {
      if (lockedScroll) document.documentElement.classList.remove("popup-open");
      h.$("#lightbox-img").removeAttribute("src");
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
    });
  }

  document.addEventListener("DOMContentLoaded", setup);
  Site.lightbox = { open };
})();
