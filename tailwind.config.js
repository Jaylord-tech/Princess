/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive']
      },
      colors: {
        blush: '#f8dce5',
        cream: '#fff7eb',
        royal: '#6e2b85',
        burgundy: '#8b1e3f',
        gold: '#d7a642'
      }
    }
  },
  plugins: []
};
