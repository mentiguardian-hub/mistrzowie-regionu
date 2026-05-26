import { Metadata } from 'next';

export const metadata: Metadata = {
  // 1. TYTUŁ (Max 60 znaków) - Zoptymalizowany pod główną intencję szukania
  title: 'Wywóz Szamba Nieporęt – Szybko i Tanio | Mistrzowie Regionu',

  // 2. OPIS (Max 160 znaków) - Język korzyści i Call to Action
  description: 'Szukasz rzetelnej firmy asenizacyjnej w Gminie Nieporęt? Sprawdź nasz ranking. Szybki dojazd do awarii, nowoczesne beczkowozy i konkurencyjne ceny.',

  alternates: {
    canonical: 'https://mistrzowieregionu.pl/szamba/',
  },

  openGraph: {
    title: 'Najlepsze Firmy Asenizacyjne - Wywóz Szamba Gmina Nieporęt',
    description: 'Pękające szambo? Szybki wywóz nieczystości z posesji. Zobacz zweryfikowanych fachowców w Twojej okolicy.',
    url: 'https://mistrzowieregionu.pl/szamba/',
    siteName: 'Mistrzowie Regionu',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function SzambaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#f8fafc]">
      {children}
    </section>
  );
}