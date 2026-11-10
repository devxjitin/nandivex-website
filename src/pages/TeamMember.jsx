import { Link, useParams } from 'react-router-dom';
import { team } from '../data/team.js';
import { Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';
import { Avatar } from '../components/blocks.jsx';
import NotFound from './NotFound.jsx';

export default function TeamMember() {
  const { slug } = useParams();
  const m = team.find((x) => x.slug === slug);
  useMeta(m ? m.name : 'Team', m ? `${m.name}, ${m.role} at NandiVex Technologies. ${m.short}` : undefined);
  if (!m) return <NotFound />;
  const first = m.name.split(' ')[0];

  return (
    <>
      <Section>
        <Link to="/#team" className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> Back to team
        </Link>
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <Avatar m={m} textClass="text-8xl" className="aspect-[4/5] w-full max-w-sm rounded-3xl object-cover shadow-card" />
          <div>
            <p className="label">{m.role}</p>
            <h1 className="mt-2 text-4xl sm:text-5xl">{m.name}</h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
              {m.bio.map((p) => <p key={p}>{p}</p>)}
            </div>
            {m.links?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {m.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="btn-line">
                    {l.label} <Icon name="arrow" className="h-4 w-4 -rotate-45" />
                  </a>
                ))}
              </div>
            )}
            {m.stats?.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
                {m.stats.map(([n, l]) => (
                  <div key={l}>
                    <dt className="font-display text-3xl font-extrabold text-accent">{n}</dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </Section>

      {m.skills?.length > 0 && (
        <Section eyebrow="Skills" title={`What ${first} works with.`} tone="soft">
          <div className="grid gap-5 md:grid-cols-2">
            {m.skills.map(([group, items]) => (
              <div key={group} className="card">
                <h3 className="text-lg">{group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {m.experience?.length > 0 && (
        <Section eyebrow="Experience" title={`Where ${first} has worked.`}>
          <ul className="space-y-5">
            {m.experience.map((e) => (
              <li key={e.role + e.org} className="card">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-xl">{e.role}</h3>
                  <span className="label !text-muted">{e.period}</span>
                </div>
                <p className="mt-1 font-semibold text-accent-dark">{e.org}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {m.projects?.length > 0 && (
        <Section eyebrow="Projects" title={`Things ${first} has built.`}>
          <div className="grid gap-5 md:grid-cols-3">
            {m.projects.map((p) => (
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
      )}

      {m.education?.length > 0 && (
        <Section eyebrow="Education" title="Background." tone="soft">
          <ul className="grid gap-5 sm:grid-cols-2">
            {m.education.map(([d, s, y]) => (
              <li key={d} className="card">
                <p className="font-display text-xl font-bold">{d}</p>
                <p className="mt-1 text-muted">{s}</p>
                <p className="label mt-3 !text-muted">{y}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

    </>
  );
}
