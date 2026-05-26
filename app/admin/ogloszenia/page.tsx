"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { FaBullhorn, FaTrash, FaEdit, FaCheck, FaTimes, FaSave, FaTag, FaMoneyBillWave } from 'react-icons/fa';

export default function AdminOgloszenia() {
  const [ads, setAds] = useState<any[]>([]);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [filter, setFilter] = useState<'pending' | 'published'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Pobieramy wszystko z szuflady 'classifieds'
    const unsub = onSnapshot(collection(db, 'classifieds'), (snap) => {
      const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sortowanie: najnowsze na górze (jeśli brak daty, idą na dół)
      fetched.sort((a: any, b: any) => {
         const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
         const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
         return dateB - dateA;
      });
      
      setAds(fetched);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const updateAd = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, 'classifieds', id), data);
      setEditingAd(null);
    } catch (e) { alert("Błąd zapisu: " + e); }
  };

  const deleteAd = async (id: string) => {
    if(confirm("USUNĄĆ OGŁOSZENIE?")) await deleteDoc(doc(db, 'classifieds', id));
  };

  // 🕵️ LOGIKA "WYŁAPYWANIA":
  // Zakładka 'pending' pokazuje WSZYSTKO, co nie jest opublikowane.
  const filteredAds = ads.filter(a => {
    if (filter === 'pending') {
      return a.status !== 'published'; 
    }
    return a.status === 'published';
  });

  return (
    <div className="animate-in fade-in duration-500 font-montserrat text-slate-900 p-4">
      
      {/* --- NAGŁÓWEK --- */}
      <div className="flex justify-between items-center mb-10 border-b-4 border-black pb-8">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Ogłoszenia Drobne</h2>
          <p className="text-slate-500 font-bold text-[10px] mt-1 uppercase tracking-widest">
            Diagnostyka: {ads.length} dokumentów w 'classifieds'
          </p>
        </div>

        <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-black shadow-sm">
          <button 
            onClick={() => setFilter('pending')} 
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${filter === 'pending' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-black'}`}
          >
            Do akceptacji ({ads.filter(a => a.status !== 'published').length})
          </button>
          <button 
            onClick={() => setFilter('published')} 
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${filter === 'published' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-black'}`}
          >
            Widoczne ({ads.filter(a => a.status === 'published').length})
          </button>
        </div>
      </div>

      {/* --- LISTA --- */}
      <div className="space-y-4">
        {loading && <p className="p-20 text-center font-bold text-slate-300 animate-pulse uppercase">Szukam ogłoszeń...</p>}
        
        {!loading && filteredAds.length === 0 && (
          <div className="p-20 text-center border-4 border-dashed border-slate-200 rounded-[3rem]">
             <p className="font-black text-slate-400 uppercase tracking-widest">Lista jest pusta</p>
          </div>
        )}

        {filteredAds.map((ad) => (
          <div key={ad.id} className="bg-white border-2 border-slate-200 rounded-[2rem] p-6 flex items-center justify-between hover:border-black transition-all shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 text-[#d4af37] rounded-2xl flex items-center justify-center border-2 border-black">
                <FaBullhorn size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-black uppercase leading-tight">{ad.title || "Ogłoszenie bez tytułu"}</h3>
                <div className="flex gap-4 mt-2 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2 text-emerald-600"><FaMoneyBillWave /> {ad.price || 'Za darmo'}</span>
                  <span className="flex items-center gap-2 text-slate-400"><FaTag /> {ad.category || 'Inne'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {ad.status !== 'published' && (
                <button onClick={() => updateAd(ad.id, { status: 'published' })} className="p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-lg" title="Publikuj">
                  <FaCheck size={20} />
                </button>
              )}
              <button onClick={() => setEditingAd(ad)} className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-[#d4af37] hover:text-black transition-all"><FaEdit size={20}/></button>
              <button onClick={() => deleteAd(ad.id)} className="p-4 bg-white border-2 border-rose-600 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all"><FaTrash size={20}/></button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL EDYCJI --- */}
      {editingAd && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-black">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] border-4 border-black shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 bg-black text-white flex justify-between items-center text-black">
              <h3 className="text-2xl font-black uppercase italic text-white">Poprawianie Ogłoszenia</h3>
              <button onClick={() => setEditingAd(null)} className="text-white hover:text-rose-500 transition-colors"><FaTimes size={35}/></button>
            </div>

            <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-[0.2em]">Tytuł</label>
                <input 
                  defaultValue={editingAd.title} 
                  onChange={(e) => editingAd.title = e.target.value} 
                  className="w-full border-4 border-black rounded-2xl p-5 font-black text-2xl outline-none focus:bg-yellow-50" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-[0.2em]">Cena</label>
                  <input 
                    defaultValue={editingAd.price} 
                    onChange={(e) => editingAd.price = e.target.value} 
                    className="w-full border-2 border-black rounded-xl p-4 font-bold text-lg outline-none" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-[0.2em]">Kategoria</label>
                  <input 
                    defaultValue={editingAd.category} 
                    onChange={(e) => editingAd.category = e.target.value} 
                    className="w-full border-2 border-black rounded-xl p-4 font-bold text-lg outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 mb-2 block tracking-[0.2em]">Opis</label>
                <textarea 
                  defaultValue={editingAd.content} 
                  onChange={(e) => editingAd.content = e.target.value} 
                  className="w-full border-4 border-black rounded-[2rem] p-6 font-bold text-lg h-48 outline-none leading-relaxed" 
                />
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t-4 border-black flex justify-end gap-6">
              <button 
                onClick={() => updateAd(editingAd.id, editingAd)} 
                className="bg-black text-white px-16 py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all flex items-center gap-4 shadow-xl"
              >
                <FaSave size={24}/> ZAPISZ ZMIANY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STOPKA */}
      <footer className="mt-20 text-center pb-10">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </div>
  );
}