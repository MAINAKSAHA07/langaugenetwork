/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#17C3B2',
          dark: '#14A89A',
          light: '#3DD0C1',
        },
        secondary: {
          mint: '#E8F9F7',
          yellow: '#FFD23F',
          navy: '#0F1B35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0px 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
      maxWidth: {
        'container': '1440px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalSlideUp: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out',
        modalSlideUp: 'modalSlideUp 300ms ease-out',
      },
    },
  },
  plugins: [],
}

