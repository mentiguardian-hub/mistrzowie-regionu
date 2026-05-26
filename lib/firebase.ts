import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCoWAFQOZuzg_dEy5d-771_HX2kWVzAi6A",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mistrzowie-regionu.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mistrzowie-regionu",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mistrzowie-regionu.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "259754210608",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:259754210608:web:5d6e68ff66f5a5a7a2c4f5",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-Z5PVYJ1SNK"
};

// Inicjalizacja głównych usług Firebase
let app; try { app = getApp(); } catch { app = initializeApp(firebaseConfig); }
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const functions = getFunctions(app, 'europe-central2');

// Eksportujemy czyste usługi bez "ciężkiego" messagingu
export { app, db, storage, auth, functions };