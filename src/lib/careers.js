import { useEffect, useState } from 'react';
import snapshot from '../data/careers.json';
import { site } from '../data/site.js';

/* The Careers page text is edited in the NandiVex portal and served by the API. The build saves a copy of it in
   src/data/careers.json (scripts/sync-careers.mjs), so the prerendered HTML already has the content for search
   engines. In the browser the page then asks the API for the latest, and keeps the saved copy if that fails. */

export const CAREERS_URL = `${import.meta.env.VITE_CAREERS_API || 'https://api.nandivex.in'}/public/careers`;

const text = (v) => (typeof v === 'string' ? v : '');
const list = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()) : []);

/** Returns the API response as { statusTitle, statusText, openRoles, upcoming }, or null if it is not that shape. */
export function parseCareers(data) {
  if (!data || typeof data !== 'object' || !Array.isArray(data.openRoles) || !Array.isArray(data.upcoming)) return null;
  const kind = (k) => (k === 'Internship' ? 'Internship' : 'Career');
  return {
    statusTitle: text(data.statusTitle),
    statusText: text(data.statusText),
    openRoles: data.openRoles
      .filter((r) => r && text(r.title))
      .map((r) => ({
        id: text(r.id) || text(r.title),
        kind: kind(r.kind),
        title: text(r.title),
        department: text(r.department),
        location: text(r.location),
        type: text(r.type),
        experience: text(r.experience),
        overview: text(r.overview),
        responsibilities: list(r.responsibilities),
        requirements: list(r.requirements),
        postedAt: text(r.postedAt),
      })),
    upcoming: data.upcoming
      .filter((r) => r && text(r.title))
      .map((r) => ({ kind: kind(r.kind), title: text(r.title), blurb: text(r.blurb), skills: list(r.skills) })),
  };
}

/** The saved copy first, then the API's latest. Culture and process stay in the file. */
export function useCareers() {
  const [live, setLive] = useState(null);
  useEffect(() => {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    fetch(CAREERS_URL, { signal: ctl.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const parsed = parseCareers(data);
        if (parsed) setLive(parsed);
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => { ctl.abort(); clearTimeout(timer); };
  }, []);
  return { ...snapshot, ...(live || {}) };
}

/** Google for Jobs data for the open roles. Returns a JSON string safe to put inside a script tag, or '' if none are open. */
export function jobPostingsJson(openRoles) {
  if (!openRoles.length) return '';
  const graph = openRoles.map((r) => {
    const place = r.location || 'India';
    const job = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: r.title,
      description: [r.overview, r.responsibilities.length ? `Responsibilities: ${r.responsibilities.join('; ')}.` : '', r.requirements.length ? `Requirements: ${r.requirements.join('; ')}.` : ''].filter(Boolean).join('\n\n'),
      datePosted: (r.postedAt || '').slice(0, 10) || undefined,
      employmentType: employmentType(r),
      hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: site.url, logo: `${site.url}/logo.png` },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: place, addressCountry: 'IN' } },
      directApply: false,
      url: `${site.url}/careers`,
    };
    return job;
  });
  return JSON.stringify(graph).replace(/</g, '\\u003c');
}

function employmentType(r) {
  if (r.kind === 'Internship') return 'INTERN';
  const t = r.type.toLowerCase();
  if (t.includes('part')) return 'PART_TIME';
  if (t.includes('contract')) return 'CONTRACTOR';
  if (t.includes('intern')) return 'INTERN';
  return 'FULL_TIME';
}
