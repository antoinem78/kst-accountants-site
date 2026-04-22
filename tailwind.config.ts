import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary brand palette (matches live KST site — teal #5199A8)
        // Utility names preserved ("navy") for existing class references;
        // values now map to the teal scale from the live Weebly site.
        navy: {
          50: '#f1f7f8',
          100: '#e3eef0',
          200: '#c8dee2',
          300: '#a3cad2',
          400: '#7bb2bd',
          500: '#5199a8',
          600: '#3c7786',
          700: '#2f606e',
          800: '#254d59',
          900: '#1A3A44',
          950: '#0F2A32',
        },
        // Accent palette — matches the gold chart icon inside the KST logo.
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
          DEFAULT: '#222222',   // near-black (matches live site headings)
          muted: '#484848',     // dark-gray (matches live site body text)
          soft: '#8E8E8E',      // mid-gray (matches live site meta text)
        },
        bg: {
          DEFAULT: '#F9F9F9',   // off-white (matches live site page background)
          muted: '#F1F5F5',     // subtle teal-tinted mute
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
        soft: '0 2px 8px rgba(26, 58, 68, 0.06), 0 8px 24px rgba(26, 58, 68, 0.04)',
        lift: '0 4px 16px rgba(26, 58, 68, 0.08), 0 16px 48px rgba(26, 58, 68, 0.08)',
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
