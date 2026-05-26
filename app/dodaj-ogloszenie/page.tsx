"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db, storage, auth } from '../../lib/firebase';
import { CATEGORIES } from '../../lib/categories';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaImage, FaTimes, FaCheckCircle, FaShareAlt, FaTag, FaMapMarkerAlt, FaLink } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

const LOCATIONS = ['Nieporęt', 'Białobrzegi', 'Izabelin', 'Józefów', 'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 'Stanisławów Drugi', 'Stanisławów Pierwszy', 'Wola Aleksandra', 'Zegrze Południowe'];

// --- LOGIKA GENEROWANIA CZYSTYCH LINKÓW (SLUG) ---
const generateSlug = (title: string) => {
  return title
    .toLowerCase().trim()
    .replace(/[ąĄ]/g, 'a').replace(/[ćĆ]/g, 'c').replace(/[ęĘ]/g, 'e')
    .replace(/[łŁ]/g, 'l').replace(/[ńŃ]/g, 'n').replace(/[óÓ]/g, 'o')
    .replace(/[śŚ]/g, 's').replace(/[źŹ]/g, 'z').replace(/[żŻ]/g, 'z')
    .replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
};

export default function DodajOgloszeniePage() {
  const [sellerType, setSellerType] = useState<'OSOBA PRYWATNA' | 'FIRMA'>('OSOBA PRYWATNA');
  const [formData, setFormData] = useState({ title: '', category: '', description: '', location: '', phone: '', email: '', websiteUrl: '', externalUrl: '' });
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [priceType, setPriceType] = useState<'PLN' | 'NEGOCJACJA' | 'ZA_DARMO'>('PLN');
  const [priceValue, setPriceValue] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const combined = [...images, ...filesArray].slice(0, 5);
      setImages(combined);
      setPreviewUrls(combined.map(file => URL.createObjectURL(file)));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newImages.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) { alert("Wymagana akceptacja regulaminu."); return; }
    setIsSubmitting(true);

    try {
      const baseSlug = generateSlug(formData.title);
      const finalSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
      
      // Honeypot security check
      if (formData.websiteUrl !== '') { setIsSuccess(true); return; }

      let imageUrls: string[] = [];
      if (images.length > 0) {
        const folderId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const uploadPromises = images.map(async (file, i) => {
          const compressedFile = await imageCompression(file, { maxSizeMB: 0.8, maxWidthOrHeight: 1920 });
          const storageRef = ref(storage, `classifieds/${folderId}/${i}_img`);
          const snapshot = await uploadBytes(storageRef, compressedFile);
          return await getDownloadURL(snapshot.ref);
        });
        imageUrls = await Promise.all(uploadPromises);
      }

      const finalEditKey = !user ? Math.random().toString(36).substring(2, 15) : null;
      let finalPrice = priceType === 'ZA_DARMO' ? 'Za darmo' : (priceType === 'NEGOCJACJA' ? `${priceValue} zł (Do negocjacji)` : `${priceValue} zł`);

      await addDoc(collection(db, 'classifieds'), {
        ...formData,
        slug: finalSlug,
        price: finalPrice,
        obrazy: imageUrls,
        image_url: imageUrls[0] || null,
        sellerType,
        createdAt: serverTimestamp(),
        editKey: finalEditKey,
        status: 'active',
        public: true,
        isGuest: !user,
        userId: user ? user.uid : null
      });

      setAddedSlug(finalSlug);
      setIsSuccess(true);
    } catch (err) { 
      console.error(err); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-6">
        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-[#d4af37]/20 text-center max-w-xl w-full shadow-2xl">
          <FaCheckCircle className="text-[#d4af37] text-7xl mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-black uppercase mb-4 tracking-tighter text-white">Ogłoszenie Opublikowane!</h1>
          <p className="mb-8 opacity-70">Twoja oferta jest już widoczna dla mieszkańców Nieporętu.</p>
          
          <div className="bg-black/40 p-6 rounded-2xl mb-8 text-left border border-white/5">
            <h3 className="text-[#d4af37] font-black uppercase text-[10px] mb-3 flex items-center gap-2 tracking-widest"><FaShareAlt /> Twój Link SEO</h3>
            <div className="flex gap-2">
              <code className="bg-black/50 p-3 rounded-lg text-[10px] flex-1 truncate text-slate-400 font-mono">
                https://mistrzowieregionu.pl/ogloszenia/szczegoly/{addedSlug}
              </code>
              <button 
                onClick={() => { 
                  navigator.clipboard.writeText(`https://mistrzowieregionu.pl/ogloszenia/szczegoly/${addedSlug}`); 
                  alert('Link skopiowany!'); 
                }} 
                className="bg-[#d4af37] text-[#0f172a] px-5 py-2 rounded-lg font-black text-[10px] uppercase hover:bg-white transition-colors"
              >
                Kopiuj
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link 
              href={`/ogloszenia/szczegoly/${addedSlug}`} 
              className="bg-white text-[#0f172a] px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest inline-block hover:bg-[#d4af37] hover:scale-105 transition-all"
            >
              Zobacz swoje ogłoszenie
            </Link>
            <Link href="/ogloszenia" className="text-white/40 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all">
              Wróć do Giełdy
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pt-32 pb-24 px-6 font-montserrat">
      <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff7b00] to-[#d4af37]"></div>
        
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#0f172a] text-center mb-10">Dodaj <span className="text-[#ff7b00]">Ogłoszenie</span></h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TYP SPRZEDAWCY */}
          <div className="flex bg-slate-100 p-2 rounded-2xl w-full max-w-md mx-auto border border-slate-200 shadow-inner">
            <button type="button" onClick={() => setSellerType('OSOBA PRYWATNA')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${sellerType === 'OSOBA PRYWATNA' ? 'bg-white text-[#ff7b00] shadow-md' : 'text-slate-500'}`}>OSOBA PRYWATNA</button>
            <button type="button" onClick={() => setSellerType('FIRMA')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${sellerType === 'FIRMA' ? 'bg-white text-[#0f172a] shadow-md' : 'text-slate-500'}`}>FIRMA</button>
          </div>

          {/* FOTO */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">Zdjęcia Przedmiotu (Max 5)</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#996515] shadow-sm">
                  <img src={url} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:bg-rose-600"><FaTimes size={10} /></button>
                </div>
              ))}
              {previewUrls.length < 5 && (
                <label className="aspect-[4/3] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-400 hover:border-[#ff7b00] cursor-pointer text-slate-500 hover:text-[#ff7b00] bg-slate-50 transition-all">
                  <FaImage className="text-2xl mb-1" />
                  <span className="text-[9px] font-black uppercase tracking-tighter">Dodaj Foto</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">Tytuł ogłoszenia</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="np. Sprzedam Rower MTB Nieporęt..." className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-bold shadow-sm" required />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1"><FaTag className="inline mr-1" /> Kategoria</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-bold bg-white cursor-pointer" required>
                <option value="">Wybierz branżę...</option>
                {CATEGORIES.map(cat => <option key={cat.slug} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1"><FaMapMarkerAlt className="inline mr-1" /> Lokalizacja</label>
              <select name="location" value={formData.location} onChange={handleChange} className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-bold bg-white cursor-pointer" required>
                <option value="">Wybierz miejscowość...</option>
                {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">Opis oferty</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-medium resize-none shadow-sm" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1 flex items-center gap-2"><FaLink className="text-[#ff7b00]" /> Link Zewnętrzny (Opcjonalnie)</label>
            <input type="url" name="externalUrl" value={formData.externalUrl} onChange={handleChange} placeholder="https://..." className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-medium shadow-sm" />
          </div>

          <div className="bg-slate-100 p-8 rounded-[2.5rem] border border-slate-200 shadow-inner space-y-6">
             <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">Cena</label>
                <div className="flex bg-white rounded-xl border border-slate-300 p-1.5 text-[10px] font-black uppercase tracking-widest">
                   <button type="button" onClick={() => setPriceType('PLN')} className={`flex-1 py-2.5 rounded-lg transition-all ${priceType === 'PLN' ? 'bg-[#ff7b00] text-white shadow-lg' : 'text-slate-400'}`}>PLN</button>
                   <button type="button" onClick={() => setPriceType('NEGOCJACJA')} className={`flex-1 py-2.5 rounded-lg transition-all ${priceType === 'NEGOCJACJA' ? 'bg-[#ff7b00] text-white shadow-lg' : 'text-slate-400'}`}>DO NEGOCJACJI</button>
                   <button type="button" onClick={() => setPriceType('ZA_DARMO')} className={`flex-1 py-2.5 rounded-lg transition-all ${priceType === 'ZA_DARMO' ? 'bg-[#ff7b00] text-white shadow-lg' : 'text-slate-400'}`}>ZA DARMO</button>
                </div>
                {priceType !== 'ZA_DARMO' && (
                  <div className="relative">
                    <input type="number" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} placeholder="0.00" className="w-full border-2 border-slate-300 rounded-2xl p-5 text-2xl font-black outline-none focus:border-[#ff7b00] shadow-sm pr-12" required />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-400">zł</span>
                  </div>
                )}
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">Telefon</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="000-000-000" className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-bold shadow-sm" required />
                </div>
                {!user && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-slate-600 tracking-widest ml-1">E-mail (do edycji)</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-slate-300 rounded-2xl p-4 text-sm focus:border-[#ff7b00] outline-none font-bold shadow-sm" required />
                  </div>
                )}
             </div>
          </div>

          <div className="flex items-start gap-3 py-2 ml-1">
             <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="w-5 h-5 accent-[#ff7b00] cursor-pointer mt-0.5" required />
             <label className="text-[11px] font-bold text-slate-600 leading-relaxed">
               Akceptuję <Link href="/regulamin" className="text-[#ff7b00] hover:underline font-black">Regulamin</Link> oraz <Link href="/polityka-prywatnosci" className="text-[#ff7b00] hover:underline font-black">RODO</Link>
             </label>
          </div>

          <input type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} className="hidden" />

          <button type="submit" disabled={isSubmitting} className="w-full bg-[#0f172a] text-[#d4af37] py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#ff7b00] hover:text-white transition-all shadow-xl disabled:opacity-50 flex justify-center items-center gap-3">
            {isSubmitting ? <><div className="w-5 h-5 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div> TRWA PUBLIKACJA...</> : 'OPUBLIKUJ MOJE OGŁOSZENIE'}
          </button>
        </form>
      </div>
    </div>
  );
}