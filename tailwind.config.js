/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      colors: {
        DarkBlue: "#2E86C6",
        Yellow: "#FFBA2E",
        Greenish: "#8ECA9A",
        LightGray: "#979797",
        DarkModeBlue: "#1B2840",
        LightBlue: "#93C2E5",
        Light: "#D9F2FF",
        customBlue: '#2E86C6',
      },
      fontFamily: {
        tektur: ["Tektur", "cursive"],
      },
    },
  },
  plugins: [],
};
