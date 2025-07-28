// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust based on your folder structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/scrollbar'),
  ],
}
