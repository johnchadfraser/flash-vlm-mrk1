const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1200px",
      xl: "1536px",
      "2xl": "1900px",
    },
    container: {
      padding: {
        DEFAULT: "0rem",
        sm: "0rem",
        md: "0rem",
        lg: "0rem",
        xl: "0rem",
        "2xl": "0rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Roboto Condensed", ...defaultTheme.fontFamily.sans],
        roboto: ["Roboto"],
        "roboto-condensed": ["Roboto Condensed"],
        body: ["Roboto Condensed"],
      },
      colors: {
        "fs-brown": "#363031",
        "fs-light-brown": "#837678",
        "fs-orange": "#f77f00",
        "fs-yellow": "#fcba36",
        "fs-yellow-light": "#fac761",
        "fs-red": "#eb1f04",
        "fs-blue": "#003049",
        "fs-light-gray": "#eceaea",
      },
      backgroundSize: {
        "1r": "1rem",
        "1-5r": "1.5rem",
        "2r": "2rem",
        "2-5r": "2.5rem",
        "3r": "3rem",
      },
      listStyleImage: {
        checkmark: 'url("/images/icon/checkmark.svg")',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
