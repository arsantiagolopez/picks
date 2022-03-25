const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#302c2c",
        secondary: colors.stone[600],
        tertiary: colors.zinc[400],
      },
      fontFamily: {
        Basic: ["Basic", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Times: ["Times New Roman", "serif"],
      },
      display: ["group-hover"],
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
};
