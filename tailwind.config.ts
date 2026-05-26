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
        premiumGold: '#d4af37',  // Our gold
        premiumLight: '#f8fafc', // Our background 
      },
      // NOWOŚĆ: Definicja ruchu paska informacyjnego
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      // NOWOŚĆ: Ustawienie czasu trwania animacji (30 sekund dla płynności)
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;