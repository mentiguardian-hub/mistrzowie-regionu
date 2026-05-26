"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { FaStar, FaQuoteLeft, FaUserCircle, FaBuilding, FaPenNib } from 'react-icons/fa';

export default function CzytajOpiniePage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 1. Pobieramy nazwy firm, by pokazać je przy opiniach
        const companiesSnap = await getDocs(collection(db, 'zgloszenia_firm'));
        const companyMap: Record<string, string> = {};
        companiesSnap.forEach(doc => {
          companyMap[doc.id] = doc.data().companyName;
        });

        // 2. Pobieramy tylko ZATWIERDZONE (approved) opinie
        const q = query(
          collection(db, 'reviews'),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          companyName: companyMap[doc.data().companyId] || "Firma lokalna"
        }));

        setReviews(data);
      } catch (err) {
        console.error("Błąd pobierania opinii:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#001f3f] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#ff7b00] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 px-6 font-montserrat">
      
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-[#ff7b00] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Mistrzowie Regionu</span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-[#001f3f]">
          CO MÓWIĄ <span className="text-[#996515]">MIESZKAŃCY?</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">
          Poznaj rzetelne opinie o fachowcach z Twojej okolicy. Wszystkie głosy są weryfikowane pod kątem autentyczności.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-bold italic text-lg uppercase tracking-widest">Aktualnie brak nowych opinii do wyświetlenia.</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col group hover:border-[#ff7b00]/30 transition-all">
              <div className="flex items-center gap-2 mb-4 bg-slate-50 py-1 px-3 rounded-full w-fit">
                <FaBuilding className="text-[#001f3f] text-[10px]" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-[#001f3f]">{rev.companyName}</span>
              </div>

              <div className="flex text-[#ff7b00] mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < rev.rating ? "opacity-100" : "opacity-20"} />
                ))}
              </div>

              <p className="text-slate-600 text-sm italic mb-8 flex-grow leading-relaxed">"{rev.content}"</p>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                <FaUserCircle className="text-3xl text-slate-300" />
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-[#001f3f]">{rev.author}</h4>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Zweryfikowany Głos</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-20 text-center">
         <a href="/opinie" className="inline-flex items-center gap-3 bg-[#001f3f] text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#ff7b00] transition-all shadow-xl">
           <FaPenNib /> Dodaj własną opinię
         </a>
      </div>

      <footer className="mt-24 text-center opacity-30 italic">
        <p className="text-[9px] uppercase tracking-[0.5em]">projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604</p>
      </footer>
    </div>
  );
}