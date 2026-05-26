"use client";
import React, { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaImage, FaTimes, FaStar } from 'react-icons/fa';
import Link from 'next/link'; // DODANO: Obsługa aktywnych linków
import imageCompression from 'browser-image-compression';

// --- FUNKCJA AUTOMATYZACJI: GENERATOR SLUGÓW (SEO) ---
const generateSlug = (title: string) => {
  const polishChars: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n', 'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z'
  };
  return title
    .split('')
    .map(char => polishChars[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Usuwa znaki specjalne
    .replace(/[\s_-]+/g, '-')  // Zamienia spacje na myślniki
    .replace(/^-+|-+$/g, '');  // Usuwa myślniki z końców
};

export default function DodajWpisPage() {
  const [formData, setFormData] = useState({
    title: '',
    author_name: '',
    content: '',
    category: 'Ogólne'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!imageFile) throw new Error("Zdjęcie główne jest wymagane do publikacji.");
      if (formData.title.length < 5) throw new Error("Tytuł musi mieć minimum 5 znaków.");
      if (formData.content.length < 20) throw new Error("Treść wiadomości jest zbyt krótka.");

      const options = {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1920,
        useWebWorker: false,
        fileType: "image/webp"
      };
      
      const compressedFile = await imageCompression(imageFile, options);
      const storageRef = ref(storage, `blog_images/${Date.now()}_${compressedFile.name}`);
      const uploadResult = await uploadBytes(storageRef, compressedFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, 'blog_posts'), {
        title: formData.title,
        slug: generateSlug(formData.title),
        author_name: formData.author_name || 'Anonimowy Mieszkaniec',
        content: formData.content,
        category: formData.category,
        image_url: imageUrl,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas wysyłania wpisu.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pt-40 pb-24 px-6 flex items-center justify-center font-montserrat">
        <div className="bg-white rounded-[2rem] p-12 max-w-2xl w-full text-center shadow-2xl border border-slate-100">
          <div className="w-24 h-24 bg-[#001f3f] rounded-full mx-auto flex items-center justify-center mb-8">
            <FaStar className="text-[#ff7b00] text-4xl" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-[#0f172a] mb-6">Wpis Przyjęty!</h1>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
            Dziękujemy za zabranie Głosu. Twój wpis trafił do redakcji portalu Mistrzowie Regionu.
          </p>
          <Link href="/blog" className="inline-block bg-[#ff7b00] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-lg shadow-orange-500/30">
            Wróć do Czytelni
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-32 pb-24 px-6 font-montserrat">
      <div className="max-w-3xl mx-auto text-center mb-12">
         <span className="text-[#ff7b00] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Dziennikarstwo Obywatelskie</span>
         <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
            Napisz Wpis do <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">Głosu Regionu</span>
         </h1>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-[#0f172a]">
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-4">Imię i Nazwisko / Pseudonim</label>
              <input 
                type="text" 
                placeholder="Np. Jan Kowalski"
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-6 py-4 text-sm font-bold outline-none focus:border-[#001f3f] transition-colors"
                value={formData.author_name}
                onChange={e => setFormData({...formData, author_name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-4">Kategoria Wpisu</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-full px-6 py-4 text-sm font-bold outline-none focus:border-[#001f3f] transition-colors appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="Ogólne">Wiadomość Ogólna</option>
                <option value="Ostrzeżenie">Ostrzeżenie</option>
                <option value="Podziękowanie">Podziękowanie</option>
                <option value="Wydarzenie">Lokalne Wydarzenie</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-4">Główny Nagłówek (Tytuł)</label>
             <input 
               type="text" 
               required
               placeholder="Tytuł Twojej historii..."
               className="w-full bg-slate-50 border border-slate-200 rounded-full px-6 py-4 text-sm font-bold outline-none focus:border-[#001f3f] transition-colors"
               value={formData.title}
               onChange={e => setFormData({...formData, title: e.target.value})}
             />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-4">Treść Artykułu</label>
            <textarea 
               required
               rows={8}
               placeholder="Opisz swoją sprawę..."
               className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm font-medium outline-none focus:border-[#001f3f] transition-colors resize-none leading-relaxed"
               value={formData.content}
               onChange={e => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-4">Zdjęcie Okładkowe</label>
            {!previewUrl ? (
              <label className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
                 <FaImage className="text-4xl text-slate-300 mb-4" />
                 <span className="text-sm font-bold">Kliknij, aby wgrać plik</span>
                 <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            ) : (
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200">
                <img src={previewUrl} alt="Podgląd" className="w-full h-full object-cover" />
                <button type="button" onClick={removeImage} className="absolute top-4 right-4 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"><FaTimes /></button>
              </div>
            )}
          </div>

          {/* POWIADOMIENIE PRAWNE Z AKTYWNYMI LINKAMI */}
          <div className="bg-[#fffbeb] border border-[#f59e0b]/20 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="w-12 h-12 bg-[#ff7b00]/10 rounded-full flex items-center justify-center shrink-0">
               <FaStar className="text-[#ff7b00] text-xl" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0f172a] leading-relaxed">
                Wysyłając artykuł akceptujesz{" "}
                <Link href="/regulamin" className="text-[#ff7b00] underline hover:text-[#001f3f] transition-colors">
                  Regulamin
                </Link>{" "}
                oraz{" "}
                <Link href="/polityka-prywatnosci" className="text-[#ff7b00] underline hover:text-[#001f3f] transition-colors">
                  Politykę Prywatności
                </Link>{" "}
                Platformy. Pamiętaj, że wpisy szerzące nienawiść zostaną zablokowane.
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm transition-all ${
              loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#ff7b00] text-white hover:bg-[#e66a00] hover:scale-[1.02]'
            }`}
          >
            {loading ? 'Przetwarzanie...' : 'Wyślij do Redakcji Regionu'}
          </button>
        </form>

        <footer className="mt-12 text-center border-t border-slate-100 pt-8">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
            Mistrzowie Regionu &copy; 2026 | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
          </p>
        </footer>
      </div>
    </div>
  );
}