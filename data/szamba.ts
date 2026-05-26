export interface Company {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  isPremium: boolean;
  features: string[];
  contact: {
    phone: string;
    address: string;
    website: string;
  };
  quote?: string;
  badges?: string[];
  logo?: string;
  badge?: string;
  description?: string;
  phoneRaw?: string;
  phoneDisplay?: string;
  callToAction?: string;
  email?: string;
  logoUrl?: string;
}

export const szambaCompanies: Company[] = [
  {
    id: 'szambex24',
    name: 'SZAMBEX24 - Wywóz Nieczystości',
    rating: 5.0,
    reviewsCount: 128,
    isPremium: true,
    logo: '/szambex.png',
    badge: 'Lokalny Lider',
    description: 'Największy certyfikowany przewoźnik w gminie Nieporęt. Gwarancja czystości posesji.',
    phoneRaw: '+48500600700',
    phoneDisplay: '500 600 700',
    callToAction: 'ZADZWOŃ: 500 600 700',
    features: [
      'Błyskawiczny dojazd (do 2h od telefonu)',
      'Beczkowozy o pojemności 10m3 i 12m3',
      'Płatność kartą lub BLIKIEM u kierowcy',
      'Nowoczesna, bezwonna flota Mercedes-Benz'
    ],
    contact: {
      phone: '500 600 700',
      address: 'ul. Dębowa 15, 05-126 Nieporęt',
      website: 'www.szambex24-nieporet.pl'
    },
    quote: '"Naszą wizytówką jest punktualność. Jeśli umawiamy się na 14:00, jesteśmy o 13:55. Bez brudu, bez smrodu, z pełną kulturą."',
    badges: ['Gwarancja Czystości', 'Lokalny Lider', 'Wybór Mieszkańców 2024']
  }
];
