import { Link } from 'react-router-dom';
import { team, jitin } from '../data/team.js';
import { clients } from '../data/clients.js';
import { principles, stats } from '../data/site.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import { LogoStrip, StatRow } from '../components/blocks.jsx';
import Icon from '../components/Icons.jsx';

export default function About() {
  useMeta('About', 'NandiVex Technologies is a small team that builds AI voice agents, Android apps and web software.');
  const stack = [...new Set(jitin.skills.flatMap(([, items]) => items))];
  return (
    <>
      <PageHeader eyebrow="About" title="A small team that ships AI assistants and the software around them.">
        NandiVex Technologies designs and builds voice and chat agents, Android apps and web software.
        We keep the team small so you deal with the people doing the work.
      </PageHeader>

      <section className="border-b border-line bg-white py-8">
        <div className="wrap"><LogoStrip clients={clients} /></div>
      </section>

      <Section eyebrow="Our story" title="From open-source agents to products people use.">
        <div className="grid gap-12 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted">
            We started by building AI agents that think, see, listen and act. That work grew into real products:
            ULTRON, a voice assistant for Android that people subscribe to, and three voice assistants shipped for Nirman Labs,
            a robotics and coding education company that works with schools.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Today we take on a few projects at a time. Each one gets design, AI, app, backend and deployment from the
            same team, so nothing is lost between vendors and you always know who to call.
          </p>
        </div>
        <div className="mt-14"><StatRow stats={stats} /></div>
      </Section>

      <Section id="team" eyebrow="Team" title="The people behind the work." tone="soft">
        <ul className="grid gap-6 sm:grid-cols-2">
          {team.map((m) => (
            <li key={m.slug}>
              <Link to={`/team/${m.slug}`} className="card-hover group flex h-full flex-col overflow-hidden !p-0 sm:flex-row">
                <img src={m.photo} alt={m.name} loading="lazy" width="800" height="1000" className="aspect-[4/5] w-full object-cover sm:w-44" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="label">{m.role}</p>
                  <h3 className="mt-2 text-2xl">{m.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{m.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View profile <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

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

      <Section eyebrow="Stack" title="Tools we work with." tone="soft">
        <ul className="flex flex-wrap gap-2">
          {stack.map((t) => <li key={t} className="chip !font-mono">{t}</li>)}
        </ul>
      </Section>
      <CTA />
    </>
  );
}
