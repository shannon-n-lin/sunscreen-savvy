/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'off-white': '#fffefa',
      'yellow': '#ffbf00',
      'lt-orange': '#ffa810',
      'dark-orange': '#fe8116',
      'lt-blue': '#dbe8ee',
      'med-blue': '#a9c1ce',
      'green': '#788851',
    },
    fontFamily: {
      'sans': ['Mulish', 'ui-sans-serif', 'system-ui',],
    },
    fontWeight: {
      extralight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    }
  },
  plugins: [],
}

