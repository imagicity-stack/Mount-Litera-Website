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
        /* Crimson — the single accent, used sparingly (shields, play buttons, active states) */
        crimson: {
          DEFAULT: "#A51C30",
          50: "#FBF0F2",
          100: "#F4D8DD",
          200: "#E5AAB4",
          300: "#D2757F",
          400: "#BC4453",
          500: "#A51C30",
          600: "#8C1728",
          700: "#6E1220",
          800: "#4E0C17",
          900: "#30070E"
        },
        /* Legacy token kept so existing markup keeps compiling — now Harvard crimson */
        cardinal: {
          DEFAULT: "#A51C30",
          50: "#FBF0F2",
          100: "#F4D8DD",
          200: "#E5AAB4",
          300: "#D2757F",
          400: "#BC4453",
          500: "#A51C30",
          600: "#8C1728",
          700: "#6E1220",
          800: "#4E0C17",
          900: "#30070E"
        },
        /* Legacy "gold" remapped to a neutral grey ramp — no metallics in the Harvard system */
        gold: {
          DEFAULT: "#8F8F8F",
          50: "#FAFAFA",
          100: "#EFEFEF",
          200: "#DCDCDC",
          300: "#C4C4C4",
          400: "#A8A8A8",
          500: "#8F8F8F",
          600: "#6E6E6E",
          700: "#4F4F4F",
          800: "#333333",
          900: "#1F1F1F"
        },
        bronze: "#6E6E6E",
        champagne: "#E4E4E4",
        /* Page grounds — flat, no gradients */
        parchment: "#FFFFFF",
        ivory: "#F2F2F2",
        sand: "#E7E7E7",
        chalk: "#F7F7F7",
        stone: "#E2E2E2",
        slate: {
          DEFAULT: "#6E6E6E",
          light: "#8F8F8F",
          dark: "#4A4A4A"
        },
        hairline: "#D5D5D5",
        /* Ink — near-black used for text and inverted bands */
        midnight: {
          DEFAULT: "#141414",
          50: "#F7F7F7",
          100: "#EDEDED",
          200: "#D5D5D5",
          300: "#B0B0B0",
          400: "#8F8F8F",
          500: "#5C5C5C",
          600: "#333333",
          700: "#1F1F1F",
          800: "#141414",
          900: "#0A0A0A"
        },
        ink: {
          DEFAULT: "#141414",
          soft: "#333333",
          muted: "#5C5C5C"
        },
        obsidian: "#0D0D0D",
        graphite: "#1F1F1F",
        cobalt: "#141414"
      },
      fontFamily: {
        /* Display serif — Harvard-style editorial headline face */
        display: ["'Playfair Display'", "'Libre Baskerville'", "Georgia", "serif"],
        serif: ["'Playfair Display'", "'Libre Baskerville'", "Georgia", "serif"],
        garamond: ["'Playfair Display'", "'Libre Baskerville'", "Georgia", "serif"],
        /* Grotesque sans — interface, body copy, labels */
        sans: ["Inter", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        avenir: ["Inter", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        inter: ["Inter", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"],
        poppins: ["Inter", "'Helvetica Neue'", "Helvetica", "Arial", "sans-serif"]
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6.5vw, 6rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.012em" }],
        "display-lg": ["clamp(2rem, 3.8vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }]
      },
      letterSpacing: {
        regal: "0.14em",
        emblem: "0.2em"
      },
      /* Square-edged system — only pills/circles keep a radius */
      borderRadius: {
        none: "0px",
        xs: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        "4xl": "0px",
        full: "9999px"
      },
      boxShadow: {
        "elite-sm": "none",
        elite: "none",
        "elite-lg": "0 18px 40px -32px rgba(0,0,0,0.35)",
        "elite-xl": "0 24px 60px -40px rgba(0,0,0,0.4)",
        cardinal: "none",
        gold: "none",
        "inner-soft": "none",
        hairline: "inset 0 0 0 1px #D5D5D5"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-radial-gold": "none",
        "gradient-ink": "linear-gradient(180deg, #141414 0%, #0D0D0D 100%)",
        "gradient-parchment": "linear-gradient(180deg, #FFFFFF 0%, #F2F2F2 100%)",
        "gradient-gold-line": "linear-gradient(90deg, #D5D5D5, #D5D5D5)",
        "gradient-cardinal": "linear-gradient(180deg, #A51C30 0%, #8C1728 100%)",
        "gradient-gold-shimmer": "linear-gradient(90deg, #141414 0%, #141414 100%)",
        "noise-dark": "none"
      },
      keyframes: {
        "gold-shine": {
          "0%": { opacity: 1 },
          "100%": { opacity: 1 }
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "slow-pan": {
          "0%": { transform: "scale(1.02) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.08) translate3d(-0.5%,0.5%,0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "gold-shine": "none",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-pan": "slow-pan 22s ease-in-out infinite alternate",
        marquee: "marquee 40s linear infinite"
      },
      transitionTimingFunction: {
        elite: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      maxWidth: {
        shell: "1360px",
        prose: "68ch"
      }
    }
  },
  plugins: []
};
