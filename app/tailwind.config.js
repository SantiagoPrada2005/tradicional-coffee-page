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
      },
      fontFamily: {
        "display": ["var(--font-display)", "sans-serif"],
        "body": ["var(--font-body)", "sans-serif"],
        "anton": ["Anton", "sans-serif"],
        "footer": ["Open Sans", "sans-serif"],
      },
      borderRadius: {
        "lg": "2rem",
        "xl": "3rem",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
        'neon-green': '0 0 15px rgba(57, 255, 20, 0.5)',
      }
    },
  },
  plugins: [],
}
