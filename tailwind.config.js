/** @type {import(tailwindcss).Config} */

module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        text: ["Roboto"],
        title: ["Poppins"],
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["dark", "light"],
  },
};
