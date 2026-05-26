import React from 'react';
import { Metadata, Viewport } from 'next';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaCalendarAlt, FaUser, FaChevronLeft, FaClock, FaQuoteLeft } from 'react-icons/fa';

// 1. KONFIGURACJA VIEWPORT
export const viewport: Viewport = {
  themeColor: '#001f3f',
};

// 2. KLUCZ DO EKSPORTU
export const dynamicParams = false;

// 3. GENEROWANIE PARAMETRÓW DLA BLOGA
export async function generateStaticParams() {
  try {
    const q = query(collection(db, 'blog_posts'));
    const snap = await getDocs(q);
    
    return snap.docs.map(doc => ({
      slug: doc.data().slug || doc.id
    }));
  } catch (error) {
    console.error("Błąd podczas generateStaticParams dla bloga:", error);
    return [];
  }
}

// 4. METADANE DLA GOOGLE (SEO)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = query(collection(db, 'blog_posts'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  
  const data = !snap.empty ? snap.docs[0].data() : null;

  if (!data) return { title: 'Artykuł | Mistrzowie Regionu' };

  return {
    title: `${data.title} | Mistrzowie Regionu`,
    description: data.content?.substring(0, 160),
    alternates: {
      canonical: `https://mistrzowieregionu.pl/blog/${slug}/`,
    },
    openGraph: {
      title: data.title,
      images: [data.image_url || '/logo.png'],
    }
  };
}

// 5. GŁÓWNA STRONA ARTYKUŁU
export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: any = null;

  const q = query(collection(db, 'blog_posts'), where('slug', '==', slug), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    post = querySnapshot.docs[0].data();
  }

  if (!post) notFound();

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Brak daty';
    const d = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
  };

  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-montserrat">
      
      {/* NAGŁÓWEK ARTYKUŁU (HERO) */}
      <header className="relative pt-48 pb-32 px-6 bg-[#001f3f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#001f3f] z-10"></div>
        <img 
          src={post.image_url} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        <div className="max-w-4xl mx-auto relative z-20">
          <Link href="/blog/" className="inline-flex items-center gap-2 text-[#ff7b00] font-black uppercase tracking-widest text-[10px] mb-8 hover:translate-x-[-5px] transition-transform">
            <FaChevronLeft /> Powrót do Bloga
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#ff7b00] text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter mb-8 drop-shadow-2xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-slate-300 text-[10px] font-bold uppercase tracking-widest border-t border-white/10 pt-8">
            <span className="flex items-center gap-2"><FaUser className="text-[#ff7b00]" /> {post.author_name}</span>
            <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#ff7b00]" /> {formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-2"><FaClock className="text-[#ff7b00]" /> Czytanie: ok. 4 min</span>
          </div>
        </div>
      </header>

      {/* TREŚĆ ARTYKUŁU */}
      <article className="py-24 px-6 max-w-4xl mx-auto relative z-30 -mt-16">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-slate-50">
          <div className="prose prose-slate prose-lg max-w-none">
            {post.content ? (() => {
              // BEZPIECZNY PARSER: Używamy kodów Unicode (\u{...}) zamiast surowych ikon
              // \u{1F4B0} = 💰, \u{1F9D0} = 🧐, \u{1F6E0} = 🛠️, \u{1F4A1} = 💡, \u{1F3C6} = 🏆
              const sections = post.content
                .replace(/([\u{1F4B0}\u{1F9D0}\u{1F6E0}\u{1F4A1}\u{1F3C6}•])/gu, '\n$1') 
                .split('\n')
                .map((p: string) => p.trim())
                .filter((p: string) => p.length > 0);

              return sections.map((paragraph: string, index: number) => {
                // Filtrowanie zbytecznego tekstu na końcu
                if (paragraph.startsWith('👉 Kliknij i zamów')) return null;

                // Sprawdzamy czy to nagłówek z ikoną (bezpieczny test regex z Unicode + flaga u)
                const isHeader = /^([\u{1F4B0}\u{1F9D0}\u{1F6E0}\u{1F4A1}\u{1F3C6}])/u.test(paragraph);

                if (isHeader) {
                  return (
                    <h2 key={index} className="text-2xl font-black text-[#001f3f] mt-12 mb-6 uppercase tracking-tight block">
                      {paragraph}
                    </h2>
                  );
                }

                // Dynamiczne elementy listy wypunktowanej
                if (paragraph.startsWith('•') || paragraph.startsWith('-')) {
                  return (
                    <li key={index} className="text-slate-600 leading-[1.8] ml-6 mb-2 font-medium text-lg list-disc">
                      {paragraph.replace(/^[•-]\s*/, '')}
                    </li>
                  );
                }

                // Standardowy akapit tekstu
                return (
                  <p key={index} className="text-slate-600 leading-[1.8] mb-6 font-medium text-lg block">
                    {paragraph}
                  </p>
                );
              });
            })() : (
              <p className="text-slate-400 italic">Brak treści artykułu.</p>
            )}

            {/* 🚀 NOWOCZESNY SEKTOR CALL TO ACTION (SYSTEM EXPRESS-WYWÓZ) 🚀 */}
            {slug?.includes('szamba') && (
              <div className="mt-16 p-8 bg-amber-500/5 border-2 border-dashed border-[#d4af37] rounded-3xl text-center">
                <p className="font-bold text-[#001f3f] mb-4 text-lg">
                  Chcesz zamówić ekspresowy wywóz szamba w 30 sekund bez dzwonienia?
                </p>
                <Link 
                  href="/zamow-wywoz/" 
                  className="inline-flex items-center justify-center bg-[#d4af37] text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest text-xs hover:bg-[#001f3f] hover:text-white transition-all shadow-xl shadow-[#d4af37]/20"
                >
                  👉 Przejdź do formularza i zamów wywóz online
                </Link>
              </div>
            )}
          </div>

          {/* STOPKA ARTYKUŁU */}
          <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#001f3f] rounded-full flex items-center justify-center text-[#ff7b00]">
                   <FaQuoteLeft />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status Wpisu</p>
                   <p className="text-sm font-bold text-[#001f3f]">Zweryfikowany przez Redakcję</p>
                </div>
             </div>
             
             <button 
               className="bg-slate-50 hover:bg-slate-100 text-[#001f3f] px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors border border-slate-200"
               // @ts-ignore
               style={{ cursor: 'pointer' }}
             >
                Drukuj Artykuł
             </button>
          </div>
        </div>
      </article>

      {/* FOOTER Z INFORMACJĄ O PROJEKTANCIE */}
      <footer className="py-12 px-6 bg-slate-50 border-t border-slate-100 text-center">
         <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.3em]">
            Mistrzowie Regionu &copy; 2026 | Projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
         </p>
      </footer>
    </div>
  );
}