import React from 'react';
import { Metadata } from 'next';
import { FaSearch, FaStar, FaMapMarkerAlt, FaToolbox, FaWrench, FaHardHat, FaTruck } from 'react-icons/fa';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Najlepsze Firmy i Fachowcy Nieporęt - Ranking i Opinie | Portal Nieporęt",
  description: "Szukasz sprawdzonego fachowca w Nieporęcie? Sprawdź ranking lokalnych firm. Wywóz szamba, hydraulik, elektryk, usługi budowlane i przeprowadzki w Gminie Nieporęt.",
  keywords: "firmy Nieporęt, fachowiec Nieporęt, usługi Nieporęt, ranking firm Nieporęt, wywóz szamba Nieporęt, hydraulik Nieporęt",
};

export default function FirmyHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Katalog najlepszych firm i fachowców w Gminie Nieporęt",
    "description": "Zbiór sprawdzonych usługodawców świadczących usługi na terenie gminy Nieporęt.",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Asenizacja i Wywóz Szamba" },
      { "@type": "ListItem", "position": 2, "name": "Usługi Budowlane i Wykończeniowe" },
      { "@type": "ListItem", "position": 3, "name": "Hydraulik i Elektryk" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0f172a] text-white font-montserrat pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Tło i dekoracje */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#001f3f] to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#b59410]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          
          {/* STRUKTURA NAGŁÓWKÓW (H1/H2) SEO */}
          <div className="mb-12">
            <span className="text-[#b59410] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block drop-shadow-md">Katalog Regionalny</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-xl">
              Firmy i Usługi w <span className="text-[#b59410]">Nieporęcie</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-slate-300 font-montserrat tracking-wide">
              Sprawdzeni fachowcy w Twojej okolicy
            </h2>
          </div>

          {/* MOCKUP WYSZUKIWARKI FIRM */}
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-[#b59410]/30 rounded-full p-2 mb-10 flex shadow-[0_0_30px_rgba(181,148,16,0.1)]">
            <div className="pl-6 flex items-center text-[#b59410]">
              <FaSearch className="text-xl" />
            </div>
            <input 
              type="text" 
              placeholder="np. hydraulik, wywóz szamba, brukarz..."
              className="w-full bg-transparent border-none text-white px-6 py-4 outline-none font-medium placeholder-slate-400"
            />
            <button className="bg-[#b59410] text-[#0f172a] px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#d4af37] transition-all whitespace-nowrap">
              Szukaj
            </button>
          </div>

          {/* WARSTWA TEKSTOWA SEO (Lista Kategorii) */}
          <div className="max-w-4xl mx-auto mb-16 p-8 bg-[#0a1122]/50 border border-slate-800 rounded-[2rem] text-center shadow-inner">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              Znajdź najlepszych specjalistów obsługujących miejscowości: <span className="text-white font-bold">Nieporęt, Białobrzegi, Józefów i okolice</span>. Nasz katalog to rzetelne opinie i aktualne dane kontaktowe lokalnych liderów w branżach: <em className="text-[#b59410] not-italic">asenizacja, budownictwo, instalacje elektryczne</em>.
            </p>
          </div>

          {/* Błyskawiczne Kategorie (Siatka Premium) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Link href="/szamba" className="group bg-[#0a1122] border border-[#b59410]/20 p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(181,148,16,0.15)] flex flex-col items-center">
               <div className="w-16 h-16 bg-[#b59410]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <FaTruck className="text-[#b59410] text-3xl" />
               </div>
               <h3 className="text-xl font-black uppercase text-white tracking-widest mb-2">Wywóz Szamba</h3>
               <p className="text-slate-400 text-xs font-medium uppercase tracking-wider text-center">Asenizacja &amp; Hydraulika</p>
             </Link>
             
             <Link href="/budowa-domow" className="group bg-[#0a1122] border border-[#b59410]/20 p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(181,148,16,0.15)] flex flex-col items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <FaHardHat className="text-8xl text-[#b59410]" />
               </div>
               <div className="w-16 h-16 bg-[#b59410]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                 <FaToolbox className="text-[#b59410] text-3xl" />
               </div>
               <h3 className="text-xl font-black uppercase text-white tracking-widest mb-2 relative z-10">Budownictwo</h3>
               <p className="text-slate-400 text-xs font-medium uppercase tracking-wider text-center relative z-10">Domy pod klucz &amp; Wykończenia</p>
             </Link>

             <Link href="/elektryka" className="group bg-[#0a1122] border border-[#b59410]/20 p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(181,148,16,0.15)] flex flex-col items-center">
               <div className="w-16 h-16 bg-[#b59410]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <FaWrench className="text-[#b59410] text-3xl" />
               </div>
               <h3 className="text-xl font-black uppercase text-white tracking-widest mb-2">Elektryka</h3>
               <p className="text-slate-400 text-xs font-medium uppercase tracking-wider text-center">Awarie &amp; Instalacje</p>
             </Link>
          </div>

        </div>
      </div>
    </>
  );
}
