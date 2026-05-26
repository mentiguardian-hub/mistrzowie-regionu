"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; // NOWY SYSTEM WIZYTÓWEK
import Link from 'next/link';

export default function BetonPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SZUKAMY BRANŻY: 'beton'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'beton'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Automatyczne przypisanie tieru dla spójności
          tier: data.package || data.tier || 'silver', 
          rating: data.rating || 5.0,
          reviewsCount: data.reviewsCount || Math.floor(Math.random() * 15) + 5,
          features: data.features || [
            'Beton certyfikowany (B20, B25)',
            'Własne pompy (zasięg do 28m)',
            'Dostawy HDS i gruszki'
          ]
        };
      });

      // Sortowanie: Platinum > Gold > Silver
      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const placeholdersCount = Math.max(0, 2 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <> 
      {/* 1. HERO SECTION - BUDOWLANY PRESTIŻ */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 font-montserrat">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Fundament Twojej Budowy • 2026</span>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic">
            WYTWÓRNIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">BETONU</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Najlepsze lokalne betoniarnie serwujące <span className="text-white font-medium uppercase">atestowany beton</span>. Gwarancja klasy, wytrzymałości i szybkiej pompy na terenie Gminy Nieporęt.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] pb-32">
        
        {/* CENNIK ORIENTACYJNY */}
        <section className="py-24 font-montserrat">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase italic">Średnie Stawki za m³</h2>
              <div className="h-2 w-20 bg-[#d4af37] mx-auto rounded-full mb-6 shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[3rem] shadow-xl p-10 border-t-4 border-[#d4af37] text-center italic">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">B20 (C16/20)</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Beton konstrukcyjny</p>
                <p className="text-4xl font-black text-[#d4af37]">360 - 400 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>

              <div className="bg-[#0f172a] rounded-[3rem] shadow-2xl p-10 border-t-4 border-[#d4af37] text-center transform md:scale-110 relative z-10 italic">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-full w-max shadow-lg">Najczęściej Wybierany</span>
                <h3 className="text-xl font-black text-white mb-2 mt-4 uppercase">B25 (C20/25)</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Ławy i stropy</p>
                <p className="text-4xl font-black text-[#d4af37]">380 - 440 <span className="text-lg text-slate-300 font-normal">PLN</span></p>
              </div>

              <div className="bg-white rounded-[3rem] shadow-xl p-10 border-t-4 border-[#d4af37] text-center italic">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Posadzkowy</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Z włóknem</p>
                <p className="text-4xl font-black text-[#d4af37]">od 420 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING - LISTA POZIOMYCH WIZYTÓWEK */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Wytwórni</h2>
            <div className="h-2 w-24 bg-[#0f172a] mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="space-y-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase tracking-[0.3em]">Szukamy certyfikowanego betonu...</div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {/* MIEJSCA WOLNE */}
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60 hover:opacity-100 transition-all border-double">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Wolne miejsce dla Wytwórni</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zarejestruj swój węzeł i otrzymuj zapytania</p>
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

        {/* EKSPERCKI PORADNIK SEO */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6 font-montserrat italic">
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-16 tracking-tighter uppercase text-center">
              Wiedza Techniczna
            </h2>
            <div className="grid gap-10">
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase">1. Certyfikacja i WZ</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Pamiętaj, że beton na ławy (B25/C20/25) to fundament bezpieczeństwa Twojego domu. Nigdy nie zamawiaj betonu "na słowo" – każda dostawa musi mieć dokument WZ.
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase">2. Czas Dostawy</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Od produkcji do rozładunku nie powinno minąć więcej niż 90 minut. Wybierając lokalną wytwórnię z Nieporętu, minimalizujesz ryzyko przedwczesnego wiązania betonu.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STOPKA PROJEKTANTA */}
      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 text-center border-t border-[#d4af37]/10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 italic">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </>
  );
}