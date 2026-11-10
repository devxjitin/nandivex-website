import careers from '../data/careers.json';
import { site } from '../data/site.js';
import { PageHeader, Section, useMeta } from '../components/ui.jsx';

export default function Careers() {
  useMeta('Careers', 'Open roles at NandiVex Technologies: AI, Android and web engineering.');
  const { culturePillars, benefits, hiringProcess, openRoles } = careers;

  return (
    <>
      <PageHeader eyebrow="Careers" title="Build things that run in production.">
        We are an engineering team that ships. You own your work and see it used.
      </PageHeader>

      <Section eyebrow="Open roles" title="Where we are hiring">
        <div className="border-t border-ink">
          {openRoles.map((r) => (
            <details key={r.id} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <h3 className="font-display text-2xl group-open:text-accent">{r.title}</h3>
                <span className="label">{r.department} · {r.location} · {r.type} · {r.experience}</span>
              </summary>
              <div className="grid gap-8 pb-8 md:grid-cols-2">
                <div className="md:col-span-2 max-w-2xl text-muted">{r.overview}</div>
                <div>
                  <h4 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider">You will</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">{r.responsibilities.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div>
                  <h4 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider">You bring</h4>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">{r.requirements.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="md:col-span-2">
                  <a
                    className="btn-solid"
                    href={`mailto:${site.email}?subject=${encodeURIComponent('Application: ' + r.title)}`}
                  >
                    Apply by email
                  </a>
                </div>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Do not see your role? Send your CV and a short note to{' '}
          <a className="text-accent underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Section>

      <Section eyebrow="Culture" title="How we work">
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {culturePillars.map((c) => (
            <div key={c.title} className="border-t border-ink pt-4">
              <dt className="font-medium">{c.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{c.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Benefits" title="What you get">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title} className="bg-paper p-6">
              <h3 className="font-sans font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Hiring process" title="Five steps, no trick questions.">
        <ol className="border-t border-ink">
          {hiringProcess.map((s) => (
            <li key={s.step} className="grid gap-2 border-b border-line py-5 md:grid-cols-[4rem_1fr_2fr]">
              <span className="font-mono text-xs text-accent">{s.step}</span>
              <h3 className="font-sans font-semibold">{s.name}</h3>
              <p className="text-sm text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
