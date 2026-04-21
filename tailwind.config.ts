import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dae5f1',
          200: '#b2c7dd',
          300: '#7f9fc3',
          400: '#4e7aa8',
          500: '#305e8e',
          600: '#204a77',
          700: '#163a61',
          800: '#0E2A4A',
          900: '#0B2545',
          950: '#061530',
        },
        gold: {
          50: '#fdf8ed',
          100: '#faefce',
          200: '#f5dd99',
          300: '#eec461',
          400: '#e6ab3a',
          500: '#D4A017',
          600: '#b78113',
          700: '#915e13',
          800: '#784a17',
          900: '#653e19',
        },
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          soft: '#64748B',
        },
        bg: {
          DEFAULT: '#FAFAF7',
          muted: '#F4F4EF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(11, 37, 69, 0.06), 0 8px 24px rgba(11, 37, 69, 0.04)',
        lift: '0 4px 16px rgba(11, 37, 69, 0.08), 0 16px 48px rgba(11, 37, 69, 0.08)',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
