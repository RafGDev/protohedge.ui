/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#222f3e',
      'primary-dark': '#1b2531',
      secondary: '#2ecc71',
      red: '#c0392b',
      purple: '#8571FF',
      grey: '#95a5a6',
      green: '#35B47F',
      blue: '#3498db',
      white: '#ffffff',
      'primary-light': '#517094'
    }
  },
  plugins: [],
}
