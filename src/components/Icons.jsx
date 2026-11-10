const paths = {
  'web-development': <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3z" /></>,
  'software-development': <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14" />,
  'cloud-services': <path d="M7 18a4.500 4.500 0 01-.6-8.960A6 6 0 0118 10.500a3.800 3.800 0 01-.5 7.500H7z" />,
  'it-infrastructure': <><rect x="3" y="4" width="18" height="6.500" rx="2" /><rect x="3" y="13.500" width="18" height="6.500" rx="2" /><path d="M7 7.250h.01M7 16.750h.01" /></>,
  whatsapp: <><path d="M3.500 20.500l1.300-4.300A8.500 8.500 0 1 1 8 19.300l-4.500 1.200z" /><path d="M9 8.800c.2 2.600 2.600 5 5.200 5.300l1-1.200-1.800-.9-.7.600c-.8-.3-1.600-1.100-1.900-1.900l.6-.7-.9-1.800-1.500 1.600z" /></>,
  cybersecurity: <><path d="M12 3l7.500 3v5.500c0 4.500-3.100 8-7.500 9.500-4.400-1.500-7.500-5-7.500-9.500V6L12 3z" /><path d="M8.800 12l2.200 2.200 4.200-4.400" /></>,
  'network-security': <><circle cx="12" cy="5" r="2.200" /><circle cx="5" cy="18" r="2.200" /><circle cx="19" cy="18" r="2.200" /><path d="M12 7.200v4.300M12 11.500l-6 4.500M12 11.500l6 4.500" /></>,
  'security-audit': <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 14l2 2 4-4" /></>,
  devops: <><path d="M4 17l5-5-5-5M12 19h8" /></>,
  'ai-agents': <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V5M9 13h.01M15 13h.01M9.500 16.200h5" /><circle cx="12" cy="3.800" r="1" /></>,
  'android-software': <><rect x="6.500" y="2.500" width="11" height="19" rx="2.500" /><path d="M10.500 9.500L9 11l1.500 1.500M13.500 9.500L15 11l-1.500 1.500M11 18h2" /></>,
  'android-apps': <><rect x="6.500" y="2.500" width="11" height="19" rx="2.500" /><path d="M10.500 9.500L9 11l1.500 1.500M13.500 9.500L15 11l-1.500 1.500M11 18h2" /></>,
  'web-software': <><rect x="3" y="4" width="18" height="16" rx="2.500" /><path d="M3 9h18M7 6.500h.01M10 6.500h.01M8 14l-1.500 1.500L8 17M16 14l1.500 1.500L16 17" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2.500" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.500 9.500a2.500 2.500 0 114 2c-.9.6-1.500 1.100-1.500 2.200M12 17h.01" /></>,
  users: <><circle cx="9" cy="8" r="3.200" /><path d="M3 20c0-3.300 2.700-5.500 6-5.500s6 2.200 6 5.500M16 5a3.200 3.200 0 010 6M18 14.800c1.800.6 3 2.200 3 5.200" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.500" /><path d="M3.500 7l8.500 6 8.500-6" /></>,
  phone: <path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  pin: <><path d="M12 21s7-6 7-11.500a7 7 0 10-14 0C5 15 12 21 12 21z" /><circle cx="12" cy="9.500" r="2.500" /></>,
  'desktop-apps': <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M7.500 9.500L9 11l-1.500 1.500M11.500 12.500h3" /></>,
  build: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14" />,
  scale: <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  secure: <><path d="M12 3l7.500 3v5.500c0 4.500-3.100 8-7.500 9.500-4.400-1.500-7.500-5-7.500-9.500V6L12 3z" /><path d="M8.800 12l2.200 2.200 4.200-4.400" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  rocket: <><path d="M12 3c3.200 2.200 5 5.400 5 9.200L15 15H9l-2-2.800C7 8.400 8.800 5.200 12 3z" /><circle cx="12" cy="10" r="1.600" /><path d="M9 15l-1.500 4M15 15l1.500 4M12 15v5" /></>,
  lifebuoy: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.500" /><path d="M5.600 5.600l3.900 3.900M14.500 14.500l3.900 3.900M18.400 5.600l-3.900 3.900M9.500 14.500l-3.900 3.900" /></>,
  pencil: <><path d="M4 20l1-4L16 5a2.100 2.100 0 013 3L8 19l-4 1z" /><path d="M14 7l3 3" /></>,
  chevron: <path d="M9 5l7 7-7 7" />,
  check: <path d="M5 12.500l4.500 4.500L19 7.500" />,
};

export default function Icon({ name, className = 'h-6 w-6', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...rest}>
      {paths[name] || paths.build}
    </svg>
  );
}
