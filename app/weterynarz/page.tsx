"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';

export default function WeterynarzPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'weterynarz'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'weterynarz'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (sn) => {
      const fetched = sn.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Automatyczne ustawienie pakietu
          tier: data.tier || data.package || 'silver',
          rating: data.rating || 5.0,
        };
      });
      
      // Sortowanie: Platinum na górze
      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Błąd ładowania gabinetów:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-montserrat">
      {/* HERO SECTION - ZACHOWANY ORYGINAŁ */}
      <section className="bg-[#0f172a] text-white pt-40 pb-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_70%)]"></div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 relative z-10">
          Zaufany <span className="text-[#d4af37]">Weterynarz</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 relative z-10 font-light italic">
          Najlepsza opieka dla Twojego pupila. Sprawdzone gabinety weterynaryjne z nowoczesnym sprzętem diagnostycznym.
        </p>
        <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm inline-block shadow-2xl hover:bg-white transition-colors">
          Zobacz Ranking Gabinetów
        </a>
      </section>

      {/* CENNIK / USŁUGI - ZACHOWANY ORYGINAŁ */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-4 border-[#d4af37] text-center">
            <h3 className="text-[#0f172a] font-black uppercase mb-4">Wizyta Kontrolna</h3>
            <p className="text-3xl font-black text-[#d4af37]">od 80 <span className="text-sm text-slate-400 font-normal italic">PLN</span></p>
            <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-widest">Podstawowa diagnostyka</p>
          </div>
          <div className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl border-t-4 border-[#d4af37] text-center transform md:scale-110">
            <h3 className="text-white font-black uppercase mb-4 tracking-widest">Szczepienia</h3>
            <p className="text-3xl font-black text-[#d4af37]">od 60 <span className="text-sm text-slate-300 font-normal italic">PLN</span></p>
            <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Psy i koty</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-4 border-[#d4af37] text-center">
            <h3 className="text-[#0f172a] font-black uppercase mb-4">Wizyty Domowe</h3>
            <p className="text-3xl font-black text-[#d4af37]">indywid. <span className="text-sm text-slate-400 font-normal italic">wycena</span></p>
            <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-widest">Dojazd do pacjenta</p>
          </div>
        </div>

        {/* RANKING FIRM Z NOWĄ WIZYTÓWKĄ */}
        <div id="ranking" className="grid grid-cols-1 gap-12 text-left mb-16">
          {loading ? (
            <p className="text-center py-20 animate-pulse text-slate-400 font-black uppercase tracking-widest">
              Szykujemy gabinety do pracy...
            </p>
          ) : (
            <>
              {companies.length > 0 ? (
                companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))
              ) : (
                <div className="bg-slate-50/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center min-h-[300px] hover:border-[#d4af37]/50 hover:bg-white transition-all duration-300 group mt-8">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#d4af37] text-4xl mb-6 shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                    +
                  </div>
                  <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest leading-tight italic">
                    Twój Gabinet Weterynaryjny
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 max-w-md">
                    Bądź pierwszym polecanym gabinetem w regionie i zyskaj zaufanie właścicieli czworonogów.
                  </p>
                  <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-[#0f172a] transition-colors shadow-lg">
                    ZGŁOŚ GABINET
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* STOPKA Z PROJEKTANTEM */}
      <footer className="bg-[#0b1120] py-12 text-center border-t border-[#d4af37]/10">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl
        </p>
      </footer>
    </div>
  );
}