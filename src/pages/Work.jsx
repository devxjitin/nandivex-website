import { useState } from 'react';
import { work } from '../data/work.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import { WorkCard } from '../components/blocks.jsx';

const filters = [
  ['all', 'All'],
  ['client', 'Client work'],
  ['product', 'Products'],
  ['open-source', 'Open source'],
];

export default function Work() {
  useMeta('Work', 'Nira, our voice assistant for Nirman Labs, our ULTRON Android assistant, and open-source AI tools from NandiVex Technologies.');
  const [f, setF] = useState('all');
  const list = work.filter((w) => f === 'all' || w.type === f);
  return (
    <>
      <PageHeader eyebrow="Work" title="Things we have built and shipped.">
        Real projects you can read about, open and try. Client work first, then our own products and open source.
      </PageHeader>
      <Section>
        <div role="tablist" aria-label="Filter work" className="mb-10 flex flex-wrap gap-2">
          {filters.map(([k, l]) => (
            <button
              key={k}
              role="tab"
              aria-selected={f === k}
              onClick={() => setF(k)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${f === k ? 'border-accent bg-accent text-white shadow-lift' : 'border-line bg-white hover:border-accent/40'}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div key={f} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:animate-[pagein_.45s_ease-out_both]">
          {list.map((w) => <WorkCard key={w.slug} w={w} />)}
        </div>
      </Section>
      <CTA title="Want something like this?" text="Tell us what you need and we will show you how we would build it." label="Book a call" />
    </>
  );
}
