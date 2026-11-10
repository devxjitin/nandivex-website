import { Link } from 'react-router-dom';
import services from '../data/services.json';
import { CTA, PageHeader, useMeta } from '../components/ui.jsx';

export default function Services() {
  useMeta('Services', 'Web development, mobile apps, cloud, IT infrastructure, cybersecurity and DevOps from NANDIVEX.');
  return (
    <>
      <PageHeader eyebrow="Services" title="What we do.">
        From customer-facing web apps to server operations and authorised security testing,
        we cover the full engineering lifecycle.
      </PageHeader>
      <section className="border-b border-line">
        <div className="wrap py-6">
          {['Build', 'Scale', 'Secure'].map((cat) => (
            <div key={cat} className="grid gap-4 border-b border-line py-10 last:border-0 md:grid-cols-[1fr_3fr]">
              <h2 className="font-display text-3xl text-accent">{cat}</h2>
              <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {services.filter((s) => s.category === cat).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="group block">
                      <h3 className="font-sans text-lg font-semibold group-hover:text-accent">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                      <p className="mt-3 text-sm text-accent">Details →</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
