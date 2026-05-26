import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import CookieBanner from '../components/CookieBanner';
import "./globals.css";
import SWRegistration from "@/components/SWRegistration";
// NOWY IMPORT: Wczytujemy naszego "strażnika"
import LayoutWrapper from "@/components/LayoutWrapper";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
});

// 🚀 ZOPTYMALIZOWANE META TAGI PREMIUM 🚀
export const metadata: Metadata = {
  metadataBase: new URL('https://mistrzowieregionu.pl'),
  title: "Portal Nieporęt - Harmonogram Odpadów, Ogłoszenia i Najlepsze Firmy",
  description: "Wszystko o Nieporęcie w jednym miejscu. Aktualny harmonogram wywozu śmieci 2026, darmowe ogłoszenia lokalne oraz ranking najlepszych fachowców: szambo, elektryk, hydraulik.",
  keywords: [
    "Nieporęt", "Gmina Nieporęt", "harmonogram odpadów Nieporęt 2026",
    "wywóz śmieci Nieporęt", "ogłoszenia Nieporęt", "firmy Nieporęt",
    "wywóz szamba Nieporęt", "elektryk Nieporęt", "hydraulik Nieporęt",
    "przeprowadzki Nieporęt", "usługi asenizacyjne Nieporęt"
  ],
  openGraph: {
    title: "Portal Nieporęt - Twoje Centrum Informacji Lokalnej",
    description: "Sprawdź kiedy śmieci, znajdź fachowca lub dodaj ogłoszenie. Wszystko dla mieszkańców Gminy Nieporęt.",
    locale: "pl_PL",
    type: "website",
    url: "https://mistrzowieregionu.pl",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portal Mistrzowie Regionu - Gmina Nieporęt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Nieporęt - Harmonogram, Ogłoszenia i Firmy",
    description: "Centrum informacji dla mieszkańców Gminy Nieporęt. Sprawdź harmonogram śmieci i lokalną giełdę.",
    images: ["/og-image.jpg"],
  },
  manifest: '/manifest.json',
 
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MR Nieporęt",
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // 🚀 NIEWIDZIALNY KOD JSON-LD DLA ROBOTÓW GOOGLE (LOKALNE SEO) 🚀
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mistrzowie Regionu - Gmina Nieporęt",
    "url": "https://mistrzowieregionu.pl",
    "description": "Odkryj najlepsze firmy, opinie i ogłoszenia w Twojej okolicy.",
    "about": {
      "@type": "Service",
      "serviceType": "Katalog lokalnych Liderów",
      "areaServed": [
        { "@type": "City", "name": "Nieporęt" },
        { "@type": "City", "name": "Białobrzegi" },
        { "@type": "City", "name": "Józefów" },
        { "@type": "City", "name": "Kąty Węgierskie" }
      ]
    }
  };

  return (
   <html lang="pl" className="scroll-smooth notranslate" translate="no">
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z5PVYJ1SNK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z5PVYJ1SNK');
          `}
        </Script>
        {/* Wstrzykiwanie danych strukturalnych do sekcji HEAD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Tło strony pozostaje białe dla bezpieczeństwa publicznego portalu */}
      <body className={`${montserrat.variable} font-montserrat antialiased bg-white flex flex-col min-h-screen`}>
        <SWRegistration />
        
        {/* Tutaj wkracza nasz nowy komponent. To on decyduje co pokazać! */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
       <CookieBanner />
      </body>
    </html>
  );
}