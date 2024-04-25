/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enables dark mode based on the class applied to the html tag
  theme: {
    fontFamily: {
      display: ["Montserrat", "sans-serif"],
      romantic: ['"Style Script"', "sans-serif"],
    },
    colors: {
      // for all styling
      main: "#36336E",
      maindark: "#00274C",
      mainvar: "#ABA8D3",
      mainlight: "#5176BA",
      bgmain: "ffeaeb",
      bgmainlight: "#cbbcd8",
      bgmaindark: "#333436",
      title: "#0D3B66",
      text: "#121927",
      textdark: "#F5E0DC",
      linkhover: "#FEE4AA",
      bgactive: "#F7DBC3",
      bginactive: "#cbbcd8",
      bghover: "#878FC9",
      inputfield: "#d5e1df",
      disabled: "#e2e2e2",
      error: "#ff0066",
      placeholder: "#5c715e",
      link: "#f8b400",
      // for the state input range
      green: "#42b883",
      golden: "#f8b400",
      gray: "#878f99",
      darkgray: "#1F2937",

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
        all: "100dvh",
        outlet: "87dvh",
        allbutnav: "95dvh",
        nav: "8dvh",
        footer: "5dvh",
      },
      animation: {
        fade: "fadeIn .5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
