module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{html,js}',
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
