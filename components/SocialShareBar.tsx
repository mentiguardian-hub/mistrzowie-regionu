"use client";

import React, { useState } from 'react';
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaLink } from 'react-icons/fa';

interface SocialShareBarProps {
  message: string;
  shareUrl: string;
}

export default function SocialShareBar({ message, shareUrl }: SocialShareBarProps) {
  const [showToast, setShowToast] = useState(false);

  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShare = `https://api.whatsapp.com/send?text=${encodeURIComponent('Hej! Sprawdź to, przyda Ci się: ' + shareUrl)}`;
  const mailShare = `mailto:?subject=${encodeURIComponent('Ciekawa strona z Gminy Nieporęt')}&body=${encodeURIComponent('Znalazłem bardzo przydatny link dotyczący naszej okolicy: ' + shareUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative">
      {/* SOCIAL SHARE BAR PREMIUM */}
      <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 shadow-sm rounded-[2rem] p-5 md:p-6 my-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-lg w-full z-10 relative">
        <p className="text-[#001f3f] font-bold font-montserrat text-sm md:text-base text-center md:text-left">
          {message}
        </p>
        <div className="flex items-center gap-4">
          <a 
            href={fbShare} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#b59410] hover:text-[#001f3f] hover:scale-110 transition-all border border-[#b59410]/20"
          >
            <FaFacebookF className="text-xl" />
          </a>
          <a 
            href={waShare} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#b59410] hover:text-[#001f3f] hover:scale-110 transition-all border border-[#b59410]/20"
          >
            <FaWhatsapp className="text-xl" />
          </a>
          <a 
            href={mailShare} 
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#b59410] hover:text-[#001f3f] hover:scale-110 transition-all border border-[#b59410]/20"
          >
            <FaEnvelope className="text-xl" />
          </a>
          <button 
            onClick={handleCopy}
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#b59410] hover:text-[#001f3f] hover:scale-110 transition-all border border-[#b59410]/20"
          >
            <FaLink className="text-xl" />
          </button>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] bg-[#001f3f] text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-5 fade-out duration-300 border-2 border-[#b59410] flex items-center gap-3">
          <span className="text-[#b59410] text-lg">✓</span> Skopiowano Pomyślnie!
        </div>
      )}
    </div>
  );
}
