import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import services from '../data/services.json';
import { clients } from '../data/clients.js';
import { PageScrollBar, useAutoReveal, useScrollRestoration } from './motion.jsx';
import Icon from './Icons.jsx';

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

/** Header item with a dropdown of all services. Opens on hover or keyboard focus; closes after a click. */
function ServicesMenu({ item, link }) {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setShow(false); }, [pathname]);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setShow(false); }}
    >
      <NavLink to={item.to} className={link} aria-haspopup="true" aria-expanded={show}>
        <span className="inline-flex items-center gap-1">
          {item.label}
          <Icon name="chevron" className={`h-3 w-3 rotate-90 transition-transform duration-200 ${show ? '-rotate-90' : ''}`} />
        </span>
      </NavLink>
      <div className={`absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-4 transition-all duration-200 ${show ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'}`}>
        <ul className="rounded-2xl border border-line bg-white p-2 shadow-lift">
          {services.map((sv) => (
            <li key={sv.slug}>
              <Link to={`/services/${sv.slug}`} className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-tint" tabIndex={show ? 0 : -1}>
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-tint text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon name={sv.slug} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">{sv.title}</span>
                  <span className="block truncate text-xs text-muted">{sv.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
          {nav.map((n) => (n.to === '/services'
            ? <ServicesMenu key={n.to} item={n} link={link} />
            : <NavLink key={n.to} to={n.to} end={n.to === '/'} className={link}>{n.label}</NavLink>))}
          <div className="flex items-center gap-3">
            <Link to="/#contact" className="btn-line !py-2">Contact</Link>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-solid !py-2"><Icon name="whatsapp" className="h-4 w-4" /> Quick Connect</a>
          </div>
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
              <div key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} tabIndex={open ? 0 : -1} className="block border-b border-line py-3.5 text-base font-medium">{n.label}</NavLink>
                {n.to === '/services' && (
                  <ul className="border-b border-line py-1 pl-4">
                    {services.map((sv) => (
                      <li key={sv.slug}><Link to={`/services/${sv.slug}`} tabIndex={open ? 0 : -1} className="block py-2.5 text-sm text-ink/75">{sv.title}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link to="/#contact" tabIndex={open ? 0 : -1} className="btn-line mt-4 justify-center">Contact</Link>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn-solid mb-4 mt-3 justify-center"><Icon name="whatsapp" className="h-4 w-4" /> Quick Connect</a>
          </div>
        </div>
      </nav>
      <PageScrollBar />
    </header>
  );
}

function FooterList({ title, children }) {
  return (
    <div>
      <p className="font-display text-xl font-bold text-white">{title}</p>
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="group flex items-center gap-2 text-[15px] text-paper/80 transition-colors hover:text-white">
        <Icon name="chevron" className="h-3.5 w-3.5 flex-none text-cyan transition-transform group-hover:translate-x-0.5" />
        {children}
      </Link>
    </li>
  );
}

function ContactRow({ icon, children }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-relaxed text-paper/80">
      <Icon name={icon} className="mt-0.5 h-5 w-5 flex-none text-cyan" />
      <span>{children}</span>
    </li>
  );
}

function Footer() {
  const quick = [['/', 'About Us'], ['/work', 'Work'], ['/products', 'Products'], ['/careers', 'Careers'], ['/#contact', 'Contact'], ['/privacy-policy', 'Privacy Policy'], ['/terms-and-conditions', 'Terms & Conditions']];
  return (
    <footer className="bg-[#09050F] text-paper">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo dark />
          <p className="mt-6 max-w-xs leading-relaxed text-paper/70">
            {site.name} designs, builds and supports AI assistants, websites, web platforms, and Android and Windows apps for businesses.
          </p>
          {clients.length > 0 && (
            <p className="mt-6 text-sm text-paper/60">
              Trusted by{' '}
              {clients.map((c, i) => (
                <span key={c.name}>{i > 0 && ', '}<a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-paper/90 hover:text-white">{c.name}</a></span>
              ))}
            </p>
          )}
        </div>
        <FooterList title="Quick Links">
          {quick.map(([to, l]) => <FooterLink key={to} to={to}>{l}</FooterLink>)}
        </FooterList>
        <FooterList title="Our Services">
          {services.map((s) => <FooterLink key={s.slug} to={`/services/${s.slug}`}>{s.title}</FooterLink>)}
        </FooterList>
        <FooterList title="Contact">
          <ContactRow icon="pin">{site.location}</ContactRow>
          <ContactRow icon="whatsapp">
            WhatsApp:<br />
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">Chat with us</a>
          </ContactRow>
          <ContactRow icon="mail">
            Mail: <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
          </ContactRow>
        </FooterList>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap py-6 text-center text-sm text-paper/50">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useScrollRestoration(pathname, hash);
  useAutoReveal(pathname);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <div key={`bar-${pathname}`} className="route-bar" aria-hidden="true" />
      <Header />
      <main id="main" key={pathname} className="page-in flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
