/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        productSans: ["Product Sans", "sans-serif"],
      },
      colors: {
        primary: {
          main: "#149B76",
          surface: "#D0EBE3",
          border: "#B1DED1",
          hover: "#118162",
          pressed: "#0A4D3B",
          focus: "#149B76",
        },
        secondary: {
          main: "#EE9C22",
          surface: "#FCEBD3",
          border: "#F9DEB5",
          hover: "#C6821C",
          pressed: "#774E11",
          focus: "#EE9C22",
        },
        neutral: {
          10: "#FFFFFF",
          20: "#F5F5F5",
          30: "#EDEDED",
          40: "#E0E0E0",
          50: "#C2C2C2",
          60: "#9E9E9E",
          70: "#757575",
          80: "#616161",
          90: "#404040",
          100: "#0A0A0A",
          card: "#F8FFFD",
        },
        screens: {
          sm: "640px",
          // => @media (min-width: 640px) { ... }

          md: "768px",
          // => @media (min-width: 768px) { ... }

          lg: "1024px",
          // => @media (min-width: 1024px) { ... }

          xl: "1280px",
          // => @media (min-width: 1280px) { ... }

          "2xl": "1536px",
          // => @media (min-width: 1536px) { ... }
        },
      },
    },
    animation: {
      "infinite-scroll": "infinite-scroll 25s linear infinite",
    },
    keyframes: {
      "infinite-scroll": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
    },
  },
  plugins: [],
};
