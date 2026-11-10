import { Link, useParams } from 'react-router-dom';
import services from '../data/services.json';
import { CTA, List, PageHeader, Section, useMeta } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  useMeta(s?.title, s?.description);
  if (!s) return <NotFound />;
  const others = services.filter((x) => x.slug !== s.slug && x.category === s.category);

  return (
    <>
      <PageHeader eyebrow={`Services / ${s.category}`} title={s.title}>
        <p>{s.subtitle}</p>
        <p className="mt-4 text-base">{s.description}</p>
      </PageHeader>

      <Section eyebrow="Scope" title="What is included">
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
        <ol className="border-t border-ink">
          {s.process.map((p) => (
            <li key={p.step} className="grid gap-2 border-b border-line py-5 md:grid-cols-[4rem_1fr_2fr]">
              <span className="font-mono text-xs text-accent">{p.step}</span>
              <h3 className="font-sans font-semibold">{p.name}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Tools" title="Technologies we use">
        <ul className="flex flex-wrap gap-2">
          {s.technologies.map((t) => (
            <li key={t} className="border border-line px-3 py-1.5 font-mono text-xs">{t}</li>
          ))}
        </ul>
      </Section>

      {others.length > 0 && (
        <Section eyebrow="Related" title={`More in ${s.category}`}>
          <ul className="grid gap-6 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/services/${o.slug}`} className="block border-t border-ink pt-4 hover:text-accent">
                  <span className="font-medium">{o.title}</span>
                  <span className="mt-1 block text-sm text-muted">{o.subtitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CTA title={`Need ${s.title.toLowerCase()}?`} label="Request a quote" />
    </>
  );
}
