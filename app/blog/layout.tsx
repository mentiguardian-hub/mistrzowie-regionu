// Nowy plik: app/blog/layout.tsx
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/blog/',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}