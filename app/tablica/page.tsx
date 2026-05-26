"use client";
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, query, where, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaPaperPlane, FaImage, FaUserCircle, FaInfoCircle, FaShareAlt } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const generateSlug = (title: string) => {
  const polishChars: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
  };
  return title.split('').map(char => polishChars[char] || char).join('').toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

export default function TablicaPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any>({});
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [commentText, setCommentText] = useState<any>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- KROK 1: MECHANIZM NAPRAWCZY BŁĘDU (hasMounted) ---
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => { setHasMounted(true); }, []);
  // -----------------------------------------------------

  useEffect(() => {
    const q = query(collection(db, 'tablica_posts'), where('status', '==', 'published'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (sn) => {
      setPosts(sn.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'tablica_komentarze'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (sn) => {
      const allComments: any = {};
      sn.docs.forEach(doc => {
        const data = doc.data();
        if (!allComments[data.postId]) allComments[data.postId] = [];
        allComments[data.postId].push({ id: doc.id, ...data });
      });
      setComments(allComments);
    });
    return () => unsubscribe();
  }, []);

  // Inteligentne udostępnianie [cite: 2026-02-27]
  const handleShare = async (title: string, slug: string) => {
    const postUrl = `${window.location.origin}/tablica#${slug}`; // Link do Twojej tablicy
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mistrzowie Regionu',
          text: `Zobacz ten post na tablicy Nieporętu: ${title}`,
          url: postUrl
        });
      } catch (err) {
        console.log("Udostępnianie anulowane.");
      }
    } else {
      // Awaryjne kopiowanie linku dla komputerów
      navigator.clipboard.writeText(postUrl);
      alert("Link do posta został skopiowany do schowka! Możesz go wkleić znajomym.");
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.content || !newPost.title) return;
    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const compressed = await imageCompression(imageFile, { maxSizeMB: 0.5, maxWidthOrHeight: 1200 });
        const sRef = ref(storage, `tablica_images/${Date.now()}_${compressed.name}`);
        const up = await uploadBytes(sRef, compressed);
        imageUrl = await getDownloadURL(up.ref);
      }
      await addDoc(collection(db, 'tablica_posts'), {
        ...newPost,
        slug: generateSlug(newPost.title),
        image_url: imageUrl,
        status: 'pending',
        createdAt: serverTimestamp(),
        author: "Mieszkaniec Nieporętu"
      });
      setNewPost({ title: '', content: '' }); setImageFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleComment = async (postId: string) => {
    if (!commentText[postId]) return;
    await addDoc(collection(db, 'tablica_komentarze'), {
      postId,
      text: commentText[postId],
      author: "Sąsiad",
      createdAt: serverTimestamp()
    });
    setCommentText({ ...commentText, [postId]: '' });
  };

  // --- KROK 2: BLOKADA WYŚWIETLANIA DO CZASU ZAŁADOWANIA ---
  if (!hasMounted) return <div className="min-h-screen bg-[#0f172a]" />;
  // -----------------------------------------------------

  return (
    <div className="min-h-screen bg-[#0f172a] pt-32 pb-20 px-4 font-montserrat text-white">
      <div className="max-w-2xl mx-auto">
        
        {/* INFO O MODERACJI */}
        <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 p-5 rounded-3xl mb-8 flex items-center gap-4 backdrop-blur-md">
          <FaInfoCircle className="text-[#d4af37] text-xl" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em] leading-relaxed">
            Weryfikujemy wpisy przed publikacją, aby zachować standardy <span className="text-[#d4af37]">Mistrzów Regionu</span>.
          </p>
        </div>

        {/* FORMULARZ POSTU */}
        <div className="bg-white/5 rounded-[2.5rem] p-8 shadow-2xl mb-12 border border-white/10">
          <h1 className="text-3xl font-black text-[#d4af37] mb-8 uppercase tracking-tighter italic">Tablica Nieporętu</h1>
          {success && <p className="bg-[#d4af37]/20 text-[#d4af37] p-4 rounded-2xl mb-6 text-xs font-black text-center border border-[#d4af37]/30 uppercase tracking-widest">Wpis wysłany do weryfikacji!</p>}
          <form onSubmit={handlePost} className="space-y-5">
            <input 
              placeholder="Tytuł Twojej wiadomości..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-[#d4af37]/50 placeholder:text-slate-500"
              value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})}
            />
            <textarea 
              placeholder="O czym chcesz porozmawiać z sąsiadami?" 
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm text-white outline-none focus:border-[#d4af37]/50 placeholder:text-slate-500 min-h-[120px] resize-none"
              value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})}
            />
            <div className="flex justify-between items-center pt-2">
              <label className="cursor-pointer text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 hover:text-[#d4af37] transition-colors">
                <FaImage className="text-lg" /> {imageFile ? "Zdjęcie wybrane" : "Dodaj zdjęcie"}
                <input type="file" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </label>
              <button disabled={loading} className="bg-[#d4af37] text-[#0f172a] px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                {loading ? "Wysyłanie..." : "Wyślij na Tablicę"}
              </button>
            </div>

            {/* KLAUZULA PRAWNA POD PRZYCISKIEM */}
            <p className="mt-6 text-[9px] text-slate-500 uppercase font-bold tracking-wider leading-relaxed text-center opacity-80">
              Klikając „Wyślij”, akceptujesz <a href="/regulamin" className="text-[#d4af37] underline hover:text-white transition-colors">Regulamin</a> oraz <a href="/polityka-prywatnosci" className="text-[#d4af37] underline hover:text-white transition-colors">Politykę Prywatności</a> serwisu.
            </p>

          </form>
        </div>

        {/* FEED POSTÓW */}
        <div className="space-y-12">
          {posts.map(post => (
            <div key={post.id} id={post.slug} className="bg-white/5 rounded-[3rem] border border-white/10 p-10 hover:border-[#d4af37]/30 transition-all group scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                 <FaUserCircle className="text-slate-600 text-4xl" />
                 <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest border-l-2 border-[#d4af37] pl-4">{post.author}</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-[#d4af37] transition-colors">{post.title}</h2>
              <p className="text-slate-300 text-[15px] leading-relaxed mb-8">{post.content}</p>
              {post.image_url && <img src={post.image_url} className="w-full rounded-[2.5rem] mb-8 shadow-2xl border border-white/5" />}
              
              <div className="pt-8 border-t border-white/5">
                 <div className="space-y-5 mb-8">
                    {comments[post.id]?.map((c: any) => (
                      <div key={c.id} className="bg-white/5 p-6 rounded-[1.5rem] ml-6 border-l-4 border-[#d4af37]">
                        <span className="text-[10px] font-black uppercase text-[#d4af37] block mb-2">{c.author}</span>
                        <p className="text-sm text-slate-200 font-medium leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                 </div>

                 {/* INTELIGENTNY PRZYCISK UDOSTĘPNIANIA */}
                 <div className="mb-6 flex justify-end">
                    <button 
                      onClick={() => handleShare(post.title, post.slug)} 
                      className="flex items-center gap-2 text-[10px] uppercase font-black tracking-wider text-[#d4af37] hover:text-[#0f172a] hover:bg-[#d4af37] transition-all border border-[#d4af37]/30 px-5 py-3 rounded-full"
                    >
                      <FaShareAlt /> Udostępnij Post
                    </button>
                 </div>

                 {/* POLE KOMENTARZA */}
                 <div className="flex gap-3">
                   <input 
                      placeholder="Napisz komentarz..." 
                      className="flex-1 bg-white/5 border border-white/10 rounded-full px-7 py-4 text-xs text-white outline-none focus:border-[#d4af37]/50"
                      value={commentText[post.id] || ''} 
                      onChange={e => setCommentText({...commentText, [post.id]: e.target.value})}
                   />
                   <button onClick={() => handleComment(post.id)} className="w-12 h-12 bg-[#d4af37] text-[#0f172a] rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <FaPaperPlane className="text-xs" />
                   </button>
                 </div>
                 
              </div>
            </div>
          ))}
        </div>

        {/* STOPKA PROJEKTANTA */}
        <footer className="mt-28 text-center border-t border-white/5 pt-12">
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] italic">
            Mistrzowie Regionu &copy; 2026 | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
          </p>
        </footer>
      </div>
    </div>
  );
}