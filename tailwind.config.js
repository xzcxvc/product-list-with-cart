/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveGradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        gradientMove: "moveGradient 2s ease-in-out infinite",
      },
      fontFamily: {
        redhatdisplay: "RedHatDisplay, sans-serif",
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
