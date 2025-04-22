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
            text: "#1a1400",
            background: "#f7f7f7",
            primary: "#00447a",
            secondary: "#cdcdcd",
            accent: "#96c2e3",
          },
          dark: {
            text: "#f7f7f7",
            background: "#080808",
            primary: "#96c2e3",
            secondary: "#575757",
            accent: "#00447a",
          },
        },
        screens: {
          'xs': '440px',
          '2.5xl': '1690px',
          '3xl': '1960px',
        },
        fontFamily: {
          AlumniSansPinstripe: ["Alumni Sans Pinstripe", "serif"],
          Agdasima: ["Agdasima", "serif"],
          Amaranth: ["Amaranth", "serif"],
          Anaheim: ["Anaheim", "serif"],
          AverageSans: ['Average Sans', "serif"],
          EncodeSansCondensed: ['Encode Sans Condensed', "serif"],
          Gruppo: ["Gruppo", "serif"],
          Jura: ["Jura", "serif"],
          Montserrat: ["Montserrat", "serif"],
          Slabo13px: ["Slabo 13px", "serif"],
          SulphurPoint: ['Sulphur Point', "serif"],
          Tinos: ['Tinos', "serif"],
        },
      },
    },
  
    plugins: [],
};
