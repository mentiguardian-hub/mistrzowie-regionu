"use client";
import React from 'react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#0f172a] flex items-center min-h-[550px]">
      
      {/* 1. ZDJĘCIE NA TELEFONY (Proporcja 9:16, ukryte na większych ekranach) */}
      <div className="absolute inset-0 bg-cover bg-center md:hidden" style={{ backgroundImage: "url('/baner-mobile.webp')" }} />

      {/* 2. ZDJĘCIE NA KOMPUTERY (Panoramiczne, ukryte na telefonach) */}
      <div className="absolute inset-0 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('/baner-dolacz.webp')" }} />
      
      {/* CIEMNA NAKŁADKA (przyciemnienie na poziomie 50%, bez rozmycia) */}
      <div className="absolute inset-0 bg-[#0f172a]/50"></div>
      
      {/* TREŚĆ BANERA (wyrównana do lewej strony) */}
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-start text-left">
        <h2 className="text-4xl md:text-7xl font-black uppercase text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
          Czas Wejść Na <br /> <span className="text-[#d4af37]">Szczyt</span>
        </h2>
        <Link href="/dolacz" className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-14 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-2xl relative z-10 inline-block">
          Zarejestruj Firmę
        </Link>
      </div>
    </section>
  );
}