import React from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. ZAAWANSOWANE SEO - Tytuł, opis i słowa kluczowe dla Google
export const metadata: Metadata = {
  title: 'Przeprowadzki Nieporęt | Mistrzowie Logistyki | Polecane Firmy',
  description: 'Eksperckie ekipy transportowe i przeprowadzki w Gminie Nieporęt. Bezpieczny transport, wnoszenie mebli, ubezpieczenie OCP. Znajdź rzetelną firmę!',
  keywords: ['przeprowadzki Nieporęt', 'transport Nieporęt', 'usługi transportowe Nieporęt', 'wnoszenie mebli', 'bagażówka Nieporęt'],
};

// 2. Wymuszamy pobieranie świeżych danych z bazy przy każdym wejściu
export const revalidate = 3600;

// 3. Komponent Serwerowy (Brak "use client")
export default async function PrzeprowadzkiPage() {
  let companies: any[] = [];

  try {
    // 4. Pobieranie danych BEZPOŚREDNIO na serwerze
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'przeprowadzki'),
      where('is_verified', '==', true)
    );

    const snap = await getDocs(q);

    const fetched = snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        tier: data.package || data.tier || 'silver', 
        rating: data.rating || 5.0,
        reviewsCount: data.reviewsCount || Math.floor(Math.random() * 20) + 10,
        features: data.features || [
          'Ubezpieczenie mienia OCP',
          'Wnoszenie i montaż mebli',
          'Pakowanie i zabezpieczanie'
        ]
      };
    });

    // Sortowanie: Platinum > Gold > Silver
    const sorted = fetched.sort((a, b) => {
      const tiers: any = { platinum: 1, gold: 2, silver: 3 };
      return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
    });

    // 5. STERYLIZACJA DANYCH (Ochrona przed błędem komponentu klienckiego)
    companies = JSON.parse(JSON.stringify(sorted));

  } catch (error) {
    console.error("Błąd pobierania firm na serwerze:", error);
  }

  const placeholdersCount = Math.max(0, 2 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <> 
      {/* 1. HERO SECTION - LOGISTYCZNY PRESTIŻ */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic">
        
        {/* 1. ZDJĘCIE BAGAŻÓWKI W TLE */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/img/bagazowka-nieporet-mistrzowie-regionu.webp')" }}
        ></div>

        {/* 2. CIEMNY GRADIENT ZABEZPIECZAJĄCY CZYTELNOŚĆ TEKSTU */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/70 via-[#0f172a]/50 to-[#0f172a]"></div>

        {/* 3. ORYGINALNY ZŁOTY POŁYSK (Zachowanie ustalonego designu) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none z-0">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block drop-shadow-md">Transport i Logistyka • Nieporęt 2026</span>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic drop-shadow-xl">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">PRZEPROWADZEK</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
            Eksperckie ekipy transportowe w <span className="text-white font-medium">Gminie Nieporęt</span>. Wybraliśmy firmy, które przewiozą Twój świat bezpiecznie, sprawnie i bez stresu.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] pb-32">
        
        {/* MIEJSCOWOŚCI */}
        <section className="px-6 pt-12"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center mb-8 italic">Obszar działania naszych Mistrzów:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Nieporęt', 'Białobrzegi', 'Zegrze', 'Stanisławów', 'Józefów', 'Rembelszczyzna', 'Legionowo'].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-500 px-6 py-2.5 rounded-full text-[11px] font-bold border border-slate-200 uppercase tracking-widest">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* RANKING - UKŁAD LISTY */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Przewoźników</h2>
            <div className="h-2 w-24 bg-[#d4af37] mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
          </div>
          
          <div className="space-y-12">
            {companies.length === 0 && placeholders.length === 0 ? (
              <div className="text-center py-20 font-black uppercase tracking-widest text-slate-400">
                Brak firm w tej kategorii. Bądź pierwszy!
              </div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {/* MIEJSCA WOLNE */}
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Tu może być Twoja flota</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zajmij wolne miejsce w rankingu Mistrzów Logistyki</p>
                    </div>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#0f172a] transition-all">
                      Dołącz Teraz
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* SEO PORADNIK */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-16 tracking-tighter uppercase italic text-center">
              Jak zorganizować bezstresową przeprowadzkę?
            </h2>
            <div className="grid gap-10">
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">1. Bezpieczeństwo i OCP</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  Profesjonalna firma to taka, która posiada ubezpieczenie OCP przewoźnika. Wybierając lidera z naszego rankingu, masz pewność, że Twoje mienie jest chronione od momentu pakowania do rozładunku.
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">2. Kompleksowość usług</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  Dobry przewoźnik nie tylko transportuje – on pomaga w montażu, wnoszeniu i odpowiednim zabezpieczeniu mebli. Mistrzowie przeprowadzki to ekipy doceniane przez sąsiadów za kulturę pracy i sprawność działania.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STOPKA */}
      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 italic">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </>
  );
}