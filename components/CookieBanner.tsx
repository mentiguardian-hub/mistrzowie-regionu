"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCookieBite, FaCheck } from 'react-icons/fa';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdzamy, czy użytkownik już zaakceptował cookies
    const consent = localStorage.getItem('mr_cookies_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('mr_cookies_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[9999] animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="max-w-4xl mx-auto bg-[#0f172a]/95 backdrop-blur-xl border border-[#d4af37]/30 p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6">
        
        {/* IKONA */}
        <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center shrink-0 border border-[#d4af37]/20">
          <FaCookieBite className="text-[#d4af37] text-2xl" />
        </div>

        {/* TEKST */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Dbamy o Twoją prywatność</h4>
          <p className="text-slate-400 text-[11px] leading-relaxed uppercase font-medium tracking-wider">
            Portal <span className="text-[#d4af37]">Mistrzowie Regionu</span> wykorzystuje pliki cookies do zapewnienia najwyższej jakości usług oraz poprawnego działania systemu logowania. Pozostając na stronie, akceptujesz naszą 
            <Link href="/polityka-prywatnosci" className="text-white underline underline-offset-4 ml-1 hover:text-[#d4af37] transition-colors">
              Politykę Prywatności
            </Link>.
          </p>
        </div>

        {/* PRZYCISK */}
        <button 
          onClick={acceptCookies}
          className="bg-[#d4af37] text-[#0f172a] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] whitespace-nowrap"
        >
          <FaCheck /> Rozumiem
        </button>
      </div>
    </div>
  );
}