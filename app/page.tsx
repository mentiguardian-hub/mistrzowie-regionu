"use client";
import React from 'react';

export default function Page() {
  return (
     <> 
            
   

      {/* 2. HERO SECTION - NOWA STRATEGIA REKOMENDACJI */}
<section className="relative bg-[#0f172a] text-white pt-32 pb-40 px-6 overflow-hidden">
  {/* Delikatny efekt tła dla stylu Premium */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#d4af37_0%,_transparent_70%)]"></div>
  </div>

  <div className="max-w-4xl mx-auto text-center relative z-10">
    <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block animate-fade-in">
      Gmina Nieporęt 2026
    </span>
    
    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none font-montserrat">
      RANKING ZAUFANYCH <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f1c40f] to-[#d4af37] uppercase">
        LIDERÓW ASENIZACJI
      </span>
    </h1>

    <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
      Niezależne zestawienie <span className="text-white font-medium">sprawdzone przez mieszkańców</span>. 
      Wybraliśmy firmy, które gwarantują terminowość, czystość i nowoczesny standard obsługi.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-2xl shadow-yellow-500/20">
        Zobacz ranking
      </a>
      <a href="#cennik" className="border border-slate-700 text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white/5 transition-colors">
        Sprawdź stawki
      </a>
    </div>
  </div>
</section>

      {/* 3. LISTA MIEJSCOWOŚCI - WERSJA PREMIUM */}
<section id="miejscowosci" className="px-6 -mt-20 relative z-10"> {/* Zwiększony margines i dodany z-index */}
  <div className="max-w-6xl mx-auto bg-white rounded-[2rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100/50">
    
    {/* Nagłówek sekcji wewnątrz karty */}
    <div className="flex items-center gap-6 mb-10">
      <div className="h-px bg-gradient-to-r from-transparent to-slate-200 flex-grow"></div>
      <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">
        Obsługiwane miejscowości
      </h2>
      <div className="h-px bg-gradient-to-l from-transparent to-slate-200 flex-grow"></div>
    </div>

    {/* Lista miast z efektem hover Premium */}
    <div className="flex flex-wrap justify-center gap-3">
      {[
        'Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 
        'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 
        'Stanisławów Pierwszy', 'Stanisławów Drugi', 'Wola Aleksandra', 
        'Wola Kiełpińska', 'Zagroby', 'Zegrze Południowe'
      ].map((city) => (
        <span 
          key={city} 
          className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-full text-xs font-bold border border-slate-100 hover:border-[#d4af37] hover:bg-white hover:text-[#0f172a] hover:shadow-md transition-all duration-300 cursor-default"
        >
          {city}
        </span>
      ))}
    </div>
  </div>
</section>

{/* 4. RANKING LIDERÓW ASENIZACJI - WERSJA OPISOWA */}
<section id="ranking" className="py-24 bg-white font-montserrat">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter">
        RANKING MISTRZÓW REGIONU
      </h2>
      <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
      <p className="text-slate-500 font-medium text-lg italic">
        "Dołącz do grona zadowolonych klientów w gminie Nieporęt."
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* 1. BRACIA */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full border-t-4 border-t-[#d4af37]">
        <div className="h-20 flex items-center justify-center mb-6 bg-slate-50 rounded-2xl overflow-hidden">
          <img src="/logo-bracia.png" alt="Bracia Logo" className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src='https://ui-avatars.com/api/?name=BRACIA&background=0f172a&color=d4af37')} />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2 text-center">BRACIA</h3>
        <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">Rekomendacja Redakcji</p>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-8 text-center italic">
          "Cena usługi zależy od odebranej objętości, warunków dojazdu oraz możliwości manewrowania pojazdu. Najczęściej rozliczamy się za kurs lub za objętość wyrażoną w m³."
        </p>
        <a href="tel:601728604" className="block text-center bg-[#0f172a] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-all">ZADZWOŃ TERAZ</a>
      </div>

      {/* 2. RoJa-Trans */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full border-t-4 border-t-[#0f172a]">
        <div className="h-20 flex items-center justify-center mb-6 bg-slate-50 rounded-2xl overflow-hidden">
          <img src="/logo-roja.png" alt="RoJa-Trans Logo" className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src='https://ui-avatars.com/api/?name=ROJA&background=0f172a&color=d4af37')} />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2 text-center text-nowrap">RoJa-Trans</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">Lider Logistyki</p>
        <p className="text-slate-600 text-xs leading-relaxed flex-grow mb-8 text-center italic">
          "Koszt wywozu szamba jest uzależniony od odległości nieruchomości od najbliższej oczyszczalni ścieków, kosztów utylizacji oraz ilości nieczystości zabieranych jednorazowo. Koszty transportu są stałe."
        </p>
        <a href="tel:601728604" className="block text-center bg-[#0f172a] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-all">WYCENA TELEFONICZNA</a>
      </div>

      {/* 3. ABIS */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full">
        <div className="h-20 flex items-center justify-center mb-6 bg-slate-50 rounded-2xl overflow-hidden">
          <img src="/logo-abis.png" alt="ABIS Logo" className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src='https://ui-avatars.com/api/?name=ABIS&background=0f172a&color=d4af37')} />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2 text-center">ABIS</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">Indywidualna Wycena</p>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-8 text-center italic">
          "Cena opróżniania szamba jest do uzgodnienia. W celu uzyskania dokładnej wyceny polecamy kontakt telefoniczny."
        </p>
        <a href="tel:601728604" className="block text-center border-2 border-[#0f172a] text-[#0f172a] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0f172a] hover:text-white transition-all">ZAPYTAJ O CENĘ</a>
      </div>

      {/* 4. PHU GRZEGORZ WIĘCH */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full">
        <div className="h-20 flex items-center justify-center mb-6 bg-slate-50 rounded-2xl overflow-hidden">
          <img src="/logo-wiech.png" alt="PHU WIĘCH Logo" className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src='https://ui-avatars.com/api/?name=WIECH&background=0f172a&color=d4af37')} />
        </div>
        <h3 className="text-xl font-black text-[#0f172a] mb-2 text-center leading-none">PHU GRZEGORZ WIĘCH</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">Sprawność i Terminowość</p>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-8 text-center italic">
          "Gwarantujemy sprawną i terminową realizację - zawsze w konkurencyjnych cenach."
        </p>
        <a href="tel:601728604" className="block text-center bg-[#0f172a] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-all">ZADZWOŃ TERAZ</a>
      </div>

      {/* 5. SZAMBALA */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full">
        <div className="h-20 flex items-center justify-center mb-6 bg-slate-50 rounded-2xl overflow-hidden">
          <img src="/logo-szambala.png" alt="Szambala Logo" className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src='https://ui-avatars.com/api/?name=SZAMBALA&background=0f172a&color=d4af37')} />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2 text-center">SZAMBALA</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">Umiarkowane Stawki</p>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-8 text-center italic">
          "Zakres cen · Umiarkowane ceny. Solidna obsługa na terenie całego regionu."
        </p>
        <a href="tel:601728604" className="block text-center border-2 border-[#0f172a] text-[#0f172a] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0f172a] hover:text-white transition-all">SKONTAKTUJ SIĘ</a>
      </div>

      {/* 6. SZAMBEX24 */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full border-b-4 border-b-[#d4af37]">
        <div className="h-20 flex items-center justify-center mb-6 bg-slate-50 rounded-2xl overflow-hidden">
          <img src="/logo-szambex.png" alt="Szambex24 Logo" className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src='https://ui-avatars.com/api/?name=SZAMBEX&background=0f172a&color=d4af37')} />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2 text-center">SZAMBEX24</h3>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">Błyskawiczny Przyjazd</p>
        <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-8 text-center italic">
          "Błyskawiczny przyjazd, czysta usługa i uczciwe rozliczenie."
        </p>
        <a href="tel:601728604" className="block text-center bg-[#0f172a] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-all">ZAMÓW USŁUGĘ</a>
      </div>

    </div>
  </div>
</section>

      {/* 5. STOPKA */}
      <footer className="bg-[#0f172a] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 mb-24">
            <div>
              <div className="flex flex-col leading-none mb-8">
                <span className="text-3xl font-black tracking-tighter">MISTRZOWIE</span>
                <span className="text-[12px] font-bold text-[#d4af37] tracking-[0.4em] uppercase">REGIONU</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Największy portal asenizacyjny w Nieporęcie. Budujemy standardy nowoczesnych usług komunalnych.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-8">Nawigacja</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                <li><a href="#ranking" className="hover:text-[#d4af37]">Ranking</a></li>
                <li><a href="#miejscowosci" className="hover:text-[#d4af37]">Zasięg</a></li>
                <li><a href="mailto:kontakt@mistrzowieregionu.pl" className="hover:text-[#d4af37]">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-8">Lokalizacja</h4>
              <p className="text-slate-300 font-bold mb-2 uppercase text-xs">Gmina Nieporęt</p>
              <p className="text-slate-500 text-[10px] font-bold">Redakcja: 2026</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
            © 2026 MISTRZOWIE REGIONU. PROJEKT EXCLUSIVE.
          </div>
        </div>
      </footer>
   
  
    </>
  );
}