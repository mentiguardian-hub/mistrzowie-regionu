"use client";
import React from 'react';
import Link from 'next/link';
import { FaTruck, FaChevronRight } from 'react-icons/fa';

export default function NoticeBoard() {
  return (
    <section className="relative z-50 -mt-8 md:-mt-12 px-6 mb-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/nieporet/harmonogram-wywozu-smieci-maj-2026" 
          className="flex flex-col md:flex-row items-center justify-between bg-[#0f172a] border-2 border-[#d4af37] rounded-[2.5rem] p-2 pr-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] group transition-all hover:scale-[1.02] hover:border-white"
        >
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="bg-[#d4af37] p-5 rounded-[2rem] text-[#0f172a] shadow-xl group-hover:rotate-12 transition-transform duration-500">
              <FaTruck size={24} className="animate-pulse" />
            </div>
            <div className="py-2">
              <span className="block text-[9px] font-black uppercase text-[#d4af37] tracking-[0.4em] mb-1">
                Informacja Gminna
              </span>
              <span className="block text-white font-black text-sm md:text-lg uppercase tracking-tight group-hover:text-[#d4af37] transition-colors">
                Harmonogram Śmieci: Maj 2026 <span className="text-[#d4af37]/40 ml-2 hidden sm:inline">|</span> <span className="text-slate-400 text-xs lowercase ml-2 font-light">Sprawdź daty dla swojej ulicy</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[#d4af37] font-black uppercase text-[10px] tracking-widest pl-4">
            Kalendarz Sektorowy <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </section>
  );
}