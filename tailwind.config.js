/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/components/**/*.{js,ts,jsx,tsx}`,
    `./src/containers/**/*.{js,ts,jsx,tsx}`,
    `./src/pages/**/*.{js,ts,jsx,tsx}`,
    `./src/screens/**/*.{js,ts,jsx,tsx}`,
    `./src/styles/**/*.css`, // Include the styles directory for CSS files
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        21: "87px",
      },
      colors: {
        sky: "#0198d5",
        "primary-gray": "#505050",
        primary: "#18181A",
        secondary: "#1E1E20",
        offgray: "#737379",
        offwhite: "#DFDFDF",
        stroke: "#555557",
      },
      fontFamily: {
        sans: ['"SF Pro Display"'],
      },
    },
  },
  plugins: [],
};
