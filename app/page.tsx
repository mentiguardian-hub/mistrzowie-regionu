import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 font-[Montserrat]">
      {/* 1. NAGŁÓWEK (HEADER) */}
      <nav className="bg-[#0f172a] text-white py-6 px-6 sticky top-0 z-50 shadow-lg border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter">MISTRZOWIE</span>
            <span className="text-[10px] font-bold text-[#d4af37] tracking-[0.3em] uppercase">REGIONU</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest">
            <a href="#ranking" className="hover:text-[#d4af37] transition-colors text-slate-300">Ranking</a>
            <a href="#cennik" className="hover:text-[#d4af37] transition-colors text-slate-300">Cennik</a>
            <a href="#miejscowosci" className="hover:text-[#d4af37] transition-colors text-slate-300">Zasięg</a>
          </div>
          <a href="tel:601728604" className="bg-[#d4af37] text-[#0f172a] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
            Dodaj Firmę
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="bg-[#0f172a] text-white pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[12px] mb-4 block">Gmina Nieporęt 2026</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            NAJLEPSZE CENY <br/>
            <span className="text-[#d4af37]">WYWOZU SZAMBA</span>
          </h1>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Niezależne zestawienie sprawdzonych firm asenizacyjnych. Sprawdź aktualne stawki i zamów usługę u liderów regionu.
          </p>
        </div>
      </section>

      {/* 3. LISTA MIEJSCOWOŚCI */}
      <section id="miejscowosci" className="px-6 -mt-16">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Obsługiwane miejscowości</h2>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 'Stanisławów Pierwszy', 'Stanisławów Drugi', 'Wola Aleksandra', 'Wola Kiełpińska', 'Zagroby', 'Zegrze Południowe'].map((city) => (
              <span key={city} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold border border-slate-100 hover:border-[#d4af37] hover:text-[#0f172a] transition-all cursor-default">
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RANKING FIRM */}
      <section id="ranking" className="max-w-7xl mx-auto py-32 px-6">
        <div className="mb-20">
          <h2 className="text-4xl font-black text-[#0f172a] tracking-tighter uppercase mb-4">Ranking Mistrzów</h2>
          <p className="text-slate-500 font-medium">Aktualizacja: Marzec 2026</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* RoJa-Trans */}
          <div className="bg-white border-2 border-[#0f172a]/5 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-[#0f172a] text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-widest">
              Najlepsza Cena
            </div>
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-black text-[#0f172a] uppercase tracking-tighter">RoJa-Trans</h3>
                <p className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest mt-1 italic">Rekomendacja Redakcji</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-[#0f172a]">280<span className="text-sm ml-1 text-slate-400 font-bold">PLN</span></p>
                <p className="text-[9px] font-black text-slate-400 uppercase">Cena za 10m³</p>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-sm font-bold text-slate-600">
                <span className="w-5 h-5 bg-blue-50 text-[#0f172a] rounded-full flex items-center justify-center mr-3 text-[10px]">✓</span>
                Błyskawiczny dojazd
              </li>
              <li className="flex items-center text-sm font-bold text-slate-600">
                <span className="w-5 h-5 bg-blue-50 text-[#0f172a] rounded-full flex items-center justify-center mr-3 text-[10px]">✓</span>
                Płatność kartą u kierowcy
              </li>
            </ul>
            <a href="tel:XXXXXXXXX" className="block w-full text-center bg-[#0f172a] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#1e293b] transition-colors shadow-lg">
              Zadzwoń teraz
            </a>
          </div>

          {/* BRACIA */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-black text-[#0f172a] uppercase tracking-tighter">BRACIA</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Tradycja i Solidność</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-[#0f172a]">290<span className="text-sm ml-1 text-slate-400 font-bold">PLN</span></p>
                <p className="text-[9px] font-black text-slate-400 uppercase">Cena za 10m³</p>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-sm font-bold text-slate-600">
                <span className="w-5 h-5 bg-blue-50 text-[#0f172a] rounded-full flex items-center justify-center mr-3 text-[10px]">✓</span>
                Wysoka kultura obsługi
              </li>
              <li className="flex items-center text-sm font-bold text-slate-600">
                <span className="w-5 h-5 bg-blue-50 text-[#0f172a] rounded-full flex items-center justify-center mr-3 text-[10px]">✓</span>
                Terminy stałe
              </li>
            </ul>
            <a href="tel:XXXXXXXXX" className="block w-full text-center border-2 border-[#0f172a] text-[#0f172a] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#0f172a] hover:text-white transition-all">
              Sprawdź dostępność
            </a>
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
    </main>
  );
}