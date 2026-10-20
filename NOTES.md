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
- **Contact:** the red "Write to Laurie" seal was dropped. Tried a pile of books lying on their side (one per contact): dropped, the user found it "funky". Then a list (small-caps label + italic handle, brass rules): dropped, the user didn't like it. Then one line of links: "too plain". Showed 3 mockups (letter, catalogue card, postcard; in `_mockups/`, not published). Now: a contact form on a sheet of letter paper (name, email, message; Netlify Forms, honeypot spam trap, sends to `thanks.html`) + "Or write directly · Email · LinkedIn". Instagram dropped.
- **CV + Cover Letter merged** into one page (`cv.html`, nav label "CV"; tried "CV & Cover Letter" (too long) and "Papers" (not explicit enough)): two boxes side by side, each a paper-sheet preview with a download button. No contact section on that page; its Contact link goes to `index.html#contact`. Previews and PDFs are placeholders until the files arrive (plan: PDFs in `assets/docs/`, first-page preview as .webp). `cover-letter.html` is no longer linked.
- **Real documents added (2026-10-15):** originals moved to `private/` (git-ignored, never published). CV preview + download in `assets/docs/` with phone and address blurred (the PDF is image-only, so the hidden text is gone too; email kept). Two academic projects added, each on its own page with Laurie's text word for word: `project-qwf-pitch.html` (content pitch for the QWF) and `project-student-profile.html` ("No Map? No Problem!"). The profile's photo of the interviewee is left out until he agrees.
- **Project viewer:** the two academic project titles open `project-qwf-pitch.html` / `project-student-profile.html`, which show the original Word file (in `assets/docs/`) through Microsoft's online viewer, then View full screen · Download. CSP now allows `frame-src https://view.officeapps.live.com`. The viewer only works on the live site; locally the page shows a fallback message. Tried and dropped: PDF conversion (layout lost for the profile) and re-typed text pages (not the original look).
- **Page transitions:** cross-fade between pages (`@view-transition`), red bar stays still. Scroll position is handled by `js/reveal.js` (in every page's head) for all browsers: it remembers each page's position (refresh, Back/Forward), and whenever a page opens anywhere but the top it hides the content (bar stays visible) until the page + fonts are ready, scrolls, then shows it. Links to a #section also skip the fade. Needed because Safari painted the top of the page before jumping (on #projects links and on every refresh). Fonts use `font-display: block` + preload so text never jumps from the bigger Georgia fallback. Same-page links scroll smoothly via `js/main.js`.
- **Contact fits one screen:** the section is exactly one screen tall under the red bar (bar height measured in `js/main.js` → `--nav-h`). Computers: intro + direct links left, form right. Phones: stacked, compact on short screens. Checked 360×700 → 1440×900.
- **"Projects" renamed "Work / Projects"** (tried plain "Work" first; heading, top bar, `#work` anchor, "← All work"); columns are now *Academic* and *Personal*. Old `#projects` links no longer exist.
- **Title page fits one screen** on computers and wide tablets (≥ 56rem wide): name, photo and bio sizes follow the screen height. Checked 920×640 → 1920×1080. Phones: left as a normal scrolling page (the full bio can't fit with the photo; user chose not to fold it).
- Title-page photo enlarged (~14%, scales with screen height; slightly smaller on very short screens). Contact content moved up: now sits ~50–70px under the bar instead of centred.
- **Last screen = section + © footer:** footer made compact and measured (`--footer-h` in `js/main.js`). CV page (documents + footer) fits one screen with no scrolling on computers/tablets (previews shrink with screen height); phones stack the two documents and scroll. Home: contact + footer fill exactly the last screen on every size incl. phones; contact content now ~12–30px under the bar.
- **Project pages:** the big Microsoft viewer box was replaced by a short description of the work + "Read online · Download". Read online opens Microsoft's viewer in a new tab on the live site (no iframe, so the `frame-src` CSP exception was removed). Pages fit one screen with the footer.

## 2026-10-15 · Canva cover + About Me

- **New first screen ("cover")**, copied from the user's Canva slide *Red and White Creative Portfolio*: bright red sheet (`--scarlet`), fine cream lines (`--cream`), top row *Creative Writer · 2026 · Québec City · Montréal*, big italic **Creative** + **PORTFOLIO**, bottom row *Presented by Laurie Legault · ● ● ● · Contact / Write to Laurie*, then a photo band.
  - Fonts closest to the Canva ones, self-hosted: Playfair Display 800 italic ("Creative") and Montserrat (labels, "PORTFOLIO"). This breaks the "no sans-serif headlines" rule on purpose — the user asked for an exact copy of the slide, fonts included.
  - Text swapped from the template: "Fashion designer" → Creative Writer, "2028" → 2026, "@reallygreatsite" → Québec City · Montréal (no handle yet), "Website" → Contact link.
  - **Photo band is a placeholder** (plain beige). To add it: `assets/img/cover-photo.webp`, then uncomment the url line under `.cover__photo` in `css/style.css`.
- **Old title page → "About Me"** section (`#about`): bio on the left, framed photo on the right (photo under the bio on phones). The big name/subtitle/place heading was removed (the cover carries the name now). "About" added to the nav on every page.
- **Nav bar fused with the cover's top row:** the red bar on every page now looks like the slide's top row (`--scarlet`, cream line underneath, Montserrat small spaced capitals, name "LAURIE LEGAULT" on the left, links on the right, full width so it lines up with the cover text). The cover's own top row (*Creative Writer · 2026 · Québec City · Montréal*) was removed. Dropped: the old wine bar with the Cormorant "Laurie *Legault*" name.
- The bar keeps the slide's two thin cream lines (one above, one below) with a strip of red above the first, like the original top row.
- Bar corrected against the Canva image: the two vertical cream lines now run through the bar from its very top edge (as on the slide), the bar is thinner, and the red is the slide's exact red (`#7a0000`). `--line` and `--inset` are now shared tokens in `:root`.
- Nav: the current page (e.g. Home) is no longer underlined, just brighter; underline only on hover / keyboard focus.
- Cover title changed from *Creative Portfolio* to *Writer Portfolio*.
- **Cover photo band filled** with the user's photo of ivy-covered brick walls (`11594.jpg`). The original contained GPS location, so it was moved to `private/cover-photo-original.jpg` (never published); the site uses clean copies without metadata: `assets/img/cover-photo-1920.webp` (computers) and `cover-photo-1200.webp` (phones).
- Photo band made taller (about 38% of the screen instead of 26%) to show more of the ivy photo; the title shrinks slightly so everything still fits one screen.
- Cover bottom row: *Presented by Laurie Legault* and *Contact / Write to Laurie* replaced by *Writer* (left) and *Montréal · Québec* (right); the dots stay in the middle.
- **About Me rebuilt after the second Canva slide:** white sheet (`--white`), fine red lines (top row between two lines, left line full height, right line down to the photo), top row *Writer · 2026 · Montréal · Québec*, "About Me" in Playfair Display 800 italic red, bio in Montserrat (red, justified; left-aligned on phones), three red dots, and Laurie's photo flush to the right edge and the bottom (cropped to fill). Bio text unchanged. Fits one screen on computers/tablets (checked 900×700 → 1440×900); phones stack text then photo. Dropped: the framed "plate" portrait, the drop cap and the book-serif bio. Added Montserrat 400 (regular + italic).
- About Me adjusted: back to the parchment background (white sheet dropped), top row *Writer · 2026 · Montréal · Québec* removed, photo narrower (about 42% of the width instead of 54%; 36% on tablets). Left red line kept.
- About Me: white background (`--white`) back at the user's request; left red line removed.
- About Me: the empty top band is back (two fine red lines, no text) with the right-hand line running down to the photo, as on the slide. Left line stays off.
- About Me: left red line (full height) restored, as on the slide.
- **CV & cover letter moved onto the home page** (`#cv`, between Work and Contact), after the third Canva slide (*Working Experiences*): striped red sheet (`--scarlet`, title-page fonts), "LAURIE LEGAULT" top-left, 2026 top-right, big **Working** / EXPERIENCES, two cream sparkles, and on the right two tilted sheets of paper running off the bottom edge: the CV preview on top (blurred phone/address, opens the PDF; lifts on hover/focus), the cover letter behind it (placeholder sheet until the PDF arrives). Bottom-left: *CV & Cover Letter* with View CV · Download CV · Cover letter: coming soon. Every "CV" nav link now points to `index.html#cv`; `cv.html` is no longer linked.
- **Deleted `cv.html`** (user approved) and the styles only it used (document boxes, paper previews, placeholder sheet, `.placeholder`). Kept `.page--wide`, `.page--fit` and `.doc-card__links`, still used by the two project pages.
- Section order on the home page is now: cover · About · **CV & Cover Letter** · Work / Projects · Contact. The nav follows the same order on every page (Home · About · CV · Work / Projects · Contact).
- CV section: removed "Laurie Legault" (top-left), "2026" (top-right) and "Click a page to open it".
- CV sparkles: thinner points; the right one moved up onto the red (it was lost on the cream cover-letter sheet).
- CV sparkles even thinner; right one moved to the bottom-right corner. Stripes: darker bands now twice as wide as the lighter ones.
- CV: sparkles thinner again; darker stripes now 4 times as wide as the lighter ones.
- CV: stripes removed (plain title-page red); "Working Experiences" moved down, centred in the space above the links.
- **Section frame on CV, Work and Contact** (like About Me): an empty band between two lines at the top (edge to edge) and a vertical line on each side. Reusable: add `class="framed"` to a section (`framed--light` = cream lines on red). Tokens `--line-red` and `--band-h` now in `:root`. Contact tightened on short screens so it still fits one screen with the footer (checked 360×700 → 1440×900).
- CV: its top band now sits on the white (continuing About Me), red lines; the red starts right under the band.
- Fix: an earlier edit had put the CV section's top padding on the cover by mistake (extra space above "Writer Portfolio"); the cover is back to how it was and the padding is now on the CV section.
- CV band back on the red (cream lines) above the papers; About Me now ends with a strip of white under the photo.
- About Me: the right red line now also shows in the white strip under the photo (computers/tablets).
- **Work / Projects removed from the home page** (and from the nav on every page), to be redone elsewhere later. Its HTML is in the git history of `index.html`; its CSS is kept (marked unused). The two project pages still exist; their "← All work" link now says "← Home".
- CV links: "Download CV" removed; now *View CV* · *View Cover Letter*, underlined only on hover/focus. View Cover Letter is greyed out (not a link) until the PDF arrives.
- Contact: same fonts as the other sections (heading in Playfair Display bold italic, text/labels/links/button in Montserrat, all in the title-page red; footer in Montserrat too). "Or write directly" removed.
- Contact: "Write to Laurie" kept on one line at every width (the text column takes the width of the heading, the form takes the rest).
- Footer (home page): framed like the sections, so the band and side lines run to the very bottom; "Home" underlined only on hover/focus (all pages).
- Footer: "© 2026 Laurie Legault · Home" now sits inside the band, between the two bottom lines.
- Footer text written like the title-page rows: small spaced capitals in red (© 2026 LAURIE LEGAULT · HOME).
- **Fade in on scroll:** About, CV, Contact and the footer fade in (and rise slightly) the first time they come into view. Add `class="fade"` to any section to give it the effect. Switched on in `js/reveal.js` (head, before first paint, so nothing flashes) and run by `js/main.js`; without JavaScript everything is simply visible. Reduced motion: fade only, no movement. The title page is not faded (it is the first screen).
- Fade-in now replays: a section that has fully left the screen resets, so it fades in again each time you scroll back to it.
- Fade-in only when scrolling down (sections reset only after leaving through the bottom; scrolling up shows them straight away). Slower: 1.6 s.
- Fix: About Me did not fade again after going back to the top: at the top of the page it sits exactly on the bottom edge of the screen, which the browser still counts as "on screen", so it never reset. Sections now reset as soon as none of them is visible below.
- Fix 2: a section now resets when less than 5% of it is still showing at the bottom (About Me can keep a thin sliver on screen at the top of the page, depending on the screen).
- **Contact form sends in place:** pressing Send posts the message to Netlify Forms in the background and replaces the form with the same sheet of paper reading *Thank you!* / "I'll be in contact soon." (title-page fonts and red). If that fails, or without JavaScript, it falls back to `thanks.html` as before. Only works on the live site (Netlify receives the messages).
- Contact form never opens another page now: on failure a short note appears under Send. When the site is opened as a file on the computer, Send just shows the thank-you note (preview only, nothing is sent).
- Thank-you card cropped close around the message (no longer the size of the form).
- Thank-you card now appears centred exactly where the form was; the form's space is kept so nothing else on the page moves.
- Thank-you card back to the full size of the form box (message centred inside).
- Contact form: red * after Your name, Your email and Message; the browser's "Please fill in this field" pop-ups are replaced by a red note left of Send, "Please fill all the required fields." (empty fields and a malformed email get a red underline). The note disappears once everything is filled in.
- Contact: asterisks removed (red note kept); thank-you card appears instantly (no fade).
- Nav: "About" renamed "Bio" (shows as BIO); the section heading still says "About Me". The two project pages (project-qwf-pitch.html, project-student-profile.html) were deleted by the user; nothing links to them. Their Word files are still in assets/docs/.
- Asterisks back on Your name, Your email and Message.
- **New page `more-about-me.html`** (blog-like, "More About Me"), linked from a "More about me →" link next to the three dots in About Me. White sheet with the section frame, back link to Bio, title, intro, then entries newest first (date · label, title, text); each entry fades in. Adding an entry = copy one `<article class="entry">` block. Entries and intro are placeholders until Laurie writes them.
- More About Me reworked: parchment background (like Contact), no band, no side lines, no lines between entries; one centred column where text and pictures follow each other (`<figure class="entry__img">`, with an optional caption). Titles and dates centred, paragraphs left-aligned. Footer plain (same small red capitals, no band). Example picture = the ivy cover photo (placeholder).
- About Me link now reads "Read more about me" (no arrow).
- More About Me: side lines back (full height, no top band), footer back in its band, second example entry removed.
- More About Me page title now "A Closer Look at Who I Am" (heading and browser tab).
- More About Me: all example text replaced by the words "Placeholder text" (intro, date line, entry title, caption, paragraph).
- **New Projects page (`projects.html`)**, after the Canva "featured works" slide: not on the home page, reached from **Projects** in the top bar (between Bio and CV, on every page). Dark sheet (`--night`), big italic lowercase titles in Playfair Display (*academic works*, then *personal projects*), a row of cards (picture, small capitals title + category, short text) with a bigger, higher middle card that shows only its title, and a small row at the bottom (Laurie Legault · Page 01/02 · Academic/Personal). Texts are the ones from the old Work section. Pictures are dark placeholders until real ones are added. Phones: big card on top, two cards per row.
- Removed leftover styles from the deleted project pages and the old Work section.
- Fade fix: only the contents of a section fade in now; its background colour is there from the start, so no beige flash between sections.
- Projects titles capitalised: "Academic works", "Personal projects".
- Projects: all cards the same size (the middle one is no longer bigger or higher); a card grows slightly on hover.
- Projects page: cream side lines (like the CV section) down both sides, through both parts and the footer.
- Projects: "Page 01/02" removed from the bottom rows; footer back to how it was (no side lines through it).
- Projects: side lines run down to the very bottom (through the footer); the faint line across the top of the footer removed.
- Fix: Projects footer text back to cream (it had picked up the red text and band of the framed footer).
- Projects footer: the text now sits in a band between two cream lines (like the home page footer), cream text.
- Top bar is dark on the Projects page; its colour fades (0.9 s) from red to dark when arriving there and back to red when going to another page. Handled in js/reveal.js (remembers the last bar colour for the visit) + CSS keyframes. No fade with reduced motion.
- **No more flash when jumping to a section from another page** (e.g. Projects → Bio/CV/Contact): in browsers with `pagereveal` (recent Chrome, Edge, Safari) `js/reveal.js` now scrolls to the section just before the page is first shown and keeps the cross-fade, instead of skipping it and hiding the page (which showed the bare beige page for a moment). Older browsers, refresh and Back/Forward keep the previous hide-then-show method. Checked: Projects → Bio/CV/Contact land exactly under the bar; refresh and Back restore the position.
- **Bands → single lines:** every two-line band between sections (top of About, CV, Contact, and above the footer text on all pages) is now a single line. The top bar keeps its two lines. Section content starts a little higher; everything still fits one screen (checked 360×700 → 1280×800).
- Fade-in never plays when scrolling up: sections above the screen (e.g. after arriving at Contact from another page) are shown straight away, without fading.
- Contact: Email and LinkedIn links slightly bigger (.95rem → 1.05rem).
- More About Me: intro now "Under construction, check it again soon!"; the other placeholder texts removed (their places kept as comments in the file); the ivy picture kept.
- Projects: the Quebec Chronicle Telegraph English Prize removed from Academic works (to go in a future Awards section). Its text: Award — "Won by the time she graduated high school."
- **Project pages** (`project-qwf-pitch.html`, `project-student-profile.html`), opened by clicking a card on Projects (the whole card is the link; Sandhill Cranes has no page yet). Dark like Projects (bar dark too): first page of the work on the left, on the right the course as title, the work · type, the date, a short purpose and a skills list. The cards now show that first page as their picture.
  - Pitch: PDF in `assets/docs/laurie-legault-qwf-pitch.pdf` (click the preview or "Read the full work"). Course: ENGL396 — Content Creation (all works so far are from this course); date shown as written on the pitch, 12-07-2026.
  - Profile: course ENGL396 — Content Creation, 2026-09-12 (from the PDF). **The interviewee's photo is blurred in the preview and the full PDF is kept in `private/`** until he agrees.
  - Purpose and skills texts on both pages are **drafts to confirm with Laurie**.
  - Note: `assets/docs/laurie-legault-student-profile.docx` (already committed) contains the interviewee's photo; it is no longer linked anywhere.
- Removed `assets/docs/laurie-legault-qwf-pitch.docx` and `laurie-legault-student-profile.docx` (the latter contained the interviewee's photo). Identical copies stay in `private/`.
- Profile preview: interviewee photo no longer blurred (user's decision). The full profile PDF is still in private/.
- Profile: full PDF now published (`assets/docs/laurie-legault-student-profile.pdf`), opened from the preview or "Read the full work", like the pitch.
- Projects: Personal projects + footer fill exactly one screen.
- Projects fit check: each part fills one screen (Personal projects together with the footer) on computers and tablets (checked 900×700, 1024×600 → 1440×900); cards and titles shrink on short screens. Phones: Personal + footer fit one screen; Academic scrolls (2 cards per row).
- Projects: Sandhill Cranes moved first in Academic works.
- Projects: the Wattpad card shows the Wattpad "W" logo (Simple Icons, CC0; brand orange #FF500A) centred in its box.
- Project pages show only the year (2026). Sandhill Cranes removed from Projects (for a future Awards section: short story published in *Arrival*, Humber College’s student-run literature and art magazine).
- Projects: "A Collection of Short Stories" card shows the first page of `Book  Cover_minimalist.pdf` (cover of *I woke up one day, and the world continued without me*) as `assets/img/short-stories-cover.webp`, shown whole in its box.
- Short stories card: the cover now fills the box (top of the photo trimmed, title kept).
- Short stories card: back to the whole cover standing in the box (filling it with a crop was tried and dropped).
- **Short stories page (`project-short-stories.html`)**: the "A Collection of Short Stories" card is now a normal card (category "In progress", one line of text) linking to its own dark page: the book cover on the left; on the right the collection title *I woke up one day, and the world continued without me*, "A collection of short stories · In progress" and a description in Laurie's own words from her bio (to confirm). The cover PDF has 3 cover designs and no story text; it stays unpublished in the main folder.
- **New Awards page (`awards.html`)**, same style as Projects (dark sheet, italic title, cards), one screen with the footer; **Awards** added to the top bar between Projects and CV on every page (bar dark there too). Cards: *Sandhill Cranes* (short story, published in *Arrival* no. 4; the card opens https://www.arrivalmagazine.org/arrival-issues/no4-fiction-legault in a new tab; picture = the crane plate the user gave, `assets/img/sandhill-cranes.webp`, original moved to `private/`) and the Quebec Chronicle Telegraph English Prize (picture placeholder).
- Phones: card text left-aligned instead of justified.
- Awards: the crane picture is shown whole in its box (no crop), like the book cover.
- Awards: the line under the Quebec Chronicle Telegraph English Prize removed.
- Awards: the prize card shows the certificate (photo turned upright, metadata removed: `assets/img/qct-english-prize.webp`; original in `private/`), whole in its box. Certificate details: Prize for Proficiency in the Secondary Five English Program, Dollard-des-Ormeaux School, June 2019.
- Awards: the prize card opens the full certificate (`assets/img/qct-english-prize-full.webp`) in a new tab.
- Contact form: spam-trap field renamed "company" → "bot-field". Browsers can autofill a "company" field (organisation), which made Netlify silently discard real messages as spam.
- **Contact form moved from Netlify Forms to Web3Forms** (Netlify's email notifications need the Pro plan; Web3Forms free = 250 messages/month, each emailed to Laurie). The form posts to `https://api.web3forms.com/submit` with the public access key; spam trap = hidden `botcheck` checkbox; no-JS fallback posts directly and returns to `thanks.html`. **New outside service in `_headers`:** `https://api.web3forms.com` added to `connect-src` and `form-action`. Tested locally: the page reaches Web3Forms (spam-trap test rejected as expected, no email sent), and the success/failure screens work. Netlify form detection can be switched off.
- **Email button:** the `mailto:` link was fine, but it does nothing visible for visitors with no mail app set up (e.g. Gmail in the browser). Clicking Email now also shows the address under the links and copies it ("(copied)" is added when the copy worked). `js/main.js` + `.contact-copied` in the CSS.
- Student profile skills: "Choosing quotes and shaping a story" → "Finding an angle, choosing quotes, and shaping a story".
- Short stories page: new description from the user (two paragraphs, word for word; "Québecois" kept as written).
- **New page `project-wattpad.html`** (Wattpad logo on the left, 2014–2019, the user's description); the Wattpad card on Projects now opens it.
- **Award pages**, same layout as the project pages: `award-sandhill-cranes.html` (crane plate, "Read it in Arrival" link) and `award-qct-english-prize.html` (certificate, 2019, link to the full certificate). The Awards cards now open these pages instead of the outside link / the certificate. Bar stays dark on them (`js/reveal.js`). Texts are drafts from facts already on the site; to confirm with Laurie.
- Wattpad page: the logo now sits on the same dark box as its card on Projects (was cream paper), so it looks the same everywhere.
- Email button (after a test on Windows): clicking Email no longer tries to open a mail app; it shows the address (itself a mailto: link) and copies it. Without JS it is still a plain mailto: link.
- Project pages: the back link returns to its own section of Projects ("← Academic works" → projects.html#academic, "← Personal projects" → projects.html#personal) instead of "← All projects" at the top.
- "Personal projects" renamed "Personal works" (Projects title, back links, page description).
- Sandhill Cranes page: italic caption under the crane picture with its credit, as given in Arrival: *Hooping Crane*, by Robert Havell after John James Audubon. Courtesy National Gallery of Art, Washington. Alt texts (page + Awards card) updated to match.
- Wattpad logo: back on cream paper, on both the Projects card and its page (the dark box felt off). Same paper as the Pitch and Student profile cards.
- Book cover and Awards cards: dark box behind the picture removed; the picture stands alone (same size and place).
- Pictures in cover/Awards cards: centred in their space again (bottom-aligned was tried; the wide certificate then sat lower than the crane).
- Links: "Read the full work" → "View the work", "See the full certificate" → "View the certificate".
- All "work-detail__links" link texts are now just "View" (pitch, profile, certificate); Sandhill Cranes keeps "Read it in Arrival".
- README: Security section removed; link to the live site (https://laurie-legault.netlify.app) added.
- Cover photo band: while the photo loads it now shows the cover red (--scarlet) instead of the olive green #6b6a3c, and the photo is preloaded in the <head> (1920 or 1200 version depending on the screen) so it appears sooner.
- Sandhill Cranes page: crane picture a little smaller (max 22rem, and its height leaves room for the caption), so the page fits one screen. Checked 1024×768, 1280×680, 1280×800, 1366×768, 1440×900.
- Email: the shown address fades away (0.8 s) 3 s after the click; it waits while the mouse or keyboard is on it; clicking Email again shows it again. Reduced motion: it just disappears.
- Email: the address line keeps its space when hidden (visibility instead of display:none), so the "Write to Laurie" text no longer moves when it appears or fades.
- **New academic work: Novel Writing** (formal course proposal for ENGL 427 Novel Writing, a 14-slide deck). PDF in `assets/docs/laurie-legault-course-proposal.pdf`, first slide as `course-proposal-preview.webp`. Card on Projects (Academic works, shown whole since it's a wide slide) opens `project-course-proposal.html` (same layout as the other project pages; wide preview; course ENGL396 — Content Creation like the other works; 2026). Purpose and skills are **drafts to confirm with Laurie**.
- **Awards: Dean's List** card ("Honour"): "Named to the Dean's List for both of her years at Concordia University." No picture, so the card shows a cream sheet with *Dean's List* / CONCORDIA UNIVERSITY (`.work__img--note`). No page of its own yet. Exact years to confirm.
- Awards: the Dean's List card opens https://www.concordia.ca/artsci/about/awards/deans-list.html in a new tab, scrolled to and highlighting "Laurie Legault" (text-fragment link; Chrome/Edge/Safari). The page currently shows the 2024–2025 list, where her name appears.
- Dean's List card text: "Named to the Dean’s List during her time at Concordia University."
- Dean's List link now points to a permanent Internet Archive snapshot (20 Oct 2026) of the 2024–2025 list, still highlighting her name; the live Concordia page changes every year. Backup screenshots (heading + her name) in `private/` (not published).
- Dean's List card back on the official Concordia page (user's choice); the Internet Archive copy is kept as a note in awards.html for when the list changes.
- Dean's List card: the cream sheet is smaller (78% of the box, centred, with a shadow, no box behind), like the crane and certificate pictures; title slightly smaller.
