/* Laurie — small touches of motion, nothing that gets in the way of reading. */
(() => {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Night reading (lamp) ---- */
  const lamp = document.getElementById("lamp");
  const setTheme = (t) => {
    if (t === "night") root.setAttribute("data-theme", "night");
    else root.removeAttribute("data-theme");
    lamp.querySelector("span").textContent = t === "night" ? "☀" : "☾";
  };
  let saved = null;
  try { saved = localStorage.getItem("laurie-theme"); } catch { /* storage unavailable (private mode) */ }
  setTheme(saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day"));
  lamp.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "night" ? "day" : "night";
    setTheme(next);
    try { localStorage.setItem("laurie-theme", next); } catch { /* storage unavailable (private mode) */ }
  });

  /* ---- Typewriter line on the title page ---- */
  const lines = [
    "Currently drafting: a story about a lighthouse that forgets how to turn off.",
    "Collecting: first lines, second chances, third drafts.",
    "Believes every sentence deserves one more read.",
  ];
  const typed = document.getElementById("typed");
  if (reduced) {
    typed.textContent = lines[0];
  } else {
    let li = 0, ci = 0, deleting = false;
    const tick = () => {
      const line = lines[li];
      typed.textContent = line.slice(0, ci);
      if (!deleting && ci < line.length) { ci++; setTimeout(tick, 45 + Math.random() * 60); }
      else if (!deleting) { deleting = true; setTimeout(tick, 2600); }
      else if (ci > 0) { ci--; setTimeout(tick, 18); }
      else { deleting = false; li = (li + 1) % lines.length; setTimeout(tick, 500); }
    };
    setTimeout(tick, 1400);
  }

  /* ---- Filter works ---- */
  const filters = document.querySelectorAll(".filter");
  const works = document.querySelectorAll(".work");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.toggle("is-active", b === btn));
    const f = btn.dataset.filter;
    works.forEach((w) => w.classList.toggle("is-hidden", f !== "all" && w.dataset.kind !== f));
  }));

  /* ---- Commonplace book ---- */
  const quotes = [
    "“Write it down before it becomes a memory.”",
    "“The first draft is just you telling yourself the story.”",
    "“Read like a writer. Write like a reader.”",
    "“A blank page is only a room with the lights off.”",
    "“Kill your darlings, but keep them in a drawer.”",
  ];
  let qi = 0;
  const quote = document.getElementById("quote");
  document.getElementById("turn").addEventListener("click", () => {
    quote.classList.add("is-turning");
    setTimeout(() => {
      qi = (qi + 1) % quotes.length;
      quote.textContent = quotes[qi];
      quote.classList.remove("is-turning");
    }, 400);
  });

  /* ---- Gentle reveal on scroll ---- */
  if (!reduced && "IntersectionObserver" in window) {
    const els = document.querySelectorAll(".chapter-head, .prose, .work, .glossary > div, .commonplace");
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
