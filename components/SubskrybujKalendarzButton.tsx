'use client';
import React, { useState, useEffect } from 'react';
import { FaApple, FaGoogle, FaTimes, FaInfoCircle } from 'react-icons/fa';

export default function SubskrybujKalendarzButton({ rejonKey }: { rejonKey: string }) {
  const [showMenu, setShowMenu] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  // Ustawiamy bazowy URL dopiero po załadowaniu komponentu w przeglądarce
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.host);
    }
  }, []);

  if (!baseUrl) return null; // Nie renderuj przycisku, dopóki nie znamy URL

  // Automatyczny Cache Buster (unikalny stempel czasowy)
  const cacheBuster = new Date().getTime();

  // Dynamiczne ścieżki wymuszające odświeżenie pamięci podręcznej urządzeń
  const appleUrl = `webcal://${baseUrl}/kalendarze/${rejonKey}.ics?v=${cacheBuster}`;
  const googleUrl = `https://www.google.com/calendar/render?cid=${encodeURIComponent('webcal://' + baseUrl + '/kalendarze/' + rejonKey + '.ics?v=' + cacheBuster)}`;

  return (
    <div className="flex flex-col items-center mt-6 w-full relative font-montserrat">
      <button
        onClick={() => setShowMenu(true)}
        className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#0B1A30] font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 w-full max-w-sm uppercase tracking-tighter"
      >
        SUBSKRYBUJ KALENDARZ
      </button>

      {showMenu && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="bg-[#0B1A30] border-2 border-[#D4AF37] w-full max-w-md p-8 rounded-[2rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowMenu(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"><FaTimes size={24} /></button>
            <h3 className="text-[#D4AF37] text-xl font-black uppercase mb-6 text-center italic">Wybierz kalendarz</h3>
            
            <div className="space-y-4 mb-6">
              <button onClick={() => { window.location.href = appleUrl; setShowMenu(false); }} className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 p-4 rounded-xl text-left">
                <FaApple className="text-3xl text-white" />
                <div><div className="text-white font-bold text-sm">iPhone / Apple Calendar</div></div>
              </button>
              <button onClick={() => { window.open(googleUrl, '_blank'); setShowMenu(false); }} className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 p-4 rounded-xl text-left">
                <FaGoogle className="text-3xl text-[#4285F4]" />
                <div><div className="text-white font-bold text-sm">Google Calendar / Android</div></div>
              </button>
            </div>

            {/* Informacja UX dla mieszkańców */}
            <div className="bg-[#0B1A30] border border-[#D4AF37]/30 p-4 rounded-xl flex items-start gap-3">
              <FaInfoCircle className="text-[#D4AF37] text-xl shrink-0 mt-0.5" />
              <div className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-[#D4AF37] block mb-1">Ważna wskazówka dla Android (Google):</strong>
                Systemy Google często przetwarzają nowe subskrypcje z opóźnieniem. Jeśli po dodaniu nie widzisz dat, odczekaj lub dodaj kalendarz korzystając z komputera (PC). Pamiętaj o włączeniu przypomnień w opcjach wydarzenia!
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}