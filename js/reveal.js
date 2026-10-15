/* Loaded in the <head> of every page.
   Goal: a page never flashes its top before jumping to where it should be.
   This happens in some browsers (Safari especially) when a page opens anywhere but the top:
   after a refresh, with Back/Forward, or from a link like index.html#projects.

   So the site handles the scroll position itself, the same way in every browser:
   - it remembers where you were on each page (for refresh and Back/Forward),
   - while the page loads, the content is hidden (the red bar stays visible),
   - once the page and its fonts are ready, it scrolls to the right place and shows it.
   A page that opens at the top is shown straight away, nothing hidden. */
(() => {
  const root = document.documentElement;
  const key = "scroll:" + location.pathname;
  const hasSection = (url) => !!url && new URL(url, location.href).hash.length > 1;

  // Remember the position when leaving (refresh, link, Back)
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  addEventListener("pagehide", () => {
    try { sessionStorage.setItem(key, String(Math.round(scrollY))); } catch {}
  });

  // Where should this page open?
  const navType = performance.getEntriesByType?.("navigation")[0]?.type;
  let saved = 0;
  try { saved = Number(sessionStorage.getItem(key)) || 0; } catch {}
  const restore = (navType === "reload" || navType === "back_forward") && saved > 0;
  const toSection = !restore && hasSection(location.href);

  const goThere = () => {
    if (restore) { scrollTo(0, saved); return; }
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
  };

  // Cross-fade between pages: skip it for links to a #section (it could catch the top)
  addEventListener("pageswap", (e) => {
    if (e.viewTransition && hasSection(e.activation?.entry?.url)) e.viewTransition.skipTransition();
  });
  addEventListener("pagereveal", (e) => {
    if (restore || toSection) { e.viewTransition?.skipTransition(); goThere(); }
  });

  if (!restore && !toSection) return; // opening at the top: nothing to do

  // Hide the content, position it once the page and fonts are ready (max 0.4 s), then show it
  root.classList.add("is-arriving");
  const show = () => {
    goThere();
    root.classList.remove("is-arriving"); // same frame as the scroll, so no in-between state
  };
  addEventListener("DOMContentLoaded", () => {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 400))]).then(show);
  }, { once: true });
  setTimeout(() => root.classList.remove("is-arriving"), 1500); // never stay hidden
})();
