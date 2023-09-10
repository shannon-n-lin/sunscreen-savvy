/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {'mulish': ['Mulish', 'sans-serif']},
    },
    colors: {
      'dark-orange': '#fe8116',
      'lt-orange': '#ffa810',
      'blue': '#c1d3d3',
      'yellow': '#ffcf07',
      'off-white': '#f2eee2',
      'green': '#656e33',
    },

  },
  plugins: [],
}

