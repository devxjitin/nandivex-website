import { Link, useParams } from 'react-router-dom';
import { work } from '../data/work.js';
import services from '../data/services.json';
import { CTA, List, Section, useMeta } from '../components/ui.jsx';
import { WorkCard } from '../components/blocks.jsx';
import Icon from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function WorkDetail() {
  const { slug } = useParams();
  const w = work.find((x) => x.slug === slug);
  useMeta(w?.title, w?.summary);
  if (!w) return <NotFound />;
  const used = services.filter((s) => w.services.includes(s.slug));
  const more = work.filter((x) => x.slug !== w.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-night text-white">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="wrap relative py-14 sm:py-20">
          <Link to="/work" className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
            <Icon name="arrow" className="h-4 w-4 rotate-180" /> All work
          </Link>
          <p className="label !text-cyan">{w.tag}</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] sm:text-6xl">{w.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{w.summary}</p>
          {w.clientLogo && (
            <a href={w.clientUrl} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-4 rounded-xl bg-white/10 p-2 pr-5 ring-1 ring-white/20 transition-colors hover:bg-white/20">
              <img src={w.clientLogo} alt={w.client} className="h-12 w-auto rounded-lg bg-[#16181d]" />
              <span className="text-sm font-semibold">Visit site</span>
              <Icon name="arrow" className="h-4 w-4 -rotate-45 text-cyan transition-transform group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="label">The need</p>
            <p className="mt-3 text-lg leading-relaxed">{w.challenge}</p>
            <p className="label mt-10">What we built</p>
            <List items={w.built} className="mt-4" />
          </div>
          <aside className="space-y-8 rounded-2xl border border-line bg-soft p-7">
            <div>
              <p className="label">Result</p>
              <ul className="mt-3 space-y-2">
                {w.outcome.map((o) => <li key={o} className="font-display text-lg font-bold text-accent-dark">{o}</li>)}
              </ul>
            </div>
            <div>
              <p className="label">Built with</p>
              <ul className="mt-3 flex flex-wrap gap-2">{w.stack.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
            </div>
            {used.length > 0 && (
              <div>
                <p className="label">Services used</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold">
                  {used.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-accent underline underline-offset-4">{s.title}</Link></li>)}
                </ul>
              </div>
            )}
            {w.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {w.links.map((l) =>
                  l.internal ? (
                    <Link key={l.label} to={l.href} className="btn-solid">{l.label}</Link>
                  ) : (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-line">{l.label} <Icon name="arrow" className="h-4 w-4 -rotate-45" /></a>
                  )
                )}
              </div>
            )}
          </aside>
        </div>
      </Section>

      {w.images.length > 0 && (
        <Section eyebrow="Screens" title="What it looks like" tone="soft">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {w.images.map(([src, alt]) => (
              <img key={src} src={src} alt={alt} loading="lazy" width="720" height="1600" className="aspect-[9/20] w-full rounded-2xl border border-line bg-white object-contain shadow-card" />
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="More" title="Other work" tone={w.images.length ? 'white' : 'soft'}>
        <div className="grid gap-5 md:grid-cols-3">{more.map((m) => <WorkCard key={m.slug} w={m} />)}</div>
      </Section>
      <CTA title="Want something like this?" label="Book a call" />
    </>
  );
}
