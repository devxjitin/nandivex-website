# Nandivex Website

Source for https://nandivex.in: React 18, Vite 5, React Router 6, Tailwind CSS 3.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output in dist/
npm run preview   # serve the production build
```

## Structure

```
.
├── index.html
├── public/              # favicon, logo.svg, robots.txt, sitemap.xml, _redirects
├── src/
│   ├── main.jsx
│   ├── App.jsx          # routes
│   ├── index.css        # Tailwind + design tokens
│   ├── components/      # Layout (header/footer), Markdown renderer, ui helpers
│   ├── pages/           # one file per route
│   └── data/            # all site content (services, projects, blog, careers ...)
├── docs/site-extract.md # notes from the original site
└── legacy/              # compiled build of the previous site, for reference only
```

Content lives in `src/data/*.json`, so copy changes do not need component edits.

## Deploy

It is a single-page app, so the host must rewrite all paths to `index.html`.
`public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.

## To do before launch

- Replace the placeholder logo (`public/logo.svg`) with the real brand mark.
- The contact form opens the visitor's email client (`mailto:`). Connect a form
  backend (Formspree, Resend, own API) for real submissions.
- Review `privacy-policy` and `terms-and-conditions`, which are short drafts.
- Add real phone, address and social links when available.
- Pages are client-rendered; add prerendering for stronger SEO if needed.
