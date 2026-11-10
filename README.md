# NandiVex Technologies website

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
├── public/              # favicon, logo.svg, robots.txt, sitemap.xml, CNAME
├── src/
│   ├── main.jsx
│   ├── App.jsx          # routes
│   ├── index.css        # Tailwind + design tokens
│   ├── components/      # Layout (header/footer), ui helpers
│   ├── pages/           # one file per route
│   └── data/            # all site content (services, projects, careers ...)
├── docs/site-extract.md # notes from the original site
└── legacy/              # compiled build of the previous site, for reference only
```

Content lives in `src/data/*.json`, so copy changes do not need component edits.

## Deploy

Hosted on GitHub Pages. `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
It is a single-page app, so the workflow copies `index.html` to `404.html` so deep links work.
`public/CNAME` sets the custom domain `nandivex.in`.

## To do before launch

- Replace the placeholder logo (`public/logo.svg`) with the real brand mark.
- The contact form opens the visitor's email client (`mailto:`). Connect a form
  backend (Formspree, Resend, own API) for real submissions.
- Review `privacy-policy` and `terms-and-conditions`, which are short drafts.
- Add real phone, address and social links when available.
- Pages are client-rendered; add prerendering for stronger SEO if needed.
