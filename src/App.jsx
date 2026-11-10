import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Work from './pages/Work.jsx';
import WorkDetail from './pages/WorkDetail.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';
import { Privacy, Terms } from './pages/Legal.jsx';
import Products from './pages/Products.jsx';
import TeamMember from './pages/TeamMember.jsx';
import NotFound from './pages/NotFound.jsx';

/* Old service URLs from the previous site point to the closest current service. */
const oldServices = {
  'android-software': 'android-apps',
  'web-development': 'web-software',
  'software-development': 'web-software',
  'cloud-services': 'web-software',
  'it-infrastructure': 'web-software',
  devops: 'web-software',
  cybersecurity: 'web-software',
  'network-security': 'web-software',
  'security-audit': 'web-software',
};

function OldService() {
  const { slug } = useParams();
  return <Navigate to={oldServices[slug] ? `/services/${oldServices[slug]}` : `/services/${slug}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceRoute />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="team/:slug" element={<TeamMember />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms-and-conditions" element={<Terms />} />

        {/* Redirects from the previous site structure */}
        <Route path="team" element={<Navigate to="/about#team" replace />} />
        <Route path="industries" element={<Navigate to="/services" replace />} />
        <Route path="projects" element={<Navigate to="/work" replace />} />
        <Route path="project/:slug" element={<Navigate to="/work" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function ServiceRoute() {
  const { slug } = useParams();
  return oldServices[slug] ? <OldService /> : <ServiceDetail />;
}
