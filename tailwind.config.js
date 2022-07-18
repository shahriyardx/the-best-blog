/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebarLayout: '200px auto',
        post: "auto 400px"
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
