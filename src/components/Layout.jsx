import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import services from '../data/services.json';
import { useAutoReveal, useSmoothScroll } from './motion.jsx';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="NandiVex Technologies home">
      <img src="/logo.png" alt="" className="h-9 w-9 rounded-lg" />
      <span className="leading-none"><span className="block font-display text-[17px] font-extrabold tracking-tight">NandiVex</span><span className="mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.3em] text-muted">Technologies</span></span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const link = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-accent' : 'text-ink/80 hover:text-ink'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={link}>{n.label}</NavLink>
          ))}
          <Link to="/contact" className="btn-solid !py-2">Contact</Link>
        </nav>
        <button
          className="border border-line px-3 py-1.5 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-paper lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col py-2">
            {[...nav, { to: '/contact', label: 'Contact' }].map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} className="border-b border-line py-3 text-base last:border-0">{n.label}</NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const company = [['/about', 'About'], ['/team', 'Team'], ['/industries', 'Industries'], ['/projects', 'Work'], ['/blog', 'Journal'], ['/careers', 'Careers'], ['/contact', 'Contact']];
  return (
    <footer className="bg-night text-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-9 w-9 rounded-lg" />
            <span className="leading-none"><span className="block font-display text-[17px] font-extrabold tracking-tight">NandiVex</span><span className="mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.3em] text-paper/60">Technologies</span></span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            Web and mobile software, IT infrastructure and security for growing businesses.
          </p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-block text-sm underline underline-offset-4 hover:text-white">
            {site.email}
          </a>
        </div>
        <div>
          <p className="label !text-paper/50">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-paper/80 hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label !text-paper/50">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {company.map(([to, l]) => (
              <li key={to}><Link to={to} className="text-paper/80 hover:text-white">{l}</Link></li>
            ))}
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
