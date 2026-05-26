"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';
import { FaPizzaSlice, FaUtensils, FaMotorcycle, FaStar, FaCheckCircle } from 'react-icons/fa';

export default function PizzeriaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'pizzeria'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          tier: data.tier || data.package || 'silver',
          rating: data.rating || 5.0,
        };
      });
      
      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted.filter(c => c !== undefined));
      setLoading(false);
    }, (error) => {
      console.error("Błąd ładowania pizzerii:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <> 
      {/* HERO SECTION - CZEKA NA TWOJE ZDJĘCIE */}
      <section className="relative bg-[#0f172a] text-white pt-40 pb-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Tu wstawimy zdjęcie, które podeślesz */}
          <div 
  className="w-full h-full bg-cover bg-center opacity-50"
  style={{ backgroundImage: "url('/img/Pizzeria-mistrzowieregionu.webp')" }}
></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/40 to-[#0f172a]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 font-montserrat">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block drop-shadow-md">
            Gmina Nieporęt 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none drop-shadow-2xl uppercase">
            NAJLEPSZA PIZZA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f1d592] to-[#b8860b] italic">
              W TWOIM REGIONIE
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
            Chrupiące ciasto, świeże składniki i szybki dowóz. Wybraliśmy pizzerie, które trzymają standard i nie oszczędzają na serze. <span className="text-white font-bold">Smak, który łączy sąsiadów.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl hover:bg-white transition-colors">
              Sprawdź Ranking
            </a>
            <Link href="/dolacz" className="border border-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/10 transition-colors shadow-lg">
              Zgłoś Pizzerię
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[3rem] -mt-20 relative z-20 shadow-[0_-15px_50px_rgba(0,0,0,0.3)] pb-24 font-montserrat">
        
        {/* USŁUGI GASTRONOMICZNE */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-[2.5rem] shadow-xl p-9 border-t-4 border-[#d4af37]">
                <FaPizzaSlice className="text-3xl text-[#d4af37] mx-auto mb-6"/>
                <h3 className="text-xl font-black text-[#0f172a] uppercase mb-2 italic">Tradycyjna receptura</h3>
                <p className="text-slate-400 text-xs mb-8">Włoskie składniki i piec opalany drewnem</p>
                <p className="text-3xl font-black text-[#d4af37]">PIZZA <span className="text-lg text-slate-400 font-normal">od 35 PLN</span></p>
              </div>

              <div className="bg-[#0f172a] rounded-[2.5rem] shadow-2xl p-9 border-t-4 border-[#d4af37] transform md:scale-105 relative text-white">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-max">
                  Błyskawiczna Dostawa
                </span>
                <FaMotorcycle className="text-3xl text-[#d4af37] mx-auto mb-6 mt-4"/>
                <h3 className="text-xl font-black uppercase mb-2 italic">Gorąca na czas</h3>
                <p className="text-slate-400 text-xs mb-8">Dostawa na terenie całej gminy</p>
                <p className="text-3xl font-black text-[#d4af37]">DOWÓZ <span className="text-lg text-slate-300 font-normal">od 0 PLN</span></p>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-xl p-9 border-t-4 border-[#d4af37]">
                <FaUtensils className="text-3xl text-[#d4af37] mx-auto mb-6"/>
                <h3 className="text-xl font-black text-[#0f172a] uppercase mb-2 italic">Opcje Premium</h3>
                <p className="text-slate-400 text-xs mb-8">Własne kompozycje i dodatki</p>
                <p className="text-3xl font-black text-[#d4af37]">DODATKI <span className="text-lg text-slate-400 font-normal">od 4 PLN</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING PIZZERII */}
        <section id="ranking" className="py-24 bg-white border-t border-slate-200 rounded-[3rem]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase leading-none">
              REKOMENDOWANE PIZZERIE
            </h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
            
            <div className="grid grid-cols-1 gap-12 text-left">
              {loading ? (
                <div className="text-center py-20 font-black uppercase tracking-widest animate-pulse text-slate-400 italic">
                  Nagrzewamy piec z danymi...
                </div>
              ) : (
                <>
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))
                  ) : (
                    <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center min-h-[300px] hover:border-[#d4af37]/50 hover:bg-white transition-all group mt-8">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#d4af37] text-4xl mb-6 shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                        +
                      </div>
                      <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest italic leading-tight">
                        WOLNY STOLIK <br/> DLA TWOJEJ PIZZERII
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mb-8 max-w-md">
                        Masz najlepszą pizzę w gminie? Dołącz do Mistrzów i pozwól klientom znaleźć Cię jako pierwszego.
                      </p>
                      <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-[#0f172a] transition-colors shadow-lg">
                        DODAJ PIZZERIĘ
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* MODUŁ SEO: PIZZA RADY */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <div className="text-center mb-16">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Mistrz Pizzy Wyjaśnia 2026</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase leading-tight">
                Po czym poznać dobrą pizzerię w 30 sekund?
              </h2>
              <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mb-8"></div>
            </div>

            <div className="space-y-8 italic text-slate-600 font-medium leading-relaxed">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-md border-l-8 border-l-[#d4af37]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight not-italic">1. Jakość sera to fundament</h3>
                <p>
                  Prawdziwa pizzeria nigdy nie użyje "wyrobu seropodobnego". Szukaj w menu Mozzarelli fior di latte lub Mozzarelli di bufala. Jeśli ser na pizzy ciągnie się nienaturalnie długo i jest gumowaty, prawdopodobnie masz do czynienia z tanim zamiennikiem, który niszczy smak nawet najlepszych dodatków.
                </p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-md border-l-8 border-l-[#0f172a]">
                <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-tight not-italic">2. Brzegi pizzy (Leopard Spots)</h3>
                <p>
                  Charakterystyczne ciemne cętki na brzegach (pantera) to dowód na to, że ciasto długo dojrzewało (minimum 24-48h) i było pieczone w bardzo wysokiej temperaturze. Takie ciasto jest lekkostrawne, puszyste wewnątrz i chrupiące na zewnątrz. Jeśli brzeg jest blady i twardy jak bułka, ciasto było robione "na szybko".
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/10 text-center font-montserrat">
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