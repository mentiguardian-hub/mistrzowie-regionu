"use client";
import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../../lib/categories';
import { FaClock, FaMapMarkerAlt, FaTag, FaArrowRight } from 'react-icons/fa';
import SocialShareBar from '../../components/SocialShareBar';
import Link from 'next/link';

// 🚀 NOWE IMPORTY: Podłączenie przeglądarki bezpośrednio do bazy Firebase
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Classified {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: string;
  description: string;
  location: string;
  phone: string;
  images?: string[];
  obrazy?: string[];
  image_url?: string;
  createdAt: any;
  isGuest?: boolean;
}

export default function OgloszeniaView({ initialClassifieds }: { initialClassifieds: Classified[] }) {
  const [classifieds, setClassifieds] = useState<Classified[]>(initialClassifieds);
  const [activeCategory, setActiveCategory] = useState('Wiele Branż');

  // 🚀 NOWINKA TECHNICZNA: Pobieranie nowości w tle (Client-Side Fetching)
  useEffect(() => {
    const fetchLiveClassifieds = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'classifieds'));
        const liveData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis?.() || Date.now(),
          } as Classified;
        });

        // Sortowanie od najnowszych
        liveData.sort((a, b) => b.createdAt - a.createdAt);

        // Natychmiastowa podmiana starych danych na nowe
        setClassifieds(liveData);
      } catch (error) {
        console.error("Błąd pobierania danych na żywo:", error);
      }
    };

    fetchLiveClassifieds();
  }, []);

  const filteredClassifieds = activeCategory === 'Wiele Branż' 
    ? classifieds 
    : classifieds.filter(c => c.category === activeCategory);

  const calculateTimeAgo = (timestamp: any) => {
    if (!timestamp) return 'niedawno';
    const timeInMillis = timestamp.seconds ? timestamp.toMillis() : timestamp;
    const seconds = Math.floor((new Date().getTime() - timeInMillis) / 1000);
    if (seconds / 86400 > 1) return Math.floor(seconds / 86400) + " dni temu";
    if (seconds / 3600 > 1) return Math.floor(seconds / 3600) + " godz. temu";
    return "niedawno";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-montserrat flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <div className="w-full bg-[#0f172a] pt-32 pb-48 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#ff7b00] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Tablica Gminy</span>
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase text-white">
            Lokalna Giełda Ogłoszeń Nieporęt
          </h1>
          <Link href="/dodaj-ogloszenie" className="inline-block bg-[#ff7b00] text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">
            + Dodaj Ogłoszenie
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-12 overflow-x-auto hide-scrollbars pb-2">
            <button onClick={() => setActiveCategory('Wiele Branż')} className={`px-6 py-3 rounded-full font-black uppercase text-[10px] transition-all border ${activeCategory === 'Wiele Branż' ? 'bg-white text-[#0f172a]' : 'bg-white/10 text-white border-white/20'}`}>
              Wiele Branż
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat.slug} onClick={() => setActiveCategory(cat.name)} className={`px-6 py-3 rounded-full font-black uppercase text-[10px] transition-all border ${activeCategory === cat.name ? 'bg-white text-[#0f172a]' : 'bg-white/10 text-white border-white/20'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 -mt-8">
        <SocialShareBar message="Podoba Ci się nasza giełda? Udostępnij ją sąsiadom:" shareUrl="https://mistrzowieregionu.pl/ogloszenia" />

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[500px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClassifieds.map(ad => {
              const imagesArray = ad.obrazy || ad.images || [];
              const coverImage = (imagesArray.length > 0) ? imagesArray[0] : ad.image_url;
              const adPath = `/ogloszenia/szczegoly/${ad.slug || ad.id}`;
              
              return (
                <div key={ad.id} className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 flex flex-col h-full group hover:shadow-xl transition-all relative">
                  
                  {/* ZDJĘCIE JAKO LINK */}
                  <Link href={adPath} className="block w-full h-48 mb-6 rounded-xl overflow-hidden border-2 border-slate-100 group-hover:border-[#ff7b00] transition-colors">
                    {coverImage ? (
                      <img src={coverImage} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center opacity-30">
                        <img src="/logo.png" alt="" className="w-24" />
                      </div>
                    )}
                  </Link>

                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#0f172a] text-[#ff7b00] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"><FaTag className="inline mr-1"/> {ad.category}</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase"><FaClock className="inline mr-1"/> {calculateTimeAgo(ad.createdAt)}</span>
                  </div>

                  {/* TYTUŁ JAKO LINK */}
                  <Link href={adPath}>
                    <h3 className="text-xl font-black text-[#0f172a] leading-tight mb-2 uppercase group-hover:text-[#ff7b00] transition-colors">
                      {ad.title}
                    </h3>
                  </Link>
                  
                  <p className="text-slate-500 text-xs italic mb-6 flex-grow">{ad.description.slice(0, 100)}...</p>

                  <div className="border-t border-slate-200 pt-4 mt-auto">
                    <p className="text-2xl font-black mb-3 text-[#ff7b00]">{ad.price}</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
                      <FaMapMarkerAlt /> {ad.location}
                    </div>
                    
                    <Link 
                      href={adPath} 
                      className="w-full py-3 border-2 border-[#ff7b00] text-[#ff7b00] rounded-xl font-black uppercase text-[10px] text-center block hover:bg-[#ff7b00] hover:text-white transition-all"
                    >
                      Zobacz ogłoszenie <FaArrowRight className="inline ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12 mb-8 text-center">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
        </p>
      </div>
    </div>
  );
}