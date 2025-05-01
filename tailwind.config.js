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
    screens: {
      'mobile-small': '360px',    // Small smartphones
      'mobile': '640px',          // Standard smartphones
      'tablet': '768px',          // Tablets and e-readers
      'laptop': '1024px',         // Smaller laptops
      'desktop': '1280px',        // Standard laptops and desktops
      'desktop-large': '1536px',  // Large monitors
      'desktop-xl': '1920px',     // Ultra HD / 4K displays
      'desktop-4k': '2560px'      // Professional monitors / Super ultrawide
      },
      container: {
        center: true,
      }
  },

  plugins: [],
}

