/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        darkgray: "#B0B5BD",
      },
      backgroundImage: {
        'auth': "url('/img/authLayoutBg.svg')",
        "error": "url('/img/errLayoutBg.svg')",
      }
    },
  },
  plugins: [],
};
