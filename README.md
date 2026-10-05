# Laurie — Portfolio

A personal portfolio for a creative writing student, laid out like a small book: a title page, a table of contents, and five chapters.

| Chapter | What goes there |
|---|---|
| I. Prologue | A short introduction in her own voice |
| II. Selected Works | Fiction, poetry and essays with a pull quote and an excerpt you can expand (filterable) |
| III. On Craft | Skills, written as a glossary |
| IV. Marginalia | Personality: sticky notes and a "commonplace book" of quotes |
| V. Epilogue | Contact ("Send a letter" wax seal) and links |

Extra touches: a night reading mode (the moon/sun "lamp" button), a typewriter line on the title page, footnotes that appear on hover, and a gentle fade-in as you scroll. Motion turns off for anyone with "reduce motion" enabled.

## Built with

Plain HTML, CSS and JavaScript, with no build step. Open `index.html` in a browser to preview it.

```
index.html
css/style.css
js/main.js
assets/        ← put photos or PDFs here
```

## To personalize

All text is placeholder copy and needs replacing with Laurie's own:

- **index.html**: the prologue text, the works (titles, quotes, excerpts), the craft entries, the notes, the email in `mailto:`, and the social links (`href="#"`).
- **js/main.js**: the `lines` (typewriter) and `quotes` (commonplace book) arrays.
- **css/style.css**: colors live in `:root` at the top (`--accent` is the oxblood color).

To add a work, copy one `<article class="work">` block and set `data-kind` to `fiction`, `poetry` or `essay`.

## Publishing

The repository is private. Free GitHub Pages hosting needs a public repository (or a paid GitHub plan). Other options are Netlify or Vercel, where you can drag in the folder or connect the repo.
