/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainPrimary: "#F28500",
        mainSecondary: "#54318C",
        success: "#37356A2",
        successBg: "#F5EFFF",
        criticalRed: "#EA2419",
        criticalBg: "#FFEFEE",
        pending: "#ADD8E6",
        pendingBg: "#E9FAFF",
        neutralWhite: "#F2F2F2",
        white: "#FFFFFF",
        neutralDark: "#171412",
        neutralGrey: "#595959",
        navBar: "#FFFCEE",
        menuBg: "#FDFDFD",
      },
    },
  },
  plugins: [],
}
