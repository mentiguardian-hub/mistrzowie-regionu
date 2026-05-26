"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaTag, FaChevronRight } from 'react-icons/fa';

interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  image_url: string;
  createdAt: any;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
       // SZUKAJ TEGO FRAGMENTU W PLIKU app/blog/page.tsx:
const q = query(
  collection(db, 'blog_posts'),
  orderBy('createdAt', 'desc')
);
        const sn = await getDocs(q);
        const fetched = sn.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setPosts(fetched);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Brak daty';
    const d = timestamp.toDate();
    return new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-montserrat">
      
      {/* HERO BLOG HEADER */}
      <section className="bg-[#001f3f] pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888086952-0cd243141f18?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7b00]/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#ff7b00] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Dziennik Liderów</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none drop-shadow-2xl">
            Głos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">Nieporętu</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Mowa nienawiści zostaje za burtą. Odkryj unikalne, luksusowe teksty ostrzegające przed oszustami, radzące gdzie oszczędzać i promujące lokalnych bohaterów. Opowiadane przez mieszkańców.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/dodaj-wpis" className="bg-[#ff7b00] hover:bg-[#e66a00] text-white px-10 py-4 rounded-full font-black uppercase text-sm tracking-widest shadow-lg shadow-orange-500/30 hover:scale-105 transition-all">
              Opublikuj Artykuł
            </Link>
          </div>
        </div>
      </section>

      {/* FEED MASONRY/GRID */}
      <section className="py-24 px-6 relative z-20 -mt-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
               <div className="w-16 h-16 border-4 border-[#001f3f] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Pobieranie archiwalnych artykułów...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-16 text-center shadow-xl border border-slate-100">
               <span className="text-6xl mb-6 block">📰</span>
               <h3 className="text-3xl font-black text-[#0f172a] uppercase tracking-tighter mb-4">Tablica Czeka na Twój Rękopis</h3>
               <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">Aktualnie portal nie wydał jeszcze żadnych akredytacji na artykuły. Bądź pierwszym lokalnym dziennikarzem, który naświetli ważną sprawę.</p>
               <Link href="/dodaj-wpis" className="bg-[#001f3f] text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest">Zapoczątkuj Bloga</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col group hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(14,61,38,0.1)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    <div className="absolute top-4 left-4 bg-[#ff7b00] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
                      <FaTag /> {post.category || 'Ogólne'}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1.5 whitespace-nowrap"><FaCalendarAlt /> {formatDate(post.createdAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                      <span className="flex items-center gap-1.5 truncate"><FaUser /> {post.author_name}</span>
                    </div>

                    <h2 className="text-2xl font-black text-[#001f3f] leading-tight mb-4 group-hover:text-[#ff7b00] transition-colors line-clamp-3 uppercase tracking-tighter">
                      {post.title}
                    </h2>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                      {post.content}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100">
                      {/* NAPRAWIONY PRZYCISK - TERAZ TO LINK DO DYNAMICZNEJ PODSTRONY */}
                      <Link 
                        href={`/blog/${post.slug || post.id}`}
                        className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[#001f3f] group-hover:text-[#ff7b00] transition-colors border-b-2 border-transparent group-hover:border-[#ff7b00] pb-1 w-max cursor-pointer"
                      >
                        Czytaj Więcej <FaChevronRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}