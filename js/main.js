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

  /* ---- Galleries of cards (Projects, Awards): glide left / right like walking past paintings ----
     Arrows appear only when there are more cards than fit. Swipe, trackpad and ← → keys work too.
     Without JavaScript the row simply scrolls sideways. */
  const svgNS = "http://www.w3.org/2000/svg";
  const arrow = (d) => {
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    svg.append(path);
    return svg;
  };
  document.querySelectorAll(".gallery").forEach((gallery) => {
    const track = gallery.querySelector(".works__row");
    if (!track) return;
    const cards = () => [...track.children];
    const makeButton = (dir) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "gallery__btn gallery__btn--" + dir;
      b.setAttribute("aria-label", dir === "prev" ? "Previous" : "Next");
      b.append(arrow(dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"));
      b.hidden = true;
      gallery.append(b);
      return b;
    };
    const prev = makeButton("prev");
    const next = makeButton("next");
    const step = () => {
      const card = cards()[0];
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    };
    const glide = (dir) => track.scrollBy({ left: dir * step(), behavior: reduceMotion.matches ? "auto" : "smooth" });
    prev.addEventListener("click", () => glide(-1));
    next.addEventListener("click", () => glide(1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        glide(e.key === "ArrowLeft" ? -1 : 1);
      }
    });
    const update = () => {
      const scrollable = track.scrollWidth > track.clientWidth + 2;
      gallery.classList.toggle("is-scrollable", scrollable);
      prev.hidden = next.hidden = !scrollable;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      // Cards at least 3/4 in view are lit; the others are dimmed (CSS, only while the row glides).
      // Measured from layout (offsetLeft), so a dimmed card's smaller size doesn't count.
      const left = track.scrollLeft, right = left + track.clientWidth;
      cards().forEach((c) => {
        const a = c.offsetLeft, b = a + c.offsetWidth;
        const shown = Math.max(0, Math.min(b, right) - Math.max(a, left));
        c.classList.toggle("is-in-view", shown >= c.offsetWidth * 0.75);
      });
    };
    track.addEventListener("scroll", update, { passive: true });
    new ResizeObserver(update).observe(track);
    // Cards added or removed later: check again
    new MutationObserver(update).observe(track, { childList: true });
    update();
  });

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
     Posts to Web3Forms in the background (it emails the message to Laurie), then shows
     the thank-you note in place of the form. Never opens another page: if sending fails, a short note appears under
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
      // Opened as a file on this computer: just preview the note (nothing is sent)
      if (location.protocol === "file:") { showSent(); return; }
      button.disabled = true;
      button.textContent = "Sending…";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const reply = await res.json().catch(() => ({}));
        if (!res.ok || !reply.success) throw new Error(reply.message || String(res.status));
        showSent();
      } catch {
        button.disabled = false;
        button.textContent = "Send";
        if (failed) failed.hidden = false;
      }
    });
  }

  /* ---- Email link: show and copy the address instead of opening a mail app ----
     A mailto: link fails for visitors with no mail app set up (Gmail in the browser,
     Windows asking "how do you want to open this?"). So clicking Email shows the address
     and copies it; the address shown is itself a mailto: link for those who have a mail app.
     Without JavaScript the Email link stays a plain mailto: link.
     The address fades away after 3 s (it waits while the mouse or keyboard is on it). */
  const email = document.querySelector(".contact-email");
  const copied = document.querySelector(".contact-copied");
  if (email && copied) {
    let timer;
    const hide = () => {
      copied.classList.add("is-fading");
      const done = () => { if (copied.classList.contains("is-fading")) { copied.hidden = true; copied.classList.remove("is-fading"); } };
      if (reduceMotion.matches) done();
      else setTimeout(done, 900);   // a little after the 0.8 s fade in the CSS
    };
    const later = () => { clearTimeout(timer); timer = setTimeout(hide, 3000); };
    const wait = () => { clearTimeout(timer); copied.classList.remove("is-fading"); };
    copied.addEventListener("mouseenter", wait);
    copied.addEventListener("focusin", wait);
    copied.addEventListener("mouseleave", () => { if (!copied.contains(document.activeElement)) later(); });
    copied.addEventListener("focusout", (e) => { if (!copied.contains(e.relatedTarget) && !copied.matches(":hover")) later(); });
    email.addEventListener("click", (e) => {
      e.preventDefault();
      const address = email.getAttribute("href").replace(/^mailto:/, "");
      const link = document.createElement("a");
      link.href = email.getAttribute("href");
      link.textContent = address;
      const status = document.createElement("span");
      copied.replaceChildren(link, status);
      copied.classList.remove("is-fading");
      copied.hidden = false;
      later();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(address).then(() => { status.textContent = " · copied"; }, () => {});
      }
    });
  }

  /* ---- La bibitte à sucre: subscribe pop-up when the reader reaches the end of the page ----
     Centred over the dimmed page. Once per page load: after closing it (×, "Maybe later", Esc, a click
     outside, or a button) it stays closed until the page is reloaded. */
  const pop = document.getElementById("bib-pop");
  if (pop && typeof pop.show === "function") {
    // Shown once per visit, and again on every reload. Coming back to the page by a link or the Back button
    // (e.g. from Laurie's portfolio) after it was already shown: not again. Also not right after the
    // footer's "La bibitte à sucre" link (data-no-pop).
    let closed = false;
    const nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    const reloaded = !!nav && nav.type === "reload";
    try {
      if (sessionStorage.getItem("bib-no-pop") === "1") { closed = true; sessionStorage.removeItem("bib-no-pop"); }
      else if (!reloaded && sessionStorage.getItem("bib-pop-seen") === "1") closed = true;
    } catch (e) { /* storage blocked: just show it */ }
    const close = () => { closed = true; pop.close(); };
    const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
    const check = () => {
      if (closed || pop.open || !atBottom()) return;
      pop.showModal();                              // centred, page dimmed behind; focus goes into it
      try { sessionStorage.setItem("bib-pop-seen", "1"); } catch (e) { /* ignore */ }
      pop.focus();                                  // start on the card itself, not on the × button
      window.removeEventListener("scroll", check);
    };
    pop.querySelector(".bib-pop__close").addEventListener("click", close);
    pop.querySelector(".bib-pop__later").addEventListener("click", close);
    pop.querySelectorAll(".bib-pop__btn, .bib-pop__free-link").forEach((b) => b.addEventListener("click", close));
    pop.addEventListener("cancel", (e) => { e.preventDefault(); close(); });   // Esc
    pop.addEventListener("click", (e) => {                                      // click on the dimmed page around it
      const r = pop.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
    });
    window.addEventListener("scroll", check, { passive: true });
  }

  /* ---- La bibitte à sucre, Paid content: the videocast card ----
     Hover (or keyboard focus): plays a short silent preview. Click: opens the full video in a player.
     The addresses come from data-preview / data-full / data-poster; while they are empty the card just
     says "Coming soon". On touch screens (no hover) a tap opens the full video straight away. */
  document.querySelectorAll(".bib-video").forEach((card) => {
    const open = card.querySelector(".bib-video__open");
    const preview = card.querySelector(".bib-video__preview");
    const player = document.getElementById("bib-player");
    const full = card.dataset.full, clip = card.dataset.preview, poster = card.dataset.poster;
    if (poster) open.style.setProperty("background-image", "url(\"" + poster + "\")");
    if (!full || !player) return;                                   // nothing to play yet
    card.classList.add("is-ready");
    const video = player.querySelector(".bib-player__video");
    const start = () => {
      if (!clip || reduceMotion.matches) return;
      if (!preview.src) preview.src = clip;
      card.classList.add("is-previewing");
      preview.play().catch(() => {});
    };
    const stop = () => { card.classList.remove("is-previewing"); preview.pause(); preview.currentTime = 0; };
    open.addEventListener("mouseenter", start);
    open.addEventListener("focus", start);
    open.addEventListener("mouseleave", stop);
    open.addEventListener("blur", stop);
    open.addEventListener("click", () => {
      stop();
      if (video.getAttribute("src") !== full) video.src = full;
      if (poster) video.poster = poster;
      player.showModal();
      video.play().catch(() => {});
    });
  });
  // The one player, shared by all the video cards: close with ×, Esc or a click outside (pauses the video)
  const player = document.getElementById("bib-player");
  if (player) {
    const video = player.querySelector(".bib-player__video");
    const closePlayer = () => { video.pause(); player.close(); };
    player.querySelector(".bib-player__close").addEventListener("click", closePlayer);
    player.addEventListener("cancel", (e) => { e.preventDefault(); closePlayer(); });   // Esc
    player.addEventListener("click", (e) => { if (e.target === player) closePlayer(); });
  }

  /* ---- Links marked data-no-pop (the Bibitte footer's "La bibitte à sucre"): the page they open
     doesn't show the subscribe pop-up that time ---- */
  document.querySelectorAll("a[data-no-pop]").forEach((link) => {
    link.addEventListener("click", () => { try { sessionStorage.setItem("bib-no-pop", "1"); } catch (e) { /* ignore */ } });
  });

  /* ---- Current year in the colophon ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
