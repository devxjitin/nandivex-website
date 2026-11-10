import { Link, useParams } from 'react-router-dom';
import projects from '../data/projects.json';
import { CTA, List, PageHeader, Section, useMeta } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  useMeta(p?.title, p?.shortDescription);
  if (!p) return <NotFound />;
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <PageHeader eyebrow={`Work / ${p.industry}`} title={p.title}>
        {p.shortDescription}
      </PageHeader>

      <Section eyebrow="Results">
        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {p.results.map((r) => (
            <li key={r} className="bg-paper p-6 font-display text-2xl leading-snug">{r}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Brief">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider">The problem</h2>
            <p className="mt-4 leading-relaxed text-muted">{p.challenge}</p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider">What we did</h2>
            <p className="mt-4 leading-relaxed">{p.solution}</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Build" title="Key features">
        <List items={p.features} />
      </Section>

      <Section eyebrow="Architecture">
        <p className="max-w-3xl text-lg leading-relaxed">{p.architecture}</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {p.technologies.map((t) => (
            <li key={t} className="border border-line px-3 py-1.5 font-mono text-xs">{t}</li>
          ))}
        </ul>
      </Section>

      <section className="border-b border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-8">
          <Link to="/projects" className="text-sm text-muted hover:text-ink">← All case studies</Link>
          <Link to={`/project/${next.slug}`} className="text-sm text-accent">Next: {next.title} →</Link>
        </div>
      </section>
      <CTA title="Need a similar system?" label="Book a discovery call" />
    </>
  );
}
