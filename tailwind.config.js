/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      margin: {
        '230px': '230px',
      },
      width: {
        '800px': '800px',
        '500px': '500px',
      },
      height: {
        '85vh' : '85vh',
        '92vh' : '92vh'
      }
    },
  },
  plugins: [],
}
