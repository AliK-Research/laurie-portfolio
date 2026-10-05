# Laurie — Portfolio

Laurie's personnal website portfolio.

Built in HTML/CSS/Javascript

## Security

- **Security headers** (`_headers`, applied by Netlify): a strict Content Security Policy that only allows the site's own scripts and Google Fonts, plus protection against clickjacking, MIME sniffing and referrer leaks. If you add a new outside service (an embed, analytics, a contact form), add its domain to the policy or the browser will block it.
- **Never commit secrets.** Tokens and passwords never go in files. `.env` files are ignored by git.
- **Anything in `assets/` is public** once deployed, so don't put private documents there.
