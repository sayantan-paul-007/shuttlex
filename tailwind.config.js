/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        headingFont: ['Orbitron', 'sans-serif'],
        body: ['PT Sans', 'sans-serif']
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'scale(0.95)' },
        '100%': { opacity: '1', transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
}

