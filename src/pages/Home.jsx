import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import services from '../data/services.json';
import projects from '../data/projects.json';
import industries from '../data/industries.json';
import tech from '../data/techStack.json';
import { process, principles } from '../data/site.js';
import { ultron, jitin } from '../data/team.js';
import { CTA, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';
import { CountUp, RotatingWord, ScrollTimeline } from '../components/motion.jsx';

const groups = [
  { name: 'Build', line: 'AI agents, Android apps, websites and custom software.' },
  { name: 'Scale', line: 'Cloud, servers, networks and automated delivery.' },
  { name: 'Secure', line: 'Penetration testing, audits and hardening.' },
];

const stats = [
  { prefix: '', value: 99.99, decimals: 2, suffix: '%', label: 'Availability after a cloud migration' },
  { prefix: '', value: 45, decimals: 0, suffix: ' min', label: 'Loan processing, down from 5 days' },
  { prefix: '', value: 2, decimals: 0, suffix: ' days', label: 'Month-end close, down from 14' },
  { prefix: '−', value: 32, decimals: 0, suffix: '%', label: 'Infrastructure running cost' },
];

/* Orbit nodes: ring index, start angle (deg), icon. Rings have a radius (% of the box) and a speed (deg/s). */
const orbit = [
  { ring: 0, deg: 20, icon: 'cloud-services' },
  { ring: 0, deg: 200, icon: 'cybersecurity' },
  { ring: 1, deg: 110, icon: 'it-infrastructure' },
  { ring: 1, deg: 290, icon: 'software-development' },
  { ring: 2, deg: 60, icon: 'android-software' },
  { ring: 2, deg: 180, icon: 'ai-agents' },
  { ring: 2, deg: 300, icon: 'web-development' },
];
const rings = [
  { radius: 26, speed: 13 },
  { radius: 38, speed: -8 },
  { radius: 49, speed: 5 },
];

function HeroOrbit() {
  const nodes = useRef([]);

  useEffect(() => {
    const box = nodes.current[0]?.parentElement;
    let size = box ? box.offsetWidth : 0;
    const onResize = () => { size = box ? box.offsetWidth : size; };
    window.addEventListener('resize', onResize);
    const place = (t) => {
      orbit.forEach((o, i) => {
        const el = nodes.current[i];
        if (!el) return;
        const r = rings[o.ring];
        const a = ((o.deg + r.speed * t) * Math.PI) / 180;
        el.style.transform = `translate(-50%, -50%) translate(${(r.radius * Math.cos(a) * size) / 100}px, ${(r.radius * Math.sin(a) * size) / 100}px)`;
      });
    };
    place(0);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => window.removeEventListener('resize', onResize);
    let raf;
    const t0 = performance.now();
    const loop = (now) => {
      place((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
      {rings.map((r) => (
        <span
          key={r.radius}
          className="absolute rounded-full border border-dashed border-white/20"
          style={{ left: `${50 - r.radius}%`, top: `${50 - r.radius}%`, width: `${r.radius * 2}%`, height: `${r.radius * 2}%` }}
        />
      ))}
      <span className="absolute inset-0 m-auto h-[20%] w-[20%] rounded-full border border-cyan/40" style={{ animation: 'pulse-ring 3.2s ease-out infinite' }} />
      <div className="absolute inset-0 m-auto flex h-[24%] w-[24%] items-center justify-center">
        <img src="/logo.png" alt="" className="h-full w-full rounded-3xl shadow-lift" style={{ animation: 'floaty 5s ease-in-out infinite' }} />
      </div>
      {orbit.map((o, i) => (
        <span
          key={o.icon}
          ref={(el) => { nodes.current[i] = el; }}
          className="absolute left-1/2 top-1/2 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-night text-cyan shadow-card"
        >
          <Icon name={o.icon} className="h-5 w-5" />
        </span>
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
  const skillNames = jitin.skills.flatMap(([, items]) => items);
  const stack = [...new Set([...skillNames, ...Object.values(tech).flat().map((t) => t.name)])];

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
              <span className="block">We <RotatingWord words={['build', 'run', 'secure']} className="text-cyan" /></span>
              the software behind your business.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              An engineering team for AI agents, Android software and web products, plus the cloud and server infrastructure
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

      {/* What we provide */}
      <Section eyebrow="What we provide" title="AI agents and Android software, built end to end.">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { slug: 'ai-agents', title: 'AI Agents', text: 'Voice and chat assistants that use your tools and documents to finish real tasks, with approvals and logs so you stay in control.', tags: ['Voice', 'RAG', 'Tool calling', 'MCP'] },
            { slug: 'android-software', title: 'Android Software', text: 'Native Kotlin apps for assistants, kiosks and business tools, with offline support, over-the-air updates and a release pipeline.', tags: ['Kotlin', 'Jetpack Compose', 'On-device search', 'OTA updates'] },
          ].map((c) => (
            <Link key={c.slug} to={`/services/${c.slug}`} className="card-hover group flex flex-col !p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white">
                <Icon name={c.slug} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-3xl">{c.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{c.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section eyebrow="Services" title="Pick an area. See what we do." tone="soft">
        <ServiceTabs />
      </Section>

      {/* Work */}
      <Section eyebrow="Selected work" title="Problems we solved, with the numbers.">
        <WorkCarousel />
        <Link to="/projects" className="btn-line mt-8">All case studies <Icon name="arrow" className="h-4 w-4" /></Link>
      </Section>

      {/* In-house product */}
      <section className="bg-night text-white">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="label !text-cyan">Our own product</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">ULTRON, an AI assistant for Android.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/70">{ultron.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products#ultron" className="btn bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-cyan hover:text-night">
                See plans and pricing <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/team" className="btn border-white/25 text-white hover:bg-white/10">Meet the team</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {ultron.shots.slice(0, 3).map(([src, alt], i) => (
              <img key={src} src={src} alt={alt} loading="lazy" width="720" height="1600" className={`aspect-[9/20] w-full rounded-2xl border border-white/10 bg-black/30 object-contain shadow-card ${i === 1 ? 'translate-y-6' : ''}`} />
            ))}
          </div>
        </div>
      </section>

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
