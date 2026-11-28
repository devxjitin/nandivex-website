import { useEffect, useRef, useState } from 'react';
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

/** Team photo, or initials on a gradient when a member has no photo yet. */
export function Avatar({ m, className = '', textClass = 'text-5xl' }) {
  if (m.photo) return <img decoding="async" src={m.photo} alt={m.name} loading="lazy" className={`object-top ${className}`} />;
  const initials = m.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <div role="img" aria-label={m.name} className={`flex items-center justify-center bg-gradient-to-br from-accent-dark to-accent font-display font-extrabold text-white ${textClass} ${className}`}>
      {initials}
    </div>
  );
}

/** Notched card: the top border dips under a pill label (left slope, flat under the pill, right slope).
    Colours live in .tabcard in index.css. */
export function TabCard({ tab, icon, className = '', children }) {
  return (
    <div className={`tabcard ${className}`}>
      <div className="flex h-[31px] items-stretch">
        <svg width="66" height="31" viewBox="0 0 66 31" className="flex-none" aria-hidden="true">
          <path d="M0.5 31V13.5Q0.5 0.5 13.5 0.5H21C32 0.5 42 30.5 66 30.5V31Z" fill="var(--tc-fill)" />
          <path d="M0.5 31V13.5Q0.5 0.5 13.5 0.5H21C32 0.5 42 30.5 66 30.5" fill="none" stroke="var(--tc-line)" strokeWidth="1.25" />
        </svg>
        <div className="tabcard-notch">
          <span className="tabcard-pill">{tab}</span>
        </div>
        <svg width="50" height="31" viewBox="0 0 50 31" className="flex-none" aria-hidden="true">
          <path d="M0 30.5C24 30.5 30 0.5 50 0.5V31H0Z" fill="var(--tc-fill)" />
          <path d="M0 30.5C24 30.5 30 0.5 50 0.5" fill="none" stroke="var(--tc-line)" strokeWidth="1.25" />
        </svg>
        <div className="tabcard-rest" />
      </div>
      <div className="tabcard-body">
        {icon && <Icon name={icon} className="mt-1 h-9 w-9 flex-none" />}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

export function StatRow({ stats }) {
  return (
    <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {stats.map((s) => (
        <TabCard key={s.label} tab={s.tab} icon={s.icon}>
          <dt className="font-display text-[3.25rem] font-extrabold leading-none tracking-tight text-ink">
            <CountUp value={s.value} suffix={s.suffix} />
          </dt>
          <dd className="mt-5 text-lg leading-[1.7] text-ink/80">{s.label}</dd>
        </TabCard>
      ))}
    </dl>
  );
}

/** Large "Trusted by" section: heading, then only the client logos. clients come from data/clients.js. */
export function ClientsSection({ clients }) {
  return (
    <section className="relative overflow-hidden bg-soft">
      <div className="glow absolute -left-32 top-0 h-[360px] w-[360px] opacity-50" aria-hidden="true" />
      <div className="wrap relative py-16 text-center sm:py-24">
        <p className="label mb-3">Our clients</p>
        <h2 className="text-3xl sm:text-4xl">Trusted by</h2>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {clients.map((c) => (
            <li key={c.name}>
              <Link to={c.work ? `/work/${c.work}` : '/work'} title={c.name} aria-label={c.name} className="group block">
                <img decoding="async" src={c.logo} alt={c.name} width="971" height="257" className="h-20 w-auto rounded-2xl bg-[#16181d] shadow-lift ring-1 ring-line transition-transform duration-300 group-hover:scale-105 sm:h-28" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Pure-CSS illustrations for the service cards, same look as HeroVisual. Keyed by service slug. */
const glass = 'absolute rounded-xl border border-line bg-white shadow-card';
const pill = 'absolute flex items-center gap-1.5 rounded-xl border border-line bg-white px-2.5 py-1.5 text-[11px] font-semibold text-ink shadow-card';
const bar = (w, c = 'bg-ink/10') => <span className={`block h-1.5 rounded-full ${w} ${c}`} />;
const art = {
  'ai-agents': () => (
    <>
      <div className={`${glass} left-[8%] top-[14%] w-[46%] p-3`}>{bar('w-3/4', 'bg-ink/20')}<div className="mt-2">{bar('w-1/2')}</div></div>
      <div className="absolute right-[8%] top-[34%] w-[52%] rounded-xl bg-gradient-to-br from-accent to-cyan p-3 opacity-95 shadow-card">
        {bar('w-full', 'bg-white/70')}<div className="mt-2">{bar('w-2/3', 'bg-white/50')}</div>
      </div>
      <div className="absolute bottom-[12%] left-[8%] flex h-9 w-[60%] items-center gap-[3px] rounded-xl border border-line bg-white px-3">
        {[40, 70, 50, 90, 60, 100, 55, 80, 45, 70, 35, 60, 85, 50, 30].map((h, i) => (
          <span key={i} className="w-[3px] flex-1 rounded-full bg-accent" style={{ height: `${h}%`, opacity: 0.5 + (i % 3) * 0.2 }} />
        ))}
      </div>
      <span className={`${pill} right-[8%] bottom-[14%] animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="ai-agents" className="h-4 w-4 text-accent" /> Voice</span>
    </>
  ),
  'web-software': () => (
    <>
      <div className={`${glass} inset-x-[10%] bottom-0 top-[14%] overflow-hidden rounded-b-none`}>
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/20" /><span className="h-2 w-2 rounded-full bg-ink/10" /><span className="h-2 w-2 rounded-full bg-ink/[0.06]" />
          <span className="ml-2 h-1.5 w-20 rounded-full bg-ink/10" />
        </div>
        <div className="p-3">
          <div className="h-9 rounded-lg bg-gradient-to-r from-accent to-cyan opacity-90" />
          <div className="mt-2.5 grid grid-cols-3 gap-2">{[0, 1, 2].map((n) => <span key={n} className="h-10 rounded-lg bg-ink/[0.06]" />)}</div>
        </div>
      </div>
      <span className={`${pill} right-[5%] top-[6%] animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="web-software" className="h-4 w-4 text-accent" /> Web</span>
    </>
  ),
  'android-apps': () => (
    <>
      <div className="absolute left-1/2 top-[10%] h-[100%] w-[26%] min-w-[96px] -translate-x-1/2">
        <div className="relative h-full overflow-hidden rounded-t-[1.5rem] border-[5px] border-b-0 border-ink bg-gradient-to-b from-white to-soft ring-1 ring-line">
          <span className="absolute left-1/2 top-1 h-2 w-8 -translate-x-1/2 rounded-full bg-ink" />
          <div className="grid grid-cols-3 gap-2 px-3 pt-7">
            {['from-accent to-cyan', 'bg-ink/10', 'bg-ink/10', 'bg-ink/10', 'from-accent to-cyan', 'bg-ink/10'].map((c, n) => (
              <span key={n} className={`aspect-square rounded-lg ${c.startsWith('from') ? `bg-gradient-to-br ${c}` : c}`} />
            ))}
          </div>
        </div>
      </div>
      <span className={`${pill} left-[8%] top-[22%] animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="android-apps" className="h-4 w-4 text-accent" /> Android</span>
      <span className={`${pill} right-[8%] bottom-[22%] animate-[floaty_6s_ease-in-out_.8s_infinite]`}><Icon name="check" className="h-4 w-4 text-accent" /> Kotlin</span>
    </>
  ),
  'desktop-apps': () => (
    <>
      <div className={`${glass} left-[7%] top-[12%] w-[66%] overflow-hidden`}>
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ink/20" /><span className="h-2 w-2 rounded-full bg-ink/10" /><span className="h-2 w-2 rounded-full bg-ink/[0.06]" />
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3 p-3">
          <div className="space-y-2">{[0, 1, 2].map((n) => <span key={n} className={`block h-1.5 rounded-full ${n === 0 ? 'w-7 bg-accent' : 'w-6 bg-ink/10'}`} />)}</div>
          <div className="space-y-2">{[90, 70, 80, 55].map((w, n) => <span key={n} className="block h-2 rounded bg-ink/10" style={{ width: `${w}%` }} />)}</div>
        </div>
      </div>
      <div className="absolute bottom-[10%] right-[7%] flex items-center gap-1.5">
        {['bg-ink/10', 'bg-gradient-to-br from-accent to-cyan', 'bg-ink/10'].map((c, n) => (
          <span key={n} className="flex items-center gap-1.5"><span className={`h-8 w-8 rounded-lg border border-line ${c}`} />{n < 2 && <span className="h-px w-3 bg-accent/40" />}</span>
        ))}
      </div>
      <span className={`${pill} bottom-[10%] left-[7%] animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="desktop-apps" className="h-4 w-4 text-accent" /> Auto</span>
    </>
  ),
  cybersecurity: () => (
    <>
      {[44, 72, 100].map((d) => (
        <span key={d} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20" style={{ width: `${d * 1.6}px`, height: `${d * 1.6}px` }} />
      ))}
      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-accent to-cyan shadow-card">
        <Icon name="cybersecurity" className="h-8 w-8 text-white" />
      </div>
      <span className={`${pill} left-[10%] top-[18%] animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="check" className="h-4 w-4 text-accent" /> Audited</span>
      <span className={`${pill} right-[10%] bottom-[18%] animate-[floaty_6s_ease-in-out_.8s_infinite]`}><Icon name="check" className="h-4 w-4 text-accent" /> Encrypted</span>
    </>
  ),
};

export function ServiceCard({ s, big = false }) {
  if (big) {
    // Wide featured card: sits on top, full width, with the other services in a row below it.
    return (
      <Link
        to={`/services/${s.slug}`}
        className="card-hover group relative grid gap-8 overflow-hidden !border-accent/30 bg-gradient-to-br from-surface to-tint !p-7 md:col-span-full md:grid-cols-[1.3fr_1fr] md:items-center sm:!p-8"
      >
        <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Main focus</span>
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Icon name={s.slug} className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl sm:text-3xl">{s.title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.description}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <div className="rounded-2xl border border-line bg-surface/70 p-5">
          <VoiceWave bars={30} className="!h-10 w-full" />
          <ul className="mt-4 space-y-2 text-sm">
            {s.useCases.slice(0, 3).map((u) => (
              <li key={u} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-accent" />{u}</li>
            ))}
          </ul>
        </div>
      </Link>
    );
  }
  return (
    <Link to={`/services/${s.slug}`} className="group block h-full">
      <div className="svc-card card relative flex h-full flex-col overflow-hidden !p-0">
        {art[s.slug] && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-soft to-tint" aria-hidden="true">
            <div className="absolute inset-x-10 top-1/2 h-32 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--c-accent)/0.35),transparent)]" />
            <div className="svc-img absolute inset-0">{art[s.slug]()}</div>
          </div>
        )}
        <div className="flex flex-1 flex-col px-7 pb-7">
          <h3 className="mt-6 text-xl transition-colors duration-300 group-hover:text-accent sm:text-2xl">{s.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Learn more <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
          </span>
        </div>
      </div>
    </Link>
  );
}

const typeLabel = { client: 'Client', product: 'Product', 'open-source': 'Open source' };

export function WorkCard({ w }) {
  const shot = w.images[0]?.[0];
  return (
    <Link to={`/work/${w.slug}`} className="card-hover group flex h-full flex-col overflow-hidden !p-0">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-soft to-tint">
        {w.images.length >= 3 ? (
          <div className="absolute inset-x-0 bottom-0 top-10 flex items-end justify-center gap-3" aria-hidden="true">
            {[1, 0, 2].map((i, n) => (
              <img
                key={w.images[i][0]}
                src={w.images[i][0]}
                alt=""
                loading="lazy"
                className={`aspect-[9/19.5] rounded-2xl border border-line object-cover shadow-lift transition-transform duration-500 ${n === 1 ? 'h-[92%] group-hover:-translate-y-2' : 'h-[78%] translate-y-6 opacity-90 group-hover:translate-y-3'}`}
              />
            ))}
          </div>
        ) : w.clientLogo ? (
          <img decoding="async" src={w.clientLogo} alt={w.client} className="relative h-14 w-auto rounded-lg bg-[#16181d] shadow-lift ring-1 ring-line transition-transform duration-500 group-hover:scale-110" />
        ) : shot ? (
          <img decoding="async" src={shot} alt="" loading="lazy" className="relative h-[115%] translate-y-6 rounded-2xl object-contain transition-transform duration-500 group-hover:translate-y-2" />
        ) : (
          <Icon name={w.services[0] || 'build'} className="relative h-14 w-14 text-accent transition-transform duration-500 group-hover:scale-110" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-accent shadow-card">{typeLabel[w.type]}</span>
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
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-surface shadow-card">
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

/** Illustration for the landing hero: a web dashboard, a phone app and floating service chips. Pure CSS, no image files. */
export function HeroVisual() {
  const bars = [38, 62, 48, 80, 58, 92, 70];
  const chip = 'absolute flex items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-card';
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[480px] sm:h-[420px]" aria-hidden="true">
      <div className="absolute inset-x-8 top-1/2 h-48 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--c-accent)/0.16),transparent)]" />

      {/* Web dashboard */}
      <div className="absolute left-0 top-8 w-[78%] overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/20" /><span className="h-2.5 w-2.5 rounded-full bg-ink/10" /><span className="h-2.5 w-2.5 rounded-full bg-ink/[0.06]" />
          <span className="ml-3 h-2 w-28 rounded-full bg-ink/10" />
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4 p-4">
          <div className="space-y-2.5 pt-1">
            {[0, 1, 2, 3].map((n) => <span key={n} className={`block h-2 rounded-full ${n === 0 ? 'w-10 bg-accent' : 'w-8 bg-ink/10'}`} />)}
          </div>
          <div>
            <span className="block h-2.5 w-24 rounded-full bg-ink/20" />
            <div className="mt-4 flex h-24 items-end gap-2 sm:h-28">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-accent to-cyan" style={{ height: `${h}%`, opacity: 0.55 + (i % 3) * 0.2 }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => <span key={n} className="h-8 rounded-lg bg-ink/[0.06]" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Phone app */}
      <div className="absolute bottom-0 right-1 w-[34%] min-w-[118px] animate-[floaty_6s_ease-in-out_infinite]">
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.7rem] border-[6px] border-ink bg-gradient-to-b from-white to-soft shadow-card ring-1 ring-line">
          <span className="absolute left-1/2 top-1.5 h-2.5 w-10 -translate-x-1/2 rounded-full bg-ink" />
          <div className="space-y-2.5 px-3 pt-8">
            <span className="block h-2.5 w-12 rounded-full bg-ink/25" />
            <span className="block h-16 rounded-xl bg-gradient-to-br from-accent to-cyan opacity-90" />
            {[0, 1, 2].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span className="h-6 w-6 flex-none rounded-lg bg-ink/10" />
                <span className="h-2 flex-1 rounded-full bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating service chips */}
      <span className={`${chip} -top-1 right-6 animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="web-software" className="h-4 w-4 text-accent" /> Web</span>
      <span className={`${chip} left-3 bottom-12 animate-[floaty_6s_ease-in-out_.8s_infinite]`}><Icon name="ai-agents" className="h-4 w-4 text-accent" /> AI</span>
      <span className={`${chip} bottom-28 right-[40%] animate-[floaty_5.5s_ease-in-out_1.4s_infinite]`}><Icon name="cybersecurity" className="h-4 w-4 text-accent" /> Secure</span>
    </div>
  );
}

/**
 * Agile delivery diagram. Desktop: the stages before and after the sprint sit on one line, and the sprint stages sit on
 * a ring in the middle, so the repeat is visible: work flows over the top, feedback returns along the bottom, and a dot
 * keeps circling. A long arc carries live feedback from Support back to the Backlog. Everything is one SVG, so it
 * scales without labels colliding. Small screens: a vertical list with the sprint stages grouped.
 */
export function WorkflowDiagram({ steps }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const still = reduced();
  useEffect(() => {
    if (still || !('IntersectionObserver' in window)) { setOn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [still]);

  const W = 1200;
  const H = 580;
  const cx = 600;
  const cy = 270;
  const R = 180; // sprint ring
  const r = 38; // node radius
  const gap = 165; // spacing on the straight line
  const first = steps.findIndex((s) => s.inSprint);
  const last = steps.length - 1 - [...steps].reverse().findIndex((s) => s.inSprint);
  const k = last - first + 1;
  const rad = (d) => (d * Math.PI) / 180;
  const onRing = (deg) => [cx + R * Math.cos(rad(deg)), cy + R * Math.sin(rad(deg))];

  // Sprint stages spread over the top half of the ring (180deg = left, 360deg = right); the rest sit on one line.
  const pos = steps.map((s, i) => {
    if (i < first) return { x: cx - R - (first - i) * gap, y: cy, above: false };
    if (i > last) return { x: cx + R + (i - last) * gap, y: cy, above: false };
    const deg = 180 + ((i - first) * 180) / Math.max(k - 1, 1);
    const [x, y] = onRing(deg);
    return { x, y, deg, above: deg > 180 && deg < 360 };
  });

  const trim = ((r + 10) / R) * (180 / Math.PI); // stop arcs short of the node circles
  const arc = (d1, d2) => {
    const [x1, y1] = onRing(d1 + trim);
    const [x2, y2] = onRing(d2 - trim);
    return `M${x1} ${y1} A${R} ${R} 0 ${d2 - d1 - 2 * trim > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  const links = steps.slice(0, -1).map((_, i) => {
    const a = pos[i];
    const b = pos[i + 1];
    if (i >= first && i < last) return arc(a.deg, b.deg);
    return `M${a.x + r + 10} ${a.y} L${b.x - r - 10} ${b.y}`;
  });
  const support = pos[steps.length - 1];
  const backlog = pos[Math.max(first - 1, 0)];
  const under = cy + r + 64; // just below a stage's text
  const deep = cy + 310;
  const refill = `M${support.x} ${under} C${support.x} ${deep} ${backlog.x} ${deep} ${backlog.x} ${under}`;
  const refillLow = under + 0.75 * (deep - under);
  const refillMid = (support.x + backlog.x) / 2;
  const loop = `M${cx - R} ${cy} A${R} ${R} 0 1 1 ${cx + R} ${cy} A${R} ${R} 0 1 1 ${cx - R} ${cy}`;

  return (
    <div ref={ref} className={`wf ${on ? 'wf-in' : ''}`}>
      {/* desktop diagram */}
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto hidden h-auto w-full max-w-[1200px] lg:block" role="img" aria-label={`Delivery process: ${steps.map((s) => s.name).join(', ')}. The sprint stages repeat every 1 to 2 weeks.`}>
        <defs>
          <marker id="wf-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1l8 4-8 4z" fill="#7A3CE0" />
          </marker>
          <marker id="wf-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1l8 4-8 4z" fill="#C9A0FF" />
          </marker>
          <radialGradient id="wf-ring">
            <stop offset="0.5" style={{ stopColor: 'rgb(var(--c-tint))' }} stopOpacity="0.15" />
            <stop offset="1" style={{ stopColor: 'rgb(var(--c-tint))' }} stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* sprint zone */}
        <circle cx={cx} cy={cy} r={R + 58} className="wf-band" fill="url(#wf-ring)" />

        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#7A3CE0" strokeOpacity=".08" strokeWidth="16" className="wf-tag" />

        {/* flow */}
        {links.map((d, i) => (
          <path key={i} d={d} pathLength="1" className="wf-draw" style={{ transitionDelay: `${0.25 + i * 0.2}s` }} stroke="#7A3CE0" strokeWidth="3" strokeLinecap="round" fill="none" markerEnd="url(#wf-arrow)" />
        ))}
        <path d={arc(0, 180)} pathLength="1" className="wf-draw" style={{ transitionDelay: '1.8s' }} stroke="#7A3CE0" strokeWidth="3" strokeLinecap="round" fill="none" markerEnd="url(#wf-arrow)" />
        <path d={refill} pathLength="1" className="wf-draw" style={{ transitionDelay: '2.2s' }} stroke="#C9A0FF" strokeWidth="2.5" strokeLinecap="round" fill="none" markerEnd="url(#wf-arrow-cyan)" />
        {!still && on && (
          <circle r="6" fill="#7A3CE0" className="wf-dot">
            <animateMotion dur="8s" repeatCount="indefinite" path={loop} />
          </circle>
        )}

        {/* centre of the ring */}
        <g className="wf-tag" textAnchor="middle">
          <rect x={cx - 58} y={cy - 58} width="116" height="28" rx="14" fill="#7A3CE0" />
          <text x={cx} y={cy - 39} fill="#fff" fontSize="12" fontWeight="800" letterSpacing="2.4" className="font-display">SPRINT</text>
          <text x={cx} y={cy - 2} fontSize="20" fontWeight="800" className="fill-ink font-display">Repeats every</text>
          <text x={cx} y={cy + 24} fontSize="20" fontWeight="800" className="fill-ink font-display">1 to 2 weeks</text>
        </g>
        <g className="wf-tag" style={{ transitionDelay: '2s' }} textAnchor="middle">
          <rect x={cx - 116} y={cy + 92} width="232" height="30" rx="15" className="fill-surface" stroke="#7A3CE0" strokeOpacity=".3" />
          <text x={cx} y={cy + 112} fontSize="13" fontWeight="600" className="fill-accent-dark">Feedback shapes the next sprint</text>
        </g>
        <g className="wf-tag" style={{ transitionDelay: '2.4s' }} textAnchor="middle">
          <rect x={refillMid - 172} y={refillLow - 16} width="344" height="32" rx="16" className="fill-tint" stroke="#C9A0FF" strokeOpacity=".7" />
          <text x={refillMid} y={refillLow + 5} fontSize="14" fontWeight="600" className="fill-accent-dark">Live feedback and new ideas refill the backlog</text>
        </g>

        {/* stages */}
        {steps.map((s, i) => {
          const { x, y, above, deg } = pos[i];
          const onRingEdge = deg === 180 || deg === 360; // the ring runs under these labels, so they sit on a chip
          const nameY = above ? y - r - 32 : y + r + 28;
          const subY = above ? y - r - 13 : y + r + 47;
          return (
            <g key={s.name} className="wf-node" style={{ transformOrigin: `${x}px ${y}px`, transitionDelay: `${i * 0.2}s` }}>
              <g className="wf-badge" style={{ transformOrigin: `${x}px ${y}px` }}>
                <circle cx={x} cy={y} r={r} className="wf-circle" strokeWidth="2.5" />
                <Icon name={s.icon} className="wf-ico" x={x - 15} y={y - 15} width="30" height="30" />
              </g>
              {onRingEdge && <rect x={x - 76} y={nameY - 21} width="152" height="50" rx="12" className="wf-chip" />}
              <text x={x} y={nameY} textAnchor="middle" fontSize="17" fontWeight="700" className="fill-ink font-display">{s.name}</text>
              <text x={x} y={subY} textAnchor="middle" fontSize="13" className="fill-muted">{s.sub}</text>
            </g>
          );
        })}
      </svg>

      {/* small screens: vertical list, sprint stages grouped */}
      <ol className="space-y-3 lg:hidden">
        {steps.map((s, i) => {
          const startsSprint = s.inSprint && !steps[i - 1]?.inSprint;
          return (
            <li key={s.name} className={`wf-item flex items-center gap-4 rounded-2xl border p-4 ${s.inSprint ? 'border-accent/40 bg-tint/60' : 'border-line bg-surface'}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-accent bg-surface text-accent">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-display font-bold">{s.name}</span>
                <span className="block text-sm text-muted">{s.sub}</span>
                {startsSprint && <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Sprint: repeats every 1 to 2 weeks</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
