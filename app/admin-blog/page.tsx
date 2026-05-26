"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import AdminGuard from '../../components/AdminGuard';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingPosts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'blog_posts'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const sn = await getDocs(q);
      const fetched = sn.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetched);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const handlePublish = async (id: string) => {
    if (!confirm('Na pewno chcesz to udostępnić mieszkańcom?')) return;
    try {
      await updateDoc(doc(db, 'blog_posts', id), { status: 'published' });
      alert('Artykuł udostępniony!');
      fetchPendingPosts();
    } catch (err) {
      console.error(err);
      alert('Błąd podczas zapisywania.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Na pewno chcesz bezpowrotnie usunąć ten wpis?')) return;
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
      alert('Usunięto pomyślnie ze śmietnika historii.');
      fetchPendingPosts();
    } catch (err) {
      console.error(err);
      alert('Błąd usuwania.');
    }
  };

  return (
    <AdminGuard>
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-montserrat py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 bg-white p-8 rounded-[2rem] shadow-sm">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[#0f172a]">Centrum Decyzyjne</h1>
            <p className="text-slate-500 font-medium">Baza artykułów do zatwierdzenia przez Redaktora Naczelnego.</p>
          </div>
          <button onClick={() => { sessionStorage.removeItem('mr_admin_auth'); window.location.reload(); }} className="text-red-500 font-bold uppercase text-xs tracking-widest hover:underline">
            Wyloguj Się (Lock)
          </button>
        </div>

        {loading ? (
           <p className="text-center">Przeszukiwanie czeluści baz danych...</p>
        ) : posts.length === 0 ? (
           <div className="bg-white p-20 rounded-[3rem] text-center border-dashed border-2 border-slate-300">
             <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Pusty Sektor</h3>
             <p className="text-slate-500 font-medium mt-2">Wszyscy grafomani zostali zweryfikowani.</p>
           </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
               <div key={post.id} className="bg-white p-8 rounded-[2rem] shadow-md border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
                 <img src={post.image_url} alt="Cover" className="w-full md:w-64 aspect-video rounded-xl object-cover bg-slate-100 shrink-0" />
                 
                 <div className="flex-1">
                   <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-[#ff7b00] mb-2">
                     <span>{post.category}</span>
                     <span>•</span>
                     <span>Autor: {post.author_name}</span>
                   </div>
                   <h2 className="text-xl md:text-2xl font-black text-[#0f172a] uppercase mb-4 tracking-tighter">{post.title}</h2>
                   <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6 whitespace-pre-wrap">
                     {post.content}
                   </p>
                   
                   <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                     <button onClick={() => handlePublish(post.id)} className="bg-[#001f3f] hover:bg-[#082a1a] text-white px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-colors">
                       [ + ] Opublikuj Oficjalnie
                     </button>
                     <button onClick={() => handleDelete(post.id)} className="border border-red-200 text-red-600 hover:bg-red-50 px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-colors">
                       [ X ] Rozstrzelaj Usuwając
                     </button>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminGuard>
  );
}
