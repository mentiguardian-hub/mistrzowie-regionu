import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Harmonogram Wywozu Śmieci Maj 2026 | Nieporęt | Mistrzowie Regionu',
  description: 'Sprawdź aktualne daty odbioru odpadów w gminie Nieporęt na maj 2026. Harmonogram dla wszystkich rejonów: Beniaminów, Białobrzegi, Rynia, Stanisławów i inne.',
  alternates: {
    canonical: 'https://mistrzowieregionu.pl/nieporet/harmonogram-wywozu-smieci-maj-2026/',
  },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}