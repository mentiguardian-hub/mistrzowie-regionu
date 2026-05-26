import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Przeprowadzki Nieporęt – Tani i Bezpieczny Transport | Mistrzowie Regionu',
  description: 'Planujesz przeprowadzkę w Gminie Nieporęt? Oferujemy profesjonalny transport mebli, pakowanie i pomoc w relokacji. Szybko, tanio i bez stresu.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/przeprowadzki/',
  },
  openGraph: {
    title: 'Firma Przeprowadzkowa Nieporęt – Transport i Relokacja',
    description: 'Bezpieczny przewóz mienia dla osób prywatnych i firm. Zobacz polecane ekipy.',
    url: 'https://mistrzowieregionu.pl/przeprowadzki/',
    siteName: 'Mistrzowie Regionu',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function PrzeprowadzkiLayout({ children }: { children: React.ReactNode }) {
  return <section className="bg-[#f8fafc]">{children}</section>;
}