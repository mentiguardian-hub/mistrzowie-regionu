import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Przywracamy eksport statyczny
  trailingSlash: true, // 👈 TA LINIA NAPRAWI BŁĘDY 404 W KONSOLI
  images: {
    unoptimized: true,
  },
};

export default nextConfig;