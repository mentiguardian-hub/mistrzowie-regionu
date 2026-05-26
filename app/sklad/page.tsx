"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';

export default function SkladPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Zapytanie do bazy: branża 'sklad' i tylko zweryfikowane firmy
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'sklad'),
      where('is_verified', '==', true)
    );

    // Nasłuchiwanie na żywo - każda zmiana w Firebase (np. dodanie tier: platinum)
    // od razu odświeży wizytówkę bez przeładowania strony
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Kluczowe dla CompanyCard: rozpoznanie pakietu
          tier: data.tier || data.package || 'silver', 
          rating: data.rating || 5.0,
          reviewsCount: data.reviewsCount || Math.floor(Math.random() * 25) + 10,
        };
      });

      // Sortowanie: Platinum na górę, potem Gold, potem Silver
      const sorted = fetched.sort((a, b) => {
        const priority: any = { platinum: 1, gold: 2, silver: 3 };
        return (priority[a.tier?.toLowerCase()] || 4) - (priority[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Błąd pobierania danych:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const placeholdersCount = Math.max(0, 3 - companies.length);
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
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">
            Twoje Centrum Zaopatrzenia 2026
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none font-montserrat uppercase">
            SKŁADY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">
              MATERIAŁÓW BUDOWLANYCH
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light text-balance">
            Najlepsze składy budowlane w regionie. <span className="text-white font-medium">Stal, ceramika, docieplenia</span> – wszystko w jednym miejscu z błyskawiczną dostawą.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
              Zobacz Ranking Składów
            </a>
            <a href="#poradnik" className="border border-slate-700 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/5 transition-colors">
              Logistyka i HDS
            </a>
          </div>
        </div>
      </section>

      {/* STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24 font-montserrat">

        {/* CECHY SKŁADÓW */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase italic">
                Gwarancja Dostępności
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto italic font-medium">
                Współpracujemy wyłącznie ze składami, które posiadają własne place składowe i flotę transportową.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Stan Surowy</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Pustaki, Stal, Cement</p>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">
                  Pełna oferta ścian <br/> i stropów
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-[2rem] shadow-2xl p-8 border-t-4 border-[#d4af37] text-center transform md:scale-105 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-max">
                  Sprawdzona Logistyka
                </span>
                <h3 className="text-xl font-black text-white mb-2 mt-4 uppercase">Systemy Dociepleń</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Styropian, Wełna, Tynki</p>
                <div className="text-xs text-slate-300 font-bold uppercase tracking-widest leading-loose">
                  Mieszalniki tynków <br/> dostępne na miejscu
                </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Wokół Domu</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Drenaż, Kostka, Ogrodzenia</p>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">
                  Wszystko do <br/> zagospodarowania terenu
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING FIRM */}
        <section id="ranking" className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
              LOKALNE SKŁADY BUDOWLANE - RANKING
            </h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
            
            <div className="grid grid-cols-1 gap-12 text-left">
              {loading ? (
                <div className="text-center text-slate-400 py-20 font-black uppercase tracking-[0.3em] animate-pulse italic">
                  Weryfikacja Liderów Handlu...
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
                          WOLNE MIEJSCE <br/> DLA TWOJEGO SKŁADU
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                          Pokaż swoją ofertę tysiącom lokalnych inwestorów planujących budowę.
                        </p>
                        <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg">
                          DOŁĄCZ DO KATALOGU
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* PORADNIK */}
        <section id="poradnik" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <div className="text-center mb-16">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Eksperckie Porady 2026</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
                Jak wybrać rzetelny skład budowlany?
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-8"></div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-md border-l-8 border-l-[#d4af37]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight italic">1. Flota HDS to podstawa</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Zwróć uwagę, czy skład dysponuje własnym transportem z dźwigiem HDS. Wynajmowanie zewnętrznej spedycji często podnosi koszty i utrudnia precyzyjne umówienie rozładunku na posesji.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-md border-l-8 border-l-[#0f172a]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight italic">2. Doradztwo techniczne</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Szukaj miejsc, gdzie pracują doradcy potrafiący dopasować np. system ociepleń do rodzaju muru i pomóc w wyliczeniu zapotrzebowania z projektu.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* STOPKA */}
      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-24 font-montserrat">
            <div>
              <div className="flex flex-col leading-none mb-8">
                <span className="text-3xl font-black tracking-tighter">MISTRZOWIE</span>
                <span className="text-[12px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">REGIONU</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Standardy nowoczesnego handlu i usług budowlanych w Gminie Nieporęt.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-8">Nawigacja</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                <li><Link href="/" className="hover:text-[#d4af37]">Strona Główna</Link></li>
                <li><Link href="/katalog" className="hover:text-[#d4af37]">Branże</Link></li>
                <li><Link href="mailto:kontakt@mistrzowieregionu.pl" className="hover:text-[#d4af37]">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-8">Lokalizacja</h4>
              <p className="text-slate-300 font-bold mb-2 uppercase text-xs">Gmina Nieporęt</p>
              <p className="text-slate-500 text-[10px] font-bold">Składy Budowlane 2026</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-2">
              © 2026 MISTRZOWIE REGIONU. WSZELKIE PRAWA ZASTRZEŻONE.
            </span>
            <span className="text-[9px] font-medium text-white/10 uppercase tracking-widest">
              projektant tel. 601 728 604
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}