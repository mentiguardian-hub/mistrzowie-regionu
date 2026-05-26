"use client";
import React from 'react';
import { FaCrown, FaStar, FaPhoneAlt, FaMapMarkerAlt, FaGlobe, FaChevronRight, FaCheckCircle, FaShareAlt, FaTrophy, FaMedal } from 'react-icons/fa';

export default function CompanyCard({ company }: { company: any }) {
  if (!company) return null;

  const tier = (company?.tier || company?.package || 'silver').toLowerCase();

  const data = {
    name: company?.companyName || company?.name || "Firma",
    industry: company.industry || "Branża Budowlana",
    logo: company.logoUrl || company.logo || null,
    phone: company.phone || "Brak numeru",
    phoneRaw: company.phone ? company.phone.replace(/\s+/g, '') : "",
    description: company.description?.substring(0, 105) + (company.description?.length > 105 ? "..." : "") || "Partner Portalu Mistrzowie Regionu.",
    rating: company.rating || 5.0,
    address: company.address || "Gmina Nieporęt",
    website: company.website ? (company.website.startsWith('http') ? company.website : `https://${company.website}`) : null,
    // 🚀 NAPRAWA: Generujemy slug TYLKO z nazwy firmy, aby pasował do folderów w /rankingi/
    slug: (company?.companyName || company?.name || "firma")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, ''),
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.name,
          text: `Polecam firmę ${data.name}!`,
          url: window.location.href,
        });
      } catch (err) { console.log("Anulowano"); }
    }
  };

  if (tier === 'platinum') return <PlatinumUltra data={data} handleShare={handleShare} />;
  if (tier === 'gold') return <GoldProfessional data={data} />;
  return <BronzeMinimal data={data} />;
}

