"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';

export default function OgrodyPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'ogrody'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'ogrody'),
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

      // Bezpieczne ustawienie (filtrowanie undefined na wypadek pustych dokumentów)
      setCompanies(sorted.filter(c => c !== undefined));
      setLoading(false);
    }, (error) => {
      console.error("Błąd ładowania firm ogrodniczych:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <> 
      {/* HERO SECTION Z PIĘKNYM ZDJĘCIEM W TLE */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden">
        
        {/* TŁO ZDJĘCIOWE Z OVERLAYEM */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/img/Mistrzowie-regionu-ogrody.webp" 
            alt="Ekskluzywny ogród z równym trawnikiem" 
            className="w-full h-full object-cover opacity-40" 
          />
          {/* Ciemny gradient maskujący - zapewnia idealną czytelność złotego tekstu */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#0f172a]/50 to-[#0f172a]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 font-montserrat">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block animate-fade-in drop-shadow-md">
            Gmina Nieporęt 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none drop-shadow-2xl">
            RANKING ZAUFANYCH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f1d592] to-[#b8860b] uppercase italic">
              LIDERÓW OGRODNICTWA
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Od soczystego trawnika po luksusowe nasadzenia. 
            Wybraliśmy sprawdzonych ogrodników, którzy przygotują Twój ogród na sezon – <span className="text-white font-bold">profesjonalnie i terminowo.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl hover:bg-white transition-colors">
              Zobacz ranking
            </a>
            <Link href="/dolacz" className="border border-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/10 transition-colors shadow-lg">
              Dodaj swoją firmę
            </Link>
          </div>
        </div>
      </section>

      {/* BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24">

        {/* CENNIK USŁUG OGRODOWYCH */}
        <section id="cennik" className="py-24 font-montserrat">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase">
                ŚREDNIE STAWKI - OGRODY 2026
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto italic font-medium">
                "Ceny orientacyjne dla regionu Nieporęt. Dokładna wycena zależy od ukształtowania terenu i stopnia zachwaszczenia."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Koszenie trawy</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Z wywozem pokosu</p>
                <p className="text-4xl font-black text-[#d4af37]">od 1.80 <span className="text-lg text-slate-400 font-normal">PLN / m2</span></p>
              </div>

              <div className="bg-[#0f172a] rounded-[2rem] shadow-2xl p-8 border-t-4 border-[#d4af37] text-center transform md:scale-105 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-max">
                  Najczęściej wybierane
                </span>
                <h3 className="text-xl font-black text-white mb-2 mt-4 uppercase">Wertykulacja</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Odszybianie + Nawożenie</p>
                <p className="text-4xl font-black text-[#d4af37]">od 4.50 <span className="text-lg text-slate-300 font-normal">PLN / m2</span></p>
              </div>

              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Wycinka / Przycinanie</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Drzewa i krzewy ozdobne</p>
                <p className="text-4xl font-black text-[#d4af37]">indywid. <span className="text-lg text-slate-400 font-normal">wycena</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING FIRM OGRODNICZYCH */}
        <section id="ranking" className="py-24 bg-white font-montserrat border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
              POLECANI EKSPERCI OGRODNICTWA
            </h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
            
            <div className="grid grid-cols-1 gap-12 text-left">
              {loading ? (
                <div className="text-center py-20 font-black uppercase tracking-widest animate-pulse text-slate-400 italic">
                  Przygotowuję listę zielonych liderów...
                </div>
              ) : (
                <>
                  {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                  
                  {companies.length < 3 && (
                    <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center min-h-[300px] hover:border-[#d4af37]/50 hover:bg-white transition-all group mt-8">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#d4af37] text-4xl mb-6 shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                        +
                      </div>
                      <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest italic">
                        MIEJSCE DLA TWOJEJ FIRMY
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mb-8 max-w-md">
                        Zostań liderem ogrodnictwa w Gminie Nieporęt. Dołącz do najlepszych ekip i pozyskuj zlecenia z regionu.
                      </p>
                      <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-[#0f172a] transition-colors shadow-lg">
                        DOŁĄCZ DO EKSPERTÓW
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* MODUŁ SEO: PORADNIK OGRODNICZY */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <div className="text-center mb-16">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Wiosenne Porady 2026</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase leading-tight">
                Kiedy najlepiej zacząć wertykulację w Nieporęcie?
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-8"></div>
            </div>

            <div className="space-y-8 italic text-slate-600 font-medium leading-relaxed">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-md border-l-8 border-l-[#d4af37]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight not-italic">1. Pierwsze słońce, pierwsze cięcie</h3>
                <p>
                  Regenerację trawnika najlepiej rozpocząć na przełomie marca i kwietnia, gdy ziemia nie jest już zamarznięta, ale wegetacja jeszcze w pełni nie ruszyła. Wertykulacja pozwala usunąć filc, który blokuje dostęp tlenu do korzeni. To absolutny fundament soczyście zielonego dywanu przed Twoim domem.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-md border-l-8 border-l-[#0f172a]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight not-italic">2. Nawadnianie to nie wszystko</h3>
                <p>
                  Samo lanie wody nie wystarczy, jeśli gleba jest zbyt zbita. Pamiętaj o aeracji (napowietrzaniu) rurek korzeniowych. Profesjonalne firmy ogrodnicze w naszej gminie dysponują sprzętem, który robi to szybciej i dokładniej niż domowe narzędzia. Prawidłowy drenaż zapobiega powstawaniu mchu w zacienionych miejscach Twojej posesji.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/10 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">MISTRZOWIE REGIONU 2026</p>
          <p className="text-[8px] font-bold text-white/10 uppercase mt-4 tracking-widest italic">
            projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
          </p>
        </div>
      </footer>
    </>
  );
}