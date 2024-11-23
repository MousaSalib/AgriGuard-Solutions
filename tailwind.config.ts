import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#1b5e20",
        customBrown: "#4e342e",
        customGreenOnHover: "#133a14",
        customGradient: "linear-gradient(to right, #00ff00, #ffff00)",
      },
    },
  },
  plugins: [],
};
export default config;
