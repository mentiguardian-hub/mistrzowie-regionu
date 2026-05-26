"use client";
import React from 'react';
import { 
  FiPhone, FiMapPin, FiCheck, FiShield, FiGlobe, FiMap, FiShare2, 
  FiNavigation, FiTruck, FiBox, FiClock, FiTrash2, FiAlertCircle, FiCheckCircle 
} from 'react-icons/fi';

export default function CezaryTransportPage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cezary Transport - Ekspresowa Bagażówka Nieporęt',
          text: 'Transport OLX i przeprowadzki w 30 minut!',
          url: window.location.href,
        });
      } catch (err) { console.log(err); }
    }
  };

  const mainServices = [
    {
      title: "MEBLE I AGD",
      img: "/img/Cezarotransport1.webp",
      desc: "Transport przedmiotów, które nie mieszczą się w Twoim aucie. Dzięki pace o długości 3m przewozimy narożniki, lodówki i blaty bez ryzyka uszkodzeń."
    },
    {
      title: "ZAKUPY Z MARKETÓW",
      img: "/img/Cezarytransport6.webp",
      desc: "IKEA, Castorama, Leroy Merlin w 60 minut pod Twoje drzwi. Nie czekaj na odległe terminy sklepowe – działamy w trybie ekspres."
    },
    {
      title: "MIKRO-PRZEPROWADZKI",
      img: "/img/Cezarotransport4.webp",
      desc: "Idealne dla studentów i najemców. Przewóz zawartości pokoju, roweru czy biurka bez kosztów wielkiej ekipy przeprowadzkowej."
    }
  ];

  const exclusions = [
    { title: "MATERIAŁY SYPKIE", img: "/img/Cezarytransport45.webp", text: "Nie wożimy piachu i gruzu. Dzięki temu nasza paka jest sterylnie czysta – idealna dla Twojej nowej sofy." },
    { title: "CAŁE DOMY", img: "/img/Cezarytransport8.webp", text: "Specjalizujemy się w szybkich kursach (taksówka bagażowa), nie w wielogodzinnej logistyce całych osiedli." },
    { title: "NADGABARYTY PIONOWE", img: "/img/Cezarytransport7.webp", text: "Limit wysokości to 170cm. Szafy PAX czy lodówki powyżej 1,7m zabieramy wyłącznie w poziomie/rozłożone." }
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfc] font-montserrat italic selection:bg-[#d4af37] selection:text-white">
      
      {/* --- HERO: TRANSPORTOWY MONOLIT --- */}
      <section className="relative h-[85vh] flex items-center justify-center bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src="/img/CezaroTransport5.webp" className="w-full h-full object-cover scale-105" alt="Cezary Transport Flota" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/60 to-[#fcfcfc]" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <p className="text-[#d4af37] font-black uppercase tracking-[0.5em] mb-4 text-xs">Szybko • Czysto • Lokalnie</p>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-4 leading-[0.85]">
            SZYBKI BUS<br/><span className="text-[#d4af37]">BAGAŻOWY</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-white font-light tracking-[0.2em] mb-12 uppercase">Meble • AGD • Zakupy OLX</h2>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="tel:+48537010620" className="bg-[#d4af37] text-[#0f172a] px-12 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
              Zadzwoń po wycenę
            </a>
            <button onClick={handleShare} className="bg-white/5 backdrop-blur-xl border border-white/20 text-white p-6 rounded-full hover:bg-white hover:text-[#0f172a] transition-all">
              <FiShare2 size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* --- CENNIK: TRZY FILARY (Z Twojej strony) --- */}
      <section className="max-w-7xl mx-auto -mt-24 relative z-20 px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Transport OLX", price: "129", features: ["Lodówki, Pralki", "Komody, Biurka", "Pomoc przy wniesieniu"] },
            { title: "Pakiety Meblowe", price: "250", features: ["Sofa + Szafka", "IKEA / Castorama", "Zabezpieczenie folią"], best: true },
            { title: "Samo Auto (Taxi)", price: "89", features: ["Wynajem z kierowcą", "Własny załadunek", "Cena za godzinę"] }
          ].map((plan, i) => (
            <div key={i} className={`p-12 rounded-[4rem] flex flex-col justify-between h-full transition-all ${plan.best ? 'bg-[#d4af37] text-[#0f172a] shadow-3xl scale-105' : 'bg-white border border-slate-100 text-[#0f172a]'}`}>
              <div>
                {plan.best && <span className="bg-[#0f172a] text-white text-[9px] px-4 py-1 rounded-full font-black uppercase mb-6 inline-block">Najczęściej wybierany</span>}
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-xs font-bold">od</span>
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-sm font-bold">PLN</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-[13px] font-bold uppercase opacity-80">
                      <FiCheckCircle /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="tel:+48537010620" className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest text-center transition-all ${plan.best ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-[#0f172a] hover:bg-[#d4af37]'}`}>
                Zamów teraz
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* --- USŁUGI: SZEROKI KĄT --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl text-left">
            <span className="text-[#d4af37] font-black uppercase text-[10px] tracking-[0.4em]">Specjalizacja</span>
            <h2 className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase tracking-tighter leading-none mt-4">Taksówka<br/>Bagażowa</h2>
          </div>
          <p className="text-slate-400 font-medium italic max-w-sm text-right">Baza w Nieporęcie. Ekspresowy podjazd w 30 minut do Legionowa i okolic.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainServices.map((s, i) => (
            <div key={i} className="group cursor-default">
              <div className="h-[450px] rounded-[3.5rem] overflow-hidden mb-8 relative shadow-2xl">
                <img src={s.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={s.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic">{s.title}</h3>
                </div>
              </div>
              <p className="px-6 text-slate-500 text-sm leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- TRANSPARENTNOŚĆ: CZEGO NIE WOZIMY --- */}
      <section className="py-32 px-6 bg-[#0f172a] rounded-[6rem] mx-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">PRZEJRZYSTE <span className="text-[#d4af37]">ZASADY</span></h2>
            <p className="text-[#d4af37] font-black uppercase tracking-widest text-[10px] mt-4 opacity-60 italic">Czego nie wozimy i dlaczego?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {exclusions.map((ex, i) => (
              <div key={i} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-10 relative">
                  <img src={ex.img} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all border-4 border-white/5" alt={ex.title} />
                  <div className="absolute -top-2 -right-2 bg-rose-500 text-white p-2 rounded-full shadow-xl">
                    <FiAlertCircle size={24} />
                  </div>
                </div>
                <h4 className="text-white font-black uppercase italic mb-4 tracking-widest">{ex.title}</h4>
                <p className="text-slate-400 text-[13px] leading-relaxed italic">{ex.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OBSZAR DZIAŁANIA --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] uppercase italic tracking-tighter">Gdzie <span className="text-[#d4af37]">Jeździmy?</span></h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-4">Ekspresowy zasięg lokalny</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {["Nieporęt", "Legionowo", "Białołęka", "Marki", "Wieliszew", "Kobiałka", "Stanisławów Pierwszy"].map(city => (
            <span key={city} className="px-10 py-5 rounded-full border border-slate-100 bg-white text-[#0f172a] font-black uppercase text-[11px] tracking-widest hover:border-[#d4af37] transition-all cursor-default">
              {city}
            </span>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center opacity-30 italic border-t border-slate-100">
        <p className="text-[9px] font-black uppercase tracking-[0.6em]">projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604</p>
      </footer>
    </main>
  );
}