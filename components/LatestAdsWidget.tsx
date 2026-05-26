"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBuilding } from 'react-icons/fa';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

interface Ad {
  id: string;
  title: string;
  category: string;
  createdAt: number;
}

export default function LatestAdsWidget() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const CACHE_KEY = 'mistrzowie_latest_ads_cache';
        const CACHE_TIME = 5 * 60 * 1000; // 5 minut

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TIME) {
            setAds(parsed.data);
            setLoading(false);
            return;
          }
        }

        const q = query(
          collection(db, 'ogloszenia'),
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );

        const snapshot = await getDocs(q);
        let fetchedAds: Ad[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          fetchedAds.push({
            id: doc.id,
            title: data.title,
            category: data.category,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now()
          });
        });

        // Weryfikacja 24-godzinna dla algorytmu rotacyjnego
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const now = Date.now();
        let displayAds = fetchedAds.slice(0, 4);

        if (fetchedAds.length > 0 && (now - fetchedAds[0].createdAt > ONE_DAY)) {
          // Brak świeżych w ostatnich 24h -> rotujemy widok dla lepszej dynamiki wrażenia
          displayAds = fetchedAds.sort(() => 0.5 - Math.random()).slice(0, 4);
        }

        setAds(displayAds);
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: displayAds
        }));
      } catch (error) {
         console.error('Error fetching latest ads', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <Link href="/ogloszenia" className="block max-w-5xl mx-auto text-center border border-slate-200 bg-white rounded-[3rem] p-12 md:p-24 shadow-xl relative overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(181,148,16,0.2)] transition-all duration-500 cursor-pointer min-h-[450px] flex flex-col items-center justify-center">
      <div className="absolute -top-10 -right-10 text-[#d4af37] opacity-5 text-9xl group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <FaBuilding />
      </div>

      <span className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block group-hover:text-[#d4af37] transition-colors z-10">Platforma lokalna</span>
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#0f172a] mb-12 z-10 relative">
        Lokalna Giełda <br /> <span className="text-[#d4af37] drop-shadow-sm group-hover:brightness-110 transition-all">Nieporęt</span>
      </h2>

      <div className="w-full max-w-xl mx-auto z-10 min-h-[140px] flex flex-col justify-center">
        {loading ? (
          <div className="flex flex-col gap-4 text-left w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 bg-slate-100 rounded-md animate-pulse w-full relative overflow-hidden">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5 text-left w-full text-slate-700 text-sm xl:text-base font-medium">
            {ads.length > 0 ? ads.map(ad => (
              <div key={ad.id} className="truncate group-hover:text-[#0f172a] transition-colors border-b border-slate-100 pb-3 last:border-0 last:pb-0 flex items-center">
                <span className="text-[#d4af37] font-black mr-3 text-xs tracking-widest uppercase opacity-80 shrink-0">[{ad.category}]</span> 
                <span className="truncate">{ad.title}</span>
              </div>
            )) : (
              <div className="text-center text-slate-500 italic font-normal py-6">Tablica dzisiaj czeka na Ciebie. Bądź pierwszy i wystaw swoje pierwsze ogłoszenie!</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-14 inline-block bg-slate-50 border border-[#d4af37]/30 text-[#d4af37] px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest group-hover:bg-[#d4af37] group-hover:text-white transition-all shadow-sm z-10">
        ZOBACZ WSZYSTKIE OGŁOSZENIA
      </div>
    </Link>
  );
}
