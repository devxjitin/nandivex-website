import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icons.jsx';

export function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | NandiVex Technologies` : 'NandiVex Technologies | Web, Infrastructure & Security';
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.name = 'description';
        document.head.appendChild(m);
      }
      m.content = description;
    }
  }, [title, description]);
}

export function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="wrap relative py-16 sm:py-24">
        {eyebrow && <p className="label mb-5 !text-cyan">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl leading-[1.08] sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ id, eyebrow, title, children, className = '', tone = 'white' }) {
  const bg = tone === 'soft' ? 'bg-soft' : 'bg-white';
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="wrap py-16 sm:py-24">
        {(eyebrow || title) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && <p className="label mb-3">{eyebrow}</p>}
            {title && <h2 className="text-3xl sm:text-4xl">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function CTA({
  title = 'Let us talk about your project.',
  text = 'Tell us what you are building or fixing. An engineer will reply within two working days.',
  label = 'Start a conversation',
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-14 text-white sm:px-14">
          <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative grid gap-8 md:grid-cols-[2fr_1fr] md:items-center">
            <div>
              <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
              <p className="mt-4 max-w-xl text-white/80">{text}</p>
            </div>
            <div className="md:text-right">
              <Link to="/contact" className="btn bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-night hover:text-white">
                {label} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function List({ items, className = '' }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-snug">
          <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-tint text-accent">
            <Icon name="check" className="h-3 w-3" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
