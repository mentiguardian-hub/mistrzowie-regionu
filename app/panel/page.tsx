"use client";
import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { FaEdit, FaTrash, FaClock, FaTag, FaMagic } from 'react-icons/fa';
import Link from 'next/link';

interface Classified {
  id: string;
  title: string;
  category: string;
  price: string;
  status: string;
  obrazy?: string[];
  images?: string[];
  image_url?: string;
  createdAt: any;
  expiryDate?: any;
}

export default function PanelPage() {
  const [user, setUser] = useState<any>(null);
  const [ads, setAds] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchMyAds(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const fetchMyAds = async (uid: string) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'classifieds'), where('userId', '==', uid));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Classified));
      
      fetched.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setAds(fetched);
    } catch (err) {
      console.error("Błąd pobierania ogłoszeń:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (adToDelete: Classified) => {
    if (confirm(`Czy na pewno chcesz usunąć ogłoszenie "${adToDelete.title}"? Tej operacji nie cofniemy (usunie trwale z bazy).`)) {
      try {
        const imagesToCleanup = adToDelete.obrazy || adToDelete.images || [];
        if (imagesToCleanup.length > 0) {
          const deletePromises = imagesToCleanup.map(async (url) => {
            try {
              const imageRef = ref(storage, url);
              await deleteObject(imageRef);
            } catch (storageErr) {
              console.error("Nie usunięto zdjęcia:", url, storageErr);
            }
          });
          await Promise.all(deletePromises);
        }

        await deleteDoc(doc(db, 'classifieds', adToDelete.id));
        setAds(ads.filter(ad => ad.id !== adToDelete.id));
        alert('Ogłoszenie i zdjęcia zostały usunięte pomyślnie!');
      } catch (err) {
        console.error(err);
        alert('Wystąpił błąd podczas usuwania dokumentu głównego.');
      }
    }
  };

  const calculateTimeAgo = (timestamp: any) => {
    if (!timestamp) return 'niedawno';
    const seconds = Math.floor((new Date().getTime() - timestamp.toMillis()) / 1000);
    const days = Math.floor(seconds / 86400);
    if (days > 0) return `${days} dni temu`;
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) return `${hours} godz. temu`;
    return 'dzisiaj';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-40 px-6 flex justify-center">
        <div className="w-12 h-12 border-4 border-[#ff7b00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-40 px-6 text-center font-montserrat flex flex-col items-center">
        <h1 className="text-3xl font-black text-[#0f172a] mb-6">Dostęp Zablokowany</h1>
        <p className="text-slate-500 mb-8 max-w-md">Musisz być zalogowany, aby uzyskać dostęp do panelu VIP. Zaloguj się by zarządzać ogłoszeniami.</p>
        <Link href="/logowanie" className="bg-[#ff7b00] text-white px-12 py-4 rounded-full font-black tracking-widest uppercase hover:bg-[#0f172a] transition-all">
          Zaloguj się
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-montserrat text-[#0f172a] pb-32">
      <div className="w-full bg-[#0f172a] pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Zarządzanie Ofertami</span>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Twój Panel <span className="text-[#d4af37]">VIP</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Witaj, {user.displayName || user.email}! Zarządzaj swoimi aktywnymi ogłoszeniami lokalnymi z tego miejsca.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-2xl border border-slate-100">
          
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-slate-100">
            <h2 className="text-2xl font-black uppercase text-[#0f172a]">
              Moje Ogłoszenia ({ads.length})
            </h2>
            <Link href="/dodaj-ogloszenie" className="hidden md:block bg-[#0f172a] text-[#d4af37] px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-white transition-all">
              + Nowe Ogłoszenie
            </Link>
          </div>

          {ads.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <span className="text-4xl block mb-4">📭</span>
              <h3 className="text-xl font-bold mb-2">Pusty Panel</h3>
              <p className="text-slate-500 text-sm mb-6">Nie masz jeszcze żadnych ogłoszeń widocznych publicznie.</p>
              <Link href="/dodaj-ogloszenie" className="bg-[#ff7b00] text-white px-8 py-3 rounded-full font-black uppercase tracking-wider text-xs hover:shadow-lg">
                Dodaj pierwsze ogłoszenie
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map(ad => {
                const imagesArray = ad.obrazy || ad.images || [];
                const coverImage = (imagesArray.length > 0) ? imagesArray[0] : ad.image_url;

                return (
                <div key={ad.id} className="border-2 border-[#d4af37]/30 bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#d4af37] transition-all flex flex-col group relative">
                  {coverImage ? (
                    <div className="h-40 w-full relative bg-slate-100 border-b border-slate-100">
                      <img src={coverImage} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  ) : (
                    <div className="h-40 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Brak Okładki</span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                       <span className="bg-[#0f172a] text-white px-2 py-1 rounded text-[8px] uppercase font-black tracking-widest"><FaTag className="inline mr-1" /> {ad.category}</span>
                       <span className="text-slate-400 text-[9px] font-bold uppercase"><FaClock className="inline mr-0.5" /> Dodano: {calculateTimeAgo(ad.createdAt)}</span>
                    </div>
                    
                    <h3 className="font-black text-lg text-[#0f172a] uppercase leading-tight mt-2 mb-4 line-clamp-2">{ad.title}</h3>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <p className="font-black text-[#ff7b00] text-xl">{ad.price}</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-6">
                      <Link href={`/edytuj?id=${ad.id}`} className="w-full bg-slate-100 hover:bg-slate-200 text-[#0f172a] py-3 rounded-lg flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-colors">
                        <FaEdit /> Edytuj Treść
                      </Link>
                      <button onClick={() => handleDelete(ad)} className="w-full border border-rose-200 hover:bg-rose-50 text-rose-500 py-3 rounded-lg flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-colors">
                        <FaTrash /> Skasuj Trwale
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
