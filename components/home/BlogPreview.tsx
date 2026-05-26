"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';

export default function BlogPreview() {
  const [latestPost, setLatestPost] = useState<any>(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const q = query(
          collection(db, 'blog_posts'), 
          where('status', '==', 'approved'), 
          orderBy('createdAt', 'desc'), 
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          setLatestPost({ id: snap.docs[0].id, ...snap.docs[0].data() });
        }
      } catch (err) { console.error("Błąd bloga:", err); }
    };
    fetchLatestPost();
  }, []);

  if (!latestPost) return null;

  return (
    <section className="py-12">
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col md:flex-row min-h-[450px]">
        
        {/* LEWA STRONA: ZDJĘCIE */}
        <div className="md:w-1/2 relative group overflow-hidden">
          <img 
            src={latestPost.imageUrl || '/blog-placeholder.jpg'} 
            alt={latestPost.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-6 left-6 bg-[#d4af37] text-[#0f172a] px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
            Głos Nieporętu
          </div>
        </div>

        {/* PRAWA STRONA: TREŚĆ */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Najnowszy Artykuł</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-[#0f172a] mb-6 leading-tight tracking-tighter">
            {latestPost.title}
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10 line-clamp-3">
            {latestPost.excerpt || latestPost.content?.substring(0, 160) + "..."}
          </p>

          <Link 
            href={`/blog/${latestPost.id}`}
            className="inline-flex items-center justify-center bg-[#0f172a] text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-[0_20px_40px_rgba(15,23,42,0.3)] hover:bg-[#d4af37] hover:text-[#0f172a] transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Czytaj cały artykuł →
          </Link>
        </div>

      </div>
    </section>
  );
}