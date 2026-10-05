# Laurie — Portfolio

Laurie's personnal website portfolio.

Built in HTML/CSS/Javascript

## CI/CD

Every push and pull request runs the **CI/CD** workflow (`.github/workflows/ci-cd.yml`) on GitHub Actions:

1. **Check site** — validates the HTML, lints the CSS and JavaScript, builds the site into `dist/`, and checks that no internal links or files are broken.
2. **Deploy to Netlify** — runs only if the checks pass.
   - Push to `main` → the live site is updated.
   - Pull request → a preview site is deployed and its link is posted as a comment on the PR.

If a check fails, nothing is deployed and the live site stays as it was. Results are in the repo's **Actions** tab.

### One-time setup for deploying

1. **Netlify token:** in Netlify, go to *User settings → Applications → Personal access tokens → New access token*. Copy it.
2. **Site ID:** in Netlify, open the site, then *Site configuration → Site details* and copy the *Project ID* (Site ID).
3. In GitHub, go to the repo's *Settings → Secrets and variables → Actions → New repository secret*, and add:
   - `NETLIFY_AUTH_TOKEN` (the token)
   - `NETLIFY_SITE_ID` (the ID)
4. **Turn off Netlify's own auto-deploys** so it doesn't publish before the checks pass: *Site configuration → Build & deploy → Continuous deployment → Build settings → Configure → Stop builds*.

Until the secrets are added, the checks still run and the deploy step is skipped.

### Running the checks locally (optional)

Requires [Node.js](https://nodejs.org).

```bash
npm install
npm test        # lint + build + link check
```

## Security

- **Security headers** (`_headers`, applied by Netlify): a strict Content Security Policy that only allows the site's own scripts and Google Fonts, plus protection against clickjacking, MIME sniffing and referrer leaks. If you add a new outside service (an embed, analytics, a contact form), add its domain to the policy or the browser will block it.
- **CI/CD**: third-party GitHub Actions are pinned to exact commits, Netlify secrets are only given to the deploy steps, and only `main` can deploy to the live site.
- **Never commit secrets.** Tokens go in GitHub's *Settings → Secrets*, never in files. `.env` files are ignored by git.
- **Anything in `assets/` is public** once deployed, so don't put private documents there.
