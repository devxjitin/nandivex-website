import services from '../data/services.json';
import { process } from '../data/site.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import { ScrollTimeline } from '../components/motion.jsx';
import { ServiceCard } from '../components/blocks.jsx';

export default function Services() {
  useMeta('Services', 'AI voice and chat agents, Android apps, Windows desktop apps, and web and custom software from NandiVex Technologies.');
  const [lead, ...rest] = services;
  return (
    <>
      <PageHeader eyebrow="Services" title="Four things, done end to end.">
        AI agents are our main work. We also build the Android apps, Windows desktop tools and web software around them, then deploy and look after it all.
      </PageHeader>
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <ServiceCard s={lead} big />
          {rest.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </Section>
      <Section eyebrow="How we work" title="The same five steps on every project." tone="soft">
        <ScrollTimeline steps={process} />
      </Section>
      <CTA />
    </>
  );
}
