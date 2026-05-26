import Link from 'next/link';
import React from 'react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-montserrat">
      {/* Tło Premium */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_60%)] opacity-10"></div>
      
      <div className="bg-white rounded-[2rem] shadow-2xl p-10 md:p-16 max-w-2xl w-full text-center relative z-10 border-t-4 border-[#d4af37] animate-fade-in">
        
        {/* Ikona sukcesu */}
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-green-100">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-4 tracking-tighter uppercase">
          Zgłoszenie Przyjęte
        </h1>
        
        <p className="text-slate-500 mb-10 text-lg leading-relaxed">
          Dziękujemy! Twoja wiadomość oraz załączniki zostały pomyślnie przesłane do redakcji <span className="font-bold text-[#d4af37]">Mistrzów Regionu</span>. Skontaktujemy się z Tobą po weryfikacji przesłanych danych.
        </p>
        
        <Link href="/" className="inline-block bg-[#0f172a] text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#0f172a] transition-all shadow-lg">
          Wróć na stronę główną
        </Link>
      </div>
    </div>
  );
}