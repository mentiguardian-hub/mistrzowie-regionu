"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { FaArrowRight, FaClock, FaRegNewspaper } from 'react-icons/fa';

interface NewsPost {
  id: string;
  title: string;
  intro: string;
  date: any;
  author: string;
  slug?: string;
}

export default function AktualnosciListPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "aktualnosci"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as NewsPost));
        setPosts(fetched);
      } catch (err) {
        console.error("Błąd pobierania aktualności:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-montserrat flex flex-col relative overflow-hidden">
      
      {/* DEKORACYJNE TŁO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* NAGŁÓWEK STRONY */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-32 pb-16 relative z-10 text-center">
        <span className="text-[#d4af37] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
          Wiadomości z Gminy Nieporęt
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase text-white drop-shadow-2xl">
          Aktualności
        </h1>
        <div className="h-1 w-24 bg-[#d4af37] mx-auto rounded-full shadow-[0_0_15px_#d4af37]"></div>
      </div>

      {/* LISTA ARTYKUŁÓW (GRID) */}
      <div className="max-w-7xl mx-auto w-full px-6 pb-24 relative z-10">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-white/5 rounded-[2rem] border border-white/10 animate-pulse"></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/20">
            <FaRegNewspaper className="text-5xl text-slate-500 mx-auto mb-6 opacity-30" />
            <h3 className="text-xl font-bold uppercase text-slate-400">Brak nowych wiadomości</h3>
            <p className="text-slate-500 mt-2">Zajrzyj do nas później!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/aktualnosci/${post.slug || post.id}`}
                className="group bg-[#001f3f]/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/10 hover:border-[#d4af37]/50 transition-all shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col relative overflow-hidden"
              >
                {/* Dekoracyjny trójkąt w narożniku */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#d4af37]/5 rounded-bl-[60px] group-hover:bg-[#d4af37]/10 transition-colors"></div>

                <div className="flex items-center gap-4 text-[#d4af37] text-[9px] font-black uppercase tracking-widest mb-6">
                  <FaClock /> 
                  <span>{post.date?.toDate().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-[#d4af37] transition-colors leading-tight mb-4 uppercase tracking-tight">
                  {post.title}
                </h2>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 flex-grow opacity-80 group-hover:opacity-100 transition-opacity italic">
                  {post.intro.length > 150 ? post.intro.slice(0, 150) + "..." : post.intro}
                </p>

                <div className="flex items-center gap-2 text-[#d4af37] font-black uppercase text-[10px] tracking-[0.2em] transform group-hover:translate-x-2 transition-transform">
                  Czytaj dalej <FaArrowRight />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
