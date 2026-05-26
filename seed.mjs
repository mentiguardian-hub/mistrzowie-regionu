import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoWAFQOZuzg_dEy5d-771_HX2kWVzAi6A",
  authDomain: "mistrzowie-regionu.firebaseapp.com",
  projectId: "mistrzowie-regionu",
  storageBucket: "mistrzowie-regionu.firebasestorage.app",
  messagingSenderId: "259754210608",
  appId: "1:259754210608:web:5d6e68ff66f5a5a7a2c4f5",
  measurementId: "G-Z5PVYJ1SNK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  try {
    const q = query(collection(db, "companies"), where("name", "==", "SZAMBEX24 - Wywóz Nieczystości"));
    const sn = await getDocs(q);
    if (!sn.empty) {
      console.log("Already exists");
      process.exit(0);
    }

    await addDoc(collection(db, 'companies'), {
        name: 'SZAMBEX24 - Wywóz Nieczystości',
        logo: '/szambex.png',
        description: 'Największy certyfikowany przewoźnik w gminie Nieporęt. Gwarancja czystości posesji.',
        phoneRaw: '+48500600700',
        phoneDisplay: '500 600 700',
        callToAction: 'ZADZWOŃ: 500 600 700',
        industry: 'szamba',
        tier: 'premium',
        isPremium: true,
        city: 'Nieporęt',
        badge: 'Lokalny Lider',
        quote: '"Naszą wizytówką jest punktualność. Jeśli umawiamy się na 14:00, jesteśmy o 13:55. Bez brudu, bez smrodu, z pełną kulturą."',
        rating: 5.0,
        reviewsCount: 128,
        features: [
          'Błyskawiczny dojazd (do 2h od telefonu)',
          'Beczkowozy o pojemności 10m3 i 12m3',
          'Płatność kartą lub BLIKIEM u kierowcy',
          'Nowoczesna, bezwonna flota Mercedes-Benz'
        ],
        contact: {
          phone: '500 600 700',
          address: 'ul. Dębowa 15, 05-126 Nieporęt',
          website: 'www.szambex24-nieporet.pl'
        },
        badges: ['Gwarancja Czystości', 'Lokalny Lider', 'Wybór Mieszkańców 2024'],
        is_verified: true,
        createdAt: new Date()
    });
    console.log("Seeded successfully");
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
seed();
