import { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "O nas - Poznaj Portal Nieporęt",
  description: "Misja portalu Mistrzowie Regionu. Poznaj cele największego serwisu informacyjno-usługowego w Gminie Nieporęt.",
};

export default function ONasPage() {
  return (
    <div className="min-h-screen bg-[#001f3f] text-white font-montserrat pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Tło Premium i Dekory */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b59410]/5 blur-[150px] rounded-full pointer-events-none opacity-50"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* NAGŁÓWEK GŁÓWNY */}
        <div className="mb-16 text-center">
          <span className="text-[#b59410] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Historia Projektu</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 leading-tight drop-shadow-2xl">
            Misja: Nowoczesny Nieporęt <br className="hidden md:block"/> 
            <span className="text-[#b59410]">w zasięgu ręki</span>
          </h1>
          
          <div className="w-full flex justify-center mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-[0_0_20px_rgba(181,148,16,0.2)]">
               <img src="/logo.png" alt="Mistrzowie Regionu - Logo" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* WSTĘP */}
        <div className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[#b59410]/20 shadow-xl text-center mb-16">
          <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
            „Portal Mistrzowie Regionu powstał z prostej potrzeby: chcieliśmy stworzyć miejsce, które ułatwia codzienne życie w Gminie Nieporęt. Jako mieszkańcy wiemy, jak ważne jest posiadanie rzetelnych informacji pod ręką.”
          </p>
        </div>

        {/* FUNKCJONALNOŚCI (LISTA PUNKTOWA PREMIUM) */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-10 text-center drop-shadow-md">
            Co u nas <span className="text-[#b59410]">znajdziesz?</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Karta 1 */}
            <div className="bg-[#0a1122]/50 p-8 rounded-[2rem] border border-white/5 hover:border-[#b59410]/30 transition-colors shadow-lg">
              <h3 className="text-xl font-black text-[#b59410] uppercase tracking-widest mb-3">Zawsze aktualny harmonogram</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Nigdy więcej zapomnianych wystawień kubłów. Nasza wyszukiwarka ulic to najprostszy sposób na sprawdzenie terminów wywozu odpadów.
              </p>
            </div>
            
            {/* Karta 2 */}
            <div className="bg-[#0a1122]/50 p-8 rounded-[2rem] border border-white/5 hover:border-[#b59410]/30 transition-colors shadow-lg">
              <h3 className="text-xl font-black text-[#b59410] uppercase tracking-widest mb-3">Lokalni Mistrzowie</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Promujemy sprawdzonych fachowców z naszej gminy. Szukasz wywozu szamba, elektryka czy hydraulika? U nas znajdziesz ludzi, którzy znają Twoją okolicę.
              </p>
            </div>

            {/* Karta 3 */}
            <div className="bg-[#0a1122]/50 p-8 rounded-[2rem] border border-white/5 hover:border-[#b59410]/30 transition-colors shadow-lg">
              <h3 className="text-xl font-black text-[#b59410] uppercase tracking-widest mb-3">Giełda Sąsiedzka</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Miejsce darmowej wymiany, sprzedaży i zakupu przedmiotów „za rogiem” – bez zbędnych kosztów wysyłki i długiego czekania.
              </p>
            </div>

            {/* Karta 4 */}
            <div className="bg-[#0a1122]/50 p-8 rounded-[2rem] border border-white/5 hover:border-[#b59410]/30 transition-colors shadow-lg">
              <h3 className="text-xl font-black text-[#b59410] uppercase tracking-widest mb-3">Głos Mieszkańców</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Ten portal tworzymy wspólnie. Twój sygnał o błędzie na stronie czy informacja o ważnym wydarzeniu w regionie pozwalają nam stale się rozwijać.
              </p>
            </div>
          </div>
        </div>

        {/* ZAKOŃCZENIE */}
        <div className="text-center p-8 border-t border-[#b59410]/20 pt-16">
          <p className="text-lg md:text-2xl font-black uppercase tracking-widest text-[#b59410] mb-4">
            Nie jesteśmy anonimowym portalem z Warszawy.
          </p>
          <p className="text-white text-base md:text-xl font-bold mb-6">
            Jesteśmy stąd.
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Naszym celem jest budowanie silnej, połączonej społeczności Gminy Nieporęt. Dziękujemy, że jesteś z nami!
          </p>
        </div>

      </div>
    </div>
  );
}
