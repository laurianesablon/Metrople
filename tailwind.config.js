/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['Roboto Mono', 'monospace'],
      'sans': ['Bebas Neue', 'sans-serif'],
    },
    height: {
      'map': '42rem',
    },
    extend: {},
  },
  plugins: [],
}