"use client";
import React from 'react';
import Link from 'next/link';
import { FaStar, FaChevronRight } from 'react-icons/fa';

export default function HeroSection() {
  return (
    // ZMIANA: pt-12 na mobilkach (zamiast pt-32), by podnieść treść do góry
    <section className="relative w-full min-h-[700px] flex items-center justify-center p-6 border-b border-[#d4af37]/20 pt-12 md:pt-32 pb-24">
      <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086952-0cd243141f18?q=80&w=2938')" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {/* ZMIANA: hidden md:block sprawia, że gwiazdka znika na telefonach */}
          <FaStar className="hidden md:block text-[#d4af37] text-3xl mb-6 animate-pulse" />
          
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] md:text-sm mb-4 block">
            Najlepsze usługi w Twojej okolicy
          </span>
          
          <h1 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter leading-[0.9]">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37] uppercase">REGIONU</span>
          </h1>
          
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link href="/katalog" className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-14 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all inline-flex items-center gap-4 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              Odkryj Najlepszych <FaChevronRight />
            </Link>
            
            <Link href="/jak-oceniamy" className="mt-2 group flex items-center gap-2 text-slate-400 hover:text-[#d4af37] transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest border-b border-transparent group-hover:border-[#d4af37] pb-1">
                Sprawdzone firmy • prawdziwe opinie • aktualne ceny
              </span>
              <FaChevronRight className="text-[8px] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
        <div className="relative w-72 h-100 mx-auto rounded-t-full border border-[#d4af37]/40 p-1 overflow-hidden">
           <img src="/autor.jpg" alt="Autor" className="w-full h-full object-cover rounded-t-full" />
        </div>
      </div>
    </section>
  );
}