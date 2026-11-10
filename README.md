# Nandivex Website

Existing production build of https://nandivex.in (React + Vite SPA, compiled output), kept as the main site.

## Structure

```
.
├── index.html        # SPA entry
├── assets/           # Compiled JS/CSS bundles (hashed)
├── favicon.png
├── robots.txt
├── sitemap.xml
└── docs/
    └── site-extract.md   # Content, sitemap, brand and redesign notes
```

## Run locally

SPA routes need an index.html fallback:

```bash
npx serve -s .
```

## Known issues

- Logo `/src/assets/logo/nandivex-shield.png` is referenced in the bundle but not served (returns HTML), so the logo is broken on the live site too.
- `robots.txt` and `sitemap.xml` point to nandivex.com, not nandivex.in.
