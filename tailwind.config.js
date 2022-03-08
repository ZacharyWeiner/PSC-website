const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        teal: colors.teal
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
