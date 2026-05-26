"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { FaPenNib, FaTrash, FaEdit, FaCheck, FaTimes, FaSave, FaEye } from 'react-icons/fa';

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const updatePost = async (id: string, data: any) => {
    await updateDoc(doc(db, 'blog_posts', id), data);
    setEditingPost(null);
  };

  const deletePost = async (id: string) => {
    if(confirm("USUNĄĆ TEN ARTYKUŁ?")) await deleteDoc(doc(db, 'blog_posts', id));
  };

  return (
    <div className="animate-in fade-in duration-500 bg-white min-h-screen pb-20 font-montserrat text-slate-900">
      
      {/* --- NAGŁÓWEK --- */}
      <div className="flex justify-between items-end mb-12 border-b-2 border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-black uppercase tracking-tighter">Baza Artykułów Blogowych</h2>
          <p className="text-slate-600 font-bold text-sm mt-1">Publikuj poradniki i buduj zasięgi Mistrzów Regionu.</p>
        </div>
      </div>

      {/* --- LISTA ARTYKUŁÓW --- */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border-2 border-slate-200 rounded-3xl p-6 flex items-center justify-between hover:border-black transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-900 text-[#d4af37] rounded-2xl flex items-center justify-center shadow-md">
                <FaPenNib size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black uppercase leading-tight">{post.title || "Tytuł roboczy"}</h3>
                <div className="flex gap-4 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Autor: {post.author || 'Redakcja'}</span>
                  <span>•</span>
                  <span className={post.status === 'published' ? 'text-emerald-600' : 'text-amber-600'}>
                    {post.status === 'published' ? 'Opublikowany' : 'Szkic'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setEditingPost(post)}
                className="p-3 bg-white border-2 border-black text-black rounded-xl hover:bg-black hover:text-white transition-all"
              >
                <FaEdit />
              </button>
              <button 
                onClick={() => deletePost(post.id)}
                className="p-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL EDYCJI --- */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] border-4 border-black shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-8 bg-black text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold uppercase tracking-tight">Edycja Artykułu</h3>
              <button onClick={() => setEditingPost(null)} className="text-white hover:text-[#d4af37] transition-colors"><FaTimes size={30}/></button>
            </div>

            <div className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-black uppercase mb-2 block">Tytuł Artykułu</label>
                <input 
                  defaultValue={editingPost.title}
                  onChange={(e) => editingPost.title = e.target.value}
                  className="w-full border-2 border-black rounded-xl p-4 text-black font-bold text-xl outline-none focus:bg-yellow-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black uppercase mb-2 block">Krótki Wstęp (Intro)</label>
                <textarea 
                  defaultValue={editingPost.intro}
                  onChange={(e) => editingPost.intro = e.target.value}
                  className="w-full border-2 border-black rounded-xl p-4 text-black font-medium text-base h-24 outline-none focus:bg-yellow-50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black uppercase mb-2 block">Treść Główna</label>
                <textarea 
                  defaultValue={editingPost.content}
                  onChange={(e) => editingPost.content = e.target.value}
                  className="w-full border-2 border-black rounded-2xl p-6 text-black font-medium text-lg h-80 outline-none focus:bg-yellow-50"
                />
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t-4 border-black flex justify-end gap-4">
              <select 
                defaultValue={editingPost.status || 'draft'}
                onChange={(e) => editingPost.status = e.target.value}
                className="bg-white border-2 border-black rounded-xl px-6 font-bold text-xs uppercase"
              >
                <option value="draft">Szkic (Ukryty)</option>
                <option value="published">Opublikowany</option>
              </select>

              <button 
                onClick={() => updatePost(editingPost.id, editingPost)}
                className="bg-black text-white px-12 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#d4af37] hover:text-black transition-all flex items-center gap-3 shadow-lg"
              >
                <FaSave/> Zapisz Artykuł
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}