import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { site } from '../data/site.js';
import services from '../data/services.json';
import { PageHeader, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

const field = 'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10';

/* To add a contact category, add an object here. Field types: text, email, tel, select, textarea. */
const categories = [
  {
    key: 'client',
    icon: 'briefcase',
    title: 'Start a project',
    desc: 'You want an AI agent, Android app or website built.',
    subject: 'Project enquiry',
    submit: 'Send project enquiry',
    fields: [
      { name: 'name', label: 'Your name', required: true, auto: 'name' },
      { name: 'email', label: 'Work email', type: 'email', required: true, auto: 'email' },
      { name: 'phone', label: 'Phone (optional)', type: 'tel', auto: 'tel' },
      { name: 'company', label: 'Company', auto: 'organization' },
      { name: 'service', label: 'What do you need?', type: 'select', options: [...services.map((s) => s.title), 'Not sure yet'] },
      { name: 'timeline', label: 'When do you want to start?', type: 'select', options: ['As soon as possible', 'Within 1 to 3 months', 'In 3 to 6 months', 'Just exploring'] },
      { name: 'budget', label: 'Budget range (optional)', type: 'select', options: ['Not decided', 'Under ₹50,000', '₹50,000 to ₹2 lakh', '₹2 lakh to ₹10 lakh', 'Above ₹10 lakh'] },
      { name: 'message', label: 'Tell us about the project', type: 'textarea', required: true, wide: true, placeholder: 'What should it do, who will use it, and what does success look like?' },
    ],
    next: ['An engineer reads your message.', 'We reply with questions or a call slot.', 'You receive a scoped plan and estimate.'],
    side: { to: '/work', label: 'See our work first' },
  },
  {
    key: 'question',
    icon: 'help',
    title: 'Ask a question',
    desc: 'You have a general or product question.',
    subject: 'Question',
    submit: 'Send question',
    fields: [
      { name: 'name', label: 'Your name', required: true, auto: 'name' },
      { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' },
      { name: 'topic', label: 'Topic', type: 'select', wide: true, options: ['About our services', 'ULTRON (our Android assistant)', 'Pricing', 'Partnership', 'Support for something we built', 'Something else'] },
      { name: 'message', label: 'Your question', type: 'textarea', required: true, wide: true },
    ],
    next: ['We read your question.', 'You get a reply by email, usually within two working days.'],
    side: { to: '/products', label: 'Looking at ULTRON? See plans' },
  },
  {
    key: 'careers',
    icon: 'users',
    title: 'Careers & opportunities',
    desc: 'You want to work with us or collaborate.',
    subject: 'Careers and opportunities',
    submit: 'Send',
    fields: [
      { name: 'name', label: 'Your name', required: true, auto: 'name' },
      { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' },
      { name: 'looking', label: 'I am looking for', type: 'select', options: ['A career', 'An internship', 'A collaboration', 'A partnership'] },
      { name: 'area', label: 'Area', type: 'select', options: ['AI / LLM', 'Android', 'Full stack / web', 'UI/UX design', 'Something else'] },
      { name: 'links', label: 'GitHub, portfolio or CV link', wide: true, placeholder: 'Optional' },
      { name: 'message', label: 'A short note about you', type: 'textarea', wide: true, placeholder: 'What have you built, and what do you want to work on?' },
    ],
    next: ['We keep your details and review them when a role opens.', 'If there is a fit, we reach out to talk.'],
    side: { to: '/careers', label: 'See careers and internships' },
  },
];

function Field({ f }) {
  const id = `f-${f.name}`;
  const wrap = f.wide ? 'sm:col-span-2' : '';
  return (
    <label htmlFor={id} className={`block ${wrap}`}>
      <span className="label">{f.label}{f.required && ' *'}</span>
      {f.type === 'select' ? (
        <select id={id} name={f.name} defaultValue={f.options[0]} className={`${field} mt-2`}>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : f.type === 'textarea' ? (
        <textarea id={id} name={f.name} required={f.required} rows={6} placeholder={f.placeholder} className={`${field} mt-2`} />
      ) : (
        <input id={id} name={f.name} type={f.type || 'text'} required={f.required} autoComplete={f.auto} placeholder={f.placeholder} className={`${field} mt-2`} />
      )}
    </label>
  );
}

export default function Contact() {
  useMeta('Contact', 'Start a project, ask a question, or talk to NandiVex Technologies about careers and opportunities.');
  const [params, setParams] = useSearchParams();
  const [sent, setSent] = useState(false);
  const cat = categories.find((c) => c.key === params.get('type')) || categories[0];

  function pick(key) {
    setSent(false);
    setParams({ type: key }, { replace: true });
  }

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = cat.fields.map((x) => `${x.label.replace(' (optional)', '')}: ${f.get(x.name) || '-'}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${cat.subject} from ${f.get('name')}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let us talk.">
        Choose what fits best so the right person replies. We answer within two working days.
      </PageHeader>

      <section className="bg-white">
        <div className="wrap py-12 sm:py-16">
          <div role="tablist" aria-label="Contact reason" className="grid gap-4 md:grid-cols-3">
            {categories.map((c) => {
              const on = c.key === cat.key;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(c.key)}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${on ? 'border-accent bg-accent text-white shadow-lift' : 'border-line bg-white hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card'}`}
                >
                  <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors ${on ? 'bg-white/15 text-white' : 'bg-tint text-accent'}`}>
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold">{c.title}</span>
                    <span className={`mt-1 block text-sm leading-snug ${on ? 'text-white/80' : 'text-muted'}`}>{c.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <form key={cat.key} onSubmit={submit} className="animate-[pagein_.45s_ease-out_both] rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8">
              <h2 className="text-2xl">{cat.title}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {cat.fields.map((f) => <Field key={f.name} f={f} />)}
              </div>
              <button type="submit" className="btn-solid mt-8">{cat.submit} <Icon name="arrow" className="h-4 w-4" /></button>
              {sent && (
                <p role="status" className="mt-4 text-sm text-muted">
                  Your email app should open with the message filled in. If it did not, write to{' '}
                  <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
              )}
            </form>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-night p-7 text-white">
                <p className="label !text-cyan">Reach us directly</p>
                <div className="mt-5 space-y-5">
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/10 text-cyan"><Icon name="mail" className="h-5 w-5" /></span>
                    <span><span className="block text-xs text-white/50">Email</span><span className="font-semibold group-hover:text-cyan">{site.email}</span></span>
                  </a>
                  <a href={site.phoneHref} className="group flex items-center gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/10 text-cyan"><Icon name="phone" className="h-5 w-5" /></span>
                    <span><span className="block text-xs text-white/50">Phone</span><span className="font-semibold group-hover:text-cyan">{site.phone}</span></span>
                  </a>
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/10 text-cyan"><Icon name="pin" className="h-5 w-5" /></span>
                    <span><span className="block text-xs text-white/50">Based in</span><span className="font-semibold">{site.location}</span></span>
                  </div>
                </div>
              </div>

              <div className="card">
                <p className="label">What happens next</p>
                <ol className="mt-4 space-y-3">
                  {cat.next.map((n, i) => (
                    <li key={n} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-tint font-display text-xs font-extrabold text-accent">{i + 1}</span>
                      {n}
                    </li>
                  ))}
                </ol>
                {cat.side && (
                  <Link to={cat.side.to} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {cat.side.label} <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
