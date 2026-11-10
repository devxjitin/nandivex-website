import { Link } from 'react-router-dom';
import { team } from '../data/team.js';
import { CTA, PageHeader, Section, useMeta } from '../components/ui.jsx';
import Icon from '../components/Icons.jsx';

export default function Team() {
  useMeta('Team', 'Meet the engineers at NandiVex Technologies and the products and systems they have built.');
  return (
    <>
      <PageHeader eyebrow="Team" title="The people behind the work.">
        Small, senior-leaning and hands-on. Here is who you would be working with.
      </PageHeader>

      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.slug}>
              <Link to={`/team/${m.slug}`} className="card-hover group flex h-full flex-col overflow-hidden !p-0">
                <img src={m.photo} alt={m.name} loading="lazy" width="800" height="1000" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="label">{m.role}</p>
                  <h2 className="mt-2 text-2xl">{m.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{m.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View profile <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTA title="Want to work with us, or join us?" text="Tell us about your project, or see the roles we are hiring for." label="Talk to us" />
    </>
  );
}
