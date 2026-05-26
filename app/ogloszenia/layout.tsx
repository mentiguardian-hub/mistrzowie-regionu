import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ogłoszenia Nieporęt - Darmowa Giełda Lokalna | Kupię, Sprzedam, Zamienię",
  description: "Najnowsze ogłoszenia z Gminy Nieporęt. Sprzedaj niepotrzebne rzeczy, znajdź okazje w okolicy lub oddaj za darmo. Nieruchomości, motoryzacja i praca w Nieporęcie.",
  keywords: "ogłoszenia Nieporęt, giełda Nieporęt, sprzedam Nieporęt, oddam za darmo Nieporęt, praca Nieporęt, nieruchomości Nieporęt",
  openGraph: {
    title: "Ogłoszenia Nieporęt - Darmowa Giełda Lokalna | Kupię, Sprzedam, Zamienię",
    description: "Najnowsze ogłoszenia z Gminy Nieporęt. Sprzedaj niepotrzebne rzeczy, znajdź okazje w okolicy lub oddaj za darmo. Nieruchomości, motoryzacja i praca w Nieporęcie.",
  }
};

export default function OgloszeniaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Ogłoszenia Nieporęt - Darmowa Giełda Lokalna",
    "description": "Najnowsze ogłoszenia z Gminy Nieporęt. Sprzedaj niepotrzebne rzeczy, znajdź okazje w okolicy lub oddaj za darmo. Nieruchomości, motoryzacja i praca w Nieporęcie.",
    "spatialCoverage": {
      "@type": "Place",
      "name": "Nieporęt",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nieporęt",
        "addressRegion": "mazowieckie",
        "addressCountry": "PL"
      }
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
