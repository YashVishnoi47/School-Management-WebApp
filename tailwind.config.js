/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      boxShadow:{
        "black-shadow": "0px 0px 10px rgba(0, 0, 0, 0.2)",
        "black-2": "0px 0px 10px rgba(124,185,232)",
      },
    },
  },
  plugins: [],
}

