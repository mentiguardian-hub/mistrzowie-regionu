import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Importujemy Montserrat
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"], // Różne grubości dla stylu Premium
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mistrzowie Regionu | Ranking Firm Asenizacyjnych",
  description: "Najlepsze firmy asenizacyjne w Nieporęcie i okolicach. Sprawdź opinie i ceny.",
  // Ta linijka poniżej wyłącza wyskakujące okienko tłumacza:
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}