import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

export default function Projects() {
  useMeta('Work', 'Case studies from NANDIVEX across fintech, logistics, legal, hospitality, ERP, cloud and security.');
  return (
    <>
      <PageHeader eyebrow="Work" title="Case studies.">
        Production systems we designed and shipped, with the problem, the approach and the measured result.
      </PageHeader>
      <Section tone="soft">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`} className="card-hover group flex flex-col !p-8">
              <p className="label">{p.industry}</p>
              <h2 className="mt-3 text-2xl leading-snug group-hover:text-accent">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.shortDescription}</p>
              <ul className="mt-6 space-y-2 rounded-xl bg-tint p-4 text-sm font-semibold leading-snug text-accent-dark">
                {p.results.slice(0, 2).map((r) => <li key={r}>{r}</li>)}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Read the case study <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CTA title="Want results like these?" />
    </>
  );
}
