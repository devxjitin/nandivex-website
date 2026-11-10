import { useState } from 'react';
import { site } from '../data/site.js';
import services from '../data/services.json';
import { PageHeader, useMeta } from '../components/ui.jsx';

const field = 'w-full border border-line bg-white px-4 py-3 text-[15px] outline-none focus:border-accent';

export default function Contact() {
  useMeta('Contact', 'Talk to NandiVex Technologies about a web, infrastructure or security project.');
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get('name')}`,
      `Email: ${f.get('email')}`,
      `Company: ${f.get('company') || '-'}`,
      `Interested in: ${f.get('service')}`,
      '',
      f.get('message'),
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Project enquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Tell us what you need.">
        Send a few lines about your project or problem. We reply within two working days.
      </PageHeader>
      <section className="border-b border-line">
        <div className="wrap grid gap-16 py-16 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={submit} className="space-y-5" noValidate={false}>
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
                <span className="label">Company</span>
                <input name="company" autoComplete="organization" className={`${field} mt-2`} />
              </label>
              <label className="block">
                <span className="label">Interested in</span>
                <select name="service" className={`${field} mt-2`} defaultValue="Not sure yet">
                  <option>Not sure yet</option>
                  {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="label">Message *</span>
              <textarea name="message" required rows={6} className={`${field} mt-2`} />
            </label>
            <button type="submit" className="btn-solid">Send message</button>
            {sent && (
              <p role="status" className="text-sm text-muted">
                Your email app should open with the message filled in. If it did not, write to{' '}
                <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            )}
          </form>

          <aside className="space-y-8 border-t border-ink pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <p className="label">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 block text-lg text-accent underline underline-offset-4">{site.email}</a>
            </div>
            <div>
              <p className="label">Based in</p>
              <p className="mt-2">{site.location}</p>
            </div>
            <div>
              <p className="label">What happens next</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                <li>An engineer reads your message.</li>
                <li>We reply with questions or a call slot.</li>
                <li>You receive a scoped proposal.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
