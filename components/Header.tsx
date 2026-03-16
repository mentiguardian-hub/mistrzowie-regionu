"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#0f172a] py-4 px-6 sticky top-0 z-50 shadow-lg border-b border-[#d4af37]/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO - TYLKO SYMBOL */}
        <Link href="/" className="transition-transform hover:scale-105 flex items-center">
          <img 
            src="/logo.png" 
            alt="Mistrzowie Regionu" 
            className="h-22 w-auto object-contain" 
          />
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-300">
          <Link href="#ranking" className="hover:text-[#d4af37] transition-colors">Ranking</Link>
          <Link href="#cennik" className="hover:text-[#d4af37] transition-colors">Cennik</Link>
          <Link href="#miejscowosci" className="hover:text-[#d4af37] transition-colors">Zasięg</Link>
        </nav>

        {/* PRZYCISK */}
        <a href="tel:601728604" className="bg-[#d4af37] text-[#0f172a] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-md">
          Dodaj Firmę
        </a>
      </div>
    </header>
  );
}