"use client";
import React, { useState, useEffect, useRef } from 'react';
import { szamboDb as db } from '../../lib/szambo_db';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { FaPhoneAlt, FaSms, FaExclamationTriangle, FaCheck, FaShareAlt } from 'react-icons/fa';

const STREET_DATABASE = [
  { s: "Beniaminów (całość)", c: "Beniaminów" }, { s: "Białobrzegi (domy prywatne)", c: "Białobrzegi" },
  { s: "Rynia (domy prywatne)", c: "Rynia" }, { s: "Pogonowskiego", c: "Nieporęt" },
  { s: "Pilawa", c: "Nieporęt" }, { s: "Wieczornej Bryzy", c: "Nieporęt" },
  { s: "Wojska Polskiego", c: "Nieporęt" }, { s: "Allegro", c: "Stanisławów Pierwszy" },
  { s: "Barokowa", c: "Stanisławów Pierwszy" }, { s: "Borówkowa", c: "Stanisławów Pierwszy" },
  { s: "Brukowa", c: "Stanisławów Pierwszy" }, { s: "Brzozy", c: "Stanisławów Pierwszy" },
  { s: "Cyprysowa", c: "Stanisławów Pierwszy" }, { s: "Drozdowa", c: "Stanisławów Pierwszy" },
  { s: "Geodetów", c: "Stanisławów Pierwszy" }, { s: "Harmonii", c: "Stanisławów Pierwszy" },
  { s: "Iglasta", c: "Stanisławów Pierwszy" }, { s: "Jagodowa", c: "Stanisławów Pierwszy" },
  { s: "Jana Kazimierza", c: "Stanisławów Pierwszy" }, { s: "Jarzębiny", c: "Stanisławów Pierwszy" },
  { s: "Jasna", c: "Stanisławów Pierwszy" }, { s: "Jodłowa", c: "Stanisławów Pierwszy" },
  { s: "Kalinowa", c: "Stanisławów Pierwszy" }, { s: "Koncertowa", c: "Stanisławów Pierwszy" },
  { s: "Konwaliowa", c: "Stanisławów Pierwszy" }, { s: "Leśny Zakątek", c: "Stanisławów Pierwszy" },
  { s: "Lisia", c: "Stanisławów Pierwszy" }, { s: "Operowa", c: "Stanisławów Pierwszy" },
  { s: "Paproci", c: "Stanisławów Pierwszy" }, { s: "Pięciolinii", c: "Stanisławów Pierwszy" },
  { s: "Pogodna", c: "Stanisławów Pierwszy" }, { s: "Promykowa", c: "Stanisławów Pierwszy" },
  { s: "Rajska", c: "Stanisławów Pierwszy" }, { s: "Regatowa", c: "Stanisławów Pierwszy" },
  { s: "Słoneczna", c: "Stanisławów Pierwszy" }, { s: "Smyczkowa", c: "Stanisławów Pierwszy" },
  { s: "Sokoła", c: "Stanisławów Pierwszy" }, { s: "Sonaty", c: "Stanisławów Pierwszy" },
  { s: "Spełnionych Marzeń", c: "Stanisławów Pierwszy" }, { s: "Stolnika", c: "Stanisławów Pierwszy" },
  { s: "Strużańska", c: "Stanisławów Pierwszy" }, { s: "Swingowa", c: "Stanisławów Pierwszy" },
  { s: "Świerkowa", c: "Stanisławów Pierwszy" }, { s: "Tęczowa", c: "Stanisławów Pierwszy" },
  { s: "Warsztatowa", c: "Stanisławów Pierwszy" }, { s: "Wesoła", c: "Stanisławów Pierwszy" },
  { s: "Wiolinowa", c: "Stanisławów Pierwszy" }, { s: "Wojskiego", c: "Stanisławów Pierwszy" },
  { s: "Wolfganga A. Mozarta", c: "Stanisławów Pierwszy" }, { s: "Zajazdowa", c: "Stanisławów Pierwszy" },
  { s: "Złotych Piasków", c: "Stanisławów Pierwszy" }, { s: "Mickiewicza", c: "Nieporęt" },
  { s: "Asesora", c: "Nieporęt" }, { s: "Babinicza", c: "Nieporęt" },
  { s: "Butryma", c: "Nieporęt" }, { s: "Chabrowa", c: "Nieporęt" },
  { s: "Chłodna", c: "Nieporęt" }, { s: "Dworcowa", c: "Nieporęt" },
  { s: "Dzikiej Róży", c: "Nieporęt" }, { s: "Epopei", c: "Nieporęt" },
  { s: "Gerwazego", c: "Nieporęt" }, { s: "Irysowa", c: "Nieporęt" },
  { s: "Jacka Soplicy", c: "Nieporęt" }, { s: "Jana III", c: "Nieporęt" },
  { s: "Jana Kazimierza", c: "Nieporęt" }, { s: "Lazurowa", c: "Nieporęt" },
  { s: "Myśliwska", c: "Nieporęt" }, { s: "Ogrodowa", c: "Nieporęt" },
  { s: "Pana Tadeusza", c: "Nieporęt" }, { s: "Pionierska", c: "Nieporęt" },
  { s: "Plac Wolności", c: "Nieporęt" }, { s: "Podkomorzego", c: "Nieporęt" },
  { s: "Podleśna", c: "Nieporęt" }, { s: "Protazego", c: "Nieporęt" },
  { s: "Rejenta", c: "Nieporęt" }, { s: "Rejtana", c: "Nieporęt" },
  { s: "Różana", c: "Nieporęt" }, { s: "Sasankowa", c: "Nieporęt" },
  { s: "Soplicowo", c: "Nieporęt" }, { s: "Szafirowa", c: "Nieporęt" },
  { s: "Szkolna", c: "Nieporęt" }, { s: "Szlachecka", c: "Nieporęt" },
  { s: "Telimeny", c: "Nieporęt" }, { s: "Tulipanowa", c: "Nieporęt" },
  { s: "Zamkowa", c: "Nieporęt" }, { s: "Agawy", c: "Nieporęt" },
  { s: "Aleja Sienkiewicza", c: "Nieporęt" }, { s: "Baśki", c: "Nieporęt" },
  { s: "Cyklistów", c: "Nieporęt" }, { s: "Czajki", c: "Nieporęt" },
  { s: "Czarnieckiego", c: "Nieporęt" }, { s: "Heleny", c: "Nieporęt" },
  { s: "Hubala", c: "Nieporęt" }, { s: "Husarii", c: "Nieporęt" },
  { s: "Inwokacji", c: "Nieporęt" }, { s: "Izabelińska", c: "Nieporęt" },
  { s: "Jana Kochanowskiego", c: "Nieporęt" }, { s: "Jaremy", c: "Nieporęt" },
  { s: "Jaskółki", c: "Nieporęt" }, { s: "Benedykta Pęczkowskiego", c: "Nieporęt" },
  { s: "Ketlinga", c: "Nieporęt" }, { s: "Kmicica", c: "Nieporęt" },
  { s: "Kordeckiego", c: "Nieporęt" }, { s: "Kresowa", c: "Nieporęt" },
  { s: "Lawendowa", c: "Nieporęt" }, { s: "Literacka", c: "Nieporęt" },
  { s: "Małołęcka", c: "Nieporęt" }, { s: "Marsa", c: "Nieporęt" },
  { s: "Michała", c: "Nieporęt" }, { s: "Motylkowa", c: "Nieporęt" },
  { s: "Nastrojowa", c: "Nieporęt" }, { s: "Niezapominajki", c: "Nieporęt" },
  { s: "Nowolipie", c: "Nieporęt" }, { s: "Odrodzenia", c: "Nieporęt" },
  { s: "Oleńki", c: "Nieporęt" }, { s: "Polna", c: "Nieporęt" },
  { s: "Polnych Kwiatów", c: "Nieporęt" }, { s: "Potocka", c: "Nieporęt" },
  { s: "Powstańców", c: "Nieporęt" }, { s: "Przyjaciół", c: "Nieporęt" },
  { s: "Ptasia", c: "Nieporęt" }, { s: "Rocha", c: "Nieporęt" },
  { s: "Rynek", c: "Nieporęt" }, { s: "Sielankowa", c: "Nieporęt" },
  { s: "Skrzetuskiego", c: "Nieporęt" }, { s: "Starej Gruszy", c: "Nieporęt" },
  { s: "Świętej Agaty", c: "Nieporęt" }, { s: "Świętego Huberta", c: "Nieporęt" },
  { s: "Turkusowa", c: "Nieporęt" }, { s: "Wazów", c: "Nieporęt" },
  { s: "Zagłoby", c: "Nieporęt" }, { s: "Zosi", c: "Nieporęt" },
  { s: "Zwycięstwa", c: "Nieporęt" }, { s: "Żeglarska", c: "Nieporęt" },
  { s: "Żurawia", c: "Nieporęt" }, { s: "Wólka Radzymińska (całość)", c: "Wólka Radzymińska" },
  { s: "Zegrze Południowe (domy)", c: "Zegrze Południowe" }, { s: "Białego Bzu", c: "Nieporęt" },
  { s: "Brzozowa", c: "Nieporęt" }, { s: "Fiołkowa", c: "Nieporęt" },
  { s: "Kwitnącej Wiśni", c: "Nieporęt" }, { s: "Maciejki", c: "Nieporęt" },
  { s: "Pszeniczna", c: "Nieporęt" }, { s: "Rumiankowa", c: "Nieporęt" },
  { s: "Spokojna", c: "Nieporęt" }, { s: "Stokrotki", c: "Nieporęt" },
  { s: "Zegrzyńska", c: "Nieporęt" }, { s: "Aleksandrów", c: "Aleksandrów" },
  { s: "Izabelin", c: "Izabelin" }, { s: "Baletowa", c: "Stanisławów Pierwszy" },
  { s: "Błękitna", c: "Stanisławów Pierwszy" }, { s: "Graniczna", c: "Stanisławów Pierwszy" },
  { s: "Izabelińska", c: "Stanisławów Pierwszy" }, { s: "Klonowa", c: "Stanisławów Pierwszy" },
  { s: "Krzywa", c: "Stanisławów Pierwszy" }, { s: "Księżycowa", c: "Stanisławów Pierwszy" },
  { s: "Małołęcka", c: "Izabelin" }, { s: "Perłowa", c: "Stanisławów Pierwszy" },
  { s: "Przyszłość", c: "Stanisławów Pierwszy" }, { s: "Rodzinna", c: "Stanisławów Pierwszy" },
  { s: "Rubinowa", c: "Stanisławów Pierwszy" }, { s: "Sielska", c: "Stanisławów Pierwszy" },
  { s: "Szmaragdowa", c: "Stanisławów Pierwszy" }, { s: "Świetlana", c: "Stanisławów Pierwszy" },
  { s: "Wierzbowa", c: "Stanisławów Pierwszy" }, { s: "Stanisławów Drugi", c: "Stanisławów Drugi" },
  { s: "Wola Aleksandra", c: "Wola Aleksandra" }, { s: "Kąty Węgierskie", c: "Kąty Węgierskie" },
  { s: "Leśna Polana", c: "Józefów" }, { s: "Polnych Maków", c: "Józefów" },
  { s: "Poziomkowa", c: "Józefów" }, { s: "Strużańska", c: "Józefów" },
  { s: "Wyścigowa", c: "Józefów" }, { s: "Ateny", c: "Józefów" },
  { s: "Borki", c: "Józefów" }, { s: "Dębowa", c: "Józefów" },
  { s: "Diamentowa", c: "Józefów" }, { s: "Dzika", c: "Józefów" },
  { s: "Główna", c: "Józefów" }, { s: "Gwiaździsta", c: "Józefów" },
  { s: "Sienkiewicza", c: "Józefów" }, { s: "Krótka", c: "Józefów" },
  { s: "Leszczynowa", c: "Józefów" }, { s: "Leśna", c: "Józefów" },
  { s: "Leśne Osiedle", c: "Józefów" }, { s: "Migdałowa", c: "Józefów" },
  { s: "Miodowa", c: "Józefów" }, { s: "Niecała", c: "Józefów" },
  { s: "Objazdowa", c: "Józefów" }, { s: "Olimpijska", c: "Józefów" },
  { s: "Orzechowa", c: "Józefów" }, { s: "Piaskowa", c: "Józefów" },
  { s: "Piastowska", c: "Józefów" }, { s: "Polna", c: "Józefów" },
  { s: "Polnej Róży", c: "Józefów" }, { s: "Równa", c: "Józefów" },
  { s: "Runa Leśnego", c: "Józefów" }, { s: "Sezamkowa", c: "Józefów" },
  { s: "Sienna", c: "Józefów" }, { s: "Szczęśliwa", c: "Józefów" },
  { s: "Szkolna", c: "Józefów" }, { s: "Wiosenna", c: "Józefów" },
  { s: "Wspólna", c: "Józefów" }, { s: "Zacisze", c: "Józefów" },
  { s: "Zielona", c: "Józefów" }, { s: "Zielone Wzgórze", c: "Józefów" },
  { s: "Złota", c: "Józefów" }, { s: "Żytnia", c: "Józefów" },
  { s: "Michałów Grabina", c: "Michałów Grabina" }, { s: "Rembelszczyzna", c: "Rembelszczyzna" },
  { s: "Osiedle Wojskowe", c: "Białobrzegi" }, { s: "Osiedle Wojskowe", c: "Zegrze Południowe" },
  { s: "Rybaki 7", c: "Zegrze Południowe" }, { s: "Myśliwska 6", c: "Zegrze Południowe" },
  { s: "Szkolna 2", c: "Zegrze Południowe" }, { s: "Jana Kazimierza 576", c: "Rembelszczyzna" },
  { s: "Szkolna 79 A", c: "Wólka Radzymińska" }, { s: "Główna 1 A-1 D", c: "Rynia" }
];

