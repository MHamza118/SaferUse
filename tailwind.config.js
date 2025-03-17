/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: {
          800: '#7c4dff', // Example dark blue color
        },
        lightblue: {
          400: '#ADD8E6', // Example light blue color
        },
      },
    },
  },
  plugins: [],
}

