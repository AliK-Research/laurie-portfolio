# Exploration notes

What we've tried, what we kept, and what we dropped, so no idea gets tried twice by accident.

## 2026-10-04 · First deep-red version

**Tried and kept (for now)**
- **Frontispiece opening:** the portrait framed like the illustrated plate at the front of an old book ("Plate I. *The Author*"), next to a title page with Laurie's name and a small table of contents.
- **Alternating "pages":** red title page → parchment page for the bio (easy to read, feels like paper) → dark reading room for the shelf → red for contact.
- **The Shelf:** four books, all taken from facts in the bio (*Sandhill Cranes*, the Chronicle Telegraph prize, ten thousand online readers, the short story collection). Hover = peek; click/tap = pin open; Escape = put it back. The opened book appears on a "reading table" under the shelf.
- **Self-hosted fonts** (Cormorant Garamond + EB Garamond): no Google requests, so visitors' privacy is better and the security policy is stricter.

**Dropped from the first version (cream "book" design)**
- Cream paper background everywhere, sticky notes, typewriter line, quote carousel, night-mode lamp, works filter. They clashed with the new deep-red direction.

**Open questions / ideas to try next**
- On phones the portrait fills the first screen and the name comes after. Try the name first?
- The shelf looks a little empty with 4 books. Add bookends, a small object (an inkwell, a pressed flower), or more books as projects arrive.
- Background images: the hook is ready (`.has-bg` in the CSS) but no images yet.
- Links for each book (e.g. *Sandhill Cranes* in *Arrival*).
- Years for each book, if Laurie wants them.

**Still placeholder**
- Email address in Correspondence (`hello@example.com`).

## 2026-10-05 · Wording

- "Author" → "Writer" (plate caption, section title, contents).
- Removed "A Portfolio" above the name.
- Removed poetry: subtitle is now just *Fiction*, and the Poetry Slams book is off the shelf. (The bio itself still mentions poetry slams — it's Laurie's own text.)
- Removed the ❦ and ✦ ornaments: neither site font contains them, so they looked different on each device.

## 2026-10-13 · Parchment everywhere + separate pages

- **All sections are now parchment** (the colour of the opening). The dark shelf room and the red contact section are gone; sections are separated by thin brass rules. Red stays only as accents (headings, book spines, the wax seal).
- **Opening:** name centred on one line above the photo and the bio; bio moved up next to the photo; the table of contents, the "Plate I" caption and the separate "A Note on the Writer" section were removed.
- **Top nav bar on every page:** Home · About · Bio · CV · Cover Letter (spread across the full width, sticky, one line on phones). New pages `about.html`, `bio.html`, `cv.html`, `cover-letter.html`. The Bio page reuses Laurie's bio word for word; About, CV and Cover Letter are placeholders.
- **Nav bar v2 (inspired by austinkleon.com):** wine bar, name on the left ("Laurie *Legault*", roman + italic like the title page), small spaced capitals on the right: Home · CV · Cover Letter · Contact. Contact jumps to a "Write to Laurie" section at the bottom of every page. About and Bio were dropped from the nav.

## 2026-10-15 · Shelf replaced by Projects

- **Dropped:** the bookshelf (spines, hover pull-out, reading table) and its JS, at the user's request. Section divider lines also removed so the page flows as one sheet.
- **Added:** "Projects" with two side-by-side columns, *Academic* and *Personal Projects* (stacked on phones). The four former shelf entries were moved in; their academic/personal sorting is a guess to confirm with Laurie.
- **Contact:** the red "Write to Laurie" seal was dropped. Tried a pile of books lying on their side (one per contact): dropped, the user found it "funky". Kept a simple list instead: small-caps label + italic handle, fine brass rule between rows. Handles and email are placeholders.
- **CV + Cover Letter merged** into one page (`cv.html`, nav label "CV"; tried "CV & Cover Letter" (too long) and "Papers" (not explicit enough)): two boxes side by side, each a paper-sheet preview with a download button. No contact section on that page; its Contact link goes to `index.html#contact`. Previews and PDFs are placeholders until the files arrive (plan: PDFs in `assets/docs/`, first-page preview as .webp). `cover-letter.html` is no longer linked.
- **Real documents added (2026-10-15):** originals moved to `private/` (git-ignored, never published). CV preview + download in `assets/docs/` with phone and address blurred (the PDF is image-only, so the hidden text is gone too; email kept). Two academic projects added, each on its own page with Laurie's text word for word: `project-qwf-pitch.html` (content pitch for the QWF) and `project-student-profile.html` ("No Map? No Problem!"). The profile's photo of the interviewee is left out until he agrees.
- **Project viewer:** the two academic project titles open `project-qwf-pitch.html` / `project-student-profile.html`, which show the original Word file (in `assets/docs/`) through Microsoft's online viewer, then View full screen · Download. CSP now allows `frame-src https://view.officeapps.live.com`. The viewer only works on the live site; locally the page shows a fallback message. Tried and dropped: PDF conversion (layout lost for the profile) and re-typed text pages (not the original look).
- **Page transitions:** cross-fade between pages (`@view-transition`), red bar stays still. Scroll position is handled by `js/reveal.js` (in every page's head) for all browsers: it remembers each page's position (refresh, Back/Forward), and whenever a page opens anywhere but the top it hides the content (bar stays visible) until the page + fonts are ready, scrolls, then shows it. Links to a #section also skip the fade. Needed because Safari painted the top of the page before jumping (on #projects links and on every refresh). Fonts use `font-display: block` + preload so text never jumps from the bigger Georgia fallback. Same-page links scroll smoothly via `js/main.js`.
