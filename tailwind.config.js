


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  theme: {
    extend: {
      cursor: {
        'pointer': 'pointer'
      },
      backgroundColor: {
        'overlay-70': 'rgba(0,0,0,0.7)',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-80': 'rgba(0,0,0,0.8)',
      },
      width: {
        '256': '256px',
        'r256': 'calc(100% - 256px)'
      },
      animation: {
        'modalShow': 'modalShow .3s linear ',
        'modalClose': 'modalShow .3s linear ',
      },
      keyframes: {
        modalShow: {
          '0%': { transform: 'translateX(-100px)', },
          '100%': { transform: 'translateX(0%)' }
        },
        modalClose: {
          '0%': { transform: 'translateX(0)', },
          '100%': { transform: 'translateX(-100px)', }
        }
      },
      fontFamily: {
        'nunito': ['nunito', 'sans-serif'],
        'ruda': ['Ruda', 'sans-serif'],
        'tactitle': ['Syne Tactile', 'cursive'],
        'qwitcher': ['Qwitcher Grypen', 'cursive']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  mode: 'jit'
}