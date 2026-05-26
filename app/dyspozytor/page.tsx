'use client';
import React, { useState, useEffect } from 'react';
import { szamboDb as db } from '../../lib/szambo_db';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, getDoc, setDoc, increment } from 'firebase/firestore';
import { FaPlus, FaWallet } from 'react-icons/fa';

export default function DispatcherPanel() {
  const [leads, setLeads] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [showFirms, setShowFirms] = useState(false);
  const [newFirm, setNewFirm] = useState({name:'', phone:'', saldo:100});
  const [selectedFirms, setSelectedFirms] = useState<Record<string, string>>({});

  useEffect(() => {
    const q = query(collection(db, "szambo_leads"), orderBy("createdAt", "desc"));
    return onSnapshot(q, s => setLeads(s.docs.map(d=>({id:d.id,...d.data()}))));
  }, []);

  useEffect(() => {
    const q = query(collection(db, "szambo_partners"), orderBy("sortOrder","asc"));
    return onSnapshot(q, s => setPartners(s.docs.map(d=>({id:d.id,...d.data()}))));
  }, []);

  const addFirm = async () => {
    if(!newFirm.name || !newFirm.phone) return alert('Uzupełnij nazwę i telefon');
    await addDoc(collection(db,"szambo_partners"), { ...newFirm, saldo: Number(newFirm.saldo), sortOrder: partners.length + 1, createdAt: serverTimestamp() });
    setNewFirm({name:'', phone:'', saldo:100});
  };

  const doladuj = async (id:string, kwota:number) => {
    await updateDoc(doc(db,"szambo_partners",id), { saldo: increment(kwota) });
  };

  const startDispatch = async (lead:any) => {
    const chosenFirmId = selectedFirms[lead.id];
    if (!chosenFirmId) return alert('Wybierz najpierw firmę z listy!');
    
    const firm = partners.find(p => p.id === chosenFirmId);
    if (!firm) return;
    if ((firm.saldo ?? 0) <= -100) return alert('Ta firma ma za niskie saldo!');

    try {
      const privRef = doc(db,"szambo_leads",lead.id,"dane_poufne","secret");
      const privSnap = await getDoc(privRef);
      if(!privSnap.exists()) {
        await setDoc(privRef, { phone: lead.phone || 'Brak', houseNumber: lead.houseNumber || 'Brak', name: lead.name || 'Brak' });
      }
      
      await updateDoc(doc(db,"szambo_leads",lead.id), {
        status: 'dispatching',
        partnersQueue: [chosenFirmId],
        currentPartnerIndex: 0,
        smsSentAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const cleanPhone = firm.phone.replace(/\D/g, ''); 
      
      // ZMIANA: Link dopasowany do bezpiecznego formatu query (?id=...) dla pełnej klikalności
      const message = `Nowe zlecenie dla ${firm.name}:\nAdres: ${lead.street} ${lead.houseNumber}\nPojemność: ${lead.capacity} m3\nCena: ${lead.estimatedPrice} zł\nPotwierdź tutaj: ${window.location.origin}/zlecenie?id=${lead.id}`;
      
      window.location.href = `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;

    } catch (error) { console.error("Błąd:", error); alert("Wystąpił błąd."); }
  };

  const nextPartner = async (lead: any) => {
    await updateDoc(doc(db, "szambo_leads", lead.id), { 
      status: 'brak_firm', 
      updatedAt: serverTimestamp() 
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 px-6 py-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-black text-white uppercase">Panel Dyspozytora</h1>
        <button onClick={()=>setShowFirms(!showFirms)} className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold transition">
          {showFirms ? 'POKAŻ ZLECENIA' : `ZARZĄDZAJ FIRMAMI (${partners.length})`}
        </button>
      </header>

      {showFirms ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-black mb-4">Dodaj firmę asenizacyjną</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <input value={newFirm.name} onChange={e=>setNewFirm({...newFirm,name:e.target.value})} placeholder="Nazwa firmy" className="bg-black/30 p-3 rounded-xl border border-white/10 text-white md:col-span-2" />
            <input value={newFirm.phone} onChange={e=>setNewFirm({...newFirm,phone:e.target.value})} placeholder="Telefon" className="bg-black/30 p-3 rounded-xl border border-white/10 text-white" />
            <input type="number" value={newFirm.saldo} onChange={e=>setNewFirm({...newFirm,saldo:Number(e.target.value)})} placeholder="Saldo" className="bg-black/30 p-3 rounded-xl border border-white/10 text-white" />
          </div>
          <button onClick={addFirm} className="w-full bg-[#d4af37] text-black py-3 rounded-xl font-black"><FaPlus/> DODAJ</button>
          <div className="mt-6 space-y-2">
            {partners.map(p=>(
              <div key={p.id} className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
                <div><p className="text-white font-bold">{p.name}</p><p className="text-xs text-slate-400">{p.phone} • saldo: {p.saldo} zł</p></div>
                <div className="flex gap-2">
                  <button onClick={()=>doladuj(p.id,50)} className="bg-emerald-600/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold">+50</button>
                  <button onClick={()=>doladuj(p.id,100)} className="bg-emerald-600/20 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-bold">+100</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold">{lead.street} {lead.houseNumber}</h3>
              <p className="text-xs text-slate-400">{lead.capacity}m³ | {lead.estimatedPrice}zł</p>
              
              {!lead.status || ['pending', '', 'brak_firm'].includes(lead.status) ? (
                <div className="mt-3 flex flex-col gap-2">
                  {lead.status === 'brak_firm' && (
                    <span className="text-red-400 text-[10px] font-bold uppercase mb-1">
                      Poprzednia firma odrzuciła lub nie odpowiedziała. Wybierz inną:
                    </span>
                  )}
                  <select className="bg-black/40 text-white text-xs p-2 rounded-lg border border-white/10" onChange={(e) => setSelectedFirms({...selectedFirms, [lead.id]: e.target.value})}>
                    <option value="">-- Wybierz firmę --</option>
                    {partners.map(p => <option key={p.id} value={p.id}>{p.name} ({p.saldo} zł)</option>)}
                  </select>
                  <button onClick={()=>startDispatch(lead)} className="bg-[#d4af37] text-black font-black py-2 rounded-xl text-xs uppercase">WYŚLIJ ZLECENIE</button>
                </div>
              ) : lead.status === 'dispatching' ? (
                <div className="mt-3">
                  <span className="bg-[#d4af37]/20 text-[#d4af37] px-4 py-2 rounded-xl text-xs font-bold">WYSŁANO</span>
                  <button onClick={() => nextPartner(lead)} className="ml-2 text-[10px] text-slate-500 underline hover:text-slate-300">
                    Brak odpowiedzi? Wybierz inną
                  </button>
                </div>
              ) : lead.status === 'accepted' ? (
                <div className="mt-3">
                  <span className="bg-emerald-500/20 text-emerald-500 px-4 py-2 rounded-xl text-xs font-bold">ZLECENIE PRZYJĘTE</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}