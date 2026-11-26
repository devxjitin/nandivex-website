import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';

/** Renders one route to HTML for the build (see scripts/prerender.mjs). */
export function render(url) {
  globalThis.__pageMeta = {};
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
  return { html, meta: globalThis.__pageMeta };
}
