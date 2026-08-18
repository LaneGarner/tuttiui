const { tuttiPreset } = require("@tuttiui/react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/react/src/**/*.{ts,tsx}",
    "../../packages/react-native/src/**/*.{ts,tsx}",
  ],
  presets: [tuttiPreset],
  important: true,
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
