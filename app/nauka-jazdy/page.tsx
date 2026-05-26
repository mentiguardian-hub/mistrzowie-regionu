import React from 'react';
import Image from 'next/image';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard';
import Link from 'next/link';
import { Metadata } from 'next';

// 1. ZAAWANSOWANE SEO - Nieporęt i Okolice
export const metadata: Metadata = {
  title: 'Nauka Jazdy Nieporęt i Okolice | Mistrzowie Kierownicy | Ranking Szkół',
  description: 'Najlepsze szkoły jazdy w Gminie Nieporęt i okolicach. Sprawdź ranking instruktorów, ceny kursów i opinie kursantów z Twojego regionu. Zdobądź prawo jazdy!',
  keywords: ['nauka jazdy Nieporęt', 'prawo jazdy Nieporęt', 'instruktor jazdy Nieporęt', 'szkoła jazdy Wieliszew', 'kurs kat B Zegrze', 'prawo jazdy Białobrzegi'],
};

// 2. STATYKA: Budujemy raz na godzinę (Symbol ○)
export const revalidate = 3600; 

export default async function NaukaJazdyPage() {
  let companies: any[] = [];

  try {
    const q = query(
      collection(db, 'zgloszenia_firm'),
      where('industry', '==', 'nauka-jazdy'),
      where('is_verified', '==', true)
    );

    const snap = await getDocs(q);
    
    const fetched = snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        tier: data.package || data.tier || 'silver', 
        rating: data.rating || 5.0,
        reviewsCount: data.reviewsCount || 12,
        features: data.features || [
          'Wysoka zdawalność w regionie',
          'Podstawienie auta na egzamin',
          'Indywidualne podejście'
        ]
      };
    });

    const sorted = fetched.sort((a, b) => {
      const tiers: any = { platinum: 1, gold: 2, silver: 3 };
      return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
    });

    companies = JSON.parse(JSON.stringify(sorted));

  } catch (error) {
    console.error("Błąd pobierania szkół jazdy:", error);
  }

  const placeholdersCount = Math.max(0, 3 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <> 
      {/* 1. HERO SECTION Z TWOIM BANEREM */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden italic font-montserrat">
        <Image 
          src="/nauka-jazdy-nieporet-mistrzowieregionu.webp" 
          alt="Nauka Jazdy Nieporęt i Okolice - Mistrzowie Regionu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0f172a]/60"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Edukacja Komunikacyjna • Region Nieporęt</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.8] uppercase italic">
            MISTRZOWIE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">KIEROWNICY</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Profesjonalne kursy prawa jazdy w <span className="text-[#d4af37] font-bold uppercase text-2xl">Nieporęcie i Okolicach</span>. Sprawdź polecanych instruktorów.
          </p>
        </div>
      </section>

      {/* 2. BIAŁA STREFA KONTENTU */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-t-[4rem] -mt-20 relative z-20 pb-32 shadow-[0_-20px_60px_rgba(0,0,0,0.3)]">
        
        {/* --- TUTAJ SĄ TWOJE STAWKI --- */}
        <section className="py-24 font-montserrat px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-4 uppercase italic">Stawki w Regionie</h2>
              <div className="h-2 w-20 bg-[#d4af37] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-500 max-w-2xl mx-auto italic font-medium text-sm">Średnie ceny kursów kat. B dla mieszkańców powiatu.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 italic text-center">
              <div className="bg-white rounded-[3rem] p-10 border-t-4 border-[#d4af37] shadow-xl border-x border-b border-slate-100">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase italic">Kurs Podstawowy</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">30h jazd + Teoria</p>
                <p className="text-4xl font-black text-[#d4af37]">3200 - 3500 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>

              <div className="bg-[#0f172a] text-white rounded-[3rem] p-10 border-t-4 border-[#d4af37] transform md:scale-110 shadow-2xl relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">Najwyższa Zdawalność</span>
                <h3 className="text-xl font-black mb-2 mt-4 uppercase italic text-[#d4af37]">Kurs Rozszerzony</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">Jazdy po trasach WORD</p>
                <p className="text-4xl font-black text-white">3700 - 4200 <span className="text-lg text-slate-300 font-normal">PLN</span></p>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border-t-4 border-[#d4af37] shadow-xl border-x border-b border-slate-100">
                <h3 className="text-xl font-black text-[#0f172a] mb-2 uppercase italic">Jazdy Doszkalające</h3>
                <p className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest">Cena za 1h (60 min)</p>
                <p className="text-4xl font-black text-[#d4af37]">120 - 150 <span className="text-lg text-slate-400 font-normal">PLN</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING FIRM */}
        <section id="ranking" className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter uppercase italic">Polecani Instruktorzy</h2>
            <div className="h-2 w-24 bg-[#0f172a] mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="space-y-12">
            {companies.length === 0 ? (
              <div className="text-center py-20 font-black uppercase text-slate-400">Trwa weryfikacja nowych szkół jazdy z Nieporętu...</div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white border-4 border-dashed border-slate-200 rounded-[3rem] p-16 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">Miejsce dla Twojej Szkoły</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Dotrzyj do kursantów z całej Gminy Nieporęt</p>
                    </div>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-12 py-5 rounded-full font-black uppercase text-xs hover:bg-[#d4af37] hover:text-[#0f172a] transition-all">
                      Zarejestruj Firmę
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* WAŻNE INFORMACJE NA DOLE */}
        <section className="py-24 bg-white border-y border-slate-100 italic">
          <div className="max-w-4xl mx-auto px-6 font-montserrat">
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-16 tracking-tighter uppercase text-center italic">
              Prawo Jazdy w Regionie
            </h2>
            
            <div className="grid gap-10">
              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase">Gdzie załatwić dokumenty?</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Mieszkańcy Gminy Nieporęt (w tym sołectw: Białobrzegi, Zegrze, Beniaminów, Stanisławów) wniosek o profil PKK składają w **Wydziale Komunikacji Starostwa Powiatowego w Legionowie**. Pamiętaj o badaniach lekarskich przed wizytą w urzędzie.
                </p>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-4 uppercase">Trasy Egzaminacyjne</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Wybierając szkołę z naszego rankingu, masz pewność, że jazdy odbywają się po trasach WORD Warszawa (Odlewnicza) lub WORD Legionowo. To kluczowe, aby oswoić się z ruchem przed samym egzaminem.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STOPKA PROJEKTANTA */}
      <footer className="bg-[#0b1120] text-white pt-24 pb-12 px-6 text-center border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 italic">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </>
  );
}