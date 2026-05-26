"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPaperPlane, FaCheckCircle, FaAward, FaSpinner, FaStar } from 'react-icons/fa';
import { db } from '@/lib/firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PolecFachowca() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  const [category, setCategory] = useState(""); 
  const [recommendation, setRecommendation] = useState(""); 
  const [reason, setReason] = useState(""); 
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert("Proszę, wybierz ocenę (ilość gwiazdek) przed wysłaniem opinii.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "ankiety_polecenia"), {
        kategoria: category.trim().toLowerCase(),
        polecana_firma: recommendation,
        ocena: rating,
        uzasadnienie: reason,
        data: serverTimestamp(),
        status: "nowe"
      });
      
      setSent(true);
    } catch (error) {
      console.error("Błąd zapisu:", error);
      alert("Wystąpił błąd przy wysyłaniu. Sprawdź połączenie z bazą.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    const handleShare = async () => {
      const shareData = {
        title: 'Mistrzowie Regionu - Polecam Fachowca!',
        text: `Poleciłem świetnego fachowca na portalu Mistrzowie Regionu. Sprawdź lokalny ranking!`,
        url: window.location.href, 
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          alert("Link skopiowany do schowka!");
        }
      } catch (err) {
        console.error("Błąd udostępniania:", err);
      }
    };

    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 font-montserrat">
        <div className="text-center p-12 bg-white/[0.02] border border-[#d4af37]/30 rounded-[3rem] max-w-md w-full">
          <FaCheckCircle className="text-[#d4af37] text-7xl mx-auto mb-6 animate-pulse" />
          <h2 className="text-white text-3xl font-black uppercase italic">DZIĘKUJEMY!</h2>
          <p className="text-slate-400 mt-2 uppercase text-[9px] tracking-[0.3em] mb-10">Twoja opinia buduje rzetelność portalu.</p>
          
          <div className="flex flex-col gap-4">
            <button onClick={handleShare} className="w-full bg-[#d4af37] text-[#0f172a] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3">
              Udostępnij Portal <FaPaperPlane />
            </button>
            <button onClick={() => setSent(false)} className="w-full bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-[#d4af37]/50 transition-all">
              Poleć kogoś jeszcze
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-32 pb-10 px-6 font-montserrat relative overflow-hidden">
      
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 px-4 py-2 rounded-full mb-6 border border-[#d4af37]/20">
            <FaAward className="text-[#d4af37] text-xs" />
            <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em]">Ranking Mieszkańców</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white italic leading-tight uppercase mb-4 tracking-tight">
            POLEĆ <span className="text-[#d4af37]">FACHOWCA</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Znasz rzetelnego fachowca? Wypełnij formularz i pomóż innym mieszkańcom znaleźć Mistrzów Regionu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0b1120] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            <div>
              <label className="block text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Jaka to branża?</label>
              <input required value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="np. Elektryk, Malarz..." className="w-full bg-[#d4af37]/5 border border-[#d4af37]/30 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#d4af37] transition-all" />
            </div>

            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Nazwa firmy lub Imię Fachowca</label>
              <input required value={recommendation} onChange={(e) => setRecommendation(e.target.value)} type="text" placeholder="np. Jan Kowalski..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-slate-400 transition-all" />
            </div>

            <div className="py-2">
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Twoja ogólna ocena</label>
              <div className="flex gap-3 justify-center bg-white/5 py-4 rounded-2xl border border-white/5">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <button type="button" key={ratingValue} onClick={() => setRating(ratingValue)} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(rating)} className="focus:outline-none transition-transform hover:scale-125">
                      <FaStar className={`text-4xl ${ratingValue <= (hover || rating) ? 'text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'text-white/10'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 ml-2">Dlaczego polecasz?</label>
              <textarea required value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Napisz kilka słów o jakości i cenie..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white outline-none focus:border-slate-400 transition-all h-32 resize-none" />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-[#d4af37] hover:bg-white text-[#0f172a] py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 disabled:opacity-50">
              {loading ? <FaSpinner className="animate-spin text-xl" /> : <FaPaperPlane className="text-xl" />} 
              {loading ? "WYSYŁANIE..." : "WYŚLIJ SWÓJ GŁOS"}
            </button>
          </div>
        </form>

        {/* DODANA STOPKA ZGODNIE Z WYMAGANIEM */}
        <footer className="mt-12 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
          </p>
        </footer>
      </div>
    </div>
  );
}