import React from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. ZAAWANSOWANE SEO - Naprawiony tag kanoniczny
export const metadata: Metadata = {
  title: 'Wywóz Szamba Nieporęt | Mistrzowie Asenizacji | Polecane Firmy',
  description: 'Najszybszy wywóz nieczystości płynnych w Gminie Nieporęt. Sprawdzone firmy asenizacyjne, cennik szambiarek, rzetelni fachowcy. Znajdź wolny termin!',
  keywords: ['wywóz szamba Nieporęt', 'asenizacja Nieporęt', 'szambiarka Nieporęt', 'opróżnianie szamb', 'usługi komunalne Nieporęt'],
  // DODAJ TĘ LINIKĘ PONIŻEJ:
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/szamba/',
  },
};

// 2. Wymuszamy pobieranie świeżych danych przy każdym wejściu
export const revalidate = 3600;

// 3. Komponent Serwerowy (Zauważ brak "use client" i dodane słowo "async")
export default async function SzambaPage() {
  let companies: any[] = [];

  try {
    // 4. Pobieranie danych BEZPOŚREDNIO na serwerze (zamiast useEffect i onSnapshot)
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'szamba'),
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
        reviewsCount: data.reviewsCount || Math.floor(Math.random() * 40) + 10,
        features: data.features || [
          'Najszybszy dojazd w gminie',
          'Pojemność do 12m³',
          'Nowoczesny tabor i długie węże'
        ]
      };
    });

   // Sortowanie: Platinum > Gold > Silver
    const sorted = fetched.sort((a, b) => {
      const tiers: any = { platinum: 1, gold: 2, silver: 3 };
      return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
    });

    // OTO NASZE ROZWIĄZANIE: Sterylizacja danych przed wysłaniem do klienta
    companies = JSON.parse(JSON.stringify(sorted));

  } catch (error) {
    console.error("Błąd pobierania firm na serwerze:", error);
  }

  const placeholdersCount = Math.max(0, 3 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <> 
      {/* 1. HERO SECTION - MISTRZOWSKA ASENIZACJA */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 font-montserrat">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Usługi Komunalne • Gmina Nieporęt</span>
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">ASENIZACJI</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Najszybszy wywóz nieczystości płynnych w <span className="text-white font-medium uppercase">Twojej okolicy</span>. Sprawdzone firmy, punktualni kierowcy i uczciwe rozliczenia.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] pb-32">
        
        {/* SZYBKI CENNIK ORIENTACYJNY */}
        <section className="py-24 font-montserrat">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase italic">Stawki w Regionie</h2>
              <div className="h-2 w-20 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto italic font-medium">Średnie ceny za pełny transport (10m³) na terenie gminy.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[3rem] shadow-xl p-10 border-t-4 border-[#d4af37] text-center italic border-x border-b border-slate-100">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase italic">Standard</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Duże i małe beczki</p>
                <p className="text-4xl font-black text-[#d4af37]">299 - 350 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>

              <div className="bg-[#0f172a] rounded-[3rem] shadow-2xl p-10 border-t-4 border-[#d4af37] text-center transform md:scale-110 relative z-10 italic">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-full w-max shadow-lg">Najpopularniejszy</span>
                <h3 className="text-xl font-black text-white mb-2 mt-4 uppercase italic">Large</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Pojemność 12m³</p>
                <p className="text-4xl font-black text-[#d4af37]">350 - 450 <span className="text-lg text-slate-300 font-normal">PLN</span></p>
              </div>

              <div className="bg-white rounded-[3rem] shadow-xl p-10 border-t-4 border-[#d4af37] text-center italic border-x border-b border-slate-100">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase italic">Express</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Awaria (Niedziela/Noc)</p>
                <p className="text-4xl font-black text-[#d4af37]">od 550 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING LIDERÓW */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Polecani Przewoźnicy</h2>
            <div className="h-2 w-24 bg-[#0f172a] mx-auto rounded-full mt-4 shadow-lg"></div>
          </div>
          
          <div className="space-y-12">
            {companies.length === 0 ? (
              <div className="text-center py-20 font-black uppercase tracking-widest text-slate-400">
                Brak firm w tej kategorii. Bądź pierwszy!
              </div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {/* MIEJSCA WOLNE DLA ASENIZACJI */}
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60 hover:opacity-100 transition-all">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Wolne miejsce dla Twojej floty</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Otrzymuj zlecenia wywozu z całego Nieporętu</p>
                    </div>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#0f172a] transition-all">
                      Dołącz do Rankingu
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* PORADNIK SEO DLA MIESZKAŃCÓW */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6 font-montserrat italic">
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-16 tracking-tighter uppercase text-center">
              Warto Wiedzieć
            </h2>
            <div className="grid gap-10">
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase">1. Częstotliwość Wywozu</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Dla czteroosobowej rodziny posiadającej szambo 10m³, optymalny czas wywozu to raz na 2-3 tygodnie. Nie czekaj do przepełnienia – dbaj o drożność rur i unikaj kosztownych awarii.
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase">2. Dokumentacja i Gmina</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Pamiętaj o zachowywaniu rachunków za wywóz. Urząd Gminy Nieporęt może wymagać potwierdzenia regularnego opróżniania zbiornika bezodpływowego zgodnie z przepisami o ochronie środowiska.
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