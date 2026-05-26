"use client";
import React from 'react';

// IMPORTY TWOICH KLOCKÓW

import HeroSection from '../components/home/HeroSection';
import TrashBanner from '../components/home/TrashBanner';
import BlogPreview from '../components/home/BlogPreview';
import NoticeBoard from '../components/home/NoticeBoard';

import CategoryGrid from '../components/home/CategoryGrid';
import VerificationProcess from '../components/home/VerificationProcess';
import RegionCenter from '../components/home/RegionCenter';
import PremiumCompanies from '../components/home/PremiumCompanies';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
  return (
    <div className="bg-[#0f172a] text-white font-montserrat min-h-screen overflow-x-hidden relative">
      
      {/* 1. GÓRA STRONY */}
     
      <HeroSection />

      {/* 🚀 KLUCZOWA ZMIANA: Wyciągamy baner tutaj, żeby mógł swobodnie nachodzić na Hero */}
      <TrashBanner />

      {/* 2. BIAŁA "PŁYWAJĄCA WYSPA" */}
      <div className="bg-[#f8fafc] text-[#1e293b] rounded-[4rem] relative z-20 -mt-10 pb-12 shadow-[0_40px_80px_rgba(0,0,0,0.3)]">
         
         <CategoryGrid />
         <NoticeBoard />
         <VerificationProcess />
         <RegionCenter />
      </div>

      {/* 3. SEKCJE DOLNE */}
      <div className="relative z-10 -mt-16 pt-16">
         <PremiumCompanies />
         <CallToAction />
      </div>
      
    </div>
  );
}