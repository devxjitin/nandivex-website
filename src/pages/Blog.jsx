import { Link } from 'react-router-dom';
import posts from '../data/blog.json';
import { CTA, PageHeader, useMeta } from '../components/ui.jsx';

export default function Blog() {
  useMeta('Journal', 'Engineering notes from NANDIVEX on cloud, security, DevOps and web performance.');
  return (
    <>
      <PageHeader eyebrow="Journal" title="Engineering notes.">
        Practical write-ups on infrastructure, security and web performance.
      </PageHeader>
      <section className="border-b border-line">
        <div className="wrap">
          {posts.map((p) => (
            <article key={p.slug} className="border-b border-line last:border-0">
              <Link to={`/blog/${p.slug}`} className="group grid gap-4 py-10 md:grid-cols-[12rem_1fr]">
                <div className="label space-y-1">
                  <p>{p.date}</p>
                  <p>{p.category} · {p.readingTime}</p>
                </div>
                <div>
                  <h2 className="max-w-2xl text-3xl leading-snug group-hover:text-accent">{p.title}</h2>
                  <p className="mt-3 max-w-2xl text-muted">{p.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA title="Have a problem like these?" />
    </>
  );
}
