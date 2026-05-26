import { Metadata } from 'next';
import React from 'react';

// 1. Eksport zaawansowanych metadanych SEO i Open Graph
export const metadata: Metadata = {
  title: 'Wywóz Szamba Nieporęt i Okolice | Cennik i Zamówienie 2026',
  description: 'Ekspresowy wywóz szamba w gminie Nieporęt. Obsługujemy miejscowości: Aleksandrów, Stanisławów Pierwszy, Białobrzegi, Rembelszczyzna, Kąty Węgierskie, Józefów i całą okolicę.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/zamow-wywoz/',
  },
  openGraph: {
    title: 'Express-Wywóz Szamba – Gmina Nieporęt 💩',
    description: 'Zamów usługę asenizacyjną online w 30 sekund. Obsługujemy wszystkie miejscowości w gminie Nieporęt.',
    images: ['/share-szambo.jpg'], // Dedykowany obrazek z folderu public
    type: 'website',
  },
};

// 2. Główny komponent strukturalny (Server Component)
export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}