/* Laurie Legault — small enhancements only. The site works without this file. */
(() => {
  /* ---- The shelf: click or tap a spine to pin a book open ---- */
  const books = document.querySelectorAll(".book");

  const close = (book) => {
    book.classList.remove("is-open");
    book.querySelector(".book__spine").setAttribute("aria-expanded", "false");
  };

  books.forEach((book) => {
    const spine = book.querySelector(".book__spine");
    spine.addEventListener("click", () => {
      const opening = !book.classList.contains("is-open");
      books.forEach(close);
      if (opening) {
        book.classList.add("is-open");
        spine.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Escape puts the book back
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") books.forEach(close);
  });

  /* ---- Current year in the colophon ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
