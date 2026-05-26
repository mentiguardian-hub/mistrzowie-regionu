import fs from 'fs';
import path from 'path';

// Ścieżki do plików
const dataPath = path.join(process.cwd(), 'src', 'data', 'wasteData.json');
const outputDir = path.join(process.cwd(), 'public', 'kalendarze');

// Wczytanie danych (bezpieczna metoda dla każdej wersji Node.js)
const wasteData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.keys(wasteData).forEach((rejonKey) => {
  const rejonDane = wasteData[rejonKey];
  let ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MistrzowieRegionu//PL\r\nMETHOD:PUBLISH\r\n";
  // Skrócona nazwa kalendarza (ujednolicona)
  ics += `X-WR-CALNAME:Wywóz - ${rejonDane.name}\r\n`;
  ics += "X-WR-TIMEZONE:Europe/Warsaw\r\n";
  ics += "CALSCALE:GREGORIAN\r\n";

  // Lekko ujednoliciłem nazwy z poprzednim plikiem, aby system był spójny
  const mapowanie = {
    zmieszane: { t: 'ZMIESZANE 🚮', id: 'zmieszane' },
    metale: { t: 'METALE I TWORZYWA ♻️', id: 'metale' },
    papier: { t: 'PAPIER 📦', id: 'papier' },
    szklo: { t: 'SZKŁO 🍾', id: 'szklo' },
    bio: { t: 'BIOODPADY 🪵', id: 'bio' }
  };

  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  Object.keys(mapowanie).forEach(kat => {
    if (rejonDane[kat] && Array.isArray(rejonDane[kat])) {
      rejonDane[kat].forEach(d => {
        const s = d.replace(/-/g, "");
        const next = new Date(d);
        next.setDate(next.getDate() + 1);
        const e = next.toISOString().split('T')[0].replace(/-/g, "");

        ics += "BEGIN:VEVENT\r\n";
        ics += `UID:${s}-${kat}-${rejonKey}@mistrzowieregionu.pl\r\n`;
        ics += `DTSTAMP:${stamp}\r\n`;
        ics += `DTSTART;VALUE=DATE:${s}\r\n`;
        ics += `DTEND;VALUE=DATE:${e}\r\n`;
        
        // 🚀 1. CIĘŻARÓWKA PIERWSZA -> TREŚĆ -> REJON W NAWIASIE
        ics += `SUMMARY:🚚 ${mapowanie[kat].t} [${rejonDane.name}]\r\n`;
        
        // 🚀 2. TWARDA INSTRUKCJA I REJON W OPISIE
        ics += `DESCRIPTION:Wystaw pojemnik przed bramę! Rejon: ${rejonDane.name}\r\n`;
        
        ics += "BEGIN:VALARM\r\n";
        ics += "TRIGGER:-PT5H\r\n"; // Przypomnienie o 19:00 dzień wcześniej
        ics += "ACTION:DISPLAY\r\n";
        
        // 🚀 3. KRÓTKI ALARM DLA POWIADOMIEŃ
        ics += `DESCRIPTION:🚚 JUTRO wywóz: ${mapowanie[kat].t}\r\n`;
        
        ics += "END:VALARM\r\n";
        ics += "END:VEVENT\r\n";
      });
    }
  });

  ics += "END:VCALENDAR\r\n";
  fs.writeFileSync(path.join(outputDir, `${rejonKey}.ics`), ics, 'utf-8');
  console.log(`✅ Wygenerowano: ${rejonKey}.ics z ciężarówką i skróconym formatem`);
});