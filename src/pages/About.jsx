import { Link } from 'react-router-dom';
import { team, jitin } from '../data/team.js';
import services from '../data/services.json';
import { techIcons } from '../data/techIcons.js';
import { clients } from '../data/clients.js';
import { principles, stats, workflow } from '../data/site.js';
import { PageHeader, Section, useMeta } from '../components/ui.jsx';
import { Avatar, ClientsSection, HeroVisual, ServiceCard, StatRow, WorkflowDiagram } from '../components/blocks.jsx';
import Icon from '../components/Icons.jsx';
import { ContactSection } from './Contact.jsx';

export default function About() {
  useMeta(undefined, 'NandiVex Technologies builds AI assistants and automation, custom websites, web platforms, and Android and Windows apps that turn business challenges into scalable software.');
  const aiTools = ['Claude', 'Codex', 'Antigravity', 'LangChain', 'LangGraph'];
  const moreTools = ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'Express', 'Vite', 'REST APIs', 'Android', 'Flutter', 'MongoDB', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'Nginx', 'Kubernetes', 'GitHub', 'Postman', 'Figma', 'Voice AI', 'Automation', 'Penetration testing', 'API security'];
  const stack = [...new Set([...jitin.skills.flatMap(([, items]) => items), ...aiTools, ...moreTools])].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  return (
    <>
      <PageHeader eyebrow="Build with NandiVex" title="Software shaped around the way you work." visual={<HeroVisual />}>
        We turn complex business challenges into scalable, future-ready software: AI assistants and automation, websites and web platforms,
        and Android and Windows apps.
      </PageHeader>

      <Section eyebrow="About NandiVex" title="From a rough idea to software people use.">
        <div className="grid gap-12 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-muted">
            Collaboration is at the heart of how we work. We start by understanding your goals, your users and your constraints,
            then design and build software that fits the way you operate, from a first prototype to a live, supported release.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Our first delivered product is Nira, a voice assistant built for Nirman Labs, a robotics and coding education brand that works with schools.
            Design, app, backend, AI and deployment come from the same hands, so nothing is lost between vendors.
          </p>
        </div>
        <div className="mt-14"><StatRow stats={stats} /></div>
        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="label mb-3">Products</p>
            <p className="text-lg leading-relaxed text-muted">
              Besides client projects, NandiVex has software of its own that you can subscribe to. Our first product is ULTRON, a voice assistant
              that works your Android phone for you. We build, ship and support what we sell, the same way we do for clients.
            </p>
          </div>
          <Link to="/products" className="btn-line flex-none self-start md:self-auto">
            See our products <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section eyebrow="What we do" title="Everything your product needs, under one roof." tone="soft">
        <div className="grid gap-5 md:grid-cols-2 md:[&>:last-child:nth-child(odd)]:col-span-2 lg:grid-cols-6 lg:[&>*]:col-span-2 lg:[&>:nth-last-child(2):nth-child(3n+1)]:col-start-2">
          {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </Section>

      <Section id="team" eyebrow="Team" title="The people behind the work." tone="dark">
        <ul className="grid gap-6 sm:grid-cols-2">
          {team.map((m) => (
            <li key={m.slug}>
              <Link to={`/team/${m.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-ink sm:flex-row shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-lift">
                <div className="overflow-hidden sm:w-[38%] sm:flex-none">
                  <Avatar m={m} textClass="text-6xl" className="aspect-[5/4] w-full object-cover sm:aspect-auto sm:h-full transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="label">{m.role}</p>
                  <h3 className="mt-2 text-xl transition-colors duration-300 group-hover:text-accent">{m.name}</h3>
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

      <Section eyebrow="Principles" title="Built to last, and to grow with you.">
        <ol className="border-b-2 border-ink/10">
          {principles.map(([t, d], i) => (
            <li key={t} className="group relative overflow-hidden border-t-2 border-ink/10">
              <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <div className="relative grid items-center gap-x-8 gap-y-2 px-2 py-7 transition-[padding] duration-500 group-hover:px-6 sm:py-9 md:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.1fr)_2rem]">
                <span className="font-mono text-sm font-semibold text-accent transition-colors duration-300 group-hover:text-white/70">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl font-extrabold tracking-tight transition-colors duration-300 group-hover:text-white sm:text-3xl">{t}</h3>
                <p className="leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/85">{d}</p>
                <Icon name="arrow" className="hidden h-6 w-6 -translate-x-3 text-white opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Stack" title="Tools we work with." tone="soft">
        <div className="marquee-wrap overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
          <div className="marquee flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex flex-none gap-2 pr-2" aria-hidden={copy === 1 || undefined}>
                {stack.map((t) => {
                  const ic = techIcons[t];
                  return (
                    <li key={t} className="chip flex flex-none items-center gap-2.5 whitespace-nowrap !px-5 !py-3 !text-base !font-mono">
                      {ic?.src && <img src={ic.src} alt="" width="28" height="28" loading="lazy" className="h-7 w-7 flex-none" />}
                      {ic?.icon && <Icon name={ic.icon} className="h-7 w-7 flex-none text-accent" />}
                      {t}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </Section>
      <ClientsSection clients={clients} />

      <Section eyebrow="How we work" title="Agile delivery, sprint by sprint.">
        <WorkflowDiagram steps={workflow} />
      </Section>

      <ContactSection />
    </>
  );
}
