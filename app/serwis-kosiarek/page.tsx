"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import CompanyCard from '../../components/cards/CompanyCard';
import { FaWrench, FaCogs, FaCheckCircle } from 'react-icons/fa';

export default function SerwisKosiarekPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const q = query(collection(db, 'zgloszenia_firm'), where('industry', '==', 'serwis-kosiarek'));
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = fetched.sort((a: any, b: any) => {
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
      {/* 1. HERO SECTION - SEO FOCUS */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">Sezon Ogrodowy 2026 • Nieporęt</span>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.8] italic uppercase">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">KOSIAREK</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light italic">
            Najlepszy serwis urządzeń ogrodniczych w <span className="text-white font-medium">Gminie Nieporęt</span>. 
            Naprawa kosiarek, traktorków i pił spalinowych sprawdzona przez setki sąsiadów.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA SEO & CONTENT */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24">
        
        {/* ZASIĘG LOKALNY - KLUCZOWE DLA SEO */}
        <section className="px-6 pt-10">
          <div className="max-w-6xl mx-auto bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center mb-8">Obsługujemy miejscowości:</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {['Nieporęt', 'Białobrzegi', 'Rynia', 'Zegrze Południowe', 'Stanisławów Pierwszy', 'Stanisławów Drugi', 'Kąty Węgierskie', 'Józefów', 'Wola Aleksandra', 'Rembelszczyzna', 'Michałów-Grabina'].map(m => (
                <span key={m} className="bg-slate-50 text-slate-500 px-4 py-2 rounded-full text-[11px] font-bold border border-slate-200">{m}</span>
              ))}
            </div>
          </div>
        </section>

        {/* LISTA FIRM */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Ekspertów</h2>
            <div className="h-1.5 w-20 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase">Szukam najlepszych mechaników...</div>
            ) : (
              companies.map(company => <CompanyCard key={company.id} company={company} />)
            )}
          </div>
        </section>

        {/* SEKCJA SEO: PORADNIK EKSPERCKI */}
        <section className="py-24 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-12 tracking-tighter uppercase italic text-center">
              Jak przygotować kosiarkę do sezonu w Nieporęcie?
            </h2>
            <div className="grid gap-8">
              <div className="bg-slate-50 p-8 rounded-3xl border-l-8 border-[#d4af37]">
                <h3 className="text-xl font-black mb-3 uppercase">1. Serwis olejowy i filtracja</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Wymiana oleju po zimie to fundament. Stary olej traci swoje właściwości smarne, co w warunkach piaszczystych gleb gminy Nieporęt może prowadzić do szybkiego zatarcia silnika. Nasi Mistrzowie zalecają wymianę co najmniej raz w roku przed pierwszym koszeniem.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border-l-8 border-[#0f172a]">
                <h3 className="text-xl font-black mb-3 uppercase">2. Ostrzenie i wyważanie noża</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Tępy nóż szarpie trawę, zamiast ją ciąć, co powoduje jej żółknięcie. Profesjonalny serwis kosiarek w regionie Nieporętu zadba nie tylko o naostrzenie, ale i o wyważenie noża, co chroni wał silnika przed niebezpiecznymi wibracjami.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border-l-8 border-[#d4af37]">
                <h3 className="text-xl font-black mb-3 uppercase">3. Konserwacja układu paliwowego</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Paliwo pozostawione w gaźniku na zimę często tworzy osady, które blokują dysze. Jeśli Twoja kosiarka nie odpala, prawdopodobnie wymaga czyszczenia ultradźwiękowego gaźnika – usługi dostępnej u polecanych przez nas fachowców.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#0b1120] text-white pt-20 pb-10 px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </>
  );
}