// --- 💎 1. PLATINUM ---
const PlatinumUltra = ({ data, handleShare }: { data: any, handleShare: any }) => (
  <div className="relative w-full max-w-5xl mx-auto rounded-[3.8rem] p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group overflow-hidden bg-[length:200%_200%] bg-gradient-to-br from-[#e5e7eb] via-[#ffffff] to-[#9ca3af] animate-shimmer italic font-montserrat">
    <div className="relative w-full h-full bg-[#030712]/98 backdrop-blur-3xl rounded-[3.2rem] p-8 md:p-12 z-30 flex flex-col items-center">
      
      <div className="mb-6 group-hover:scale-110 transition-transform duration-1000 relative z-40">
        <img src="/img/certyfikat-mistrzowie.webp" alt="Herb" className="w-16 h-16 object-contain brightness-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-40">
        <div className="bg-[#d4af37]/20 text-[#d4af37] px-5 py-2 rounded-full flex items-center gap-2 border border-[#d4af37]/40 shadow-lg">
          <FaTrophy className="text-xs" />
          <span className="text-[9px] font-black uppercase tracking-widest">Najlepsza Firma Regionu</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-white/5 pt-10 relative z-40">
        <div className="lg:col-span-3 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-[3rem] bg-white p-6 shadow-2xl flex items-center justify-center border-2 border-white/50 transition-all group-hover:scale-105">
              {data.logo ? <img src={data.logo} alt={data.name} className="max-w-full max-h-full object-contain" /> : <span className="text-7xl font-black italic text-[#030712]">{data.name.charAt(0)}</span>}
            </div>
            <div className="absolute -top-3 -right-3 bg-white text-[#030712] w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-[#030712]"><FaCrown className="text-2xl animate-pulse" /></div>
          </div>
          <div className="text-center">
            <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em] block mb-1">{data.industry}</span>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-none">{data.name}</h3>
          </div>
        </div>

        <div className="lg:col-span-5 lg:border-x border-white/5 px-4 lg:px-10 text-center lg:text-left">
          <p className="text-slate-200 text-base md:text-lg italic leading-relaxed font-semibold mb-6">"{data.description}"</p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
             <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
                <div className="flex gap-1 text-[#d4af37]">{[...Array(5)].map((_, i) => <FaStar key={i} className="text-[10px]" />)}</div>
                <span className="text-2xl font-black text-white">5.0</span>
             </div>
             <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 italic"><FaCheckCircle className="text-[12px]" /> Wybór Mieszkańców</span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-6">
          <a href={`tel:${data.phoneRaw}`} className="w-full bg-white text-[#030712] py-7 rounded-[2.2rem] font-black uppercase text-xl tracking-widest hover:scale-105 transition-all text-center flex items-center justify-center gap-4 shadow-xl active:scale-95">
            <FaPhoneAlt className="text-2xl" /> {data.phone}
          </a>
          
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-3 w-full">
              {data.website && (
                <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#d4af37] text-[#030712] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all text-center flex items-center justify-center gap-2">
                  WWW <FaGlobe />
                </a>
              )}
              <button onClick={handleShare} className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                SHARE <FaShareAlt />
              </button>
            </div>
            {/* 🚀 POPRAWKA: Prowadzi do /rankingi/[companyName] */}
            <a href={`/rankingi/${data.slug}`} className="w-full bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#030712] py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              ZOBACZ WIZYTÓWKĘ <FaChevronRight className="text-[12px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- 🥇 2. GOLD ---
const GoldProfessional = ({ data }: { data: any }) => (
  <div className="relative w-full max-w-5xl mx-auto rounded-[3rem] mt-8 p-[8px] shadow-2xl group overflow-hidden bg-[length:200%_200%] bg-gradient-to-br from-[#d4af37] via-[#f1d592] to-[#b8860b] animate-shimmer italic font-montserrat">
    <div className="relative w-full h-full bg-[#0f172a]/98 backdrop-blur-2xl rounded-[2.6rem] p-8 md:p-10 z-10 flex flex-col md:flex-row items-center gap-10 text-white">
      <div className="relative w-36 h-36 rounded-[2.2rem] bg-white p-6 shrink-0 border-4 border-[#d4af37]/50 shadow-xl">
        {data.logo ? <img src={data.logo} alt={data.name} className="max-w-full max-h-full object-contain" /> : <span className="text-6xl font-black text-[#0f172a]">{data.name.charAt(0)}</span>}
      </div>
      <div className="flex-grow text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-10">
        <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest block mb-1">{data.industry}</span>
        <h3 className="text-2xl font-black uppercase italic mb-3">{data.name}</h3>
        <p className="text-slate-300 text-base mb-6 leading-relaxed">"{data.description}"</p>
        
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a href={`tel:${data.phoneRaw}`} className="inline-flex bg-white text-[#0f172a] px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#d4af37] hover:text-white transition-all gap-4 shadow-lg border-b-4 border-slate-300">
            <FaPhoneAlt className="mt-0.5" /> {data.phone}
          </a>
          {/* 🚀 POPRAWKA: Prowadzi do /rankingi/[companyName] */}
          <a href={`/rankingi/${data.slug}`} className="inline-flex bg-transparent border-2 border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-[#d4af37] hover:text-white transition-all gap-2">
            WIZYTÓWKA <FaChevronRight className="mt-0.5" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

// --- 🥉 3. BRONZE ---
const BronzeMinimal = ({ data }: { data: any }) => (
  <div className="relative w-full max-w-5xl mx-auto rounded-[2.5rem] mt-8 p-[6px] shadow-lg group overflow-hidden bg-[length:200%_200%] bg-gradient-to-br from-[#854d0e] via-[#b45309] to-[#451a03] animate-shimmer italic font-montserrat">
    <div className="relative w-full h-full bg-white rounded-[2.2rem] p-6 md:p-8 z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-[1.8rem] bg-slate-50 border-2 border-slate-100 p-4 flex items-center justify-center shrink-0">
          <span className="text-slate-300 font-black text-3xl">{data.name.charAt(0)}</span>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-black text-[#0f172a] uppercase">{data.name}</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{data.industry} • {data.address}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <a href={`tel:${data.phoneRaw}`} className="bg-[#451a03] text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-[#b45309] transition-all flex items-center gap-4 shadow-lg border-b-4 border-[#2d1102]">
          <FaPhoneAlt /> {data.phone}
        </a>
        {/* 🚀 POPRAWKA: Prowadzi do /rankingi/[companyName] */}
        <a href={`/rankingi/${data.slug}`} className="bg-transparent border-2 border-[#451a03]/20 text-[#451a03] px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#451a03] hover:text-white transition-all flex items-center gap-2">
          WIĘCEJ <FaChevronRight />
        </a>
      </div>
    </div>
  </div>
);