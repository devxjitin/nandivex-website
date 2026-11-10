import { Link } from 'react-router-dom';
import services from '../data/services.json';
import { work } from '../data/work.js';
import { clients } from '../data/clients.js';
import { faq } from '../data/faq.js';
import { process, stats } from '../data/site.js';
import { ultron, team } from '../data/team.js';
import { CTA, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';
import { RotatingWord, ScrollTimeline } from '../components/motion.jsx';
import { FAQ, LogoStrip, PhoneMock, ServiceCard, StatRow, VoiceWave, WorkCard } from '../components/blocks.jsx';

function Hero() {
  return (
    <section data-hero className="relative overflow-hidden bg-night text-white">
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div className="glow absolute -left-40 top-10 h-[420px] w-[420px]" aria-hidden="true" />
      <div className="glow absolute -right-32 bottom-0 h-[480px] w-[480px] opacity-70" aria-hidden="true" />
      <div className="wrap relative grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="animate-[pagein_.8s_ease-out_both]">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> AI agents · Android apps · Web software
          </p>
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem]">
            AI assistants that{' '}
            <RotatingWord words={['talk.', 'listen.', 'act.']} className="text-grad" />
            <span className="mt-1 block">Built and shipped for real businesses.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            NandiVex designs and builds voice and chat agents, native Android apps and the web software behind them.
            We shipped Nira, a voice assistant, for Nirman Labs, and we run our own product, ULTRON.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-cyan hover:text-night">
              Book a call <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link to="/work" className="btn border-white/25 text-white hover:border-white hover:bg-white/10">See our work</Link>
          </div>
        </div>
        <div className="animate-[pagein_1s_ease-out_.2s_both]">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-x-6 top-1/2 -z-0 h-40 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <PhoneMock shots={ultron.shots} className="relative" />
            <span className="absolute -left-1 top-12 hidden animate-[floaty_5s_ease-in-out_infinite] items-center gap-2 rounded-2xl border border-white/15 bg-night/80 px-3.5 py-2 text-xs font-semibold shadow-card backdrop-blur sm:flex">
              <Icon name="mic" className="h-4 w-4 text-cyan" /> Voice in 13 languages
            </span>
            <span className="absolute -right-1 top-1/2 hidden animate-[floaty_6s_ease-in-out_.8s_infinite] items-center gap-2 rounded-2xl border border-white/15 bg-night/80 px-3.5 py-2 text-xs font-semibold shadow-card backdrop-blur sm:flex">
              <Icon name="ai-agents" className="h-4 w-4 text-cyan" /> 80+ tools
            </span>
            <VoiceWave className="relative mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useMeta();
  const featured = work.find((w) => w.featured) || work[0];
  const others = work.filter((w) => w.slug !== featured.slug).slice(0, 3);
  const [lead, ...rest] = services;

  return (
    <>
      <Hero />

      {/* Trusted by */}
      <section data-hero className="border-b border-line bg-white py-8">
        <div className="wrap"><LogoStrip clients={clients} /></div>
      </section>

      {/* Proof */}
      <section className="bg-white">
        <div className="wrap py-16">
          <p className="label mb-8">What we have shipped</p>
          <StatRow stats={stats} />
        </div>
      </section>

      {/* Services */}
      <Section eyebrow="What we do" title="One team for the assistant, the app and the software behind it." tone="soft">
        <div className="grid gap-5 md:grid-cols-2">
          <ServiceCard s={lead} big />
          {rest.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </Section>

      {/* Featured case study */}
      <section className="bg-white">
        <div className="wrap py-16 sm:py-24">
          <div className="grid gap-10 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-tint to-white p-8 shadow-card sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="label">Case study</p>
              <img src={featured.clientLogo} alt={featured.client} className="mt-5 h-14 w-auto rounded-xl bg-[#16181d] shadow-card" />
              <h2 className="mt-6 text-3xl sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 leading-relaxed text-muted">{featured.summary}</p>
              <Link to={`/work/${featured.slug}`} className="btn-solid mt-8">Read the case study <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="space-y-4">
              {[['The need', featured.challenge], ['What we built', featured.built[0]], ['The result', featured.outcome[0]]].map(([k, v], n) => (
                <div key={k} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent font-display text-sm font-extrabold text-white">{n + 1}</span>
                  <div>
                    <p className="font-display font-bold">{k}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More work */}
      <Section eyebrow="More work" title="Products and open source we build ourselves." tone="soft">
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((w) => <WorkCard key={w.slug} w={w} />)}
        </div>
        <Link to="/work" className="btn-line mt-8">All work <Icon name="arrow" className="h-4 w-4" /></Link>
      </Section>

      {/* Our product */}
      <section className="bg-night text-white">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="label !text-cyan">Our own product</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">ULTRON, a voice assistant for Android.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/70">{ultron.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products#ultron" className="btn bg-white text-accent shadow-lift hover:-translate-y-0.5 hover:bg-cyan hover:text-night">
                See plans and pricing <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/work/ultron" className="btn border-white/25 text-white hover:bg-white/10">How we built it</Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {ultron.shots.slice(0, 3).map(([src, alt], i) => (
              <img key={src} src={src} alt={alt} loading="lazy" width="720" height="1600" className={`aspect-[9/20] w-full rounded-2xl border border-white/10 bg-black/30 object-contain shadow-card ${i === 1 ? 'translate-y-6' : ''}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <Section eyebrow="How we work" title="Five steps, from first call to support.">
        <ScrollTimeline steps={process} />
      </Section>

      {/* Team */}
      <Section eyebrow="The team" title="A small team. You talk to the people building it." tone="soft">
        <ul className="grid gap-5 sm:grid-cols-2">
          {team.map((m) => (
            <li key={m.slug}>
              <Link to={`/team/${m.slug}`} className="card-hover group flex items-center gap-5 !p-4">
                <img src={m.photo} alt={m.name} loading="lazy" width="96" height="96" className="h-24 w-24 flex-none rounded-2xl object-cover" />
                <span className="min-w-0">
                  <span className="label block">{m.role}</span>
                  <span className="mt-1 block font-display text-xl font-bold">{m.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-muted">{m.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Questions" title="Before you get in touch.">
        <FAQ items={faq} />
      </Section>

      <CTA title="Have an assistant, app or product in mind?" text="Book a short call. We will tell you what it takes and send a written plan." label="Book a call" />
    </>
  );
}
