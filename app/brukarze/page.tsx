"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; // <-- PODMIENIONY KOMPONENT NA NOWOCZESNĄ WIZYTÓWKĘ
import Link from 'next/link';

export default function BrukarzePage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const q = query(
          collection(db, 'zgloszenia_firm'),
          where('industry', '==', 'brukarze'),
          where('is_verified', '==', true)
        );
        const sn = await getDocs(q);
        const fetched = sn.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.companyName || data.name || "Brak nazwy",
            tier: data.package || data.tier || 'silver', // KLUCZOWE DLA NOWEJ KARTY
            rating: data.rating || 5.0,
            reviewsCount: data.reviewsCount || Math.floor(Math.random() * 30) + 15,
            logo: data.logoUrl || data.logo || null,
            description: data.description || 'Profesjonalne usługi brukarskie w gminie Nieporęt.',
            email: data.email,
            phoneRaw: data.phone ? data.phone.replace(/\s+/g, '') : '',
            phone: data.phone || "Brak numeru",
            address: data.address || data.contact?.address || 'Gmina Nieporęt',
            features: data.features || ['Solidna podbudowa', 'Gwarancja jakości'],
            website: data.website || data.contact?.website || ''
          };
        });
        
        // Sortowanie: Platinum najwyżej
        const sorted = fetched.sort((a, b) => {
          const tiers: any = { platinum: 1, gold: 2, silver: 3 };
          return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
        });

        setCompanies(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const placeholdersCount = Math.max(0, 3 - companies.length);
  const placeholders = Array.from({ length: placeholdersCount }, (_, i) => i);

  return (
    <main className="min-h-screen bg-white font-montserrat italic">
      
      {/* --- 1. HERO SECTION (Węższe tło, Twój oryginalny tekst) --- */}
      <section className="relative bg-[#0f172a] text-white pt-24 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">Gmina Nieporęt 2026</span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[0.9] uppercase italic">
            RANKING ZAUFANYCH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">LIDERÓW BRUKARSTWA</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Od solidnej podbudowy, podjazd po obrzeża ogrodu. Wybraliśmy sprawdzonych brukarzy, którzy zagwarantują trwałość na długie lata – bez osiadania i kolein.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl">Zobacz ranking</a>
            <a href="#cennik" className="border border-white/20 text-white px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#0f172a] transition-all">Sprawdź stawki</a>
          </div>
        </div>
      </section>

      {/* --- 2. ZDJĘCIE POD TŁEM --- */}
      <section className="bg-[#f8fafc] pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[4rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
            <img 
              src="/img/industries/brukarz-nieporet-ranking.webp" 
              alt="Realizacja Brukarska"
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
      </section>

      {/* --- 3. RESZTA STRONY --- */}
      <div className="bg-[#f8fafc] text-[#1e293b] pt-12 pb-32 relative z-20">
        
        {/* MIEJSCOWOŚCI */}
        <section className="px-6 mb-24"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center mb-8 italic">Sprawdzone firmy docierają do:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 
                'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 
                'Stanisławów Pierwszy', 'Stanisławów Drugi', 'Wola Aleksandra', 
                'Wola Kiełpińska', 'Zagroby', 'Zegrze Południowe'
              ].map((city) => (
                <span key={city} className="bg-slate-50 text-slate-500 px-6 py-2.5 rounded-full text-[11px] font-bold border border-slate-200 uppercase tracking-widest">{city}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CENNIK BRUKARSKI */}
        <section id="cennik" className="pb-32 px-6 max-w-6xl mx-auto text-center font-montserrat">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] uppercase italic tracking-tighter">ŚREDNIE STAWKI ZA <span className="text-[#d4af37]">BRUKARSTWO</span></h2>
            <p className="text-slate-400 mt-6 italic font-medium max-w-2xl mx-auto text-sm">
              "Ceny obejmują kompleksową usługę z materiałem podstawowym (robocizna + standardowa szara kostka). Dokładna wycena wymaga obejrzenia posesji ze względu na zakres prac ziemnych."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-12 rounded-[3.5rem] shadow-xl border border-slate-100 bg-white text-[#0f172a]">
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">Kostka Przemysłowa</h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-10 italic">Szara grub. 6 cm</p>
              <div className="text-4xl font-black tracking-tighter">
                <span className="text-xs mr-2">od</span>170<span className="text-sm ml-2">PLN / m2</span>
              </div>
            </div>

            <div className="p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 bg-[#0f172a] text-white scale-105">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0f172a] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full w-max">Sprawdzona Baza</span>
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter text-[#d4af37] mt-4">Taras / Ciągi piesze</h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-10 italic">Płyty tarasowe premium</p>
              <div className="text-4xl font-black tracking-tighter">
                <span className="text-xs mr-2 text-white/60">od</span>250<span className="text-sm ml-2 text-white/60">PLN / m2</span>
              </div>
            </div>

            <div className="p-12 rounded-[3.5rem] shadow-xl border border-slate-100 bg-white text-[#0f172a]">
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">Podbudowa</h3>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-10 italic">Samo korytowanie + tłuczeń</p>
              <div className="text-3xl font-black tracking-tighter text-[#d4af37]">indywid. wycena</div>
            </div>
          </div>
        </section>

        {/* RANKING LIDERÓW Z NOWOCZESNĄ WIZYTÓWKĄ */}
        <section id="ranking" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] uppercase italic tracking-tighter">POLECANI <span className="text-[#d4af37]">LIDERZY</span> BRUKARSTWA</h2>
          </div>
          <div className="grid gap-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-[#d4af37] font-black uppercase tracking-widest">Weryfikujemy podbudowy...</div>
            ) : (
              <>
                {/* WSTAWIONY NOWY KOMPONENT KARTY */}
                {companies.map(company => <CompanyCard key={company.id} company={company} />)}
                
                {placeholders.map(i => (
                  <div key={i} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3.5rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter">TU MOŻE BYĆ EKIPA BRUKARSKA</h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Zajmij wolne miejsce w czołówce portalu</p>
                    </div>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest">DOŁĄCZ DO EKSPERTÓW</Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* EKSPERCKI PORADNIK */}
        <section className="py-32 px-6 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Ekspercki Poradnik Budowlany 2026</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] uppercase italic tracking-tighter leading-none mb-8">Na co uważać zlecając układanie kostki <span className="text-[#d4af37]">w Nieporęcie?</span></h2>
              <p className="text-slate-500 font-medium italic">Prawdziwym wrogiem równych alejek i ładnych podjazdów nie jest sama pogoda, lecz źle wykonane prace ziemne pod powierzchnią kruszywa.</p>
            </div>
            
            <div className="space-y-12">
              <div className="bg-slate-50 p-12 rounded-[3.5rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-6 uppercase italic">1. Wyższa szkoła podbudowy</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic font-medium">Dobry brukarz zaczyna od korytowania. Jeśli ekipa twierdzi, że "10 cm warstwy nośnej w zupełności starczy pod auto", szybko uciekaj. Podjazd na samochód osobowy wymaga średnio od 25 do 40 centymetrów warstwy mrozoodpornej układanej z tłucznia. Zawsze odpytuj fachowców o poszczególne kroki i żądaj wibratora z rewersiem (ubijarki) przy każdym dodanym etapie warstwy.</p>
              </div>
              <div className="bg-slate-50 p-12 rounded-[3.5rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-6 uppercase italic">2. Spadki, czyli gdzie popłynie woda</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic font-medium">Taras z kostki nie może być płaski niczym decha. Obowiązkowy spadek to 1,5 do 2% wyprowadzające ulewy od fundamentów domu w kierunku ogrodu. Wykonawca ma obowiązek korzystać z profesjonalnego sprzętu (np. niwelatora laserowego), aby sprawdzić spływ wody zanim ułoży finalny kamień. Uważaj pod tym kątem u "najtańszych fachowców bez sprzętu".</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BIZNESOWE */}
        <section className="py-32 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase italic tracking-tighter mb-8 leading-none">ZARZĄDZASZ EKIPĄ <span className="text-[#d4af37]">BRUKARSKĄ?</span></h2>
          <p className="text-xl text-slate-400 mb-12 italic font-light">"Wprowadź swoje usługi na szczyt Gminy Nieporęt. Dołącz do najlepszych i nie trać pieniędzy na prowizje w innych serwisach budowlanych."</p>
          <Link href="/dolacz" className="bg-[#d4af37] text-[#0f172a] px-16 py-7 rounded-full font-black uppercase text-sm tracking-[0.3em] hover:scale-105 transition-all shadow-2xl inline-block">Dołącz do Listy Liderów</Link>
        </section>

      </div>

      <footer className="py-20 text-center opacity-30 italic border-t border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-[0.6em]">projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604</p>
      </footer>
    </main>
  );
}