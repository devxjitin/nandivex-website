import { useEffect } from 'react';
import Icon from './Icons.jsx';

export function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | NandiVex Technologies` : 'NandiVex Technologies | Custom Software, Apps & AI';
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

/** Heading whose words rise into place one after another (like a GSAP SplitText reveal). Triggered by useAutoReveal. */
export function SplitHeading({ as: Tag = 'h2', className = '', children }) {
  const text = String(children);
  return (
    <Tag className={`split ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="split-w"><span className="split-i" style={{ transitionDelay: `${i * 70}ms` }}>{w}</span></span>{' '}
        </span>
      ))}
    </Tag>
  );
}

export function PageHeader({ eyebrow, title, children, visual }) {
  return (
    <section data-hero className="relative overflow-hidden bg-night text-white">
      <div className="glow absolute -left-40 top-0 h-[420px] w-[420px] opacity-60" aria-hidden="true" />
      <div className="glow absolute -right-32 bottom-0 h-[440px] w-[440px] opacity-50" aria-hidden="true" />
      <div className={`wrap relative py-16 sm:py-24 ${visual ? 'grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]' : ''}`}>
        <div>
          {eyebrow && <p data-reveal="right" className="label mb-5 !text-cyan">{eyebrow}</p>}
          <SplitHeading as="h1" className="max-w-4xl text-4xl leading-[1.08] sm:text-6xl">{title}</SplitHeading>
          {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{children}</div>}
        </div>
        {visual}
      </div>
    </section>
  );
}

export function Section({ id, eyebrow, title, children, className = '', tone = 'white' }) {
  const dark = tone === 'dark';
  const bg = dark ? 'bg-night text-white' : tone === 'soft' ? 'bg-soft' : 'bg-white';
  return (
    <section id={id} className={`relative overflow-hidden ${bg} ${className}`}>
      {dark && <div className="glow absolute -left-32 top-0 h-[360px] w-[360px] opacity-40" aria-hidden="true" />}
      <div className="wrap relative py-16 sm:py-24">
        {(eyebrow || title) && (
          <div data-noreveal className="mb-12 max-w-2xl">
            {eyebrow && <p data-reveal="right" className={`label mb-3 ${dark ? '!text-cyan' : ''}`}>{eyebrow}</p>}
            {title && <SplitHeading className="text-3xl sm:text-4xl">{title}</SplitHeading>}
          </div>
        )}
        {children}
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
