module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './index.js',
    './dist/*.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'main': ['Inter', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
