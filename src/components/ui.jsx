import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | NANDIVEX` : 'NANDIVEX | Web, Infrastructure & Security';
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
    <section className="border-b border-line">
      <div className="wrap py-16 sm:py-24">
        {eyebrow && <p className="label mb-5">{eyebrow}</p>}
        <h1 className="max-w-4xl text-5xl leading-[1.05] sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, children, className = '' }) {
  return (
    <section className={`border-b border-line ${className}`}>
      <div className="wrap py-16 sm:py-20">
        {(eyebrow || title) && (
          <div className="mb-10 grid gap-3 md:grid-cols-[1fr_2fr]">
            {eyebrow && <p className="label pt-2">{eyebrow}</p>}
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
    <section className="bg-night text-paper">
      <div className="wrap grid gap-8 py-20 md:grid-cols-[2fr_1fr] md:items-end">
        <div>
          <h2 className="text-4xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl text-paper/70">{text}</p>
        </div>
        <div className="md:text-right">
          <Link to="/contact" className="btn border-paper bg-paper text-ink hover:border-accent hover:bg-accent hover:text-white">{label}</Link>
        </div>
      </div>
    </section>
  );
}

export function List({ items, className = '' }) {
  return (
    <ul className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((t) => (
        <li key={t} className="py-3 text-[15px] leading-snug">{t}</li>
      ))}
    </ul>
  );
}
