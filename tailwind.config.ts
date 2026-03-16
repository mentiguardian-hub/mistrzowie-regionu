import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        premiumNavy: '#0f172a',  // Głęboki granat
        premiumGold: '#b59410',  // Twoje złoto
        premiumLight: '#f8fafc', // Twoje tło
      },
    },
  },
  plugins: [],
};
export default config;