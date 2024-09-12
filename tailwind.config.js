/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        first: "#002FA7",
        secondary: "#2196F3",
        least: "#409eff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
