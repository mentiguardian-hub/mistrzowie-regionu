"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import CompanyCard from '../../components/cards/CompanyCard'; // PODMIENIONY NA NOWOCZESNY KOMPONENT
import Link from 'next/link';

export default function HydraulikPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const q = query(
          collection(db, 'zgloszenia_firm'),
          where('industry', '==', 'hydraulik'),
          where('is_verified', '==', true)
        );
        const sn = await getDocs(q);
        const fetched = sn.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.companyName || data.name || "Brak nazwy",
            tier: data.package || data.tier || 'silver', // KLUCZOWE: ODCZYT PAKIETU DO NOWEJ KARTY
            rating: data.rating || 5.0,
            reviewsCount: data.reviewsCount || Math.floor(Math.random() * 30) + 15,
            logo: data.logoUrl || data.logo || null,
            description: data.description || 'Szybki dojazd, skuteczna diagnoza i usunięcie usterki bez zbędnych kosztów. Autoryzowany serwis.',
            email: data.email,
            phoneRaw: data.phone ? data.phone.replace(/\s+/g, '') : '',
            phone: data.phone || "Brak numeru",
            address: data.address || data.contact?.address || 'Gmina Nieporęt',
            features: data.features || ['Terminowość', 'Szybka reakcja w przypadku awarii'],
            website: data.website || data.contact?.website || ''
          };
        });
        
        // Sortowanie: Platinum na szczycie
        const sorted = fetched.sort((a, b) => {
          const tiers: any = { platinum: 1, gold: 2, silver: 3 };
          return (tiers[a.tier?.toLowerCase()] || 4) - (tiers[b.tier?.toLowerCase()] || 4);
        });

        setCompanies(sorted);
      } catch (err) {
        console.error("Error fetching companies:", err);
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
      
      {/* --- 1. HERO SECTION (Węższe tło, mocny tekst) --- */}
      <section className="relative bg-[#0f172a] text-white pt-24 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, #d4af37 0%, transparent 70%)" }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block animate-fade-in">
            Gmina Nieporęt 2026
          </span>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9] uppercase italic">
            POLECANI HYDRAULICY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#b8860b] to-[#d4af37]">AWARIE I INSTALACJE</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Szykuje się awaria albo remont łazienki? <span className="text-white font-medium">Sprawdzone kontakty bezpośrednio do fachowców z Twojej okolicy.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#ranking" className="bg-[#d4af37] text-[#0f172a] px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl">
              Przeglądaj Składy
            </a>
          </div>
        </div>
      </section>

      {/* --- 2. ZDJĘCIE POD TŁEM (Czyste, jasne na białym tle) --- */}
      <section className="bg-[#f8fafc] pt-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[4rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100">
            <img 
              src="/img/industries/hydraulik-nieporet-top.webp" // SUGEROWANA NAZWA ZDJĘCIA DLA HYDRAULIKI
              alt="Instalacje sanitarne i wodne Nieporęt"
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
      </section>

      {/* --- 3. BIAŁA STREFA KONTENTU --- */}
      <div className="bg-[#f8fafc] text-[#1e293b] pt-12 pb-32 relative z-20">

        {/* MIEJSCOWOŚCI */}
        <section id="miejscowosci" className="px-6 mb-24"> 
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] text-center mb-8 italic">
              Obsługiwane obszary
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Nieporęt', 'Białobrzegi', 'Beniaminów', 'Izabelin', 'Józefów', 
                'Kąty Węgierskie', 'Michałów-Grabina', 'Rembelszczyzna', 
                'Stanisławów', 'Wola Aleksandra', 'Wola Kiełpińska'
              ].map((city) => (
                <span 
                  key={city} 
                  className="bg-slate-50 text-slate-500 px-6 py-2.5 rounded-full text-[11px] font-bold border border-slate-200 uppercase tracking-widest"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* RANKING Z NOWOCZESNYM KOMPONENTEM COMPANY CARD */}
        <section id="ranking" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase italic tracking-tighter">RANKING HYDRAULIKÓW</h2>
          </div>
          
          <div className="grid gap-12">
            {loading ? (
              <div className="text-center py-20 animate-pulse text-[#d4af37] font-black uppercase tracking-widest">
                Wczytywanie Kontaktów...
              </div>
            ) : (
              <>
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
                
                {placeholders.map((spot) => (
                  <div key={`placeholder-${spot}`} className="bg-white/50 border-4 border-dashed border-slate-200 rounded-[3.5rem] p-16 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 opacity-60">
                    <div>
                      <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2 tracking-tighter leading-none">
                        TU MOŻE BYĆ <br/> TWÓJ BIZNES
                      </h3>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                        Zabezpiecz lokalny rynek zgłoszeń
                      </p>
                    </div>
                    <Link href="/dolacz" className="bg-[#0f172a] text-[#d4af37] px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest">
                      DODAJ SWOJĄ FIRMĘ
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* MODUŁ SEO: HYDRAULIKA */}
        <section className="py-32 px-6 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Ekspercki Poradnik 2026</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] uppercase italic tracking-tighter leading-none mb-8">
                Jakiego hydraulika wybrać do awarii w domu?
              </h2>
              <p className="text-slate-500 font-medium italic">
                Pęknięta rura czy cieknący syfon to spory stres. Pamiętaj jednak o trzech żelaznych zasadach, by po wezwaniu pogotowia usterka nie wróciła ze zdwojoną siłą.
              </p>
            </div>

            <div className="space-y-12">
              <div className="bg-slate-50 p-12 rounded-[3.5rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-6 uppercase italic">1. Rękojmia i dowód wpłaty</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic font-medium">
                  Wezwanie osoby pracującej na słowo, która przykręca wężyk i znika, to ryzyko zalania łazienki w środku nocy. Potwierdzeni specjaliści z naszego katalogu gwarantują dokumentację usługi, dając Ci twardą podstawę do ewentualnych poprawek instalatorskich.
                </p>
              </div>

              <div className="bg-slate-50 p-12 rounded-[3.5rem] border-l-8 border-[#0f172a]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-6 uppercase italic">2. Kucie ścian to ostateczność</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic font-medium">
                  Zapytaj przez telefon o podejście do awarii. Prawdziwi profesjonaliści najpierw szukają najmniej inwazyjnego dojścia, korzystając czasami np. ze sprawdzonych przyrządów. Nie zgadzaj się na rozkuwanie całego pionu z błota bez głębokiej diagnozy w poszukiwaniu miejsca rozszczelnienia.
                </p>
              </div>

              <div className="bg-slate-50 p-12 rounded-[3.5rem] border-l-8 border-[#d4af37]">
                <h3 className="text-2xl font-black text-[#0f172a] mb-6 uppercase italic">3. Uważaj podzlecanie nowicjuszom</h3>
                <p className="text-slate-500 text-sm leading-relaxed italic font-medium">
                  Dobry hydraulik nie zawsze wykona dany punkt osobiście, bywa że na miejscu zleca podzespoły praktykantom bez właściwego nadzoru. Zwróć uwagę, czy rzemieślnik o randze Lidera w Gminie faktycznie pojawia się osobiście sprawdzić szczelność ostatecznych poprawek w mufach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BIZNESOWE */}
        <section className="py-32 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase italic tracking-tighter mb-8 leading-none">
            JESTEŚ SPECJALISTĄ <br/><span className="text-[#d4af37]">OD INSTALACJI?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 italic font-light">
            "Zdobądź autoryzację i przyjmuj więcej telefonów z zapytaniami z Twojego regionu."
          </p>
          <Link href="/dolacz" className="bg-[#d4af37] text-[#0f172a] px-16 py-7 rounded-full font-black uppercase text-sm tracking-[0.3em] hover:scale-105 transition-all shadow-2xl inline-block">
            Dołącz do Liderów
          </Link>
        </section>

      </div>

      <footer className="py-20 text-center opacity-30 italic border-t border-slate-100 bg-[#0b1120] text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.6em]">
          © 2026 MISTRZOWIE REGIONU | projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </main>
  );
}