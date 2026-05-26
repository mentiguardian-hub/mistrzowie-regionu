"use client";
import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('Użytkownik anulował udostępnianie');
      }
    } else {
      // Fallback: Jeśli przeglądarka nie wspiera Web Share (np. stary komputer), kopiujemy do schowka
      navigator.clipboard.writeText(url);
      alert('Link został skopiowany do schowka!');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center justify-center gap-4 bg-white border-2 border-slate-200 text-[#0f172a] px-10 py-5 rounded-2xl hover:border-[#ff7b00] hover:text-[#ff7b00] transition-all shadow-sm group w-full md:w-auto"
    >
      <FaShareAlt className="text-2xl text-slate-400 group-hover:text-[#ff7b00]" />
      <div className="text-left">
        <p className="text-[9px] font-black uppercase opacity-50">Poleć ogłoszenie</p>
        <p className="text-xl font-black">UDOSTĘPNIJ</p>
      </div>
    </button>
  );
}