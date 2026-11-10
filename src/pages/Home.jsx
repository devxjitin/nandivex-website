import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import services from '../data/services.json';
import projects from '../data/projects.json';
import industries from '../data/industries.json';
import tech from '../data/techStack.json';
import { process, principles } from '../data/site.js';
import { CTA, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';
import { CountUp, RotatingWord, ScrollTimeline } from '../components/motion.jsx';

const groups = [
  { name: 'Build', line: 'Websites, web apps, mobile apps and custom software.' },
  { name: 'Scale', line: 'Cloud, servers, networks and automated delivery.' },
  { name: 'Secure', line: 'Penetration testing, audits and hardening.' },
];

const stats = [
  { prefix: '', value: 99.99, decimals: 2, suffix: '%', label: 'Availability after a cloud migration' },
  { prefix: '', value: 45, decimals: 0, suffix: ' min', label: 'Loan processing, down from 5 days' },
  { prefix: '', value: 2, decimals: 0, suffix: ' days', label: 'Month-end close, down from 14' },
  { prefix: '−', value: 32, decimals: 0, suffix: '%', label: 'Infrastructure running cost' },
];

/* nodes that orbit the logo: [ring index, angle in degrees, icon] */
const orbit = [
  [0, 20, 'cloud-services'],
  [0, 200, 'cybersecurity'],
  [1, 110, 'it-infrastructure'],
  [1, 290, 'software-development'],
  [2, 60, 'mobile-app-development'],
  [2, 180, 'devops'],
  [2, 300, 'web-development'],
];
const rings = [
  { size: '52%', dur: 28, dir: 'normal' },
  { size: '76%', dur: 46, dir: 'reverse' },
  { size: '100%', dur: 70, dir: 'normal' },
];

function HeroOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/40" style={{ animation: 'pulse-ring 3.2s ease-out infinite' }} />
      <img src="/logo.png" alt="" className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-lift" style={{ animation: 'floaty 5s ease-in-out infinite' }} />
      {rings.map((r, ri) => (
        <div
          key={r.size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
          style={{ width: r.size, height: r.size, animation: `spin ${r.dur}s linear infinite ${r.dir}` }}
        >
          {orbit.filter((o) => o[0] === ri).map(([, deg, icon]) => (
            <span
              key={icon}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-night text-cyan shadow-card"
              style={{ left: `${50 + 50 * Math.cos((deg * Math.PI) / 180)}%`, top: `${50 + 50 * Math.sin((deg * Math.PI) / 180)}%` }}
            >
              <span className="flex" style={{ animation: `spin ${r.dur}s linear infinite ${r.dir === 'normal' ? 'reverse' : 'normal'}` }}>
                <Icon name={icon} className="h-5 w-5" />
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Marquee({ items, reverse = false, pill = false }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-wrap fade-edges overflow-hidden">
      <div className={`flex w-max gap-3 ${reverse ? 'marquee-rev' : 'marquee'}`}>
        {row.map((t, i) => (
          <span key={t + i} className={pill ? 'chip !px-5 !py-2.5 !text-sm' : 'whitespace-nowrap px-4 font-display text-xl font-bold text-ink/30 sm:text-2xl'}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceTabs() {
  const [tab, setTab] = useState('Build');
  const list = services.filter((s) => s.category === tab);
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">
      <div role="tablist" aria-label="Service areas" className="flex gap-3 lg:flex-col">
        {groups.map((g, i) => {
          const on = tab === g.name;
          return (
            <button
              key={g.name}
              role="tab"
              aria-selected={on}
              onClick={() => setTab(g.name)}
              className={`flex-1 rounded-2xl border p-5 text-left transition-all duration-300 lg:flex-none ${on ? 'border-accent bg-accent text-white shadow-lift' : 'border-line bg-white hover:border-accent/40'}`}
            >
              <span className={`font-display text-xs font-bold ${on ? 'text-white/70' : 'text-accent'}`}>0{i + 1}</span>
              <span className="mt-1 block font-display text-2xl font-extrabold sm:text-3xl">{g.name}</span>
              <span className={`mt-2 hidden text-sm leading-snug sm:block ${on ? 'text-white/80' : 'text-muted'}`}>{g.line}</span>
            </button>
          );
        })}
      </div>
      <ul key={tab} role="tabpanel" className="space-y-3">
        {list.map((s, i) => (
          <li key={s.slug} className="animate-[pagein_.5s_ease-out_both]" style={{ animationDelay: `${i * 80}ms` }}>
            <Link to={`/services/${s.slug}`} className="card-hover group flex items-center gap-5 !p-5">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-tint text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon name={s.slug} />
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-bold">{s.title}</span>
                <span className="mt-0.5 block text-sm leading-snug text-muted">{s.subtitle}</span>
              </span>
              <Icon name="arrow" className="h-5 w-5 flex-none text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkCarousel() {
  const ref = useRef(null);
  const by = (d) => ref.current?.scrollBy({ left: d * 440, behavior: 'smooth' });
  return (
    <>
      <div className="mb-6 flex gap-2">
        <button onClick={() => by(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white hover:border-accent hover:text-accent"><Icon name="arrow" className="h-5 w-5 rotate-180" /></button>
        <button onClick={() => by(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white hover:border-accent hover:text-accent"><Icon name="arrow" className="h-5 w-5" /></button>
      </div>
      <div ref={ref} data-lenis-prevent className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
        {projects.map((p) => (
          <Link key={p.slug} to={`/project/${p.slug}`} className="card-hover group flex w-[82%] flex-none snap-start flex-col overflow-hidden !p-0 sm:w-[420px]">
            <div className="overflow-hidden">
              <img src={p.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="label">{p.industry}</p>
              <h3 className="mt-3 text-xl leading-snug">{p.title}</h3>
              <p className="mt-auto pt-5 text-sm font-semibold leading-snug text-accent-dark">{p.results[0]}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  useMeta();
  const stack = Object.values(tech).flat().map((t) => t.name);

  return (
    <>
      {/* Hero */}
      <section data-hero className="relative overflow-hidden bg-night text-white">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="wrap relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="animate-[pagein_.8s_ease-out_both]">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Web · Infrastructure · Security
            </p>
            <h1 className="text-5xl leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
              We <RotatingWord words={['build', 'run', 'secure']} className="text-cyan" /> the software behind your business.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              An engineering team for web and mobile products, cloud and server infrastructure,
              and security testing. We take work from first sketch to production, and stay on to keep it healthy.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-cyan hover:text-night">
                Start a project <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="btn border-white/25 text-white hover:border-white hover:bg-white/10">See our work</Link>
            </div>
          </div>
          <div className="animate-[pagein_1s_ease-out_.2s_both]"><HeroOrbit /></div>
        </div>
      </section>

      {/* Tech marquee */}
      <section data-hero className="border-b border-line bg-white py-8">
        <Marquee items={stack} />
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="wrap py-16">
          <p className="label mb-8">Results from our case studies</p>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">
                  <CountUp {...s} />
                </dt>
                <dd className="mt-2 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <Section eyebrow="Services" title="Pick an area. See what we do." tone="soft">
        <ServiceTabs />
      </Section>

      {/* Work */}
      <Section eyebrow="Selected work" title="Problems we solved, with the numbers.">
        <WorkCarousel />
        <Link to="/projects" className="btn-line mt-8">All case studies <Icon name="arrow" className="h-4 w-4" /></Link>
      </Section>

      {/* Process */}
      <Section eyebrow="How we work" title="Six stages, from first call to handover." tone="soft">
        <ScrollTimeline steps={process} />
      </Section>

      {/* Principles */}
      <Section eyebrow="Principles" title="What you can expect from us.">
        <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {principles.map(([t, d]) => (
            <div key={t} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-white"><Icon name="check" className="h-3.5 w-3.5" /></span>
              <div>
                <dt className="font-display font-bold">{t}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{d}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Section>

      {/* Industries */}
      <section data-hero className="overflow-hidden bg-soft py-16">
        <div className="wrap mb-8">
          <p className="label mb-3">Industries</p>
          <h2 className="max-w-2xl text-3xl sm:text-4xl">Experience across regulated and high-traffic sectors.</h2>
        </div>
        <Marquee items={industries.map((i) => i.title)} pill reverse />
      </section>

      <CTA />
    </>
  );
}
