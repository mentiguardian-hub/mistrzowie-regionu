"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Definiujemy ścieżki, na których system ma NIE POKAZYWAĆ menu i stopki
  // .startsWith sprawdza czy adres zaczyna się od danej frazy
  const isHidden = pathname.startsWith('/admin') || pathname.startsWith('/zlecenie');

  return (
    <>
      {/* Jeśli NIE jest ukryte (!isHidden), pokaż Navbar */}
      {!isHidden && <Navbar />}
      
      {/* Tu wpada cała treść strony */}
      <main className={!isHidden ? "flex-grow" : ""}>
        {children}
      </main>

      {/* Jeśli NIE jest ukryte (!isHidden), pokaż Footer */}
      {!isHidden && <Footer />}
    </>
  );
}