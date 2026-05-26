"use client";
import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaChevronRight, FaTruck, FaHardHat, FaTools, FaPen } from 'react-icons/fa';

const communityQuestions = [
  {
    question: "Jaką firmę do wywozu szamba polecacie w Nieporęcie?",
    description: "Najczęściej zadawane pytanie. Sprawdź aktualny ranking oparty na głosach sąsiadów.",
    link: "/szamba", 
    icon: FaTruck,
    tag: "Najgorętszy temat"
  },
  {
    question: "Potrzebny hydraulik 'na już'. Macie kogoś sprawdzonego?",
    description: "Szybkie awarie wymagają sprawdzonych fachowców. Sprawdź listę złotych rączek i hydraulików.",
    link: "/hydraulika",
    icon: FaTools,
    tag: "Awarie / Instalacje"
  },
  {
    question: "Szukam rzetelnej ekipy do budowy domu. Kogo wybrać?",
    description: "Inwestorzy z gminy dzielą się doświadczeniami. Zobacz zweryfikowanych liderów budowy.",
    link: "/budowa-domow",
    icon: FaHardHat,
    tag: "Budowa Domów"
  }
];

export default function SpolecznoscPage() {
  return (
    <div className="min-h-screen bg-[#001f3f] text-white pt-32 pb-24 px-6 font-montserrat">
      
      {/* NAGŁÓWEK */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-[#b59410] hover:text-white transition-colors font-bold text-sm mb-8 uppercase tracking-widest">
          <FaArrowLeft /> Wróć do portalu
        </Link>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
          GŁOS <span className="text-[#b59410]">SĄSIADA</span>
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto font-medium leading-relaxed italic">
          "Najlepsze polecenia pochodzą od ludzi, których znasz. Sprawdź kogo poleca gmina Nieporęt."
        </p>
      </div>

      {/* TABLICA PYTAŃ (DROGOWSKAZY) */}
      <div className="max-w-4xl mx-auto space-y-6">
        {communityQuestions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-[#0a1122] border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="flex flex-col md:flex-row items-center gap-8">
                
                <div className="w-16 h-16 bg-[#001f3f] rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg border border-white/5">
                  <Icon className="text-[#b59410] text-2xl" />
                </div>

                <div className="flex-grow text-center md:text-left">
                  <span className="text-[#b59410] font-black uppercase tracking-widest text-[9px] mb-2 block">{item.tag}</span>
                  <h3 className="text-xl font-black text-white mb-2 leading-tight">
                    {item.question}
                  </h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* PRZYCISKI AKCJI */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Link 
                      href={item.link} 
                      className="bg-[#b59410] text-[#001f3f] px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all flex items-center gap-2"
                    >
                      Zobacz ranking <FaChevronRight />
                    </Link>
                    <Link 
                      href="/opinie" 
                      className="border border-[#b59410] text-[#b59410] px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#b59410] hover:text-[#001f3f] transition-all flex items-center gap-2"
                    >
                      <FaPen /> Dodaj opinię
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* INFO DLA FIRM */}
      <div className="max-w-4xl mx-auto mt-16 text-center border-t border-white/5 pt-12">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
          Wszystkie rankingi są tworzone na podstawie opinii mieszkańców portalu Mistrzowie Regionu.
        </p>
      </div>

    </div>
  );
}