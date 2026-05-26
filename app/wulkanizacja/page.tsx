"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; 
import Link from 'next/link';

export default function WulkanizacjaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FILTR: 'wulkanizacja'
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'wulkanizacja'),
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

      // Bezpieczne ustawienie stanu
      setCompanies(sorted.filter(c => c !== undefined));
      setLoading(false);
    }, (error) => {
      console.error("Błąd pobierania wulkanizacji:", error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <> 
      {/* HERO SECTION */}
      <section className="relative w-full max-w-6xl mx-auto rounded-b-[3.5rem] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-40 pb-32 px-6 overflow-hidden shadow-2xl mb-12">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 font-montserrat">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">
            Gmina Nieporęt 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase drop-shadow-lg">
            WULKANIZACJA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f1d592] to-[#b8860b] italic">
              SERWIS OPON 24/7
            </span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed italic font-medium">
            Opony to Twój jedyny punkt styku z asfaltem. Wybierz serwisy, które nie porysują Twoich felg i używają skalibrowanych wyważarek. <span className="text-white font-bold">Bez wibracji na kierownicy.</span>
          </p>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto bg-white rounded-[3rem] relative z-20 shadow-xl mb-24 font-montserrat p-8 md:p-16 border border-slate-100">
        
        {/* RANKING FIRM */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
            REKOMENDOWANE SERWISY OPON
          </h2>
          <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-12"></div>
          
          <div className="grid grid-cols-1 gap-12 text-left">
            {loading ? (
              <div className="text-center text-slate-400 py-20 font-black uppercase tracking-[0.3em] animate-pulse italic">
                Weryfikacja maszyn wulkanizacyjnych...
              </div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {/* JEŚLI BRAK FIRM LUB MAŁO */}
                {companies.length < 3 && (
                  <div className="bg-slate-50/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col justify-center items-center text-center min-h-[300px] hover:border-[#d4af37]/50 hover:bg-white transition-all duration-300 group mt-8">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#d4af37] text-3xl mb-6 shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                      +
                    </div>
                    <h3 className="text-xl font-black text-[#0f172a] mb-3 uppercase tracking-widest leading-tight">
                      WOLNE MIEJSCE W RANKINGU
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 max-w-md">
                      Prowadzisz nowoczesny serwis opon? Nie niszczysz czujników TPMS i dokręcasz koła kluczem dynamometrycznym? Dołącz do liderów.
                    </p>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-[#0f172a] transition-colors shadow-lg">
                      PODEJMIJ ROZMOWY
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* MODUŁ SEO: WULKANIZACJA */}
        <section className="mt-24 border-t border-slate-100 pt-20">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block italic">Ekspert Radzi</span>
            <h2 className="text-3xl font-black text-[#0f172a] mb-6 tracking-tighter uppercase">
              2 Błędy tanich wulkanizacji
            </h2>
            <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black text-[#0f172a] mb-4 uppercase tracking-tight">Klucz Pneumatyczny "na pałę"</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Szybka wymiana to mit. Jeśli mechanik dokręca Twoje alufelgi kluczem pneumatycznym bez weryfikacji kluczem dynamometrycznym, ryzykuje zerwaniem gwintu lub wykrzywieniem tarczy hamulcowej.
              </p>
            </div>

            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-black text-[#0f172a] mb-4 uppercase tracking-tight">Stare, nieskalibrowane maszyny</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Wyważarka powinna być kalibrowana regularnie. Serwisy z "epoki kamienia łupanego" przykleją Ci ciężarki, a Ty i tak odczujesz drgania kierownicy przy 120 km/h na obwodnicy.
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="text-center pb-12 font-montserrat">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          © 2026 MISTRZOWIE REGIONU. PROJEKTANT TEL. 601 728 604
        </p>
      </footer>
    </>
  );
}