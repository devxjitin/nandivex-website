import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icons.jsx';
import { CountUp } from './motion.jsx';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Animated voice bars. Pure CSS animation, paused for reduced motion. */
export function VoiceWave({ bars = 28, className = '' }) {
  return (
    <div className={`flex h-16 items-center justify-center gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-gradient-to-t from-accent to-cyan"
          style={{ animationDelay: `${(i * 97) % 900}ms`, animationDuration: `${900 + ((i * 53) % 700)}ms` }}
        />
      ))}
    </div>
  );
}

/** Phone frame that crossfades through screenshots. shots: [[src, alt], ...] */
export function PhoneMock({ shots, interval = 3200, className = '' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced() || shots.length < 2) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % shots.length), interval);
    return () => clearInterval(id);
  }, [shots.length, interval]);
  return (
    <div className={`relative mx-auto w-[210px] sm:w-[250px] ${className}`}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem] border-[7px] border-night bg-night shadow-lift ring-1 ring-white/15">
        {shots.map(([src, alt], n) => (
          <img
            key={src}
            src={src}
            alt={n === i ? alt : ''}
            width="720"
            height="1600"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${n === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-night" />
      </div>
    </div>
  );
}

/** Team photo, or initials on a gradient when a member has no photo yet. */
export function Avatar({ m, className = '', textClass = 'text-5xl' }) {
  if (m.photo) return <img src={m.photo} alt={m.name} loading="lazy" className={`object-top ${className}`} />;
  const initials = m.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <div role="img" aria-label={m.name} className={`flex items-center justify-center bg-gradient-to-br from-night to-accent font-display font-extrabold text-white ${textClass} ${className}`}>
      {initials}
    </div>
  );
}

export function StatRow({ stats, dark = false }) {
  return (
    <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="border-l-2 border-accent/40 pl-5">
          <dt className={`font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${dark ? 'text-white' : 'text-accent'}`}>
            <CountUp value={s.value} suffix={s.suffix} />
          </dt>
          <dd className={`mt-2 text-sm leading-snug ${dark ? 'text-white/60' : 'text-muted'}`}>{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/** "Trusted by" row. clients come from data/clients.js. */
export function LogoStrip({ clients }) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
      <p className="label !text-muted">Trusted by</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {clients.map((c) => (
          <li key={c.name}>
            <Link to={c.work ? `/work/${c.work}` : '/work'} className="group flex items-center gap-4" title={c.name}>
              <img src={c.logo} alt={c.name} width="971" height="257" className="h-10 w-auto rounded-lg bg-[#16181d] shadow-card transition-transform duration-300 group-hover:scale-105 sm:h-12" />
              {c.note && <span className="hidden rounded-full bg-tint px-3 py-1 text-xs font-semibold text-accent-dark sm:inline">{c.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const rowSpan = { 1: '', 2: 'md:row-span-2', 3: 'md:row-span-3', 4: 'md:row-span-4' };

export function ServiceCard({ s, big = false, span = 2 }) {
  return (
    <Link
      to={`/services/${s.slug}`}
      className={`card-hover group relative flex flex-col overflow-hidden !p-8 ${big ? `${rowSpan[span] || ''} !border-accent/30 bg-gradient-to-br from-white to-tint` : ''}`}
    >
      {big && <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Main focus</span>}
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
        <Icon name={s.slug} className="h-7 w-7" />
      </span>
      <h3 className="mt-6 text-2xl sm:text-3xl">{s.title}</h3>
      <p className={`mt-3 leading-relaxed text-muted ${big ? '' : 'flex-1'}`}>{s.description}</p>
      {big && <div className="flex flex-1 items-center py-6"><VoiceWave bars={34} className="w-full" /></div>}
      {big && (
        <ul className="mt-2 space-y-2 text-sm">
          {s.useCases.slice(0, 3).map((u) => (
            <li key={u} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-accent" />{u}</li>
          ))}
        </ul>
      )}
      <ul className="mt-5 flex flex-wrap gap-2">
        {s.tags.map((t) => <li key={t} className="chip">{t}</li>)}
      </ul>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

const typeLabel = { client: 'Client', product: 'Product', 'open-source': 'Open source' };

export function WorkCard({ w }) {
  const shot = w.images[0]?.[0];
  return (
    <Link to={`/work/${w.slug}`} className="card-hover group flex h-full flex-col overflow-hidden !p-0">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-night to-[#12306b]">
        <div className="grid-bg absolute inset-0 opacity-70" aria-hidden="true" />
        {w.clientLogo ? (
          <img src={w.clientLogo} alt={w.client} className="relative h-14 w-auto rounded-lg bg-[#16181d] shadow-lift ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110" />
        ) : shot ? (
          <img src={shot} alt="" loading="lazy" className="relative h-[115%] translate-y-6 rounded-2xl object-contain transition-transform duration-500 group-hover:translate-y-2" />
        ) : (
          <Icon name={w.services[0] || 'build'} className="relative h-14 w-14 text-cyan transition-transform duration-500 group-hover:scale-110" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{typeLabel[w.type]}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="label">{w.tag}</p>
        <h3 className="mt-2 text-xl leading-snug">{w.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{w.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          View case study <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Accessible accordion using details/summary. items: [[question, answer], ...] */
export function FAQ({ items }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
      {items.map(([q, a]) => (
        <details key={q} className="faq group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold">
            {q}
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-tint text-accent transition-transform duration-300 group-open:rotate-45">
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </summary>
          <p className="pb-6 leading-relaxed text-muted">{a}</p>
        </details>
      ))}
    </div>
  );
}
