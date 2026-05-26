"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';

export default function DekarzPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'dekarz'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        tier: doc.data().package || doc.data().tier || 'silver',
        rating: doc.data().rating || 5.0,
        reviewsCount: doc.data().reviewsCount || Math.floor(Math.random() * 20) + 10,
      }));

      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <> 
      {/* 1. HERO SECTION - METODA STOMATOLOGII */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic">
        
        {/* TŁO FOTO - Ładowane bezpośrednio, bez CSS */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img 
            src="/img/Dekarz-mistrzowieregionu.webp" 
            alt="Dekarze - Mistrzowie Regionu 2026"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Dachy i Konstrukcje • Nieporęt 2026</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic text-white">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">DEKARSTWA</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Najlepsi specjaliści od dachów w <span className="text-white font-medium">Gminie Nieporęt</span>. Od drobnych napraw po kompleksowe krycie dachów.
          </p>
        </div>
      </section>

      {/* 2. RANKING (IDENTYCZNIE JAK W STOMATOLOGII) */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] pb-32">
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Ekspertów</h2>
            <div className="h-2 w-24 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="space-y-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase tracking-widest">Weryfikujemy listę dekarzy...</div>
            ) : (
              companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))
            )}
            
            {/* PRZYCISK DOŁĄCZANIA DLA WOLNYCH MIEJSC */}
            {companies.length < 3 && (
                <div className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                        <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Miejsce dla Twojej firmy</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zajmij wolne miejsce w rankingu dekarzy</p>
                    </div>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#0f172a] transition-all">
                        Dołącz Teraz
                    </Link>
                </div>
            )}
          </div>
        </section>
      </div>

      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 italic">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </>
  );
}