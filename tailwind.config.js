/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gym: {
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          cardSubtle: 'var(--color-card-subtle)',
          border: 'var(--color-border)',
          accent: 'var(--color-accent)',
          accentHover: 'var(--color-accent-hover)',
          accentText: 'var(--color-accent-text)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          dark: '#0F1115',
          darkCard: '#171A21',
          darkBorder: '#232733',
          lime: '#C6FF3D',
          limeHover: '#B2E832',
          electric: '#00F0FF',
          flame: '#FF5C38',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-lime': '0 0 24px -4px rgba(198, 255, 61, 0.25)',
        'glow-sm': '0 0 12px -2px rgba(198, 255, 61, 0.2)',
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
