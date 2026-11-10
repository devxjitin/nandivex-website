import services from '../data/services.json';
import { PageHeader, Section, useMeta } from '../components/ui.jsx';
import { ServiceCard } from '../components/blocks.jsx';

export default function Services() {
  useMeta('Services', 'Custom software and security from NandiVex Technologies: web, Android and Windows apps, AI assistants, automation and cyber security, built, deployed and supported.');
  return (
    <>
      <PageHeader eyebrow="Services" title="Software, built end to end.">
        Websites and web platforms, Android and Windows apps, AI assistants and automation, and cyber security. We design, build, deploy and look after all of it.
      </PageHeader>
      <Section>
        <div className="grid gap-5 md:grid-cols-2 md:[&>:last-child:nth-child(odd)]:col-span-2 lg:grid-cols-6 lg:[&>*]:col-span-2 lg:[&>:nth-last-child(2):nth-child(3n+1)]:col-start-2">
          {services.map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
      </Section>
    </>
  );
}
