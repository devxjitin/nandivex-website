/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        soft: '#F7F3FD',
        ink: '#1B1426',
        muted: '#655C75',
        line: '#E6DEF2',
        accent: '#7A3CE0',
        'accent-dark': '#5A24B0',
        tint: '#EDE3FB',
        night: '#150E24',
        cyan: '#C9A0FF',
        sun: '#FFB020',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,20,38,.04), 0 8px 24px -8px rgba(27,20,38,.10)',
        lift: '0 2px 4px rgba(27,20,38,.05), 0 18px 40px -12px rgba(122,60,224,.25)',
      },
      keyframes: {
        rise: { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: { rise: 'rise .6s ease-out both' },
    },
  },
  plugins: [],
};
