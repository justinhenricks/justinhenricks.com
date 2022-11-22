const defaultTheme = require("tailwindcss/defaultTheme");

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    console.log("opacity");
    console.log(opacityValue);
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      light: "#FDFDFD",
      dark: "#121212",
      blackberry: "#000022",
    },
    boxShadow: {
      sm: "2px 2px 0px #000022",
      md: "3px 3px 0px #000022",
      lg: "0px -7px 4px rgba(0, 0, 0, 0.5)",
    },
    fontSize: {
      xxs: ["12px", { lineHeight: "12px" }],
      xs: ["12px", { lineHeight: "18px" }],
      s: ["14px", { lineHeight: "21.6px" }],
      m: ["16px", { lineHeight: "24px" }],
      xl: ["18px", { lineHeight: "22.32px" }],
      "2xl": ["20px", { lineHeight: "24px" }],
      "3xl": ["22px", { lineHeight: "28.16px" }],
      "4xl": ["24px", { lineHeight: "31.68px" }],
      "5xl": ["28px", { lineHeight: "35.84px" }],
    },
    fontFamily: {
      satoshi: "Satoshi, sans-serif",
      roboto: "Roboto, sans-serif",
    },
    extend: {},
  },
  plugins: [],
};
