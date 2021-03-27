const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.tsx',
    './resources/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.indigo[300],
          DEFAULT: colors.indigo[500],
          dark: colors.indigo[700]
        },
        secondary: {
          light: colors.gray[300],
          DEFAULT: colors.gray[500],
          dark: colors.gray[700]
        },
        success: {
          light: colors.green[300],
          DEFAULT: colors.green[500],
          dark: colors.green[700]
        },
        danger: {
          light: colors.red[300],
          DEFAULT: colors.red[500],
          dark: colors.red[700]
        },
        warning: {
          light: colors.yellow[300],
          DEFAULT: colors.yellow[500],
          dark: colors.yellow[700]
        },
        info: {
          light: colors.blue[300],
          DEFAULT: colors.blue[500],
          dark: colors.blue[700]
        }
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
