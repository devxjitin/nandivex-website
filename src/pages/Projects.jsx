import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import { CTA, PageHeader, useMeta } from '../components/ui.jsx';

export default function Projects() {
  useMeta('Work', 'Case studies from NANDIVEX across fintech, logistics, legal, hospitality, ERP, cloud and security.');
  return (
    <>
      <PageHeader eyebrow="Work" title="Case studies.">
        Production systems we designed and shipped, with the problem, the approach and the measured result.
      </PageHeader>
      <section className="border-b border-line">
        <div className="wrap">
          {projects.map((p, n) => (
            <Link key={p.slug} to={`/project/${p.slug}`} className="group grid gap-5 border-b border-line py-10 last:border-0 md:grid-cols-[4rem_1fr_1.2fr]">
              <span className="font-mono text-xs text-accent">{String(n + 1).padStart(2, '0')}</span>
              <div>
                <p className="label">{p.industry}</p>
                <h2 className="mt-2 text-3xl group-hover:text-accent">{p.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{p.shortDescription}</p>
              </div>
              <div>
                <ul className="space-y-2 border-l-2 border-accent pl-4 text-sm leading-relaxed">
                  {p.results.slice(0, 2).map((r) => <li key={r}>{r}</li>)}
                </ul>
                <p className="mt-4 text-sm text-accent">Read the case study →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CTA title="Want results like these?" />
    </>
  );
}
