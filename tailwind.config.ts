import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryFont: "rgb(251, 254, 249)",
        primaryColor: "rgb(206, 83, 116)",
        secondaryColor: "rgb(69, 182, 156)",
        primaryBg: "rgb(40, 47, 68)",
        secondaryBg: "rgb(114, 147, 160)",
      },
    },
  },
  plugins: [],
} satisfies Config;
