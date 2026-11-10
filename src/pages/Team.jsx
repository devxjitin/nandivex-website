import { jitin, ultron, otherProjects } from '../data/team.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

export default function Team() {
  useMeta('Team', 'Meet the engineers at NandiVex Technologies and the products they have built, including the ULTRON Android AI assistant.');
  return (
    <>
      <PageHeader eyebrow="Team" title="The people behind the work.">
        Small, senior-leaning and hands-on. Here is who you would be working with.
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <img src={jitin.photo} alt={jitin.name} className="aspect-[4/5] w-full max-w-sm rounded-3xl object-cover shadow-card" />
          <div>
            <p className="label">{jitin.role}</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">{jitin.name}</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
              {jitin.bio.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {jitin.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-line">
                  {l.label} <Icon name="arrow" className="h-4 w-4 -rotate-45" />
                </a>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {jitin.stats.map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-extrabold text-accent">{n}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section eyebrow="Skills" title="What Jitin works with." tone="soft">
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

      <section id="ultron" className="bg-night text-white">
        <div className="wrap py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="label !text-cyan">Our product</p>
              <h2 className="mt-3 text-5xl sm:text-6xl">{ultron.name}</h2>
              <p className="mt-2 font-display text-lg font-bold text-cyan">{ultron.tag}</p>
              <p className="mt-6 max-w-xl leading-relaxed text-white/70">{ultron.summary}</p>
              <ul className="mt-6 space-y-3">
                {ultron.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent text-white"><Icon name="check" className="h-3 w-3" /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2">
                {ultron.stack.map((s) => <li key={s} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/80">{s}</li>)}
              </ul>
              <a href={ultron.siteRepo} target="_blank" rel="noopener noreferrer" className="btn mt-8 border-white/25 text-white hover:bg-white/10">
                ULTRON website source <Icon name="arrow" className="h-4 w-4 -rotate-45" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
              {ultron.shots.map(([src, alt]) => (
                <img key={src} src={src} alt={alt} loading="lazy" className="w-full rounded-2xl border border-white/10 bg-black/30 object-contain shadow-card" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="More work" title="Other things we have built.">
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

      <Section eyebrow="Education" title="Background." tone="soft">
        <ul className="grid gap-5 sm:grid-cols-2">
          {jitin.education.map(([d, s, y]) => (
            <li key={d} className="card">
              <p className="font-display text-xl font-bold">{d}</p>
              <p className="mt-1 text-muted">{s}</p>
              <p className="label mt-3 !text-muted">{y}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CTA title="Want an assistant like ULTRON for your business?" label="Talk to us" />
    </>
  );
}
