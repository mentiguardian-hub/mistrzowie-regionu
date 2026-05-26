import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CompanyCard from '@/components/cards/CompanyCard';
import { categoriesConfigs } from '@/config/categories';

// 1. MAPOWANIE MIEJSCOWOŚCI
const CITY_MAP: Record<string, string> = {
  'nieporet': 'Nieporęt',
  'bialobrzegi': 'Białobrzegi',
  'stanislawow-pierwszy': 'Stanisławów Pierwszy',
  'zegrze': 'Zegrze',
  'rembelszczyzna': 'Rembelszczyzna',
  'jozefow': 'Józefów',
  'izabelin': 'Izabelin',
  'katy-wegierskie': 'Kąty Węgierskie'
};

// 2. CZARNA LISTA - BRANŻE VIP OBSŁUGIWANE RĘCZNIE
const MANUAL_INDUSTRIES = ['szamba', 'hydraulika', 'stomatologia', 'przeprowadzki'];

// Pomocnicza funkcja do wyboru unikalnego tekstu dla danego miasta
function getDynamicText(templates: string[] | undefined, city: string): string {
  if (!templates || templates.length === 0) return "";
  const index = city.length % templates.length;
  return templates[index].replace(/{city}/g, city);
}

// GENEROWANIE PARAMETRÓW STATYCZNYCH (Z FILTREM)
export async function generateStaticParams() {
  const testCities = Object.keys(CITY_MAP);
  
  // Fabryka generuje strony tylko dla branż, które nie są na "Czarnej Liście"
  const automatedIndustries = categoriesConfigs
    .map(category => category.id)
    .filter(id => !MANUAL_INDUSTRIES.includes(id));

  return automatedIndustries.flatMap(branza => 
    testCities.map(miejscowosc => ({ branza, miejscowosc }))
  );
}

// DYNAMICZNE METADANE SEO
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { branza, miejscowosc } = await params;
  const config = categoriesConfigs.find(c => c.id === branza);
  const displayCity = CITY_MAP[miejscowosc] || miejscowosc;
  
  const intro = getDynamicText(config?.templates?.intros, displayCity);
  
  return {
    title: `${config?.name || branza.toUpperCase()} ${displayCity} | Ranking i Opinie | Mistrzowie Regionu`,
    description: intro || `Szukasz fachowca w branży ${branza} w miejscowości ${displayCity}? Sprawdź ranking firm działających w Twojej okolicy.`,
    alternates: { canonical: `https://mistrzowieregionu.pl/lokalne/${branza}/${miejscowosc}/` },
  };
}

// GŁÓWNY KOMPONENT STRONY
export default async function LocalPage({ params }: any) {
  const { branza, miejscowosc } = await params;

  // PRZEKIEROWANIE DLA BRANŻ VIP (Zabezpieczenie przed konfliktami)
  if (MANUAL_INDUSTRIES.includes(branza)) {
    redirect(`/${branza}`);
  }

  const config = categoriesConfigs.find(c => c.id === branza);
  const displayCity = CITY_MAP[miejscowosc] || miejscowosc;

  // Dynamiczne teksty SEO dla Hero
  const introText = getDynamicText(config?.templates?.intros, displayCity);
  const featureText = getDynamicText(config?.templates?.features, displayCity);

  let companies: any[] = [];
  try {
    const q = query(
      collection(db, 'zgloszenia_firm'), 
      where('industry', '==', branza), 
      where('is_verified', '==', true)
    );
    const snap = await getDocs(q);
    const rawData = snap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      created_at: (doc.data() as any).created_at?.toDate ? (doc.data() as any).created_at.toDate().toISOString() : null,
    }));

    // SORTOWANIE: Lokalni wykonawcy oraz Pakiety (Platinum > Gold > Silver)
    companies = rawData.sort((a: any, b: any) => {
      const isLocalA = a.city === displayCity ? 0 : 1;
      const isLocalB = b.city === displayCity ? 0 : 1;
      if (isLocalA !== isLocalB) return isLocalA - isLocalB;
      
      const tiers: any = { platinum: 1, gold: 2, silver: 3 };
      return (tiers[a.tier || a.package] || 4) - (tiers[b.tier || b.package] || 4);
    });
  } catch (error) { 
    console.error("Błąd pobierania firm:", error); 
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] font-montserrat italic text-slate-900">
      {/* SEKCJA HERO */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-32 px-6 text-center overflow-hidden flex items-center justify-center min-h-[500px]">
        {config?.bgImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={config.bgImage} 
              alt={`${config.name} ${displayCity}`} 
              className="w-full h-full object-cover opacity-40" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
          </div>
        )}
        <div className="max-w-5xl mx-auto relative z-10 w-full">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Eksperci w Twojej Okolicy • {displayCity}
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase leading-tight tracking-tighter">
            {config?.name || branza} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f1d592] to-[#d4af37]">
              {displayCity}
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            {introText} {featureText} W naszym zestawieniu znajdziesz obecnie {companies.length} zweryfikowanych firm.
          </p>
        </div>
      </section>

      {/* LISTA FIRM */}
      <section className="py-20 max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="space-y-12">
          {companies.map((company) => (
            <div key={company.id} className="relative">
              {company.city === displayCity && (
                <div className="absolute -top-4 left-6 bg-[#d4af37] text-[#0f172a] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter z-10 shadow-lg">
                  Lokalny Wykonawca
                </div>
              )}
              <CompanyCard company={company} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}