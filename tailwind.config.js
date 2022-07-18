/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{tsx,ts}", "./components/**/*.{tsx,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebarLayout: "200px auto",
        post: "auto 400px",
      },
      fontFamily: {
        firaCode: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
