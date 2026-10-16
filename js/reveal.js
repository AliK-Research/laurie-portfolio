/* Loaded in the <head> of every page.
   Goal: a page never flashes its top before jumping to where it should be.
   This happens in some browsers (Safari especially) when a page opens anywhere but the top:
   after a refresh, with Back/Forward, or from a link like index.html#cv.

   So the site handles the scroll position itself:
   - it remembers where you were on each page (for refresh and Back/Forward),
   - recent browsers: it scrolls to the right place just before the page is first shown,
     and the usual cross-fade between pages plays (no flash),
   - older browsers: the content is hidden (the bar stays visible) until the page and its
     fonts are ready, then it scrolls and shows it.
   A page that opens at the top is shown straight away. */
(() => {
  const root = document.documentElement;

  // Sections with class="fade" start hidden and fade in as you scroll (js/main.js).
  // Switched on here, before the first paint, so they never flash visible first.
  if ("IntersectionObserver" in window) root.classList.add("fade-ready");

  // The red bar turns dark on the Projects pages. Coming from a page of the other
  // colour, fade the bar from the old colour to the new one.
  const dark = /\/(project(s|-[\w-]+)|awards)(\.html)?\/?$/.test(location.pathname);   // Projects, each project page, Awards
  let wasDark = null;
  try { wasDark = sessionStorage.getItem("nav-dark"); } catch {}
  if (wasDark !== null && (wasDark === "1") !== dark) root.classList.add(dark ? "nav-fade-to-dark" : "nav-fade-to-red");
  addEventListener("pagehide", () => {
    try { sessionStorage.setItem("nav-dark", dark ? "1" : "0"); } catch {}
  });
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
    if (restore) { scrollTo(0, saved); return true; }
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return false;
    target.scrollIntoView({ behavior: "instant", block: "start" });
    return true;
  };

  // Hide the content, position it once the page and fonts are ready (max 0.4 s), then show it.
  // Only for browsers that can't position the page before showing it (see below).
  const hideUntilReady = () => {
    root.classList.add("is-arriving");
    const show = () => {
      goThere();
      root.classList.remove("is-arriving"); // same frame as the scroll, so no in-between state
    };
    if (document.readyState === "loading") {
      addEventListener("DOMContentLoaded", () => {
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 400))]).then(show);
      }, { once: true });
    } else show();
    setTimeout(() => root.classList.remove("is-arriving"), 1500); // never stay hidden
  };

  if (!restore && !toSection) return; // opening at the top: nothing to do

  // Links to a #section on another page: browsers with "pagereveal" (recent Chrome, Edge,
  // Safari) let us scroll before the first frame, so the page is already in place when the
  // cross-fade shows it: no hiding, no flash of the empty page. Others hide the content
  // until it's positioned.
  // (Refresh and Back/Forward keep the older way: there is no cross-fade for those anyway.)
  if (toSection && "onpagereveal" in window) {
    addEventListener("pagereveal", (e) => {
      if (!goThere()) {
        if (e.viewTransition) { e.viewTransition.ready.catch(() => {}); e.viewTransition.skipTransition(); }
        hideUntilReady();
        return;
      }
      // Fonts can change heights a little once loaded: put it back in place if nobody scrolled
      const at = scrollY;
      document.fonts.ready.then(() => { if (Math.abs(scrollY - at) < 2) goThere(); });
    }, { once: true });
  } else {
    // No cross-fade here (it would show the page while it's hidden)
    addEventListener("pagereveal", (e) => {
      if (e.viewTransition) { e.viewTransition.ready.catch(() => {}); e.viewTransition.skipTransition(); }
    }, { once: true });
    hideUntilReady();
  }
})();
