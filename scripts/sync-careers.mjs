// Saves the portal's current Careers content into src/data/careers.json, so the prerendered page
// (what search engines read) matches what is live. The API is the source of truth.
// If the API cannot be reached or answers with something unexpected, the saved file is left as it is
// and the build goes on, so a portal outage never blocks a deploy.
//   node scripts/sync-careers.mjs            from https://api.nandivex.in
//   CAREERS_API=http://localhost:4010 node scripts/sync-careers.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'careers.json');
const url = `${process.env.CAREERS_API || 'https://api.nandivex.in'}/public/careers`;

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.openRoles) || !Array.isArray(data.upcoming) || typeof data.statusTitle !== 'string') {
    throw new Error('unexpected response');
  }
  const current = JSON.parse(readFileSync(file, 'utf8'));
  const next = {
    // culture and process are not edited in the portal, so they stay as they are in the file.
    ...current,
    statusTitle: data.statusTitle,
    statusText: data.statusText,
    openRoles: data.openRoles,
    upcoming: data.upcoming,
  };
  writeFileSync(file, JSON.stringify(next, null, 2) + '\n');
  console.log(`Careers synced from ${url}: ${data.openRoles.length} open, ${data.upcoming.length} upcoming`);
} catch (e) {
  console.warn(`Careers not synced (${e.message}); keeping src/data/careers.json`);
}
