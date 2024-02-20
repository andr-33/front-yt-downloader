/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        protest: ['"Protest Riot"', ...defaultTheme.fontFamily.sans],
        concert: ['"Concert One"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

