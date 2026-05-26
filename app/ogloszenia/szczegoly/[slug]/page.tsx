import React from 'react';
import { Metadata, Viewport } from 'next';
import { db } from '../../../../lib/firebase'; 
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaClock, FaMapMarkerAlt, FaTag, FaPhone, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import ShareButton from "./ShareButton";

// 1. ROZWIĄZANIE OSTRZEŻEŃ: themeColor musi być w viewport
export const viewport: Viewport = {
  themeColor: '#ff7b00',
};

// 2. KLUCZ DO EKSPORTU: Wyłączamy dynamiczne parametry
export const dynamicParams = false;

// 3. FUNKCJA GENERUJĄCA STRONY: Pobiera wszystkie slugi z bazy podczas budowania
export async function generateStaticParams() {
  try {
    const q = query(collection(db, 'classifieds'), where('status', '==', 'published'));
    const snap = await getDocs(q);
    
    return snap.docs.map(doc => ({
      slug: doc.data().slug || doc.id
    }));
  } catch (error) {
    console.error("Błąd podczas generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const q = query(collection(db, 'classifieds'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  
  let data: any = null;
  if (!snap.empty) {
    data = snap.docs[0].data();
  } else {
    const docRef = doc(db, 'classifieds', slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) data = docSnap.data();
  }

  if (!data) return { title: 'Ogłoszenie | Mistrzowie Regionu' };

  return {
    title: `${data.title} - ${data.location} | Nieporęt`,
    description: data.description?.substring(0, 160),
    openGraph: {
      title: data.title,
      description: data.description?.substring(0, 160),
      images: [data.obrazy?.[0] || data.images?.[0] || '/logo.png'],
    }
  };
}

export default async function OgloszenieDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let adData: any = null;
  let adId: string = "";

  const q = query(collection(db, 'classifieds'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);

  if (!snap.empty) {
    adData = snap.docs[0].data();
    adId = snap.docs[0].id;
  } else {
    const docRef = doc(db, 'classifieds', slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      adData = docSnap.data();
      adId = docSnap.id;
    }
  }

  if (!adData) notFound();
  const ad = { id: adId, ...adData };

  const shareUrl = `https://mistrzowieregionu.pl/ogloszenia/szczegoly/${ad.slug || ad.id}`;
  const shareTitle = ad.title;
  const shareText = `Zobacz to ogłoszenie w Nieporęcie: ${ad.title}`;

  const calculateTimeAgo = (ts: any) => {
    if (!ts) return 'niedawno';
    const ms = ts.seconds ? ts.toMillis() : ts;
    const sec = Math.floor((new Date().getTime() - ms) / 1000);
    if (sec / 86400 > 1) return Math.floor(sec / 86400) + " dni temu";
    if (sec / 3600 > 1) return Math.floor(sec / 3600) + " godz. temu";
    return "przed chwilą";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-4 font-montserrat text-[#0f172a]">
      <div className="max-w-4xl mx-auto">
        <Link href="/ogloszenia" className="inline-flex items-center gap-2 text-slate-500 mb-8 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 font-black uppercase text-[10px] tracking-widest hover:text-[#ff7b00] transition-all">
          <FaArrowLeft /> Powrót do giełdy
        </Link>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="w-full h-64 md:h-[500px] bg-slate-900 flex overflow-x-auto snap-x hide-scrollbars border-b-2 border-[#996515]">
            {(ad.obrazy || ad.images || [ad.image_url]).filter(Boolean).map((img: string, i: number) => (
              <img key={i} src={img} className="min-w-full h-full object-contain snap-center" alt={ad.title} />
            ))}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-3 mb-8 items-center">
              <span className="bg-[#0f172a] text-[#ff7b00] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                <FaTag className="inline mr-2"/> {ad.category}
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase">
                <FaClock className="inline mr-1"/> {calculateTimeAgo(ad.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black uppercase mb-8 leading-tight tracking-tighter">{ad.title}</h1>
            
            <p className="text-slate-600 font-medium leading-relaxed mb-12 text-lg whitespace-pre-wrap border-l-4 border-slate-100 pl-6 italic">
              {ad.description}
            </p>

            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 shadow-inner">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Cena ofertowa</p>
                  <p className="text-5xl font-black text-[#ff7b00] tracking-tighter">{ad.price}</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs uppercase shadow-sm">
                    <FaMapMarkerAlt className="text-[#ff7b00]" /> {ad.location}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  <a href={`tel:${ad.phone}`} className="flex items-center justify-center md:justify-start gap-4 bg-[#0f172a] text-white px-10 py-5 rounded-2xl hover:bg-[#ff7b00] transition-all shadow-xl group">
                    <FaPhone className="text-2xl text-[#d4af37] group-hover:text-white" />
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase opacity-50">Zadzwoń teraz</p>
                      <p className="text-xl font-black">{ad.phone}</p>
                    </div>
                  </a>

                  {(ad.externalUrl || ad.websiteUrl) && (
                    <a 
                      href={ad.externalUrl || ad.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-4 bg-[#ff7b00] text-white px-10 py-5 rounded-2xl hover:bg-[#0f172a] transition-all shadow-xl group"
                    >
                      <FaGlobe className="text-2xl text-white" />
                      <div className="text-left">
                        <p className="text-[9px] font-black uppercase opacity-70">Dostępne online</p>
                        <p className="text-xl font-black uppercase">Zobacz w sklepie</p>
                      </div>
                    </a>
                  )}

                  <ShareButton 
                    title={shareTitle} 
                    text={shareText} 
                    url={shareUrl} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
        </p>
      </div>
    </div>
  );
}