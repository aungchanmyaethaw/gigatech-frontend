/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0074e4",
        dark: {
          200: "#121212",
          100: "#202020",
        },
        light: "#fdfdfd",
        error: "#e21945",
      },
      fontFamily: {
        heading: ["Open Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

// --primary-color: #0074e4;
//   --dark-color-200: #121212;
//   --dark-color-100: #202020;
//   --light-color: #fdfdfd;
//   --error-color: #e21945;
