"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getCountFromServer, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { FaBroadcastTower, FaPaperPlane, FaCrown, FaUsers, FaPenNib, FaBullhorn, FaBookOpen, FaCheck, FaTimes, FaCommentDots, FaUserTie } from 'react-icons/fa';

interface Review {
  id: string;
  author: string;
  authorEmail: string;
  companyId: string;
  content: string;
  rating: number;
  status: string;
  createdAt: any;
}

// NOWY INTERFEJS DLA ZGŁOSZEŃ MIESZKAŃCÓW
interface Recommendation {
  id: string;
  kategoria: string;
  polecana_firma: string;
  uzasadnienie: string;
  status: string;
  data: any;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ companies: 0, posts: 0, articles: 0, classifieds: 0, blog: 0, pendingReviews: 0, pendingRecommendations: 0 });
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [tickerText, setTickerText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const compSnap = await getCountFromServer(collection(db, "zgloszenia_firm"));
        const postsSnap = await getCountFromServer(collection(db, "tablica_posts"));
        const artSnap = await getCountFromServer(collection(db, "aktualnosci"));
        const classSnap = await getCountFromServer(collection(db, "classifieds"));
        const blogSnap = await getCountFromServer(collection(db, "blog_posts"));

        // Pobieranie opinii
        const reviewsQuery = query(collection(db, 'reviews'), where('status', '==', 'pending'));
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const fetchedReviews = reviewsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Review));

        // POBIERANIE POLECEŃ OD MIESZKAŃCÓW (Z nowej kolekcji)
        const recQuery = query(collection(db, 'ankiety_polecenia'), where('status', '==', 'nowe'));
        const recSnapshot = await getDocs(recQuery);
        const fetchedRecommendations = recSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Recommendation));

        setPendingReviews(fetchedReviews);
        setRecommendations(fetchedRecommendations);

        setStats({
          companies: compSnap.data().count,
          posts: postsSnap.data().count,
          articles: artSnap.data().count,
          classifieds: classSnap.data().count,
          blog: blogSnap.data().count,
          pendingReviews: fetchedReviews.length,
          pendingRecommendations: fetchedRecommendations.length // Nowa statystyka
        });
      } catch (err) {
        console.error("Błąd ładowania danych panelu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sendTicker = async () => {
    if (!tickerText.trim()) return;
    setSending(true);
    try {
      await addDoc(collection(db, "news_ticker"), {
        content: tickerText,
        createdAt: serverTimestamp(),
      });
      setTickerText("");
      alert("🔴 KOMUNIKAT NADANY!");
    } catch (e) {
      alert("Błąd: " + e);
    } finally {
      setSending(false);
    }
  };

  const handleApproveReview = async (id: string) => {
    if (confirm('Zatwierdzić opinię? Pojawi się ona publicznie.')) {
      try {
        await updateDoc(doc(db, 'reviews', id), { status: 'approved' });
        setPendingReviews(prev => prev.filter(r => r.id !== id));
        setStats(prev => ({ ...prev, pendingReviews: prev.pendingReviews - 1 }));
      } catch (err) {
        console.error("Błąd zatwierdzania:", err);
        alert('Wystąpił błąd.');
      }
    }
  };

  const handleRejectReview = async (id: string) => {
    if (confirm('Usunąć opinię? Zostanie odrzucona i skasowana z bazy.')) {
      try {
        await deleteDoc(doc(db, 'reviews', id));
        setPendingReviews(prev => prev.filter(r => r.id !== id));
        setStats(prev => ({ ...prev, pendingReviews: prev.pendingReviews - 1 }));
      } catch (err) {
        console.error("Błąd usuwania:", err);
        alert('Wystąpił błąd.');
      }
    }
  };

  // AKCJA DLA ZGŁOSZEŃ (Archiwizacja przetworzonego zgłoszenia)
  const handleArchiveRecommendation = async (id: string) => {
    if (confirm('Oznaczyć to polecenie jako załatwione (np. skontaktowano się z firmą)?')) {
      try {
        await updateDoc(doc(db, 'ankiety_polecenia', id), { status: 'zrealizowane' });
        setRecommendations(prev => prev.filter(r => r.id !== id));
        setStats(prev => ({ ...prev, pendingRecommendations: prev.pendingRecommendations - 1 }));
      } catch (err) {
        console.error("Błąd aktualizacji zgłoszenia:", err);
        alert('Wystąpił błąd.');
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-500 font-montserrat text-slate-900 p-4">
      
      <div className="mb-12 border-b-4 border-black pb-6 flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Pulpit Szefa</h2>
            <p className="text-slate-500 font-bold text-[10px] mt-2 uppercase tracking-widest">
            Centrum Dowodzenia i Statystyki
            </p>
        </div>
        <div className="flex gap-4 flex-col md:flex-row">
            {stats.pendingReviews > 0 && (
                 <div className="bg-rose-100 text-rose-600 px-4 py-2 rounded-xl border-2 border-rose-200 animate-pulse flex items-center gap-2">
                     <FaCommentDots />
                     <span className="font-black text-xs uppercase tracking-widest">{stats.pendingReviews} Opinie Do Moderacji!</span>
                 </div>
            )}
            {stats.pendingRecommendations > 0 && (
                 <div className="bg-amber-100 text-amber-600 px-4 py-2 rounded-xl border-2 border-amber-200 animate-pulse flex items-center gap-2">
                     <FaUserTie />
                     <span className="font-black text-xs uppercase tracking-widest">{stats.pendingRecommendations} Polecenia Fachowców!</span>
                 </div>
            )}
        </div>
      </div>

      {/* --- KAFELKI ZE STATYSTYKAMI --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <StatCard label="Fachowcy" value={loading ? "..." : stats.companies} icon={<FaCrown />} color="text-amber-500" />
        <StatCard label="Tablica" value={loading ? "..." : stats.posts} icon={<FaUsers />} color="text-blue-500" />
        <StatCard label="Polecenia" value={loading ? "..." : stats.pendingRecommendations} icon={<FaUserTie />} color="text-purple-500" />
        <StatCard label="Opinie" value={loading ? "..." : stats.pendingReviews} icon={<FaCommentDots />} color="text-rose-500" />
      </div>

      {/* --- NADAJNIK --- */}
      <div className="bg-white border-4 border-black rounded-[2.5rem] p-10 shadow-xl mb-16">
          <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center border-2 border-orange-200">
              <FaBroadcastTower size={24} />
          </div>
          <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-black">Nadajnik Regionalny</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Sterowanie paskiem newsów na stronie</p>
          </div>
          </div>

          <textarea 
          placeholder="Co się dzieje w regionie?"
          className="w-full bg-slate-50 border-2 border-black rounded-2xl p-6 text-black font-bold text-lg outline-none focus:bg-yellow-50 h-32 mb-4 transition-all"
          value={tickerText}
          onChange={(e) => setTickerText(e.target.value)}
          />
          <button 
          onClick={sendTicker}
          disabled={sending}
          className="w-full py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] bg-black text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-4"
          >
          <FaPaperPlane /> {sending ? 'NADAWANIE...' : 'PUŚĆ W ETER'}
          </button>
      </div>

      {/* --- DWA PANELE OPERACYJNE --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
        
        {/* PANEL 1: POLECENIA FACHOWCÓW (NOWY) */}
        <div className="bg-amber-50 border-4 border-amber-200 rounded-[2.5rem] p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-white text-amber-600 rounded-2xl flex items-center justify-center border-2 border-amber-300 shadow-sm">
                <FaUserTie size={24} />
            </div>
            <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-black">Zgłoszeni Fachowcy</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Kogo polecają mieszkańcy?</p>
            </div>
          </div>

          {recommendations.length === 0 ? (
              <div className="h-48 border-2 border-dashed border-amber-300 rounded-2xl flex flex-col items-center justify-center text-amber-500/50">
                  <FaCheck size={32} className="mb-2 opacity-50"/>
                  <p className="font-bold uppercase tracking-widest text-xs">Brak nowych poleceń</p>
              </div>
          ) : (
              <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 hide-scrollbars">
                  {recommendations.map(rec => (
                      <div key={rec.id} className="bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <p className="font-black text-lg uppercase text-black">{rec.polecana_firma}</p>
                                  <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest bg-amber-100 inline-block px-2 py-1 rounded mt-1">Branża: {rec.kategoria}</p>
                              </div>
                          </div>
                          <p className="text-sm font-medium text-slate-600 italic mb-6 border-l-4 border-amber-200 pl-4 py-1">"{rec.uzasadnienie}"</p>
                          
                          <button onClick={() => handleArchiveRecommendation(rec.id)} className="w-full bg-black hover:bg-amber-500 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-colors flex items-center justify-center gap-2">
                              <FaCheck /> Zrobione (Ukryj)
                          </button>
                      </div>
                  ))}
              </div>
          )}
        </div>

        {/* PANEL 2: MODERATOR OPINII (STARY) */}
        <div className="bg-slate-50 border-4 border-slate-200 rounded-[2.5rem] p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white text-slate-800 rounded-2xl flex items-center justify-center border-2 border-slate-300 shadow-sm">
                    <FaCommentDots size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-black">Moderacja Opinii</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Weryfikuj głosy mieszkańców</p>
                </div>
            </div>

            {pendingReviews.length === 0 ? (
                <div className="h-48 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                    <FaCheck size={32} className="mb-2 opacity-50"/>
                    <p className="font-bold uppercase tracking-widest text-xs">Wszystko sprawdzone!</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 hide-scrollbars">
                    {pendingReviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm relative">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-black text-sm uppercase text-black">{review.author}</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase">{review.authorEmail}</p>
                                </div>
                                <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[10px] font-black">{review.rating}/5</span>
                            </div>
                            <p className="text-sm font-medium text-slate-600 italic mb-6">"{review.content}"</p>
                            
                            <div className="flex gap-2 border-t border-slate-100 pt-4 mt-auto">
                                <button onClick={() => handleApproveReview(review.id)} className="flex-1 bg-emerald-100 hover:bg-emerald-500 text-emerald-700 hover:text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-colors flex items-center justify-center gap-2">
                                    <FaCheck /> Akceptuj
                                </button>
                                <button onClick={() => handleRejectReview(review.id)} className="flex-1 bg-rose-100 hover:bg-rose-500 text-rose-700 hover:text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-colors flex items-center justify-center gap-2">
                                    <FaTimes /> Odrzuć
                                </button>
                            </div>
                            <div className="absolute -top-3 -right-3 bg-black text-white text-[8px] font-black uppercase px-2 py-1 rounded-full border-2 border-white shadow-sm">
                                ID Firmy: {review.companyId}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>

      {/* --- STOPKA --- */}
      <footer className="text-center pb-10 border-t-2 border-slate-100 pt-10">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | TEL. 601 728 604
        </p>
      </footer>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-sm flex items-center justify-between hover:border-black transition-all">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl md:text-4xl font-black text-black leading-none">{value}</p>
      </div>
      <div className={`text-3xl md:text-4xl opacity-20 ${color}`}>{icon}</div>
    </div>
  );
}