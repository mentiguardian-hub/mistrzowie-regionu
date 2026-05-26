"use client";
import React from 'react';
import { FiAward, FiArrowRight, FiCheck, FiPhone, FiGlobe } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const MISTRZOWIE_DATA = [
  {
    id: 'movilo',
    name: 'Movilo',
    category: 'zlota-raczka',
    displayCategory: 'Złota rączka',
    phone: '601 728 604',
    cleanPhone: '601728604',
    url: 'movilo.pl'
  },
  {
    id: 'szambex24',
    name: 'Szambex Sp.zo.o.',
    category: 'szamba',
    displayCategory: 'Ascenizacja',
    phone: '577 605 505',
    cleanPhone: '577605505',
    url: 'szambex24.pl'
  },
  {
    id: 'cezary-transport',
    name: 'CezaryTransport expres',
    category: 'instalacje-elektryczne',
    displayCategory: 'Taxi Bagażowe',
    phone: '537 010 620',
    cleanPhone: '537010620',
    url: 'cezarytransport.pl/'
  }
];

export default function PremiumCompanies() {
  const router = useRouter();

  return (
    <section className="py-24 px-6 bg-[#0b1120] relative overflow-hidden font-montserrat italic">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#d4af3710_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.8em] text-[10px] mb-4 block">Ekskluzywna Elita Nieporętu</span>
          <h2 className="text-4xl md:text-7xl font-black uppercase text-white leading-none tracking-tighter italic">
            MISTRZOWIE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#b8860b]">BRANŻY</span>
          </h2>
          <div className="w-24 h-1 bg-[#d4af37] rounded-full mx-auto mt-8 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MISTRZOWIE_DATA.map((company) => (
            <div 
              key={company.id} 
    onClick={() => router.push(`/rankingi/${company.id}`)}
              className="group relative min-h-[580px] flex flex-col justify-between p-10 rounded-[3.5rem] bg-[#0f172a] border border-white/10 overflow-hidden hover:border-[#d4af37]/50 transition-all duration-700 shadow-2xl cursor-pointer"
            >
              {/* CERTYFIKAT W TLE */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/certyfikat.webp" 
                  alt="Certyfikat" 
                  className="w-full h-full object-cover opacity-45 grayscale-[0.4] group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-110 transition-all duration-1000 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent" />
              </div>

              {/* GÓRA KARTY */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0f172a] shadow-[0_0_20px_#d4af37] mb-4">
                  <FiAward className="text-2xl" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4af37]">Platinum Partner</span>
              </div>

              {/* ŚRODEK KARTY - WYŚRODKOWANA NAZWA */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center py-8">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4 leading-tight group-hover:text-[#d4af37] transition-colors duration-500">
                  {company.name}
                </h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] italic mb-8">
                  {company.displayCategory}
                </p>
                
                {/* KONTAKT - TELEFON AUTOMATYCZNY */}
                <div className="flex flex-col gap-4 items-center">
                   <a 
                      href={`tel:${company.cleanPhone}`}
                      onClick={(e) => e.stopPropagation()} // ZATRZYMUJE PRZEJŚCIE DO PODSTRONY
                      className="flex items-center gap-3 bg-[#d4af37]/10 border border-[#d4af37]/30 px-6 py-3 rounded-full text-white hover:bg-[#d4af37] hover:text-[#0f172a] transition-all duration-300"
                   >
                      <FiPhone className="text-lg" />
                      <span className="text-sm font-black tracking-widest">{company.phone}</span>
                   </a>
                   <div className="flex items-center gap-2 text-slate-500 text-[10px] tracking-widest uppercase font-light opacity-50">
                      <FiGlobe /> {company.url}
                   </div>
                </div>
              </div>

              {/* DÓŁ KARTY */}
              <div className="relative z-10">
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                   <div className="flex gap-1 text-[#d4af37] text-[10px]">
                      <FiCheck /> <FiCheck /> <FiCheck />
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 group/btn">
                     Zobacz Profil <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                   </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/0 via-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}