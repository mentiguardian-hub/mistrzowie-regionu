"use client";
import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { auth } from '../lib/firebase'; // Upewnij się, że ścieżka do firebase.ts jest poprawna
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Nasłuchiwanie prawdziwej sesji z Firebase
  useEffect(() => {
    setIsMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'kontakt@mistrzowieregionu.pl') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Logowanie BEZPOŚREDNIO do Firebase (e-mail jest podany na sztywno, wpisujesz tylko hasło)
      await signInWithEmailAndPassword(auth, 'kontakt@mistrzowieregionu.pl', passwordInput);
      setIsAuthenticated(true);
      setError(false);
    } catch (err) {
      console.error("Błąd autoryzacji Firebase:", err);
      setError(true);
      setPasswordInput('');
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-[#001f3f]" />;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#001f3f] flex items-center justify-center p-6 font-montserrat relative overflow-hidden text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url('/transport-hero.jpg')" }}
        ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f] via-[#001f3f]/95 to-[#001f3f]/80"></div>

      <div className="bg-[#0f172a] border border-[#b59410]/30 p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 max-w-md w-full text-center relative backdrop-blur-md">
        <div className="absolute -top-10 -right-10 text-[#b59410] opacity-5 text-9xl pointer-events-none">
          <FaLock />
        </div>
        
        <div className="w-20 h-20 bg-[#b59410]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#b59410]/30 shadow-[0_0_30px_rgba(181,148,16,0.15)] relative z-10">
          <FaLock className="text-[#b59410] text-3xl" />
        </div>
        
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 relative z-10">Centrum Dowodzenia</h2>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 relative z-10">Wprowadź kod dostępu (Firebase)</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6 relative z-10">
          <div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setError(false); }}
              placeholder="Hasło z Firebase..."
              className={`w-full bg-[#0a1122] border-2 ${error ? 'border-red-500/50 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-[#b59410]/30 text-white shadow-inner'} rounded-2xl p-4 text-center font-bold tracking-[0.2em] outline-none focus:border-[#b59410] transition-all`}
              autoFocus
            />
            {error && <p className="text-red-400 text-[9px] uppercase font-black tracking-[0.2em] mt-3 animate-pulse">Błędne hasło</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#b59410] hover:bg-[#d4af37] text-[#0f172a] border-2 border-[#b59410] hover:border-[#d4af37] font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all shadow-lg text-xs"
          >
            Autoryzuj
          </button>
        </form>
      </div>
    </div>
  );
}