/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#8183F4", 
        "secondary":"#DADAFC", 
        "custom_black":"#28292C",
        "dark":"#4547A9",
        "light":"#64748b",
      }
    },
  },
  plugins: [],
}