import React from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import AnkietaClientView from './AnkietaClientView';

// 1. KONFIGURACJA EKSPORTU: Next.js musi wiedzieć, jakie ścieżki istnieją
export const dynamicParams = false;

export async function generateStaticParams() {
  // Definiujemy Twoje stałe kategorie z kodu
  const staticSlugs = ["szamba", "prad", "dodaj", "hydraulik", "malarz"];
  
  try {
    // Opcjonalnie: pobieramy też inne kategorie, które już są w bazie, 
    // aby ich strony też zostały wygenerowane
    const snapshot = await getDocs(collection(db, "ankiety_polecenia"));
    const dbSlugs = snapshot.docs.map(doc => doc.data().kategoria).filter(Boolean);
    
    // Łączymy i usuwamy duplikaty
    const allSlugs = Array.from(new Set([...staticSlugs, ...dbSlugs]));
    
    return allSlugs.map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error("Błąd generateStaticParams:", error);
    return staticSlugs.map(slug => ({ slug }));
  }
}

// 2. METADANE
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Poleć Fachowca: ${slug.toUpperCase()} | Mistrzowie Regionu`,
    description: `Znasz dobrego fachowca w kategorii ${slug}? Podziel się opinią z mieszkańcami gminy Nieporęt.`
  };
}

// 3. GŁÓWNY KOMPONENT (SERVER-SIDE WRAPPER)
export default async function DynamicAnkietaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <AnkietaClientView slug={slug} />
      
      {/* STOPKA ZGODNIE Z WYMAGANIEM */}
      <footer className="bg-[#0f172a] pb-12 text-center">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
        </p>
      </footer>
    </>
  );
}