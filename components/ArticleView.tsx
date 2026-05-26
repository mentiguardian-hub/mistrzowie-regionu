"use client";

import React from 'react';
import SocialShareBar from './SocialShareBar';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaUserEdit } from 'react-icons/fa';

interface NewsPost {
  title: string;
  intro: string;
  content: string;
  author: string;
  date: any;
}

interface ArticleViewProps {
  post: NewsPost;
  id: string;
}

export default function ArticleView({ post, id }: ArticleViewProps) {
  const formattedDate = post.date?.toDate 
    ? post.date.toDate().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) 
    : (typeof post.date === 'string' ? post.date : '');

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-montserrat flex flex-col relative overflow-hidden">
      
      {/* DEKORACYJNE TŁO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* NAGŁÓWEK ARTYKUŁU (Luksusowa Typografia) */}
      <div className="max-w-4xl mx-auto w-full px-6 pt-32 pb-16 relative z-10">
        <Link href="/aktualnosci" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#d4af37] font-black uppercase text-[10px] tracking-widest transition-colors mb-12">
          <FaArrowLeft /> powrót do listy
        </Link>
        <div className="h-0.5 w-16 bg-[#d4af37] mb-8"></div>
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tight drop-shadow-2xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
           <div className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full">
             <FaClock className="text-[#d4af37]" /> {formattedDate}
           </div>
           <div className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full">
             <FaUserEdit className="text-[#d4af37]" /> {post.author}
           </div>
        </div>
      </div>

      {/* TREŚĆ ARTYKUŁU */}
      <div className="max-w-4xl mx-auto w-full px-6 pb-24 relative z-10">
        <article className="bg-[#001f3f]/40 backdrop-blur-md rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/10 relative overflow-hidden">
          
          {/* Wstęp (Lead) */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-white font-bold leading-relaxed italic opacity-90 border-l-4 border-[#d4af37] pl-8">
              {post.intro}
            </p>
          </div>

          {/* Tekst Artykułu */}
          <div className="space-y-8 text-slate-300 text-lg md:text-xl leading-loose font-medium whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Udostępnianie */}
          <footer className="mt-16 pt-12 border-t border-white/10 text-center">
            <p className="text-white font-black uppercase text-xs mb-8 tracking-[0.2em]">
              Podaj informację dalej – udostępnij artykuł:
            </p>
            <SocialShareBar 
              message={`Warto przeczytać: ${post.title}`} 
              shareUrl={typeof window !== 'undefined' ? window.location.href : `https://mistrzowieregionu.pl/aktualnosci/${id}`} 
            />
          </footer>
        </article>
      </div>

    </div>
  );
}
