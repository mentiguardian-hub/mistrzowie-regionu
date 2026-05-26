"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { db, auth, storage } from '../../lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { FaTrash, FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

function EdytujContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const id = searchParams?.get('id') as string;
  const key = searchParams?.get('key');

  const [user, setUser] = useState<any>(null);
  const [ad, setAd] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    phone: '',
    price: ''
  });

  const CATEGORIES = [
    'Wiele Branż', 'Nieruchomości', 'Motoryzacja', 'Praca', 'Dom i Ogród', 
    'Usługi', 'Elektronika', 'Oddam za darmo', 'Różne'
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!id || !authChecked) return;

    const fetchAd = async () => {
      try {
        const docRef = doc(db, 'classifieds', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // ACCESS CONTROL
          let hasAccess = false;
          if (data.userId && user && data.userId === user.uid) hasAccess = true;
          if (!data.userId && data.editKey && data.editKey === key) hasAccess = true;

          if (!hasAccess) {
            setError("Brak dostępu. Ogłoszenie należy do kogoś innego lub użyłeś błędnego linku ratunkowego.");
            setLoading(false);
            return;
          }

          setAd({ id: docSnap.id, ...data });
          setFormData({
            title: data.title || '',
            category: data.category || '',
            description: data.description || '',
            location: data.location || '',
            phone: data.phone || '',
            price: data.price || ''
          });
        } else {
          setError("Takie ogłoszenie nie istnieje lub zostało już skasowane.");
        }
      } catch (err) {
        console.error(err);
        setError("Wystąpił błąd podczas ładowania ogłoszenia.");
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id, authChecked, user, key]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const docRef = doc(db, 'classifieds', id);
      await updateDoc(docRef, {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        phone: formData.phone,
        price: formData.price
      });
      setIsSuccess(true);
    } catch (err: any) {
      alert("Błąd aktualizacji: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Czy na pewno chcesz na zawsze usunąć to ogłoszenie? Tej operacji nie cofniemy.")) {
      try {
        const imagesToCleanup = ad.obrazy || ad.images || [];
        if (imagesToCleanup.length > 0) {
          const deletePromises = imagesToCleanup.map(async (url: string) => {
            try {
              const imageRef = ref(storage, url);
              await deleteObject(imageRef);
            } catch (storageErr) {
              console.error("Błąd kasowania fotki ze storage", url, storageErr);
            }
          });
          await Promise.all(deletePromises);
        }
        
        await deleteDoc(doc(db, 'classifieds', id));
        alert("Pomyślnie zlikwidowano anons wraz ze zdjęciami.");
        router.push('/ogloszenia');
      } catch (err: any) {
        alert("Nie udało się skasować głównego pliku: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-40 flex justify-center">
        <div className="w-12 h-12 border-4 border-[#ff7b00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-40 px-6 font-montserrat flex flex-col items-center">
        <span className="text-6xl mb-6">🔒</span>
        <h1 className="text-2xl font-black uppercase text-[#0f172a] mb-4 text-center">Brak uprawnień</h1>
        <p className="text-slate-500 max-w-md text-center">{error}</p>
        <Link href="/ogloszenia" className="mt-8 bg-[#ff7b00] text-white px-8 py-3 rounded-full font-black uppercase text-xs">
          Wróć do Giełdy
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#0f172a] rounded-full mx-auto flex items-center justify-center text-3xl text-[#d4af37] mb-6">
            <FaSave />
          </div>
          <h2 className="text-2xl font-black uppercase mb-4 text-[#0f172a]">Zapisano Zmiany!</h2>
          <p className="text-slate-500 mb-8">Twoje ogłoszenie zostało pomyślnie uaktualnione w bazie regionu.</p>
          <button onClick={() => router.push('/ogloszenia')} className="w-full bg-[#ff7b00] text-white py-4 rounded-xl font-black uppercase text-xs">
            Wróć na Tablicę
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6 font-montserrat">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <span className="text-[#d4af37] font-black uppercase tracking-widest text-xs mb-2 block">CMS Ogłoszeń</span>
        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#0f172a] mb-2">Edycja <span className="text-[#ff7b00]">Treści</span></h1>
        <p className="text-slate-500 text-sm">Zmodyfikuj informacje o usłudze lub produkcie.</p>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f172a] mb-2">Tytuł Anonsu</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              maxLength={70}
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:outline-none focus:border-[#ff7b00] font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f172a] mb-2">Cena (np. 149 zł)</label>
              <input 
                type="text" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:outline-none focus:border-[#ff7b00] font-bold text-[#ff7b00]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f172a] mb-2">Kategoria</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:outline-none focus:border-[#ff7b00] font-medium text-slate-700"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f172a] mb-2">Główna Treść Opisu</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              rows={8}
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:outline-none focus:border-[#ff7b00] font-medium resize-none leading-relaxed text-sm"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f172a] mb-2">Lokalizacja / Odbiór</label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                required 
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:outline-none focus:border-[#ff7b00] font-medium"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#0f172a] mb-2">Telefon Kontaktowy</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
                className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl focus:outline-none focus:border-[#ff7b00] font-medium"
              />
            </div>
          </div>

          <div className="bg-[#0f172a]/5 p-4 rounded-xl text-center text-[10px] font-bold text-slate-500 uppercase">
            ⚠️ Edycja zdjęć z tego poziomu jest obecnie niedostępna. Jeśli chcesz zmienić galerię, skasuj ogłoszenie i wystaw je ponownie.
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0f172a] text-[#d4af37] py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#ff7b00] hover:text-white transition-colors flex justify-center items-center gap-2 mt-4"
          >
            {isSubmitting ? 'ZAPISYWANIE W TOKU...' : <><FaSave className="text-lg" /> Zastosuj Poprawki</>}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <button 
            onClick={handleDelete}
            className="w-full bg-white border-2 border-rose-100 text-rose-500 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-50 hover:border-rose-200 transition-colors flex justify-center items-center gap-2"
          >
            <FaTrash /> Skasuj to ogłoszenie trwale
          </button>
        </div>

      </div>
    </div>
  );
}

export default function EdytujPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc] pt-40 flex justify-center">
        <div className="w-12 h-12 border-4 border-[#ff7b00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <EdytujContent />
    </Suspense>
  );
}
