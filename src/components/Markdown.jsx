import { Fragment } from 'react';

// Minimal renderer for the blog content: ###/#### headings, lists, code fences,
// paragraphs, **bold** and `inline code`.
function inline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export default function Markdown({ source }) {
  const lines = source.replace(/\r/g, '').split('\n');
  const out = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      i++;
      out.push(<pre key={key++}><code>{code.join('\n')}</code></pre>);
      continue;
    }
    if (/^####\s+/.test(line)) { out.push(<h4 key={key++}>{inline(line.replace(/^####\s+/, ''))}</h4>); i++; continue; }
    if (/^###?\s+/.test(line)) { out.push(<h3 key={key++}>{inline(line.replace(/^###?\s+/, ''))}</h3>); i++; continue; }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items = [];
      while (i < lines.length && (ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/).test(lines[i])) {
        items.push(lines[i].replace(ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/, ''));
        i++;
      }
      const Tag = ordered ? 'ol' : 'ul';
      out.push(<Tag key={key++}>{items.map((t, n) => <li key={n}>{inline(t)}</li>)}</Tag>);
      continue;
    }

    if (line.trim() === '') { i++; continue; }

    const para = [];
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{3,4}\s|```|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])) para.push(lines[i++]);
    out.push(<p key={key++}>{inline(para.join(' '))}</p>);
  }
  return <div className="prose-body">{out}</div>;
}
