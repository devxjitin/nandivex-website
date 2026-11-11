import { useState } from 'react';
import careers from '../data/careers.json';
import { site } from '../data/site.js';
import { PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

const field = 'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent';

function NotifyForm() {
  const [sent, setSent] = useState(false);
  const areas = [...new Set(careers.upcoming.map((u) => u.title))];

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Interested in: ${f.get('kind')} - ${f.get('area')}`,
      `Links (GitHub / portfolio / CV): ${f.get('links') || '-'}`,
      '',
      'Please notify me when this opens.',
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Hiring updates: ' + f.get('kind'))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label">Name *</span>
          <input name="name" required autoComplete="name" className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="label">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={`${field} mt-2`} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="label">I am looking for</span>
          <select name="kind" className={`${field} mt-2`} defaultValue="Career">
            <option>Career</option>
            <option>Internship</option>
          </select>
        </label>
        <label className="block">
          <span className="label">Area</span>
          <select name="area" className={`${field} mt-2`}>
            {areas.map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="label">GitHub, portfolio or CV link</span>
        <input name="links" className={`${field} mt-2`} placeholder="Optional" />
      </label>
      <button type="submit" className="btn-solid">Notify me when it opens</button>
      {sent && (
        <p role="status" className="text-sm text-muted">
          Your email app should open with the message filled in. If it did not, write to{' '}
          <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}

function RoleCard({ r }) {
  const intern = r.kind === 'Internship';
  return (
    <li className="card flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${intern ? 'bg-sun/20 text-[#8a5a00] dark:text-sun' : 'bg-tint text-accent-dark'}`}>{r.kind}</span>
        <span className="text-xs font-semibold text-muted">Opening soon</span>
      </div>
      <h3 className="mt-4 text-xl">{r.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.blurb}</p>
      <ul className="mt-4 flex flex-wrap gap-2">{r.skills.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
    </li>
  );
}

export default function Careers() {
  useMeta('Careers & Internships', 'Careers and internships at NandiVex Technologies. No roles are open yet; join the list to hear first.');
  const { openRoles, upcoming, culture, process } = careers;
  const careersList = upcoming.filter((u) => u.kind === 'Career');
  const interns = upcoming.filter((u) => u.kind === 'Internship');

  return (
    <>
      <PageHeader eyebrow="Careers & Internships" title="Build things that run in production.">
        We are an engineering team that ships. Careers and internships open soon, so join the list and be first to know.
      </PageHeader>

      {openRoles.length > 0 ? (
        <Section eyebrow="Open roles" title="Where we are hiring now">
          <div className="border-t border-ink">
            {openRoles.map((r) => (
              <details key={r.id} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                  <h3 className="font-display text-2xl group-open:text-accent">{r.title}</h3>
                  <span className="label">{r.department} · {r.location} · {r.type} · {r.experience}</span>
                </summary>
                <div className="grid gap-8 pb-8 md:grid-cols-2">
                  <div className="max-w-2xl text-muted md:col-span-2">{r.overview}</div>
                  <div>
                    <h4 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider">You will</h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">{r.responsibilities.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider">You bring</h4>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">{r.requirements.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                  <div className="md:col-span-2">
                    <a className="btn-solid" href={`mailto:${site.email}?subject=${encodeURIComponent('Application: ' + r.title)}`}>Apply by email</a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Section>
      ) : (
        <section className="bg-paper">
          <div className="wrap py-12">
            <div className="flex flex-col gap-6 rounded-3xl border border-accent/20 bg-gradient-to-br from-tint to-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="flex gap-5">
                <span className="relative mt-1 flex h-4 w-4 flex-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-accent" />
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl">{careers.statusTitle}</h2>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{careers.statusText}</p>
                </div>
              </div>
              <a href="#notify" className="btn-solid flex-none">Join the list <Icon name="arrow" className="h-4 w-4" /></a>
            </div>
          </div>
        </section>
      )}

      <Section eyebrow="Careers" title="Roles we expect to open." tone="soft">
        <ul className="grid gap-5 md:grid-cols-2">{careersList.map((r) => <RoleCard key={r.title} r={r} />)}</ul>
      </Section>

      <Section eyebrow="Internships" title="Internships we expect to open.">
        <ul className="grid gap-5 md:grid-cols-2">{interns.map((r) => <RoleCard key={r.title} r={r} />)}</ul>
      </Section>

      <Section id="notify" eyebrow="Stay updated" title="Be the first to know when we open." tone="soft">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <NotifyForm />
          <div className="space-y-5 text-sm leading-relaxed text-muted">
            <p>Tell us what you want to work on and we will email you when a matching role or internship opens.</p>
            <p>
              You can also write to us anytime at{' '}
              <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>{' '}
              with your CV and a short note.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Culture" title="How we work">
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {culture.map((c) => (
            <div key={c.title} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-white"><Icon name="check" className="h-3.5 w-3.5" /></span>
              <div>
                <dt className="font-display font-bold">{c.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{c.description}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Hiring process" title="Four steps, no trick questions." tone="soft">
        <ol className="grid gap-4 md:grid-cols-4">
          {process.map((s) => (
            <li key={s.step} className="card !p-5">
              <span className="font-mono text-xs text-accent">{s.step}</span>
              <h3 className="mt-2 text-lg">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
