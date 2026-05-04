import type { ContentState } from "@/types/content";

export const initialContent: ContentState = {
  products: [
    {
      id: "p1",
      slug: "silk-signature-robe",
      image: "/uploads/ikat/look-09.jpg",
      name: {
        uz: "Noir Chevron Robe",
        ru: "Халат Noir Chevron",
        en: "Noir Chevron Robe",
      },
      category: {
        uz: "Podium kapsulasi",
        ru: "Подиумная капсула",
        en: "Runway Capsule",
      },
      shortDescription: {
        uz: "Zigzag ikat ritmiga ega, podium uchun yaratilgan premium model.",
        ru: "Премиальная модель с графичным ритмом иката для подиумной подачи.",
        en: "A premium runway silhouette shaped by a striking ikat rhythm.",
      },
      description: {
        uz: "Uzun siluet, qora-oq kontrast va qo'lda ishlangan kayfiyat bu lookni IKAT podium kolleksiyasining asosiy qismiga aylantiradi.",
        ru: "Удлиненный силуэт, черно-белый контраст и ощущение ручной работы делают этот образ ключевой частью подиумной коллекции IKAT.",
        en: "Its elongated silhouette, black-and-white contrast, and handcrafted mood make this one of the defining looks of the IKAT runway story.",
      },
      price: "$420",
      tags: ["Runway", "Ikat", "Luxury"],
    },
    {
      id: "p2",
      slug: "monochrome-heritage-look",
      image: "/uploads/ikat/look-10.jpg",
      name: {
        uz: "Monochrome Heritage Look",
        ru: "Образ Monochrome Heritage",
        en: "Monochrome Heritage Look",
      },
      category: {
        uz: "Erkaklar kolleksiyasi",
        ru: "Мужская коллекция",
        en: "Men's Collection",
      },
      shortDescription: {
        uz: "Ikat naqshlari va tantanali kayfiyat birlashgan erkaklar looki.",
        ru: "Мужской образ, где мотивы иката соединяются с выразительным силуэтом.",
        en: "A ceremonial menswear look where ikat motifs meet a bold silhouette.",
      },
      description: {
        uz: "Qora, oq va yumshoq naqshlar uyg'unligi zamonaviy podium estetikasini o'zbek merosi bilan bog'laydi.",
        ru: "Сочетание черного, белого и мягкого тканого рисунка связывает современную подиумную эстетику с узбекским наследием.",
        en: "The interplay of black, ivory, and woven pattern links contemporary runway design with Uzbek heritage.",
      },
      price: "$310",
      tags: ["Menswear", "Heritage", "Runway"],
    },
    {
      id: "p3",
      slug: "velvet-travel-coat",
      image: "/uploads/ikat/look-04.jpg",
      name: {
        uz: "Velvet Travel Coat",
        ru: "Пальто Velvet Travel",
        en: "Velvet Travel Coat",
      },
      category: {
        uz: "Ustki kiyim",
        ru: "Верхняя одежда",
        en: "Outerwear",
      },
      shortDescription: {
        uz: "Yumshoq qora tekstura va milliy sumka aksenti bilan boyitilgan look.",
        ru: "Драматичный черный слой с акцентом в виде сумки, вдохновленной наследием.",
        en: "A dramatic black outer layer paired with a heritage-inspired carryall.",
      },
      description: {
        uz: "Street-luxury va podium uslubini birlashtiradigan ushbu palto IKAT brendining zamonaviy yo'nalishini ko'rsatadi.",
        ru: "Это пальто объединяет street-luxury и подиумную подачу, раскрывая современную сторону бренда IKAT.",
        en: "This coat blends street-luxury with runway presence, revealing the more contemporary edge of the IKAT brand.",
      },
      price: "$180",
      tags: ["Outerwear", "Modern", "Statement"],
    },
    {
      id: "p4",
      slug: "noir-embroidered-set",
      image: "/uploads/ikat/look-05.jpg",
      name: {
        uz: "Noir Embroidered Set",
        ru: "Комплект Noir Embroidered",
        en: "Noir Embroidered Set",
      },
      category: {
        uz: "Editorial look",
        ru: "Editorial-образ",
        en: "Editorial Look",
      },
      shortDescription: {
        uz: "Qora asos, oq kashta va yorqin atlas qatlamlari bilan yaratilgan editorial obraz.",
        ru: "Editorial-образ с черной базой, светлой вышивкой и выразительным шелковым слоем.",
        en: "An editorial composition of black tailoring, ivory embroidery, and a bold silk layer.",
      },
      description: {
        uz: "Bu look kontrast qatlamlar va qo'lda seziladigan kashta orqali premium editorial kayfiyat yaratadi.",
        ru: "Контрастные слои и тактильная вышивка создают в этом образе премиальное editorial-настроение.",
        en: "Its layered contrasts and tactile embroidery create a premium editorial statement.",
      },
      price: "$145",
      tags: ["Editorial", "Embroidery", "Luxury"],
    },
    {
      id: "p5",
      slug: "patchwork-statement-coat",
      image: "/uploads/ikat/look-08.jpg",
      name: {
        uz: "Patchwork Statement Coat",
        ru: "Пальто Patchwork Statement",
        en: "Patchwork Statement Coat",
      },
      category: {
        uz: "Runway nashri",
        ru: "Подиумная версия",
        en: "Runway Edition",
      },
      shortDescription: {
        uz: "Yirik patchwork kompozitsiyasi bilan boyitilgan premium outerwear.",
        ru: "Премиальная верхняя одежда с крупной patchwork-композицией.",
        en: "A premium outerwear piece defined by a dramatic patchwork composition.",
      },
      description: {
        uz: "Katta hajmli faktura va keskin naqsh bo'laklari ushbu paltoni podium markaziga olib chiqadi.",
        ru: "Объемная фактура и выразительные patchwork-блоки делают это пальто центральным подиумным изделием.",
        en: "Its oversized texture and sharp patchwork panels make this coat a centerpiece runway item.",
      },
      price: "$560",
      tags: ["Patchwork", "Runway", "Limited"],
    },
    {
      id: "p6",
      slug: "midnight-chevron-dress",
      image: "/uploads/ikat/look-02.jpg",
      name: {
        uz: "Midnight Chevron Dress",
        ru: "Платье Midnight Chevron",
        en: "Midnight Chevron Dress",
      },
      category: {
        uz: "Ayollar kolleksiyasi",
        ru: "Женская коллекция",
        en: "Women's Collection",
      },
      shortDescription: {
        uz: "Vertikal ritm va qora atlas belbog' bilan ta'kidlangan nafis libos.",
        ru: "Элегантное платье с вертикальным ритмом иката и черным атласным поясом.",
        en: "An elegant dress highlighted by a vertical ikat rhythm and black satin tie.",
      },
      description: {
        uz: "Podiumga mos tushishi, kuchli grafikasi va zamonaviy kesimi bilan bu model brendning ayollar liniyasini ifodalaydi.",
        ru: "Плавная посадка, сильная графика и современный крой формируют женскую линию бренда.",
        en: "Its fluid drape, strong graphic rhythm, and modern cut give shape to the women's line of the brand.",
      },
      price: "$195",
      tags: ["Womenswear", "Chevron", "Handmade"],
    },
  ],
  gallery: [
    {
      id: "g1",
      image: "/uploads/ikat/look-07.jpg",
      title: {
        uz: "Atelier yorug'ida ipak",
        ru: "Шелк в свете ателье",
        en: "Silk in Atelier Light",
      },
      location: {
        uz: "Samarqand",
        ru: "Самарканд",
        en: "Samarkand",
      },
      description: {
        uz: "Matoga jon kirayotgan sokin ishlab chiqarish lahzasi.",
        ru: "Тихий момент создания ткани в мастерской.",
        en: "A quiet moment from the textile-making ritual.",
      },
    },
    {
      id: "g2",
      image: "/uploads/ikat/look-01.jpg",
      title: {
        uz: "Ko'rgazma podiumi",
        ru: "Подиум выставки",
        en: "Exhibition Runway",
      },
      location: {
        uz: "Toshkent",
        ru: "Ташкент",
        en: "Tashkent",
      },
      description: {
        uz: "Ikat kolleksiyasining ommaga taqdimoti.",
        ru: "Публичная презентация коллекции иката.",
        en: "A public unveiling of the ikat collection.",
      },
    },
    {
      id: "g3",
      image: "/uploads/ikat/look-03.jpg",
      title: {
        uz: "Bo'yoq ritmi",
        ru: "Ритм красителей",
        en: "Rhythm of Dye",
      },
      location: {
        uz: "Atelier",
        ru: "Ателье",
        en: "Atelier",
      },
      description: {
        uz: "Rang va ip uyg'unlashadigan nozik bosqich.",
        ru: "Тонкий этап, где цвет встречается с нитью.",
        en: "A delicate stage where color meets thread.",
      },
    },
    {
      id: "g4",
      image: "/uploads/ikat/look-06.jpg",
      title: {
        uz: "Madaniy uchrashuv",
        ru: "Культурная встреча",
        en: "Cultural Gathering",
      },
      location: {
        uz: "Buxoro",
        ru: "Бухара",
        en: "Bukhara",
      },
      description: {
        uz: "Hunarmandchilik va moda muloqoti bir makonda.",
        ru: "Диалог ремесла и моды в одном культурном пространстве.",
        en: "Craft and fashion sharing one cultural stage.",
      },
    },
  ],
  news: [
    {
      id: "n1",
      slug: "ikat-exhibition-samarkand",
      cover: "/uploads/ikat/look-04.jpg",
      date: "2026-03-10",
      title: {
        uz: "Samarqanddagi yangi ko'rgazma",
        ru: "Новая выставка в Самарканде",
        en: "A New Exhibition in Samarkand",
      },
      excerpt: {
        uz: "IKAT mahalliy va xalqaro mehmonlar uchun yangi ko'rgazma makonini taqdim etdi.",
        ru: "IKAT представил новое выставочное пространство для местных и международных гостей.",
        en: "IKAT introduced a new exhibition setting for local and international visitors.",
      },
      body: {
        uz: "Ko'rgazmada tarixiy matolar, yangi kapsula mahsulotlar va jonli hunarmandchilik namoyishlari o'rin oldi.",
        ru: "На выставке были представлены архивные ткани, новые капсульные изделия и живые демонстрации ремесла.",
        en: "The exhibition featured archival textiles, new capsule pieces, and live craftsmanship demonstrations.",
      },
    },
    {
      id: "n2",
      slug: "spring-luxury-drop",
      cover: "/uploads/ikat/look-09.jpg",
      date: "2026-02-04",
      title: {
        uz: "Bahorgi luxury drop",
        ru: "Весенний luxury drop",
        en: "Spring Luxury Drop",
      },
      excerpt: {
        uz: "Yangi kolleksiya ranglarda yengillik va ipakda chuqurlikni birlashtirdi.",
        ru: "Новая коллекция объединила легкость цвета и глубину шелковой фактуры.",
        en: "The latest collection combines airy color stories with deep silk texture.",
      },
      body: {
        uz: "Cheklangan sonda chiqarilgan buyumlar moda va interyer liniyalarini bir estetik hikoyaga jamlaydi.",
        ru: "Лимитированные изделия объединяют линии моды и интерьера в единую эстетическую историю.",
        en: "Limited-edition pieces unite fashion and interior lines into one aesthetic narrative.",
      },
    },
    {
      id: "n3",
      slug: "artisan-open-studio",
      cover: "/uploads/ikat/look-02.jpg",
      date: "2026-01-18",
      title: {
        uz: "Open studio kuni",
        ru: "День open studio",
        en: "Open Studio Day",
      },
      excerpt: {
        uz: "Mehmonlar ikat ishlab chiqarishining real jarayonini yaqindan ko'rishdi.",
        ru: "Гости увидели реальный процесс создания иката вблизи.",
        en: "Guests experienced the real process of ikat making up close.",
      },
      body: {
        uz: "Ustalar bilan uchrashuvlar, rang tayyorlash bosqichlari va eksklyuziv namoyishlar kun dasturiga kiritildi.",
        ru: "В программу вошли встречи с мастерами, этапы подготовки красителей и эксклюзивные показы.",
        en: "The day included artisan talks, dye preparation stages, and exclusive showings.",
      },
    },
  ],
  collections: [
    {
      id: "c1",
      slug: "samarkand-runway-film",
      cover: "/uploads/ikat/look-01.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2026-03-20",
      title: {
        uz: "Samarqand runway filmi",
        ru: "Фильм с показа в Самарканде",
        en: "Samarkand Runway Film",
      },
      description: {
        uz: "Yangi kolleksiyaning sahna orti, podium harakati va ipak detallari video hikoya sifatida.",
        ru: "Закулисье новой коллекции, движение на подиуме и детали шелка в формате видеоистории.",
        en: "A video story with backstage moments, runway movement, and silk details from the new collection.",
      },
    },
    {
      id: "c2",
      slug: "atelier-process-video",
      cover: "/uploads/ikat/look-07.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      date: "2026-02-22",
      title: {
        uz: "Atelier jarayoni",
        ru: "Процесс в ателье",
        en: "Atelier Process",
      },
      description: {
        uz: "Ikat matosi yaratilishidagi rang, ip va qo'l mehnati bosqichlari.",
        ru: "Этапы цвета, нити и ручной работы в создании ткани ikat.",
        en: "Color, thread, and handcraft stages behind the ikat textile process.",
      },
    },
  ],
};
