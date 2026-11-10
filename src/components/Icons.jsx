const paths = {
  'web-development': <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3z" /></>,
  'software-development': <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14" />,
  'mobile-app-development': <><rect x="7" y="2.500" width="10" height="19" rx="2.500" /><path d="M11 18.500h2" /></>,
  'cloud-services': <path d="M7 18a4.500 4.500 0 01-.6-8.960A6 6 0 0118 10.500a3.800 3.800 0 01-.5 7.500H7z" />,
  'it-infrastructure': <><rect x="3" y="4" width="18" height="6.500" rx="2" /><rect x="3" y="13.500" width="18" height="6.500" rx="2" /><path d="M7 7.250h.01M7 16.750h.01" /></>,
  cybersecurity: <><path d="M12 3l7.500 3v5.500c0 4.500-3.100 8-7.500 9.500-4.400-1.500-7.500-5-7.500-9.500V6L12 3z" /><path d="M8.800 12l2.200 2.200 4.200-4.400" /></>,
  'network-security': <><circle cx="12" cy="5" r="2.200" /><circle cx="5" cy="18" r="2.200" /><circle cx="19" cy="18" r="2.200" /><path d="M12 7.200v4.300M12 11.500l-6 4.500M12 11.500l6 4.500" /></>,
  'security-audit': <><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" /><path d="M14 3v5h5M9 14l2 2 4-4" /></>,
  devops: <><path d="M4 17l5-5-5-5M12 19h8" /></>,
  'ai-agents': <><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V5M9 13h.01M15 13h.01M9.500 16.200h5" /><circle cx="12" cy="3.800" r="1" /></>,
  'android-software': <><rect x="6.500" y="2.500" width="11" height="19" rx="2.500" /><path d="M10.500 9.500L9 11l1.500 1.500M13.500 9.500L15 11l-1.500 1.500M11 18h2" /></>,
  build: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.500 5l-3 14" />,
  scale: <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />,
  secure: <><path d="M12 3l7.500 3v5.500c0 4.500-3.100 8-7.500 9.500-4.400-1.500-7.500-5-7.500-9.500V6L12 3z" /><path d="M8.800 12l2.200 2.200 4.200-4.400" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12.500l4.500 4.500L19 7.500" />,
};

export default function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name] || paths.build}
    </svg>
  );
}
