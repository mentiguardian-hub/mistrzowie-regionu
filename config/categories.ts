import { 
  FaTruck, FaHardHat, FaHome, FaTint, FaBolt, FaPaintRoller, FaHammer, FaOilCan, FaCar,
  FaBuilding, FaSoap, FaLeaf, FaWrench, FaThLarge, FaSnowflake, FaDumpster, FaCut, FaCogs, 
  FaBroom, FaSpa, FaPizzaSlice, FaTools, FaCube, FaHeartbeat, FaTooth 
} from 'react-icons/fa';

export const categoriesConfigs = [
  // --- BRANŻE BUDOWLANE I REMONTOWE ---
  {
    id: 'beton',
    name: 'WYTWÓRNIA BETONU',
    link: '/lokalne/beton/nieporet',
    icon: FaCube,
    bgImage: '/img/beton-nieporet.webp',
    isFeatured: false,
    description: 'Certyfikowany beton towarowy, pompy o dużym zasięgu i profesjonalne doradztwo na placu budowy.',
    templates: {
      intros: ["Potrzebujesz certyfikowanego betonu w lokalizacji {city}?", "Szukasz betoniarni z szybką dostawą na terenie {city}?"],
      features: ["Beton każdej klasy z gwarancją jakości.", "Nowoczesne pompy o dużym zasięgu w {city}."]
    }
  },
  {
    id: 'sklad',
    name: 'SKŁAD BUDOWLANY',
    link: '/lokalne/sklad/nieporet',
    icon: FaBuilding,
    bgImage: '/img/hydraulik-nieporet.webp',
    isFeatured: false,
    description: 'Kompleksowe zaopatrzenie budowy. Stal, ceramika i narzędzia z dostawą HDS.',
    templates: {
      intros: ["Planujesz budowę w {city}? Sprawdź składy budowlane.", "Gdzie kupić materiały budowlane w {city}? Porównaj hurtownie."],
      features: ["Dostawy transportem HDS na budowę w {city}.", "Szeroki wybór stali i ceramiki dostępny od ręki."]
    }
  },
  {
    id: 'glazurnik',
    name: 'GLAZURNIK',
    link: '/lokalne/glazurnik/nieporet',
    icon: FaThLarge,
    isFeatured: false,
    description: 'Mistrzowskie układanie glazury, terakoty i spieków kwarcowych. Precyzja w każdym milimetrze.',
    templates: {
      intros: ["Szukasz glazurnika w {city} do spieków kwarcowych?", "Profesjonalne wykańczanie łazienek w miejscowości {city}."],
      features: ["Idealne docięcia pod kątem 45 stopni.", "Lokalni mistrzowie glazurnictwa w {city}."]
    }
  },
  {
    id: 'hydraulik', // VIP
    name: 'HYDRAULIK 24/7',
    link: '/hydraulika',
    icon: FaTint,
    bgImage: '/img/hydraulik-nieporet.webp',
    isFeatured: false,
    description: 'Awarie instalacji, przeprowadzanie rur, podłączenia sanitarne, naprawy wycieków.',
    templates: {
      intros: ["Pogotowie hydrauliczne w {city} - pomoc 24h.", "Najlepszy hydraulik w {city}."],
      features: ["Szybki dojazd do awarii.", "Gwarancja na wykonane usługi."]
    }
  },
  {
    id: 'stolarz',
    name: 'MEBLE NA WYMIAR',
    link: '/lokalne/stolarz/nieporet',
    icon: FaHammer,
    bgImage: '/img/Stolarz-mistrzowieregionu.webp',
    isFeatured: false,
    description: 'Kuchnie, szafy w zabudowie i meble łazienkowe. Rzemieślnicza jakość i materiały najwyższej klasy.',
    templates: {
      intros: ["Marzysz o kuchni na wymiar w miejscowości {city}?", "Szukasz rzemieślnika do solidnych mebli w {city}?"],
      features: ["Indywidualne projekty zabudowy meblowej.", "Stosujemy materiały premium i markowe okucia."]
    }
  },
  {
    id: 'kierownik-budowy',
    name: 'KIEROWNIK BUDOWY',
    link: '/lokalne/kierownik-budowy/nieporet',
    icon: FaHardHat,
    bgImage: '/img/kierownik-budowy-nieporet.webp',
    isFeatured: false,
    description: 'Nadzór inwestorski, prowadzenie dziennika budowy i rygorystyczne odbiory techniczne.',
    templates: {
      intros: ["Szukasz uprawnionego kierownika budowy w {city}?", "Bezpieczna budowa w {city} z profesjonalnym nadzorem."],
      features: ["Prowadzenie dziennika budowy i odbiory.", "Rzetelnie sprawdzamy ekipy budowlane."]
    }
  },
  {
    id: 'elektryka',
    name: 'USŁUGI ELEKTRYCZNE',
    link: '/lokalne/elektryka/nieporet',
    icon: FaBolt,
    isFeatured: false,
    description: 'Zakładanie nowych instalacji, pomiary, odbiory, podłączanie płyt indukcyjnych.',
    templates: {
      intros: ["Potrzebujesz elektryka z SEP w {city}?", "Awaria prądu lub nowa instalacja w {city}?"],
      features: ["Wykonujemy pomiary i montaż rozdzielni.", "Podłączamy płyty indukcyjne z wpisem do gwarancji."]
    }
  },
  {
    id: 'motoryzacyjny',
    name: 'SKLEP MOTORYZACYJNY',
    link: '/lokalne/motoryzacyjny/nieporet',
    icon: FaOilCan,
    bgImage: '/img/Motoryzacyjny-mistrzowieregionu.webp',
    isFeatured: true,
    description: 'Akumulatory, oleje, filtry i części eksploatacyjne dostępne od ręki.',
    templates: {
      intros: ["Szukasz części samochodowych w {city}?", "Nowy akumulator lub olej w {city}? Sprawdź sklep."],
      features: ["Profesjonalny dobór części po numerze VIN.", "Szeroki asortyment olejów i filtrów od ręki."]
    }
  },
  {
    id: 'wykonczenia',
    name: 'WYKOŃCZENIA WNĘTRZ',
    link: '/lokalne/wykonczenia/nieporet',
    icon: FaPaintRoller,
    isFeatured: true,
    description: 'Szpachlowanie, układanie glazury, zabudowa g-k, malowanie i prace pod klucz.',
    templates: {
      intros: ["Planujesz wykończenie domu w {city}?", "Szukasz ekipy do gładzi i malowania w {city}?"],
      features: ["Kompleksowe remonty i zabudowy g-k.", "Dotrzymujemy terminów i dbamy o czystość."]
    }
  },
  {
    id: 'dekarz',
    name: 'DACHY I DEKARSTWO',
    link: '/lokalne/dekarz/nieporet',
    icon: FaHome,
    isFeatured: false,
    description: 'Kompleksowe krycie dachów, więźby, blachodachówka i obróbki.',
    templates: {
      intros: ["Szukasz ekipy dekarzy w miejscowości {city}?", "Remont dachu lub wymiana rynien w {city}?"],
      features: ["Więźby dachowe i krycie dachówką.", "Profesjonalne obróbki kominów i okna dachowe."]
    }
  },
  {
    id: 'klimatyzacja',
    name: 'KLIMATYZACJA',
    link: '/lokalne/klimatyzacja/nieporet',
    icon: FaSnowflake,
    isFeatured: true,
    description: 'Montaż, serwis i sprzedaż klimatyzacji split i multi-split.',
    templates: {
      intros: ["Montaż klimatyzacji w Twoim domu w {city}?", "Serwis i odgrzybianie klimatyzacji w {city}."],
      features: ["Dobieramy moc urządzeń do pomieszczeń.", "Certyfikowany montaż i długa gwarancja."]
    }
  },
  {
    id: 'nauka-jazdy',
    name: 'NAUKA JAZDY',
    link: '/lokalne/nauka-jazdy/nieporet',
    icon: FaCar,
    bgImage: '/img/nauka-jazdy-nieporet-mistrzowieregionu.webp',
    isFeatured: true,
    description: 'Najlepsze ośrodki szkolenia kierowców i kursy prawa jazdy.',
    templates: {
      intros: ["Chcesz zrobić prawo jazdy w {city}?", "Najlepsi instruktorzy nauki jazdy w {city}."],
      features: ["Wysoka zdawalność kursantów.", "Jazdy doszkalające i bezstresowa nauka."]
    }
  },
  {
    id: 'budowa-domow',
    name: 'BUDOWA DOMÓW',
    link: '/lokalne/budowa-domow/nieporet',
    icon: FaHome,
    isFeatured: true,
    description: 'Budowa domów od fundamentów aż po dach. Generalne wykonawstwo.',
    templates: {
      intros: ["Planujesz budowę domu w {city}?", "Sprawdzone ekipy budowlane w rejonie {city}."],
      features: ["Budowa domów pod klucz.", "Sprzęt, materiały i nadzór kierownika budowy."]
    }
  },
  {
    id: 'brukarze',
    name: 'UKŁADANIE KOSTKI',
    link: '/lokalne/brukarze/nieporet',
    icon: FaHardHat,
    bgImage: '/img/brukarz-nieporet-ranking.webp',
    isFeatured: true,
    description: 'Profesjonalne układanie kostki brukowej, podjazdy i tarasy.',
    templates: {
      intros: ["Szukasz firmy brukarskiej w {city}?", "Nowy podjazd z kostki w miejscowości {city}."],
      features: ["Szybkie układanie i podbudowa.", "Pomoc w wyborze wzorów i bezpłatna wycena."]
    }
  },

  // --- BRANŻE DOM / OGRÓD / USŁUGI ---
  {
    id: 'szamba', // VIP
    name: 'WYWÓZ SZAMBA',
    link: '/szamba',
    icon: FaTruck,
    bgImage: '/img/wywoz-szamba-nieporet.webp',
    isFeatured: true,
    description: 'Profesjonalny transport nieczystości płynnych i asenizacja.',
    templates: {
      intros: ["Szybki wywóz szamba w {city}.", "Terminowa asenizacja dla {city}."],
      features: ["Nowoczesne beczkowozy.", "Konkurencyjne ceny w regionie."]
    }
  },
  {
    id: 'koszenie-trawy',
    name: 'KOSZENIE TRAWY',
    link: '/lokalne/koszenie-trawy/nieporet',
    icon: FaLeaf,
    isFeatured: true,
    description: 'Pielęgnacja trawników, koszenie nieużytków i usługi ogrodnicze.',
    templates: {
      intros: ["Szukasz kogoś do koszenia trawy w {city}?", "Zadbaj o ogród w {city} - koszenie trawników."],
      features: ["Obsługujemy ogrody i tereny komercyjne.", "Traktorki do dużych powierzchni."]
    }
  },
  {
    id: 'wywoz-gruzu',
    name: 'WYWÓZ GRUZU',
    link: '/lokalne/wywoz-gruzu/nieporet',
    icon: FaDumpster,
    isFeatured: true,
    description: 'Podstawianie kontenerów, wywóz gruzu i odpadów pobudowlanych.',
    templates: {
      intros: ["Potrzebujesz kontenera na gruz w {city}?", "Wywóz odpadów pobudowlanych w {city}."],
      features: ["Kontenery o pojemnościach 5m3 i 7m3.", "Legalna utylizacja i szybka realizacja."]
    }
  },
  {
    id: 'ogrody',
    name: 'OGRODY I PIELĘGNACJA',
    link: '/lokalne/ogrody/nieporet',
    icon: FaLeaf,
   bgImage: '/img/Mistrzowie-regionu-ogrody.webp',
    isFeatured: true,
    description: 'Profesjonalna pielęgnacja trawników, wertykulacja i porządki.',
    templates: {
      intros: ["Fachowiec od pielęgnacji ogrodu w {city}?", "Wertykulacja i porządki w ogrodzie w {city}."],
      features: ["Zakładanie trawników z rolki i siewu.", "Przycinamy żywopłoty i krzewy."]
    }
  },
  {
    id: 'serwis-kosiarek',
    name: 'Serwis Kosiarek',
    link: '/lokalne/serwis-kosiarek/nieporet',
    icon: FaTools,
    isFeatured: false,
    description: 'Profesjonalna naprawa kosiarek, traktorków i sprzętu ogrodniczego.',
    templates: {
      intros: ["Twoja kosiarka nie odpala? Serwis w {city}.", "Naprawa traktorków dla mieszkańców {city}."],
      features: ["Ostrzenie noży i wymiana olejów.", "Diagnostyka silników spalinowych."]
    }
  }, 
  {
    id: 'naprawa-pralek',
    name: 'NAPRAWA PRALEK',
    link: '/lokalne/naprawa-pralek/nieporet',
    icon: FaTools,
    isFeatured: true,
    description: 'Błyskawiczny serwis AGD. Naprawa pralek u klienta w domu.',
    templates: {
      intros: ["Awaria pralki w {city}? Wezwij technika.", "Serwis AGD obsługujący miejscowość {city}."],
      features: ["Wymiana łożysk, pomp i programatorów.", "Dojazd bezpośrednio do klienta."]
    }
  },
  {
    id: 'mechanika',
    name: 'MECHANIKA POJAZDOWA',
    link: '/lokalne/mechanika/nieporet',
    icon: FaWrench,
    bgImage: '/img/Mechanika-pojazdowa-Mistrzowieregionu.webp',
    isFeatured: true,
    description: 'Naprawy bieżące, diagnostyka silnika i serwis klimatyzacji.',
    templates: {
      intros: ["Szukasz mechanika w miejscowości {city}?", "Twój samochód wymaga naprawy w {city}?"],
      features: ["Naprawy zawieszenia i hamulców.", "Uczciwe wyceny i krótki czas naprawy."]
    }
  },
  {
    id: 'wulkanizacja',
    name: 'WULKANIZACJA',
    link: '/lokalne/wulkanizacja/nieporet',
    icon: FaCogs,
    isFeatured: true,
    description: 'Sezonowa wymiana opon, wyważanie kół i profesjonalny serwis.',
    templates: {
      intros: ["Czas na wymianę opon w {city}?", "Naprawa opony i wyważanie kół w {city}."],
      features: ["Obsługujemy auta osobowe i busy.", "Nowoczesne maszyny i hotel dla opon."]
    }
  },
  {
    id: 'przeprowadzki', // VIP
    name: 'PRZEPROWADZKI',
    link: '/przeprowadzki',
    icon: FaTruck,
    bgImage: '/img/przeprowadzki-nieporet.webp',
    isFeatured: true,
    description: 'Bezpieczny transport mienia. Przeprowadzki domów, biur i gabarytów.',
    templates: {
      intros: ["Bezpieczne przeprowadzki w {city}.", "Tani transport mebli w {city}."],
      features: ["Pakowanie mienia i transport.", "Doświadczone ekipy i ubezpieczenie."]
    }
  },
  {
    id: 'sprzatanie',
    name: 'PREMIUM SPRZĄTANIE',
    link: '/lokalne/sprzatanie/nieporet',
    icon: FaBroom,
    bgImage: '/img/Sprzatanie-mistrzowieregionu.webp',
    isFeatured: true,
    description: 'Luksusowe utrzymanie czystości Twojej posiadłości. Dyskrecja.',
    templates: {
      intros: ["Ekipa do sprzątania domu w {city}?", "Premium utrzymanie czystości w {city}."],
      features: ["Ekologiczne środki i dyskrecja.", "Sprzątanie poremontowe i cykliczne."]
    }
  },
  {
    id: 'pranie-tapicerki',
    name: 'PRANIE TAPICERKI',
    link: '/lokalne/pranie-tapicerki/nieporet',
    icon: FaSoap,
    isFeatured: true,
    description: 'Profesjonalne czyszczenie mebli i wnętrz samochodowych.',
    templates: {
      intros: ["Brudna kanapa? Pranie tapicerki w {city}.", "Czyszczenie wnętrz aut w {city}."],
      features: ["Głęboka ekstrakcja brudu (Karcher).", "Dojazd do klienta w całej gminie."]
    }
  },
  {
    id: 'kosmetyczka',
    name: 'SALONY URODY',
    link: '/lokalne/kosmetyczka/nieporet',
    icon: FaSpa,
    bgImage: '/img/Kosmetyczka-mistrzowieregionu.webp',
    isFeatured: false,
    description: 'Zabiegi na twarz, manicure i medycyna estetyczna.',
    templates: {
      intros: ["Salon kosmetyczny w {city}?", "Zabiegi kosmetyczne w miejscowości {city}."],
      features: ["Manicure hybrydowy i stylizacja brwi.", "Najwyższe standardy higieny."]
    }
  }, 
  {
    id: 'fryzjer',
    name: 'FRYZJER I STYL',
    link: '/lokalne/fryzjer/nieporet',
    icon: FaCut,
    bgImage: '/img/Mistrzowie-regionu-fryzjer.webp',
    isFeatured: false,
    description: 'Ekskluzywne strzyżenie i nowoczesna koloryzacja włosów.',
    templates: {
      intros: ["Modne strzyżenie w miejscowości {city}?", "Najlepszy fryzjer w {city}."],
      features: ["Stylizacja ślubna i farbowanie.", "Indywidualny dobór fryzury do twarzy."]
    }
  },
  {
    id: 'pizzeria',
    name: 'PIZZERIA I GASTRONOMIA',
    link: '/lokalne/pizzeria/nieporet',
    icon: FaPizzaSlice,
    bgImage: '/img/Pizzeria-mistrzowieregionu.webp',
    isFeatured: false,
    description: 'Najlepsza pizza w gminie i szybki dowóz pod Twoje drzwi.',
    templates: {
      intros: ["Najlepsza pizza w miejscowości {city}?", "Głodny? Zamów jedzenie w {city}."],
      features: ["Chrupiące ciasto i świeże składniki.", "Szybka dostawa pod Twoje drzwi."]
    }
  },
  {
    id: 'zlota-raczka',
    name: 'ZŁOTA RĄCZKA',
    link: '/lokalne/zlota-raczka/nieporet',
    icon: FaTools,
    isFeatured: true,
    description: 'Drobne naprawy domowe, montaż mebli i usuwanie awarii.',
    templates: {
      intros: ["Potrzebujesz 'Złotej Rączki' w {city}?", "Montaż mebli lub naprawa kranu w {city}."],
      features: ["Szybka pomoc przy usterkach.", "Uczciwe stawki i punktualność."]
    }
  },
  {
    id: 'stomatologia', // VIP
    name: 'STOMATOLOGIA',
    link: '/stomatologia',
    icon: FaTooth,
   bgImage: '/img/stomatologia-nieporet.webp',
    isFeatured: true,
    description: 'Profesjonalna opieka stomatologiczna i chirurgia szczękowa.',
    templates: {
      intros: ["Dentysta w {city} - zadbaj o uśmiech.", "Nowoczesny gabinet w {city}."],
      features: ["Leczenie kanałowe pod mikroskopem.", "Bezstresowe wizyty dla dzieci."]
    }
  },
  {
    id: 'weterynarz',
    name: 'WETERYNARZ',
    link: '/lokalne/weterynarz/nieporet',
    icon: FaHeartbeat,
    isFeatured: true,
    description: 'Kompleksowa opieka weterynaryjna i pomoc w nagłych wypadkach.',
    templates: {
      intros: ["Opieka weterynaryjna w {city}?", "Najlepsze kliniki dla zwierząt w {city}."],
      features: ["Szczepienia i diagnostyka RTG.", "Szybka pomoc w nagłych wypadkach."]
    }
  }
];