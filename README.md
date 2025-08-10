# Sabzyad (Hugo)

Multilingual (FA / EN-ready) learning platform built with Hugo. Features a lesson SPA, course progress tracking (consent‑aware), search with sitemap fallback, dark/light theme, responsive RTL design, and GitHub Actions deployment.

## Features
- 🇮🇷 RTL Persian primary language (easy to add more)
- 📚 Course & lesson SPA (`learn.js`) with dynamic loading
- ✅ Progress tracking (gated by cookie consent)
- 🌓 Theme toggle with system preference fallback
- 🔍 Client search (index.json + sitemap crawler fallback)
- 🔒 Basic GDPR-style cookie consent banner
- 📱 Fully responsive layout, sidebar collapse, focus mode
- 🚀 GitHub Actions workflow for build & (main branch) deploy
- 🛡 Security considerations started (sanitization, future CSP ready)

## Project Structure
```
.
├─ hugo.toml                # Root Hugo config
├─ content/                 # Site content (fa/ courses, posts, etc.)
├─ layouts/                 # Project-level layouts (overrides)
├─ themes/sabztheme/        # Theme (most templates, assets)
│  ├─ assets/css            # SCSS (compiled via Hugo Pipes)
│  ├─ assets/js             # JS (learn.js, site scripts)
│  ├─ layouts               # Partials, single/list templates
│  └─ ...
└─ .github/workflows        # CI/CD workflow
```

## Prerequisites
- Hugo Extended (for SCSS) v0.120+ recommended
- Node (optional) only if you later add tooling; not required now

## Run Locally
```fish
hugo server -D --disableFastRender --bind 127.0.0.1 -p 1314
```
Flags:
- `-D` include drafts
- `--disableFastRender` ensures proper rebuilds while editing JS/CSS

Visit: http://localhost:1314/

## Build
```fish
hugo --minify
```
Public output in `public/`.

## Deployment
GitHub Actions workflow (`.github/workflows/hugo-deploy.yml`):
- Runs build & checks on all branches / PRs
- Deploys (Pages) only when branch == `main`

Adjust `baseURL` in `hugo.toml` for production.

## Cookie / Consent Logic
- Banner partial: `themes/sabztheme/layouts/_partials/cookie-consent.html`
- Key stored: `cookieConsent:choice:v1`
- Optional storage (progress, prefs, theme) only after Accept.
- To reset: footer button “مدیریت کوکی‌ها” or run in console:
```js
localStorage.removeItem('cookieConsent:choice:v1'); location.reload();
```

## Progress Tracking
Stored per course under keys like:
```
courseProgress:/fa/courses/python
learnPagePrefs
```
(Only when consent accepted.)

## Search
1. Tries `/fa/index.json` (or `/index.json` for other langs)
2. If small / missing, crawls sitemap and scrapes titles + descriptions client-side.

## Adding Content
Create course lessons under:
```
content/fa/courses/<course>/<n>-<slug>.md
```
Front matter recommended fields:
```
---
title: "درس ۱: مقدمه"
weight: 10
duration: "5 دقیقه"
section: "بخش ۱"
---
```
`weight` controls ordering.

## The Lesson SPA
File: `themes/sabztheme/assets/js/learn.js`
Responsibilities:
- Load lesson list (injected JSON in template)
- History API navigation
- Mark completion & compute progress
- Sidebar collapse / focus mode

## Theming / Styling
- Core variables: `themes/sabztheme/assets/css/main.scss`
- Breakpoints & RTL utilities inside `utils/` folder.
- Learn page has dedicated SCSS (`pages/learn.scss`) if present (not imported globally to prevent conflicts).

## Security Notes
Implemented:
- Consent gating for optional storage
- Preparation for moving inline scripts to external (partially reverted)
Planned (suggested):
- Strict CSP header (script-src 'self') after externalizing all JS
- Additional headers: `Permissions-Policy`, `Strict-Transport-Security`
- Sanitization of dynamically injected HTML (add if re‑enable remote fetch rendering)

## Customization Quick Tips
| Task | Where |
|------|-------|
| Add social links | `hugo.toml` params.social.* |
| Change colors | CSS variables in `main.scss` |
| Edit footer | `layouts/_partials/footer.html` (or theme equivalent) |
| Edit cookie text | `_partials/cookie-consent.html` |
| Add new language | `config` language block + create `content/<lang>` |

## Common Issues
| Symptom | Fix |
|---------|-----|
| Cookie banner not styled | Ensure CSS for `.cookie-consent` in `scripts.html` or move to SCSS |
| Progress not saving | Accept cookies; check localStorage keys |
| CORS lesson fetch in dev | Keep lesson URLs relative (already normalized) |
| Search returns little | Wait for sitemap fallback crawl (up to first 60 URLs) |

## Contributing
1. Fork / branch
2. Run local server
3. Commit with clear messages (fa or en)
4. PR against main

## License
Project license not specified yet. Add a LICENSE file (MIT recommended) if you plan open-source distribution.

## Roadmap (Ideas)
- Externalize remaining inline JS for CSP
- Granular cookie categories (analytics vs preferences)
- Offline caching (Service Worker)
- Build-time search index with Lunr or Fuse
- Automated Lighthouse CI summary

---
Generated and maintained with AI assistance.
