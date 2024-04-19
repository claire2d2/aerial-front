/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enables dark mode based on the class applied to the html tag
  theme: {
    colors: {
      // for all styling
      main: "#003162",
      maindark: "#123f52",
      mainvar: "#03386e",
      mainlight: "#5176BA",
      bgmain: "#F7FCFC",
      bgmaindark: "#33334d",
      text: "#121927",
      textdark: "#f0f0f5",
      linkhover: "#ffc900",
      inputfield: "#7a7672",
      disabled: "#e2e2e2",
      // for the state input range
      green: "#42b883",
      golden: "#f8b400",
      gray: "#b6cdbd",
      darkgray: "#5c715e",

      // for fave button
      isFave: "#ff0066",

      // tailwind default
      white: "white",
      transparent: "transparent",
      black: "black",
    },
    extend: {
      backgroundImage: {
        clouds:
          "url(`https://images.photowall.com/products/54815/blue-sky-clouds.jpg?h=699&q=85`)",
      },
      height: {
        outlet: "85dvh",
        nav: "10dvh",
        footer: "5dvh",
      },
    },
  },
  plugins: [],
};
