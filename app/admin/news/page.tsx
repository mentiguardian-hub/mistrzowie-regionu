"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { FaEdit, FaTrash, FaTimes, FaSave, FaNewspaper, FaCalendarDay, FaSearch, FaCheck } from 'react-icons/fa';

export default function AdminNews() {
  const [news, setNews] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [filter, setFilter] = useState<'draft' | 'published'>('draft'); // Domyślnie otwieramy Szkice, bo tam są dane
  const [loading, setLoading] = useState(true);

  // 1. POBIERANIE DANYCH
  useEffect(() => {
    const q = query(collection(db, 'aktualnosci'));
    
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      fetched.sort((a: any, b: any) => {
         const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
         const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
         return dateB - dateA;
      });
      
      setNews(fetched);
      setLoading(false);
    }, (error) => {
      alert("Błąd połączenia: " + error.message);
    });
    
    return () => unsub();
  }, []);

  const updateItem = async (id: string, data: any) => {
    try {
      await updateDoc(doc(db, 'aktualnosci', id), data);
      setEditingItem(null);
    } catch (e) {
      alert("Błąd zapisu: " + e);
    }
  };

  const deleteItem = async (id: string) => {
    if(confirm("CZY NA PEWNO CHCESZ SKASOWAĆ TEN ARTYKUŁ?")) {
      await deleteDoc(doc(db, 'aktualnosci', id));
    }
  };

  // 2. LOGIKA FILTROWANIA
  const filteredNews = news.filter(a => {
    if (filter === 'draft') {
      return a.status === 'draft' || !a.status || a.status === ''; 
    }
    return a.status === 'published';
  });

  // 3. FUNKCJA BEZPIECZNEGO WYŚWIETLANIA DATY (Zabezpiecza przed błędem "Objects are not valid as a React child")
  const renderSafeDate = (dateVal: any) => {
    if (!dateVal) return "BRAK DATY";
    if (typeof dateVal === 'string') return dateVal;
    if (dateVal.toDate) return dateVal.toDate().toLocaleDateString('pl-PL');
    return "ZŁY FORMAT (OBIEKT)";
  };

  return (
    <div className="animate-in fade-in duration-500 font-montserrat text-slate-900 p-4">
      
      {/* --- NAGŁÓWEK DIAGNOSTYCZNY --- */}
      <div className="flex justify-between items-center mb-10 border-b-4 border-black pb-8">
        <div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Aktualności Regionalne</h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Kolekcja: aktualnosci</span>
            <span className="bg-black text-white text-[9px] px-3 py-1 rounded-full font-bold">
              RAZEM W BAZIE: {news.length}
            </span>
          </div>
        </div>

        {/* PRZEŁĄCZNIK ZAKŁADEK */}
        <div className="flex bg-slate-100 p-2 rounded-2xl border-2 border-black shadow-sm">
          <button onClick={() => setFilter('draft')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${filter === 'draft' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-black'}`}>
            Szkice ({news.filter(a => a.status !== 'published').length})
          </button>
          <button onClick={() => setFilter('published')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase transition-all ${filter === 'published' ? 'bg-black text-white shadow-md' : 'text-slate-500 hover:text-black'}`}>
            Widoczne ({news.filter(a => a.status === 'published').length})
          </button>
        </div>
      </div>

      {/* --- LISTA --- */}
      <div className="grid grid-cols-1 gap-4">
        {loading && <p className="p-20 text-center font-bold text-slate-300 animate-pulse uppercase tracking-[0.3em]">Łączenie z bazą...</p>}
        
        {!loading && filteredNews.length === 0 && (
          <div className="p-20 text-center border-4 border-dashed border-slate-100 rounded-[3rem]">
            <FaSearch className="mx-auto text-slate-200 mb-4" size={50} />
            <p className="font-black text-slate-300 uppercase tracking-widest text-xl">Brak artykułów</p>
          </div>
        )}

        {filteredNews.map((item) => (
          <div key={item.id} className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 flex items-center justify-between hover:border-black transition-all shadow-sm group">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-slate-900 text-[#d4af37] rounded-[1.5rem] flex items-center justify-center border-2 border-black shadow-lg overflow-hidden">
                {typeof item.imageUrl === 'string' && item.imageUrl ? <img src={item.imageUrl} alt="" className="w-full h-full object-cover" /> : <FaNewspaper size={32} />}
              </div>
              <div>
                <h3 className="text-2xl font-black text-black uppercase leading-tight">
                  {typeof item.title === 'string' ? item.title : "Tytuł roboczy"}
                </h3>
                <div className="flex gap-4 mt-4 text-[11px] font-black uppercase">
                  <span className="flex items-center gap-2 text-slate-600 bg-slate-100 px-4 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                    <FaCalendarDay /> {renderSafeDate(item.date)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {item.status !== 'published' && (
                <button onClick={() => updateItem(item.id, { status: 'published' })} className="p-5 bg-emerald-500 text-white rounded-[1.5rem] hover:bg-emerald-600 transition-all shadow-xl hover:scale-105" title="Opublikuj">
                  <FaCheck size={24} />
                </button>
              )}
              <button onClick={() => setEditingItem(item)} className="p-5 bg-slate-900 text-white rounded-[1.5rem] hover:bg-[#d4af37] hover:text-black transition-all shadow-xl">
                <FaEdit size={24}/>
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-5 bg-white border-2 border-rose-600 text-rose-600 rounded-[1.5rem] hover:bg-rose-600 hover:text-white transition-all shadow-md">
                <FaTrash size={24}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL EDYCJI --- */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 text-black">
          <div className="bg-white w-full max-w-4xl rounded-[3.5rem] border-4 border-black shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-10 bg-black text-white flex justify-between items-center">
              <h3 className="text-3xl font-black uppercase tracking-tight italic">Edycja Artykułu</h3>
              <button onClick={() => setEditingItem(null)} className="text-white hover:text-rose-500 transition-colors">
                <FaTimes size={40}/>
              </button>
            </div>

            <div className="p-12 space-y-10 max-h-[70vh] overflow-y-auto">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Tytuł Artykułu</label>
                <input 
                  defaultValue={typeof editingItem.title === 'string' ? editingItem.title : ''} 
                  onChange={(e) => editingItem.title = e.target.value} 
                  className="w-full border-4 border-black rounded-2xl p-6 font-black text-2xl outline-none focus:bg-yellow-50 transition-colors" 
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Link do zdjęcia</label>
                  <input 
                    defaultValue={typeof editingItem.imageUrl === 'string' ? editingItem.imageUrl : ''} 
                    onChange={(e) => editingItem.imageUrl = e.target.value} 
                    className="w-full border-2 border-black rounded-2xl p-5 font-bold text-sm outline-none focus:bg-yellow-50" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Data (np. 10.04.2026)</label>
                  <input 
                    defaultValue={typeof editingItem.date === 'string' ? editingItem.date : ''} 
                    onChange={(e) => editingItem.date = e.target.value} 
                    className="w-full border-2 border-black rounded-2xl p-5 font-black text-xl outline-none focus:bg-yellow-50" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Treść Artykułu</label>
                <textarea 
                  defaultValue={typeof editingItem.content === 'string' ? editingItem.content : ''} 
                  onChange={(e) => editingItem.content = e.target.value} 
                  className="w-full border-4 border-black rounded-[2.5rem] p-8 font-bold text-xl h-80 outline-none focus:bg-yellow-50 leading-relaxed" 
                />
              </div>
            </div>

            <div className="p-10 bg-slate-50 border-t-4 border-black flex justify-end gap-6">
              <select 
                defaultValue={editingItem.status || 'published'}
                onChange={(e) => editingItem.status = e.target.value}
                className="bg-white border-4 border-black rounded-2xl px-10 font-black text-xs uppercase cursor-pointer hover:bg-slate-100"
              >
                <option value="draft">Szkic (Ukryty)</option>
                <option value="published">Opublikowany (Widoczny)</option>
              </select>

              <button 
                onClick={() => updateItem(editingItem.id, editingItem)} 
                className="bg-black text-white px-20 py-7 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all flex items-center gap-6 shadow-2xl active:scale-95"
              >
                <FaSave size={28}/> ZAPISZ ZMIANY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STOPKA */}
      <footer className="mt-20 text-center pb-10 border-t-2 border-slate-100 pt-10">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </div>
  );
}