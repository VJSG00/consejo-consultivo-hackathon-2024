/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat"
      },
      colors: {
        'primary': '#97f163',
        'secondary': '#78c048',
        'primary-hover': '#d3e763',
        'primary-active': '#0c550c'
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
