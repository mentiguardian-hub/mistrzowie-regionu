export interface Category {
  name: string;
  slug: string;
  count?: number;
}

export const CATEGORIES: Category[] = [
  { name: 'Motoryzacja', slug: 'motoryzacja' },
  { name: 'Nieruchomości', slug: 'nieruchomosci' },
  { name: 'Praca', slug: 'praca' },
  { name: 'Dom i Ogród', slug: 'dom-i-ogrod' },
  { name: 'Meble', slug: 'meble' },
  { name: 'Budowa i Remont', slug: 'budowa-i-remont' },
  { name: 'Elektronika', slug: 'elektronika' },
  { name: 'Usługi', slug: 'uslugi' },
  { name: 'Dziecko', slug: 'dziecko' },
  { name: 'Moda', slug: 'moda' },
  { name: 'Sport i Hobby', slug: 'sport-i-hobby' },
  { name: 'Muzyka i Edukacja', slug: 'muzyka-i-edukacja' },
  { name: 'Zwierzaki', slug: 'zwierzaki' },
  { name: 'Zdrowie i Uroda', slug: 'zdrowie-i-uroda' },
  { name: 'Kolekcje i Antyki', slug: 'kolekcje-i-antyki' },
  { name: 'Rolnictwo', slug: 'rolnictwo' },
  { name: 'Oddam za darmo', slug: 'oddam-za-darmo' },
  { name: 'Różne', slug: 'rozne' },
];

// Zmieniamy na bardziej restrykcyjne dla lepszego routingu
export const slugifyCategory = (name: string): string => {
  const category = CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
  return category ? category.slug : 'rozne';
};

export const unslugifyCategory = (slug: string): string | null => {
  const category = CATEGORIES.find(c => c.slug === slug);
  return category ? category.name : null; // KLUCZOWE: zwracamy null zamiast 'Różne'
};

export const getAllCategorySlugs = () => CATEGORIES.map(c => c.slug);