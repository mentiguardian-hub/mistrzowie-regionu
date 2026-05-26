"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaThLarge, FaCrown, FaUsers, FaPenNib, 
  FaBullhorn, FaArrowLeft, FaTag // <-- DODANA IKONA FaTag
} from 'react-icons/fa';
import AdminGuard from '../../components/AdminGuard'; // Upewnij się, że ścieżka jest poprawna

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 flex font-montserrat">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-50 shadow-sm">
          
          <div className="p-8 border-b border-slate-100 mb-6">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">MISTRZOWIE</span>
              <span className="text-[10px] font-bold text-[#d4af37] tracking-[0.3em] uppercase">Panel Zarządzania</span>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Główne</p>
            <SidebarLink href="/admin" active={isActive('/admin')} icon={<FaThLarge />} label="Dashboard" />
            <SidebarLink href="/admin/fachowcy" active={isActive('/admin/fachowcy')} icon={<FaCrown />} label="Baza Fachowców" />
            
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-8 mb-4">Moderacja</p>
            <SidebarLink href="/admin/tablica" active={isActive('/admin/tablica')} icon={<FaUsers />} label="Tablica Postów" />
            
            {/* --- NOWE DRZWI DO OGŁOSZEŃ --- */}
            <SidebarLink href="/admin/ogloszenia" active={isActive('/admin/ogloszenia')} icon={<FaTag />} label="Ogłoszenia" />
            
            <SidebarLink href="/admin/blog" active={isActive('/admin/blog')} icon={<FaPenNib />} label="Artykuły Blog" />
            <SidebarLink href="/admin/news" active={isActive('/admin/news')} icon={<FaBullhorn />} label="Aktualności" />
          </nav>

          <div className="p-6 border-t border-slate-100 space-y-2">
            <Link href="/" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-500 font-bold text-xs uppercase hover:bg-slate-50 transition-all">
              <FaArrowLeft /> Powrót do portalu
            </Link>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 ml-72 p-12 min-h-screen overflow-x-hidden">
          <div className="w-full">
            {children}
          </div>
        </main>

      </div>
    </AdminGuard>
  );
}

function SidebarLink({ href, active, icon, label }: any) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-[13px] uppercase tracking-wide ${
        active 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={`text-lg ${active ? 'text-[#d4af37]' : 'text-slate-400'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}