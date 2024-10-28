/* eslint-disable no-unused-vars */
import { theme } from 'flowbite-react'
import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        airone: ['Airone', 'sans-serif'],
      },
    },
    colors: theme => ({
      "primary-color": '#1F2937',
      "light-gray": '#818181',
      "icon-color": '#b3b3b3',
      "lighter-icon-color": "#5e5e5e",
      "soft-white": "#FFFAF0",
      "dark": "#0C0C0C",

    })
  },
  plugins: [
    flowbite.plugin(),
  ],
}