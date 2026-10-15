/* Laurie Legault — small enhancements only. The site works without this file. */
(() => {
  /* ---- Links within the same page (Home, Projects, Contact): scroll smoothly ----
     Arriving from another page at #projects still jumps straight there. */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]:not(.skip)');
    if (!link) return;
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", link.getAttribute("href"));
  });

  /* ---- Word documents: show them with Microsoft's online viewer ----
     Only on the live site; Microsoft can't reach a file on this computer. */
  const live = location.protocol === "https:" && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  document.querySelectorAll(".doc-viewer[data-doc]").forEach((box) => {
    if (!live) return;
    const file = encodeURIComponent(new URL(box.dataset.doc, location.href).href);
    const frame = document.createElement("iframe");
    frame.src = "https://view.officeapps.live.com/op/embed.aspx?src=" + file;
    frame.title = "Document preview";
    frame.loading = "lazy";
    box.replaceChildren(frame);
    const full = document.querySelector(".doc-viewer__full");
    if (full) {
      full.href = "https://view.officeapps.live.com/op/view.aspx?src=" + file;
      full.hidden = false;
    }
  });

  /* ---- Current year in the colophon ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
