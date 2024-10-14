/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color1": "#5d001e",
        "color2": "#e3e2df",
        "color3": "#e3afbc",
        "color4": "#9a1750",
        "color5": "#ee4c7c"
      },
    },
  },
  plugins: [],
}

