"use client";
import React from 'react';
import { FiPhone, FiTruck, FiCheck, FiDroplet, FiClock, FiShare2, FiAlertCircle, FiFileText } from 'react-icons/fi';

export default function SzambexPage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Szambex24 - Profesjonalny wywóz szamba',
          text: 'Polecam firmę Szambex24 w rankingu Mistrzowie Regionu!',
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
      title: "Usługi Asenizacyjne",
      icon: <FiTruck className="text-[#d4af37] text-2xl mb-4" />,
      items: [
        "Wywóz szamba (Nieporęt i szerokie okolice)",
        "Kompleksowa obsługa domów jednorodzinnych",
        "Obsługa firm, instytucji oraz osiedli"
      ]
    },
    {
      title: "Prace Specjalistyczne",
      icon: <FiDroplet className="text-[#d4af37] text-2xl mb-4" />,
      items: [
        "Szybkie wypompowywanie wody z zalań",
        "Wysokociśnieniowe czyszczenie kanalizacji",
        "Sezonowe opróżnianie przydomowych basenów"
      ]
    },
    {
      title: "Stała Współpraca",
      icon: <FiFileText className="text-[#d4af37] text-2xl mb-4" />,
      items: [
        "Wygodne umowy dla osób fizycznych",
        "Dedykowane umowy dla firm (B2B)",
        "Faktury i pełna przejrzystość rozliczeń"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white font-montserrat italic selection:bg-[#d4af37] selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] flex items-center justify-center bg-[#0b1120] overflow-hidden">
        <div className="absolute inset-0 opacity-40"> 
  <img src="/img/industries/szambex-hero.webp" className="w-full h-full object-cover" alt="Szambex24 Background" /> 
  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" /> 
</div>
        <div className="relative z-10 text-center px-6 mt-16">
          <div className="inline-block bg-[#d4af37] text-[#0b1120] px-8 py-2 rounded-full mb-6 font-black uppercase text-[10px] tracking-[0.4em]">Asenizacja • Gmina Nieporęt</div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-4">SZAMBEX<span className="text-[#d4af37]">24</span></h1>
          <p className="text-slate-300 text-lg md:text-xl font-medium tracking-widest uppercase mb-4">
            Profesjonalny wywóz szamba
          </p>
          <p className="text-[#d4af37] text-sm md:text-base font-black tracking-widest uppercase mb-10 bg-[#d4af37]/10 inline-block px-6 py-2 rounded-full border border-[#d4af37]/30">
            Usługa już od 299 zł
          </p>
          
          {/* PRZYCISKI AKCJI */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="tel:+48577605505"
              className="flex items-center gap-3 bg-white text-[#0f172a] px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-2xl"
            >
              <FiPhone className="text-lg" /> Zadzwoń (577 605 505)
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
          <a href="tel:+48577605505" className="bg-[#0f172a] text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64 hover:bg-[#d4af37] transition-all group">
            <FiPhone className="text-4xl text-[#d4af37] group-hover:text-white transition-colors" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2 group-hover:text-white">Dyspozytor</p>
              <p className="text-2xl font-black">577 605 505</p>
            </div>
          </a>
          <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiTruck className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2">Obszar Działania</p>
              <p className="text-lg font-black text-[#0f172a] leading-tight">Nieporęt, Białołęka<br/><span className="text-slate-400 text-[11px] uppercase tracking-widest">oraz 6 innych miejscowości</span></p>
            </div>
          </div>
          <div className="bg-[#f8fafc] border border-slate-200 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between h-64">
            <FiClock className="text-4xl text-[#d4af37]" />
            <div>
              <p className="text-[#d4af37] text-[10px] uppercase font-black tracking-widest mb-2">Godziny Pracy</p>
              <p className="text-xl font-black text-[#0f172a] leading-tight">Pon-Sob: 05:00 - 24:00<br/><span className="text-rose-500 text-xs">Niedziela: Nagłe awarie</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* --- USŁUGI --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] uppercase italic tracking-tighter">Profil <span className="text-[#d4af37]">Działalności</span></h2>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto italic">Błyskawiczny przyjazd, czysta usługa i uczciwe rozliczenie. Gwarantujemy satysfakcję i terminowość.</p>
          <div className="h-1 w-24 bg-[#d4af37] mx-auto mt-8 opacity-30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {specializedServices.map((service, idx) => (
            <div key={idx} className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 hover:border-[#d4af37] transition-all group shadow-sm hover:shadow-xl">
              {service.icon}
              <h3 className="text-[#0f172a] text-xl font-black uppercase tracking-tight mb-6 italic group-hover:text-[#d4af37] transition-colors">{service.title}</h3>
              <ul className="space-y-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium leading-relaxed italic">
                    <FiCheck className="mt-1 text-[#d4af37] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEKCJA SPECJALNA (Awarie 24/7) --- */}
      <section className="bg-[#0f172a] py-24 px-6 rounded-[5rem] mx-6 mb-24 overflow-hidden relative shadow-3xl">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-white">
          <FiAlertCircle className="text-[25rem]" />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-6 mb-10">
            <div className="p-5 bg-rose-500 rounded-3xl text-white shadow-[0_0_30px_rgba(244,63,94,0.3)]">
              <FiAlertCircle className="text-4xl" />
            </div>
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter text-balance">Niedzielne <span className="text-rose-500">Pogotowie</span></h2>
          </div>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed italic font-light mb-8">
            Szambo wybiło w najmniej oczekiwanym momencie? Nie zostawimy Cię z problemem. Uruchomiliśmy specjalny dyżur na <span className="text-white font-black">nagłe awarie w niedziele</span>.
          </p>
          <a href="tel:+48577605505" className="inline-block bg-rose-500 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-rose-600 transition-all shadow-xl">
            Zgłoś Awarię
          </a>
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 italic">
        <p className="text-[9px] font-black uppercase tracking-[0.6em]">projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604</p>
      </footer>
    </main>
  );
}