module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow:{
        gray: '10px 26px 41px -8px rgba(227,227,227,0.75)',
        light: '2px 18px 38px -4px rgba(242,200,186,0.75)',
      },
      fontFamily: {
        'yeseva': ['Yeseva One'],
        'varela': ['Varela Round'],
      },
      colors: {
        'accent': '#C9593F',
        'lightaccent': '#D2745E',
        'darkaccent': '#3F3F3F',
        'brown': '#83564B',
        'fadedbrown': '#3F3F3F',
        'medbrown': '#3F3F3F',
        'darkbrown': '#75522d',
        'dark': '#83564B',
        'darker': '#3F3F3F',
        'light': '#EAE0D7',
        'lightgray': '#F9FAFC',
        'gray': '#C4C4C4',
      },
      spacing: {
        xs: '3.27rem',
        sm: '0.45rem',
        md: '40rem',
        center: '0 auto',
        '8.5': '2.20rem',
        med: '60rem',
        medsm: '40rem',
        s: '30rem',
        '17': '4.4rem',
        '27': '6.4rem'
      },
      backgroundImage: theme => ({
        'bg': "url('/src/img/takapebg.svg')",
        'header': "url('/src/img/headerbg.svg')",
        'bggradient': "linear-gradient(70deg, rgba(210,116,94,1) 0%, rgba(201,89,63,1) 100%)",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
