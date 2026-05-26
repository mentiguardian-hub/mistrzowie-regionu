"use client";
import React from 'react';
import { FiStar, FiShield, FiUsers, FiSearch, FiCheck } from 'react-icons/fi';

export default function JakOceniamyPage() {
  return (
    <div className="bg-[#0f172a] min-h-screen text-white font-montserrat italic">
      
      {/* 1. HERO - LUKSUSOWE WEJŚCIE */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[11px] mb-6 block animate-pulse">🔥 CO TAK NAPRAWDĘ SPRAWDZAMY</span>
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-black mb-6 tracking-tighter leading-tight uppercase font-montserrat italic">
            DLACZEGO NIE KAŻDA FIRMA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">TRAFIA DO RANKINGU?</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12 text-balance">
            Nie pokazujemy wszystkich. Najpierw sprawdzamy, potem polecamy. U nas liczy się tylko jedno: czy mieszkańcy Nieporętu są zadowoleni z wykonanej pracy.
          </p>
          <div className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/30 px-10 py-5 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <p className="text-[#d4af37] font-black uppercase text-[11px] tracking-[0.4em] italic flex items-center justify-center gap-3">
              <FiShield className="text-xl" /> Głos sąsiadów + Realna weryfikacja = Uczciwy wybór
            </p>
          </div>
        </div>
      </section>

      {/* 2. GŁÓWNA TREŚĆ - BIAŁA STREFA */}
      <section className="py-24 px-6 bg-white text-[#0f172a] rounded-t-[4rem] shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">
              ⭐ System Ocen mieszkańców
            </h2>
            <p className="text-slate-600 text-lg mb-12 max-w-3xl mx-auto italic font-medium">
              Większość portali pokazuje każdą firmę. My pokazujemy tylko te, które naprawdę "dają radę". To mieszkańcy budują ten ranking.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm">
                <FiUsers className="text-[#d4af37] text-4xl mx-auto mb-6" />
                <p className="font-black uppercase text-[11px] tracking-[0.3em] italic">Tylko realne doświadczenia</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm">
                <FiShield className="text-[#d4af37] text-4xl mx-auto mb-6" />
                <p className="font-black uppercase text-[11px] tracking-[0.3em] italic">Brak anonimowego spamu</p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm">
                <FiCheck className="text-[#d4af37] text-4xl mx-auto mb-6" />
                <p className="font-black uppercase text-[11px] tracking-[0.3em] italic">Każda opinia sprawdzona</p>
              </div>
            </div>
          </div>

          {/* KODEKS MISTRZA - TWOJA ULUBIONA RAMKA */}
          <div className="bg-[#0f172a] rounded-[4rem] p-12 md:p-20 text-center shadow-3xl relative overflow-hidden border-4 border-[#d4af37]/20 mb-24">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-10 italic tracking-tighter text-[#d4af37] relative z-10">
              ❗ KODEKS MISTRZA – Nasze Zobowiązanie
            </h3>
            <p className="text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed text-sm md:text-base italic relative z-10">
              Każda firma w rankingu dobrowolnie zgadza się na nasze standardy obsługi. Nie szukamy ilości, szukamy jakości, która obroni się sama po wykonanej u Ciebie pracy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
              {[
                "Szacunek do czasu klienta",
                "Tylko sprawdzeni fachowcy",
                "Zero przypadkowych firm",
                "Wspieramy lokalny biznes",
                "Nagradzamy uczciwą pracę"
              ].map((zaleta, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <FiCheck className="text-[#d4af37] text-lg" />
                  <span className="font-black uppercase text-[10px] tracking-[0.2em] text-white whitespace-nowrap">{zaleta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
            {/* KARTA PREMIUM - CO SPRAWDZAMY */}
            <div className="bg-[#0f172a] text-white p-12 md:p-16 rounded-[4rem] shadow-2xl border-2 border-[#d4af37]/20">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 text-[#d4af37] italic">🔎 Co sprawdzamy?</h2>
              <div className="space-y-10 text-sm italic font-medium">
                <div>
                  <h4 className="font-black uppercase tracking-widest mb-3 text-white">1. Opinie Klientów</h4>
                  <ul className="text-slate-400 space-y-1.5">
                    <li>• czy są powtarzalne problemy i czy ludzie polecają dalej</li>
                    <li>• czy opinie są wiarygodne i autentyczne</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest mb-3 text-white">2. Kontakt i rzetelność</h4>
                  <ul className="text-slate-400 space-y-1.5">
                    <li>• czy firma odbiera telefon i traktuje klienta poważnie</li>
                    <li>• terminowość oraz brak ukrytych kosztów i naciągania</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 italic text-[#0f172a]">📊 Ranking</h3>
              <p className="text-slate-600 mb-10 leading-relaxed italic">
                Ranking jest żywy. To mieszkańcy Nieporętu decydują, kto zasługuje na miano Mistrza w swojej branży.
              </p>
              <ul className="space-y-8">
                <li className="flex gap-5 items-center">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center text-[11px] font-black shadow-lg text-[#0f172a]">1</div>
                  <p className="text-base font-bold text-slate-700 italic">Tylko najwyższe oceny dają miejsce w polecanych.</p>
                </li>
                <li className="flex gap-5 items-center">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center text-[11px] font-black shadow-lg">2</div>
                  <p className="text-base font-bold text-slate-700 italic">Słaba jakość oznacza usunięcie z rankingu.</p>
                </li>
              </ul>
            </div>
  </div>
          </div>
         </section>

      {/* 3. FIRMY KTÓRE ZAWODZĄ - POWRÓT MROKU */}
     <section className="pt-8 pb-24 px-6 bg-white text-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center border-t border-slate-200 pt-24">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-12 tracking-tighter italic">🚫 Co z firmami, które zawodzą?</h2>
          <p className="text-slate-600 mb-12 italic text-lg max-w-2xl mx-auto">Jeśli firma ma dużo negatywnych opinii, powtarzają się skargi lub nie poprawia jakości – <strong>wypada z polecanych.</strong></p>
          
          <div className="bg-[#0f172a] text-white p-12 md:p-20 rounded-[3.5rem] shadow-3xl border-4 border-[#d4af37]/20 relative italic">
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
            <h3 className="text-3xl md:text-4xl font-black uppercase mb-8 italic tracking-tighter text-[#d4af37] relative z-10">👥 Twój głos ma znaczenie</h3>
            <p className="text-slate-400 mb-12 text-sm leading-relaxed max-w-2xl mx-auto relative z-10 font-medium">Masz doświadczenie z firmą z Nieporętu? Dodaj opinię i pomóż innym sąsiadom uniknąć błędów. Razem tworzymy miejsce, gdzie dobre firmy wygrywają, a słabe znikają.</p>
            <div className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter relative z-10">Nie zgadujesz – sprawdzasz.</div>
            <div className="text-[#d4af37] font-black uppercase text-[11px] tracking-[0.5em] mt-10 opacity-60 relative z-10 italic">Standard Portalu Mistrzowie Regionu</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 text-center border-t border-[#d4af37]/10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 italic">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </div>
  );
}