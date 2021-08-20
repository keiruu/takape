module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'yeseva': ['Yeseva One'],
        'varela': ['Varela Round'],
      },
      colors: {
        'brown': '#615048',
        'fadedbrown': '#DECDC3',
        'medbrown': '#A17C6A',
        'darkbrown': '#75522d',
        'dark': '#A17C6A',
        'darker': '#615048',
        'light': '#EAE0D7',
        'gray': '#C4C4C4',
      },
      spacing: {
        xs: '3.27rem',
        sm: '0.575rem',
        md: '40rem',
        center: '0 auto'
       },
       
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
