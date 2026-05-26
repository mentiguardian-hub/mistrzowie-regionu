"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';

export default function ZlotaRaczkaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'zlota-raczka' (Sprawdź czy w bazie na pewno używasz tego sluga)
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'zlota-raczka'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
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
      console.error("Błąd ładowania Złotych Rączek:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-montserrat">
      
      {/* HERO SECTION - ZACHOWANY ORYGINAŁ */}
      <section className="bg-[#0f172a] text-white pt-40 pb-32 px-6 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 relative z-10">
          Złota <span className="text-[#d4af37]">Rączka</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 font-light italic">
          Brak czasu na drobne naprawy? Znajdź zweryfikowanego fachowca z sąsiedztwa, który naprawi to, co od dawna czeka w kolejce.
        </p>
        <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm shadow-2xl hover:bg-white transition-colors">
          Ranking Fachowców
        </a>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">
        
        {/* CENNIKI - ZACHOWANY ORYGINAŁ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border-t-4 border-[#d4af37] text-center">
            <h3 className="text-[#0f172a] font-black uppercase mb-2 italic">Drobna Naprawa</h3>
            <p className="text-3xl font-black text-[#d4af37]">od 80 <span className="text-sm text-slate-400 font-normal">PLN</span></p>
          </div>
          <div className="bg-[#0f172a] p-8 rounded-[2rem] shadow-2xl border-t-4 border-[#d4af37] text-center transform md:scale-110">
            <h3 className="text-white font-black uppercase mb-2 tracking-widest">Montaż Mebli</h3>
            <p className="text-3xl font-black text-[#d4af37]">od 150 <span className="text-sm text-slate-300 font-normal">PLN</span></p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border-t-4 border-[#d4af37] text-center">
            <h3 className="text-[#0f172a] font-black uppercase mb-2 italic">Awarie 24/7</h3>
            <p className="text-3xl font-black text-[#d4af37]">indywid. <span className="text-sm text-slate-400 font-normal">wycena</span></p>
          </div>
        </div>

        {/* RANKING FIRM Z NOWĄ WIZYTÓWKĄ */}
        <div id="ranking" className="grid grid-cols-1 gap-12 text-left mb-16">
            {loading ? (
              <p className="text-center py-20 animate-pulse text-slate-400 font-black uppercase tracking-widest">
                Szukam wolnych rąk do pracy...
              </p>
            ) : (
              <>
                {companies.length > 0 ? (
                  companies.map((company) => (
                    // Nasz nowy, pancerny komponent wizytówki z herbu
                    <CompanyCard key={company.id} company={company} />
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 font-medium italic">
                    Brak fachowców w tej kategorii. Bądź pierwszym liderem!
                  </div>
                )}
              </>
            )}
        </div>
      </section>

      {/* STOPKA - ZACHOWANY ORYGINAŁ */}
      <footer className="bg-[#0b1120] py-12 text-center border-t border-[#d4af37]/10">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl
        </p>
      </footer>
    </div>
  );
}