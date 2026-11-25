import { Link } from 'react-router-dom';
import { products, lineup } from '../data/products.js';
import { team } from '../data/team.js';
import { List, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

function Product({ p, tone }) {
  return (
    <Section id={p.slug} eyebrow={`Product · ${p.platform}`} title={`${p.name}: ${p.tag}`} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="max-w-xl leading-relaxed text-muted">{p.summary}</p>
          {p.builtBy?.length > 0 && (
            <p className="mt-4 text-sm text-muted">
              Built by{' '}
              {p.builtBy.map((slug, i) => {
                const m = team.find((x) => x.slug === slug);
                return m ? (
                  <span key={slug}>
                    {i > 0 && (i === p.builtBy.length - 1 ? ' and ' : ', ')}
                    <Link to={`/team/${m.slug}`} className="font-semibold text-accent underline underline-offset-4">{m.name}</Link>
                  </span>
                ) : null;
              })}
            </p>
          )}
          <List items={p.features} className="mt-6" />
        </div>
        {p.shots?.length > 0 && <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {p.shots.map(([src, alt]) => (
            <img key={src} src={src} alt={alt} loading="lazy" width="720" height="1600" className="aspect-[9/20] w-full rounded-xl border border-line bg-surface object-contain shadow-card" />
          ))}
        </div>}
      </div>

      {p.url && p.slug === 'parakh' && (
        <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-solid mt-8 inline-flex">Open Parakh <Icon name="arrow" className="h-4 w-4" /></a>
      )}
      <ul className="mt-8 space-y-1.5 text-sm text-muted">
        {p.notes.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </Section>
  );
}

export default function Products() {
  useMeta('Products', 'Software by NandiVex Technologies: Parakh (live), and Friday, ULTRON (experimental) and Nandi (not launched yet).');
  return (
    <>
      <PageHeader eyebrow="Products" title="Software we are building.">
        Tools we build and run ourselves. Parakh is live. The others are not launched yet, and ULTRON is still experimental.
      </PageHeader>
      <Section eyebrow="Our lineup" title="Four products. Parakh is live." tone="white">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {lineup.map((l) => (
            <div key={l.name} className="card flex flex-col !p-7">
              <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${l.status === 'Experimental' || l.status === 'Live' ? 'bg-accent text-white' : 'border border-line text-muted'}`}>{l.status}</span>
              <h3 className="mt-4 text-2xl">{l.name}</h3>
              <p className="mt-1 font-semibold text-accent">{l.tag}</p>
              <p className="mt-4 leading-relaxed text-muted">{l.text}</p>
              <ul className="mt-5 space-y-1.5 text-sm text-muted">
                {l.points.map((x) => <li key={x}>· {x}</li>)}
              </ul>
              {l.href && <a href={l.href} className="btn-line mt-6 self-start">See details <Icon name="arrow" className="h-4 w-4" /></a>}
            </div>
          ))}
        </div>
      </Section>
      {products.map((p, i) => <Product key={p.slug} p={p} tone={i % 2 ? 'white' : 'soft'} />)}
    </>
  );
}
