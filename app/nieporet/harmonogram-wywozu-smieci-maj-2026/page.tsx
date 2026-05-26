"use client";
import React, { useState, useEffect } from 'react';
import { ScheduleTemplate } from '@/components/ScheduleTemplate';
import { FaMobileAlt, FaExclamationTriangle } from 'react-icons/fa';
// IMPORT TWOJEJ BAZY DANYCH
import wasteData from '@/src/data/wasteData.json';

export default function HarmonogramMaj() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // FUNKCJA AUTOMATYCZNIE WYCIĄGAJĄCA DNI DLA MAJA (05)
  const getMayDays = (datesArray: string[] | undefined) => {
    if (!datesArray) return "--";
    // Filtrujemy tylko daty z maja 2026
    const mayDates = datesArray
      .filter(date => date.startsWith('2026-05'))
      .map(date => parseInt(date.split('-')[2]).toString()); // zamiana "2026-05-06" na "6"
    
    return mayDates.length > 0 ? mayDates.join(', ') : "--";
  };

  // DYNAMICZNA MAPA SEKTORÓW (Ulice zostają, daty idą z JSONa)
  const nieporetSectorsMay = [
    { 
      id: 1, name: "Rejon I", 
      places: "BENIAMINÓW, BIAŁOBRZEGI, RYNIA, NIEPORĘT: Kapitana Stefana Pogonowskiego, Pilawa, Wieczornej Bryzy, Wojska Polskiego", 
      zmieszane: getMayDays(wasteData.rejon1.zmieszane),
      bio: getMayDays(wasteData.rejon1.bio),
      tworzywa: getMayDays(wasteData.rejon1.metale),
      papier: getMayDays(wasteData.rejon1.papier),
      szklo: getMayDays(wasteData.rejon1.szklo)
    },
    { 
      id: 2, name: "Rejon II", 
      places: "STANISŁAWÓW PIERWSZY: Allegro, Barokowa, Borówkowa, Brukowa, Brzozy, Cyprysowa, Drozdowa, Geodetów, Harmonii, Iglasta, Jagodowa, Jana Kazimierza, Jarzębiny, Jasna, Jodłowa, Kalinowa, Koncertowa, Konwaliowa, Leśny Zakątek, Lisia, Operowa, Paproci, Pięciolinii, Pogodna, Promykowa, Rajska, Regatowa, Słoneczna, Smyczkowa, Sokoła, Sonaty, Spełnionych Marzeń, Stolnika, Strużańska, Swingowa, Świerkowa, Tęczowa, Warsztatowa, Wesoła, Wiolinowa, Wojskiego, Wolfganga A. Mozarta, Zajazdowa, Złotych Piasków", 
      zmieszane: getMayDays(wasteData.rejon2.zmieszane),
      bio: getMayDays(wasteData.rejon2.bio),
      tworzywa: getMayDays(wasteData.rejon2.metale),
      papier: getMayDays(wasteData.rejon2.papier),
      szklo: getMayDays(wasteData.rejon2.szklo)
    },
    { 
      id: 3, name: "Rejon III", 
      places: "NIEPORĘT: Adama Mickiewicza, Asesora, Babinicza, Butryma, Chabrowa, Chłodna, Dworcowa, Dzikiej Róży, Epopei, Gerwazego, Irysowa, Jacka Soplicy, Jana III, Jana Kazimierza, Lazurowa, Myśliwska, Ogrodowa, Pana Tadeusza, Pionierska, Plac Wolności, Podkomorzego, Podleśna, Protazego, Rejenta, Rejtana, Różana, Sasankowa, Soplicowo, Szafirowa, Szkolna, Szlachecka, Telimeny, Tulipanowa, Zamkowa", 
      zmieszane: getMayDays(wasteData.rejon3.zmieszane),
      bio: getMayDays(wasteData.rejon3.bio),
      tworzywa: getMayDays(wasteData.rejon3.metale),
      papier: getMayDays(wasteData.rejon3.papier),
      szklo: getMayDays(wasteData.rejon3.szklo)
    },
    { 
      id: 4, name: "Rejon IV", 
      places: "NIEPORĘT: Agawy, Aleja Henryka Sienkiewicza, Baśki, Cyklistów, Czajki, Czarnieckiego, Heleny, Hubala, Husarii, Inwokacji, Izabelińska, Jana Kochanowskiego, Jaremy, Jaskółki, Kapitana Benedykta Pęczkowskiego, Ketlinga, Kmicica, Kordeckiego, Kresowa, Lawendowa, Literacka, Małołęcka, Marsa, Michała, Motylkowa, Nastrojowa, Niezapominajki, Nowolipie, Odrodzenia, Oleńki, Polna, Polnych Kwiatów, Potocka, Powstańców, Przyjaciół, Ptasia, Rocha, Rynek, Sielankowa, Skrzetuskiego, Starej Gruszy, Świętej Agaty, Świętego Huberta, Turkusowa, Wazów, Zagłoby, Zosi, Zwycięstwa, Żeglarska, Żurawia", 
      zmieszane: getMayDays(wasteData.rejon4.zmieszane),
      bio: getMayDays(wasteData.rejon4.bio),
      tworzywa: getMayDays(wasteData.rejon4.metale),
      papier: getMayDays(wasteData.rejon4.papier),
      szklo: getMayDays(wasteData.rejon4.szklo)
    },
    { 
      id: 5, name: "Rejon V", 
      places: "WÓLKA RADZYMIŃSKA, ZEGRZE POŁUDNIOWE, NIEPORĘT: Białego Bzu, Brzozowa, Fiołkowa, Kwitnącej Wiśni, Maciejki, Pszeniczna, Rumiankowa, Spokojna, Stokrotki, Zegrzyńska", 
      zmieszane: getMayDays(wasteData.rejon5.zmieszane),
      bio: getMayDays(wasteData.rejon5.bio),
      tworzywa: getMayDays(wasteData.rejon5.metale),
      papier: getMayDays(wasteData.rejon5.papier),
      szklo: getMayDays(wasteData.rejon5.szklo)
    },
    { 
      id: 6, name: "Rejon VI", 
      places: "ALEKSANDRÓW, IZABELIN, STANISŁAWÓW PIERWSZY: Baletowa, Błękitna, Graniczna, Izabelińska, Klonowa, Krzywa, Księżycowa, Małołęcka, Perłowa, Przyszłość, Rondo im. Jerzego Boskiego, Rodzinna, Rubinowa, Sielska, Szmaragdowa, Świetlana, Wierzbowa", 
      zmieszane: getMayDays(wasteData.rejon6.zmieszane),
      bio: getMayDays(wasteData.rejon6.bio),
      tworzywa: getMayDays(wasteData.rejon6.metale),
      papier: getMayDays(wasteData.rejon6.papier),
      szklo: getMayDays(wasteData.rejon6.szklo)
    },
    { 
      id: 7, name: "Rejon VII", 
      places: "STANISŁAWÓW DRUGI, WOLA ALEKSANDRA: wszystkie ulice i rejony sołectw", 
      zmieszane: getMayDays(wasteData.rejon7.zmieszane),
      bio: getMayDays(wasteData.rejon7.bio),
      tworzywa: getMayDays(wasteData.rejon7.metale),
      papier: getMayDays(wasteData.rejon7.papier),
      szklo: getMayDays(wasteData.rejon7.szklo)
    },
    { 
      id: 8, name: "Rejon VIII", 
      places: "KĄTY WĘGIERSKIE, JÓZEFÓW: Leśna Polana, Polnych Maków, Poziomkowa, Strużańska (od nr 2A do ul. Kościelnej), Wyścigowa", 
      zmieszane: getMayDays(wasteData.rejon8.zmieszane),
      bio: getMayDays(wasteData.rejon8.bio),
      tworzywa: getMayDays(wasteData.rejon8.metale),
      papier: getMayDays(wasteData.rejon8.papier),
      szklo: getMayDays(wasteData.rejon8.szklo)
    },
    { 
      id: 9, name: "Rejon IX", 
      places: "JÓZEFÓW: Ateny, Borki, Dębowa, Diamentowa, Dzika, Główna, Gwiaździsta, H. Sienkiewicza, Krótka, Leszczynowa, Leśna, Leśne Osiedle, Migdałowa, Miodowa, Niecała, Objazdowa, Olimpijska, Orzechowa, Piaskowa, Piastowska, Polna, Polnej Róży, Rodziny Kalińskich, Równa, Runa Leśnego, Sezamkowa, Sienna, Słonecznego Poranka, Szczęśliwa, Szkolna, Wiosenna, Wspólna, Zacisze, Zielona, Zielone Wzgórze, Złota, Żytnia", 
      zmieszane: getMayDays(wasteData.rejon9.zmieszane),
      bio: getMayDays(wasteData.rejon9.bio),
      tworzywa: getMayDays(wasteData.rejon9.metale),
      papier: getMayDays(wasteData.rejon9.papier),
      szklo: getMayDays(wasteData.rejon9.szklo)
    },
    { 
      id: 10, name: "Rejon X", 
      places: "MICHAŁÓW GRABINA, REMBELSZCZYZNA: wszystkie ulice i rejony sołectw", 
      zmieszane: getMayDays(wasteData.rejon10.zmieszane),
      bio: getMayDays(wasteData.rejon10.bio),
      tworzywa: getMayDays(wasteData.rejon10.metale),
      papier: getMayDays(wasteData.rejon10.papier),
      szklo: getMayDays(wasteData.rejon10.szklo)
    }
  ];

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert("Aby dodać do pulpitu na iPhone: kliknij 'Udostępnij', a potem 'Dodaj do ekranu początkowego'.");
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen pb-20 font-montserrat">
      <section className="pt-32 pb-12 flex flex-col items-center px-6">
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#0f172a] px-10 py-5 rounded-3xl font-black text-[11px] uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform"
        >
          <FaMobileAlt className="text-xl" /> Zapisz harmonogram na pulpit
        </button>
      </section>

      <ScheduleTemplate month="Maj" year="2026" sectors={nieporetSectorsMay} />

      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl">
          <div className="flex items-center gap-4 mb-8">
            <FaExclamationTriangle className="text-[#d4af37] text-3xl" />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Ważne informacje - Maj 2026</h2>
          </div>
          <ul className="space-y-6 text-slate-300 text-sm leading-relaxed italic">
            <li>• Dane pobierane automatycznie z systemu gminnego Mistrzów Regionu.</li>
            <li>• Wszystkie odpady muszą być wystawione przed posesję do godziny **7:00** rano[cite: 1].</li>
            <li>• Reklamacje za brak odbioru zgłaszaj następnego dnia do Urzędu Gminy Nieporęt[cite: 1].</li>
          </ul>
        </div>
      </section>

      <footer className="mt-24 py-12 text-center border-t border-white/5">
        <p className="text-[9px] text-white/20 uppercase tracking-[0.5em] italic">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
        </p>
      </footer>
    </div>
  );
}