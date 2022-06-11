module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Times new roman']
    },
    extend: {
      colors: {
        dark: '#000',
        white: '#fff',
        lightText: '#76797d',
        bgDark: '#2E3440',
        cardDark: '#434C5E',
        butDark: '#5E81AC',
        bgLight: '#D8DEE9',
        cardLight: '#E5E9F0',
        butLight: '#81A1C1'
      }
    }
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
  },
  plugins: []
};
