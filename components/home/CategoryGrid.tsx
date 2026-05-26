"use client";
import React from 'react';
import Link from 'next/link';
import { categoriesConfigs } from '../../config/categories';

export default function CategoryGrid() {
  // Wybieramy dokładnie 3 pierwsze branże oznaczone jako isFeatured: true
  const featuredCategories = categoriesConfigs
    .filter((c: any) => c.isFeatured)
    .slice(0, 3);

  return (
    <section id="kategorie" className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-[#0f172a] mb-16 tracking-tighter italic">
          Popularne <span className="text-[#d4af37]">Branże</span>
        </h2>
        
        {/* Układ 4 kolumn na komputerach: 3 branże + 1 kafel "Wszystkie" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCategories.map((category: any) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} href={category.link} className="group block h-full">
                <div className="bg-white border border-slate-100 rounded-[3rem] p-10 h-full flex flex-col justify-between hover:border-[#d4af37] hover:-translate-y-2 shadow-2xl transition-all duration-500 overflow-hidden relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#0f172a] flex items-center justify-center text-[#d4af37] text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-black text-[#0f172a] uppercase italic">{category.name}</h3>
                  <p className="text-slate-500 text-[10px] font-bold mt-4 leading-relaxed uppercase tracking-widest italic opacity-70">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}

          {/* 4. KAFEL: WYBIERZ WSZYSTKIE (Zgodnie ze screenshotem) */}
          <Link href="/katalog" className="group block h-full">
            <div className="bg-[#0f172a] border-4 border-[#d4af37]/20 rounded-[3rem] p-10 h-full flex flex-col justify-center items-center text-center hover:border-[#d4af37] hover:-translate-y-2 shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-500">
              <h3 className="text-2xl font-black text-white uppercase italic leading-tight tracking-tighter">
                WSZYSTKIE <br/><span className="text-[#d4af37]">BRANŻE</span>
              </h3>
              <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] mt-4 opacity-50 italic">Odkryj Katalog</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}