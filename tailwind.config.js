/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}"
  ],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "0px",
      DEFAULT: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px"
    },
    extend: {
      colors: {
        cardinal: "#890304",
        gold: "#FFFFFF",
        parchment: "#FAF9F6",
        midnight: "#000000",
        cobalt: "#000000"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        garamond: ["EB Garamond", "Garamond", "serif"],
        avenir: ["Manrope", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
