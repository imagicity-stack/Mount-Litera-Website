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
        cardinal: {
          DEFAULT: "#8A0A12",
          50: "#FBEDEE",
          100: "#F4D1D3",
          200: "#E5A0A3",
          300: "#D26267",
          400: "#B92A32",
          500: "#8A0A12",
          600: "#6F060E",
          700: "#54040A",
          800: "#3B0206",
          900: "#260003"
        },
        gold: {
          DEFAULT: "#C9A24B",
          50: "#FBF5E6",
          100: "#F3E5BE",
          200: "#E6CE83",
          300: "#D8B65A",
          400: "#C9A24B",
          500: "#B18734",
          600: "#8E6A24",
          700: "#6B4F18",
          800: "#4A360E",
          900: "#2C1F06"
        },
        bronze: "#A77A3A",
        champagne: "#E8D9B0",
        parchment: "#FAF7F1",
        ivory: "#F5EFE3",
        sand: "#EFE6D4",
        midnight: {
          DEFAULT: "#0A0A0C",
          50: "#F4F4F5",
          100: "#E4E4E7",
          200: "#C9C9CF",
          300: "#9FA0A6",
          400: "#6B6C73",
          500: "#3E3F45",
          600: "#24252A",
          700: "#15161A",
          800: "#0E0F12",
          900: "#0A0A0C"
        },
        obsidian: "#0B0D10",
        graphite: "#1B1E24",
        cobalt: "#0A0A0C"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        garamond: ["'EB Garamond'", "Garamond", "serif"],
        serif: ["'EB Garamond'", "Garamond", "serif"],
        display: ["'EB Garamond'", "Garamond", "serif"],
        avenir: ["Manrope", "Inter", "system-ui", "sans-serif"],
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 7vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.75rem, 5vw, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }]
      },
      letterSpacing: {
        regal: "0.32em",
        emblem: "0.45em"
      },
      borderRadius: {
        none: "0px",
        xs: "2px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "18px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        full: "9999px"
      },
      boxShadow: {
        "elite-sm": "0 1px 2px rgba(10,10,12,0.06), 0 4px 10px -4px rgba(10,10,12,0.08)",
        elite: "0 10px 30px -12px rgba(10,10,12,0.25), 0 4px 10px -6px rgba(10,10,12,0.12)",
        "elite-lg": "0 30px 80px -30px rgba(10,10,12,0.35), 0 8px 24px -12px rgba(10,10,12,0.18)",
        "elite-xl": "0 50px 120px -40px rgba(10,10,12,0.45), 0 10px 30px -10px rgba(10,10,12,0.2)",
        cardinal: "0 20px 40px -18px rgba(138,10,18,0.45)",
        gold: "0 20px 40px -18px rgba(201,162,75,0.45)",
        "inner-soft": "inset 0 1px 0 rgba(255,255,255,0.06)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-gold": "radial-gradient(circle at top, rgba(201,162,75,0.18), transparent 60%)",
        "gradient-ink": "linear-gradient(135deg, #0A0A0C 0%, #1B1E24 45%, #0A0A0C 100%)",
        "gradient-parchment": "linear-gradient(180deg, #FAF7F1 0%, #F5EFE3 100%)",
        "gradient-gold-line": "linear-gradient(90deg, transparent, rgba(201,162,75,0.7), transparent)",
        "gradient-cardinal": "linear-gradient(135deg, #8A0A12 0%, #54040A 100%)",
        "gradient-gold-shimmer": "linear-gradient(90deg, #B18734 0%, #E8D9B0 50%, #B18734 100%)",
        "noise-dark": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
      },
      keyframes: {
        "gold-shine": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "slow-pan": {
          "0%": { transform: "scale(1.02) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.1) translate3d(-1%,1%,0)" }
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "gold-shine": "gold-shine 6s linear infinite",
        "fade-up": "fade-up 0.8s ease-out both",
        "slow-pan": "slow-pan 18s ease-in-out infinite alternate",
        "marquee": "marquee 40s linear infinite"
      },
      transitionTimingFunction: {
        elite: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};
