import { Link } from 'react-router-dom';
import services from '../data/services.json';
import projects from '../data/projects.json';
import industries from '../data/industries.json';
import { process } from '../data/site.js';
import { principles } from '../data/site.js';
import { CTA, Section, useMeta } from '../components/ui.jsx';

const groups = [
  ['Build', 'Software people use'],
  ['Scale', 'Infrastructure that stays up'],
  ['Secure', 'Systems that hold under attack'],
];

export default function Home() {
  useMeta();
  const featured = projects.slice(0, 3);

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <p className="label mb-6">Web · Infrastructure · Security</p>
            <h1 className="text-5xl leading-[1.02] sm:text-7xl">
              We build, run and secure the software behind your business.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              NANDIVEX is an engineering team for web and mobile products, cloud and server
              infrastructure, and security testing. We take work from first sketch to
              production, and stay on to keep it healthy.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-solid">Start a project</Link>
              <Link to="/projects" className="btn-line">See our work</Link>
            </div>
          </div>
          <ol className="border-t border-ink">
            {groups.map(([name, line], i) => (
              <li key={name} className="flex items-baseline justify-between gap-4 border-b border-line py-5">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <span className="flex-1 font-display text-3xl">{name}</span>
                <span className="max-w-[12rem] text-right text-sm text-muted">{line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section eyebrow="Services" title="Nine services, one team that owns the outcome.">
        <div className="space-y-12">
          {groups.map(([name]) => (
            <div key={name} className="grid gap-4 md:grid-cols-[1fr_2fr]">
              <h3 className="font-display text-2xl text-accent">{name}</h3>
              <ul className="border-t border-ink">
                {services.filter((s) => s.category === name).map((s) => (
                  <li key={s.slug} className="border-b border-line">
                    <Link to={`/services/${s.slug}`} className="group flex items-start justify-between gap-6 py-5">
                      <div>
                        <p className="font-medium group-hover:text-accent">{s.title}</p>
                        <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted">{s.description}</p>
                      </div>
                      <span aria-hidden className="pt-0.5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Selected work" title="Problems we solved, with the numbers.">
        <div className="border-t border-ink">
          {featured.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`} className="group grid gap-4 border-b border-line py-8 md:grid-cols-[1fr_2fr_1.2fr] md:items-start">
              <p className="label pt-1">{p.industry}</p>
              <div>
                <h3 className="text-2xl group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{p.shortDescription}</p>
              </div>
              <p className="border-l-2 border-accent pl-4 text-sm leading-relaxed">{p.results[0]}</p>
            </Link>
          ))}
        </div>
        <Link to="/projects" className="mt-8 inline-block text-sm font-medium text-accent underline underline-offset-4">All case studies</Link>
      </Section>

      <Section eyebrow="How we work" title="Six stages, from first call to handover.">
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {process.map((s, i) => (
            <li key={s.name} className="bg-paper p-6">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-sans text-base font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Principles" title="What you can expect from us.">
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {principles.map(([t, d]) => (
            <div key={t} className="border-t border-ink pt-4">
              <dt className="font-medium">{t}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Industries" title="Experience across regulated and high-traffic sectors.">
        <ul className="flex flex-wrap gap-2">
          {industries.map((i) => (
            <li key={i.id}><Link to="/industries" className="inline-block border border-line px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">{i.title}</Link></li>
          ))}
        </ul>
      </Section>

      <CTA />
    </>
  );
}
