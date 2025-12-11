/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        cardinal: "#A50021",
        gold: "#C3A572",
        parchment: "#F7F2E9",
        midnight: "#0F172A"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        garamond: ["Cormorant Garamond", "Garamond", "serif"],
        avenir: ["Manrope", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
