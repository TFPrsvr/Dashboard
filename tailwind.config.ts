// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // all pages & layouts
    "./components/**/*.{js,ts,jsx,tsx}", // all shared components
    "./lib/**/*.{js,ts,jsx,tsx}", // any helper hooks or utils
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
