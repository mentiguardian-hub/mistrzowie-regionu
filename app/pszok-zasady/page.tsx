"use client";
import React from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaHardHat, FaFileDownload, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';

export default function PszokPage() {
  return (
    <div className="min-h-screen bg-[#001f3f] text-white pt-32 pb-24 px-6 font-montserrat">
      
      {/* NAGŁÓWEK I POWRÓT */}
      <div className="max-w-4xl mx-auto mb-12">
        <a href="/harmonogramy" className="relative z-50 inline-flex items-center gap-2 text-[#b59410] hover:text-white transition-colors font-bold text-sm mb-8 uppercase tracking-widest cursor-pointer">
          <FaArrowLeft /> Wróć do harmonogramu
        </a>
        <span className="text-[#b59410] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Regulamin i zasady</span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-[#b59410]">
          PSZOK <span className="text-white">/ NIEPORĘT</span>
        </h1>
        <p className="text-slate-300 font-medium leading-relaxed max-w-2xl">
          Zasady przyjmowania odpadów komunalnych w Punkcie Selektywnego Zbierania Odpadów Komunalnych (PSZOK) przy ul. Małołęckiej 62.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* PODSTAWOWE INFORMACJE */}
        <div className="bg-[#0a1122] rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#b59410]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#b59410]"></div>
          <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-6 flex items-center gap-3">
            <FaInfoCircle className="text-[#b59410]" /> Ważne informacje
          </h2>
          <ul className="space-y-4 text-slate-300 font-medium">
            <li>Odpady przyjmowane są <strong className="text-[#b59410]">wyłącznie</strong> jako zebrane selektywnie.</li>
            <li>Wymagane jest okazanie osobie obsługującej PSZOK <strong className="text-white">potwierdzenia ostatniej dokonanej wpłaty</strong> opłaty za gospodarowanie odpadami.</li>
            <li>W PSZOK udostępniane są kolorowe worki do selektywnej zbiórki oraz worki na popiół.</li>
          </ul>
        </div>

        {/* DWIE KOLUMNY: CO PRZYJMUJĄ / CZEGO NIE */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* CO PRZYJMUJĄ */}
          <div className="bg-[#0f172a] rounded-[2rem] p-8 shadow-lg border border-green-500/20">
            <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-3">
              <FaCheckCircle /> PSZOK przyjmuje
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Papier i tektura</li>
              <li>• Szkło (w tym opakowaniowe)</li>
              <li>• Metale i tworzywa sztuczne</li>
              <li>• Odpady opakowaniowe wielomateriałowe</li>
              <li>• Odpady niebezpieczne (chemikalia, przeterminowane leki)</li>
              <li>• Zużyte baterie i akumulatory</li>
              <li>• Zużyty sprzęt elektryczny i elektroniczny (ZSEE)</li>
              <li>• Meble i inne odpady wielkogabarytowe</li>
              <li>• Zużyte opony</li>
              <li>• Odpady tekstyliów i odzieży</li>
              <li>• Popiół z palenisk domowych</li>
            </ul>
          </div>

          {/* CZEGO NIE PRZYJMUJĄ */}
          <div className="bg-[#0f172a] rounded-[2rem] p-8 shadow-lg border border-red-500/20">
            <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-3">
              <FaTimesCircle /> PSZOK NIE przyjmuje
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>• Odpadów z działalności gospodarczej lub rolniczej</li>
              <li>• Materiałów budowlanych zawierających azbest, papę, smołę</li>
              <li>• Materiałów izolacyjnych</li>
              <li>• Okien i części dachu</li>
              <li>• Części samochodowych</li>
              <li>• Butli gazowych</li>
            </ul>
          </div>

        </div>

        {/* ODPADY BUDOWLANE I ROZBIÓRKOWE */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#0a1122] rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#b59410]/40 relative">
          <FaHardHat className="absolute top-8 right-8 text-6xl text-[#b59410] opacity-10" />
          <h2 className="text-2xl font-black uppercase tracking-widest text-[#b59410] mb-6">
            Odpady budowlane i rozbiórkowe
          </h2>
          <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed mb-8 relative z-10">
            <p>
              Odpady budowlane z drobnych prac remontowych niewymagających pozwolenia na budowę przyjmowane są w ilości <strong>do 3 m³ (tj. 3 000 litrów / ok. 25 worków 120l)</strong> rocznie na jedną nieruchomość.
            </p>
            <p className="text-white font-bold bg-white/5 p-4 rounded-xl border-l-4 border-[#b59410]">
              Uwaga! Aby oddać odpady budowlane, musisz najpierw złożyć wniosek w Urzędzie Gminy Nieporęt i uzyskać stosowne potwierdzenie. Bez tego dokumentu PSZOK nie przyjmie gruzu.
            </p>
          </div>
          
          <div className="flex flex-col items-start gap-4 relative z-10 w-full md:w-auto">
            {/* GŁÓWNY PRZYCISK - PDF */}
            <a 
              href="/wniosek-pszok.pdf" 
              download="Wniosek_PSZOK_Nieporet.pdf"
              className="inline-flex w-full md:w-auto items-center justify-center gap-3 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all bg-[#b59410] text-[#0f172a] hover:bg-[#d4af37] shadow-[0_0_20px_rgba(181,148,16,0.4)]"
            >
              <FaFileDownload className="text-lg" /> POBIERZ WNIOSEK (PDF - DO DRUKU)
            </a>
            
            {/* ALTERNATYWNY LINK - DOC */}
            <a 
              href="/wniosek-pszok.doc" 
              download="Wniosek_PSZOK_Nieporet.doc"
              className="text-[11px] text-slate-400 hover:text-[#b59410] transition-colors flex items-center gap-2 underline decoration-slate-700 underline-offset-4 ml-2"
            >
              Potrzebujesz wersji do wypełnienia na komputerze? Pobierz plik .DOC
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}