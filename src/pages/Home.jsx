import { Link } from 'react-router-dom';
import services from '../data/services.json';
import projects from '../data/projects.json';
import industries from '../data/industries.json';
import { process, principles } from '../data/site.js';
import { CTA, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

const groups = [
  { name: 'Build', icon: 'build', line: 'Websites, web apps, mobile apps and custom software.' },
  { name: 'Scale', icon: 'scale', line: 'Cloud, servers, networks and automated delivery.' },
  { name: 'Secure', icon: 'secure', line: 'Penetration testing, audits and hardening.' },
];

const stats = [
  ['5 days → 45 min', 'Loan processing time, lending platform'],
  ['14 → 2 days', 'Month-end financial close, ERP'],
  ['99.99%', 'Availability after cloud migration'],
  ['−32%', 'Infrastructure cost after rightsizing'],
];

export default function Home() {
  useMeta();
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-night text-white">
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div className="wrap relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="animate-rise">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Web · Infrastructure · Security
            </p>
            <h1 className="text-5xl leading-[1.04] sm:text-6xl lg:text-[4.25rem]">
              We build, run and <span className="text-cyan">secure</span> the software behind your business.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              NANDIVEX is an engineering team for web and mobile products, cloud and server
              infrastructure, and security testing. We take work from first sketch to production,
              and stay on to keep it healthy.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-cyan hover:text-night">
                Start a project <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="btn border-white/25 text-white hover:border-white hover:bg-white/10">See our work</Link>
            </div>
          </div>

          <div className="animate-rise space-y-4 [animation-delay:.15s]">
            {groups.map((g, i) => (
              <div key={g.name} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm" style={{ marginLeft: i === 1 ? '1.5rem' : 0 }}>
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-xl bg-accent text-white">
                  <Icon name={g.icon} className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">{g.name}</p>
                  <p className="mt-0.5 text-sm text-white/65">{g.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <div className="wrap py-12">
          <p className="label mb-6">Results from our case studies</p>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map(([n, l]) => (
              <div key={n}>
                <dt className="font-display text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">{n}</dt>
                <dd className="mt-2 text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <Section eyebrow="Services" title="One team for the whole stack." tone="soft">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card-hover group flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon name={s.slug} />
              </span>
              <p className="label mt-5 !text-muted">{s.category}</p>
              <h3 className="mt-1 text-xl">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Work */}
      <Section eyebrow="Selected work" title="Problems we solved, with the numbers.">
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`} className="card-hover group flex flex-col overflow-hidden !p-0">
              <img src={p.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
              <p className="label">{p.industry}</p>
              <h3 className="mt-3 text-xl leading-snug">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.shortDescription}</p>
              <p className="mt-5 rounded-xl bg-tint p-4 text-sm font-semibold leading-snug text-accent-dark">{p.results[0]}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/projects" className="btn-line mt-10">All case studies <Icon name="arrow" className="h-4 w-4" /></Link>
      </Section>

      {/* Process */}
      <Section eyebrow="How we work" title="Six stages, from first call to handover." tone="soft">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((s, i) => (
            <li key={s.name} className="card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-extrabold text-white">{i + 1}</span>
              <h3 className="mt-4 text-lg">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
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
      <Section eyebrow="Industries" title="Experience across regulated and high-traffic sectors." tone="soft">
        <ul className="flex flex-wrap gap-3">
          {industries.map((i) => (
            <li key={i.id}>
              <Link to="/industries" className="chip !px-5 !py-2.5 !text-sm transition-colors hover:border-accent hover:bg-accent hover:text-white">{i.title}</Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA />
    </>
  );
}
