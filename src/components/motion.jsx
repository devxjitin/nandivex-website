import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scrolls to the top of the page, or to the element named by the URL hash. Smooth for in-page jumps, instant between pages. */
export function useScrollRestoration(pathname, hash) {
  const last = useRef(null);
  useEffect(() => {
    const samePage = last.current === pathname;
    last.current = pathname;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    const top = target ? target.getBoundingClientRect().top + window.scrollY - 64 : 0;
    window.scrollTo({ top, behavior: samePage && !reduced() ? 'smooth' : 'instant' });
  }, [pathname, hash]);
}

/**
 * Scroll-reveal for the content of every page, with a different entrance depending on what is revealed:
 * eyebrow labels slide in from the right, two-column grids slide in from alternating sides, three-column grids
 * rise and zoom, lists slide in from the left and everything else fades up. It plays in both scroll directions:
 * content leaving through the top waits above (data-dir="up") and drops into place when you scroll back up,
 * content below rises into place as you scroll down.
 */
const variantFor = (parent, i) => {
  const cls = parent.className;
  if (/grid-cols-2/.test(cls) && !/grid-cols-[3-9]/.test(cls)) return i % 2 ? 'reveal-right' : 'reveal-left';
  if (/grid-cols-[3-9]/.test(cls)) return ['reveal-up', 'reveal-zoom', 'reveal-up'][i % 3];
  if (/^(UL|OL)$/.test(parent.tagName)) return 'reveal-left';
  return 'reveal-up';
};

export function useAutoReveal(key) {
  useLayoutEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return undefined;
    const targets = [];
    document.querySelectorAll('main section:not([data-hero]) > .wrap, main section:not([data-hero]) > div > .wrap').forEach((wrap) => {
      [...wrap.children].forEach((child) => {
        if (child.hasAttribute('data-noreveal')) return;
        const isGroup = /^(UL|OL|DL)$/.test(child.tagName) || child.classList.contains('grid');
        if (isGroup && child.children.length > 1) {
          [...child.children].forEach((c, i) => targets.push([c, Math.min(i, 5) * 90, variantFor(child, i)]));
        } else {
          targets.push([child, 0, 'reveal-soft']);
        }
      });
    });
    document.querySelectorAll('main [data-reveal="right"]').forEach((el) => targets.push([el, 0, 'reveal-right']));
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
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    splits.forEach((el) => io.observe(el));
    targets.forEach(([el, delay, variant]) => {
      el.classList.add('reveal', variant);
      el.dataset.delay = delay;
      el.dataset.dir = 'down';
      io.observe(el);
    });
    // Hidden items keep their entry side current, so fast jumps still enter from the right direction.
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', syncDirs);
      io.disconnect();
      splits.forEach((el) => el.classList.remove('in'));
      targets.forEach(([el, , variant]) => {
        el.classList.remove('reveal', variant, 'in');
        el.removeAttribute('data-delay');
        el.removeAttribute('data-dir');
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
    window.scrollTo({ top: f * (document.documentElement.scrollHeight - window.innerHeight), behavior: 'instant' });
  };
  const onKey = (e) => {
    const step = window.innerHeight * 0.8;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') window.scrollBy(0, step);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') window.scrollBy(0, -step);
    else if (e.key === 'Home') window.scrollTo({ top: 0 });
    else if (e.key === 'End') window.scrollTo({ top: document.documentElement.scrollHeight });
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
          <span key={m} className={`absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-paper ${p >= m - 0.001 ? 'bg-accent' : 'bg-line'}`} style={{ left: `${m * 100}%` }} />
        ))}
        <span className="absolute top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-paper bg-accent shadow-lift ring-2 ring-accent/30 transition-transform group-hover:scale-125 group-focus-visible:ring-4" style={{ left: `${p * 100}%` }} />
      </div>
    </div>
  );
}
