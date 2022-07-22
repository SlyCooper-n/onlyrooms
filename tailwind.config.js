/** @type {import(tailwindcss).Config} */

module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto"],
        secondary: ["Poppins"],
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["dark", "light"],
  },
};
