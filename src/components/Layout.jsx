import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import services from '../data/services.json';
import { clients } from '../data/clients.js';
import { useAutoReveal, useSmoothScroll } from './motion.jsx';

function Logo({ dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="NandiVex Technologies home">
      <img src="/logo.png" alt="" className="h-9 w-9 rounded-lg" />
      <span className="leading-none">
        <span className="block font-display text-[17px] font-extrabold tracking-tight">NandiVex</span>
        <span className={`mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.3em] ${dark ? 'text-paper/60' : 'text-muted'}`}>Technologies</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const link = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300 ${isActive ? 'text-accent after:scale-x-100' : 'text-ink/75 after:scale-x-0 hover:text-ink hover:after:scale-x-100'}`;

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${scrolled ? 'border-line bg-paper/90 shadow-card' : 'border-transparent bg-paper/70'}`}>
      <div className={`wrap flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-[68px]'}`}>
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => <NavLink key={n.to} to={n.to} className={link}>{n.label}</NavLink>)}
          <Link to="/contact" className="btn-solid !py-2">Book a call</Link>
        </nav>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" aria-hidden={!open} className={`menu-panel border-t border-line bg-paper lg:hidden ${open ? 'open' : 'border-transparent'}`}>
        <div>
          <div className="wrap flex flex-col py-2">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} tabIndex={open ? 0 : -1} className="border-b border-line py-3.5 text-base font-medium">{n.label}</NavLink>
            ))}
            <Link to="/contact" tabIndex={open ? 0 : -1} className="btn-solid my-4">Book a call</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  const company = [['/about', 'About'], ['/work', 'Work'], ['/products', 'Products'], ['/careers', 'Careers'], ['/contact', 'Contact']];
  return (
    <footer className="bg-night text-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            {site.tagline}. Designed, built and shipped by our engineering team, for businesses and schools.
          </p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-block text-sm underline underline-offset-4 hover:text-white">{site.email}</a>
          <a href={site.phoneHref} className="mt-2 block text-sm underline underline-offset-4 hover:text-white">{site.phone}</a>
          {clients.length > 0 && (
            <p className="mt-6 text-xs text-paper/50">
              Trusted by{' '}
              {clients.map((c, i) => (
                <span key={c.name}>{i > 0 && ', '}<a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-paper/80 hover:text-white">{c.name}</a></span>
              ))}
            </p>
          )}
        </div>
        <div>
          <p className="label !text-paper/50">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-paper/80 hover:text-white">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="label !text-paper/50">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {company.map(([to, l]) => <li key={to}><Link to={to} className="text-paper/80 hover:text-white">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="label !text-paper/50">Legal</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="text-paper/80 hover:text-white">Privacy policy</Link></li>
            <li><Link to="/terms-and-conditions" className="text-paper/80 hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col justify-between gap-2 py-6 text-xs text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} NandiVex Technologies. All rights reserved.</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const lenis = useSmoothScroll();
  useAutoReveal(pathname);
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      if (lenis.current) lenis.current.scrollTo(top, { immediate: true });
      else window.scrollTo(0, top);
    } else if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <Header />
      <main id="main" key={pathname} className="page-in flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
