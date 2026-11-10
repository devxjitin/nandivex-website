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
          <dt className="font-display text-[3.25rem] font-extrabold leading-none tracking-tight text-[#1a1a1a]">
            <CountUp value={s.value} suffix={s.suffix} />
          </dt>
          <dd className="mt-5 text-lg leading-[1.7] text-[#333]">{s.label}</dd>
        </TabCard>
      ))}
    </dl>
  );
}

/** Large "Trusted by" section: heading, then only the client logos. clients come from data/clients.js. */
export function ClientsSection({ clients }) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="glow absolute -left-32 top-0 h-[360px] w-[360px] opacity-50" aria-hidden="true" />
      <div className="wrap relative py-16 text-center sm:py-24">
        <p className="label mb-3 !text-cyan">Our clients</p>
        <h2 className="text-3xl sm:text-4xl">Trusted by</h2>
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {clients.map((c) => (
            <li key={c.name}>
              <Link to={c.work ? `/work/${c.work}` : '/work'} title={c.name} aria-label={c.name} className="group block">
                <img src={c.logo} alt={c.name} width="971" height="257" className="h-20 w-auto rounded-2xl bg-[#16181d] shadow-lift ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105 sm:h-28" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceCard({ s, big = false }) {
  if (big) {
    // Wide featured card: sits on top, full width, with the other services in a row below it.
    return (
      <Link
        to={`/services/${s.slug}`}
        className="card-hover group relative grid gap-8 overflow-hidden !border-accent/30 bg-gradient-to-br from-white to-tint !p-7 md:col-span-full md:grid-cols-[1.3fr_1fr] md:items-center sm:!p-8"
      >
        <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Main focus</span>
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Icon name={s.slug} className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-2xl sm:text-3xl">{s.title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted">{s.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {s.tags.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <div className="rounded-2xl border border-line bg-white/70 p-5">
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
        {s.image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-night">
            <img src={s.image} alt="" loading="lazy" width="1000" height="625" className="svc-img h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent" aria-hidden="true" />
          </div>
        )}
        <div className="flex flex-1 flex-col px-7 pb-7">
          <span className={`svc-icon relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white ring-4 ring-white ${s.image ? '-mt-6' : 'mt-7'}`}>
            <Icon name={s.slug} className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-xl transition-colors duration-300 group-hover:text-accent sm:text-2xl">{s.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {s.tags.map((t) => <li key={t} className="chip">{t}</li>)}
          </ul>
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
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-night to-[#12306b]">
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

/** Illustration for the landing hero: a web dashboard, a phone app and floating service chips. Pure CSS, no image files. */
export function HeroVisual() {
  const bars = [38, 62, 48, 80, 58, 92, 70];
  const chip = 'absolute flex items-center gap-2 rounded-2xl border border-white/15 bg-night/80 px-3.5 py-2 text-xs font-semibold text-white shadow-card backdrop-blur';
  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[480px] sm:h-[420px]" aria-hidden="true">
      <div className="absolute inset-x-8 top-1/2 h-48 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl" />

      {/* Web dashboard */}
      <div className="absolute left-0 top-8 w-[78%] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] shadow-lift backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 h-2 w-28 rounded-full bg-white/15" />
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-4 p-4">
          <div className="space-y-2.5 pt-1">
            {[0, 1, 2, 3].map((n) => <span key={n} className={`block h-2 rounded-full ${n === 0 ? 'w-10 bg-cyan' : 'w-8 bg-white/20'}`} />)}
          </div>
          <div>
            <span className="block h-2.5 w-24 rounded-full bg-white/30" />
            <div className="mt-4 flex h-24 items-end gap-2 sm:h-28">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-accent to-cyan" style={{ height: `${h}%`, opacity: 0.55 + (i % 3) * 0.2 }} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((n) => <span key={n} className="h-8 rounded-lg bg-white/10" />)}
            </div>
          </div>
        </div>
      </div>

      {/* Phone app */}
      <div className="absolute bottom-0 right-1 w-[34%] min-w-[118px] animate-[floaty_6s_ease-in-out_infinite]">
        <div className="relative aspect-[9/17] overflow-hidden rounded-[1.7rem] border-[6px] border-[#0a1530] bg-gradient-to-b from-[#12306b] to-night shadow-lift ring-1 ring-white/20">
          <span className="absolute left-1/2 top-1.5 h-2.5 w-10 -translate-x-1/2 rounded-full bg-[#0a1530]" />
          <div className="space-y-2.5 px-3 pt-8">
            <span className="block h-2.5 w-12 rounded-full bg-white/40" />
            <span className="block h-16 rounded-xl bg-gradient-to-br from-accent to-cyan opacity-90" />
            {[0, 1, 2].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <span className="h-6 w-6 flex-none rounded-lg bg-white/15" />
                <span className="h-2 flex-1 rounded-full bg-white/15" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating service chips */}
      <span className={`${chip} -top-1 right-6 animate-[floaty_5s_ease-in-out_infinite]`}><Icon name="web-software" className="h-4 w-4 text-cyan" /> Web</span>
      <span className={`${chip} left-3 bottom-12 animate-[floaty_6s_ease-in-out_.8s_infinite]`}><Icon name="ai-agents" className="h-4 w-4 text-cyan" /> AI</span>
      <span className={`${chip} bottom-28 right-[40%] animate-[floaty_5.5s_ease-in-out_1.4s_infinite]`}><Icon name="cybersecurity" className="h-4 w-4 text-cyan" /> Secure</span>
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
            <path d="M1 1l8 4-8 4z" fill="#0057E7" />
          </marker>
          <marker id="wf-arrow-cyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1l8 4-8 4z" fill="#18B7FF" />
          </marker>
          <radialGradient id="wf-ring">
            <stop offset="0.5" stopColor="#E8F0FF" stopOpacity="0.15" />
            <stop offset="1" stopColor="#E8F0FF" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* sprint zone */}
        <circle cx={cx} cy={cy} r={R + 58} className="wf-band" fill="url(#wf-ring)" />

        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#0057E7" strokeOpacity=".08" strokeWidth="16" className="wf-tag" />

        {/* flow */}
        {links.map((d, i) => (
          <path key={i} d={d} pathLength="1" className="wf-draw" style={{ transitionDelay: `${0.25 + i * 0.2}s` }} stroke="#0057E7" strokeWidth="3" strokeLinecap="round" fill="none" markerEnd="url(#wf-arrow)" />
        ))}
        <path d={arc(0, 180)} pathLength="1" className="wf-draw" style={{ transitionDelay: '1.8s' }} stroke="#0057E7" strokeWidth="3" strokeLinecap="round" fill="none" markerEnd="url(#wf-arrow)" />
        <path d={refill} pathLength="1" className="wf-draw" style={{ transitionDelay: '2.2s' }} stroke="#18B7FF" strokeWidth="2.5" strokeLinecap="round" fill="none" markerEnd="url(#wf-arrow-cyan)" />
        {!still && on && (
          <circle r="6" fill="#0057E7" className="wf-dot">
            <animateMotion dur="8s" repeatCount="indefinite" path={loop} />
          </circle>
        )}

        {/* centre of the ring */}
        <g className="wf-tag" textAnchor="middle">
          <rect x={cx - 58} y={cy - 58} width="116" height="28" rx="14" fill="#0057E7" />
          <text x={cx} y={cy - 39} fill="#fff" fontSize="12" fontWeight="800" letterSpacing="2.4" className="font-display">SPRINT</text>
          <text x={cx} y={cy - 2} fill="#0F172A" fontSize="20" fontWeight="800" className="font-display">Repeats every</text>
          <text x={cx} y={cy + 24} fill="#0F172A" fontSize="20" fontWeight="800" className="font-display">1 to 2 weeks</text>
        </g>
        <g className="wf-tag" style={{ transitionDelay: '2s' }} textAnchor="middle">
          <rect x={cx - 116} y={cy + 92} width="232" height="30" rx="15" fill="#fff" stroke="#0057E7" strokeOpacity=".3" />
          <text x={cx} y={cy + 112} fill="#0A45B8" fontSize="13" fontWeight="600">Feedback shapes the next sprint</text>
        </g>
        <g className="wf-tag" style={{ transitionDelay: '2.4s' }} textAnchor="middle">
          <rect x={refillMid - 172} y={refillLow - 16} width="344" height="32" rx="16" fill="#EAF8FF" stroke="#18B7FF" strokeOpacity=".7" />
          <text x={refillMid} y={refillLow + 5} fill="#0A45B8" fontSize="14" fontWeight="600">Live feedback and new ideas refill the backlog</text>
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
              <text x={x} y={nameY} textAnchor="middle" fill="#0F172A" fontSize="17" fontWeight="700" className="font-display">{s.name}</text>
              <text x={x} y={subY} textAnchor="middle" fill="#5A6578" fontSize="13">{s.sub}</text>
            </g>
          );
        })}
      </svg>

      {/* small screens: vertical list, sprint stages grouped */}
      <ol className="space-y-3 lg:hidden">
        {steps.map((s, i) => {
          const startsSprint = s.inSprint && !steps[i - 1]?.inSprint;
          return (
            <li key={s.name} className={`wf-item flex items-center gap-4 rounded-2xl border p-4 ${s.inSprint ? 'border-accent/40 bg-tint/60' : 'border-line bg-white'}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-accent bg-white text-accent">
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
