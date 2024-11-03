/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 1.5s infinite",
        beat1: "beat 1s ease-in-out infinite",
        beat2: "beat 1s ease-in-out 0.25s infinite",
        beat3: "beat 1s ease-in-out 0.5s infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        beat: {
          "0%, 100%": { transform: "scaleX(0.5)" },
          "50%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};
