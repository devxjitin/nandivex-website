import { work } from '../data/work.js';
import { PageHeader, Section, useMeta } from '../components/ui.jsx';
import { WorkCard } from '../components/blocks.jsx';

export default function Work() {
  useMeta('Work', 'Software NandiVex Technologies has built and delivered for client companies, starting with Nira for Nirman Labs.');
  return (
    <>
      <PageHeader eyebrow="Work" title="Built and delivered for our clients.">
        Projects we have designed, built and handed over to a client. Our team's own projects are on their profiles under About.
      </PageHeader>
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((w) => <WorkCard key={w.slug} w={w} />)}
        </div>
      </Section>
    </>
  );
}
