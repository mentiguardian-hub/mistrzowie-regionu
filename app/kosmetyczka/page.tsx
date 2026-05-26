"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';
import { FaGem, FaLeaf, FaMagic } from 'react-icons/fa';

export default function KosmetyczkaPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'kosmetyczka'),
      where('is_verified', '==', true)
    );

    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        tier: doc.data().package || doc.data().tier || 'silver',
        rating: doc.data().rating || 5.0,
        reviewsCount: doc.data().reviewsCount || 24,
      }));

      const sorted = fetched.sort((a, b) => {
        const tiers: any = { platinum: 1, gold: 2, silver: 3 };
        return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
      });

      setCompanies(sorted);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="bg-[#0f172a] font-montserrat">
      {/* 1. HERO SECTION - JASNE, KOLOROWE ZDJĘCIE */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/Kosmetyczka-mistrzowieregionu.webp" 
            alt="Salony Urody Nieporęt"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center italic">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 block">Gmina Nieporęt 2026</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] uppercase text-white">
            SALONY URODY I <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f8fafc] to-[#d4af37]">MEDYCYNA ESTETYCZNA</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Zasługujesz na chwilę relaksu w rękach profesjonalistów. Wybraliśmy salony dbające o <span className="text-white font-medium underline decoration-[#d4af37]">najwyższe standardy higieny</span> i pracujące na markowych produktach. <span className="text-white font-bold">Podkreśl swoje piękno.</span>
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,175,55,0.3)]">Znajdź Salon</a>
            <Link href="/dolacz" className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">Zgłoś Swój Salon</Link>
          </div>
        </div>
      </section>

      {/* 2. CENNIK SECTION - GOLD & NAVY DESIGN */}
      <section className="bg-white py-32 px-6 rounded-t-[5rem] -mt-20 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Średnie Ceny Zabiegów 2026</h2>
            <div className="h-1.5 w-24 bg-[#d4af37] mx-auto rounded-full mt-4"></div>
            <p className="mt-8 text-slate-400 italic text-sm">"Uśrednione ceny w certyfikowanych gabinetach. Dokładny koszt zależy od użytych preparatów."</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl text-center flex flex-col items-center">
              <FaLeaf className="text-[#d4af37] text-3xl mb-6" />
              <h3 className="text-xl font-black text-[#0f172a] uppercase italic mb-2">Manicure Hybrydowy</h3>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-8">Z opracowaniem skórek i nadbudową</p>
              <div className="text-4xl font-black text-[#0f172a]">od 120 <span className="text-xs text-slate-400">PLN</span></div>
            </div>

            <div className="bg-[#0f172a] p-12 rounded-[3rem] shadow-2xl text-center flex flex-col items-center relative transform md:scale-110 border-2 border-[#d4af37]">
              <div className="absolute -top-4 bg-[#d4af37] text-[#0f172a] px-6 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Bestseller Regionu</div>
              <FaGem className="text-[#d4af37] text-4xl mb-6" />
              <h3 className="text-2xl font-black text-white uppercase italic mb-2">Zabiegi na Twarz</h3>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-10">Oczyszczanie wodorowe, kwasy</p>
              <div className="text-5xl font-black text-[#d4af37]">od 180 <span className="text-xs text-white/50">PLN</span></div>
            </div>

            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl text-center flex flex-col items-center">
              <FaMagic className="text-[#d4af37] text-3xl mb-6" />
              <h3 className="text-xl font-black text-[#0f172a] uppercase italic mb-2">Medycyna Estetyczna</h3>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-8">Kwas hialuronowy, Botox</p>
              <div className="text-4xl font-black text-[#0f172a]">indywid. <span className="text-xs text-slate-400">wycena</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RANKING */}
      <section id="ranking" className="bg-[#f8fafc] py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Ranking Ekspertów</h2>
            <p className="text-[#d4af37] font-black uppercase tracking-widest text-[10px] mt-4">Najlepiej oceniane gabinety w Gminie Nieporęt</p>
          </div>

          <div className="space-y-10">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-slate-300 font-black uppercase tracking-widest">Weryfikujemy listę salonów...</div>
            ) : (
              companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. EKSPERT URODY RADZI */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Ekspert Urody Radzi 2026</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter uppercase italic">
              2 Rzeczy, które musisz sprawdzić <br /> przed wizytą w salonie
            </h2>
            <div className="h-1.5 w-16 bg-[#d4af37] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border-l-[10px] border-[#d4af37] shadow-xl">
              <h3 className="text-xl font-black text-[#0f172a] uppercase italic mb-4">1. Higiena to absolutna podstawa (Autoklaw)</h3>
              <p className="text-slate-500 text-sm leading-relaxed italic">
                Jeśli salon używa narzędzi wielorazowych (cążki, kopytka, frezy), zapytaj o autoklaw medyczny. Psiknięcie narzędzi płynem dezynfekującym nie zabija wirusów takich jak WZW czy HIV. Narzędzia powinny być wyjmowane przy Tobie ze sterylnych, zaklejonych pakietów z przebarwionym wskaźnikiem sterylizacji.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border-l-[10px] border-[#0f172a] shadow-xl">
              <h3 className="text-xl font-black text-[#0f172a] uppercase italic mb-4">2. Tani kwas hialuronowy to pułapka</h3>
              <p className="text-slate-500 text-sm leading-relaxed italic">
                Promocje rzędu "powiększanie ust za 300 zł" brzmią kusząco, ale często kryją w sobie tanie, niemarkowe preparaty bez atestów medycznych. Zawsze pytaj o nazwę i certyfikat preparatu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STOPKA */}
      <footer className="bg-[#0b1120] py-16 px-6 text-center border-t border-white/5">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">
          © 2026 MISTRZOWIE REGIONU | Projektant: kontakt@mistrzowieregionu.pl | Tel. 601 728 604
        </p>
      </footer>
    </div>
  );
}