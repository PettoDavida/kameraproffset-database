export interface Product {
  id: number;
  title: string;
  longinfo: string;
  info1: string;
  info2: string;
  info3: string;
  price: number;
  quantity: number;
  image: string;
  image2: string;
  image3: string;
  specs: Array<Spec>;
}

export interface Spec {
  spectitle: string;
  spec: string;
  id: number;
}

export const mockedProducts: Product[] = [
  {
    id: 1,
    title: "Sony A7 III kamerahus",
    longinfo:
      "Sony A7 III är försedd med en nyutvecklad, bakbelyst Exmor R CMOS-sensor i fullformat och den har ärvt många funktioner och finesser från modellerna A7R III och A9 såsom bättre batteritid och joystick för att kontrollera autofokusen.",
    info1: "Avancerad AF med följande ögonautofokus",
    info2: "10 bilder per sekund med aktiv autofokus",
    info3: "Dubbla minneskortsplatser för extra säkerhetskopiering",
    price: 19990,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1038723.jpg?ref=9A7E5CB4A2&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1038723_1.jpg?ref=1145D98FC7&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1038723_2.jpg?ref=36400AFD1E&w=1920&h=1920&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "24.2 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "Fullformat (24x36)",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Sony E",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS Bakgrundsbelyst",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "650 g",
        id: 5,
      },
    ],
  },
  {
    id: 2,
    title: "Leica M-10R svart",
    longinfo:
      "Leica M10-R är den senaste versionen i M10-familjen. En klassisk kamera i avskalad design som fokuserar på det viktigaste, riktigt bra foto. Trots sin lilla storlek har Leica M10-R en upplösning på över 40 megapixlar och fångar alla detaljer du kan tänka dig. Sensorn hos M10-R levererar även ett lägre brus än de tidigare modellerna i M10-serien.",
    info1: "40 megapixel mätsökarsensor",
    info2: "Tyst slutare som passar perfekt vid street-photo",
    info3: "3” touchskärm med Gorilla-glas",
    price: 89900,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1049125.jpg?ref=9BD8741CE2&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1049125_3.jpg?ref=131E56B2CE&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1049125_1.jpg?ref=821387DCD1&w=3840&h=3840&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "40 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "Fullformat (24x36)",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Leica M",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "660 g",
        id: 5,
      },
    ],
  },

  {
    id: 3,
    title: "Canon EOS R6",
    longinfo:
      "Oavsett vad du fotograferar så kommer Canon EOS R6 bli din nya bästa vän. Med en otrolig snabbhet, superb ljuskänslighet och en bildstabilisering som går upp till 8-steg så kommer du aldrig att missa ett ögonblick. Detta är kameran för dig som är redo att ta nästa steg inom fotografering. Detta är Canon EOS R6.",
    info1: "20,1 MP för högkvalitativa bilder och effektiv lagring",
    info2: "Upp till 8 stegs bildstabilisering med RF-optik",
    info3: "Upp till 20 bilder per sekund i seriebildstagning",
    price: 27490,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1048664_1.jpg?ref=3E5370D1CD&w=960&h=960&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1048664_12.jpg?ref=1A2B604F61&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1048664_13.jpg?ref=6BF35CDA79&w=3840&h=3840&mode=max",

    specs: [
      {
        spectitle: "Upplösning",
        spec: "20.1 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "Fullformat (24x36)",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Canon RF",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "598 g",
        id: 5,
      },
    ],
  },
  {
    id: 4,
    title: "Sony ZV-E10L + 16-50mm f/3,5-5,6",
    longinfo:
      "Kompakt vloggkamera med kreativitet i fokus. Sony ZV-E10 är kameran för dig som vill ha en smidig spegellös systemkamera med utbytbart objektiv, som är designad för vlogg, streaming och innehållskapande. Du kan enkelt skapa videor i 4K-upplösning, filma slowmotion i Full HD och använda smarta funktioner som Tally Light vid sändning, autoexponering av ansiktet och bokeh-läge för en mjuk oskarp bakgrund. Dessutom har kameran vinklingsbar pekskärm och en högkvalitativ inbyggd riktad mikrofon med medföljande vindskydd. Sony ZV-E10 är helt enkelt vloggkameran för dig som snabbt och smart vill skapa innehåll med professionellt resultat.",
    info1: "24,3MP APS-C-sensor",
    info2: "Filma i 4K (30p) och slowmotion i Full HD (120P)",
    info3: "Vinklingsbar pekskärm med touch focus",
    price: 9490,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650.jpg?ref=4F54BD9EA6&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650_right.jpg?ref=756435196C&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1052379_zv-e10-selp1650_top.jpg?ref=FF078259D7&w=1920&h=1920&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "24.2 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "APS-C",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Sony E",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "299 g",
        id: 5,
      },
    ],
  },
  {
    id: 5,
    title: "Panasonic Lumix DC-G9 kamerahus",
    longinfo:
      "DC-G9 är en Micro 4/3-kamera med fokus på stillbild. Egenskaper som bland annat en toppdisplay, vädertätning, dubbla kortplatser och hög hastighet på seriebildtagningen gör G9 till en snabb och mångsidig kamera redo för äventyr!",
    info1: "Väldigt hög seriebildtagning utan blackout.",
    info2: "80 mp RAW-bilder högupplöst läge.",
    info3: "Toppdisplay, bra ergonomi och vädertätning.",
    price: 11990,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1036886.jpg?ref=748AED7B91&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1036886_3.jpg?ref=8F1C2DC18B&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1036886_2.jpg?ref=45097BE295&w=3840&h=3840&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "20.3 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "Micro 4/3",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Micro 4/3",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "Live MOS",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "658 g",
        id: 5,
      },
    ],
  },
  {
    id: 6,
    title: "OM SYSTEM OM-1",
    longinfo:
      "OM SYSTEM OM-1 - En flaggskeppskamera som når helt nya nivåer gentemot föregångarna. Med dess nya processor, TruePicX, är den 3x snabbare jämfört med Olympus OM-D E-M1X och med 60x starkare datorkraft. Men det slutar inte där utan OM SYSTEM OM-1 är fullmatad med förbättringar gentemot föregångaren så som en ny BSI live mos-sensor, förbättrad bildstabilisering och Cross Quad Pixel AF för 3x snabbare autofokusberäkning. OM SYSTEM OM-1 kan tas med var som helst när som helst, så att vem som helst kan dra nytta av dess höga prestanda för att fånga mångsidiga bilduttryck med hög bildkvalitet. Detta är nästa generations Micro Four Thirds-kamera från OM SYSTEM.",
    info1: "Stackad 20mp Micro 4/3 BSI Live MOS Sensor.",
    info2: "TruePicX processor - 3x snabbare än hos föregångaren.",
    info3:
      "Vädertätad med IP53-klassning – För att klara de tuffaste väderförhållandena.",
    price: 22490,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1054659.jpg?ref=550E52B9B6&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1054659_1.jpg?ref=A4E6F0B8D4&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1054659_2.jpg?ref=5F0C4D9C3E&w=1920&h=1920&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "20.4 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "Micro 4/3",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Micro 4/3",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "Live MOS",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "511 g",
        id: 5,
      },
    ],
  },
  {
    id: 7,
    title: "Canon EOS R5",
    longinfo:
      "Med en 45mp-sensor, 20 bilder per sekund och en intern 8K RAW filminspelning är denna kamera början på nästa generation av professionella kameror. Framtiden är här för spegellös teknologi och den stavas Canon EOS R5.",
    info1: "Högupplöst 45mp-sensor för otroligt skarpa bilder",
    info2: "Filma internt i 8K RAW med 30fps för superb videokvalitet",
    info3:
      "5-axlig bildstabilisering och upp till 8 stegs bildstabilisering med Canon RF-optik för långa slutartider handhållet",
    price: 49990,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1047603.jpg?ref=348324CCD8&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1047603_4.jpg?ref=88DB3CCEC9&w=960&h=960&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1047603_2.jpg?ref=0B65D6ADE3&w=960&h=960&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "45 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "Fullformat (24x36)",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Canon RF",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "650 g",
        id: 5,
      },
    ],
  },
  {
    id: 8,
    title: "Fujifilm X-T30 II silver + XC 15-45mm f/3,5-5,6 OIS PZ",
    longinfo:
      "Fujifilm X-T30 II är en uppdaterad version av X-T30 och har bland annat en snabbare och bättre autofokus, nya filmsimuleringar och kan nu spela in slowmotion-video i hela FHD/240p. Fujifilm X-T30 II levererar stillbilder med samma upplösning, färgåtergivning och låga brus som kritikerrosade Fujifilm X-T3. Kameran har även 4K-video som fungerar ihop med Fujis filmsimuleringar.",
    info1:
      "Bakbelyst 26.1 megapixel APS-C X-Trans CMOS 4 sensor utan optiskt lågpassfilter",
    info2: "Högupplöst skärm på 1,62 miljoner punkter",
    info3: "Autofokusen är snabb och exakt - samma som hos X-T4",
    price: 10990,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1053463_2.jpg?ref=9074AEE7BD&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1053463_4.jpg?ref=CDD16AF565&w=1920&h=1920&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1053463_5.jpg?ref=C69C135ED7&w=1920&h=1920&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "26.1 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "APS-C",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Fuji X",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS X-trans",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "383 g",
        id: 5,
      },
    ],
  },
  {
    id: 9,
    title: "Fujifilm X-T3 Body black",
    longinfo:
      "X-T3 är en snabb kamera med riktigt hög seriebildtagning, bra autofokus och 4K video. De lättåtkomliga reglagen och dubbla kortplatserna gör kameran till smidig kamera för viktiga jobb.",
    info1: "Bakbelyst 26mp X-Trans bildsensor",
    info2:
      "Hög seriebildtagning och pre-shot. Upp till 30 fps med elektronisk slutare",
    info3: "Ögon-AF tillsammans med AF-C gör det lätt att fotografera porträtt",
    price: 11990,
    quantity: 1,
    image:
      "https://www.scandinavianphoto.se/globalassets/1053456.jpg?ref=6C795A6B04&w=1920&h=1920&mode=max",
    image2:
      "https://www.scandinavianphoto.se/globalassets/1053456_1.jpg?ref=160BDE0533&w=960&h=960&mode=max",
    image3:
      "https://www.scandinavianphoto.se/globalassets/1053456_3.jpg?ref=92FA1DBF61&w=960&h=960&mode=max",
    specs: [
      {
        spectitle: "Upplösning",
        spec: "26 Megapixel",
        id: 1,
      },
      {
        spectitle: "Bildsensorstorlek",
        spec: "APS-C",
        id: 2,
      },
      {
        spectitle: "Objektivfattning",
        spec: "Fuji X",
        id: 3,
      },
      {
        spectitle: "Sensortyp",
        spec: "CMOS X-Trans Bakbelyst",
        id: 4,
      },
      {
        spectitle: "Vikt",
        spec: "536 g",
        id: 5,
      },
    ],
  },
];

