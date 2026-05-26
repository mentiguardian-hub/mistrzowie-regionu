import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Polityka Prywatności | Portal Mistrzowie Regionu",
  description: "Zasady ochrony danych osobowych (RODO) portalu Mistrzowie Regionu. Sprawdź, jak dbamy o Twoją prywatność i bezpieczeństwo danych.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-montserrat pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Luksusowe tło dekoracyjne */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none opacity-50"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* NAGŁÓWEK */}
        <div className="mb-16 border-b border-[#d4af37]/20 pb-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Standardy Bezpieczeństwa</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
            Polityka <span className="text-[#d4af37]">Prywatności</span>
          </h1>
          <p className="text-slate-400 font-medium leading-relaxed">
            Szanujemy Twoją prywatność. Niniejszy dokument wyjaśnia, w jaki sposób gromadzimy, przetwarzamy i chronimy Twoje dane osobowe zgodnie z RODO.
          </p>
        </div>

        {/* TREŚĆ PRAWNA */}
        <div className="bg-[#0a1122]/80 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/5 space-y-12 text-slate-300">

          {/* SEKACJA I: ADMINISTRATOR */}
          <section>
            <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-slate-500 opacity-50 font-bold">01.</span> Administrator Danych
            </h2>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <p className="mb-4">Administratorem danych osobowych serwisu <strong className="text-white">mistrzowieregionu.pl</strong> jest:</p>
              <p className="text-white font-black text-lg mb-4">Cezary Mateusz Pysz</p>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-500 uppercase tracking-widest text-[10px]">Adres:</span> ul. Małołęcka 36d, 05-126 Nieporęt</li>
                <li><span className="text-slate-500 uppercase tracking-widest text-[10px]">Kontakt:</span> kontakt@mistrzowieregionu.pl</li>
                <li><span className="text-slate-500 uppercase tracking-widest text-[10px]">Telefon:</span> +48 601 728 604</li>
              </ul>
            </div>
          </section>

          {/* SEKACJA II: CELE I PODSTAWY */}
          <section>
            <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-slate-500 opacity-50 font-bold">02.</span> Cel i Podstawa Przetwarzania
            </h2>
            <ul className="space-y-6 text-sm md:text-base">
              <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 shrink-0"></div>
                <div>
                  <strong className="text-white block mb-1">Kontakt i obsługa zapytań</strong>
                  Dane podane w formularzu lub e-mailu przetwarzamy w celu udzielenia odpowiedzi (Art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes).
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 shrink-0"></div>
                <div>
                  <strong className="text-white block mb-1">Realizacja usług katalogowych</strong>
                  Dane firm (Partnerów) przetwarzamy w celu publikacji ich wizytówek i realizacji zawartych umów (Art. 6 ust. 1 lit. b RODO).
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-2 shrink-0"></div>
                <div>
                  <strong className="text-white block mb-1">Analityka i Cookies</strong>
                  W celu optymalizacji strony i badania ruchu korzystamy z plików cookies (Art. 6 ust. 1 lit. a RODO – Twoja zgoda).
                </div>
              </li>
            </ul>
          </section>

          {/* SEKACJA III: OKRES PRZECHOWYWANIA */}
          <section>
            <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-slate-500 opacity-50 font-bold">03.</span> Czas Przechowywania Danych
            </h2>
            <p className="leading-relaxed">
              Twoje dane przechowujemy tylko tak długo, jak jest to niezbędne:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 marker:text-[#d4af37]">
              <li>Dane kontaktowe: do czasu zakończenia korespondencji.</li>
              <li>Dane firm: przez okres trwania współpracy oraz czas niezbędny do celów podatkowych i prawnych.</li>
              <li>Dane statystyczne: do czasu wygaśnięcia plików cookies lub wycofania zgody.</li>
            </ul>
          </section>

          {/* SEKACJA IV: ODBIORCY DANYCH */}
          <section>
            <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-slate-500 opacity-50 font-bold">04.</span> Odbiorcy Danych
            </h2>
            <p className="leading-relaxed mb-4">Twoje dane mogą być przekazywane zaufanym podmiotom zewnętrznym:</p>
            <ul className="list-disc list-inside space-y-2 marker:text-[#d4af37]">
              <li>Dostawcom usług IT i hostingu (np. Google Firebase).</li>
              <li>Podmiotom świadczącym usługi analityczne (np. Google Analytics).</li>
              <li>Organom uprawnionym na podstawie przepisów prawa.</li>
            </ul>
          </section>

          {/* SEKACJA V: PRAWA UŻYTKOWNIKA */}
          <section>
            <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-slate-500 opacity-50 font-bold">05.</span> Twoje Prawa
            </h2>
            <p className="mb-6 leading-relaxed">Zgodnie z RODO przysługuje Ci prawo do:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Dostępu do danych", "Sprostowania danych", "Usunięcia danych", 
                "Ograniczenia przetwarzania", "Przenoszenia danych", "Sprzeciwu"
              ].map((prawo, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                  <FaCheckCircle className="text-[#d4af37]" /> {prawo}
                </div>
              ))}
            </div>
          </section>

          {/* SEKACJA VI: SZCZEGÓŁY PLIKÓW COOKIES */}
          <section>
            <h2 className="text-xl md:text-2xl font-black text-[#d4af37] uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="text-slate-500 opacity-50 font-bold">06.</span> Szczegóły Plików Cookies
            </h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>Nasz portal wykorzystuje następujące rodzaje plików cookies:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-[#d4af37]">
                <li><strong>Niezbędne:</strong> Umożliwiające poprawne działanie systemu logowania Administratora (Firebase Auth) oraz zachowanie bezpieczeństwa sesji.</li>
                <li><strong>Analityczne:</strong> Pomagające nam zrozumieć, jak mieszkańcy korzystają z Tablicy, co pozwala nam ulepszać Mistrzów Regionu.</li>
                <li><strong>Zarządzanie:</strong> Każdy użytkownik może w dowolnym momencie zmienić ustawienia cookies w swojej przeglądarce (Chrome, Firefox, Safari, Edge).</li>
              </ul>
            </div>
          </section>

          {/* SEKACJA VII: OŚWIADCZENIE (WERYFIKACJA) */}
          <section className="bg-[#d4af37]/5 p-8 rounded-[2rem] border border-[#d4af37]/20">
            <h2 className="text-lg font-black text-white uppercase tracking-widest mb-4">Ważne oświadczenie</h2>
            <p className="text-sm leading-relaxed italic">
              Portal Mistrzowie Regionu dokłada wszelkich starań, aby publikowane harmonogramy wywozu odpadów były aktualne i poprawne. Informujemy jednak, że są one opracowywane na podstawie danych publicznych Gminy Nieporęt i mają charakter wyłącznie informacyjny. Administrator nie ponosi odpowiedzialności za ewentualne rozbieżności wynikające z nagłych zmian wprowadzonych przez podmioty odbierające odpady.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

const FaCheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.248 16.379 6.248 22.628 0z"></path></svg>
);