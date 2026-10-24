/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        kc: {
          // Deep festive maroon
          900: '#4a0e1f',
          800: '#6b1530',
          700: '#7c1d3d',
          // Rich maroon
          600: '#9c2747',
          // Rose
          500: '#c44569',
          // Pink
          400: '#e0709a',
          // Light pink
          300: '#f0a5b8',
          200: '#f7d0db',
          100: '#fce8f0',
        },
        gold: {
          900: '#6b4a00',
          700: '#9c7016',
          500: '#d4a017',
          400: '#e6b832',
          300: '#f0cc55',
          200: '#f7e08a',
          100: '#fdf0c4',
        },
        marigold: {
          600: '#e8770a',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
        },
      },
    },
  },
  plugins: [],
};
