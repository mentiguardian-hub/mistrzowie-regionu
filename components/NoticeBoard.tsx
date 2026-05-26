"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default function NoticeBoard() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'tablica_posts'), orderBy('createdAt', 'desc'), limit(6));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      } catch (err) {
        console.error("Błąd tablicy:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="tablica" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* TWÓJ NOWY NAGŁÓWEK (Widoczny zawsze) */}
        <div className="mb-12 text-left max-w-3xl">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0f172a] mb-4">
            Tablica <span className="text-[#d4af37]">Mieszkańców</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            Masz sprawę do sąsiadów? Napisz, kogo potrzebujesz lub czym chcesz się podzielić. 
            To miejsce na szybką pomoc, lokalne zgłoszenia i sąsiedzkie ogłoszenia.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#f8fafc] border-l-4 border-[#d4af37] shadow-sm rounded-r-xl">
              <p className="text-[10px] font-black uppercase text-[#d4af37] mb-1">Potrzeba</p>
              <p className="text-xs text-slate-500 font-medium italic">"Szukam kogoś do odśnieżenia podjazdu..."</p>
            </div>
            <div className="p-4 bg-[#f8fafc] border-l-4 border-[#0f172a] shadow-sm rounded-r-xl">
              <p className="text-[10px] font-black uppercase text-[#0f172a] mb-1">Zgubione/Znalezione</p>
              <p className="text-xs text-slate-500 font-medium italic">"Przy wale znaleziono kluczyki do auta..."</p>
            </div>
            <div className="p-4 bg-[#f8fafc] border-l-4 border-rose-500 shadow-sm rounded-r-xl">
              <p className="text-[10px] font-black uppercase text-rose-500 mb-1">Alert</p>
              <p className="text-xs text-slate-500 font-medium italic">"Uważajcie, dziki na ulicy Leśnej!"</p>
            </div>
          </div>
        </div>

        {/* LISTA POSTÓW Z FIREBASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <h4 className="font-black uppercase text-[#0f172a] mb-2">{post.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{post.content}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">Brak ogłoszeń na tablicy. Bądź pierwszy!</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}