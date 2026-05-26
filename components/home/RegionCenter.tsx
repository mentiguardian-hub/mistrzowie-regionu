"use client";
import React from 'react';
import Link from 'next/link';
import { 
  FaBullhorn, FaTruck, FaHandshake, 
  FaClipboardList, FaBookOpen, FaComments 
} from 'react-icons/fa';

export default function RegionCenter() {
  return (
    <section className="py-24 px-6 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0f172a]">
            Centrum <span className="text-[#d4af37]">Regionu</span>
          </h2>
          <p className="text-slate-500 mt-3 text-[10px] font-black uppercase tracking-[0.4em]">
            Kompletne narzędzia dla mieszkańców
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "GIEŁDA LOKALNA", sub: "Kupuj i sprzedawaj blisko Ciebie", link: "/ogloszenia", icon: FaBullhorn, img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f" },
            { title: "WYWÓZ ŚMIECI 2026", sub: "Pełny grafik dla okolicy", link: "/harmonogramy", icon: FaTruck, img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b" },
            { title: "GŁOS SĄSIADA", sub: "Najlepsze polecenia w regionie", link: "/spolecznosc", icon: FaHandshake, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac" },
            { title: "LOKALNA TABLICA", sub: "Szybkie wpisy mieszkańców", link: "/tablica", icon: FaClipboardList, img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" },
            { title: "PORADNIK NIEPORĘTU", sub: "Wiedza i życie w Gminie", link: "/blog", icon: FaBookOpen, img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643" },
            { title: "DODAJ OPINIĘ", sub: "Oceń jakość lokalnych usług", link: "/opinie", icon: FaComments, img: "https://images.unsplash.com/photo-1521791136364-798a7bc0d262" }
          ].map((tile, idx) => (
            <Link key={idx} href={tile.link} className="block relative rounded-[2.5rem] overflow-hidden border border-[#d4af37]/20 bg-[#0f172a] h-72 group shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-1000" style={{ backgroundImage: `url('${tile.img}?q=80&w=1000&auto=format&fit=crop')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent flex flex-col items-center justify-end p-10 text-center z-10">
                <tile.icon className="text-[#d4af37] text-4xl mb-4" />
                <h3 className="text-xl font-black uppercase text-white tracking-widest leading-none">{tile.title}</h3>
                <p className="text-slate-300 text-[10px] font-medium uppercase tracking-[0.2em] mt-3">{tile.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}