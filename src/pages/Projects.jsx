import { Link } from 'react-router-dom';
import projects from '../data/projects.json';
import { ultron, otherProjects, jitin } from '../data/team.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

export default function Projects() {
  useMeta('Work', 'AI agents, Android software and client case studies from NandiVex Technologies across fintech, logistics, legal, hospitality, ERP, cloud and security.');
  return (
    <>
      <PageHeader eyebrow="Work" title="What we have built.">
        AI agents and Android software we ship ourselves, and production systems we delivered for clients, with the problem, the approach and the measured result.
      </PageHeader>

      {/* AI agents and Android */}
      <section className="bg-night text-white">
        <div className="wrap py-16 sm:py-24">
          <p className="label mb-3 !text-cyan">AI agents and Android software</p>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl">{ultron.name}</h2>
              <p className="mt-2 font-display text-lg font-bold text-cyan">{ultron.tag}</p>
              <p className="mt-5 max-w-xl leading-relaxed text-white/70">{ultron.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ultron.stack.map((s) => <li key={s} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/80">{s}</li>)}
              </ul>
              <Link to="/team#ultron" className="btn mt-8 bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-cyan hover:text-night">
                See ULTRON in detail <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {ultron.shots.map(([src, alt]) => (
                <img key={src} src={src} alt={alt} loading="lazy" className="w-full rounded-xl border border-white/10 bg-black/30 object-contain" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="More products" title="Agents, platforms and kiosks.">
        <div className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((p) => (
            <article key={p.name} className="card flex flex-col">
              <p className="label">{p.tag}</p>
              <h3 className="mt-2 text-2xl">{p.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
              {p.links.length > 0 && (
                <div className="mt-5 flex gap-4 text-sm font-semibold text-accent">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{l.label}</a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* Client case studies */}
      <Section eyebrow="Client case studies" title="Production systems, with the numbers." tone="soft">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`} className="card-hover group flex flex-col overflow-hidden !p-0">
              <img src={p.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="flex flex-1 flex-col p-8">
                <p className="label">{p.industry}</p>
                <h3 className="mt-3 text-2xl leading-snug group-hover:text-accent">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.shortDescription}</p>
                <ul className="mt-6 space-y-2 rounded-xl bg-tint p-4 text-sm font-semibold leading-snug text-accent-dark">
                  {p.results.slice(0, 2).map((r) => <li key={r}>{r}</li>)}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read the case study <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section eyebrow="Skills" title="What we build with.">
        <div className="grid gap-5 md:grid-cols-2">
          {jitin.skills.map(([group, items]) => (
            <div key={group} className="card">
              <h3 className="text-lg">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CTA title="Want an AI agent or an Android app built?" label="Start a project" />
    </>
  );
}
