import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // IMPORTUJEMY TWÓJ NOWY NAGŁÓWEK

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mistrzowie Regionu | Ranking Firm Asenizacyjnych",
  description: "Najlepsze firmy asenizacyjne w Nieporęcie i okolicach. Sprawdź opinie i ceny.",
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
    <html lang="pl" className="scroll-smooth">
      <body className={`${montserrat.variable} font-montserrat antialiased bg-white`}>
  <Header />
  <main>{children}</main>
</body>
    </html>
  );
}