export interface Delivery {
  id: number;
  title: string;
  price: number;
  info: string;
  image: string;
}

export interface ShipperSelection {
  shipper: Delivery;
  checked: boolean;
}

export const mockedShipping: Delivery[] = [
  {
    id: 20,
    title: "Postnord",
    price: 49,
    info: "Leveranstid: 1-3 Dagar",
    image:
      "https://www.cigge.se/dokument/bibliotek/Image/Cigge%20Media%20blogg/postnord-stor-logo-blogg.jpg",
  },
  {
    id: 21,
    title: "Schenker",
    price: 0,
    info: "Leveranstid: 4-7 Dagar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Logo_DB_Schenker.svg/2560px-Logo_DB_Schenker.svg.png",
  },
  {
    id: 22,
    title: "Dhl",
    price: 55,
    info: "Leveranstid: 2-4 Dagar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/2560px-DHL_Logo.svg.png",
  },
  {
    id: 23,
    title: "UPS",
    price: 149,
    info: "Hemleverans: 1-2 dagar",
    image:
      "https://cutewallpaper.org/24/ups-logo-png/ups-logo-logos-de-marcas.png",
  },
];

export interface payment {
  id: number;
  title: string;
  price: number;
  info: string;
  alt: string;
}

export interface PaySelection {
  paymethod: payment;
  paychecked: boolean;
}

export const mockedPay: payment[] = [
  {
    id: 30,
    title: "Kortbetalning",
    price: 0,
    info: "Direktbetalning med kort",
    alt: "(Visa, Mastercard...)",
  },
  {
    id: 31,
    title: "Swish",
    price: 0,
    info: "Direktbetalning med Swish",
    alt: "",
  },
  {
    id: 32,
    title: "Faktura",
    price: 49,
    info: "Faktura",
    alt: "Betala inom 14 dagar",
  },
];

export interface PersonalData {
  email: string;
  name: string;
  phone: string;
  postnr: string;
  street: string;
}
