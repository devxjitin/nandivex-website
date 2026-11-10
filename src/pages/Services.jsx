import { Link } from 'react-router-dom';
import services from '../data/services.json';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

const blurbs = {
  Build: 'Software your customers and staff use every day.',
  Scale: 'Infrastructure that stays up as you grow.',
  Secure: 'Testing and hardening before attackers find the gaps.',
};

export default function Services() {
  useMeta('Services', 'Web development, AI agents, Android software, cloud, IT infrastructure, cybersecurity and DevOps from NandiVex Technologies.');
  return (
    <>
      <PageHeader eyebrow="Services" title="What we do.">
        From customer-facing web apps to server operations and authorised security testing,
        we cover the full engineering lifecycle.
      </PageHeader>
      {['Build', 'Scale', 'Secure'].map((cat, n) => (
        <Section key={cat} eyebrow={cat} title={blurbs[cat]} tone={n % 2 === 0 ? 'white' : 'soft'}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.category === cat).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card-hover group flex flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={s.slug} />
                </span>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Details <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      ))}
      <CTA />
    </>
  );
}
