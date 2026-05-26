import { Metadata } from 'next';

// 🚀 ZOPTYMALIZOWANE META TAGI PREMIUM (SEO) + KONFIGURACJA APPLIKACJI 🚀
export const metadata: Metadata = {
  title: "Harmonogram Wywozu Odpadów 2026 - Gmina Nieporęt | Wyszukiwarka Ulic",
  description: "Sprawdź aktualny harmonogram odbioru odpadów w gminie Nieporęt na rok 2026. Wyszukaj swoją ulicę i sprawdź najbliższe terminy wywozu.",
  manifest: '/manifest-odpady.json', // Łącznik z nazwą "Odpady MR"
  icons: {
    apple: '/icons/icon-odpady-180.png', // Ikona dla iPhone
  },
  openGraph: {
    title: "Harmonogram Wywozu Odpadów 2026 - Gmina Nieporęt",
    description: "Sprawdź aktualny harmonogram odbioru odpadów w gminie Nieporęt na rok 2026. Wyszukaj swoją ulicę i sprawdź najbliższe terminy wywozu.",
  }
};

export default function HarmonogramyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 🚀 NIEWIDZIALNY KOD JSON-LD DLA ROBOTÓW GOOGLE (LOKALNE SEO) 🚀
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Kalendarz wywozu odpadów komunalnych Nieporęt 2026",
    "description": "Sprawdź aktualny harmonogram odbioru odpadów w gminie Nieporęt na rok 2026. Wyszukaj swoją ulicę i sprawdź najbliższe terminy wywozu.",
    "license": "https://mistrzowieregionu.pl/regulamin",
    "creator": {
      "@type": "Organization",
      "name": "Mistrzowie Regionu",
      "url": "https://mistrzowieregionu.pl"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}