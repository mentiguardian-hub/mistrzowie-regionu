import React from 'react';
import { FaTrash, FaLeaf, FaRecycle, FaFileAlt, FaGlassMartiniAlt, FaDownload } from 'react-icons/fa';
// 1. IMPORT NASZEGO NOWEGO PRZYCISKU (Zmień ścieżkę, jeśli przycisk jest w innym folderze)
import PobierzKalendarzButton from './PobierzKalendarzButton'; 

export interface Sector {
  id: number; 
  name: string; 
  places: string; 
  zmieszane: string; 
  bio: string; 
  tworzywa: string; 
  papier: string; 
  szklo: string;
}

export const ScheduleTemplate = ({ month, year, sectors }: { month: string, year: string, sectors: Sector[] }) => (
  <main className="min-h-screen bg-[#0f172a] text-white font-montserrat">
    <section className="pt-48 pb-12 px-6 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">
          Harmonogram <span className="text-[#d4af37]">Nieporęt</span>
        </h1>
        <div className="inline-block bg-[#d4af37] text-[#0f172a] px-8 py-2 rounded-full font-black uppercase tracking-widest text-sm shadow-xl">
          {month} {year}
        </div>
      </div>
    </section>

    <section className="py-12 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {sectors.map((s) => (
          <div key={s.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 hover:border-[#d4af37]/50 transition-all shadow-2xl">
            <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center">
              <div className="xl:w-1/4 text-left">
                <h2 className="text-3xl font-black text-[#d4af37] uppercase tracking-tighter">{s.name}</h2>
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed uppercase tracking-widest font-medium border-l-2 border-[#d4af37] pl-5 italic">
                  {s.places}
                </p>
              </div>
              
              {/* OPAKOWANIE GRID I PRZYCISKU W JEDNĄ KOLUMNĘ */}
              <div className="xl:w-3/4 flex flex-col w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <FaTrash className="mx-auto mb-3 text-slate-500 text-xl" />
                    <div className="text-xl font-black">{s.zmieszane}</div>
                    <div className="text-[7px] text-slate-500 uppercase font-black tracking-widest mt-2">Zmieszane</div>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <FaLeaf className="mx-auto mb-3 text-emerald-500 text-xl" />
                    <div className="text-xl font-black">{s.bio}</div>
                    <div className="text-[7px] text-slate-500 uppercase font-black tracking-widest mt-2">BIO</div>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <FaRecycle className="mx-auto mb-3 text-yellow-500 text-xl" />
                    <div className="text-xl font-black">{s.tworzywa}</div>
                    <div className="text-[7px] text-slate-500 uppercase font-black tracking-widest mt-2">Tworzywa</div>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <FaFileAlt className="mx-auto mb-3 text-blue-300 text-xl" />
                    <div className="text-xl font-black">{s.papier}</div>
                    <div className="text-[7px] text-slate-500 uppercase font-black tracking-widest mt-2">Papier</div>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <FaGlassMartiniAlt className="mx-auto mb-3 text-blue-500 text-xl" />
                    <div className="text-xl font-black">{s.szklo}</div>
                    <div className="text-[7px] text-slate-500 uppercase font-black tracking-widest mt-2">Szkło</div>
                  </div>
                </div>

                {/* 2. NASZ INTELIGENTNY PRZYCISK (pojawia się pod kafelkami) */}
                <div className="mt-6 flex justify-end">
                  <div className="w-full lg:w-1/3">
                    <PobierzKalendarzButton rejonKey={`rejon${s.id}`} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="pb-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="p-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mb-12"></div>
        <a 
          href="/harmonogram-nieporet-kwiecien-2026.jpg" 
          download
          className="inline-flex items-center gap-4 bg-white/5 border border-[#d4af37]/50 hover:border-[#d4af37] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-tighter transition-all shadow-2xl group"
        >
          <FaDownload size={20} className="text-[#d4af37]" />
          Pobierz Opracowanie Mistrzów Regionu (JPG)
        </a>
        <p className="mt-8 text-slate-500 text-[9px] uppercase tracking-[0.2em] leading-relaxed italic max-w-2xl mx-auto">
          Autorskie opracowanie portalu Mistrzowie Regionu na podstawie danych Gminy Nieporęt (2026).
        </p>
      </div>
    </section>
  </main>
);