const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "0B1524": "#0B1524",
        243041: "#243041",
        "67B6FF": "#67B6FF",
        FFFFFF: "#FFFFFF",
        customBlue1: "#344ABA",
        customBlue2: "#001479",
        playIconColor1: "#FE71FE",
        playIconColor2: "#7199FF",
        playIconColor3: "0B1524",
        backButtonColor1: "#FE71FE",
        backButtonColor2: "#7199FF",
      },
      fontFamily: {
        "mouse-memoirs": ['"Mouse Memoirs"', "sans-serif"],
      },
      backgroundImage: {
        "hangman-bg": "url('/assets/images/background-desktop.svg')",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".bg-gradient-back-button": {
          background: "linear-gradient(to right, #FE71FE, #7199FF)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
