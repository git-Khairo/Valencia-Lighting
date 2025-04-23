import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.jsx',
    ],
    theme: {
      extend: {
        colors: {
          light: {
            text: "#03080b",
            text2: "#989898",
            background: "#f7f7f7",
            background2: "#f1f1f1",
            primary: "#00447a",
            secondary: "#cdcdcd",
            secondary2: "#575757",
            accent: "#96c2e3",
          },
          dark: {
            text: "#f7f7f7",
            background: "#03080b",
            background2: "#000d17",
            lighterbackground: "#171717",
            primary: "#96c2e3",
            secondary: "#575757",
            secondary2: "#cdcdcd",
            accent: "#00447a",
          },
        },
        screens: {
          'xs': '440px',
          '2.5xl': '1690px',
          '3xl': '1960px',
        },
        fontFamily: {
          EncodeSansCondensed: ['Encode Sans Condensed', "serif"],
          Jura: ["Jura", "serif"],
          Montserrat: ["Montserrat", "serif"],
          SulphurPoint: ['Sulphur Point', "serif"],
        },
      },
    },
  
    plugins: [],
};
