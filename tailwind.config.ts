/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        background: "rgb(255,255,255)",
        foreground: "rgb(0,0,0)",
        primary: "rgb(59,130,246)", // blue-500
        secondary: "rgb(107,114,128)", // gray-500
        destructive: "rgb(239,68,68)", // red-500
      },
      screens: {
        xs: "420px",  // ✅ extra breakpoint
        sm: "660px",  // ✅ custom small breakpoint
      },
    },
  },
  plugins: [],
}
