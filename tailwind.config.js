/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3BAF89', // Verde principal
          light: '#66E6A8', // Verde claro
          dark: '#2A865C', // Verde escuro
        },
        secondary: {
          DEFAULT: '#3498DB', // Azul principal
          light: '#85C1E9', // Azul claro
          dark: '#21618C', // Azul escuro
        },
        accent: {
          orange: '#F39C12', // Laranja para destaques
          purple: '#9B59B6', // Roxo para contrastes
        },
        neutral: {
          light: '#ECF0F1', // Cinza claro
          dark: '#34495E', // Cinza escuro
        },
        light: {
          DEFAULT: '#FFFFFF', // Branco
        },
        'background-app': '#f6f9ff',
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-primeui')],
}
