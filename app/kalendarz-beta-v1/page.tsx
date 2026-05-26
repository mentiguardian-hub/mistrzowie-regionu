'use client';

import React from 'react';

export default function Rejon4FinalPage() {
  
  // Dane z Twojego harmonogramu dla Rejonu 4
  const harmonogram = [
    { d: '2026-05-05', t: 'Bioodpady 🪵', id: 'bio' },
    { d: '2026-05-06', t: 'Zmieszane 🚮', id: 'zmieszane' },
    { d: '2026-05-08', t: 'Szkło 🍾', id: 'szklo' },
    { d: '2026-05-11', t: 'Papier 📦', id: 'papier' },
    { d: '2026-05-19', t: 'Bioodpady 🪵', id: 'bio' },
    { d: '2026-05-20', t: 'Zmieszane 🚮', id: 'zmieszane' },
    { d: '2026-05-26', t: 'Metale i Tworzywa ♻️', id: 'metale' }
  ];

  const generujPlikICS = () => {
    const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    
    // Budowa pliku z rygorystycznym CRLF (\r\n)
    let ics = "BEGIN:VCALENDAR\r\n";
    ics += "VERSION:2.0\r\n";
    ics += "PRODID:-//MistrzowieRegionu//Harmonogram//PL\r\n";
    ics += "METHOD:PUBLISH\r\n";
    ics += "X-WR-CALNAME:Harmonogram Wywozu - Rejon 4\r\n";

    harmonogram.forEach((ev) => {
      const startStr = ev.d.replace(/-/g, "");
      const startDate = new Date(ev.d);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      const endStr = endDate.toISOString().split('T')[0].replace(/-/g, "");

      ics += "BEGIN:VEVENT\r\n";
      // STAŁE UID: Zapewnia aktualizację zamiast dublowania [Twoja sugestia]
      ics += `UID:${startStr}-${ev.id}-rejon4@mistrzowieregionu.pl\r\n`;
      ics += `DTSTAMP:${dtstamp}\r\n`;
      ics += `DTSTART;VALUE=DATE:${startStr}\r\n`;
      ics += `DTEND;VALUE=DATE:${endStr}\r\n`;
      // CZYSTY TYTUŁ: Usunięto "JUTRO", by nie mylić w dniu wywozu [Twoja sugestia]
      ics += `SUMMARY:🚛 Wywóz: ${ev.t.toUpperCase()}\r\n`;
      ics += "DESCRIPTION:Wystaw kubel przed brame! Wieczorne przypomnienie od MistrzowieRegionu.pl\r\n";
      ics += "STATUS:CONFIRMED\r\n";
      // ALARM: 19:00 wieczorem dnia poprzedniego
      ics += "BEGIN:VALARM\r\n";
      ics += "TRIGGER:-PT5H\r\n"; 
      ics += "ACTION:DISPLAY\r\n";
      ics += `DESCRIPTION:🔔 JUTRO rano wywóz: ${ev.t}!\r\n`;
      ics += "END:VALARM\r\n";
      ics += "END:VEVENT\r\n";
    });

    ics += "END:VCALENDAR\r\n"; // Dodatkowa nowa linia na końcu pliku [Twoja sugestia]

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'harmonogram_rejon4_pancerny.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col items-center justify-center font-sans italic text-center">
      <div className="max-w-md w-full bg-[#1e293b] p-8 rounded-[3rem] shadow-2xl border-b-8 border-[#d4af37]">
        <h1 className="text-3xl font-black mb-2 uppercase italic tracking-tighter text-[#d4af37]">REJON 4</h1>
        <p className="text-slate-400 text-[10px] font-black tracking-widest mb-10 uppercase">Ostateczny Test Mechanizmu</p>
        
        <button 
          onClick={generujPlikICS}
          className="w-full bg-[#d4af37] text-black py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-transform"
        >
          POBIERZ I SPRAWDŹ KALENDARZ
        </button>

        <div className="mt-8 text-left bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-[9px] text-slate-300 uppercase leading-relaxed font-bold">
            <span className="text-[#d4af37]">Zaimplementowane poprawki:</span><br/>
            ✅ Stałe UID (brak duplikatów przy ponownym pobraniu)<br/>
            ✅ Czyste nazewnictwo (tylko typ odpadu)<br/>
            ✅ Przypomnienie o 19:00 przeniesione do treści alarmu<br/>
            ✅ Prawidłowe zakończenie pliku (\r\n)
          </p>
        </div>
      </div>
    </div>
  );
}