import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { team } from '../data/team.js';
import { List, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

const rupee = (n) => `₹${n.toLocaleString('en-IN')}`;

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {p.shots.map(([src, alt]) => (
            <img key={src} src={src} alt={alt} loading="lazy" width="720" height="1600" className="aspect-[9/20] w-full rounded-xl border border-line bg-surface object-contain shadow-card" />
          ))}
        </div>
      </div>

      <h3 className="mb-6 mt-14 text-2xl">Plans</h3>
      <div className="grid gap-5 md:grid-cols-3">
        {p.plans.map((pl) => (
          <div key={pl.name} className={`card relative flex flex-col !p-7 ${pl.best ? '!border-accent shadow-lift' : ''}`}>
            {pl.best && <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Lowest per day</span>}
            <p className="font-display text-sm font-bold uppercase tracking-wider text-accent">{pl.name}</p>
            <p className="mt-1 text-muted">{pl.length}</p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold">{rupee(pl.price)}</span>
              <span className="text-sm text-muted line-through">{rupee(pl.was)}</span>
            </p>
            <p className="mt-1 text-sm text-muted">About {rupee(pl.perDay)} a day · {pl.off}% launch discount</p>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className={`mt-7 ${pl.best ? 'btn-solid' : 'btn-line'}`}>
              Subscribe <Icon name="arrow" className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        ))}
      </div>
      <ul className="mt-8 space-y-1.5 text-sm text-muted">
        {p.notes.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </Section>
  );
}

export default function Products() {
  useMeta('Products', 'Software by NandiVex Technologies that you can subscribe to, starting with ULTRON, a voice assistant for Android.');
  return (
    <>
      <PageHeader eyebrow="Products" title="Software you can subscribe to.">
        Tools we build and run ourselves, sold as simple subscriptions. No setup project, no contract.
      </PageHeader>
      {products.map((p, i) => <Product key={p.slug} p={p} tone={i % 2 ? 'soft' : 'white'} />)}
    </>
  );
}
