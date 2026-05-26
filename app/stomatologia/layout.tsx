import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stomatolog Nieporęt – Nowoczesny Gabinet i Chirurgia | Mistrzowie Regionu',
  description: 'Profesjonalna opieka stomatologiczna w Gminie Nieporęt. Leczenie kanałowe, protetyka i stomatologia dziecięca. Zadbaj o swój uśmiech u najlepszych dentystów.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/stomatologia/',
  },
  openGraph: {
    title: 'Dentysta Nieporęt – Ranking Gabinetów Stomatologicznych',
    description: 'Kompleksowa pomoc stomatologiczna dla Twojej rodziny. Sprawdź opinie i terminy.',
    url: 'https://mistrzowieregionu.pl/stomatologia/',
    siteName: 'Mistrzowie Regionu',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function StomatologiaLayout({ children }: { children: React.ReactNode }) {
  return <section className="bg-[#f8fafc]">{children}</section>;
}