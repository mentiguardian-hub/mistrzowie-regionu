"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { FaSearch, FaChevronRight, FaPhoneAlt, FaCrown, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import Fuse from 'fuse.js';
import { categoriesConfigs } from '../../config/categories'; 

export default function KatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>(categoriesConfigs);

  // 1. POBIERANIE DANYCH Z FIREBASE W CZASIE RZECZYWISTYM
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'zgloszenia_firm'), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(data);
    });
    return () => unsub();
  }, []);

  // 2. OPTYMALIZACJA WYDAJNOŚCI (useMemo) & KONFIGURACJA FUZZY SEARCH
  const fuseCompanies = useMemo(() => new Fuse(companies, {
    keys: [
      { name: 'companyName', weight: 0.8 },
      { name: 'industry', weight: 0.6 },
      { name: 'specialization', weight: 0.6 },
      { name: 'search_keywords', weight: 0.5 },
      { name: 'description', weight: 0.3 }
    ],
    threshold: 0.4, 
    ignoreLocation: true, 
    minMatchCharLength: 3, // ZMIANA: Szukamy firm dopiero od 3 znaków (eliminuje szum)
  }), [companies]); // Przelicza tylko, gdy zmienią się dane w bazie

  const fuseCategories = useMemo(() => new Fuse(categoriesConfigs, {
    keys: [
      { name: 'name', weight: 0.8 },
      { name: 'tags', weight: 0.7 }, // ZMIANA: Nowe czyste pole na synonimy
      { name: 'description', weight: 0.5 },
      { name: 'id', weight: 0.3 }
    ],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 2, // Kategorie reagują bardzo szybko (2 litery)
  }), []); // Kategorie są statyczne, pusta tablica zależności

  // 3. LOGIKA FILTROWANIA (Reakcja na każdy znak)
  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setFilteredCategories(categoriesConfigs);
      return;
    }

    // Wyszukiwanie kategorii (zawsze od 2 znaków)
    let catResults = fuseCategories.search(searchTerm).map(r => r.item);
    setFilteredCategories(catResults);

    // Wyszukiwanie firm (dopiero od 3 znaków, zgodnie z nową architekturą)
    if (searchTerm.trim().length >= 3) {
      let compResults = fuseCompanies.search(searchTerm).map(r => r.item);
      
      const tierWeights: any = { platinum: 3, gold: 2, silver: 1, basic: 0 };
      compResults.sort((a, b) => {
        const weightB = tierWeights[b.tier?.toLowerCase()] || 0;
        const weightA = tierWeights[a.tier?.toLowerCase()] || 0;
        return weightB - weightA;
      });
      
      setSearchResults(compResults);
    } else {
      setSearchResults([]); // Czyścimy wyniki firm, jeśli słowo jest za krótkie
    }

  }, [searchTerm, fuseCompanies, fuseCategories]);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white font-montserrat p-6 md:p-12 !pt-32 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* NAGŁÓWEK I WYSZUKIWARKA */}
        <header className="mb-20 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <Link href="/" className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 mb-6 inline-flex items-center gap-2 transition-all">
              &larr; Wróć na stronę główną
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
              {searchTerm ? 'WYNIKI' : 'PEŁNY'} <span className="text-[#d4af37]">KATALOG</span>
            </h1>
            <p className="text-slate-500 mt-4 text-xs font-bold uppercase tracking-widest opacity-60">
              Znajdź najlepszych fachowców w Gminie Nieporęt
            </p>
          </div>

          <div className="w-full md:w-[400px] relative group">
            <input 
              type="text" 
              placeholder="np. dntysta, szambo, Majodent..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b1120] border-2 border-white/10 rounded-full py-5 pl-8 pr-14 text-white focus:outline-none focus:border-[#d4af37] transition-all shadow-2xl text-lg placeholder:text-white/20"
            />
            <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-[#d4af37] text-xl" />
          </div>
        </header>

        {/* --- DYNAMICZNA TREŚĆ --- */}
        {searchTerm.trim().length >= 2 && searchResults.length === 0 && filteredCategories.length === 0 ? (
          
          /* WIDOK: BRAK WYNIKÓW */
          <div className="text-center py-32 border-4 border-dashed border-white/5 rounded-[3rem]">
             <p className="text-2xl font-black uppercase tracking-widest text-white/20">Nie znaleźliśmy pasujących usług</p>
             <button onClick={() => setSearchTerm('')} className="mt-6 text-[#d4af37] font-black uppercase text-[10px] tracking-widest hover:underline">Pokaż wszystkie kategorie</button>
          </div>
          
        ) : (
          <div className="space-y-16">
            
            {/* KATEGORIE */}
            {filteredCategories.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700">
                {filteredCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Link key={category.id} href={category.link} className="group h-full">
                      <div className="bg-[#0b1120] border border-white/5 rounded-[2.5rem] p-8 h-full flex flex-col hover:border-[#d4af37]/50 hover:bg-[#131c31] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden shadow-xl">
                        <div className="w-14 h-14 rounded-2xl bg-[#0f172a] flex items-center justify-center text-[#d4af37] text-2xl mb-6 group-hover:scale-110 transition-transform border border-white/10">
                          {IconComponent && <IconComponent />}
                        </div>
                        <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{category.name}</h3>
                        <p className="text-slate-500 text-[11px] font-medium leading-relaxed mb-8 flex-grow">{category.description}</p>
                        <div className="flex items-center text-[#d4af37] text-[9px] font-black uppercase tracking-[0.2em] mt-auto pt-4 border-t border-white/5 group-hover:border-[#d4af37]/30 transition-colors">
                          Otwórz branżę <FaChevronRight className="ml-2 w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* WYNIKI FIRM */}
            {searchTerm.trim().length >= 3 && searchResults.length > 0 && (
              <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-10 border-t border-white/10">
                <p className="text-[#d4af37] font-black text-[10px] uppercase tracking-[0.4em] mb-10 border-l-4 border-[#d4af37] pl-4">
                  Rekomendowani wykonawcy:
                </p>
                {searchResults.map((company) => (
                  <CompanyResultCard key={company.id} company={company} />
                ))}
              </div>
            )}
            
          </div>
        )}
      </div>

      <footer className="mt-20 text-center opacity-30 italic pb-6">
        <p className="text-[9px] uppercase tracking-[0.5em]">projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604</p>
      </footer>
    </div>
  );
}

// KOMPONENT WIZYTÓWKI W WYNIKACH
function CompanyResultCard({ company }: { company: any }) {
  const isPlatinum = company.tier?.toLowerCase() === 'platinum';
  const isGold = company.tier?.toLowerCase() === 'gold';
  const displayName = company.companyName || company.name || "Firma bez nazwy";
  
  return (
    <div className={`
      relative border-2 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500
      ${isPlatinum 
        ? 'bg-[#0f172a] border-[#E5E4E2] shadow-[0_0_40px_rgba(255,255,255,0.1)] scale-[1.01] z-10' 
        : isGold 
          ? 'bg-[#0b1120] border-[#d4af37] shadow-lg' 
          : 'bg-[#0b1120] border-white/5 opacity-90'}
      hover:border-white transition-all
    `}>
      
      {isPlatinum && (
        <div className="absolute -top-4 left-8 bg-[#E5E4E2] text-black px-5 py-1.5 rounded-full font-black text-[9px] uppercase tracking-[0.3em] flex items-center gap-2 shadow-lg animate-pulse">
          <FaCrown /> PLATINUM
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left w-full">
        <div className={`
          w-24 h-24 rounded-[1.5rem] flex items-center justify-center text-4xl shrink-0 overflow-hidden shadow-xl
          ${isPlatinum ? 'bg-white text-black border-2 border-[#E5E4E2]' : 'bg-[#0f172a] text-[#d4af37] border border-white/10'}
        `}>
          {company.logoUrl ? <img src={company.logoUrl} className="w-full h-full object-cover" /> : <FaStar />}
        </div>
        
        <div className="flex-grow min-w-0 max-w-full">
          <h3 className={`font-black uppercase tracking-tighter italic leading-tight break-words mb-1 ${isPlatinum ? 'text-2xl md:text-3xl text-white' : 'text-xl md:text-2xl text-slate-100'}`}>
            {displayName}
          </h3>
          <p className={`font-black text-[10px] uppercase tracking-[0.3em] mb-4 ${isPlatinum ? 'text-[#E5E4E2]' : 'text-[#d4af37]'}`}>
            {company.specialization}
          </p>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 text-[11px] font-bold uppercase tracking-widest">
              <FaMapMarkerAlt className={isPlatinum ? 'text-white' : 'text-[#d4af37]'} /> 
              {company.address || 'Gmina Nieporęt'}
            </div>
          </div>
        </div>

        <a 
          href={`tel:${company.phone}`}
          className={`
            w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest transition-all duration-300
            ${isPlatinum 
              ? 'bg-white text-black hover:bg-[#E5E4E2] shadow-[0_10px_20px_rgba(255,255,255,0.1)] text-lg' 
              : 'bg-[#d4af37] text-black hover:bg-white text-sm'}
          `}
        >
          <FaPhoneAlt size={isPlatinum ? 24 : 18} /> {company.phone}
        </a>
      </div>
    </div>
  );
}