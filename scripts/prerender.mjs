// Writes a real HTML file for every page (dist/<route>/index.html) so GitHub Pages answers with
// status 200 and search engines see the content. Run after `vite build` and the SSR build.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(url) {
  const { html, meta } = render(url);
  let out = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const title = meta.title ? `${meta.title} | NandiVex Technologies` : null;
  if (title) out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  if (meta.description) {
    out = out.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(meta.description)}" />`);
  }
  return out;
}

// The pages are the ones listed in the sitemap and the home page. /contact is an old address that
// opens the contact section on the home page, so it gets the home page's content.
const sitemap = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const routes = new Set(['/']);
for (const m of sitemap.matchAll(/<loc>https:\/\/nandivex\.com([^<]*)<\/loc>/g)) routes.add(m[1] || '/');

for (const route of routes) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(route));
}
mkdirSync(join(dist, 'contact'), { recursive: true });
writeFileSync(join(dist, 'contact', 'index.html'), page('/'));
// Unknown and old redirecting addresses get 404.html (GitHub Pages sends it with a 404 status). It
// is the empty app shell, so the browser works out the right page, or a redirect, on its own.
writeFileSync(join(dist, '404.html'), template);
console.log(`Prerendered ${routes.size + 1} pages and wrote 404.html`);
