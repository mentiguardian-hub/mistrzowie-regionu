"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaDownload, FaMobileAlt, FaPhoneAlt, FaRecycle, FaInfoCircle,
  FaMapMarkerAlt, FaClock, FaExclamationTriangle, FaSyncAlt, FaCalendarAlt 
} from 'react-icons/fa';
import SocialShareBar from '../../components/SocialShareBar';
import wasteData from '../../src/data/wasteData.json';
import PobierzKalendarzButton from '../../components/PobierzKalendarzButton';
import SubskrybujKalendarzButton from '../../components/SubskrybujKalendarzButton';

// --- TWOJA BAZA MAPOWANIA ULIC (Nienaruszona) ---
const streetMap = [
  { s: "Beniaminów (całość)", c: "Beniaminów", r: "rejon1" },
  { s: "Białobrzegi (domy prywatne)", c: "Białobrzegi", r: "rejon1" },
  { s: "Rynia (domy prywatne)", c: "Rynia", r: "rejon1" },
  { s: "Pogonowskiego", c: "Nieporęt", r: "rejon1" },
  { s: "Pilawa", c: "Nieporęt", r: "rejon1" },
  { s: "Wieczornej Bryzy", c: "Nieporęt", r: "rejon1" },
  { s: "Wojska Polskiego", c: "Nieporęt", r: "rejon1" },
  { s: "Allegro", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Barokowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Borówkowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Brukowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Brzozy", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Cyprysowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Drozdowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Geodetów", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Harmonii", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Iglasta", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Jagodowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Jana Kazimierza", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Jarzębiny", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Jasna", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Jodłowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Kalinowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Koncertowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Konwaliowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Leśny Zakątek", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Lisia", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Operowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Paproci", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Pięciolinii", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Pogodna", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Promykowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Rajska", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Regatowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Słoneczna", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Smyczkowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Sokoła", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Sonaty", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Spełnionych Marzeń", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Stolnika", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Strużańska", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Swingowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Świerkowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Tęczowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Warsztatowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Wesoła", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Wiolinowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Wojskiego", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Wolfgang A. Mozarta", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Zajazdowa", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Złotych Piasków", c: "Stanisławów Pierwszy", r: "rejon2" },
  { s: "Mickiewicza", c: "Nieporęt", r: "rejon3" },
  { s: "Asesora", c: "Nieporęt", r: "rejon3" },
  { s: "Babinicza", c: "Nieporęt", r: "rejon3" },
  { s: "Butryma", c: "Nieporęt", r: "rejon3" },
  { s: "Chabrowa", c: "Nieporęt", r: "rejon3" },
  { s: "Chłodna", c: "Nieporęt", r: "rejon3" },
  { s: "Dworcowa", c: "Nieporęt", r: "rejon3" },
  { s: "Dzikiej Róży", c: "Nieporęt", r: "rejon3" },
  { s: "Epopei", c: "Nieporęt", r: "rejon3" },
  { s: "Gerwazego", c: "Nieporęt", r: "rejon3" },
  { s: "Irysowa", c: "Nieporęt", r: "rejon3" },
  { s: "Jacka Soplicy", c: "Nieporęt", r: "rejon3" },
  { s: "Jana III", c: "Nieporęt", r: "rejon3" },
  { s: "Jana Kazimierza", c: "Nieporęt", r: "rejon3" },
  { s: "Lazurowa", c: "Nieporęt", r: "rejon3" },
  { s: "Myśliwska", c: "Nieporęt", r: "rejon3" },
  { s: "Ogrodowa", c: "Nieporęt", r: "rejon3" },
  { s: "Pana Tadeusza", c: "Nieporęt", r: "rejon3" },
  { s: "Pionierska", c: "Nieporęt", r: "rejon3" },
  { s: "Plac Wolności", c: "Nieporęt", r: "rejon3" },
  { s: "Podkomorzego", c: "Nieporęt", r: "rejon3" },
  { s: "Podleśna", c: "Nieporęt", r: "rejon3" },
  { s: "Protazego", c: "Nieporęt", r: "rejon3" },
  { s: "Rejenta", c: "Nieporęt", r: "rejon3" },
  { s: "Rejtana", c: "Nieporęt", r: "rejon3" },
  { s: "Różana", c: "Nieporęt", r: "rejon3" },
  { s: "Sasankowa", c: "Nieporęt", r: "rejon3" },
  { s: "Soplicowo", c: "Nieporęt", r: "rejon3" },
  { s: "Szafirowa", c: "Nieporęt", r: "rejon3" },
  { s: "Szkolna", c: "Nieporęt", r: "rejon3" },
  { s: "Szlachecka", c: "Nieporęt", r: "rejon3" },
  { s: "Telimeny", c: "Nieporęt", r: "rejon3" },
  { s: "Tulipanowa", c: "Nieporęt", r: "rejon3" },
  { s: "Zamkowa", c: "Nieporęt", r: "rejon3" },
  { s: "Agawy", c: "Nieporęt", r: "rejon4" },
  { s: "Aleja Henryka Sienkiewicza", c: "Nieporęt", r: "rejon4" },
  { s: "Baśki", c: "Nieporęt", r: "rejon4" },
  { s: "Cyklistów", c: "Nieporęt", r: "rejon4" },
  { s: "Czajki", c: "Nieporęt", r: "rejon4" },
  { s: "Czarnieckiego", c: "Nieporęt", r: "rejon4" },
  { s: "Heleny", c: "Nieporęt", r: "rejon4" },
  { s: "Hubala", c: "Nieporęt", r: "rejon4" },
  { s: "Husarii", c: "Nieporęt", r: "rejon4" },
  { s: "Inwokacji", c: "Nieporęt", r: "rejon4" },
  { s: "Izabelińska", c: "Nieporęt", r: "rejon4" },
  { s: "Jana Kochanowskiego", c: "Nieporęt", r: "rejon4" },
  { s: "Jaremy", c: "Nieporęt", r: "rejon4" },
  { s: "Jaskółki", c: "Nieporęt", r: "rejon4" },
  { s: "Benedykta Pęczkowskiego", c: "Nieporęt", r: "rejon4" },
  { s: "Ketlinga", c: "Nieporęt", r: "rejon4" },
  { s: "Kmicica", c: "Nieporęt", r: "rejon4" },
  { s: "Kordeckiego", c: "Nieporęt", r: "rejon4" },
  { s: "Kresowa", c: "Nieporęt", r: "rejon4" },
  { s: "Lawendowa", c: "Nieporęt", r: "rejon4" },
  { s: "Literacka", c: "Nieporęt", r: "rejon4" },
  { s: "Małołęcka", c: "Nieporęt", r: "rejon4" },
  { s: "Marsa", c: "Nieporęt", r: "rejon4" },
  { s: "Michała", c: "Nieporęt", r: "rejon4" },
  { s: "Motylkowa", c: "Nieporęt", r: "rejon4" },
  { s: "Nastrojowa", c: "Nieporęt", r: "rejon4" },
  { s: "Niezapominajki", c: "Nieporęt", r: "rejon4" },
  { s: "Nowolipie", c: "Nieporęt", r: "rejon4" },
  { s: "Odrodzenia", c: "Nieporęt", r: "rejon4" },
  { s: "Oleńki", c: "Nieporęt", r: "rejon4" },
  { s: "Polna", c: "Nieporęt", r: "rejon4" },
  { s: "Polnych Kwiatów", c: "Nieporęt", r: "rejon4" },
  { s: "Potocka", c: "Nieporęt", r: "rejon4" },
  { s: "Powstańców", c: "Nieporęt", r: "rejon4" },
  { s: "Przyjaciół", c: "Nieporęt", r: "rejon4" },
  { s: "Ptasia", c: "Nieporęt", r: "rejon4" },
  { s: "Rocha", c: "Nieporęt", r: "rejon4" },
  { s: "Rynek", c: "Nieporęt", r: "rejon4" },
  { s: "Sielankowa", c: "Nieporęt", r: "rejon4" },
  { s: "Skrzetuskiego", c: "Nieporęt", r: "rejon4" },
  { s: "Starej Gruszy", c: "Nieporęt", r: "rejon4" },
  { s: "Świętej Agaty", c: "Nieporęt", r: "rejon4" },
  { s: "Świętego Huberta", c: "Nieporęt", r: "rejon4" },
  { s: "Turkusowa", c: "Nieporęt", r: "rejon4" },
  { s: "Wazów", c: "Nieporęt", r: "rejon4" },
  { s: "Zagłoby", c: "Nieporęt", r: "rejon4" },
  { s: "Zosi", c: "Nieporęt", r: "rejon4" },
  { s: "Zwycięstwa", c: "Nieporęt", r: "rejon4" },
  { s: "Żeglarska", c: "Nieporęt", r: "rejon4" },
  { s: "Żurawia", c: "Nieporęt", r: "rejon4" },
  { s: "Wólka Radzymińska (całość)", c: "Wólka Radzymińska", r: "rejon5" },
  { s: "Zegrze Południowe (domy)", c: "Zegrze Południowe", r: "rejon5" },
  { s: "Białego Bzu", c: "Nieporęt", r: "rejon5" },
  { s: "Brzozowa", c: "Nieporęt", r: "rejon5" },
  { s: "Fiołkowa", c: "Nieporęt", r: "rejon5" },
  { s: "Kwitnącej Wiśni", c: "Nieporęt", r: "rejon5" },
  { s: "Maciejki", c: "Nieporęt", r: "rejon5" },
  { s: "Pszeniczna", c: "Nieporęt", r: "rejon5" },
  { s: "Rumiankowa", c: "Nieporęt", r: "rejon5" },
  { s: "Spokojna", c: "Nieporęt", r: "rejon5" },
  { s: "Stokrotki", c: "Nieporęt", r: "rejon5" },
  { s: "Zegrzyńska", c: "Nieporęt", r: "rejon5" },
  { s: "Aleksandrów", c: "Aleksandrów", r: "rejon6" },
  { s: "Izabelin", c: "Izabelin", r: "rejon6" },
  { s: "Baletowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Błękitna", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Graniczna", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Izabelińska", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Klonowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Krzywa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Księżycowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Małołęcka", c: "Izabelin", r: "rejon6" },
  { s: "Perłowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Przyszłość", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Rondo Boskiego", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Rodzinna", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Rubinowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Sielska", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Szmaragdowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Świetlana", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Wierzbowa", c: "Stanisławów Pierwszy", r: "rejon6" },
  { s: "Stanisławów Drugi", c: "Stanisławów Drugi", r: "rejon7" },
  { s: "Wola Aleksandra", c: "Wola Aleksandra", r: "rejon7" },
  { s: "Kąty Węgierskie", c: "Kąty Węgierskie", r: "rejon8" },
  { s: "Leśna Polana", c: "Józefów", r: "rejon8" },
  { s: "Polnych Maków", c: "Józefów", r: "rejon8" },
  { s: "Poziomkowa", c: "Józefów", r: "rejon8" },
  { s: "Strużańska (2A-Kościelna)", c: "Józefów", r: "rejon8" },
  { s: "Wyścigowa", c: "Józefów", r: "rejon8" },
  { s: "Ateny", c: "Józefów", r: "rejon9" },
  { s: "Borki", c: "Józefów", r: "rejon9" },
  { s: "Dębowa", c: "Józefów", r: "rejon9" },
  { s: "Diamentowa", c: "Józefów", r: "rejon9" },
  { s: "Dzika", c: "Józefów", r: "rejon9" },
  { s: "Główna", c: "Józefów", r: "rejon9" },
  { s: "Gwiaździsta", c: "Józefów", r: "rejon9" },
  { s: "Sienkiewicza", c: "Józefów", r: "rejon9" },
  { s: "Krótka", c: "Józefów", r: "rejon9" },
  { s: "Leszczynowa", c: "Józefów", r: "rejon9" },
  { s: "Leśna", c: "Józefów", r: "rejon9" },
  { s: "Leśne Osiedle", c: "Józefów", r: "rejon9" },
  { s: "Migdałowa", c: "Józefów", r: "rejon9" },
  { s: "Miodowa", c: "Józefów", r: "rejon9" },
  { s: "Niecała", c: "Józefów", r: "rejon9" },
  { s: "Objazdowa", c: "Józefów", r: "rejon9" },
  { s: "Olimpijska", c: "Józefów", r: "rejon9" },
  { s: "Orzechowa", c: "Józefów", r: "rejon9" },
  { s: "Piaskowa", c: "Józefów", r: "rejon9" },
  { s: "Piastowska", c: "Józefów", r: "rejon9" },
  { s: "Polna", c: "Józefów", r: "rejon9" },
  { s: "Polnej Róży", c: "Józefów", r: "rejon9" },
  { s: "Rodziny Kalińskich", c: "Józefów", r: "rejon9" },
  { s: "Równa", c: "Józefów", r: "rejon9" },
  { s: "Runa Leśnego", c: "Józefów", r: "rejon9" },
  { s: "Sezamkowa", c: "Józefów", r: "rejon9" },
  { s: "Sienna", c: "Józefów", r: "rejon9" },
  { s: "Słonecznego Poranka", c: "Józefów", r: "rejon9" },
  { s: "Szczęśliwa", c: "Józefów", r: "rejon9" },
  { s: "Szkolna", c: "Józefów", r: "rejon9" },
  { s: "Wiosenna", c: "Józefów", r: "rejon9" },
  { s: "Wspólna", c: "Józefów", r: "rejon9" },
  { s: "Zacisze", c: "Józefów", r: "rejon9" },
  { s: "Zielona", c: "Józefów", r: "rejon9" },
  { s: "Zielone Wzgórze", c: "Józefów", r: "rejon9" },
  { s: "Złota", c: "Józefów", r: "rejon9" },
  { s: "Żytnia", c: "Józefów", r: "rejon9" },
  { s: "Michałów Grabina", c: "Michałów Grabina", r: "rejon10" },
  { s: "Rembelszczyzna", c: "Rembelszczyzna", r: "rejon10" },
  { s: "Osiedle Wojskowe", c: "Białobrzegi", r: "osiedla" },
  { s: "Osiedle Wojskowe", c: "Zegrze Południowe", r: "osiedla" },
  { s: "Rybaki 7", c: "Zegrze Południowe", r: "osiedla" },
  { s: "Myśliwska 6", c: "Zegrze Południowe", r: "osiedla" },
  { s: "Szkolna 2", c: "Zegrze Południowe", r: "osiedla" },
  { s: "Jana Kazimierza 576", c: "Rembelszczyzna", r: "osiedla" },
  { s: "Szkolna 79 A", c: "Wólka Radzymińska", r: "osiedla" },
  { s: "Główna 1 A-1 D", c: "Rynia", r: "osiedla" }
];

export default function HarmonogramyClient() {
  const [region, setRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    const savedRegion = localStorage.getItem('moj_rejon_odpadow');
    if (savedRegion) {
      setRegion(savedRegion);
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleRegionSelect = (r: string, name?: string) => {
    setRegion(r);
    localStorage.setItem('moj_rejon_odpadow', r);
    if (name) setSearchTerm(name);
    setShowSuggestions(false);
  };

  const clearSavedRegion = () => {
    localStorage.removeItem('moj_rejon_odpadow');
    setRegion('');
    setSearchTerm('');
  };

  const getNextDateInfo = (datesStringArray?: string[]) => {
    if (!datesStringArray || !datesStringArray.length) return { date: "--.--", day: "" };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const futureDates = datesStringArray
      .map(d => new Date(d))
      .filter(d => d >= today)
      .sort((a, b) => a.getTime() - b.getTime());

    if (futureDates.length === 0) return { date: "--.--", day: "" };

    const futureDate = futureDates[0];
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    return {
      date: `${String(futureDate.getDate()).padStart(2, '0')}.${String(futureDate.getMonth() + 1).padStart(2, '0')}`,
      day: days[futureDate.getDay()]
    };
  };

  if (!isMounted) return <div className="min-h-screen bg-[#001f3f]" />;

  return (
    <div className="min-h-screen bg-[#001f3f] text-white pt-32 pb-24 px-6 font-montserrat">

      {/* NAGŁÓWEK */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#b59410] font-black uppercase tracking-[0.3em] text-xs mb-4 block">Wywóz śmieci Nieporęt</span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-[#b59410]">
          {region ? 'TWÓJ' : 'ODPADY'} <span className="text-white">/ HARMONOGRAM 2026</span>
        </h1>
        
        {region && (
          <button 
            onClick={clearSavedRegion} 
            className="flex items-center gap-2 mx-auto text-[#b59410] text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-all border-b border-[#b59410]/30 pb-1 mb-8"
          >
            <FaSyncAlt /> Zmień swoją lokalizację
          </button>
        )}

        {!region && (
          <div className="bg-[#001f3f] text-white p-8 rounded-3xl shadow-2xl relative border border-[#996515]/30">
            <p className="text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto mb-6">
              Pamiętaj o prawidłowej segregacji odpadów. Wystawiaj pojemniki i worki przed posesję do godziny 7:00 rano w dniu wywozu.
            </p>
            <div className="inline-flex items-center gap-3 bg-[#996515]/10 border border-[#996515]/50 px-6 py-3 rounded-full text-[#996515] font-black tracking-widest text-sm">
              <FaPhoneAlt /> REKLAMACJE: 22 763 94 27
            </div>
          </div>
        )}
      </div>

      {/* SELEKTOR I KAFELKI */}
      <div className="max-w-3xl mx-auto bg-[#0a1122] rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#b59410]/20 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#001f3f] to-[#b59410]"></div>

        {!region ? (
          <div className="flex flex-col gap-6 mb-10 relative">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-[#b59410] tracking-widest text-center">
                Wyszukaj po ulicy lub miejscowości
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Zacznij wpisywać..."
                  className="w-full border-2 border-[#b59410]/30 rounded-2xl p-4 text-sm outline-none font-bold text-white bg-[#0f172a] focus:border-[#b59410] transition-all"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                />
                {showSuggestions && searchTerm.length > 1 && (
                  <div className="absolute top-full left-0 w-full bg-[#0a1122] border-2 border-[#b59410]/50 rounded-2xl mt-2 z-50 shadow-2xl max-h-60 overflow-y-auto">
                    {streetMap
                      .filter(item =>
                        item.s.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.c.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRegionSelect(item.r, `${item.s} (${item.c})`)}
                          className="p-4 hover:bg-[#b59410] hover:text-[#0a1122] cursor-pointer border-b border-white/5 last:border-0 transition-all text-xs font-bold text-white"
                        >
                          {item.s.toUpperCase()} <span className="opacity-60 font-medium">({item.c})</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative py-1 flex items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[8px] font-black text-slate-500 uppercase">lub wybierz rejon z listy</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <select
              value={region}
              onChange={(e) => handleRegionSelect(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-2xl p-4 text-sm focus:border-[#b59410] outline-none font-bold text-[#0f172a] bg-slate-50 cursor-pointer appearance-none text-center"
            >
              <option value="" disabled>-- WYBIERZ REJON --</option>
              <option value="rejon1">Rejon I: Beniaminów, Białobrzegi, Rynia, Nieporęt</option>
              <option value="rejon2">Rejon II: Stanisławów Pierwszy</option>
              <option value="rejon3">Rejon III: Nieporęt</option>
              <option value="rejon4">Rejon IV: Nieporęt</option>
              <option value="rejon5">Rejon V: Wólka Radzymińska, Zegrze Płd.</option>
              <option value="rejon6">Rejon VI: Aleksandrów, Izabelin</option>
              <option value="rejon7">Rejon VII: Stanisławów Drugi</option>
              <option value="rejon8">Rejon VIII: Kąty Węgierskie</option>
              <option value="rejon9">Rejon IX: Józefów</option>
              <option value="rejon10">Rejon X: Michałów-Grabina</option>
              <option value="osiedla">Zabudowa Wielolokalowa</option>
            </select>
          </div>
        ) : (
          <div className="text-center animate-in fade-in duration-500">
            <h3 className="text-[#b59410] font-black uppercase tracking-widest mb-10 italic underline decoration-[#b59410]/30 underline-offset-8">Twoje Najbliższe Odbiory</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4 mb-16">
              {[
                { label: "Zmieszane", data: (wasteData as any)[region]?.zmieszane, bg: "bg-slate-500", shadow: "rgba(100,116,139,0.5)" },
                { label: "Plastik/Metal", data: (wasteData as any)[region]?.metale, bg: "bg-yellow-400", shadow: "rgba(250,204,21,0.5)" },
                { label: "Papier", data: (wasteData as any)[region]?.papier, bg: "bg-blue-500", shadow: "rgba(59,130,246,0.5)" },
                { label: "Szkło", data: (wasteData as any)[region]?.szklo, bg: "bg-green-500", shadow: "rgba(34,197,94,0.5)" },
                { label: "Bio", data: (wasteData as any)[region]?.bio, bg: "bg-amber-700", shadow: "rgba(180,83,9,0.5)" }
              ].map((item, i) => {
                const info = getNextDateInfo(item.data);
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${item.bg} mb-4 shadow-[0_0_20px_${item.shadow}]`}></div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest">{item.label}</span>
                    <span className="text-3xl font-black text-[#FFD700] tracking-tighter">{info.date}</span>
                    <span className="text-[9px] text-[#FFD700]/60 uppercase font-bold mt-1">{info.day}</span>
                  </div>
                );
              })}
            </div>

          {/* --- SEKCJA Z 4 UJEDNOLICONYMI PRZYCISKAMI (BIAŁY/GRANAT) --- */}
            <Link 
              href="/nieporet/harmonogram-wywozu-smieci-maj-2026" 
              className="w-full flex items-center justify-center gap-3 py-4 mb-4 bg-[#0f172a] border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#1e293b] hover:border-white transition-all shadow-lg active:scale-95 group"
            >
              <FaCalendarAlt className="text-lg transition-transform group-hover:scale-110" />
              ZOBACZ WSZYSTKIE TERMINY
            </Link>

            <PobierzKalendarzButton rejonKey={region} />

            <button
              onClick={() => {
                if (deferredPrompt) deferredPrompt.prompt();
                else alert("Na iPhone: kliknij 'Udostępnij', a potem 'Dodaj do ekranu początkowego'.");
              }}
              className="w-full flex items-center justify-center gap-3 py-4 mb-4 bg-[#0f172a] border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#1e293b] hover:border-white transition-all shadow-lg active:scale-95 group"
            >
              <FaMobileAlt className="text-xl transition-transform group-hover:scale-110" />
              DODAJ DO EKRANU
            </button>
            
            <a
              href={region === 'osiedla' ? '/zabudowa-wielolokalowa.jpg' : `/${region}.jpg`}
              download="Harmonogram_Nieporet_2026.jpg"
              className="w-full flex items-center justify-center gap-3 py-4 mb-4 bg-[#0f172a] border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#1e293b] hover:border-white transition-all shadow-lg active:scale-95 group"
            >
              <FaDownload className="text-lg transition-transform group-hover:scale-110" />
              ZAPISZ GRAFIKĘ NA TELEFON
            </a>
           
   
         
            
            {/* 🔴 NASZ 5. PRZYCISK TESTOWY 🔴 */}
            <div className="mt-8 pt-6 border-t border-dashed border-[#d4af37]/30 w-full flex flex-col items-center">
              <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mb-2 animate-pulse">
                --- NOWY SYSTEM (TEST) ---
              </span>
              <SubskrybujKalendarzButton rejonKey={region} />
            </div>
            {/* ----------------------------- */}
          </div>
        )}

        <div className="max-w-2xl mx-auto mt-12 mb-12 relative z-20">
          <SocialShareBar
            message="Sąsiedzie, przypominam o wywozie śmieci! Sprawdź tutaj:"
            shareUrl="https://mistrzowieregionu.pl/harmonogramy"
          />
        </div>

        {/* 🚀 TWOJA PRZYWRÓCONA SEKCJA SEO DLA MIEJSCOWOŚCI */}
        <div className="mt-16 mb-12 text-center max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#b59410] uppercase tracking-widest mb-6 drop-shadow-sm font-montserrat">
            Terminy odbioru odpadów w miejscowościach Gminy Nieporęt
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed font-montserrat">
            Nasz interaktywny kalendarz obejmuje miejscowości: Nieporęt, Białobrzegi, Rynia, Pilawa, Stanisławów Pierwszy, Stanisławów Drugi, Izabelin, Aleksandrów, Wola Aleksandra, Kąty Węgierskie, Józefów, Michałów-Grabina oraz Rembelszczyzna.
          </p>
        </div>

        <div className="mt-12 p-6 rounded-2xl border-2 border-[#b59410] bg-[#001f3f]/40 backdrop-blur-sm text-white shadow-lg">
          <h3 className="text-xl font-bold text-[#b59410] mb-4 flex items-center gap-3">
            <FaRecycle className="text-2xl" /> Punkt PSZOK Nieporęt
          </h3>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#b59410] mt-1 text-lg flex-shrink-0" />
              <span><strong>Gdzie:</strong> Nieporęt, ul. Małołęcka 62</span>
            </li>
            <li className="flex items-start gap-3">
              <FaClock className="text-[#b59410] mt-1 text-lg flex-shrink-0" />
              <span><strong>Kiedy:</strong> Wtorek – Sobota, godz. 10:00 – 18:00</span>
            </li>
          </ul>
   {/* 🔴 WKLEJ TUTAJ PONIŻSZY KOD: */}

          <div className="mt-8">
            <Link 
              href="/pszok-zasady" 
              className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-[#0f172a] border-2 border-white text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#1e293b] hover:scale-[1.02] transition-all active:scale-95 group shadow-lg"
            >
              <FaInfoCircle className="text-sm group-hover:rotate-12 transition-transform" />
              ZOBACZ CO MOŻESZ ODDAĆ (ZASADY)
            </Link>
          </div>

          {/* 🔴 KONIEC WKLEJANIA */}
  </div>
      </div>
      
      {/* STOPKA PROJEKTANTA */}
      <footer className="mt-20 text-center opacity-30 italic">
        <p className="text-[9px] uppercase tracking-[0.5em]">projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604</p>
      </footer>
    </div>
  );
}