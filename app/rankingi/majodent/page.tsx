"use client";
import React from 'react';
import { FiPhone, FiMapPin, FiAward, FiCheck, FiActivity, FiShield, FiGlobe, FiMap, FiShare2, FiNavigation } from 'react-icons/fi';

export default function MajodentPage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Majodent - Stomatologia Nieporęt',
          text: 'Sprawdź klinikę Majodent w rankingu Mistrzowie Regionu!',
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
      title: "Stomatologia zachowawcza z endodoncją",
      items: [
        "Profilaktyka zmian próchniczych, wzmacnianie struktury zębów",
        "Leczenie ubytków próchnicowych materiałami najwyższej jakości",
        "Estetyczna odbudowa zębów przednich licówkami",
        "Specjalistyczne leczenie kanałowe"
      ]
    },
    {
      title: "Stomatologia dziecięca",
      items: [
        "Wizyty adaptacyjne (od 18. miesiąca życia)",
        "Profilaktyka próchnicy, lakowanie, enameloplastyka",
        "Leczenie ubytków"
      ]
    },
    {
      title: "Ortodoncja",
      items: [
        "Profilaktyka wad zgryzu",
        "Leczenie aparatami ruchomymi i stałymi"
      ]
    },
    {
      title: "Chirurgia stomatologiczna",
      items: [
        "Usuwanie zębów (w tym ósemek i mlecznych)",
        "Usuwanie zmian śluzówkowych i torbieli",
        "Resekcje wierzchołków zębów"
      ]
    },
    {
      title: "Periodontologia",
      items: [
        "Pełna higienizacja (skaling, piaskowanie)",
        "Regeneracja kości i pokrycie recesji dziąseł",
        "Szynowanie zębów"
      ]
    },
    {
      title: "Implantologia & Protetyka",
      items: [
        "Odbudowa braków zębowych i bezzębia",
        "Mosty, licówki, korony i protezy szkieletowe",
        "Odbudowa na implantach"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white font-montserrat italic selection:bg-[#d4af37] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center bg-[#0b1120] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/certyfikat.webp" className="w-full h-full object-cover grayscale" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="inline-block bg-[#d4af37] text-[#0b1120] px-8 py-2 rounded-full mb-6 font-black uppercase text-[10px] tracking-[0.4em]">Mistrz Regionu 2026</div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-8">MAJODENT</h1>
          
          {/* PRZYCISKI AKCJI */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=ul.+Wazów+2,+05-126+Nieporęt"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-white text-[#0f172a] px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-2xl"
            >
              <FiNavigation className="text-lg" /> Wyznacz trasę
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

      {/* --- KONTAKT PREMIUM --- */}
      <section className="max-w-7xl mx-auto -mt-16 relative z-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="tel:+48539669475" className="bg-[#0f172a] text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64 hover:bg-[#d4af37] transition-all group">
            <FiPhone className="text-4xl text-[#d4af37] group-hover:text-white transition-colors" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2 group-hover:text-white">Zadzwoń teraz</p>
              <p className="text-2xl font-black">+48 539 669 475</p>
            </div>
          </a>
          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiMapPin className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2">Adres Kliniki</p>
              <p className="text-xl font-black text-[#0f172a] leading-tight">ul. Wazów 2<br/>05-126 Nieporęt</p>
            </div>
          </div>
          <a href="https://majodent.pl" target="_blank" rel="noreferrer" className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64 hover:border-[#d4af37] transition-all group">
            <FiGlobe className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2">Strona WWW</p>
              <p className="text-2xl font-black text-[#0f172a]">majodent.pl</p>
            </div>
          </a>
        </div>
      </section>

      {/* --- MAPA --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-slate-50 rounded-[4rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 border border-slate-100 shadow-inner">
          <div className="lg:w-1/2 text-left">
            <div className="flex items-center gap-4 mb-6 text-[#d4af37]">
              <FiMap className="text-3xl" />
              <span className="font-black uppercase text-[10px] tracking-[0.3em]">Nawiguj do nas</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] uppercase italic tracking-tighter mb-6 leading-none">Serce <span className="text-[#d4af37]">Nieporętu</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed italic mb-8">
              Klinika znajduje się przy **ul. Wazów 2**. Kliknij przycisk powyżej, aby uruchomić nawigację bezpośrednio do naszych drzwi.
            </p>
          </div>
          <div className="lg:w-1/2 w-full h-[400px] bg-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.2678822601957!2d21.0315!3d52.4497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8f3c713b1b%3A0x7d6f5f3e3e3e3e3e!2sWaz%C3%B3w%202%2C%2005-126%20Niepor%C4%99t!5e0!3m2!1spl!2spl!4v1711111111111!5m2!1spl!2spl" 
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* --- USŁUGI --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] uppercase italic tracking-tighter">Zakres <span className="text-[#d4af37]">Specjalistyczny</span></h2>
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

      {/* --- RADIOWIZJOGRAFIA --- */}
      <section className="bg-[#0f172a] py-24 px-6 rounded-[5rem] mx-6 mb-24 overflow-hidden relative shadow-3xl">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-white">
          <FiActivity className="text-[25rem]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-6 mb-10">
            <div className="p-5 bg-[#d4af37] rounded-3xl text-[#0f172a]">
              <FiShield className="text-4xl" />
            </div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-balance">Radiowizjografia <span className="text-[#d4af37]">Cyfrowa</span></h2>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed italic font-light">
            Zminimalizowana dawka promieniowania i natychmiastowy obraz o najwyższej czytelności. Precyzyjna diagnoza to fundament Twojego bezpieczeństwa.
          </p>
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 italic">
        <p className="text-[9px] font-black uppercase tracking-[0.6em]">projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604</p>
      </footer>
    </main>
  );
}