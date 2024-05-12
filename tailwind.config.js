/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Padauk", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
