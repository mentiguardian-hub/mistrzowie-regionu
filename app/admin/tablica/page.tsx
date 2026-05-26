"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { FaCheck, FaTrash, FaEdit, FaTimes, FaSave, FaUser, FaRegClock } from 'react-icons/fa';

export default function AdminTablica() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filter, setFilter] = useState<'pending' | 'published'>('pending');
  const [editingPost, setEditingPost] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'tablica_posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const updatePost = async (id: string, data: any) => {
    await updateDoc(doc(db, 'tablica_posts', id), data);
    setEditingPost(null);
  };

  const deletePost = async (id: string) => {
    if(confirm("Czy na pewno chcesz usunąć ten wpis?")) await deleteDoc(doc(db, 'tablica_posts', id));
  };

  const filteredPosts = posts.filter(p => p.status === filter);

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-montserrat animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-200 px-8 py-10 mb-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Moderacja Tablicy</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Przeglądaj i edytuj ogłoszenia mieszkańców.</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setFilter('pending')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${filter === 'pending' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Oczekujące ({posts.filter(p => p.status === 'pending').length})
            </button>
            <button 
              onClick={() => setFilter('published')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase transition-all ${filter === 'published' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Opublikowane
            </button>
          </div>
        </div>
      </div>

      {/* --- LISTA --- */}
      <div className="max-w-6xl mx-auto px-8 space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-[#d4af37]/50 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-[#d4af37] rounded-2xl flex items-center justify-center shadow-inner">
                   <FaUser size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{post.title || "Ogłoszenie"}</h3>
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-1">
                    <span className="flex items-center gap-1"><FaRegClock /> {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'Brak daty'}</span>
                    <span>• Autor: {post.author || 'Mieszkaniec'}</span>
                  </div>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase ${post.status === 'published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                {post.status}
              </span>
            </div>

            <p className="text-slate-700 text-base font-medium leading-relaxed mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
              "{post.content}"
            </p>

            <div className="flex gap-3 border-t border-slate-100 pt-6">
              {post.status === 'pending' && (
                <button 
                  onClick={() => updatePost(post.id, { status: 'published' })}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold uppercase text-[11px] hover:bg-[#d4af37] hover:text-slate-900 transition-all flex items-center gap-2"
                >
                  <FaCheck /> Publikuj
                </button>
              )}
              <button 
                onClick={() => setEditingPost(post)}
                className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold uppercase text-[11px] hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <FaEdit /> Edytuj
              </button>
              <button 
                onClick={() => deletePost(post.id)}
                className="ml-auto text-rose-400 hover:text-rose-600 transition-colors p-3"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL EDYCJI --- */}
      {editingPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 uppercase">Edycja wpisu</h3>
              <button onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-rose-500 transition-colors"><FaTimes size={20}/></button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Tytuł</label>
                <input 
                  defaultValue={editingPost.title}
                  onChange={(e) => editingPost.title = e.target.value}
                  className="w-full border border-slate-200 rounded-xl p-4 text-slate-900 font-bold text-base focus:ring-2 focus:ring-[#d4af37] outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Treść ogłoszenia</label>
                <textarea 
                  defaultValue={editingPost.content}
                  onChange={(e) => editingPost.content = e.target.value}
                  className="w-full border border-slate-200 rounded-xl p-4 text-slate-900 font-medium text-base h-48 focus:ring-2 focus:ring-[#d4af37] outline-none"
                />
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => updatePost(editingPost.id, editingPost)}
                className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest hover:bg-[#d4af37] hover:text-slate-900 transition-all flex items-center gap-2 shadow-lg"
              >
                <FaSave/> Zapisz zmiany
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}