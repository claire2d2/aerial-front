/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // enables dark mode based on the class applied to the html tag
  theme: {
    colors: {
      main: "#146c89",
      maindark: "#123f52",
      bgmain: "#fffbf4",
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
    extend: {},
  },
  plugins: [],
};
