"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; 
import Link from 'next/link';

export default function WykonczeniaWnetrzPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'wykonczenia' (Upewnij się, że tak samo masz w bazie Firebase!)
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'wykonczenia'),
      where('is_verified', '==', true)
    );

    // Nasłuchiwanie na żywo (onSnapshot) - naprawia błąd await i odświeża dane natychmiast
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Przekazujemy pakiet do tier, aby karta Platinum wiedziała jak się wyświetlić
          tier: data.tier || data.package || 'silver', 
          rating: data.rating || 5.0,
        };
      });
      
      // Sortowanie: Platinum na samą górę rankingu
      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Błąd pobierania firm:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const placeholdersCount = Math.max(0, 4 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <> 
      {/* HERO SECTION */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block animate-fade-in">
            Gmina Nieporęt 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none font-montserrat">
            REMONTY I WYKOŃCZENIA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37] uppercase italic">
              PRECYZJA WE WNĘTRZACH
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Zasługujesz na idealne ściany i płytki z fugami pod laser. Uwolnij się od nerwów współpracując z 
            liderami wykończeniówki w naszej okolicy. <span className="text-white font-medium italic">Sprawdzone brygady z certyfikatami jakości.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
              Przeglądaj Ekipy
            </a>
            <a href="#cennik" className="border border-slate-700 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/5 transition-colors">
              Stawki Za Metr
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24 font-montserrat">

        {/* MIEJSCOWOŚCI */}
        <section id="miejscowosci" className="px-6 relative z-10 pt-10"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent to-slate-200 flex-grow"></div>
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">
                Autoryzowane firmy remontują w
              </h2>
              <div className="h-px bg-gradient-to-l from-transparent to-slate-200 flex-grow"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-widest">
              {['Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 'Stanisławów', 'Wola Aleksandra'].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full border border-slate-100 italic">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* RANKING FIRM */}
        <section id="ranking" className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
              WYSELEKCJONOWANE EKIPY WYKOŃCZENIOWE
            </h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
            
            <div className="grid grid-cols-1 gap-12 text-left">
              {loading ? (
                <div className="text-center text-slate-400 py-20 font-black uppercase tracking-[0.3em] animate-pulse italic">
                  Weryfikacja Fachowców...
                </div>
              ) : (
                <>
                  {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {placeholders.map((spot) => (
                      <div key={`placeholder-${spot}`} className="bg-slate-50/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center h-full min-h-[350px] hover:border-[#d4af37]/50 hover:bg-white transition-all duration-300 group">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#d4af37] text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          +
                        </div>
                        <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest leading-tight">
                          WOLNE MIEJSCE <br/> DLA ZŁOTEJ EKIPY
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                          Jesteś fachowcem? Pokaż swoje realizacje lokalnym inwestorom.
                        </p>
                        <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg">
                          PODEJMIJ ROZMOWY
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

      </div>

      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto text-center font-montserrat">
          <div className="border-t border-white/5 pt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
            © 2026 MISTRZOWIE REGIONU. PROJEKTANT TEL. 601 728 604
          </div>
        </div>
      </footer>
    </>
  );
}