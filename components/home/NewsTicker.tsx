"use client";
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function NewsTicker() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news_ticker'), orderBy('createdAt', 'desc'), limit(5));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
           const fetchedMessages = snap.docs.map(doc => doc.data().content);
           setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error("Błąd pobierania:", error);
      }
    };

    fetchNews();
  }, []);

  if (messages.length === 0) return null;

  return (
    <div className="bg-white text-[#0f172a] text-xs font-bold py-2 flex items-center relative z-50 overflow-hidden border-b border-slate-200">
      
      {/* ETYKIETA "NA ŻYWO" (Zawsze statyczna na wierzchu) */}
      <div className="px-4 z-10 bg-white flex items-center gap-2 font-black tracking-widest uppercase shrink-0 relative shadow-[15px_0_15px_-5px_rgba(255,255,255,1)] border-r border-slate-100">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
        Na Żywo
      </div>
      
      {/* ZAAWANSOWANY KONTENER PRZEWIJANIA (PERFEKCYJNA PĘTLA) */}
      <div className="flex flex-1 overflow-hidden group">
        
        {/* WAGON 1: Gwarantuje minimalną szerokość całego ekranu */}
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 px-12">
          {messages.map((msg, idx) => (
             <span key={`b1-${idx}`} className="uppercase whitespace-nowrap">★ {msg}</span>
          ))}
        </div>
        
        {/* WAGON 2: Identyczny klon jadący tuż za pierwszym */}
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 px-12" aria-hidden="true">
          {messages.map((msg, idx) => (
             <span key={`b2-${idx}`} className="uppercase whitespace-nowrap">★ {msg}</span>
          ))}
        </div>

      </div>
    </div>
  );
}