"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPaperPlane, FaCheckCircle, FaAward, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AnkietaClientView({ slug }: { slug: string }) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [reason, setReason] = useState("");
  const [otherCategory, setOtherCategory] = useState("");

  const getTitle = (s: string) => {
    const titles: Record<string, string> = {
      szamba: "FIRMĘ ASENIZACYJNĄ",
      prad: "LOKALNEGO ELEKTRYKA",
      dodaj: "FACHOWCA GODNEGO POLECENIA",
      hydraulik: "DOBREGO HYDRAULIKA",
      malarz: "SPRAWDZONEGO MALARZA"
    };
    return titles[s] || s.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalCategory = (slug === 'dodaj' && otherCategory.trim() !== "") 
        ? otherCategory.trim().toLowerCase() 
        : slug;

      await addDoc(collection(db, "ankiety_polecenia"), {
        kategoria: finalCategory,
        polecana_firma: recommendation,
        uzasadnienie: reason,
        data: serverTimestamp(),
        status: "nowe"
      });
      
      setSent(true);
    } catch (error) {
      console.error("Błąd zapisu:", error);
      alert("Wystąpił błąd przy wysyłaniu.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 font-montserrat">
        <div className="text-center p-12 bg-white/[0.02] border border-[#d4af37]/30 rounded-[3rem]">
          <FaCheckCircle className="text-[#d4af37] text-7xl mx-auto mb-6" />
          <h2 className="text-white text-3xl font-black uppercase italic">DZIĘKUJEMY!</h2>
          <button onClick={() => router.push('/ankieta')} className="mt-8 bg-[#d4af37] text-[#0f172a] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
            Wróć do wyboru kategorii
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-32 pb-10 px-6 font-montserrat">
      <div className="max-w-xl mx-auto">
        <button onClick={() => router.push('/ankieta')} className="text-slate-500 hover:text-[#d4af37] text-[9px] font-black uppercase tracking-widest mb-8 flex items-center gap-2 transition-colors">
          <FaArrowLeft /> Powrót
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 px-4 py-2 rounded-full mb-4 border border-[#d4af37]/20">
            <FaAward className="text-[#d4af37] text-xs" />
            <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-widest">Głos Mieszkańców Regionu</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white italic leading-tight uppercase">
            CZY ZNASZ <span className="text-[#d4af37]">{getTitle(slug)}</span>?
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            {slug === 'dodaj' && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="block text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Jaka to branża?</label>
                <input required value={otherCategory} onChange={(e) => setOtherCategory(e.target.value)} type="text" placeholder="np. Dekarz, Mechanik..." className="w-full bg-[#d4af37]/10 border border-[#d4af37]/50 rounded-2xl px-6 py-4 text-[#d4af37] outline-none placeholder:text-[#d4af37]/50" />
              </div>
            )}
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Nazwa firmy / Fachowiec</label>
              <input required value={recommendation} onChange={(e) => setRecommendation(e.target.value)} type="text" placeholder="Wpisz kogo chcesz ocenić..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#d4af37]/50 transition-all" />
            </div>
            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Dlaczego polecasz?</label>
              <textarea required value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Napisz kilka słów..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#d4af37]/50 transition-all h-32 resize-none" />
            </div>
            <button disabled={loading} type="submit" className="w-full bg-[#d4af37] hover:bg-white text-[#0f172a] py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />} 
              {loading ? "PRZETWARZANIE..." : "WYŚLIJ SWÓJ GŁOS"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}