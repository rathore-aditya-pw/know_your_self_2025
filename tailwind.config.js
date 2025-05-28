/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // brand: '#5A4BDA', // your app's theme color
        // 800: '#4A3FB5',

        brand: {
          50: '#F2F1FE',
          100: '#E0DFFD',
          200: '#C2BFFD',
          300: '#A59FFD',
          400: '#8880FC',
          500: '#5A4BDA',
          600: '#4A3FB5',
          700: '#3A3390',
          800: '#2A266B',
          900: '#1A1A46',
          DEFAULT: '#5A4BDA',
        },
      },
    },
  },
  plugins: [],
};
