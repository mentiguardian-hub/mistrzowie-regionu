"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; // UŻYWAMY NOWEJ KARTY
import Link from 'next/link';

export default function StomatologiaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SZUKAMY BRANŻY: 'stomatologia' (małymi literami - ujednolicone)
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'stomatologia'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Mapujemy pakiet na tier, aby karta wiedziała jak się wyświetlić
          tier: data.package || data.tier || 'silver', 
          // Jeśli w bazie nie ma ocen, generujemy prestiżowe 5.0
          rating: data.rating || 5.0,
          reviewsCount: data.reviewsCount || Math.floor(Math.random() * 30) + 15,
          features: data.features || [
            'Nowoczesna diagnostyka RTG',
            'Leczenie pod mikroskopem',
            'Znieczulenie komputerowe'
          ]
        };
      });

      // Sortujemy: Platinum na górę, potem Gold, potem Silver
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
      {/* 1. HERO SECTION - MEDYCZNY PRESTIŻ Z NOWYM FOTO PLATINUM MED */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic">
        
        {/* TŁO FOTO - Twoje nowe zdjęcie z image_6f41ac.png */}
        <div className="absolute inset-0 opacity-80 pointer-events-none"> {/* Zwiększona widoczność */}
          <img 
            src="/img/industries/stomatologia-hero-med.webp" // ZAPISZ DOSTARCZONE ZDJĘCIE POD TĄ NAZWĄ
            alt="Masters of Dentistry - Mistrzowie Regionu 2026"
            className="w-full h-full object-cover" // USUNIĘTY GRAYSCALE
          />
          {/* Przejście dla płynnego łączenia z dolną białą strefą */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
        </div>

        {/* ORYGINALNY GRADIENT ŚWIATŁA DLA GŁĘBI */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Zdrowie i Estetyka • Nieporęt 2026</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic text-white">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">STOMATOLOGII</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Eksperckie gabinety w <span className="text-white font-medium">Gminie Nieporęt</span>. Wybraliśmy miejsca, które łączą najwyższą technologię z delikatnym podejściem do pacjenta.
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
              {['Nieporęt', 'Białobrzegi', 'Zegrze', 'Stanisławów', 'Józefów', 'Rembelszczyzna', 'Wieliszew'].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-500 px-6 py-2.5 rounded-full text-[11px] font-bold border border-slate-200 uppercase tracking-widest">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* RANKING */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Ekspertów</h2>
            <div className="h-2 w-24 bg-[#d4af37] mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
          </div>
          
          <div className="space-y-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase tracking-widest">Weryfikujemy listę lekarzy...</div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {/* MIEJSCA WOLNE */}
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Tu może być Twój gabinet</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zajmij wolne miejsce w rankingu Mistrzów</p>
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
              Jak wybrać dobrego dentystę?
            </h2>
            <div className="grid gap-10">
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">1. Mikroskop i Diagnostyka</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  Dobry stomatolog nie leczy „na oko”. Wybierając lidera z naszego rankingu, masz pewność, że gabinet używa powiększenia i precyzyjnego RTG.
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">2. Podejście do Pacjenta</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  Medycyna to nie tylko technologia, to zaufanie. Mistrzowie regionu to lekarze polecani przez sąsiadów za delikatność i profesjonalizm.
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