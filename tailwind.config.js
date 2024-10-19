/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color1": "#d8c3a5",
        "color2": "#eae7dc",
        "color3": "#8e8d8a",
        "color4": "#e98074",
        "color5": "#e85a4f"
      },
    },
  },
  plugins: [],
}

