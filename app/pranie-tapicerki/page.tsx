"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';

export default function PranieTapicerkiPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SZUKAMY BRANŻY: 'pranie-tapicerki'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'pranie-tapicerki'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          tier: data.package || data.tier || 'silver', 
          rating: data.rating || 5.0,
          reviewsCount: data.reviewsCount || Math.floor(Math.random() * 20) + 10,
          features: data.features || [
            'Metoda ekstrakcyjna (dogłębna)',
            'Usuwanie uporczywych plam',
            'Neutralizacja zapachów'
          ]
        };
      });

      // Sortowanie: Platinum -> Gold -> Silver
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
      {/* 1. HERO SECTION - CZYSTOŚĆ I REGENERACJA */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic font-montserrat">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Dom i Auto • Higiena 2026</span>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">TAPICERKI</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Perfekcyjna czystość w <span className="text-white font-medium">Gminie Nieporęt</span>. Wybraliśmy ekspertów od prania mebli i wnętrz aut, którzy przywracają blask każdemu włóknu.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] pb-32">
        
        {/* MIEJSCOWOŚCI */}
        <section className="px-6 pt-12"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center mb-8 italic">Mobilny dojazd na terenie:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Nieporęt', 'Białobrzegi', 'Zegrze', 'Rynia', 'Józefów', 'Wólka Radzymińska', 'Stanisławów'].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-500 px-6 py-2.5 rounded-full text-[11px] font-bold border border-slate-200 uppercase tracking-widest">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* RANKING */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Ekspertów Higieny</h2>
            <div className="h-2 w-24 bg-[#d4af37] mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
          </div>
          
          <div className="space-y-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase tracking-widest">Weryfikujemy listę fachowców...</div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {/* MIEJSCA WOLNE */}
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Tu może być Twoja firma</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zajmij wolne miejsce w rankingu Mistrzów Tapicerki</p>
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

        {/* SEO PORADNIK - NOWE TREŚCI DLA BRANŻY */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-16 tracking-tighter uppercase italic text-center">
              Sekrety Czystej Tapicerki
            </h2>
            <div className="grid gap-10">
              
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">1. Ekstrakcja vs Domowe Sposoby</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  Marketowe pianki często tylko "wciskają" brud głębiej w strukturę materiału. Mistrzowie z naszego rankingu stosują metodę ekstrakcyjną: pod ciśnieniem wprowadzają roztwór czyszczący, który natychmiast zostaje odessany wraz z brudem, roztoczami i bakteriami. To jedyny sposób na prawdziwą higienę wnętrza.
                </p>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">2. Bezpieczna Chemia i Alergicy</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  W Nieporęcie dbamy o to, co najważniejsze – zdrowie Twojej rodziny. Firmy w naszym rankingu używają certyfikowanych, biodegradowalnych środków, które są całkowicie bezpieczne dla dzieci oraz zwierząt domowych. Po profesjonalnym praniu tapicerka jest nie tylko czysta, ale wolna od drażniących oparów.
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