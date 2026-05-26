import { Metadata } from 'next';
import HarmonogramyClient from './HarmonogramyClient';

export const metadata: Metadata = {
  title: 'Harmonogram Wywozu Śmieci Nieporęt 2026 | Terminy Odbioru',
  description: 'Aktualny harmonogram wywozu śmieci dla gminy Nieporęt na 2026 rok. Sprawdź terminy odbioru odpadów komunalnych, PSZOK i pobierz kalendarz dla swojej ulicy.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/harmonogramy/',
  },
  openGraph: {
    title: 'Harmonogram Wywozu Śmieci Nieporęt 2026',
    description: 'Sprawdź terminy wywozu śmieci dla swojej ulicy w gminie Nieporęt. Zawsze aktualne dane na 2026 rok.',
    url: 'https://mistrzowieregionu.pl/harmonogramy/',
    siteName: 'Mistrzowie Regionu',
    locale: 'pl_PL',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function HarmonogramyPage() {
  return <HarmonogramyClient />;
}