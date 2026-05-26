"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; 
import Link from 'next/link';

export default function BudowaDomowPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'budowa' (Musi być identyczny z polem industry w Firebase)
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'budowa'),
      where('is_verified', '==', true)
    );

    // Nowoczesny mechanizm na żywo (onSnapshot) - eliminuje błędy "await" w useEffect
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Automatyczne mapowanie pakietów dla nowej luksusowej karty
          tier: data.tier || data.package || 'silver',
          rating: data.rating || 5.0,
        };
      });
      
      // Sortowanie: Platinum zawsze na szczycie
      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    }, (error) => {
      console.error("Błąd Firebase:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const placeholdersCount = Math.max(0, 4 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <> 
      {/* HERO SECTION - PEŁNA TREŚĆ ORYGINALNA */}
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
            EKSPERCI BUDOWY DOMÓW <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37] uppercase italic">
              GENERALNE WYKONAWSTWO
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Oszczędź roczne nerwy i zabezpiecz swoje mienie. Poniżej zebraliśmy budowlańców z ugruntowaną w Gminie historią. 
            Cegła po cegle kreujemy twój spokojny sen. <span className="text-white font-medium italic">Brak niedomówień przy SSO i SSZ.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
              Przeglądaj Ranking
            </a>
            <a href="#cennik" className="border border-slate-700 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/5 transition-colors">
              Analizuj rynek 2026
            </a>
          </div>
        </div>
      </section>

      {/* BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24 font-montserrat">

        {/* MIEJSCOWOŚCI */}
        <section id="miejscowosci" className="px-6 relative z-10 pt-10"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100">
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px bg-gradient-to-r from-transparent to-slate-200 flex-grow"></div>
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">
                Autoryzowane firmy budują w
              </h2>
              <div className="h-px bg-gradient-to-l from-transparent to-slate-200 flex-grow"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 
                'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 
                'Stanisławów', 'Wola Aleksandra', 'Wola Kiełpińska'
              ].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-200">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CENNIK BUDOWNICTWO - TREŚĆ ZACHOWANA */}
        <section id="cennik" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase">
                SZACUNKOWE KOSZTY BUDOWY DOMU (100 M2)
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto italic font-medium">
                "Przez rosnące ceny styropianu czy drewna tartacznego, rynek waha się jak sinusoidy. Przedstawiamy aktualne ramy opłacalności."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase tracking-tight">Surowy Otwarty (SSO)</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Ławy, fundament, mury, dach wstęp.</p>
                <p className="text-4xl font-black text-[#d4af37]">~ 240 K <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>

              <div className="bg-[#0f172a] rounded-[2rem] shadow-2xl p-8 border-t-4 border-[#d4af37] text-center transform md:scale-105 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-max">
                  NAJCZĘSTSZY WYBÓR
                </span>
                <h3 className="text-xl font-black text-white mb-2 mt-4 uppercase tracking-tight">Surowy Zamknięty</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Z elewacją, Oknami i Drzwiami</p>
                <p className="text-4xl font-black text-[#d4af37]">~ 380 K <span className="text-lg text-slate-300 font-normal">PLN</span></p>
              </div>

              <div className="bg-white rounded-[2rem] shadow-lg p-8 border-t-4 border-[#d4af37] border-x border-b border-slate-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase tracking-tight">Deweloperski</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Wylewki, elektryka, tynki</p>
                <p className="text-4xl font-black text-[#d4af37]">~ 550 K <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING WYKONAWCÓW - NOWA KARTA PLATINUM */}
        <section id="ranking" className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
              RANKING WYKONAWCÓW (DOMY JEDNORODZINNE)
            </h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
            
            <div className="grid grid-cols-1 gap-12 text-left">
              {loading ? (
                <div className="text-center text-slate-400 py-20 font-black uppercase tracking-[0.3em] animate-pulse italic">
                  Weryfikacja Liderów Budownictwa...
                </div>
              ) : (
                <>
                  {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {placeholders.map((spot) => (
                      <div key={`placeholder-${spot}`} className="bg-slate-50/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center h-full min-h-[380px] hover:border-[#d4af37]/50 hover:bg-white transition-all duration-300 group">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[#d4af37] text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">+</div>
                        <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest leading-tight">
                          WIZYTÓWKA DEVELOPERSKA <br/> DLA CIEBIE
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                          Budujesz domy solidnie i terminowo? Dołącz do elitarnej grupy generalnych wykonawców w regionie.
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

        {/* SEKACJA SEO - TREŚĆ ZACHOWANA */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Asystent Inwestora - Portal Regionu</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
                2 Mity przy umowie na budowę do stanu surowego (SSO).
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-8"></div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-md border-l-8 border-l-[#d4af37]">
                <h3 className="text-xl font-black text-[#0f172a] mb-4 uppercase tracking-tight italic">Cena Oszukana (Na telefon vs Audyt działki)</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Wielu wykonawców zarzuca nierealnie tanie wyceny. Prawda jest taka, że przy dzisiejszych kosztach, tani podmiot często ukrywa koszty maszyn ziemnych czy szalunków. Wymagaj pełnego obmiaru!
                </p>
              </div>

              <div className="bg-white p-10 rounded-[3rem] shadow-md border-l-8 border-l-[#0f172a]">
                <h3 className="text-xl font-black text-[#0f172a] mb-4 uppercase tracking-tight italic">Kierownik Budowy z nadania Wykonawcy</h3>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  Kierownik Budowy ma chronić TWOJEGO domostwa, a nie dewelopera. Skrajną ignorancją jest zgoda na wybór kierownika podsuniętego przez szefa ekipy, bo przymknie oko na fuszery. Szukaj niezależnych!
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* CTA SEKACJA - TREŚĆ ZACHOWANA */}
      <section id="kontakt" className="py-24 bg-[#0f172a] text-white border-t border-[#d4af37]/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic leading-none">
            REPREZENTUJESZ FIRMĘ <br />KONTRAKTORSKĄ?
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed text-sm">
            "Weź udział w luksusowym wyścigu o zaufanie klientów planujących budowę w Q3 2026 r."
          </p>
          <Link href="/dolacz" className="inline-block bg-[#d4af37] hover:bg-white text-[#0f172a] font-black py-6 px-14 rounded-full transition-all transform hover:scale-105 shadow-xl uppercase tracking-[0.2em] text-xs">
            Dołącz do Listy Liderów
          </Link>
        </div>
      </section>

      {/* STOPKA */}
      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="border-t border-white/5 pt-12 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
            © 2026 MISTRZOWIE REGIONU. PROJEKTANT TEL. 601 728 604
          </div>
        </div>
      </footer>
    </>
  );
}