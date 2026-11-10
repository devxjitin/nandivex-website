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

Content lives in `src/data/`, so copy changes do not need component edits.

## Adding content

| To add | Edit | Appears on |
|---|---|---|
| A service | `src/data/services.json` (add an object; put its icon in `components/Icons.jsx`) | Home, `/services`, `/services/:slug`, footer |
| A case study or product | `src/data/work.js` | Home, `/work`, `/work/:slug` |
| A client logo | drop the file in `public/clients/`, add it to `src/data/clients.js` | "Trusted by" strip, About, footer |
| An FAQ | `src/data/faq.js` | Home |
| A team member | `src/data/team.js` | About, `/team/:slug` |
| A nav link, process step, stat | `src/data/site.js` | Header, Home |

Old URLs (`/projects`, `/industries`, `/team`, retired service slugs) redirect to their new home in `src/App.jsx`.

## Deploy

Hosted on GitHub Pages. `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
It is a single-page app, so the workflow copies `index.html` to `404.html` so deep links work.
`public/CNAME` sets the custom domain `nandivex.in`.

## To do before launch

- Replace the generic Nirman Labs wording in `src/data/work.js` with the three assistants' names and details (see the TODO there).
- The contact form opens the visitor's email client (`mailto:`). Connect a form
  backend (Formspree, Resend, own API) for real submissions.
- Review `privacy-policy` and `terms-and-conditions`, which are short drafts.
- Add real phone, address and social links when available.
- Pages are client-rendered; add prerendering for stronger SEO if needed.
