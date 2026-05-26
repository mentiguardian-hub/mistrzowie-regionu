import { szamboDb } from '../lib/szambo_db';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PARTNERS_TO_ADD = [
  { 
    name: "Szambex Nieporęt", 
    phone: "600123456", 
    status: "active", 
    saldo: 100, 
    sortOrder: 1, 
    createdAt: serverTimestamp()
  },
  { 
    name: "Asenizacja Plus", 
    phone: "600987654", 
    status: "active", 
    saldo: 100, 
    sortOrder: 2,
    createdAt: serverTimestamp()
  }
];

export async function seedSzamboPartners() {
  // Baza izolowana
  const colRef = collection(szamboDb, 'szambo_partners'); 
  
  for (const partner of PARTNERS_TO_ADD) {
    await addDoc(colRef, partner);
  }
  console.log("Partnerzy dodani pomyślnie do nowej kolekcji 'szambo_partners'!");
}