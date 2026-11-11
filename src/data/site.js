export const site = {
  name: 'NandiVex Technologies',
  tagline: 'Software, apps and automation for businesses',
  email: 'contact@nandivex.com',
  whatsappHref: 'https://wa.me/917408068618?text=Hi%20NandiVex%2C%20I%20would%20like%20to%20talk%20about%20a%20project.',
  location: 'India',
  url: 'https://nandivex.in',
};

/* Header links. Add one here and it shows in the header and mobile menu. */
export const nav = [
  { to: '/', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/products', label: 'Products' },
  { to: '/careers', label: 'Careers' },
];

/* Agile delivery flow, drawn by WorkflowDiagram. Stages with inSprint repeat every sprint. */
export const workflow = [
  { icon: 'phone', name: 'Discover', sub: 'Goals, users, scope' },
  { icon: 'menu', name: 'Backlog', sub: 'Ranked by value' },
  { icon: 'pencil', name: 'Sprint plan', sub: 'Pick the next slice', inSprint: true },
  { icon: 'build', name: 'Build', sub: 'Working code, steadily', inSprint: true },
  { icon: 'secure', name: 'Test and secure', sub: 'QA and security checks', inSprint: true },
  { icon: 'users', name: 'Demo and review', sub: 'You try it, we adapt', inSprint: true },
  { icon: 'rocket', name: 'Launch', sub: 'Signed, rollback ready' },
  { icon: 'lifebuoy', name: 'Support', sub: 'Monitor and improve' },
];

export const principles = [
  ['Proof over promises', 'We show shipped work you can open and try, not slideware.'],
  ['One accountable team', 'Design, AI, app, backend and deployment under one roof, so nothing falls between vendors.'],
  ['You own it', 'Full source, documentation and access are handed over. No lock-in.'],
  ['Plain communication', 'Regular demos and direct access to the people building it.'],
  ['Built to grow', 'Modular systems that take more users and features without a rewrite.'],
  ['Dependable after launch', 'Monitoring, patching and support, so it keeps working.'],
];

/* Real numbers only. Shown on the home page. */
export const stats = [
  { tab: 'Services', icon: 'build', value: 5, suffix: '', label: 'Areas of work: AI, web, Android, desktop and security' },
  { tab: 'Clients', icon: 'briefcase', value: 1, suffix: '', label: 'Client product delivered (Nira, for Nirman Labs)' },
  { tab: 'Team', icon: 'users', value: 3, suffix: '', label: 'Engineers building your product' },
  { tab: 'Open source', icon: 'secure', value: 17, suffix: '', label: 'Open-source packages on PyPI' },
];
