"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function DolaczPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    nip: '', // Pole NIP
    email: '', // Pole E-mail
    phone: '',
    address: '',
    industry: 'szamba', 
    otherIndustry: '',
    description: '',
    website: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) { setTermsError(true); return; }
    
    setStatus('submitting');
    try {
      const finalIndustry = formData.industry === 'inna' ? formData.otherIndustry : formData.industry;

      const keywords = [
        ...formData.companyName.toLowerCase().split(' '),
        finalIndustry.toLowerCase(),
        ...formData.address.toLowerCase().replace(',', '').split(' '),
        "nieporęt", "mistrz", "polecany"
      ].filter(word => word.length > 2);

      await addDoc(collection(db, "zgloszenia_firm"), {
        companyName: formData.companyName,
        industry: finalIndustry,
        tier: 'silver', 
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        nip: formData.nip,
        description: formData.description,
        website: formData.website,
        search_keywords: Array.from(new Set(keywords)),
        status: 'inactive', 
        is_verified: false,
        created_at: serverTimestamp()
      });

      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center items-center px-6 text-center font-montserrat">
        <div className="w-24 h-24 bg-[#d4af37] text-[#0f172a] rounded-full flex items-center justify-center text-5xl mb-8 font-black shadow-[0_0_50px_rgba(212,175,55,0.4)]">✓</div>
        <h1 className="text-5xl font-black mb-6 italic uppercase">Zgłoszenie Przyjęte!</h1>
        <p className="text-slate-400 text-lg max-w-xl mb-10 italic">Weryfikujemy Twoje dane. Twoja firma wkrótce dołączy do grona Mistrzów Regionu.</p>
        <Link href="/" className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-xl">Wróć do portalu</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] pt-32 pb-24 font-montserrat relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[#0f172a] -skew-y-3 origin-top-left z-0 shadow-2xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 px-6">
        <header className="text-center mb-20 text-white">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.6em] text-[10px] mb-4 block animate-pulse">DOŁĄCZ DO LIDERÓW GMINY NIEPORĘT</span>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-[0.8]">ZOSTAŃ <br/><span className="text-[#d4af37]">MISTRZEM</span></h1>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-[4rem] shadow-2xl p-10 md:p-20 border border-slate-100 space-y-20">
          
          {/* SEKCJA 1: DANE KONTAKTOWE I FIRMOWE */}
          <section className="space-y-10">
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-slate-100 pb-4 flex items-center gap-4 italic">
              <span className="text-[#d4af37] not-italic">01</span> Dane Podstawowe
            </h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Nazwa Firmy</label>
                <input required name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border-2 border-slate-50 rounded-3xl p-6 font-bold focus:border-[#d4af37] outline-none transition-all bg-slate-50/50" placeholder="np. Klinika Uśmiechu" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">NIP (Opcjonalny)</label>
                <input name="nip" value={formData.nip} onChange={handleChange} className="w-full border-2 border-slate-50 rounded-3xl p-6 font-bold focus:border-[#d4af37] outline-none transition-all bg-slate-50/50" placeholder="Wpisz NIP firmy" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Adres E-mail (Opcjonalny)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-slate-50 rounded-3xl p-6 font-bold focus:border-[#d4af37] outline-none transition-all bg-slate-50/50" placeholder="kontakt@twojafirma.pl" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Telefon</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full border-2 border-slate-50 rounded-3xl p-6 font-bold focus:border-[#d4af37] outline-none transition-all bg-slate-50/50" placeholder="600 000 000" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Adres Siedziby / Obszar</label>
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full border-2 border-slate-50 rounded-3xl p-6 font-bold focus:border-[#d4af37] outline-none transition-all bg-slate-50/50" placeholder="ul. Warszawska 10, Nieporęt" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Strona WWW / Social Media</label>
                <input name="website" value={formData.website} onChange={handleChange} className="w-full border-2 border-slate-50 rounded-3xl p-6 font-bold focus:border-[#d4af37] outline-none transition-all bg-slate-50/50" placeholder="www.mojafirma.pl" />
              </div>
            </div>
          </section>

          {/* SEKCJA 2: WYBÓR BRANŻY */}
          <section className="space-y-12">
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-slate-100 pb-4 flex items-center gap-4 italic">
              <span className="text-[#d4af37] not-italic">02</span> Twoja Branża
            </h2>

            {[
              {
                group: "BUDOWA I WYKOŃCZENIA",
                items: [
                  { id: 'beton', label: 'Wytwórnia Betonu' },
                  { id: 'sklad', label: 'Skład Budowlany' },
                  { id: 'hydraulik', label: 'Hydraulika' },
                  { id: 'elektryka', label: 'Elektryka' },
                  { id: 'wykonczenia', label: 'Wykończenia' },
                  { id: 'budowa-domow', label: 'Budowa Domów' },
                  { id: 'brukarze', label: 'Brukarstwo' },
                  { id: 'zlota-raczka', label: 'Złota Rączka' },
                ]
              },
              {
                group: "OGRÓD I KOMUNALNE",
                items: [
                  { id: 'szamba', label: 'Asenizacja' },
                  { id: 'ogrody', label: 'Ogrody' },
                  { id: 'serwis-kosiarek', label: 'Serwis Kosiarek' },
                  { id: 'wywoz-gruzu', label: 'Wywóz gruzu' },
                  { id: 'koszenie-trawy', label: 'Koszenie trawy' },
                ]
              },
              {
                group: "MOTORYZACJA",
                items: [
                  { id: 'mechanika', label: 'Mechanika' },
                  { id: 'wulkanizacja', label: 'Wulkanizacja' },
                ]
              },
              {
                group: "ZDROWIE I USŁUGI",
                items: [
                  { id: 'stomatologia', label: 'Stomatologia' },
                  { id: 'weterynarz', label: 'Weterynarz' },
                  { id: 'sprzatanie', label: 'Sprzątanie' },
                   { id: 'naprawa-pralek', label: 'Naprawa pralek' },
                  { id: 'przeprowadzki', label: 'Przeprowadzki' },
                  { id: 'inna', label: 'Inna branża...' },
                ]
              }
            ].map((cat) => (
              <div key={cat.group} className="space-y-4">
                <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] ml-4 italic">{cat.group}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {cat.items.map((item) => (
                    <label key={item.id} className={`cursor-pointer p-6 rounded-[2rem] border-2 transition-all text-center flex items-center justify-center min-h-[90px] ${formData.industry === item.id ? 'bg-[#0f172a] border-[#0f172a] text-[#d4af37] shadow-xl scale-105' : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-[#d4af37]'}`}>
                      <input type="radio" name="industry" value={item.id} checked={formData.industry === item.id} onChange={handleChange} className="hidden" />
                      <span className="text-[11px] font-black uppercase tracking-widest leading-tight">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {formData.industry === 'inna' && (
              <div className="mt-8 animate-in slide-in-from-top-4">
                <input required name="otherIndustry" value={formData.otherIndustry} onChange={handleChange} className="w-full border-b-4 border-[#0f172a] p-6 font-black text-3xl uppercase italic outline-none bg-transparent" placeholder="Wpisz nazwę swojej branży..." />
              </div>
            )}
          </section>

          {/* SEKCJA 3: FINALIZACJA */}
          <section className="space-y-10">
            <h2 className="text-xl font-black uppercase tracking-widest border-b-4 border-slate-100 pb-4 flex items-center gap-4 italic">
              <span className="text-[#d4af37] not-italic">03</span> Opis i Finalizacja
            </h2>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full border-2 border-slate-50 rounded-[2.5rem] p-8 font-bold focus:border-[#d4af37] outline-none bg-slate-50/50 resize-none text-lg shadow-inner" placeholder="Napisz kilka słów o swoich usługach i doświadczeniu..." />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-[#0f172a] p-10 md:p-14 rounded-[4rem] shadow-2xl">
               <div className="text-center md:text-left">
                  <p className="text-[#d4af37] font-black uppercase tracking-widest text-xs mb-2 italic">Status: Pakiet Startowy</p>
                  <p className="text-5xl font-black text-white italic">0 <span className="text-xl text-slate-400 not-italic">PLN</span></p>
               </div>
               
               <div className="flex flex-col gap-6 w-full md:w-auto">
                 {/* CHECKBOX Z LINKIEM DO REGULAMINU */}
                 <label className="flex items-center gap-4 cursor-pointer group">
                   <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="w-7 h-7 rounded-xl accent-[#d4af37] border-white/20 bg-white/5" />
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest group-hover:text-white transition-colors">
                     Akceptuję <Link href="/regulamin" target="_blank" className="text-[#d4af37] underline decoration-2 underline-offset-4 hover:text-white transition-all">Regulamin Portalu</Link>
                   </span>
                 </label>
                 
                 <button type="submit" disabled={status === 'submitting'} className="bg-white text-black px-16 py-8 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-[#d4af37] transition-all shadow-[0_10px_40px_rgba(255,255,255,0.1)] disabled:opacity-50">
                   {status === 'submitting' ? 'PRZETWARZANIE...' : 'DOŁĄCZ DO MISTRZÓW'}
                 </button>
                 {termsError && <p className="text-rose-500 text-[10px] font-black uppercase text-center animate-bounce">Wymagana akceptacja regulaminu</p>}
               </div>
            </div>
          </section>
        </form>
        
        {/* STOPKA PROJEKTANTA */}
        <footer className="mt-32 text-center opacity-20 border-t border-white/5 pt-10">
          <p className="text-[9px] font-black uppercase tracking-[0.4em]">
            projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
          </p>
        </footer>
      </div>
    </div>
  );
}