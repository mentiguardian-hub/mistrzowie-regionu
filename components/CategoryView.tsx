"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaClock, FaMapMarkerAlt, FaTag, FaPhone, FaTimes, 
  FaEnvelope, FaArrowLeft, FaFacebookF, 
  FaWhatsapp, FaLink, FaExternalLinkAlt 
} from 'react-icons/fa';
import SocialShareBar from './SocialShareBar';
import { CATEGORIES } from '../lib/categories';

interface Classified {
  id: string;
  slug?: string;
  title: string;
  category: string;
  price: string;
  description: string;
  location: string;
  phone: string;
  email?: string;
  externalUrl?: string;
  isGuest?: boolean;
  images?: string[];
  obrazy?: string[];
  image_url?: string;
  createdAt: any;
}

interface Props {
  categoryName: string;
  initialAds: any[];
}

export default function CategoryView({ categoryName, initialAds }: Props) {
  const [selectedAd, setSelectedAd] = useState<Classified | null>(null);

  // Funkcja pomocnicza do generowania linku SEO (identyczna jak w widoku głównym)
  const getAdUrl = (ad: Classified) => {
    const identifier = ad.slug || ad.id;
    return `https://mistrzowieregionu.pl/ogloszenia/szczegoly/${identifier}`;
  };

  const calculateTimeAgo = (millis: number) => {
    if (!millis) return 'niedawno';
    const seconds = Math.floor((new Date().getTime() - millis) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dni temu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " godz. temu";
    return "niedawno";
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && initialAds.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const adParam = params.get('ad');
      if (adParam) {
        const ad = initialAds.find(c => c.id === adParam || c.slug === adParam);
        if (ad) setSelectedAd(ad);
      }
    }
  }, [initialAds]);

  const cat = CATEGORIES.find(c => c.name === categoryName);
  const categorySlug = cat ? cat.slug : 'rozne';
  const bannerImage = `/og-${categorySlug}.jpg`;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-montserrat flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <div className="w-full bg-[#0f172a] pt-32 pb-12 relative z-0">
        <div className="max-w-7xl mx-auto w-full px-6 relative z-30 text-center">
          <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto hide-scrollbars pb-4 max-w-full mx-auto px-4">
            <Link href="/ogloszenia/" className="whitespace-nowrap px-4 py-2 rounded-full font-black uppercase tracking-widest text-[8px] transition-all border shrink-0 bg-white/5 text-white border-white/10 hover:bg-[#ff7b00]">
              GŁÓWNA GIEŁDA
            </Link>
            {CATEGORIES.map(c => (
              <Link key={c.slug} href={`/ogloszenia/${c.slug}/`} className={`whitespace-nowrap px-4 py-2 rounded-full font-black uppercase tracking-widest text-[8px] transition-all border shrink-0 ${categoryName === c.name ? 'bg-[#ff7b00] text-white border-[#ff7b00]' : 'bg-white/5 text-white border-white/10'}`}>
                {c.name}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center text-left max-w-6xl mx-auto">
            <div>
              <Link href="/ogloszenia/" className="inline-flex items-center gap-2 text-[#ff7b00] font-black uppercase text-[8px] tracking-widest mb-4 hover:translate-x-[-4px] transition-all"><FaArrowLeft /> powrót</Link>
              <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase text-white leading-tight">{categoryName}</h1>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-medium max-w-md">Najlepsze oferty w kategorii {categoryName} - Nieporęt i okolice.</p>
            </div>
            <div className="relative h-64 md:h-80 w-full bg-contain bg-no-repeat bg-center rounded-[2rem] overflow-hidden" style={{ backgroundImage: `url('${bannerImage}'), url('/og-image.jpg')` }}></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10 mt-8 mb-24">
        <SocialShareBar message={`Zobacz ogłoszenia w kategorii ${categoryName}:`} shareUrl={typeof window !== 'undefined' ? window.location.href : ``} />

        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 min-h-[500px]">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0f172a] border-b-2 border-slate-100 pb-6 mb-8">Lista ogłoszeń ({initialAds.length})</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialAds.map(ad => {
              const imagesArray = ad.obrazy || ad.images || [];
              const coverImage = (imagesArray.length > 0) ? imagesArray[0] : ad.image_url;
              return (
                <div key={ad.id} className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-full group">
                  {coverImage && <div className="w-full h-48 mb-6 rounded-xl overflow-hidden border-2 border-[#996515]"><img src={coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" /></div>}
                  <h3 className="text-xl font-black text-[#0f172a] uppercase mb-4">{ad.title}</h3>
                  <p className="text-2xl font-black text-[#ff7b00] mb-4 mt-auto">{ad.price}</p>
                  
                  {/* KLUCZOWA ZMIANA SEO: Link zamiast buttona */}
                  <Link 
                    href={`/ogloszenia/szczegoly/${ad.slug || ad.id}`} 
                    className="w-full py-3 border-2 border-[#ff7b00] text-[#ff7b00] rounded-xl font-black uppercase text-center text-[10px] hover:bg-[#ff7b00] hover:text-white transition-all"
                  >
                    Szczegóły
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* MODAL (Zostawiamy dla wstecznej kompatybilności udostępnień) */}
      {selectedAd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedAd(null)}>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative p-8 md:p-12" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedAd(null)} className="absolute top-4 right-4 z-50 bg-[#0f172a] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-all"><FaTimes /></button>
            <h2 className="text-2xl md:text-4xl font-black text-[#0f172a] uppercase mb-8">{selectedAd.title}</h2>
            
            {/* Poprawione przyciski udostępniania wewnątrz okienka */}
            <div className="flex gap-4 mb-8">
               <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getAdUrl(selectedAd))}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#ff7b00] hover:bg-[#ff7b00] hover:text-white transition-all"><FaFacebookF /></a>
               <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Sprawdź to ogłoszenie: ' + getAdUrl(selectedAd))}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#ff7b00] hover:bg-[#ff7b00] hover:text-white transition-all"><FaWhatsapp /></a>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
               <p className="text-4xl font-black text-[#ff7b00]">{selectedAd.price}</p>
               <a href={`tel:${selectedAd.phone}`} className="bg-[#0f172a] text-white px-8 py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-[#ff7b00] transition-all">Zadzwoń teraz</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}