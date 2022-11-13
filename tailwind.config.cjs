/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-bg": "#181818",
        "color-hover": "#282828",
        "color-header": "#171717",
        "color-card": "#121212",
      },
    },
  },
  plugins: [],
};
