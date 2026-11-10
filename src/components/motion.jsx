import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth (inertia) scrolling for the whole site. Returns the Lenis instance ref. */
export function useSmoothScroll() {
  // Lenis is disabled: its inertia loop fought the native scroll (page jittered up/down).
  // Native scrolling is used instead; Layout falls back to window.scrollTo when ref.current is null.
  // While scrolling, html gets .is-scrolling so hover effects don't fire as cards pass under the cursor.
  useEffect(() => {
    const root = document.documentElement;
    let t;
    const onScroll = () => {
      if (!root.classList.contains('is-scrolling')) root.classList.add('is-scrolling');
      clearTimeout(t);
      t = setTimeout(() => root.classList.remove('is-scrolling'), 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      root.classList.remove('is-scrolling');
    };
  }, []);
  return useRef(null);
}

/**
 * Adds scroll-reveal to the content of every page automatically:
 * each direct child of a section's .wrap fades in, and the children of
 * grids/lists inside it are staggered as cards. It plays on every pass, scrolling
 * down and back up: content leaving through the top waits above (data-dir="up")
 * and slides down into place when you scroll back; content below slides up.
 */
export function useAutoReveal(key) {
  useLayoutEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return undefined;
    const targets = [];
    document.querySelectorAll('main section:not([data-hero]) > .wrap, main section:not([data-hero]) > div > .wrap').forEach((wrap) => {
      [...wrap.children].forEach((child) => {
        if (child.hasAttribute('data-noreveal')) return;
        const isGroup = /^(UL|OL|DL)$/.test(child.tagName) || /\bgrid\b/.test(child.className);
        if (isGroup && child.children.length > 1) {
          [...child.children].forEach((c, i) => targets.push([c, Math.min(i, 8) * 140, true]));
        } else {
          targets.push([child, 0, false]);
        }
      });
    });
    // eyebrow labels slide in from the right, like animate.css fadeInRight
    document.querySelectorAll('main [data-reveal="right"]').forEach((el) => targets.push([el, 0, false, 'reveal-right']));
    const splits = [...document.querySelectorAll('main .split')];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (e.isIntersecting) {
            el.style.transitionDelay = `${el.dataset.delay || 0}ms`;
            el.classList.add('in');
          } else {
            el.style.transitionDelay = '0ms';
            el.dataset.dir = e.boundingClientRect.top < 0 ? 'up' : 'down';
            el.classList.remove('in');
          }
        });
      },
      { threshold: 0.12, rootMargin: '-4% 0px -8% 0px' }
    );
    splits.forEach((el) => io.observe(el));
    targets.forEach(([el, delay, card, extra]) => {
      el.classList.add('reveal');
      if (extra) el.classList.add(extra);
      if (card) el.classList.add('reveal-card');
      el.dataset.delay = delay;
      el.dataset.dir = 'down';
      io.observe(el);
    });
    // Keep the entry direction of hidden items current, so fast jumps still enter from the right side.
    let raf = 0;
    const syncDirs = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        targets.forEach(([el]) => {
          if (!el.classList.contains('in')) el.dataset.dir = el.getBoundingClientRect().top < 0 ? 'up' : 'down';
        });
      });
    };
    window.addEventListener('scroll', syncDirs, { passive: true });
    syncDirs();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', syncDirs);
      io.disconnect();
      splits.forEach((el) => el.classList.remove('in'));
      targets.forEach(([el]) => {
        el.classList.remove('reveal', 'reveal-card', 'reveal-right', 'in');
        el.removeAttribute('data-dir');
        el.removeAttribute('data-delay');
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

/**
 * Custom horizontal scroll bar for the whole page, drawn along the bottom edge of the header. The native vertical scrollbar is hidden (see index.css).
 * Dots mark where each section starts; click or drag anywhere on the bar to scroll the page.
 */
export function PageScrollBar() {
  const trackRef = useRef(null);
  const [p, setP] = useState(0);
  const [marks, setMarks] = useState([]);
  const [scrollable, setScrollable] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let raf;
    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
    const measure = () => {
      const max = maxScroll();
      setScrollable(max > 80);
      const pts = [...document.querySelectorAll('main > div > section, main > section')]
        .map((el) => (el.getBoundingClientRect().top + window.scrollY) / max)
        .filter((v) => v > 0.02 && v < 0.98);
      setMarks([...new Set(pts.map((v) => Math.round(v * 1000) / 1000))]);
    };
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = maxScroll();
        setP(max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0);
      });
    };
    const settle = setTimeout(() => { measure(); update(); }, 250);
    const settle2 = setTimeout(() => { measure(); update(); }, 1200);
    measure();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', () => { measure(); update(); });
    return () => {
      clearTimeout(settle);
      clearTimeout(settle2);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
    };
  }, [pathname]);

  const scrollToPointer = (e) => {
    const r = trackRef.current.getBoundingClientRect();
    const f = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    window.scrollTo(0, f * (document.documentElement.scrollHeight - window.innerHeight));
  };
  const onKey = (e) => {
    const step = window.innerHeight * 0.8;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') window.scrollBy(0, step);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') window.scrollBy(0, -step);
    else if (e.key === 'Home') window.scrollTo(0, 0);
    else if (e.key === 'End') window.scrollTo(0, document.documentElement.scrollHeight);
    else return;
    e.preventDefault();
  };

  if (!scrollable) return null;
  return (
    <div
      ref={trackRef}
      role="scrollbar"
      aria-orientation="horizontal"
      aria-controls="main"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p * 100)}
      tabIndex={0}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); scrollToPointer(e); }}
      onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) scrollToPointer(e); }}
      onKeyDown={onKey}
      className="group absolute inset-x-0 -bottom-[9px] z-10 hidden h-[18px] cursor-pointer touch-none select-none lg:block"
    >
      <div className="absolute inset-x-3 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-line/70">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-cyan" style={{ width: `${p * 100}%` }} />
        {marks.map((m) => (
          <span key={m} className={`absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white ${p >= m - 0.001 ? 'bg-accent' : 'bg-[#cdd6e6]'}`} style={{ left: `${m * 100}%` }} />
        ))}
        <span className="absolute top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white bg-accent shadow-lift ring-2 ring-accent/30 transition-transform group-hover:scale-125 group-focus-visible:ring-4" style={{ left: `${p * 100}%` }} />
      </div>
    </div>
  );
}
