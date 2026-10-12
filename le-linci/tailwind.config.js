/** Colori del branco: giallo fluo e blu, come le maglie e le locandine. */
module.exports = {
  content: ['./*.html', './assets/site.js'],
  theme: {
    extend: {
      colors: {
        giallo: { 100: '#fdfbd2', 200: '#faf59a', 300: '#f8f160', 400: '#f5ea2a', 500: '#e3d50f' },
        blu: { 950: '#0b1430', 900: '#14224a', 800: '#1d3163', 700: '#2a4589', 100: '#e4e9f5' },
        azzurro: { 400: '#3fd0f0', 100: '#dff6fc' },
        carta: '#f8f7f2'
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mano: ['Caveat', 'cursive']
      }
    }
  }
};
