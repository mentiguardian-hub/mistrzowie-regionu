"use client";
import React from 'react';
import { FiPhone, FiMapPin, FiGlobe, FiAward, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function MedicalTemplate({ company }: { company: any }) {
  return (
    <main className="min-h-screen bg-white font-montserrat italic selection:bg-[#d4af37] selection:text-white">
      {/* SEKCJA PRESTIŻU (HERO) */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0b1120]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/certyfikat.webp" 
            className="w-full h-full object-cover opacity-20 grayscale-[0.8] scale-105"
            alt="Tło Mistrzów"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-[#0b1120]/80" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0b1120] px-8 py-3 rounded-full mb-10 shadow-[0_10px_40px_rgba(212,175,55,0.4)] animate-bounce">
            <FiAward className="text-2xl" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Certyfikowany Mistrz Regionu 2026</span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black text-[#0f172a] uppercase leading-none tracking-tighter mb-6 drop-shadow-2xl">
            {company.companyName || company.name}
          </h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-[#d4af37]" />
             <p className="text-[#d4af37] text-xl md:text-3xl font-light uppercase tracking-[0.5em]">{company.displayCategory || "Ekskluzywna Stomatologia"}</p>
             <div className="h-[1px] w-12 bg-[#d4af37]" />
          </div>
        </div>
      </section>

      {/* KONTAKT PREMIUM */}
      <section className="max-w-7xl mx-auto -mt-24 relative z-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href={`tel:${company.phone}`} className="bg-[#0f172a] group hover:bg-[#d4af37] transition-all duration-700 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiPhone className="text-4xl text-[#d4af37] group-hover:text-white transition-colors" />
            <div>
              <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-2 group-hover:text-white/70">Umów wizytę</p>
              <p className="text-white text-3xl font-black group-hover:text-[#0f172a]">{company.phone}</p>
            </div>
          </a>

          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiMapPin className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-2">Lokalizacja</p>
              <p className="text-[#0f172a] text-2xl font-black leading-tight">{company.address || "Nieporęt, ul. Główna"}</p>
            </div>
          </div>

          <div className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiClock className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-2">Dostępność</p>
              <p className="text-[#0f172a] text-2xl font-black leading-tight">Pn - Pt: 8:00 - 20:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* TREŚĆ I WERYFIKACJA */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl" />
             <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] uppercase leading-none mb-10 relative">
               Dlaczego <span className="text-[#d4af37]">Mistrz</span> Branży?
             </h2>
             <p className="text-slate-500 text-lg leading-relaxed mb-10">
               {company.description || "Ta placówka przeszła rygorystyczną weryfikację jakości portalu Mistrzowie Regionu. Wybór tej firmy to gwarancja najwyższych standardów, nowoczesnego sprzętu oraz profesjonalnego podejścia do każdego pacjenta w Nieporęcie."}
             </p>
             <div className="space-y-4">
                {['Najnowocześniejsza diagnostyka', 'Bezstresowa atmosfera', 'Certyfikowany zespół'].map((check) => (
                  <div key={check} className="flex items-center gap-3 text-[#0f172a] font-bold uppercase text-[11px] tracking-widest">
                    <FiCheckCircle className="text-[#d4af37] text-xl" /> {check}
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-[#0b1120] aspect-square rounded-[4rem] relative overflow-hidden shadow-3xl">
             <img src="/certyfikat.webp" className="w-full h-full object-cover opacity-40 grayscale mix-blend-screen scale-150" alt="Detail" />
             <div className="absolute inset-0 flex items-center justify-center">
                <FiAward className="text-[10rem] text-[#d4af37]/20" />
             </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604</p>
      </footer>
    </main>
  );
}