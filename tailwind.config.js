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
            text: "#03080B",
            background: "#FCFCFC",
            background2: "#EFF3F3",
            primary: "#00447A",
            secondary: "#DFE6E6",
            secondary2: "#32393D",
            accent: "#A5D8FF",
          },
          dark: {
            text: "#FCFCFC",
            background: "#03080b",
            background2: "#161C1F",
            primary: "#A5D8FF",
            secondary: "#32393D",
            secondary2: "#DFE6E6",
            accent: "#00447A",
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
