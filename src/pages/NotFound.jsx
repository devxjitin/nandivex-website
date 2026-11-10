import { Link } from 'react-router-dom';
import { useMeta } from '../components/ui.jsx';

export default function NotFound() {
  useMeta('Page not found');
  return (
    <section className="border-b border-line">
      <div className="wrap py-28">
        <p className="label">404</p>
        <h1 className="mt-4 text-6xl">Page not found.</h1>
        <p className="mt-5 max-w-md text-muted">The page you are looking for does not exist or has moved.</p>
        <Link to="/" className="btn-solid mt-8">Back to home</Link>
      </div>
    </section>
  );
}
