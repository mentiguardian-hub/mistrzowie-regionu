import { Metadata } from 'next';

// 1. DYNAMICZNE METADANE (Naprawa błędu Duplicate Content)
export const metadata: Metadata = {
  title: 'Katalog Firm i Usług Gmina Nieporęt | Mistrzowie Regionu',
  description: 'Przeszukaj pełną listę sprawdzonych fachowców w Gminie Nieporęt. Rankingi, opinie i bezpośrednie kontakty do lokalnych liderów z ponad 30 branż.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/katalog/',
  },
  openGraph: {
    title: 'Katalog Lokalnych Mistrzów - Gmina Nieporęt',
    description: 'Znajdź hydraulika, stomatologa lub stolarza w Twojej okolicy.',
    url: 'https://mistrzowieregionu.pl/katalog/',
    siteName: 'Mistrzowie Regionu',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function KatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#0f172a]">
      {children}
    </section>
  );
}