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
        cardinal: "#A50021"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        manrope: ["Manrope", "Inter", "system-ui", "-apple-system", "sans-serif"],
        playfair: ["Playfair Display", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
