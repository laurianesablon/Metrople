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
    extend: {
      height: {
        '128': '62em',
      },
    },
  },
  plugins: [],
}