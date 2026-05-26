"use client";
import React from 'react';

// Ikony SVG dla pełnej kompatybilności
const IconFacebook = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
);
const IconInstagram = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
);
const IconPhone = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
);
const IconMail = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9V88c0-26.5-21.5-48-48-48H48C21.5 40 0 61.5 0 88v43c0 7.4 3.4 14.4 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
);

const NextLink = ({ href, children, className }: any) => (
  <a href={href} className={className}>{children}</a>
);

export default function Footer() {
  return (
    <footer className="bg-[#0b1120] font-sans relative overflow-hidden text-white border-t border-[#d4af37]/30">
      {/* Efekty świetlne tła */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* 1. SEKCJA: NEWSLETTER */}
      <div className="relative z-10 border-b border-[#d4af37]/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter mb-4">
              Dołącz do społeczności <span className="text-[#d4af37]">Mistrzów Regionu</span>
            </h2>
            <p className="text-white/60 text-sm font-medium">Bądź na bieżąco z najważniejszymi informacjami z Gminy Nieporęt.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            <input 
              type="email" 
              placeholder="Twój e-mail..." 
              className="bg-black/20 border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-[#d4af37] transition-all w-full lg:min-w-[300px]"
            />
            <button className="bg-[#d4af37] text-[#0b1120] font-black uppercase text-[10px] tracking-[0.2em] px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-[#d4af37]/10">
              Zapisz się
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-left">
          {/* KOLUMNA 1: O NAS */}
          <div className="flex flex-col">
            <NextLink href="/" className="mb-8 inline-block group">
              <span className="text-2xl font-black text-white tracking-widest uppercase flex flex-col leading-none">
                <span className="text-[#d4af37] text-4xl drop-shadow-lg group-hover:scale-105 transition-transform origin-left">Mistrzowie</span>
                <span className="opacity-90 mt-1">Regionu</span>
              </span>
            </NextLink>
            <p className="text-white/60 text-sm font-medium leading-relaxed mb-8 pr-4">
              Największa w Gminie Nieporęt platforma łącząca mieszkańców z rzetelnymi wykonawcami. Działamy lokalnie, stawiamy na jakość.
            </p>
            <div className="flex gap-4">
  {/* FACEBOOK */}
  <a 
    href="https://www.facebook.com/Mistrzowieregionu" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0b1120] transition-all border border-white/5"
  >
    <IconFacebook />
  </a>

  {/* INSTAGRAM */}
  <a 
    href="https://www.instagram.com/TWOJA_NAZWA_PROFILU" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0b1120] transition-all border border-white/5"
  >
    <IconInstagram />
  </a>
</div>
          </div>

          {/* KOLUMNA 2: STREFA MIESZKAŃCA (Dodano Regulamin i Prywatność) */}
          <div>
            <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] mb-8 text-sm">Strefa Mieszkańca</h3>
            <ul className="space-y-4 text-white/70 text-sm font-bold uppercase tracking-widest">
              <li><NextLink href="/ogloszenia" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37]">Giełda ogłoszeń</NextLink></li>
              <li><NextLink href="/harmonogramy" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37]">Harmonogram śmieci</NextLink></li>
              <li><NextLink href="/tablica" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37]">Tablica wpisów</NextLink></li>
              <li><NextLink href="/regulamin" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37] text-[#d4af37]">Regulamin Serwisu</NextLink></li>
              <li><NextLink href="/polityka-prywatnosci" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37] text-[#d4af37]">Polityka Prywatności</NextLink></li>
            </ul>
          </div>

          {/* KOLUMNA 3: USŁUGI */}
          <div>
            <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] mb-8 text-sm">Szybki Kontakt</h3>
            <ul className="space-y-4 text-white/70 text-sm font-bold uppercase tracking-widest">
              <li><NextLink href="/szamba" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37]">Wywóz szamba</NextLink></li>
              <li><NextLink href="/hydraulika" className="hover:text-white transition-all underline decoration-transparent hover:decoration-[#d4af37]">Hydraulik 24h</NextLink></li>
              <li><NextLink href="/katalog" className="text-[#d4af37] border-b border-[#d4af37]/30 pb-1">Pełny Katalog →</NextLink></li>
            </ul>
          </div>

          {/* KOLUMNA 4: DANE KONTAKTOWE */}
          <div>
            <h3 className="text-[#d4af37] font-black uppercase tracking-[0.2em] mb-8 text-sm">Biuro Redakcji</h3>
            <div className="space-y-6">
              <a href="tel:+48601728604" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-all">
                  <div className="text-[#d4af37] group-hover:text-[#0b1120]"><IconPhone /></div>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Infolinia</p>
                  <p className="text-sm font-black text-white group-hover:text-[#d4af37] transition-colors">601 728 604</p>
                </div>
              </a>
              <a href="mailto:kontakt@mistrzowieregionu.pl" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#d4af37] transition-all">
                  <div className="text-[#d4af37] group-hover:text-[#0b1120]"><IconMail /></div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[9px] font-black uppercase text-white/40 tracking-widest leading-none mb-1">Napisz do nas</p>
                  <p className="text-[11px] font-black text-white truncate group-hover:text-[#d4af37] transition-colors">kontakt@mistrzowieregionu.pl</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PASEK AUTORSKI (Zaktualizowano linki prawne) */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em]">
              &copy; {new Date().getFullYear()} Mistrzowie Regionu. Wszelkie Prawa Zastrzeżone.
            </p>
            <div className="flex gap-4 text-[9px] font-bold text-white/30 uppercase tracking-widest">
               <NextLink href="/regulamin" className="hover:text-white transition-colors underline decoration-[#d4af37]/20">Regulamin</NextLink>
               <NextLink href="/polityka-prywatnosci" className="hover:text-white transition-colors underline decoration-[#d4af37]/20">Prywatność</NextLink>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
            PROJEKTANT I WDROŻENIE: 
            <a href="mailto:kontakt@mistrzowieregionu.pl" className="text-[#d4af37] hover:text-white transition-all underline underline-offset-4 decoration-[#d4af37]/30">
              PORTAL NIEPORĘT
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </footer>
  );
}