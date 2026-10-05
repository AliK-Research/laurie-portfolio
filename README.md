# Laurie — Portfolio

Laurie's personnal website portfolio.

Built in HTML/CSS/Javascript

## Security

- **Security headers** (`_headers`, applied by Netlify): a strict Content Security Policy that only allows the site's own scripts, styles, fonts and images, plus protection against clickjacking, MIME sniffing and referrer leaks. If you add a new outside service (an embed, analytics, a contact form, web fonts), add its domain to the policy or the browser will block it.
- **Never commit secrets.** Tokens and passwords never go in files. `.env` files are ignored by git.
- **Anything in `assets/` is public** once deployed, so don't put private documents there.
- **Photos:** use the web-sized, metadata-free copies in `assets/img/`. Keep original camera files out of this folder.
- **Fonts** are hosted in `assets/fonts/` under the SIL Open Font License (`OFL.txt`).
