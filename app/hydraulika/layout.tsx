import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hydraulik Nieporęt – Awarie 24/7 i Instalacje | Mistrzowie Regionu',
  description: 'Szukasz sprawdzonego hydraulika w Gminie Nieporęt? Szybki dojazd do awarii, montaż instalacji i biały montaż. Fachowa pomoc i gwarancja jakości.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/hydraulika/',
  },
  openGraph: {
    title: 'Pogotowie Hydrauliczne Nieporęt – Najlepsi Fachowcy',
    description: 'Błyskawiczna pomoc przy wyciekach i awariach. Sprawdź ranking hydraulików.',
    url: 'https://mistrzowieregionu.pl/hydraulika/',
    siteName: 'Mistrzowie Regionu',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function HydraulikaLayout({ children }: { children: React.ReactNode }) {
  return <section className="bg-[#f8fafc]">{children}</section>;
}