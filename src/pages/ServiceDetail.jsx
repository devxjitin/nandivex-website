import { Link, useParams } from 'react-router-dom';
import services from '../data/services.json';
import { workBySlug } from '../data/work.js';
import { CTA, List, PageHeader, Section, useMeta } from '../components/ui.jsx';
import { WorkCard } from '../components/blocks.jsx';
import Icon from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  useMeta(s?.title, s?.description);
  if (!s) return <NotFound />;
  const related = (s.relatedWork || []).map(workBySlug).filter(Boolean);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHeader eyebrow="Services" title={s.title}>
        <p>{s.subtitle}</p>
        <p className="mt-4 text-base">{s.description}</p>
        <Link to="/contact" className="btn mt-8 bg-white text-accent hover:bg-cyan hover:text-night">Talk about your project <Icon name="arrow" className="h-4 w-4" /></Link>
      </PageHeader>

      <Section eyebrow="Good fit for" title="What clients use this for">
        <ul className="grid gap-4 sm:grid-cols-2">
          {s.useCases.map((u) => (
            <li key={u} className="card flex items-start gap-4">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-tint text-accent"><Icon name={s.slug} className="h-5 w-5" /></span>
              <span className="pt-1 font-medium leading-snug">{u}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Scope" title="What is included" tone="soft">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider">Capabilities</h3>
            <List items={s.features} />
          </div>
          <div>
            <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider">What you receive</h3>
            <List items={s.deliverables} />
          </div>
        </div>
      </Section>

      <Section eyebrow="Process" title="How an engagement runs">
        <ol className="grid gap-4 md:grid-cols-5">
          {s.process.map((p) => (
            <li key={p.step} className="card !p-5">
              <span className="font-mono text-xs text-accent">{p.step}</span>
              <h3 className="mt-2 text-lg">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="Proof" title="Where we have done this" tone="soft">
          <div className="grid gap-5 md:grid-cols-3">
            {related.slice(0, 3).map((w) => <WorkCard key={w.slug} w={w} />)}
          </div>
        </Section>
      )}

      {s.toolkit?.length > 0 && (
        <Section eyebrow="Our toolkit" title="Open-source tools we have built for this.">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.toolkit.map((t) => (
              <li key={t.name}>
                <a href={t.href} target="_blank" rel="noopener noreferrer" className="card-hover group flex h-full flex-col !p-5">
                  <span className="font-mono text-sm font-semibold text-accent-dark">{t.name}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.text}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View on GitHub <Icon name="arrow" className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section eyebrow="Tools" title="Technologies we use">
        <ul className="flex flex-wrap gap-2">
          {s.technologies.map((t) => <li key={t} className="chip !font-mono">{t}</li>)}
        </ul>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} to={`/services/${o.slug}`} className="card-hover group flex items-center justify-between gap-4">
              <span><span className="label">Also</span><span className="mt-1 block font-display text-lg font-bold">{o.title}</span></span>
              <Icon name="arrow" className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </Section>
      <CTA title={`Need ${s.title.toLowerCase()}?`} label="Book a call" />
    </>
  );
}
