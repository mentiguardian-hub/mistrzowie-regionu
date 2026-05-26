import React from 'react';
import { ScheduleTemplate } from '@/components/ScheduleTemplate';

const nieporetSectors = [
  { 
    id: 1, name: "Rejon I", 
    places: "BENIAMINÓW, BIAŁOBRZEGI, RYNIA, NIEPORĘT: Kapitana Stefana Pogonowskiego, Pilawa, Wieczornej Bryzy, Wojska Polskiego", 
    zmieszane: "3, 17", bio: "2, 16, 30", tworzywa: "22", papier: "27", szklo: "23" 
  },
  { 
    id: 2, name: "Rejon II", 
    places: "STANISŁAWÓW PIERWSZY: Allegro, Barokowa, Borówkowa, Brukowa, Brzozy, Cyprysowa, Drozdowa, Geodetów, Harmonii, Iglasta, Jagodowa, Jana Kazimierza, Jarzębiny, Jasna, Jodłowa, Kalinowa, Koncertowa, Konwaliowa, Leśny Zakątek, Lisia, Operowa, Paproci, Pięciolinii, Pogodna, Promykowa, Rajska, Regatowa, Słoneczna, Smyczkowa, Sokoła, Sonaty, Spełnionych Marzeń, Stolnika, Strużańska, Swingowa, Świerkowa, Tęczowa, Warsztatowa, Wesoła, Wiolinowa, Wojskiego, Wolfganga A. Mozarta, Zajazdowa, Złotych Piasków", 
    zmieszane: "3, 20", bio: "8, 22", tworzywa: "2, 30", papier: "21", szklo: "4" 
  },
  { 
    id: 3, name: "Rejon III", 
    places: "NIEPORĘT: Adama Mickiewicza, Asesora, Babinicza, Butryma, Chabrowa, Chłodna, Dworcowa, Dzikiej Róży, Epopei, Gerwazego, Irysowa, Jacka Soplicy, Jana III, Jana Kazimierza, Lazurowa, Myśliwska, Ogrodowa, Pana Tadeusza, Pionierska, Plac Wolności, Podkomorzego, Podleśna, Protazego, Rejenta, Rejtana, Różana, Sasankowa, Soplicowo, Szafirowa, Szkolna, Szlachecka, Telimeny, Tulipanowa, Zamkowa", 
    zmieszane: "7, 21", bio: "1, 15, 29", tworzywa: "20", papier: "22", szklo: "23" 
  },
  { 
    id: 4, name: "Rejon IV", 
    places: "NIEPORĘT: Agawy, Aleja Henryka Sienkiewicza, Baśki, Cyklistów, Czajki, Czarnieckiego, Heleny, Hubala, Husarii, Inwokacji, Izabelińska, Jana Kochanowskiego, Jaremy, Jaskółki, Kapitana Benedykta Pęczkowskiego, Ketlinga, Kmicica, Kordeckiego, Kresowa, Lawendowa, Literacka, Małołęcka, Marsa, Michała, Motylkowa, Nastrojowa, Niezapominajki, Nowolipie, Odrodzenia, Oleńki, Polna, Polnych Kwiatów, Potocka, Powstańców, Przyjaciół, Ptasia, Rocha, Rynek, Sielankowa, Skrzetuskiego, Starej Gruszy, Świętej Agaty, Świętego Huberta, Turkusowa, Wazów, Zagłoby, Zosi, Zwycięstwa, Żeglarska, Żurawia", 
    zmieszane: "8, 22", bio: "7, 21", tworzywa: "28", papier: "13", szklo: "10" 
  },
  { 
    id: 5, name: "Rejon V", 
    places: "WÓLKA RADZYMIŃSKA, ZEGRZE POŁUDNIOWE, NIEPORĘT: Białego Bzu, Brzozowa, Fiołkowa, Kwitnącej Wiśni, Maciejki, Pszeniczna, Rumiankowa, Spokojna, Stokrotki, Zegrzyńska", 
    zmieszane: "9, 23", bio: "1, 15, 29", tworzywa: "2, 30", papier: "25", szklo: "17" 
  },
  { 
    id: 6, name: "Rejon VI", 
    places: "ALEKSANDRÓW, IZABELIN, STANISŁAWÓW PIERWSZY: Baletowa, Błękitna, Graniczna, Izabelińska, Klonowa, Krzywa, Księżycowa, Małołęcka, Perłowa, Przyszłość, Rondo im. Jerzego Boskiego, Rodzinna, Rubinowa, Sielska, Szmaragdowa, Świetlana, Wierzbowa", 
    zmieszane: "10, 24", bio: "9, 23", tworzywa: "3", papier: "7", szklo: "28" 
  },
  { 
    id: 7, name: "Rejon VII", 
    places: "STANISŁAWÓW DRUGI, WOLA ALEKSANDRA: wszystkie ulice i rejony sołectw", 
    zmieszane: "13, 27", bio: "7, 20", tworzywa: "8", papier: "25", szklo: "14" 
  },
  { 
    id: 8, name: "Rejon VIII", 
    places: "KĄTY WĘGIERSKIE, JÓZEFÓW: Leśna Polana, Polnych Maków, Poziomkowa, Strużańska (od nr 2A do ul. Kościelnej), Wyścigowa", 
    zmieszane: "14, 28", bio: "13, 27", tworzywa: "21", papier: "3", szklo: "22" 
  },
  { 
    id: 9, name: "Rejon IX", 
    places: "JÓZEFÓW: Ateny, Borki, Dębowa, Diamentowa, Dzika, Główna, Gwiaździsta, H. Sienkiewicza, Krótka, Leszczynowa, Leśna, Leśne Osiedle, Migdałowa, Miodowa, Niecała, Objazdowa, Olimpijska, Orzechowa, Piaskowa, Piastowska, Polna, Polnej Róży, Rodziny Kalińskich, Równa, Runa Leśnego, Sezamkowa, Sienna, Słonecznego Poranka, Szczęśliwa, Szkolna, Wiosenna, Wspólna, Zacisze, Zielona, Zielone Wzgórze, Złota, Żytnia", 
    zmieszane: "1, 15, 29", bio: "9, 24", tworzywa: "14", papier: "16", szklo: "10" 
  },
  { 
    id: 10, name: "Rejon X", 
    places: "MICHAŁÓW GRABINA, REMBELSZCZYZNA: wszystkie ulice i rejony sołectw", 
    zmieszane: "2, 16, 30", bio: "13, 27", tworzywa: "3", papier: "20", szklo: "15" 
  }
];

export default function HarmonogramKwiecien() {
  return <ScheduleTemplate month="Kwiecień" year="2026" sectors={nieporetSectors} />;
}