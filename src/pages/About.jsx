import tech from '../data/techStack.json';
import { principles } from '../data/site.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';

const labels = {
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  infrastructure: 'Infrastructure',
  security: 'Security',
  tools: 'Tooling',
};

export default function About() {
  useMeta('About', 'NANDIVEX is an engineering company for web software, IT infrastructure and cybersecurity.');
  return (
    <>
      <PageHeader eyebrow="About" title="An engineering team that treats security as part of the build.">
        NANDIVEX delivers web systems, resilient infrastructure and security testing for growing
        businesses and enterprises.
      </PageHeader>

      <Section eyebrow="Direction">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="border-t border-ink pt-4">
            <h2 className="font-display text-3xl">Mission</h2>
            <p className="mt-4 leading-relaxed">
              Help businesses use secure, scalable technology to grow. We pair senior engineers with
              rigorous security standards so every solution holds its value over time.
            </p>
          </div>
          <div className="border-t border-ink pt-4">
            <h2 className="font-display text-3xl">Vision</h2>
            <p className="mt-4 leading-relaxed">
              To be the technology partner businesses trust with their next generation of digital
              products, so they never have to trade delivery speed for security.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Approach" title="How we engineer">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider">Software</h3>
            <p className="mt-4 leading-relaxed text-muted">
              Modular, decoupled codebases with clean API boundaries. Whether it is a customer-facing
              platform or an internal ERP, we optimise for speed, maintainability and clear state flow.
            </p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm">
              <li>Component-driven React front ends</li>
              <li>High-concurrency Node.js services</li>
              <li>Automated CI/CD with Docker</li>
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider">Infrastructure and security</h3>
            <p className="mt-4 leading-relaxed text-muted">
              Security is an architecture requirement, not a checklist. From network ingress to database
              disks, each layer uses encryption, strict IAM boundaries and regular vulnerability audits.
            </p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm">
              <li>OWASP ASVS based testing</li>
              <li>Hardened Linux and container environments</li>
              <li>Monitoring and tested disaster recovery</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Principles" title="What we hold ourselves to">
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {principles.map(([t, d]) => (
            <div key={t} className="border-t border-ink pt-4">
              <dt className="font-medium">{t}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Stack" title="Tools we work with">
        <div className="border-t border-ink">
          {Object.entries(tech).map(([k, items]) => (
            <div key={k} className="grid gap-3 border-b border-line py-5 md:grid-cols-[12rem_1fr]">
              <h3 className="label pt-1">{labels[k] || k}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <li key={t.name} title={t.desc} className="border border-line px-3 py-1.5 font-mono text-xs">{t.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CTA />
    </>
  );
}
