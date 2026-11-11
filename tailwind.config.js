/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        soft: 'rgb(var(--c-soft) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-dark': 'rgb(var(--c-accent-dark) / <alpha-value>)',
        tint: 'rgb(var(--c-tint) / <alpha-value>)',
        night: 'rgb(var(--c-night) / <alpha-value>)',
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
