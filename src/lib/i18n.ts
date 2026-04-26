import type { Locale } from "@/types/content";

export const locales: Locale[] = ["uz", "ru", "en", "tg"];

export const localeLabels: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
  tg: "TJ",
};

export const dictionaries = {
  uz: {
    meta: {
      title: "IKAT",
      description:
        "O'zbekistonning haqiqiy ikat merosi, qo'lda yaratilgan ipak va zamonaviy hashamat uyg'unligi.",
    },
    brandLine: "Meros va hashamat uyg'unligi",
    nav: {
      home: "Bosh sahifa",
      about: "IKAT haqida",
      catalog: "Katalog",
      gallery: "Galereya",
      news: "Yangiliklar",
      contact: "Aloqa",
      admin: "Admin",
    },
    cta: {
      viewCollection: "Kolleksiyani ko'rish",
      contactOrder: "WhatsApp yoki Telegram orqali buyurtma",
      discoverStory: "Hikoyani o'qish",
      exploreGallery: "Galereyani ko'rish",
      readNews: "Yangiliklarni o'qish",
      contactUs: "Bog'lanish",
    },
    ui: {
      menu: "Menyu",
      close: "Yopish",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      instagram: "Instagram",
      location: "Lokatsiya",
    },
    hero: {
      eyebrow: "Samarqanddan dunyoga",
      title: "Authentic IKAT from Uzbekistan",
      description:
        "Qo'lda to'qilgan ipak, boy ranglar va asrlar davomida saqlangan hunarmandchilik an'anasi zamonaviy uslub bilan uchrashadi.",
    },
    home: {
      aboutTitle: "IKAT nima?",
      aboutText:
        "IKAT bu bo'yoq va to'quv jarayonida naqsh yaratiladigan noyob mato san'ati. Har bir parcha ustalarning sabri, sezgisi va madaniy xotirasini olib yuradi.",
      featuredTitle: "Tanlangan mahsulotlar",
      galleryTitle: "Galereya old ko'rinishi",
      newsTitle: "So'nggi yangiliklar",
      statsTitle: "Har bir detalda qadriyat",
      stats: [
        { value: "100%", label: "Qo'lda ishlangan kolleksiya" },
        { value: "4", label: "Sayt tili" },
        { value: "∞", label: "Madaniy ilhom" },
      ],
    },
    about: {
      title: "IKAT hikoyasi",
      intro:
        "Ikat nafaqat mato, balki xotira, mehnat va avloddan avlodga o'tgan estetik qarashdir.",
      paragraphs: [
        "Har bir ipak ipi oldindan bo'yaladi, keyin esa naqshlar nozik hisob-kitob bilan uyg'unlashtiriladi. Shu sababli ikatdagi yumshoq o'tishlar tirik san'at kabi ko'rinadi.",
        "Samarqand va butun O'zbekiston hududida ikat to'quvchilari ranglar orqali tarix, tabiat va oilaviy qadriyatlarni ifoda etib kelgan.",
        "IKAT brendi bu merosni zamonaviy kolleksiya, interyer va eksklyuziv buyumlar orqali yangi auditoriyaga taqdim etadi.",
      ],
      values: [
        "Haqiqiy qo'l mehnati",
        "Madaniy qadriyat va kelib chiqish",
        "Zamonaviy premium estetikasi",
      ],
    },
    catalog: {
      title: "Asosiy katalog",
      subtitle:
        "Premium kolleksiyalar, dekor matolari va eksklyuziv buyumlar bir sahifada.",
      filterLabel: "Asosiy mahsulotlar",
      priceLabel: "Narx",
    },
    gallery: {
      title: "Ko'rgazmalar va jarayonlar",
      subtitle:
        "Madaniy tadbirlar, atelier lahzalari va ikat yaratilishining nafis bosqichlari.",
    },
    news: {
      title: "Yangiliklar va maqolalar",
      subtitle:
        "Ko'rgazmalar, yangi kolleksiyalar va brend yangilanishlarini shu yerda kuzating.",
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle:
        "Hamkorlik, buyurtma yoki kolleksiya bo'yicha savollaringiz uchun murojaat qiling.",
      form: {
        name: "Ismingiz",
        phone: "Telefon",
        message: "Xabar",
        submit: "Yuborish",
      },
    },
    admin: {
      title: "Admin panel",
      subtitle:
        "Mahsulotlar, galereya va yangiliklarni demo rejimida boshqarish uchun tezkor panel.",
      products: "Mahsulot qo'shish",
      gallery: "Galereya rasmi qo'shish",
      news: "Yangilik qo'shish",
      note: "Saqlangan ma'lumotlar brauzer localStorage ichida turadi.",
    },
    footer: {
      text: "IKAT. O'zbek ipak merosining premium ifodasi.",
    },
  },
  ru: {
    meta: {
      title: "IKAT",
      description:
        "Подлинный узбекский икат, ручной шелк и современная роскошь в одном пространстве.",
    },
    brandLine: "Наследие в языке роскоши",
    nav: {
      home: "Главная",
      about: "Об IKAT",
      catalog: "Каталог",
      gallery: "Галерея",
      news: "Новости",
      contact: "Контакты",
      admin: "Админ",
    },
    cta: {
      viewCollection: "Смотреть коллекцию",
      contactOrder: "Связаться через WhatsApp или Telegram",
      discoverStory: "История бренда",
      exploreGallery: "Открыть галерею",
      readNews: "Читать новости",
      contactUs: "Связаться",
    },
    ui: {
      menu: "Меню",
      close: "Закрыть",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      instagram: "Instagram",
      location: "Локация",
    },
    hero: {
      eyebrow: "Из Самарканда в мир",
      title: "Authentic IKAT from Uzbekistan",
      description:
        "Ручной шелк, глубокие цвета и ремесленная традиция, которая соединяет культурное наследие с современной модой.",
    },
    home: {
      aboutTitle: "Что такое IKAT?",
      aboutText:
        "IKAT — это уникальная текстильная техника, где рисунок рождается еще до ткачества. В каждом изделии чувствуется рука мастера и культурная память региона.",
      featuredTitle: "Избранные изделия",
      galleryTitle: "Предпросмотр галереи",
      newsTitle: "Последние новости",
      statsTitle: "Ценность в каждой детали",
      stats: [
        { value: "100%", label: "Ручная коллекция" },
        { value: "4", label: "Языка сайта" },
        { value: "∞", label: "Культурное вдохновение" },
      ],
    },
    about: {
      title: "История IKAT",
      intro:
        "Икат — это не просто ткань, а память, труд и эстетика, передаваемые из поколения в поколение.",
      paragraphs: [
        "Каждая шелковая нить окрашивается заранее, а затем переплетается так, чтобы узор словно дышал и жил внутри ткани.",
        "В Самарканде и по всему Узбекистану мастера икат веками выражали через цвет историю, природу и семейные ценности.",
        "Бренд IKAT переосмысляет это наследие для современной аудитории через коллекции одежды, интерьера и эксклюзивных изделий.",
      ],
      values: [
        "Подлинная ручная работа",
        "Культурная ценность и происхождение",
        "Современная премиальная эстетика",
      ],
    },
    catalog: {
      title: "Главный каталог",
      subtitle:
        "Премиальные коллекции, декоративные ткани и эксклюзивные изделия в одном пространстве.",
      filterLabel: "Основные изделия",
      priceLabel: "Цена",
    },
    gallery: {
      title: "Выставки и процессы",
      subtitle:
        "Культурные события, моменты из ателье и тонкие этапы рождения иката.",
    },
    news: {
      title: "Новости и статьи",
      subtitle:
        "Следите за выставками, новыми коллекциями и обновлениями бренда.",
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle:
        "Обсудим сотрудничество, заказ или вопросы по коллекциям.",
      form: {
        name: "Ваше имя",
        phone: "Телефон",
        message: "Сообщение",
        submit: "Отправить",
      },
    },
    admin: {
      title: "Админ-панель",
      subtitle:
        "Быстрая демо-панель для управления товарами, галереей и новостями.",
      products: "Добавить товар",
      gallery: "Добавить фото в галерею",
      news: "Добавить новость",
      note: "Данные сохраняются в localStorage браузера.",
    },
    footer: {
      text: "IKAT. Премиальное выражение шелкового наследия Узбекистана.",
    },
  },
  en: {
    meta: {
      title: "IKAT",
      description:
        "Authentic Uzbek ikat, handmade silk, and a luxurious multilingual digital experience.",
    },
    brandLine: "Heritage translated into luxury",
    nav: {
      home: "Home",
      about: "About",
      catalog: "Catalog",
      gallery: "Gallery",
      news: "News",
      contact: "Contact",
      admin: "Admin",
    },
    cta: {
      viewCollection: "View Collection",
      contactOrder: "Contact / Order via WhatsApp or Telegram",
      discoverStory: "Discover the Story",
      exploreGallery: "Explore Gallery",
      readNews: "Read News",
      contactUs: "Contact Us",
    },
    ui: {
      menu: "Menu",
      close: "Close",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      instagram: "Instagram",
      location: "Location",
    },
    hero: {
      eyebrow: "From Samarkand to the world",
      title: "Authentic IKAT from Uzbekistan",
      description:
        "Hand-dyed silk, luminous color, and centuries of craftsmanship shaped into a refined modern luxury experience.",
    },
    home: {
      aboutTitle: "What is IKAT?",
      aboutText:
        "IKAT is a rare textile art where the pattern is created before weaving begins. Every piece carries the patience, instinct, and cultural memory of master artisans.",
      featuredTitle: "Featured Products",
      galleryTitle: "Gallery Preview",
      newsTitle: "Latest News",
      statsTitle: "Value in every detail",
      stats: [
        { value: "100%", label: "Handmade collection" },
        { value: "4", label: "Website languages" },
        { value: "∞", label: "Cultural inspiration" },
      ],
    },
    about: {
      title: "The IKAT Story",
      intro:
        "Ikat is not only fabric. It is memory, labor, and beauty carried across generations.",
      paragraphs: [
        "Each silk thread is dyed in advance and then aligned with extraordinary precision, giving ikat its signature blurred rhythm and painterly soul.",
        "Across Samarkand and Uzbekistan, weavers have long translated history, nature, and family values into color-rich woven narratives.",
        "The IKAT brand brings that legacy into a contemporary luxury language through fashion, interior textiles, and collectible pieces.",
      ],
      values: [
        "Authentic craftsmanship",
        "Cultural value and provenance",
        "Contemporary premium aesthetic",
      ],
    },
    catalog: {
      title: "Main Catalog",
      subtitle:
        "Premium collections, statement textiles, and exclusive pieces curated in one place.",
      filterLabel: "Signature products",
      priceLabel: "Price",
    },
    gallery: {
      title: "Exhibitions and Process",
      subtitle:
        "Moments from exhibitions, atelier rituals, and the poetic stages of ikat making.",
    },
    news: {
      title: "News and Journal",
      subtitle:
        "Follow exhibitions, new collections, and cultural updates from the brand.",
    },
    contact: {
      title: "Contact IKAT",
      subtitle:
        "Reach out for collaboration, custom orders, or collection inquiries.",
      form: {
        name: "Your name",
        phone: "Phone",
        message: "Message",
        submit: "Send",
      },
    },
    admin: {
      title: "Admin Panel",
      subtitle:
        "A lightweight demo dashboard for adding products, gallery images, and news.",
      products: "Add Product",
      gallery: "Add Gallery Item",
      news: "Add News Post",
      note: "Saved items are stored in browser localStorage.",
    },
    footer: {
      text: "IKAT. A premium expression of Uzbek silk heritage.",
    },
  },
  tg: {
    meta: {
      title: "IKAT",
      description:
        "Икати аслии Ӯзбекистон, абрешими дастӣ ва таҷрибаи рақамии боҳашамат.",
    },
    brandLine: "Мерос дар либоси ҳашамат",
    nav: {
      home: "Асосӣ",
      about: "Дар бораи IKAT",
      catalog: "Каталог",
      gallery: "Галерея",
      news: "Хабарҳо",
      contact: "Тамос",
      admin: "Админ",
    },
    cta: {
      viewCollection: "Дидани коллексия",
      contactOrder: "Тамос / Фармоиш тавассути WhatsApp ё Telegram",
      discoverStory: "Қиссаи бренд",
      exploreGallery: "Кушодани галерея",
      readNews: "Хондани хабарҳо",
      contactUs: "Тамос",
    },
    ui: {
      menu: "Меню",
      close: "Пӯшидан",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      instagram: "Instagram",
      location: "Ҷойгиршавӣ",
    },
    hero: {
      eyebrow: "Аз Самарқанд ба ҷаҳон",
      title: "Authentic IKAT from Uzbekistan",
      description:
        "Абрешими дастӣ, рангҳои дурахшон ва ҳунари қадимӣ дар пайвастагӣ бо услуби муосири боҳашамат.",
    },
    home: {
      aboutTitle: "IKAT чист?",
      aboutText:
        "IKAT санъати нодири бофандагист, ки нақш пеш аз бофтан тавлид мешавад. Ҳар порча хотира, сабр ва завқи усторо дар худ нигоҳ медорад.",
      featuredTitle: "Маҳсулоти интихобшуда",
      galleryTitle: "Пешнамоиши галерея",
      newsTitle: "Хабарҳои охирин",
      statsTitle: "Арзиш дар ҳар ҷузъ",
      stats: [
        { value: "100%", label: "Коллексияи дастӣ" },
        { value: "4", label: "Забони сайт" },
        { value: "∞", label: "Илҳоми фарҳангӣ" },
      ],
    },
    about: {
      title: "Қиссаи IKAT",
      intro:
        "Икат танҳо матоъ нест, балки хотира, меҳнат ва зебоист, ки аз насл ба насл мегузарад.",
      paragraphs: [
        "Ҳар риштаи абрешим пешакӣ ранг карда мешавад ва сипас бо дақиқии баланд бофта мешавад, то нақш нафаскаш ва зинда намояд.",
        "Дар Самарқанд ва саросари Ӯзбекистон устоён бо рангу нақш таърих, табиат ва арзишҳои хонаводагиро ифода мекарданд.",
        "Бренди IKAT ин меросро ба забони муосири мӯд, интерьер ва маҳсулоти истисноӣ табдил медиҳад.",
      ],
      values: [
        "Ҳунари аслии дастӣ",
        "Арзиши фарҳангӣ ва маншаъ",
        "Эстетикаи муосири премиум",
      ],
    },
    catalog: {
      title: "Каталоги асосӣ",
      subtitle:
        "Коллексияҳои премиум, матоъҳои ороишӣ ва ашёи истисноӣ дар як ҷой.",
      filterLabel: "Маҳсулоти асосӣ",
      priceLabel: "Нарх",
    },
    gallery: {
      title: "Намоишгоҳҳо ва раванд",
      subtitle:
        "Лаҳзаҳо аз намоишгоҳҳо, устохона ва марҳилаҳои нозуки офариниши икат.",
    },
    news: {
      title: "Хабарҳо ва мақолаҳо",
      subtitle:
        "Намоишгоҳҳо, коллексияҳои нав ва навгониҳои брендро пайгирӣ кунед.",
    },
    contact: {
      title: "Бо мо тамос гиред",
      subtitle:
        "Барои ҳамкорӣ, фармоиш ё саволҳо дар бораи коллексияҳо муроҷиат кунед.",
      form: {
        name: "Номи шумо",
        phone: "Телефон",
        message: "Паём",
        submit: "Фиристодан",
      },
    },
    admin: {
      title: "Панели админ",
      subtitle:
        "Панели сабуки демо барои иловаи маҳсулот, галерея ва хабарҳо.",
      products: "Иловаи маҳсулот",
      gallery: "Иловаи акс",
      news: "Иловаи хабар",
      note: "Маълумот дар localStorage браузер нигоҳ дошта мешавад.",
    },
    footer: {
      text: "IKAT. Ифодаи премиуми мероси абрешими Ӯзбекистон.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
export type { Locale } from "@/types/content";
