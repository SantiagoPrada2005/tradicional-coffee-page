/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-primary)",
        "background-light": "var(--color-background-light)",
        "background-dark": "var(--color-background-dark)",
        "glass": "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        "surface-dark": "var(--color-surface-dark)",
        "coffee-cream": "#f6edda",
        "coffee-dark": "#503225",
        "coffee-gold": "#d6bf90",
      },
      fontFamily: {
        "display": ["'Cormorant Garamond'", "serif"],
        "modern": ["'Syne'", "sans-serif"],
        "body": ["'Plus Jakarta Sans'", "sans-serif"],
        "anton": ["Anton", "sans-serif"],
        "footer": ["Open Sans", "sans-serif"],
        "logo": ["Prachamati", "sans-serif"],
        "sans": ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        "lg": "1.5rem",
        "xl": "2.5rem",
        "2xl": "3.5rem",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gold': 'linear-gradient(135deg, #d6bf90 0%, #b89c6d 100%)',
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'premium-gold': '0 20px 40px -15px rgba(214, 191, 144, 0.25)',
        'soft-glow': '0 0 20px rgba(214, 191, 144, 0.15)',
      }
    },
  },
  plugins: [],
}
