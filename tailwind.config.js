/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      'primary-bg': '#fdfdfd',
      'secondary-bg': '#e9ecef',
      'primary-text': '#212529',
      'secondary-text': '#495057',
      'accent':'#FF006E',
      'button-bg':'#3A86FF',
      'link':'#3A86FF',
      'link-hover':'#FF006E',
    },
  },
  plugins: [],
}

