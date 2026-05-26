"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, addDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { FaPhoneAlt, FaSms, FaChartBar, FaLock, FaCheck, FaPlus, FaTrashAlt } from 'react-icons/fa';

export default function AnalyticsDashboard() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  
  // Stan dla formularza dodawania
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newOrder, setNewOrder] = useState('1');

  const ADMIN_PIN = "2026"; 

  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, "partners"), orderBy("sortOrder", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setPartners(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) { setIsAuthenticated(true); setError(false); } 
    else { setError(true); setPin(''); }
  };

  // --- FUNKCJA DODAWANIA FIRMY (AUTOMATYZACJA) ---
  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    try {
      await addDoc(collection(db, "partners"), {
        name: newName,
        phone: newPhone,
        sortOrder: Number(newOrder),
        phoneClicks: 0,
        smsClicks: 0,
        active: true
      });
      setNewName(''); setNewPhone('');
    } catch (err) { console.error("Błąd dodawania:", err); }
  };

  // --- FUNKCJA USUWANIA ---
  const handleDelete = async (id: string) => {
    if (window.confirm("Czy na pewno usunąć tę firmę i jej statystyki?")) {
      await deleteDoc(doc(db, "partners", id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 pt-32 font-montserrat text-white">
        <div className="bg-[#0b1120] border border-[#d4af37]/30 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center relative z-10">
          <FaLock className="text-[#d4af37] text-4xl mx-auto mb-6" />
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">Panel Managera</h1>
          <form onSubmit={handleLogin}>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 text-center text-2xl text-white py-4 rounded-xl mb-4 tracking-[0.5em]" placeholder="••••" />
            <button type="submit" className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl uppercase text-xs">Zaloguj</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-montserrat p-6 pt-32 md:p-12 md:pt-40">
      <div className="max-w-6xl mx-auto mt-10">
        
        {/* NAGŁÓWEK */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">MISTRZOWIE <span className="text-[#d4af37]">CONTROL PANEL</span></h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Zarządzanie Partnerami 2026</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-white">
          
          {/* LEWA KOLUMNA: FORMULARZ DODAWANIA */}
          <div className="lg:col-span-1">
            <div className="bg-[#0b1120] border border-[#d4af37]/30 p-8 rounded-[2rem] sticky top-44 shadow-2xl">
              <h2 className="text-xl font-black uppercase italic mb-6 flex items-center gap-3 text-white">
                <FaPlus className="text-[#d4af37] text-sm" /> Dodaj Firmę
              </h2>
              <form onSubmit={handleAddPartner} className="space-y-4 text-white">
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Nazwa Firmy</label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#d4af37]" placeholder="np. EKO-SZAMBO" required />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Telefon (bez spacji)</label>
                  <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#d4af37]" placeholder="600700800" required />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Kolejność (1 = góra)</label>
                  <input type="number" value={newOrder} onChange={(e) => setNewOrder(e.target.value)} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#d4af37]" />
                </div>
                <button type="submit" className="w-full bg-[#d4af37] text-black font-black py-4 rounded-xl uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#d4af37]/20">
                  Zatwierdź i Publikuj
                </button>
              </form>
            </div>
          </div>

          {/* PRAWA KOLUMNA: LISTA I STATYSTYKI */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black uppercase italic mb-6 flex items-center gap-3 text-white">
              <FaChartBar className="text-[#d4af37] text-sm" /> Statystyki na żywo
            </h2>
            
            {partners.length === 0 && (
              <div className="bg-white/5 border border-dashed border-white/20 rounded-[2rem] py-20 text-center text-slate-500 uppercase font-black text-xs tracking-widest">Lista partnerów jest pusta</div>
            )}

            {partners.map(partner => (
              <div key={partner.id} className="bg-[#0b1120] border border-white/5 rounded-[2rem] p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-[#d4af37]/40 transition-all shadow-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="bg-[#d4af37] text-black text-[9px] font-black px-2 py-0.5 rounded italic"># {partner.sortOrder}</span>
                    <h3 className="text-lg font-black uppercase italic tracking-tight text-white">{partner.name}</h3>
                  </div>
                  <p className="text-slate-500 text-xs font-bold">{partner.phone}</p>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-[#0f172a] px-5 py-3 rounded-2xl border border-white/5 text-center min-w-[90px]">
                    <p className="text-[8px] font-black uppercase text-[#d4af37] mb-1 leading-none">TEL</p>
                    <p className="text-xl font-black text-white">{partner.phoneClicks || 0}</p>
                  </div>
                  <div className="bg-[#0f172a] px-5 py-3 rounded-2xl border border-white/5 text-center min-w-[90px]">
                    <p className="text-[8px] font-black uppercase text-[#d4af37] mb-1 leading-none">SMS</p>
                    <p className="text-xl font-black text-white">{partner.smsClicks || 0}</p>
                  </div>
                  <button onClick={() => handleDelete(partner.id)} className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-20 group-hover:opacity-100">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}