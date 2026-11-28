import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { site } from '../data/site.js';
import services from '../data/services.json';
import Icon from '../components/Icons.jsx';

const PORTAL_CONTACT_URL = `${import.meta.env.VITE_CAREERS_API || 'https://api.nandivex.in'}/public/contact`;

const field = 'w-full rounded-2xl border border-transparent bg-ink/[0.05] px-4 py-3.5 text-[15px] text-ink shadow-[inset_0_0_0_1px_rgb(var(--c-line))] outline-none transition-all duration-200 placeholder:text-ink/40 hover:bg-ink/[0.07] focus:border-accent focus:bg-surface focus:shadow-none focus:ring-4 focus:ring-accent/15';

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

/** Custom dropdown: the native popup cannot be styled. Keeps a hidden input so FormData still works. */
function Select({ id, name, options }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(options[0]);
  const [active, setActive] = useState(0);
  const box = useRef(null);
  const hidden = useRef(null);

  useEffect(() => {
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const formEl = hidden.current?.form;
    const onReset = () => { setValue(options[0]); setOpen(false); };
    document.addEventListener('mousedown', onDown);
    formEl?.addEventListener('reset', onReset);
    return () => { document.removeEventListener('mousedown', onDown); formEl?.removeEventListener('reset', onReset); };
  }, [options]);

  function choose(o) { setValue(o); setOpen(false); }
  function onKey(e) {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setActive(options.indexOf(value)); setOpen(true); return; }
      setActive((i) => (e.key === 'ArrowDown' ? Math.min(i + 1, options.length - 1) : Math.max(i - 1, 0)));
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(options[active]);
    }
  }

  return (
    <div ref={box} className="relative">
      <input ref={hidden} type="hidden" name={name} value={value} />
      <button
        type="button" id={id} role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`}
        onClick={() => { setActive(options.indexOf(value)); setOpen((o) => !o); }} onKeyDown={onKey}
        className={`${field} flex cursor-pointer items-center justify-between gap-3 text-left ${open ? '!border-accent !bg-surface !shadow-none ring-4 ring-accent/15' : ''}`}
      >
        <span className="truncate">{value}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 flex-none text-ink/50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 5 5 5-5" /></svg>
      </button>
      {open && (
        <ul id={`${id}-list`} role="listbox" className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-auto rounded-2xl border border-line bg-surface p-1.5 shadow-lift">
          {options.map((o, i) => (
            <li
              key={o} role="option" aria-selected={o === value}
              onMouseEnter={() => setActive(i)} onMouseDown={(e) => { e.preventDefault(); choose(o); }}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-[15px] ${i === active ? 'bg-accent/10 text-ink' : 'text-ink/80'} ${o === value ? 'font-semibold' : ''}`}
            >
              {o}
              {o === value && <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 flex-none text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 10.5 3.5 3.5 7.5-8" /></svg>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({ f }) {
  const id = `f-${f.name}`;
  const wrap = f.wide ? 'sm:col-span-2' : '';
  const Wrapper = f.type === 'select' ? 'div' : 'label';
  return (
    <Wrapper htmlFor={f.type === 'select' ? undefined : id} className={`block ${wrap}`}>
      <span className="mb-2 block text-[13px] font-semibold text-ink/70">{f.label}{f.required && <span className="text-accent"> *</span>}</span>
      {f.type === 'select' ? (
        <Select id={id} name={f.name} options={f.options} />
      ) : f.type === 'textarea' ? (
        <textarea id={id} name={f.name} required={f.required} rows={5} placeholder={f.placeholder} className={`${field} resize-y`} />
      ) : (
        <input id={id} name={f.name} type={f.type || 'text'} required={f.required} autoComplete={f.auto} placeholder={f.placeholder} className={field} />
      )}
    </Wrapper>
  );
}

/** The old /contact address now opens the contact section at the bottom of the About page. */
export default function Contact() {
  return <Navigate to="/#contact" replace />;
}

/** Contact form and details, shown at the bottom of the About page. */
export function ContactSection() {
  // idle | sending | sent | error
  const [state, setState] = useState('idle');
  const [problem, setProblem] = useState('');
  const [emailed, setEmailed] = useState(true);

  async function submit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const f = new FormData(formEl);
    const body = Object.fromEntries(form.fields.map((x) => [x.name, String(f.get(x.name) || '').trim()]));
    body.website = String(f.get('website') || '');
    for (const k of Object.keys(body)) if (body[k] === '') delete body[k];
    setState('sending');
    setProblem('');
    // A copy goes to the NandiVex portal so the team sees it under Website > Contact. This is best effort:
    // the email service below stays the main route, and a failure here never blocks the visitor.
    const saved = fetch(PORTAL_CONTACT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.ok).catch(() => false);
    try {
      const res = await fetch(site.contactApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch(() => null);
      if (!res) {
        if (await saved) { formEl.reset(); setEmailed(false); setState('sent'); return; }
        setState('error');
        return;
      }
      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        const first = Array.isArray(data.message) ? data.message[0] : data.message;
        setProblem(typeof first === 'string' ? first : 'Please check the form and try again.');
        setState('error');
        return;
      }
      if (res.status === 429) {
        setProblem('Too many messages from this connection. Please wait a minute and try again.');
        setState('error');
        return;
      }
      const data = res.ok ? await res.json().catch(() => ({})) : {};
      if (data.sent || (await saved)) {
        formEl.reset();
        setEmailed(Boolean(data.sent));
        setState('sent');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  const offers = ['AI voice and chat agents', 'Custom websites and web platforms', 'Android and Windows apps', 'Cyber security and audits'];
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-soft via-paper to-tint">
      <div className="wrap relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:pt-4">
          <p className="label">Connect</p>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">Let us talk. Tell us what you want built.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Share a few details and an engineer, not a salesperson, reads your message. We reply with questions or a call slot within two working days.
          </p>
          <ul className="mt-8 space-y-3">
            {offers.map((o) => (
              <li key={o} className="flex items-center gap-3 text-ink">
                <span className="h-2 w-2 flex-none rounded-full bg-accent" />{o}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="relative rounded-3xl border border-line bg-surface p-6 text-ink shadow-lift sm:p-9">
          <h3 className="text-2xl">Please fill in the information below</h3>
          <p className="mt-1.5 text-sm text-ink/60">Fields marked * are required.</p>
          <div className="mt-7 grid gap-x-4 gap-y-5 sm:grid-cols-2">
            {form.fields.map((f) => <Field key={f.name} f={f} />)}
          </div>
          {/* Honeypot: hidden from people, filled in by bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <button type="submit" disabled={state === 'sending'} className="btn-solid mt-8 w-full justify-center disabled:opacity-60">
            {state === 'sending' ? 'Sending…' : form.submit} <Icon name="arrow" className="h-4 w-4" />
          </button>
          {state === 'sent' && (
            <p role="status" className="mt-4 text-sm font-semibold text-ink">
              {emailed ? 'Thank you. Your message is with us, and we have emailed you a confirmation. We reply within two working days.' : 'Thank you. Your message is with us. We reply within two working days.'}
            </p>
          )}
          {state === 'error' && (
            <p role="alert" className="mt-4 text-sm text-red-700">
              {problem || 'We could not send your message right now.'} You can also write to us at{' '}
              <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