export default function OrderPage() {
  const [formData, setFormData] = useState({ capacity: '10', street: '', houseNumber: '', name: '', phone: '', date: '', timeSlot: 'elastyczny' });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'limit'>('idle');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split('T')[0];

  const getEstimatedPrice = (capacity: string) => {
    const cap = parseInt(capacity, 10);
    if (cap === 5) return 300; if (cap === 6) return 360; if (cap === 7) return 370;
    if (cap === 8) return 380; if (cap === 9) return 390; if (cap === 10) return 400;
    if (cap > 10 && cap <= 20) return 400 + ((cap - 10) * 40);
    return null;
  };

  const estimatedPrice = getEstimatedPrice(formData.capacity);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) { setSuggestions([]); }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStreetChange = (value: string) => {
    setFormData({...formData, street: value});
    if (value.length > 1) {
      const filtered = STREET_DATABASE.filter(item => item.s.toLowerCase().includes(value.toLowerCase())).slice(0, 8);
      setSuggestions(filtered);
    } else { setSuggestions([]); }
  };

  const selectSuggestion = (item: any) => {
    setFormData({...formData, street: `${item.s} (${item.c})`});
    setSuggestions([]);
  };

  const handleUniversalShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Mistrzowie Regionu - Zamów Wywóz', text: 'Tu zamówisz wywóz szamba w gminie Nieporęt. Szybko i bez dzwonienia!', url: window.location.href }); } catch (err) { }
    } else { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneRegex = /^[1-9][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) return alert("Proszę podać prawidłowy, 9-cyfrowy numer telefonu (bez zera na początku).");

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'szambo_leads'), {
        ...formData,
        fullAddress: `${formData.street} ${formData.houseNumber}`,
        estimatedPrice: estimatedPrice,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) { setStatus('error'); }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-montserrat flex flex-col items-center pt-40 md:pt-52 pb-20 px-6">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase italic tracking-tighter">ZAMÓW <span className="text-[#d4af37]">WYWÓZ SZAMBA</span></h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">System Ekspresowy Nieporęt 2026</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
          {status === 'success' ? (
            <div className="text-center py-4 animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#d4af37]/20">
                <FaCheck className="text-3xl text-black" />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase italic">Zgłoszenie Zapisane!</h2>
              <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl mb-8 flex items-start gap-4 text-left">
                <FaExclamationTriangle className="text-amber-500 text-3xl shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Oczekuj na telefon</p>
                  <p className="text-[11px] text-slate-300 font-bold leading-relaxed">Nasz dyspozytor właśnie przekazuje Twoje zgłoszenie do kierowcy w okolicy. Kierowca wkrótce skontaktuje się z Tobą telefonicznie, aby potwierdzić przyjazd.</p>
                </div>
              </div>
              <button onClick={() => setStatus('idle')} className="text-[10px] font-bold border border-white/20 px-8 py-3 rounded-full uppercase tracking-widest hover:bg-white/5 transition-all text-slate-400">Wróć do formularza</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2 relative" ref={wrapperRef}>
                  <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Ulica i miejscowość</label>
                  <input type="text" required placeholder="Wpisz nazwę ulicy..." autoComplete="off" className="w-full bg-[#0b1120] border border-white/10 text-white rounded-xl px-5 py-4 focus:border-[#d4af37] outline-none transition-all placeholder:text-slate-700 font-bold" value={formData.street} onChange={(e) => handleStreetChange(e.target.value)} />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-[100] w-full bg-[#1e293b] border-2 border-[#d4af37]/30 rounded-2xl mt-2 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                      {suggestions.map((item, index) => (
                        <li key={index} onClick={() => selectSuggestion(item)} className="px-5 py-4 hover:bg-[#d4af37] hover:text-black cursor-pointer font-bold text-xs transition-all border-b border-white/5 last:border-0">{item.s.toUpperCase()} <span className="opacity-40 text-[9px] ml-1 italic">({item.c})</span></li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Nr domu</label>
                  <input type="text" required placeholder="np. 45A" className="w-full bg-[#0b1120] border border-white/10 text-white rounded-xl px-5 py-4 focus:border-[#d4af37] outline-none transition-all placeholder:text-slate-700 font-bold" value={formData.houseNumber} onChange={(e) => setFormData({...formData, houseNumber: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Imię</label>
                  <input type="text" required className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[#d4af37] font-bold text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Telefon (9 cyfr)</label>
                  <input type="tel" required placeholder="np. 500100200" className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[#d4af37] font-bold text-white" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Data Wywozu</label>
                  <input type="date" required min={today} className="w-full bg-[#0b1120] border border-white/10 text-white rounded-xl px-5 py-4 outline-none focus:border-[#d4af37] font-bold cursor-pointer [color-scheme:dark]" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Przedział Czasowy</label>
                  <select className="w-full bg-[#0b1120] border border-white/10 text-white rounded-xl px-5 py-4 outline-none cursor-pointer appearance-none focus:border-[#d4af37] font-bold" value={formData.timeSlot} onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}>
                    <option value="elastyczny">Elastyczny (Cały dzień)</option><option value="6-12">Rano (6:00 - 12:00)</option><option value="12-20">Popołudniu (12:00 - 20:00)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest ml-2">Pojemność Szamba</label>
                <select className="w-full bg-[#0b1120] border border-white/10 text-white rounded-xl px-5 py-4 outline-none cursor-pointer appearance-none focus:border-[#d4af37] font-bold" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})}>
                  {[...Array(16)].map((_, i) => <option key={i+5} value={i+5}>{i+5} m³</option>)}
                </select>
              </div>
              {estimatedPrice && (
                <div className="mt-4 p-5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl text-center animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-1">Szacowany koszt wywozu</p>
                  <p className="text-4xl font-black text-white my-2">{estimatedPrice} zł</p>
                </div>
              )}
              <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_40px_rgba(212,175,55,0.3)]">
                {status === 'submitting' ? 'ZAPISYWANIE...' : 'ZAMÓW WYWÓZ TERAZ'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}