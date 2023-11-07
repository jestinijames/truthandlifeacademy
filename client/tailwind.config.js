/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  purge: ["./src/**/*.tsx"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    lineClamp: {
      1: 1,
      2: 2,
      3: 3,
    },
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    screens: {
      "2xl": {max: "1535px"},
      "3xl": {max: "1900px"},
      xl: {max: "1279px"},
      lg: {max: "1023px"},
      "lg-min": {min: "1024px"},
      "md-min": {min: "767px"},
      md: {max: "767px"},
      sm: {max: "639px"},
      xs: {max: "479px"},
      "container-sm": {min: "640px"},
      "container-md": {min: "768px"},
      "container-lg": {min: "1024px"},
      "container-x": {min: "1280px"},
      "container-xl": {min: "1140px"},
      "container-2xl": {min: "1170px"},
    },
    typography: (theme) => ({}),
    extend: {
      colors: {
        "tla-blue": "#081077",
        "tla-white": "rgba(255,255,155,0.18)",
        "tla-glass": "rgba(255,255,255,0.25)",
        "tla-brown": "rgb(30,30,17)",
        "tla-primary": "#3c4494",
        "tla-secondary": "#1e153a",
        "tla-accent": "#F13024",
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#3c4494", // 240,86,199
        primaryDark: "#1e153a", // 80,230,217
        twitterBlue: "#38BDF8",
      },
      backgroundImage: {
        explosion: 'url("/bg-explosion.png")',
        circles: 'url("/bg-circles.png")',
        circleStar: 'url("/circle-star.svg")',
        site: 'url("/site-bg.svg")',
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      fontFamily: {
        poppins: [`var(--font-poppins)`, "sans-serif"],
        sora: [`var(--font-sora)`, "sans-serif"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  container: {
    padding: {
      DEFAULT: "15px",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-line-clamp"),
    
  ],
};
