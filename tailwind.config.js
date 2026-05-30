/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#faf6f0',
          100: '#f2e9d8',
          200: '#e4d0b0',
          300: '#d4b080',
          400: '#c08a50',
          500: '#a0682a',
          600: '#7d4e1c',
          700: '#5c3812',
          800: '#3d240a',
          900: '#1e1008',
        },
        cream: '#fdf6ec',
        parchment: '#f5e6c8',
        ember: '#c0392b',
        gold: '#d4a832',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        reading: '1.85',
      },
    },
  },
  plugins: [],
}
