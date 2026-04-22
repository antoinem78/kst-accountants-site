import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary "navy" palette — deep blue scale (for dark backgrounds,
        // headings, primary buttons). Utility class names kept unchanged
        // so existing components don't need to be edited.
        navy: {
          50:  '#EEF4F7',
          100: '#DCE7EE',
          200: '#B9D1DC',
          300: '#8BB7C8',
          400: '#569FB5',
          500: '#2787A6',
          600: '#1D7192',
          700: '#165F82',
          800: '#114E72',
          900: '#0A3D5C',  // primary dark blue — used for hero, footer, headings
          950: '#052C44',
        },
        // Accent palette — remapped from amber gold to turquoise.
        // 500 = #3F9A9D, the swatch provided by the client.
        // Utility name stays "gold" so class references keep working.
        gold: {
          50:  '#EDF8F8',
          100: '#D4EEEE',
          200: '#A8DDDD',
          300: '#7BCACB',
          400: '#6CBFC1',  // CTA hover (slightly lighter than 500)
          500: '#3F9A9D',  // primary turquoise — CTA background
          600: '#327E80',  // pressed state / darker accent
          700: '#2A6566',  // eyebrow on white
          800: '#224F50',
          900: '#1C3E3F',
          950: '#0F2627',
        },
        ink: {
          DEFAULT: '#0F1E2E',   // near-black, cool-tinted
          muted:   '#3F556B',   // dark blue-grey body text
          soft:    '#7A8DA0',   // mid blue-grey meta text
        },
        bg: {
          DEFAULT: '#F7FAFC',   // white-with-a-hint-of-blue page background
          muted:   '#EDF4F7',   // soft blue tint for sectioned areas
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
        soft: '0 2px 8px rgba(10, 61, 92, 0.06), 0 8px 24px rgba(10, 61, 92, 0.04)',
        lift: '0 4px 16px rgba(10, 61, 92, 0.08), 0 16px 48px rgba(10, 61, 92, 0.08)',
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
