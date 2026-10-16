/* Laurie Legault — small enhancements only. The site works without this file. */
(() => {
  /* ---- Links within the same page (Home, Work, Contact): scroll smoothly ----
     Arriving from another page at #cv still jumps straight there. */
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

  /* ---- "Read online": open the Word document in Microsoft's online viewer ----
     Only on the live site (Microsoft can't reach a file on this computer);
     otherwise the link simply opens the file itself. */
  const live = location.protocol === "https:" && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (live) {
    document.querySelectorAll("a.doc-read[data-doc]").forEach((link) => {
      const file = encodeURIComponent(new URL(link.dataset.doc, location.href).href);
      link.href = "https://view.officeapps.live.com/op/view.aspx?src=" + file;
    });
  }

  /* ---- Heights of the red bar and the © footer, so one-screen sections fit exactly ---- */
  const bar = document.querySelector(".site-nav");
  const footer = document.querySelector(".colophon");
  const setHeights = () => {
    if (bar) document.documentElement.style.setProperty("--nav-h", bar.offsetHeight + "px");
    if (footer) document.documentElement.style.setProperty("--footer-h", footer.offsetHeight + "px");
  };
  setHeights();
  addEventListener("resize", setHeights);

  /* ---- Sections fade into view as you scroll (when scrolling down) ----
     Only sections marked class="fade". Without JavaScript they are simply visible. */
  const fading = document.querySelectorAll(".fade");
  if (fading.length && document.documentElement.classList.contains("fade-ready")) {
    // Fades in when a section comes up from below (scrolling down).
    // A section that leaves through the bottom of the screen is reset, so it fades in
    // again next time you scroll down to it; one that leaves through the top stays
    // visible, so scrolling back up shows it straight away, with no fade.
    // Shown at once, without fading (a section above the screen, reached by scrolling up)
    const showNow = (el) => {
      if (el.classList.contains("is-visible")) return;
      el.classList.add("fade-instant", "is-visible");
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("fade-instant")));
    };
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const box = entry.boundingClientRect;
        // Above the screen (e.g. arrived lower down the page): visible straight away
        if (box.top < 0 && (entry.isIntersecting || box.bottom <= 0)) showNow(entry.target);
        else if (entry.intersectionRatio >= 0.12) entry.target.classList.add("is-visible");
        // Reset once (almost) all of it is below the screen. "Almost": at the top of the page
        // About Me starts right at the bottom edge, and depending on the screen a thin
        // sliver of it can still show there, so it would never count as gone.
        else if (entry.intersectionRatio < 0.05 && entry.boundingClientRect.top > 0) entry.target.classList.remove("is-visible");
      });
    }, { threshold: [0, 0.05, 0.12] });
    fading.forEach((el) => seen.observe(el));
  }

  /* ---- Contact form: send it without leaving the page ----
     Posts to Netlify Forms in the background, then shows the thank-you note in place
     of the form. Never opens another page: if sending fails, a short note appears under
     the button. (Without JavaScript the form still goes to thanks.html.) */
  const form = document.querySelector(".letter-form");
  const sent = document.querySelector(".letter-sent");
  const failed = document.querySelector(".letter-form__error");
  const missing = document.querySelector(".letter-form__missing");
  if (form && sent && window.fetch) {
    const button = form.querySelector("button[type=submit]");
    const fields = [...form.querySelectorAll("[required]")];
    // Our own check instead of the browser's "Please fill in this field" pop-ups
    form.noValidate = true;
    const check = () => {
      let ok = true;
      fields.forEach((field) => {
        const bad = !field.value.trim() || !field.checkValidity();
        field.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) ok = false;
      });
      return ok;
    };
    // Once the note is showing, it goes away as soon as everything is filled in
    fields.forEach((field) => field.addEventListener("input", () => {
      if (missing && !missing.hidden && check()) missing.hidden = true;
    }));
    const slot = form.parentElement;
    const showSent = () => {
      slot.style.minHeight = form.offsetHeight + "px";   // keep the form's place, so nothing moves
      sent.style.minHeight = form.offsetHeight + "px";   // and the same size of box
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (failed) failed.hidden = true;
      if (!check()) {
        if (missing) missing.hidden = false;
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }
      if (missing) missing.hidden = true;
      // Opened as a file on this computer (no Netlify to receive it): just preview the note
      if (location.protocol === "file:") { showSent(); return; }
      button.disabled = true;
      button.textContent = "Sending…";
      try {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (!res.ok) throw new Error(String(res.status));
        showSent();
      } catch {
        button.disabled = false;
        button.textContent = "Send";
        if (failed) failed.hidden = false;
      }
    });
  }

  /* ---- Current year in the colophon ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
