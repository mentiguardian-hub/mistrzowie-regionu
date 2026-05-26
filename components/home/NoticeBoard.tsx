"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // <--- DODANY IMPORT
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default function NoticeBoard() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'tablica_posts'), orderBy('createdAt', 'desc'), limit(3));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      } catch (err) { console.error("Błąd tablicy:", err); }
    };
    fetchPosts();
  }, []);

  return (
    <section id="tablica" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* NAGŁÓWEK Z PRZYCISKIEM - ROZCIĄGNIĘTY NA 7XL */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl mx-auto">
          
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#0f172a] mb-4">
              Tablica <span className="text-[#d4af37]">Mieszkańców</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Masz sprawę do sąsiadów? Napisz, kogo potrzebujesz lub czym chcesz się podzielić. 
              To miejsce na lokalne sprawy, które dzieją się tu i teraz.
            </p>
          </div>

          {/* PRZYCISK DODAWANIA (STYL 3D) */}
          <Link 
            href="/tablica" 
            className="inline-flex items-center justify-center bg-[#d4af37] text-[#0f172a] px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-[#0f172a] hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 whitespace-nowrap"
          >
            Dodaj ogłoszenie +
          </Link>
        </div>

        {/* TRZY PODPOWIEDZI (KLOCKI) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="p-4 bg-[#f8fafc] border-l-4 border-[#d4af37] rounded-r-xl shadow-sm">
            <p className="text-[10px] font-black uppercase text-[#d4af37] mb-1">Potrzeba</p>
            <p className="text-xs text-slate-500 font-medium italic">"Szukam kogoś do skoszenia trawy..."</p>
          </div>
          <div className="p-4 bg-[#f8fafc] border-l-4 border-[#0f172a] rounded-r-xl shadow-sm">
            <p className="text-[10px] font-black uppercase text-[#0f172a] mb-1">Znalezione</p>
            <p className="text-xs text-slate-500 font-medium italic">"Znaleziono klucze na placu zabaw..."</p>
          </div>
          <div className="p-4 bg-[#f8fafc] border-l-4 border-rose-500 rounded-r-xl shadow-sm">
            <p className="text-[10px] font-black uppercase text-rose-500 mb-1">Alert</p>
            <p className="text-xs text-slate-500 font-medium italic">"Uwaga na dziki na ul. Leśnej!"</p>
          </div>
        </div>

        {/* LISTA WPISÓW Z BAZY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-[#0f172a] uppercase mb-2">{post.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}