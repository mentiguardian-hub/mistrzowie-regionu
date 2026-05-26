import React from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import ArticleView from '../../../components/ArticleView';
import Link from 'next/link';

interface NewsPost {
  title: string;
  intro: string;
  content: string;
  author: string;
  date: any;
  slug: string;
}

export default async function DynamicArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug || slug === 'brak-artykulow') {
    return <NotFoundView />;
  }

  let post: NewsPost | null = null;

  try {
    // Szukanie artykułu po polu 'slug' zamiast bezpośrednio po ID dokumentu
    const q = query(collection(db, "aktualnosci"), where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const d = querySnapshot.docs[0];
      post = d.data() as NewsPost;
    }
  } catch (err) {
    console.error("Błąd pobierania artykułu po slugu na serwerze:", err);
  }

  if (!post) {
    return <NotFoundView />;
  }

  // Przekazujemy slug jako identyfikator do widoku (do linków społecznościowych)
  return <ArticleView post={post} id={slug} />;
}

function NotFoundView() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 font-montserrat">
      <h1 className="text-4xl font-black uppercase mb-6">Artykuł nie istnieje</h1>
      <Link href="/aktualnosci" className="bg-[#d4af37] text-[#0f172a] px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs">
        Wróć do Aktualności
      </Link>
    </div>
  );
}

// Funkcja generująca parametry dla eksportu statycznego (używa pola 'slug')
export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, "aktualnosci"));
    const paths = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return data.slug ? { slug: data.slug } : null;
      })
      .filter(p => p !== null);
    
    if (paths.length === 0) {
      return [{ slug: 'brak-artykulow' }];
    }

    return paths;
  } catch (err) {
    console.error("Błąd pobierania slugów w generateStaticParams:", err);
    return [{ slug: 'error' }];
  }
}
