import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[ą]/g, 'a')
    .replace(/[ć]/g, 'c')
    .replace(/[ę]/g, 'e')
    .replace(/[ł]/g, 'l')
    .replace(/[ń]/g, 'n')
    .replace(/[ó]/g, 'o')
    .replace(/[ś]/g, 's')
    .replace(/[źż]/g, 'z')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function migrate() {
  try {
    console.log("Rozpoczynanie migracji slugów...");
    const snapshot = await getDocs(collection(db, "aktualnosci"));
    console.log(`Znaleziono ${snapshot.size} artykułów.`);

    for (const d of snapshot.docs) {
      const data = d.data();
      if (!data.slug) {
        const slug = slugify(data.title || 'bez-tytulu');
        console.log(`Aktualizacja [${d.id}]: ${data.title} -> ${slug}`);
        await updateDoc(doc(db, "aktualnosci", d.id), { slug });
      } else {
        console.log(`Omijanie [${d.id}]: Artykuł posiada już slug (${data.slug})`);
      }
    }

    console.log("Migracja zakończona sukcesem!");
    process.exit(0);
  } catch (e) {
    console.error("Błąd podczas migracji:", e);
    process.exit(1);
  }
}

migrate();
