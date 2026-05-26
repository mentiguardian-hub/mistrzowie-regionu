"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';

export default function KlimatyzacjaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SZUKAMY BRANŻY: 'klimatyzacja'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'klimatyzacja'),
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
          reviewsCount: data.reviewsCount || Math.floor(Math.random() * 15) + 8,
          features: data.features || [
            'Montaż jednostek Split i Multi-Split',
            'Coroczny serwis i odgrzybianie',
            'Dobór urządzeń energooszczędnych'
          ]
        };
      });

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
      {/* 1. HERO SECTION - ODCHUDZONY NAGŁÓWEK */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden italic font-montserrat">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Komfort Termiczny • Lato 2026</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.85] uppercase italic pr-8">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">KLIMATYZACJI</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Przygotuj swój dom na upały. Wyselekcjonowaliśmy najlepszych instalatorów w <span className="text-white font-medium">Gminie Nieporęt</span>, gwarantujących chłód i czyste powietrze.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.4)] pb-32">
        
        {/* SEKCJA ZDJĘCIA PLATINUM */}
        <section className="px-6 py-16 -mt-16 relative z-30">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[4rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-4 border-[#d4af37] flex flex-col md:flex-row items-center gap-12">
              
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-white shadow-[0_10px_30px_rgba(212,175,55,0.4)] bg-slate-100">
                <Image 
                  src="/img/klimatyzacja-nieporet-montaz-serwis.webp" 
                  alt="Profesjonalny montaż klimatyzacji w Gminie Nieporęt – Mistrzowie Regionu" 
                  width={1200}
                  height={900}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 text-left space-y-6">
                <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] block">Technologia i Komfort</span>
                <h3 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter uppercase italic leading-[0.9]">
                  Czyste <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">POWIETRZE</span>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed italic font-light">
                  Nowoczesna klimatyzacja to nie tylko chłodzenie, ale też wydajne ogrzewanie i zaawansowana filtracja powietrza. Nasi partnerzy Platinum dobierają systemy idealnie dopasowane do metrażu i ekspozycji Twojego domu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Firm Klimatyzacyjnych</h2>
            <div className="h-2 w-24 bg-[#d4af37] mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
          </div>
          
          <div className="space-y-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase tracking-widest">Szukamy wolnych terminów montażu...</div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Miejsce dla Twojej Firmy</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zostań liderem klimatyzacji w regionie</p>
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
              Klimatyzacja w domu: Co musisz wiedzieć?
            </h2>
            <div className="grid gap-10">
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">1. Split czy Multi-Split?</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  System Split to jedna jednostka wewnętrzna i jedna zewnętrzna – idealna do salonu. Jeśli chcesz chłodzić kilka sypialni, Multi-Split pozwoli podłączyć wiele jednostek do jednego agregatu, oszczędzając miejsce na elewacji.
                </p>
              </div>
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase italic">2. Regularny Serwis to Zdrowie</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  Zaniedbana klimatyzacja to siedlisko grzybów i bakterii. Eksperci z naszego rankingu oferują kompleksowe przeglądy, czyszczenie parownika i odgrzybianie metodą ozonowania, dbając o bezpieczeństwo Twoich bliskich.
                </p>
              </div>
            </div>
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