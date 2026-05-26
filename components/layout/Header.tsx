import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  type: 'home' | 'branch';
}

export const Header = ({ type }: HeaderProps) => {
  return (
    // Zmniejszono padding z py-6 na py-3 (o połowę cieńszy!)
    <header className="absolute top-0 left-0 w-full z-50 px-6 py-3 border-b border-white/5 bg-gradient-to-b from-[#0f172a]/90 to-transparent backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LOGO - bardziej kompaktowe */}
        <Link href="/" className="flex flex-col leading-tight hover:opacity-80 transition-opacity">
          <span className="text-lg md:text-xl font-black tracking-tighter text-white">MISTRZOWIE</span>
          <span className="text-[8px] font-bold text-[#d4af37] tracking-[0.3em] uppercase">REGIONU</span>
        </Link>

        {/* NAWIGACJA - mniejszy gap, mniejszy font */}
        <nav className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
          {type === 'home' ? (
            <>
              <a href="#ogloszenia" className="hover:text-[#d4af37] transition-colors">Ogłoszenia</a>
              <a href="#blog" className="hover:text-[#d4af37] transition-colors">Blog</a>
              <a href="#aktualnosci" className="hover:text-[#d4af37] transition-colors">Aktualności</a>
            </>
          ) : (
            <>
              <a href="#ranking" className="hover:text-[#d4af37] transition-colors">Ranking</a>
              <a href="#opinie" className="hover:text-[#d4af37] transition-colors">Opinie</a>
              <a href="#cennik" className="hover:text-[#d4af37] transition-colors">Cennik</a>
              <a href="#miejscowosci" className="hover:text-[#d4af37] transition-colors">Zasięg</a>
            </>
          )}
        </nav>

        {/* PRZYCISK - mniejszy padding (py-2 zamiast py-3) */}
        <Link 
          href="/dolacz" 
          className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-5 py-2 rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg hover:scale-105 transition-all whitespace-nowrap"
        >
          Dodaj Firmę
        </Link>
      </div>
    </header>
  );
};