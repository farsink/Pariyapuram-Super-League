
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#f46036",
        primary: "#0D0C1D",
        secondary: "#F7F7FF",
        background: "#00916e",
        textColor: "#f9f9f9", // Replace with your actual accent color
      },
    },
  },
  plugins: [],
};
