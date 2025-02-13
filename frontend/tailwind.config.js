/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#f46036",
        primary: "#0D0C1D",
        Purple: "#37003c",
        background: "#00916e",
        textColor: "#f9f9f9", // Replace with your actual accent color
      },
    },
  },
  plugins: [],
};
