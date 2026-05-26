"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { szamboDb as db } from '../../lib/szambo_db';
import { doc, getDoc, runTransaction, increment, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaTruck, FaPhoneAlt, FaLock } from 'react-icons/fa';

function DriverDecisionContent() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('id');
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle'|'processing'|'accepted'|'rejected'>('idle');

  useEffect(() => {
    if (!leadId) {
      setLoading(false);
      return;
    }
    getDoc(doc(db, 'szambo_leads', leadId)).then(snap => {
      if (snap.exists()) setLead({ id: snap.id, ...snap.data() });
      setLoading(false);
    });
  }, [leadId]);

  const accept = async () => {
    if (!leadId) return;
    setStatus('processing');
    try {
      await runTransaction(db, async (tx) => {
        const ref = doc(db, 'szambo_leads', leadId);
        const snap = await tx.get(ref);
        const data = snap.data()!;
        if (data.status !== 'dispatching') throw new Error('taken');

        const pid = data.partnersQueue?.[data.currentPartnerIndex];
        tx.update(ref, { status: 'accepted', acceptedBy: pid, acceptedAt: serverTimestamp() });
        tx.update(doc(db, 'szambo_partners', pid), { saldo: increment(-10) });
      });

      const priv = await getDoc(doc(db, 'szambo_leads', leadId, 'dane_poufne', 'secret'));
      setLead((l: any) => ({ ...l, ...priv.data(), status: 'accepted' }));
      setStatus('accepted');
    } catch {
      alert('Ktoś był szybszy - zlecenie już zajęte');
      setStatus('idle');
    }
  };

  const reject = async () => {
    if (!leadId) return;
    setStatus('processing');
    try {
      await updateDoc(doc(db, 'szambo_leads', leadId), {
        status: 'brak_firm',
        updatedAt: serverTimestamp()
      });
      setStatus('rejected');
    } catch (error) {
      console.error("Błąd odrzucania:", error);
      setStatus('idle');
    }
  };

  if (loading) return <div className="min-h-screen bg-[#0f172a] grid place-items-center text-[#d4af37] font-black">ŁADOWANIE...</div>;
  if (!leadId || !lead) return <div className="min-h-screen bg-[#0f172a] grid place-items-center text-red-500">Brak prawidłowego identyfikatora zlecenia</div>;
  if (lead.status === 'accepted' && status !== 'accepted') {
    return <div className="min-h-screen bg-[#0f172a] grid place-items-center text-white"><FaTimesCircle className="text-6xl text-red-500 mb-4"/>ZAJĘTE PRZEZ INNĄ FIRMĘ</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 grid place-items-center">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-3xl border-t-4 border-[#d4af37]">
        {status === 'accepted' ? (
          <div className="text-center">
            <FaCheckCircle className="text-5xl text-emerald-500 mx-auto mb-4"/>
            <h2 className="text-2xl font-black mb-4">ZLECENIE PRZYJĘTE</h2>
            <p className="text-xs text-slate-400 mb-6">Prowizja 10 zł naliczona</p>
            <div className="bg-black/20 p-4 rounded-xl text-left space-y-3">
              <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#d4af37]"/>{lead.street} {lead.houseNumber}</p>
              <p className="flex items-center gap-2 text-xl font-black"><FaPhoneAlt className="text-[#d4af37]"/>{lead.phone}</p>
            </div>
            <a href={`tel:${lead.phone}`} className="block mt-6 bg-emerald-500 text-black py-4 rounded-xl font-black text-center">ZADZWOŃ DO KLIENTA</a>
          </div>
        ) : status === 'rejected' ? (
          <div className="text-center py-10"><FaTimesCircle className="text-5xl mx-auto mb-4 text-slate-600"/>Odrzucone - przekazano powiadomienie do dyspozytora</div>
        ) : (
          <div>
            <h1 className="text-3xl font-black text-center mb-6 uppercase">Nowe zlecenie</h1>
            <div className="bg-black/33 p-5 rounded-2xl mb-6 space-y-3">
              <p><FaMapMarkerAlt className="inline text-[#d4af37] mr-2"/>{lead.street}</p>
              <p><FaTruck className="inline mr-2"/>{lead.capacity} m³</p>
              <p className="text-2xl font-black text-[#d4af37]">{lead.estimatedPrice} zł</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl mb-4 flex gap-2 text-xs text-amber-400"><FaLock className="mt-0.5"/>Telefon i nr domu po kliknięciu PRZYJMUJĘ</div>
            <button onClick={accept} disabled={status==='processing'} className="w-full bg-emerald-500 text-black py-4 rounded-xl font-black mb-3 uppercase">{status==='processing'?'...':'PRZYJMUJĘ ZLECENIE'}</button>
            <button onClick={reject} disabled={status==='processing'} className="w-full border-2 border-red-500/50 text-red-500 py-3 rounded-xl font-bold uppercase">ODRZUCAM</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DriverDecisionWindow() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f172a] grid place-items-center text-[#d4af37] font-black">ŁADOWANIE...</div>}>
      <DriverDecisionContent />
    </Suspense>
  );
}