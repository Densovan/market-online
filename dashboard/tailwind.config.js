/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0057ff",
        secondary: "#7364db",
        bgColorweb: "#f0f4f9",
      },
    },
  },
  plugins: [],
};
