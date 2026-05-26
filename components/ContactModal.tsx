"use client";

import React, { useState, useRef } from 'react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaPaperPlane, FaTimes, FaCamera, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const TOPICS = [
  "Prześlij informację / Temat dla portalu",
  "Sugestia ulepszenia strony",
  "Błąd na stronie",
  "Zapytanie o reklamę / Współpracę",
  "Inne"
];

export default function ContactModalTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    topic: TOPICS[0],
    message: ''
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // Limit 5MB
        setError("Plik jest za duży (maksymalny rozmiar to 5MB).");
        return;
      }
      setImageFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = null;

      // Opcjonalny Upload Zdjęcia
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const storageRef = ref(storage, `portal_messages/${fileName}`);
        
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Zapis do Kolekcji portal_messages
      await addDoc(collection(db, 'portal_messages'), {
        email: formData.email,
        topic: formData.topic,
        message: formData.message,
        imageUrl: imageUrl,
        status: 'new', // Status dla Administracji
        createdAt: serverTimestamp()
      });

      setIsSuccess(true);
      // Czyszczenie formularza po wysłaniu
      setFormData({ email: '', topic: TOPICS[0], message: '' });
      setImageFile(null);

    } catch (err: any) {
      console.error("Błąd podczas wysyłania wiadomości:", err);
      setError("Wystąpił nieoczekiwany problem z serwerem. Spróbuj ponownie później.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setIsSuccess(false), 500); // Zresetuj sukces dopiero po schowaniu modala
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 group text-white/80 hover:text-white transition-colors"
      >
        <FaPaperPlane className="text-[#b59410] group-hover:scale-110 transition-transform" /> 
        <span className="border-b border-transparent group-hover:border-[#b59410]">Napisz do nas / Prześlij informację</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border-2 border-[#b59410]/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative text-white">
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-[#001f3f] text-slate-400 hover:text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"
            >
              <FaTimes />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <FaCheckCircle className="text-emerald-500 text-5xl" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-4">Wiadomość Wysłana!</h3>
                <p className="text-slate-400 mb-8 max-w-sm">
                  Dziękujemy za kontakt. Twój głos ma dla nas znaczenie. Wrócimy z odpowiedzią tak szybko, jak to możliwe.
                </p>
                <button 
                  onClick={closeModal}
                  className="bg-[#b59410] text-[#0f172a] px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                  Zamknij Okno
                </button>
              </div>
            ) : (
              <div className="p-8 sm:p-12">
                <div className="mb-8 border-b border-[#b59410]/20 pb-6 text-center">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white mb-4 leading-tight">
                    Twój głos ma znaczenie.
                    <br/><span className="text-[#b59410]">Napisz, co dzieje się w Nieporęcie</span>
                  </h2>
                  <p className="text-slate-400 text-sm font-medium">Błędy, pomysły, interwencje społeczne. Zgłoś to od razu do redakcji.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMail */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#b59410] tracking-widest mb-2 block">Twój Adres E-mail</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="kowalski@gmail.com"
                      required
                      className="w-full bg-[#001f3f] border border-[#b59410]/30 text-white p-4 rounded-xl outline-none focus:border-[#b59410] transition-colors"
                    />
                  </div>

                  {/* Temat */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#b59410] tracking-widest mb-2 block">Wybierz Temat Wiadomości</label>
                    <select 
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#001f3f] border border-[#b59410]/30 text-white p-4 rounded-xl outline-none focus:border-[#b59410] transition-colors appearance-none cursor-pointer"
                    >
                      {TOPICS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Treść (Zwiększony Limit) */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-[#b59410] tracking-widest mb-2 flex justify-between">
                      <span>Treść Twojej Wiadomości</span>
                      <span className="text-slate-500">{formData.message.length} / 2000</span>
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Dzień dobry, chciałem zgłosić, że na ulicy..."
                      required
                      maxLength={2000}
                      rows={6}
                      className="w-full bg-[#001f3f] border border-[#b59410]/30 text-white p-4 rounded-xl outline-none focus:border-[#b59410] transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Opcjonalne Zdjęcie */}
                  <div className="bg-[#001f3f]/50 p-6 rounded-xl border border-dashed border-[#b59410]/30 text-center">
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-[#b59410]/10 rounded-full flex items-center justify-center text-[#b59410]">
                        <FaCamera className="text-xl" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-1">Załącz zdjęcie (Opcjonalnie)</p>
                        <p className="text-xs text-slate-500 mb-4">Max 5MB. Pokaż nam dokładnie, o co chodzi.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#001f3f] text-[#b59410] px-6 py-2 rounded-full text-[10px] uppercase font-black uppercase tracking-widest border border-[#b59410]/30 hover:bg-[#b59410] hover:text-[#001f3f] transition-all"
                      >
                        {imageFile ? "Zmień Wybrany Plik" : "Wybierz zdjecie z dysku"}
                      </button>
                      {imageFile && (
                        <p className="text-xs text-emerald-400 mt-2 font-medium flex items-center justify-center gap-2">
                          <FaCheckCircle /> Zdekodowano: {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Errors */}
                  {error && (
                    <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 p-4 rounded-xl flex items-center gap-3 text-sm font-bold">
                      <FaExclamationCircle className="text-lg shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  {/* Wyślij */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex justify-center items-center gap-2 ${
                      isSubmitting 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-[#b59410] text-[#0f172a] hover:bg-white shadow-[0_10px_30px_rgba(181,148,16,0.2)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                        Wysyłanie Danych...
                      </>
                    ) : (
                      'Wyślij Wiadomość do Redakcji'
                    )}
                  </button>

                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
