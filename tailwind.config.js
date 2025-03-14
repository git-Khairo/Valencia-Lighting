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
            primary: "#1c4769",
            secondary: "#a3a3a3",
            accent: "#96c2e3",
          },
          dark: {
            text: "#fff9e5",
            background: "#080808",
            primary: "#96c2e3",
            secondary: "#5c5c5c",
            accent: "#1c4769",
          },
        },
        screens: {
          'xs': '440px',
          '2.5xl': '1690px',
          '3xl': '1960px',
        },
        fontFamily: {
          libreFranklin: ["Libre Franklin", "serif"],
          limeLight: ["Limelight", "serif"],
          genos: ["Genos", "serif"],
          gemunuLibre: ["Gemunu Libre", "serif"],
        },
      },
    },
  
    plugins: [],
};
