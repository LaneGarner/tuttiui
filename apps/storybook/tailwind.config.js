const { tuttiPreset } = require("@tutti-ui/react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/react/src/**/*.{ts,tsx}",
  ],
  presets: [tuttiPreset],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
