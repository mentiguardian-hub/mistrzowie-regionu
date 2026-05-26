'use client';

import React from 'react';
import wasteData from '@/src/data/wasteData.json'; 
import { FaCalendarPlus } from 'react-icons/fa';

export default function PobierzKalendarzButton({ rejonKey }: { rejonKey: string }) {
  
  const generujPlikICS = () => {
    const rejonDane = (wasteData as any)[rejonKey];
    
    if (!rejonDane) {
      alert("Brak danych kalendarza dla tego rejonu.");
      return;
    }

    const czyNaPewnoUlica = window.confirm(
      `POTWIERDŹ: Czy Twój rejon/ulica to na pewno: ${rejonDane.name.toUpperCase()}?`
    );
    if (!czyNaPewnoUlica) return;

    const czyAkceptujeUsuwanie = window.confirm(
      "UWAGA: Jeśli się pomylisz, będziesz musiał usuwać każde wydarzenie z kalendarza PO KOLEI (nie da się ich usunąć jednym kliknięciem). Czy na pewno chcesz kontynuować?"
    );
    if (!czyAkceptujeUsuwanie) return;

    const harmonogram: any[] = [];
    const mapowanie: Record<string, { t: string, id: string }> = {
      zmieszane: { t: 'Zmieszane 🚮', id: 'zmieszane' },
      metale: { t: 'Metale i Tworzywa ♻️', id: 'metale' },
      papier: { t: 'Papier 📦', id: 'papier' },
      szklo: { t: 'Szkło 🍾', id: 'szklo' },
      bio: { t: 'Bioodpady 🪵', id: 'bio' }
    };

    Object.keys(mapowanie).forEach(kategoria => {
      if (rejonDane[kategoria]) {
        rejonDane[kategoria].forEach((dataWywozu: string) => {
          harmonogram.push({
            d: dataWywozu,
            t: mapowanie[kategoria].t,
            id: mapowanie[kategoria].id
          });
        });
      }
    });

    const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    let ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MistrzowieRegionu//Harmonogram//PL\r\nMETHOD:PUBLISH\r\n";
    ics += `X-WR-CALNAME:Wywóz - ${rejonDane.name}\r\n`;

    harmonogram.forEach((ev) => {
      const startStr = ev.d.replace(/-/g, "");
      const startDate = new Date(ev.d);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
      const endStr = endDate.toISOString().split('T')[0].replace(/-/g, "");

      ics += "BEGIN:VEVENT\r\n";
      ics += `UID:${startStr}-${ev.id}-${rejonKey}@mistrzowieregionu.pl\r\n`;
      ics += `DTSTAMP:${dtstamp}\r\n`;
      ics += `DTSTART;VALUE=DATE:${startStr}\r\n`;
      ics += `DTEND;VALUE=DATE:${endStr}\r\n`;
      
      // Tytuł ze śmieciarką i rodzajem odpadu
      ics += `SUMMARY:🚚 ${ev.t.toUpperCase()} [${rejonDane.name}]\r\n`;
      
      // 🚀 ZWRÓCONA INSTRUKCJA: Pojemnik przed bramę + Rejon
      ics += `DESCRIPTION:Wystaw pojemnik przed bramę! Rejon: ${rejonDane.name}\r\n`;
      
      ics += "STATUS:CONFIRMED\r\n";
      ics += "BEGIN:VALARM\r\nTRIGGER:-PT5H\r\nACTION:DISPLAY\r\n";
      ics += `DESCRIPTION:🚚 JUTRO wywóz: ${ev.t}\r\nEND:VALARM\r\nEND:VEVENT\r\n`;
    });

    ics += "END:VCALENDAR\r\n";

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `harmonogram_${rejonKey}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <button 
        onClick={generujPlikICS}
        className="w-full flex items-center justify-center gap-3 py-4 mb-4 bg-[#0f172a] border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#1e293b] hover:border-white transition-all shadow-lg active:scale-95 group"
      >
        <FaCalendarPlus className="text-lg transition-transform group-hover:scale-110" />
        ZAPISZ W KALENDARZU
      </button>
      <p className="text-[9px] text-slate-400 text-center px-4 leading-relaxed italic uppercase tracking-tighter">
        ⚠️ Przed pobraniem sprawdź rejon. Błędne daty trzeba usuwać z kalendarza ręcznie.
      </p>
    </div>
  );
}