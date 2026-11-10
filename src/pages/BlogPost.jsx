import { Link, useParams } from 'react-router-dom';
import posts from '../data/blog.json';
import Markdown from '../components/Markdown.jsx';
import { CTA, useMeta } from '../components/ui.jsx';
import NotFound from './NotFound.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const p = posts.find((x) => x.slug === slug);
  useMeta(p?.title, p?.excerpt);
  if (!p) return <NotFound />;

  return (
    <>
      <article>
        <header className="border-b border-line">
          <div className="wrap max-w-3xl py-16 sm:py-24">
            <Link to="/blog" className="label hover:text-ink">← Journal</Link>
            <h1 className="mt-6 text-4xl leading-tight sm:text-5xl">{p.title}</h1>
            <p className="mt-6 text-lg text-muted">{p.excerpt}</p>
            <p className="label mt-8">{p.author} · {p.date} · {p.readingTime}</p>
          </div>
        </header>
        <div className="wrap max-w-3xl py-14">
          <img src={p.image} alt="" className="mb-10 aspect-[16/9] w-full rounded-2xl object-cover" />
          <Markdown source={p.content} />
          <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
            {p.tags.map((t) => (
              <li key={t} className="border border-line px-3 py-1 font-mono text-xs">{t}</li>
            ))}
          </ul>
        </div>
      </article>
      <CTA />
    </>
  );
}
