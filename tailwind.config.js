/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b3d4ff",
          300: "#8cbeff",
          400: "#66a8ff",
          500: "#3f92ff",
          600: "#1a7eff",
          700: "#0a63d1",
          800: "#074c9f",
          900: "#05356f"
        }
      }
    }
  },
  plugins: []
}
