"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; 
import Link from 'next/link';

export default function ElektrykaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'elektryka'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'elektryka'),
      where('is_verified', '==', true)
    );

    // Mechanizm onSnapshot - dane na żywo, bez błędów await
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Przekazujemy pakiet do wizytówki Platinum
          tier: data.tier || data.package || 'silver',
          rating: data.rating || 5.0,
        };
      });
      
      // Sortowanie rankingu
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
      {/* HERO SECTION - ZACHOWANY ORYGINAŁ */}
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
            CERTYFIKOWANI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37] uppercase">
              ELEKTRYCY 24/7
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Prąd nie wybacza błędów amatorom. Znajdź instalatorów z ważnymi uprawnieniami SEP z Twojej okolicy, którzy stworzą bezawaryjną i bezpieczną sieć w Twoim domu. <span className="text-white font-medium text-balance">Brak ryzyka przy wpisach do kart gwarancyjnych.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
              Sprawdź Elektryków
            </a>
            <a href="#cennik" className="border border-slate-700 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/5 transition-colors">
              Analizuj Cennik
            </a>
          </div>
        </div>
      </section>

      {/* BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24">

        {/* MIEJSCOWOŚCI - ZACHOWANY ORYGINAŁ */}
        <section id="miejscowosci" className="px-6 relative z-10 pt-10"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent to-slate-200 flex-grow"></div>
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">
                Elektrycy docierają do
              </h2>
              <div className="h-px bg-gradient-to-l from-transparent to-slate-200 flex-grow"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 
                'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 
                'Stanisławów', 'Wola Aleksandra', 'Wola Kiełpińska'
              ].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CENNIK - ZACHOWANY ORYGINAŁ */}
        <section id="cennik" className="py-24 font-montserrat">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase">
                ŚREDNIE STAWKI ZA USŁUGI ELEKTRYCZNE
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto italic font-medium">
                "Realny kosztorys prac. Przewody ukrywamy dyskretnie w bruzdach lub wykonujemy prace natynkowe w industrialnym stylu instalacji."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Punkty Instalacyjne</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Puszki, gniazdka, ułożenie przewodu</p>
                <p className="text-4xl font-black text-[#d4af37]">~ 120 <span className="text-lg text-slate-400 font-normal">PLN /szt</span></p>
              </div>

              <div className="bg-[#0f172a] rounded-[2rem] shadow-2xl p-8 border-t-4 border-[#d4af37] text-center transform md:scale-105 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-max">
                  CZĘSTO WYBIERANE
                </span>
                <h3 className="text-xl font-black text-white mb-2 mt-4 uppercase">Płyta Indukcyjna</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Podłączenie z podbiciem Gwarancji</p>
                <p className="text-4xl font-black text-[#d4af37]">~ 200 <span className="text-lg text-slate-300 font-normal">PLN</span></p>
              </div>

              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase">Pomiary i Odbiory</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Protokół dla PINB na nowy Dom</p>
                <p className="text-4xl font-black text-[#d4af37]">~ 1,200 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING - ZMODYFIKOWANY O NOWĄ KARTĘ PLATINUM */}
        <section id="ranking" className="py-24 bg-white font-montserrat border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
              RANKING ELEKTRYKÓW
            </h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
            
            <div className="grid md:grid-cols-1 gap-12 text-left">
              {loading ? (
                <div className="text-center text-slate-400 py-20 font-black uppercase tracking-[0.3em] animate-pulse">
                  Ładowanie certyfikatów SEP...
                </div>
              ) : (
                <>
                  {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {placeholders.map((spot) => (
                      <div key={`placeholder-${spot}`} className="bg-slate-50/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center h-full min-h-[400px] hover:border-[#d4af37]/50 hover:bg-white transition-all duration-300 group">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#d4af37] text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">+</div>
                        <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest leading-tight">
                          WIZYTÓWKA INSTALATORSKA <br/> DLA CIEBIE
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                          Składasz najnowocześniejsze tablice rozdzielcze i nie tolerujesz pajączków w puszkach? Dołącz do elitarnej grupy elektryków w regionie.
                        </p>
                        <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-lg">
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

        {/* MODUŁ SEO - ZACHOWANY ORYGINAŁ */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <div className="text-center mb-16">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block italic">Asystent Inwestora - Portal Regionu</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
                2 Mity przy wynajmowaniu "taniego prądowca".
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-8"></div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-md border-l-4 border-l-[#d4af37]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight italic">Szwagier bez Uprawnień = Odmowa Ubezpieczenia</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Ubezpieczyciel zawsze prosi o pomiary ochronne podpisane przez uprawnionego elektryka SEP. Jeśli instalację wykonał znajomy "na czarno", polisa na zgliszcza może zostać zniwelowana do 0.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-md border-l-4 border-l-[#0f172a]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight italic">Sprzęt za Tysiące bez Gwarancji</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Karty gwarancyjne Bosh, Samsung, Electrolux wymagają przybicia pieczątki z nr SEP przez osobę dokonującą podłączenia pod tzw. siłę 400V. Bez tego tracisz gwarancję natychmiastowo.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CTA BIZNES - ZACHOWANY ORYGINAŁ */}
      <section id="kontakt" className="py-24 bg-[#0f172a] text-white border-t border-[#d4af37]/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center font-montserrat relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic leading-none">
            REPREZENTUJESZ ZŁOTĄ EKIPĘ?
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            "Klienci szukają dzisiaj fachowca z miernikiem i wiedzą. Pokaż swój potencjał i oddziel się od fuszerek."
          </p>
          <Link href="/dolacz" className="inline-block bg-[#d4af37] hover:bg-white text-[#0f172a] font-black py-6 px-14 rounded-full transition-all transform hover:scale-105 shadow-xl uppercase tracking-[0.2em] text-xs">
            Aplikuj o miejsce
          </Link>
        </div>
      </section>

      {/* STOPKA - ZACHOWANY ORYGINAŁ */}
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