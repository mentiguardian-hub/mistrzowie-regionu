import React from 'react';
import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { unslugifyCategory, getAllCategorySlugs } from '@/lib/categories';
import OgloszeniaView from '../OgloszeniaView';

// ROZWIĄZANIE OSTRZEŻEŃ: Przenosimy themeColor do viewport
export const viewport: Viewport = {
  themeColor: '#ff7b00',
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ category: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryName = unslugifyCategory(category);
  if (!categoryName) return { title: "Kategoria nie znaleziona" };

  return {
    title: `${categoryName} Nieporęt - Lokalna Giełda Ogłoszeń`,
    description: `Sprawdź najnowsze ogłoszenia w sekcji ${categoryName} w Gminie Nieporęt.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = unslugifyCategory(category);
  
  if (!categoryName) notFound();

  let ads: any[] = [];
  try {
    const q = query(
      collection(db, 'classifieds'),
      where('category', '==', categoryName),
      where('status', '==', 'published') // Filtrujemy tylko aktywne
    );
    
    const snapshot = await getDocs(q);
    
    ads = snapshot.docs.map(doc => {
      const data = doc.data();
      
      // PANCERNE PRZETWARZANIE DATY (Zapobiega błędom toMillis)
      const convertDate = (val: any) => {
        if (!val) return Date.now();
        if (typeof val.toMillis === 'function') return val.toMillis();
        if (typeof val === 'number') return val;
        if (val.seconds) return val.seconds * 1000;
        return Date.now();
      };

      return {
        id: doc.id,
        ...data,
        createdAt: convertDate(data.createdAt),
        expiryDate: data.expiryDate ? convertDate(data.expiryDate) : null
      };
    });
    
    // Sortowanie chronologiczne na liczbach (zawsze działa)
    ads.sort((a, b) => b.createdAt - a.createdAt);
  } catch (err) {
    console.error("Błąd kategorii:", err);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
       {/* Przekazujemy bezpieczne dane do widoku */}
       <OgloszeniaView initialClassifieds={ads} />
       
       <footer className="mt-12 pb-8 text-center">
        <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
          projektant: kontakt@mistrzowieregionu.pl | tel. 601 728 604
        </p>
      </footer>
    </div>
  );
}