"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { FaMapMarkerAlt, FaStar, FaCommentDots } from 'react-icons/fa'; // Dodano FaCommentDots

interface CompanyOption {
  id: string;
  name: string;
}

export default function DodajOpiniePage() {
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const [formData, setFormData] = useState({
    author: '',
    authorEmail: '',
    companyId: '',
    rating: 5,
    content: ''
  });

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const q = query(
          collection(db, 'zgloszenia_firm'),
          where('is_verified', '==', true)
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().companyName
        }));
        
        fetched.sort((a, b) => a.name.localeCompare(b.name));
        setCompanies(fetched);
      } catch (err) {
        console.error("Błąd pobierania firm:", err);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStarClick = (ratingValue: number) => {
    setFormData(prev => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.companyId) {
        throw new Error("Wybierz firmę, którą chcesz ocenić.");
      }

      const q = query(
        collection(db, 'reviews'), 
        where('authorEmail', '==', formData.authorEmail.toLowerCase()),
        where('companyId', '==', formData.companyId)
      );
      const existing = await getDocs(q);
      
      if (!existing.empty) {
        throw new Error("Z tego adresu e-mail wystawiono już opinię dla tej firmy.");
      }

      await addDoc(collection(db, 'reviews'), {
        author: formData.author || 'Anonim',
        authorEmail: formData.authorEmail.toLowerCase(),
        companyId: formData.companyId,
        rating: formData.rating,
        content: formData.content,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas wysyłania opinii.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#001f3f] flex items-center justify-center font-montserrat px-6 pt-24">
        <div className="bg-[#001f3f] p-12 rounded-[2.5rem] text-center max-w-xl mx-auto shadow-2xl border border-[#ff7b00]/20">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#ff7b00] to-[#ff9d40] rounded-full mx-auto flex items-center justify-center text-4xl mb-8 shadow-inner shadow-white/30 text-white">
            <FaStar />
          </div>
          <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter text-white">Dziękujemy!</h1>
          <p className="text-emerald-100 mb-8 font-medium leading-relaxed">
            Dziękujemy! Twoja opinia została wysłana do moderacji. Dbamy o jakość i autentyczność głosów w naszej gminie.
          </p>
          <a href="/" className="inline-block bg-[#ff7b00] text-white px-10 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform">
            Wróć do Strony Głównej
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#996515] pt-32 pb-24 px-6 font-montserrat">
      
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <span className="text-[#ff7b00] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Głos Nieporętu</span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-[#996515]">
          Autorski System <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001f3f] to-[#001f3f]">Ocen Mieszkańców</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">
          Oceń specjalistów z naszego regionu. Twoje głosy pomagają sąsiadom unikać fuszerki.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#001f3f] to-[#ff7b00]"></div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#ff7b00]"/> Kogo oceniasz?
            </label>
            <select 
              name="companyId" 
              value={formData.companyId}
              onChange={handleChange}
              className="w-full bg-white border-2 border-slate-200 text-slate-800 p-4 rounded-xl outline-none focus:border-[#001f3f] transition-all font-bold appearance-none cursor-pointer"
              required
            >
              <option value="" disabled>-- Wybierz firmę z listy zweryfikowanych --</option>
              {loadingCompanies ? (
                <option value="" disabled>Ładowanie listy firm...</option>
              ) : (
                companies.map((company) => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))
              )}
            </select>
          </div>

          <div className="text-center py-6">
            <label className="text-[10px] font-black uppercase text-[#996515] tracking-widest mb-4 block">
              Twoja Ocena (Skala 1-5)
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => handleStarClick(starValue)}
                  onMouseEnter={() => setHoveredStar(starValue)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="transition-transform hover:scale-125 focus:outline-none"
                >
                  <FaStar 
                    className={`text-6xl ${
                      (hoveredStar !== null ? starValue <= hoveredStar : starValue <= formData.rating) 
                        ? 'text-[#ff7b00] drop-shadow-[0_0_10px_rgba(255,123,0,0.4)]' 
                        : 'text-slate-200'
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-4 font-black text-slate-400 uppercase text-[10px] tracking-widest">
              {formData.rating === 5 && 'Absolutny Mistrz (5/5)'}
              {formData.rating === 4 && 'Solidna Firma (4/5)'}
              {formData.rating === 3 && 'Może być lepiej (3/5)'}
              {formData.rating === 2 && 'Poniżej oczekiwań (2/5)'}
              {formData.rating === 1 && 'Słabo (1/5)'}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">
                Imię bądź Inicjały
              </label>
              <input 
                type="text" 
                name="author"
                placeholder="np. Pan Marek z Nieporętu"
                value={formData.author}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-100 text-[#996515] p-4 rounded-xl outline-none focus:border-[#ff7b00] transition-all font-medium"
                required
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">
                Adres e-mail (Tylko do weryfikacji)
              </label>
              <input 
                type="email" 
                name="authorEmail"
                placeholder="kowalski@gmail.com"
                value={formData.authorEmail}
                onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-100 text-[#996515] p-4 rounded-xl outline-none focus:border-[#ff7b00] transition-all font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2 block">
              Opisz swoje doświadczenia
            </label>
            <textarea 
              name="content"
              placeholder="Jak przebiegła realizacja? Czy firma dotrzymała terminów?..."
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="w-full bg-slate-50 border-2 border-slate-100 text-[#996515] p-4 rounded-xl outline-none focus:border-[#ff7b00] transition-all font-medium resize-none"
              required
            ></textarea>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-500 p-4 rounded-xl border border-rose-100 text-sm font-bold text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex justify-center items-center gap-2 ${
                isSubmitting 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-[#ff7b00] text-white hover:bg-[#001f3f] shadow-[0_10px_30px_rgba(255,123,0,0.3)]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-500 border-t-slate-300 rounded-full animate-spin"></div>
                  Przetwarzanie głosu...
                </>
              ) : (
                'Zatwierdź Ocenę'
              )}
            </button>

            {/* ŁADNY PRZYCISK DODATKOWY */}
            <a 
              href="/czytaj-opinie" 
              className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex justify-center items-center gap-2 border-2 border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
            >
              <FaCommentDots className="text-sm" />
              Zobacz opinie mieszkańców
            </a>
          </div>
        </form>
      </div>

      <footer className="mt-16 text-center opacity-30 italic">
        <p className="text-[9px] uppercase tracking-[0.5em] text-[#001f3f]">projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604</p>
      </footer>
    </div>
  );
}