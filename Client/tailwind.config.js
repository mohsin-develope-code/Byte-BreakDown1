/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        'xxs': '375px',
        'xs': '425px',
        'msm': '430px',
      },
    },
  },
  plugins: [],
}

