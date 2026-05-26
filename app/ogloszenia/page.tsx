import React from 'react';
import { db } from '@/lib/firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import OgloszeniaView from './OgloszeniaView';

export default async function OgloszeniaPage() {
  let initialClassifieds: any[] = [];

  try {
    const snapshot = await getDocs(collection(db, 'classifieds'));
    
    initialClassifieds = snapshot.docs.map(doc => {
      const data = doc.data();
      
      return {
        id: doc.id,
        ...data,
        // 🛠️ KONWERSJA DAT: Zamieniamy techniczne obiekty Timestamp na proste liczby
        createdAt: data.createdAt?.toMillis?.() || Date.now(),
        expiryDate: data.expiryDate?.toMillis?.() || null,
        // Jeśli w przyszłości dodasz inne daty (np. updatedAt), też użyj .toMillis()
      };
    });

    // Sortowanie po stronie serwera: od najnowszych
    initialClassifieds.sort((a, b) => b.createdAt - a.createdAt);

  } catch (err) {
    console.error("Błąd pobierania danych z Firebase:", err);
  }

  // Przesyłamy "czyste" i bezpieczne dane do komponentu klienckiego
  return <OgloszeniaView initialClassifieds={initialClassifieds} />;
}