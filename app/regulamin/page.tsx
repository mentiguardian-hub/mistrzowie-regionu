"use client";
import React from 'react';

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-montserrat pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001f3f] blur-[120px] rounded-full pointer-events-none opacity-40"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12 border-b border-[#d4af37]/20 pb-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Aspekty Prawne</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
            Regulamin <span className="text-[#d4af37]">Serwisu</span>
          </h1>
          <p className="text-slate-400 font-medium italic">Aktualizacja: 2026-04-09. Standardy Portalu Mistrzowie Regionu.</p>
        </div>

        <div className="bg-[#0a1122]/60 backdrop-blur-md p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white/5 space-y-12 text-slate-300">

          {/* §1 */}
          <section>
             <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-5 italic">§1. Postanowienia ogólne</h2>
             <p className="mb-4 text-sm leading-relaxed">Administratorem serwisu <strong>mistrzowieregionu.pl</strong> jest Cezary Mateusz Pysz, ul. Małołęcka 36d, 05-126 Nieporęt (dalej: Administrator).</p>
             <p className="text-sm leading-relaxed">Portal służy jako lokalna platforma informacyjna, giełda ogłoszeń oraz katalog firm (Baza Fachowców) dla mieszkańców Gminy Nieporęt.</p>
          </section>

          {/* §2 */}
          <section className="bg-white/5 p-8 rounded-3xl border border-white/5">
             <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-5 italic">§2. Katalog Firm i Usług</h2>
             <ul className="space-y-4 text-sm md:text-base leading-relaxed list-disc list-inside marker:text-[#d4af37]">
               <li>Administrator udostępnia przestrzeń do prezentacji ofert lokalnych przedsiębiorców.</li>
               <li>Administrator <strong>nie jest stroną umów</strong> zawieranych pomiędzy Użytkownikiem a Firmą. Wszelkie roszczenia z tytułu wykonania usług należy kierować bezpośrednio do wykonawcy.</li>
               <li>Dane w katalogu są dostarczane przez wykonawców. Administrator dokłada starań w celu ich weryfikacji, lecz nie gwarantuje rzetelności wszystkich danych w każdym momencie.</li>
             </ul>
          </section>

          {/* §3 - ODPOWIEDZIALNOŚĆ (Uszczelniona) */}
          <section>
             <h2 className="text-xl md:text-2xl font-black text-rose-500 uppercase tracking-widest mb-5 italic">§3. Odpowiedzialność</h2>
             <p className="mb-4 text-sm leading-relaxed">Administrator nie ponosi odpowiedzialności za:</p>
             <ul className="space-y-2 text-sm ml-4 list-disc marker:text-rose-500 leading-relaxed">
               <li>Szkody wynikające z błędnych terminów w harmonogramach odpadów (mają one charakter wyłącznie informacyjny).</li>
               <li>Treści publikowane przez Użytkowników na Tablicy oraz w ogłoszeniach.</li>
               <li>Administrator stosuje procedurę <strong>"Notice and Takedown"</strong> – niezwłocznie usuwa treści bezprawne po otrzymaniu wiarygodnego zgłoszenia o ich naruszeniu.</li>
             </ul>
          </section>

          {/* §4 - NOWOŚĆ: ZASADY TABLICY */}
          <section className="bg-[#d4af37]/5 p-8 rounded-3xl border border-[#d4af37]/20">
             <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-5 italic">§4. Zasady Tablicy i Giełdy</h2>
             <ul className="space-y-4 text-sm leading-relaxed list-disc list-inside marker:text-[#d4af37]">
               <li>Użytkownik publikujący wpis oświadcza, że posiada do niego pełne autorskie prawa majątkowe.</li>
               <li>Publikując treść, Użytkownik udziela Administratorowi nieodpłatnej, niewyłącznej licencji na jej wyświetlanie w ramach Portalu.</li>
               <li><strong>Zakazuje się</strong> publikowania treści: wulgarnych, nawołujących do nienawiści, naruszających dobra osobiste osób trzecich, pornograficznych oraz spamu reklamowego bez zgody Administratora.</li>
               <li>Administrator zastrzega sobie prawo do moderacji, edycji lub usunięcia dowolnego wpisu bez podania przyczyny.</li>
             </ul>
          </section>

          {/* §5 */}
          <section>
             <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-5 italic">§5. Prawa Autorskie</h2>
             <p className="text-sm leading-relaxed">Wszelkie grafiki, logotypy oraz unikalny układ strony są własnością intelektualną Administratora. Kopiowanie elementów graficznych w celach komercyjnych jest surowo zabronione.</p>
          </section>

          {/* §6 */}
          <section>
             <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-5 italic">§6. Postanowienia końcowe</h2>
             <p className="text-sm leading-relaxed">W sprawach nieuregulowanych niniejszym regulaminem mają zastosowanie przepisy Kodeksu Cywilnego oraz RODO. Zmiany regulaminu wchodzą w życie z chwilą ich publikacji.</p>
          </section>

        </div>
      </div>
    </div>
  );
}