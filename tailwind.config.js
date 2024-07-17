/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006A6A",
        secondary: "#FFFCF6",
        third: "#EEEEEE",
      },
      screens: {
        xs: "450px",
      },
      gridRowEnd: {
        none: "none",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
