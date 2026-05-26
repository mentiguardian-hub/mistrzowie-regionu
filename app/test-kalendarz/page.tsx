import React from 'react';
// Poprawiona ścieżka - wskazuje bezpośrednio na główny folder components
import SubskrybujKalendarzButton from '@/components/SubskrybujKalendarzButton'; 

export default function TestKalendarzPage() {
  const testowyRejon = "rejon1"; 

  return (
    <div className="p-8 max-w-md mx-auto bg-[#0f172a] min-h-screen text-white flex flex-col justify-center">
      <h1 className="text-xl font-bold mb-2 text-center text-emerald-400">
        Poligon Doświadczalny WebCal
      </h1>
      <p className="text-xs text-slate-400 text-center mb-8">
        Strona ukryta. Testowanie protokołu webcal:// dla klucza: {testowyRejon}
      </p>

      <SubskrybujKalendarzButton rejonKey={testowyRejon} />
    </div>
  );
}