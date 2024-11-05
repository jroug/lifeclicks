import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        araxnowhite: "rgb(255 255 255 / 15%)",
      },
      screens: {
        '3xl': '1920px',
      },
      aspectRatio: {
        '74/93': '74 / 93',
      },
    },
  },
  plugins: [],
};
export default config;