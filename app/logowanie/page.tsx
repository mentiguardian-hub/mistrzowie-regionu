"use client";
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FaGoogle, FaFacebookF, FaEnvelope, FaLock } from 'react-icons/fa';

export default function LogowaniePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logika administratora Mistrzów Regionu
        if (user.email === 'kontakt@mistrzowieregionu.pl') {
          window.location.href = '/admin/zlecenia';
        } else {
          window.location.href = '/ogloszenia';
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const saveUserToFirestore = async (user: any) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || 'Użytkownik Premium',
        photoURL: user.photoURL || null,
        lastLogin: serverTimestamp()
      }, { merge: true });
    } catch(err) {
      console.error("Błąd zapisu danych usera:", err);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserToFirestore(cred.user);
      }
    } catch (err: any) {
      setError(err.message || 'Błąd autoryzacji.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await saveUserToFirestore(result.user);
    } catch (err) {
      setError('Błąd logowania przez Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center pt-32 pb-24 px-6 font-montserrat relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="bg-white text-[#0f172a] p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Strefa VIP</span>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-[#0f172a] mb-2">{isLogin ? 'Logowanie' : 'Rejestracja'}</h1>
        </div>
        {error && <div className="bg-rose-50 border border-rose-200 text-rose-600 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl mb-8 text-center">⚠️ {error}</div>}
        <button onClick={handleGoogleLogin} disabled={loading} className="w-full bg-[#f8fafc] border border-slate-200 hover:border-[#4285F4] hover:bg-[#4285F4]/5 text-[#0f172a] py-4 rounded-full flex items-center justify-center gap-3 font-bold text-sm transition-all mb-8"><FaGoogle className="text-[#4285F4]" /> Kontynuuj przez Google</button>
        <form onSubmit={handleEmailAuth} className="space-y-6">
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 px-6 text-sm font-bold outline-none focus:border-[#d4af37]" />
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Hasło" className="w-full bg-slate-50 border border-slate-200 rounded-full py-4 px-6 text-sm font-bold outline-none focus:border-[#d4af37]" />
          <button type="submit" disabled={loading} className="w-full bg-[#0f172a] text-[#d4af37] py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-[#d4af37] hover:text-[#0f172a] transition-colors shadow-xl">
            {loading ? 'Przetwarzanie...' : (isLogin ? 'Zaloguj Się' : 'Zarejestruj Konto')}
          </button>
        </form>
      </div>
    </div>
  );
}