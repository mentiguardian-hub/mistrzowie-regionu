"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { 
  FaCrown, FaCheck, FaTimes, FaEdit, FaTrash, 
  FaSearch, FaSave, FaImage, FaMapMarkerAlt, FaGlobe, FaTags 
} from 'react-icons/fa';

export default function AdminFachowcy() {
  const [firms, setFirms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFirm, setEditingFirm] = useState<any>(null);

  // 1. NASŁUCHIWANIE BAZY NA ŻYWO
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'zgloszenia_firm'), (snap) => {
      setFirms(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // 2. AKTUALIZACJA FIRMY
  const updateFirm = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, 'zgloszenia_firm', id), data);
      if (editingFirm) setEditingFirm(null);
    } catch (err) {
      alert("BŁĄD ZAPISU: " + err);
    }
  };

  const filteredFirms = firms.filter(f => 
    (f.companyName || f.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500 bg-white min-h-screen pb-20 p-4">
      
      {/* --- NAGŁÓWEK --- */}
      <div className="flex justify-between items-end mb-12 border-b-4 border-black pb-8">
        <div>
          <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Baza Fachowców</h2>
          <p className="text-black font-bold text-base mt-2 tracking-tight">Zarządzaj widocznością, pakietami i tagami – Centrum Dowodzenia 2026.</p>
        </div>
        
        {/* WYSZUKIWARKA */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Szukaj firmy..." 
            className="pl-12 pr-6 py-4 bg-white border-4 border-black rounded-2xl text-black font-black text-lg outline-none w-96 focus:ring-8 focus:ring-[#d4af37]/20 transition-all placeholder:text-black/30 shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black text-xl" />
        </div>
      </div>

      {/* --- TABELA GŁÓWNA --- */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-black overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black text-white text-sm font-black uppercase tracking-widest">
              <th className="p-7 border-r border-white/20 text-black bg-[#d4af37]">Firma / Branża</th>
              <th className="p-7 border-r border-white/20">Pakiet</th>
              <th className="p-7 border-r border-white/20">Widoczność</th>
              <th className="p-7 text-center">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black/10">
            {filteredFirms.map((f) => {
              const currentTier = f.tier || f.package || 'silver';
              return (
                <tr key={f.id} className="hover:bg-yellow-50 transition-all group">
                  <td className="p-7 border-r border-black/5">
                    <div className="font-black text-black uppercase text-xl leading-none mb-1">{f.companyName || f.name}</div>
                    <div className="text-[10px] text-black font-black uppercase tracking-widest bg-slate-100 border border-black/10 inline-block px-3 py-1 rounded-md mb-1 mr-2">
                      {f.industry || 'Brak branży'}
                    </div>
                    {/* MAŁY WSKAŹNIK MIASTA */}
                    {f.city && (
                       <div className="text-[10px] text-white bg-black font-bold uppercase tracking-widest inline-block px-3 py-1 rounded-md">
                         {f.city}
                       </div>
                    )}
                  </td>
                  
                  <td className="p-7 border-r border-black/5">
                    <select 
                      value={currentTier} 
                      onChange={(e) => updateFirm(f.id, { tier: e.target.value, package: e.target.value })}
                      className={`text-sm font-black uppercase px-5 py-3 rounded-2xl border-4 border-black cursor-pointer transition-all w-full
                        ${currentTier === 'platinum' ? 'bg-[#d4af37] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 
                          currentTier === 'gold' ? 'bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 
                          'bg-slate-200 text-black'}`}
                    >
                      <option value="silver">🥈 SILVER (Standard)</option>
                      <option value="gold">🥇 GOLD (Premium)</option>
                      <option value="platinum">💎 PLATINUM (Lider)</option>
                    </select>
                  </td>

                  <td className="p-7 border-r border-black/5">
                    <button 
                      onClick={() => updateFirm(f.id, { status: f.status === 'active' ? 'inactive' : 'active' })}
                      className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-4 transition-all
                        ${f.status === 'active' ? 'bg-emerald-500 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-black border-black opacity-30'}`}
                    >
                      {f.status === 'active' ? <><FaCheck /> AKTYWNA</> : <><FaTimes /> NIEAKTYWNA</>}
                    </button>
                  </td>

                  <td className="p-7 text-center">
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => setEditingFirm(f)}
                        className="p-4 bg-black text-white rounded-2xl hover:bg-[#d4af37] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button 
                        onClick={() => confirm('USUNĄĆ FIRMĘ NA ZAWSZE?') && deleteDoc(doc(db, 'zgloszenia_firm', f.id))}
                        className="p-4 bg-white border-4 border-rose-600 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- OKNO EDYCJI (MODAL) --- */}
      {editingFirm && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] border-8 border-black shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 bg-black text-white flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic">Konfiguracja Wizytówki</h3>
                <p className="text-[#d4af37] font-bold text-lg uppercase">{editingFirm.companyName || editingFirm.name}</p>
              </div>
              <button onClick={() => setEditingFirm(null)} className="text-white hover:text-rose-500 transition-colors">
                <FaTimes size={45}/>
              </button>
            </div>

            <div className="p-10 grid grid-cols-2 gap-8 overflow-y-auto max-h-[70vh]">
              {/* TAGI / SŁOWA KLUCZOWE */}
              <div className="col-span-2 bg-yellow-50 p-6 rounded-[2rem] border-4 border-dashed border-black/20">
                <label className="text-sm font-black text-black uppercase mb-3 block flex items-center gap-3">
                  <FaTags className="text-[#d4af37]"/> Inteligentne tagi (po przecinku)
                </label>
                <textarea 
                  defaultValue={editingFirm.search_keywords || ''}
                  onChange={(e) => editingFirm.search_keywords = e.target.value}
                  className="w-full bg-white border-4 border-black rounded-[1.5rem] p-5 text-black font-bold text-base outline-none focus:ring-8 focus:ring-[#d4af37]/20 h-24"
                  placeholder="np. dentysta, ortodonta, wybielanie, protezy, dntysta..."
                />
                <p className="text-[10px] text-slate-500 font-bold uppercase mt-2 italic">Dzięki temu "dntysta" znajdzie tę firmę.</p>
              </div>

              {/* OPIS */}
              <div className="col-span-2">
                <label className="text-sm font-black text-black uppercase mb-2 block tracking-widest">Opis Firmy</label>
                <textarea 
                  defaultValue={editingFirm.description}
                  onChange={(e) => editingFirm.description = e.target.value}
                  className="w-full bg-slate-50 border-4 border-black rounded-[1.5rem] p-6 text-black font-bold text-lg outline-none h-40"
                />
              </div>

              {/* TWARDA LISTA ROZWIJANA - MIEJSCOWOŚĆ (NOWOŚĆ DLA SEO) */}
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-black text-black uppercase mb-2 block flex items-center gap-3">
                  <FaMapMarkerAlt className="text-[#d4af37]"/> Miejscowość (Klucz SEO)
                </label>
                <select 
                  defaultValue={editingFirm.city || ""}
                  onChange={(e) => editingFirm.city = e.target.value}
                  className="w-full border-4 border-black rounded-2xl p-5 text-black font-black text-lg outline-none focus:ring-8 focus:ring-[#d4af37]/20 appearance-none bg-white cursor-pointer"
                >
                  <option value="" disabled>Wybierz miejscowość...</option>
                  <option value="Nieporęt">Nieporęt</option>
                  <option value="Białobrzegi">Białobrzegi</option>
                  <option value="Beniaminów">Beniaminów</option>
                  <option value="Izabelin">Izabelin</option>
                  <option value="Józefów">Józefów</option>
                  <option value="Kąty Węgierskie">Kąty Węgierskie</option>
                  <option value="Michałów-Grabina">Michałów-Grabina</option>
                  <option value="Rembelszczyzna">Rembelszczyzna</option>
                  <option value="Stanisławów Pierwszy">Stanisławów Pierwszy</option>
                  <option value="Stanisławów Drugi">Stanisławów Drugi</option>
                  <option value="Wola Aleksandra">Wola Aleksandra</option>
                  <option value="Wola Kiełpińska">Wola Kiełpińska</option>
                  <option value="Zegrze Południowe">Zegrze Południowe</option>
                </select>
              </div>

              {/* ADRES (Tylko ulica) */}
              <div className="col-span-2 md:col-span-1">
                <label className="text-sm font-black text-black uppercase mb-2 block flex items-center gap-3">
                  <FaMapMarkerAlt className="text-rose-600"/> Adres (Ulica i nr)
                </label>
                <input 
                  defaultValue={editingFirm.address}
                  onChange={(e) => editingFirm.address = e.target.value}
                  placeholder="np. ul. Zegrzyńska 12"
                  className="w-full border-4 border-black rounded-2xl p-5 text-black font-black text-lg outline-none focus:ring-8 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="text-sm font-black text-black uppercase mb-2 block flex items-center gap-3"><FaImage/> URL LOGOTYPU</label>
                <input 
                  defaultValue={editingFirm.logoUrl}
                  onChange={(e) => editingFirm.logoUrl = e.target.value}
                  className="w-full border-4 border-black rounded-2xl p-4 text-black font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-black text-black uppercase mb-2 block flex items-center gap-3"><FaGlobe/> STRONA WWW</label>
                <input 
                  defaultValue={editingFirm.website}
                  onChange={(e) => editingFirm.website = e.target.value}
                  className="w-full border-4 border-black rounded-2xl p-4 text-black font-bold text-sm"
                />
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-6 pt-6 border-t-4 border-black/5">
                <div>
                   <label className="text-[10px] font-black text-black uppercase mb-2 block">Telefon</label>
                   <input defaultValue={editingFirm.phone} onChange={(e) => editingFirm.phone = e.target.value} className="w-full border-4 border-black rounded-xl p-4 text-black font-black text-lg"/>
                </div>
                <div>
                   <label className="text-[10px] font-black text-black uppercase mb-2 block">Ocena</label>
                   <input type="number" step="0.1" defaultValue={editingFirm.rating} onChange={(e) => editingFirm.rating = parseFloat(e.target.value)} className="w-full border-4 border-black rounded-xl p-4 text-black font-black text-lg"/>
                </div>
                <div>
                   <label className="text-[10px] font-black text-black uppercase mb-2 block">Opinie</label>
                   <input type="number" defaultValue={editingFirm.reviewsCount} onChange={(e) => editingFirm.reviewsCount = parseInt(e.target.value)} className="w-full border-4 border-black rounded-xl p-4 text-black font-black text-lg"/>
                </div>
              </div>
            </div>

            <div className="p-10 bg-slate-50 border-t-8 border-black flex justify-end">
              <button 
                onClick={() => updateFirm(editingFirm.id, editingFirm)}
                className="bg-black text-white px-20 py-7 rounded-[2.5rem] font-black uppercase text-xl tracking-widest hover:bg-[#d4af37] hover:text-black transition-all flex items-center gap-6 shadow-[10px_10px_0px_0px_rgba(212,175,55,1)] active:scale-95"
              >
                <FaSave size={28}/> ZATWIERDŹ ZMIANY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- STOPKA --- */}
      <footer className="mt-20 text-center pb-10 border-t-2 border-slate-100 pt-10">
         <p className="text-[10px] font-black text-black uppercase tracking-[0.3em] opacity-40">
           © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
         </p>
      </footer>
    </div>
  );
}