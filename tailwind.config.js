/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bonanza-primary': '#0E7C7B', // Turquesa oficial
        'bonanza-accent': '#FF8C42',  // Naranja oficial
      }
    },
  },
  plugins: [],
}