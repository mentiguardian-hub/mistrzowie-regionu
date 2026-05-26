"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaCalendarAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import NewsTicker from '@/components/home/NewsTicker'; 
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const navLinks = [
    { name: 'OGŁOSZENIA', href: '/ogloszenia' },
    { name: 'BLOG', href: '/blog' },
    { name: 'AKTUALNOŚCI', href: '/aktualnosci' },
    { name: 'TABLICA', href: '/tablica' },
    { name: 'ZNAJDŹ FACHOWCA', href: '/katalog' },
    { name: 'POLEĆ FACHOWCA', href: '/ankieta' },
    { name: 'OPINIE', href: '/opinie' },
    { name: 'O NAS', href: '/o-nas' },
    { name: 'ZAMÓW WYWÓZ', href: '/zamow-wywoz' },
    { name: 'DODAJ FIRMĘ', href: '/dolacz' },
    { name: 'HARMONOGRAM', href: '/harmonogramy', icon: <FaCalendarAlt className="text-[12px]" /> },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] font-montserrat shadow-xl">
        
        {/* --- 1. NEWS TICKER --- */}
        <NewsTicker />

        {/* --- 2. GŁÓWNY PANEL --- */}
        <div className="bg-[#0f172a] border-b border-white/5 py-1.5 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* LOGO - DODANO prefetch={false} */}
            <Link href="/" prefetch={false} className="hover:opacity-80 transition-opacity shrink-0">
              <Image 
                src="/logo.png" 
                alt="Mistrzowie Regionu" 
                width={220} 
                height={60} 
                priority 
                className="w-[200px] lg:w-[220px] h-auto object-contain" 
              />
            </Link>

            {/* SIATKA DESKTOP - DODANO prefetch={false} */}
            <nav className="hidden lg:grid grid-cols-6 gap-1 flex-grow ml-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  prefetch={false}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-[12px] font-black uppercase tracking-widest text-center transition-all ${
                    pathname === link.href 
                      ? 'bg-[#d4af37] text-[#0f172a] border-[#d4af37]' 
                      : 'bg-white/5 text-slate-300 border-white/5 hover:border-[#d4af37]/50'
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              ))}

              {/* LOGOWANIE DESKTOP */}
              {user ? (
                <div className="grid grid-cols-2 gap-1">
                  <Link href="/panel" prefetch={false} className="flex items-center justify-center py-1.5 rounded-lg bg-white/10 border border-white/10 text-[#d4af37] text-[10px] font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#0f172a]">
                    PANEL
                  </Link>
                  <button onClick={() => signOut(auth)} className="flex items-center justify-center py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all">
                    <FaSignOutAlt />
                  </button>
                </div>
              ) : (
                <Link href="/logowanie" prefetch={false} className="flex items-center justify-center py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:border-[#d4af37] transition-all">
                  <FaUser className="mr-1 text-[11px]" /> ZALOGUJ
                </Link>
              )}
            </nav>

            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="lg:hidden text-[#d4af37] text-4xl ml-auto"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {/* --- MENU MOBILNE --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-[#0b1120] flex flex-col items-center p-6 overflow-y-auto">
          <button className="absolute top-6 right-6 text-[#d4af37] text-5xl" onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </button>

          <div className="w-full max-w-sm mt-16 flex flex-col gap-4 font-montserrat">
            <Link 
              href="/harmonogramy" 
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#d4af37] text-[#0f172a] p-5 rounded-2xl font-black uppercase tracking-widest text-[14px] text-center flex items-center justify-center gap-3 shadow-xl"
            >
              <FaCalendarAlt className="text-xl" /> HARMONOGRAM ŚMIECI
            </Link>

            <nav className="grid grid-cols-2 gap-3">
              {navLinks.filter(l => l.name !== 'HARMONOGRAM').map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  prefetch={false}
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-[12px] font-black uppercase tracking-widest text-center active:scale-95 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* SEKACJA LOGOWANIA MOBILE */}
            <div className="mt-4 pt-6 border-t border-white/10 w-full">
              {user ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    href="/panel" 
                    prefetch={false}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center p-5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[12px] font-black uppercase tracking-widest"
                  >
                    MÓJ PANEL
                  </Link>
                  <button 
                    onClick={() => { signOut(auth); setIsMenuOpen(false); }}
                    className="flex items-center justify-center p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[12px] font-black uppercase tracking-widest"
                  >
                    WYLOGUJ
                  </button>
                </div>
              ) : (
                <Link 
                  href="/logowanie" 
                  prefetch={false}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center p-6 rounded-[2.5rem] bg-white/10 border border-white/20 text-white text-[14px] font-black uppercase tracking-widest w-full shadow-lg"
                >
                  <FaUser className="mr-3 text-[#d4af37] text-xl" /> ZALOGUJ SIĘ
                </Link>
              )}
            </div>

            <Link 
              href="/dolacz" 
              prefetch={false}
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#d4af37] text-[#0f172a] p-6 rounded-[2.5rem] font-black uppercase tracking-widest text-[14px] text-center mt-2 shadow-lg"
            >
              DODAJ SWOJĄ FIRMĘ
            </Link>
          </div>
        </div>
      )}
      
      <div className="h-[90px] lg:h-[105px]"></div>
    </>
  );
}