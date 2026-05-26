"use client";
import React from 'react';
import { FiPhone, FiTruck, FiAward, FiCheck, FiTool, FiShield, FiGlobe, FiShare2, FiClock } from 'react-icons/fi';

export default function MoviloPage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Movilo - Fachowiec pod Twoimi drzwiami',
          text: 'Sprawdź usługi Movilo w rankingu Mistrzowie Regionu!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Błąd udostępniania:', err);
      }
    } else {
      alert("Twoja przeglądarka nie wspiera udostępniania. Skopiuj link z adresu URL.");
    }
  };

  const specializedServices = [
    {
      title: "Montaż i instalacje",
      items: [
        "Składanie mebli (IKEA, Agata, BRW, Jysk)",
        "Montaż telewizorów, lamp, karniszy i luster",
        "Pełne wyposażenie narzędziowe – Ty tylko otwierasz drzwi"
      ]
    },
    {
      title: "Hydraulika",
      items: [
        "Szybkie usuwanie awarii i wycieków",
        "Wymiana cieknących baterii, syfonów i zaworów",
        "Podłączanie pralek i zmywarek",
        "Odpowietrzanie grzejników w domach i mieszkaniach"
      ]
    },
    {
      title: "Elektryka",
      items: [
        "Bezpieczna wymiana gniazdek i włączników",
        "Profesjonalny montaż oświetlenia wewnętrznego i zewnętrznego",
        "Bezpieczne podłączanie płyt indukcyjnych i sprzętu AGD"
      ]
    },
    {
      title: "Naprawy domowe",
      items: [
        "Kompleksowy serwis domowy usterek",
        "Regulacja nieszczelnych okien i drzwi",
        "Wymiana zamków i wkładek",
        "Uzupełnianie ubytków silikonu (łazienki, kuchnie)"
      ]
    },
    {
      title: "Malowanie",
      items: [
        "Precyzyjne odświeżanie ścian i sufitów",
        "Naprawa pęknięć i ubytków przed malowaniem",
        "Szybkie przygotowanie mieszkań pod wynajem lub sprzedaż"
      ]
    },
    {
      title: "Transport i wywóz",
      items: [
        "Lokalne usługi transportowe i taxi bagażowe",
        "Bezpieczny przewóz gabarytów",
        "Wsparcie logistyczne przy dużych zakupach budowlanych"
      ]
    },
    {
      title: "Usługi sezonowe",
      items: [
        "Całoroczna profesjonalna opieka nad posesją",
        "Regularne koszenie trawników",
        "Przycinanie krzewów i prace porządkowe"
      ]
    },
    {
      title: "Architektura ogrodowa",
      items: [
        "Budowa od podstaw drewnianych altan",
        "Montaż pergoli i zadaszeń",
        "Konstrukcja domków narzędziowych na wymiar"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white font-montserrat italic selection:bg-[#d4af37] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center bg-[#0b1120] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          {/* Tu możesz podmienić zdjęcie na jakieś narzędzia lub fachowca z Movilo */}
          <img src="/img/industries/movilo-hero.webp" className="w-full h-full object-cover " alt="Movilo Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="inline-block bg-[#d4af37] text-[#0b1120] px-8 py-2 rounded-full mb-6 font-black uppercase text-[10px] tracking-[0.4em]">Złota Rączka • Gmina Nieporęt</div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-4">MOVILO</h1>
          <p className="text-slate-300 text-xl font-medium tracking-widest uppercase mb-10">Fachowiec pod Twoimi drzwiami</p>
          
          {/* PRZYCISKI AKCJI (Usunięto nawigację) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="tel:+48601728604"
              className="flex items-center gap-3 bg-white text-[#0f172a] px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-2xl"
            >
              <FiPhone className="text-lg" /> Zadzwoń po fachowca
            </a>
            <button 
              onClick={handleShare}
              className="flex items-center gap-3 bg-transparent border-2 border-white/20 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#0f172a] transition-all"
            >
              <FiShare2 className="text-lg" /> Udostępnij
            </button>
          </div>
        </div>
      </section>

      {/* --- KONTAKT PREMIUM (Brak mapy, nacisk na mobilność) --- */}
      <section className="max-w-7xl mx-auto -mt-16 relative z-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="tel:+48601728604" className="bg-[#0f172a] text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64 hover:bg-[#d4af37] transition-all group">
            <FiPhone className="text-4xl text-[#d4af37] group-hover:text-white transition-colors" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2 group-hover:text-white">Pogotowie Techniczne</p>
              <p className="text-2xl font-black">+48 601 728 604</p>
            </div>
          </a>
          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiTruck className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2">Obszar Działania</p>
              <p className="text-xl font-black text-[#0f172a] leading-tight">Dojazd do Klienta<br/><span className="text-slate-400 text-sm">Nieporęt, Białołęka, Legionowo</span></p>
            </div>
          </div>
          <a href="https://movilo.pl" target="_blank" rel="noreferrer" className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64 hover:border-[#d4af37] transition-all group">
            <FiGlobe className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2">Strona WWW</p>
              <p className="text-2xl font-black text-[#0f172a]">movilo.pl</p>
            </div>
          </a>
        </div>
      </section>

      {/* --- USŁUGI --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] uppercase italic tracking-tighter">Zakres <span className="text-[#d4af37]">Usług</span></h2>
          <div className="h-1 w-24 bg-[#d4af37] mx-auto mt-6 opacity-30" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          {specializedServices.map((service, idx) => (
            <div key={idx} className="group border-l-2 border-slate-100 hover:border-[#d4af37] pl-10 py-4 transition-all">
              <h3 className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.4em] mb-6">{service.title}</h3>
              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#0f172a] text-[13px] font-medium leading-relaxed italic opacity-80 group-hover:opacity-100">
                    <FiCheck className="mt-1 text-[#d4af37] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEKCJA SPECJALNA (Zamiast Radiowizjografii) --- */}
      <section className="bg-[#0f172a] py-24 px-6 rounded-[5rem] mx-6 mb-24 overflow-hidden relative shadow-3xl">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-white">
          <FiTool className="text-[25rem]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-6 mb-10">
            <div className="p-5 bg-[#d4af37] rounded-3xl text-[#0f172a]">
              <FiClock className="text-4xl" />
            </div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-balance">Dostępność <span className="text-[#d4af37]">i Czas</span></h2>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed italic font-light">
            Szanujemy Twój czas. Zwykle przyjeżdżamy już <span className="text-white font-black">następnego dnia</span> od zgłoszenia awarii. Zawsze posiadamy przy sobie pełny zestaw profesjonalnych narzędzi, dzięki czemu większość napraw realizujemy podczas pierwszej wizyty.
          </p>
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 italic">
        <p className="text-[9px] font-black uppercase tracking-[0.6em]">projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604</p>
      </footer>
    </main>
  );
}