/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../index.html",
    "./**/*.{html,js}",
    "./components/*.{html,js}",
    "./components/**/*.{html,js}",
    "./pages/*.{html,js}"
  ],
  prefix: "tw-",
  theme: {
    extend: {},
  },
  plugins: [],
}

