import industries from '../data/industries.json';
import { CTA, PageHeader, useMeta } from '../components/ui.jsx';

export default function Industries() {
  useMeta('Industries', 'Software, infrastructure and security built for fintech, healthcare, logistics, e-commerce, hospitality, legal, education and more.');
  return (
    <>
      <PageHeader eyebrow="Industries" title="Built for the pressures of your sector.">
        Every sector has its own regulations, traffic patterns and failure costs. We design
        around them from the first architecture decision.
      </PageHeader>
      <section className="border-b border-line">
        <div className="wrap">
          {industries.map((i, n) => (
            <article key={i.id} id={i.id} className="grid gap-8 border-b border-line py-14 last:border-0 lg:grid-cols-[1fr_2fr]">
              <header>
                <p className="font-mono text-xs text-accent">{String(n + 1).padStart(2, '0')}</p>
                <h2 className="mt-3 text-3xl">{i.title}</h2>
                <p className="label mt-3">{i.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{i.description}</p>
              </header>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider">The problem</h3>
                  <ul className="space-y-3 border-t border-ink pt-4 text-sm leading-relaxed text-muted">
                    {i.challenges.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider">What we build</h3>
                  <ul className="space-y-3 border-t border-accent pt-4 text-sm leading-relaxed">
                    {i.solutions.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA title="Working in one of these sectors?" />
    </>
  );
}
