import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { site } from '../data/site.js';
import services from '../data/services.json';
import Icon from '../components/Icons.jsx';

const field = 'w-full rounded-xl border border-line bg-surface px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-4 focus:ring-accent/10';

/* One form for everything. Field types: text, email, tel, select, textarea. */
const form = {
  title: 'Send us a message',
  subject: 'Enquiry',
  submit: 'Send message',
  fields: [
    { name: 'name', label: 'Your name', required: true, auto: 'name' },
    { name: 'email', label: 'Email', type: 'email', required: true, auto: 'email' },
    { name: 'phone', label: 'Phone (optional)', type: 'tel', auto: 'tel' },
    { name: 'company', label: 'Company (optional)', auto: 'organization' },
    { name: 'topic', label: 'What is this about?', type: 'select', wide: true, options: [...services.map((s) => s.title), 'ULTRON (our Android assistant)', 'Careers or collaboration', 'Something else'] },
    { name: 'budget', label: 'Your budget (optional)', type: 'select', wide: true, options: ['Not sure yet, happy to discuss', 'Under ₹50,000', '₹50,000 – ₹1,50,000', '₹1,50,000 – ₹5,00,000', '₹5,00,000 – ₹15,00,000', '₹15,00,000 and above'] },
    { name: 'message', label: 'Your message', type: 'textarea', required: true, wide: true, placeholder: 'What should it do, who will use it, and what does success look like?' },
  ],
};

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

/** The old /contact address now opens the contact section at the bottom of the About page. */
export default function Contact() {
  return <Navigate to="/#contact" replace />;
}

/** Contact form and details, shown at the bottom of the About page. */
export function ContactSection() {
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = form.fields.map((x) => `${x.label.replace(' (optional)', '')}: ${f.get(x.name) || '-'}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${form.subject} from ${f.get('name')}`)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
  }

  const offers = ['AI voice and chat agents', 'Custom websites and web platforms', 'Android and Windows apps', 'Cyber security and audits'];
  return (
    <section id="contact" className="relative overflow-hidden bg-night text-white">
      <div className="wrap relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <p className="label !text-cyan">Connect</p>
          <h2 className="mt-4 text-4xl leading-[1.1] text-white sm:text-5xl">Let us talk. Tell us what you want built.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Share a few details and an engineer, not a salesperson, reads your message. We reply with questions or a call slot within two working days.
          </p>
          <ul className="mt-8 space-y-3">
            {offers.map((o) => (
              <li key={o} className="flex items-center gap-3 text-white/90">
                <span className="h-2 w-2 flex-none rounded-full bg-cyan" />{o}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-surface p-6 text-ink shadow-lift sm:p-9">
          <h3 className="border-b border-line pb-6 text-2xl">Please fill in the information below</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {form.fields.map((f) => <Field key={f.name} f={f} />)}
          </div>
          <button type="submit" className="btn-solid mt-8 w-full justify-center">{form.submit} <Icon name="arrow" className="h-4 w-4" /></button>
          {sent && (
            <p role="status" className="mt-4 text-sm text-muted">
              Your email app should open with the message filled in. If it did not, write to{' '}
              <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
