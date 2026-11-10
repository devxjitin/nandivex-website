import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth (inertia) scrolling for the whole site. Returns the Lenis instance ref. */
export function useSmoothScroll() {
  const ref = useRef(null);
  useEffect(() => {
    if (reduced()) return undefined;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    ref.current = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ref.current = null;
    };
  }, []);
  return ref;
}

/**
 * Adds scroll-reveal to the content of every page automatically:
 * each direct child of a section's .wrap fades up, and the children of
 * grids/lists inside it are staggered.
 */
export function useAutoReveal(key) {
  useLayoutEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return undefined;
    const targets = [];
    document.querySelectorAll('main section:not([data-hero]) > .wrap, main section:not([data-hero]) > div > .wrap').forEach((wrap) => {
      [...wrap.children].forEach((child) => {
        const isGroup = /^(UL|OL|DL)$/.test(child.tagName) || /\bgrid\b/.test(child.className);
        if (isGroup && child.children.length > 1) {
          [...child.children].forEach((c, i) => targets.push([c, Math.min(i, 8) * 70]));
        } else {
          targets.push([child, 0]);
        }
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach(([el, delay]) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${delay}ms`;
      io.observe(el);
    });
    return () => {
      io.disconnect();
      targets.forEach(([el]) => {
        el.classList.remove('reveal', 'in');
        el.style.transitionDelay = '';
      });
    };
  }, [key]);
}

/** Counts a number up the first time it scrolls into view. */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(reduced() ? value : 0);
  useEffect(() => {
    if (reduced()) return undefined;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min((t - start) / dur, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{prefix}{n.toFixed(decimals)}{suffix}</span>;
}

/** Cycles through words with a soft slide; width stays that of the longest word. */
export function RotatingWord({ words, interval = 2200, className = '' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced()) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className="inline-grid align-bottom">
      {words.map((w, n) => (
        <span
          key={w}
          style={{ gridArea: '1 / 1' }}
          className={`${className} transition-all duration-500 ease-out ${n === i ? 'translate-y-0 opacity-100' : n === (i + words.length - 1) % words.length ? '-translate-y-4 opacity-0' : 'translate-y-4 opacity-0'}`}
          aria-hidden={n !== i}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

/** Vertical timeline whose line fills as you scroll past it. */
export function ScrollTimeline({ steps }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const mid = window.innerHeight * 0.55;
        setP(Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <div ref={ref} className="relative pl-12 sm:pl-16">
      <div className="absolute bottom-3 left-[19px] top-3 w-0.5 bg-line sm:left-[27px]" />
      <div className="absolute left-[19px] top-3 w-0.5 bg-accent sm:left-[27px]" style={{ height: `calc((100% - 1.5rem) * ${p})` }} />
      <ol className="space-y-10">
        {steps.map((s, i) => {
          const on = p >= i / (steps.length - 0.4);
          return (
            <li key={s.name} className="relative">
              <span className={`absolute -left-12 flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-sm font-extrabold transition-colors duration-300 sm:-left-16 sm:h-14 sm:w-14 sm:text-base ${on ? 'border-accent bg-accent text-white' : 'border-line bg-white text-muted'}`}>
                {i + 1}
              </span>
              <div className={`transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-45'}`}>
                <h3 className="text-xl sm:text-2xl">{s.name}</h3>
                <p className="mt-1.5 max-w-lg text-muted">{s.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
