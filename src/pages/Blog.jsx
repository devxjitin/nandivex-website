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
              <Link to={`/blog/${p.slug}`} className="group grid items-center gap-6 py-10 md:grid-cols-[14rem_1fr]">
                <img src={p.image} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <div>
                  <p className="label !text-muted">{p.date} · {p.category} · {p.readingTime}</p>
                  <h2 className="mt-3 max-w-2xl text-2xl leading-snug group-hover:text-accent">{p.title}</h2>
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
