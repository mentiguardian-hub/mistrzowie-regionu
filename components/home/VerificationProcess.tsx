"use client";
import React from 'react';
import Link from 'next/link'; // <--- DODANY IMPORT
import { FaShieldAlt, FaPhoneAlt, FaSearchDollar, FaCheckDouble } from 'react-icons/fa';

export default function VerificationProcess() {
  const steps = [
    {
      icon: <FaSearchDollar className="text-[#d4af37]" />,
      title: "Transparentność Cenowa",
      desc: "Monitorujemy, czy ceny są adekwatne do jakości. Zero ukrytych kosztów dla mieszkańców."
    },
    {
      icon: <FaPhoneAlt className="text-[#d4af37]" />,
      title: "Szybkość Reakcji",
      desc: "Osobiście weryfikujemy czas odpowiedzi na zgłoszenia. Mistrz musi być dostępny."
    },
    {
      icon: <FaShieldAlt className="text-[#d4af37]" />,
      title: "Weryfikowana Jakość",
      desc: "Tylko sprawdzone opinie. Nie dopuszczamy kupowanych komentarzy i fałszywych poleceń."
    },
    {
      icon: <FaCheckDouble className="text-[#d4af37]" />,
      title: "Standard Obsługi",
      desc: "Etyka pracy i profesjonalizm. Sprawdzamy, czy firmy traktują mieszkańców z szacunkiem."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* LEWA STRONA: TEKST */}
          <div className="flex-1">
            <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Nasza Misja</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase text-[#0f172a] mb-8 leading-tight tracking-tighter">
              Sprawdzamy firmy <br /> 
              <span className="text-[#d4af37]">i mówimy prawdę</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-xl">
              Nie jesteśmy zwykłą bazą adresową. Jako jedyni w regionie prowadzimy aktywny audyt jakości. 
              Gdy widzisz logo „Mistrzów Regionu”, masz pewność, że firma przeszła naszą rygorystyczną kontrolę.
            </p>

            {/* SIATKA 4 PUNKTÓW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className="text-2xl">{step.icon}</div>
                  <h4 className="font-black uppercase text-[11px] text-[#0f172a] tracking-wider">{step.title}</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed uppercase font-medium">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* 🚀 NOWY SZEROKI PRZYCISK: "MÓWIĘ PRAWDĘ" */}
            <Link 
              href="/opinie" 
              className="flex items-center justify-between bg-white border-2 border-[#d4af37] text-[#0f172a] p-1 pr-6 rounded-2xl group transition-all hover:bg-[#0f172a] hover:border-[#0f172a] hover:text-white shadow-xl max-w-xl"
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#d4af37] p-4 rounded-xl text-[#0f172a] group-hover:bg-white transition-colors shadow-lg">
                  <FaCheckDouble size={20} />
                </div>
                <span className="font-black uppercase text-[10px] md:text-xs tracking-widest">
                  Mówię prawdę – dodaj opinię
                </span>
              </div>
              <div className="hidden sm:block text-[#d4af37] font-black group-hover:text-white">→</div>
            </Link>
          </div>

          {/* PRAWA STRONA: CERTYFIKAT */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-4 bg-[#0f172a]/5 rounded-[4rem] blur-2xl group-hover:bg-[#d4af37]/10 transition-colors duration-1000"></div>
            
            <img 
              src="/certyfikat-jakosci.webp" 
              alt="Certyfikat Jakości Mistrzowie Regionu" 
              className="relative z-10 w-full max-w-[480px] mx-auto rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-1000 group-hover:-rotate-1"
            />
            
            <div className="absolute bottom-10 right-10 z-20 bg-[#d4af37] p-4 rounded-full text-white shadow-2xl animate-pulse">
                <FaShieldAlt size={20} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}