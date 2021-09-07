module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow:{
        gray: '1px -1px 30px 5px rgba(227,227,227,0.75)',
        light: '2px 18px 38px -4px rgba(242,200,186,0.75)',
      },
      fontFamily: {
        'varela': ['Varela Round'],
      },
      colors: {
        'bgcolor': '#FEF6F2',
        'accent': '#C9593F',
        'lightaccent': '#FFF5E1',
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
        'lighter': '#FFFFF6',
        'lightergray': '#F3F4F6',
      },
      spacing: {
        xs: '3.27rem',
        sm: '0.45rem',
        md: '40rem',
        center: '0 auto',
        '8.5': '2.20rem',
        med: '60rem',
        medlg: '65rem',
        medsm: '40rem',
        s: '30rem',
        '17': '4.4rem',
        '20': '5.5rem',
        '27': '6.4rem',
        '100': '30rem',
      },
      minHeight: {
        '18': '18rem',
      },
      borderRadius: {
        '1/2': '50%',
      },
      backgroundImage: theme => ({
        'bg': "url('/src/img/takapebg.svg')",
        'side': "url('/src/img/headersideimg.svg')",
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
