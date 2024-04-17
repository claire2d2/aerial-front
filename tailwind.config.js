/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enables dark mode based on the class applied to the html tag
  theme: {
    colors: {
      main: "#003162",
      maindark: "#123f52",
      mainvariant: "#03386e",
      bgmain: "#F7FCFC",
      bgmaindark: "#0F172A",
      text: "#121927",
      textdark: "#7D8A9F",
      linkhover: "#ffc900",
      inputfield: "#7a7672",
      disabled: "#e2e2e2",
      // Default Tailwind colors
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
    },
    extend: {
      backgroundImage: {
        clouds:
          "url(`https://images.photowall.com/products/54815/blue-sky-clouds.jpg?h=699&q=85`)",
      },
    },
  },
  plugins: [],
};
