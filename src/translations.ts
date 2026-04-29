export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      menu: "Меню",
      contact: "СВЯЗЬ",
      reserve: "Резерв столика",
      delivery: "Заказ & Доставка",
      reserveNote: "Ежедневно с 11:00",
      deliveryNote: "Напишите нам для заказа",
    },
    hero: {
      subtitle: "ОТКРЫТИЕ СЕЗОНА",
      title1: "Караоке-бар",
      title2: "с атмосферой вечера",
      description: "Профессиональный звук, авторские коктейли и стильный интерьер. Погрузитесь в магию вечера и насладитесь отдыхом в кругу друзей.",
      viewMenu: "Посмотреть меню",
      bookTable: "Забронировать столик",
    },
    about: {
      title: "Ритм Тропиков",
      description: "Каждая деталь нашего бара создана для вашего идеального отдыха. От кристально чистого звучания до уникальной эстетики ночных джунглей.",
      cocktailsTitle: "Экзотические Коктейли",
      cocktailsDesc: "Авторские миксы из свежих фруктов и премиального алкоголя от нашего шеф-бармена.",
      soundTitle: "Звук",
      soundDesc: "Идеальная акустика и новые хиты.",
      atmosphereTitle: "Атмосфера",
      atmosphereDesc: "Янтарный свет и неповторимый вайб.",
    },
    menu: {
      title: "Наше Меню",
      subtitle: "Стильные миксы, легкие закуски и густой дым.",
      viewAll: "Посмотреть все меню",
      categories: {
        cocktails: "Коктейли",
        snacks: "Закуски",
        hookah: "Кальян",
      },
      items: {
        "Белый русский": {
          name: "Белый русский",
          description: "x"
        },
        "Лонг айленд": {
          name: "Лонг айленд",
          description: "x"
        },
        "Мохито": {
          name: "Мохито",
          description: "x"
        },
        "Виски кола": { name: "Виски кола", description: "x" },
        "Джин тоник": { name: "Джин тоник", description: "x" },
        "Текила санрайз": { name: "Текила санрайз", description: "x" },
        "Голубая лагуна": { name: "Голубая лагуна", description: "x" },
        "Май тай": { name: "Май тай", description: "x" },
        "Куба либре": { name: "Куба либре", description: "x" },
        "Апероль шприц": { name: "Апероль шприц", description: "x" },
        "Пина колада": { name: "Пина колада", description: "x" },
        "Секс на пляже": { name: "Секс на пляже", description: "x" },
        "Отвертка": { name: "Отвертка", description: "x" },
        "Мартини фиеро тоник": { name: "Мартини фиеро тоник", description: "x" },
        "Малибу": { name: "Малибу", description: "x" },
        "Ассорти Брускетт": {
          name: "Ассорти Брускетт",
          description: "Хрустящий багет с лососем и томатами."
        },
        "Сырное Плато": {
          name: "Сырное Плато",
          description: "Премиальные сыры с медом."
        },
        "Тропический Дым": {
          name: "Тропический Дым",
          description: "Премиум табак с нотками ананаса."
        }
      }
    },
    footer: {
      tagline: "© 2026 Malibu Karaoke Bar. Тропическая ночь ждет вас в каждом звуке.",
      reserve: "Резерв:",
      delivery: "Доставка:",
      address: "Северная коммунальная зона, 7",
      socials: "Социальные сети",
    },
    common: {
      lightMode: "Светлый режим",
      darkMode: "Тёмный режим",
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      menu: "Menu",
      contact: "CONTACT",
      reserve: "Table Reservation",
      delivery: "Order & Delivery",
      reserveNote: "Daily from 11:00 AM",
      deliveryNote: "Message us to order",
    },
    hero: {
      subtitle: "SEASON OPENING",
      title1: "Karaoke Bar",
      title2: "with an Evening Vibe",
      description: "Professional sound, signature cocktails, and a stylish interior. Immerse yourself in the magic of the night and relax with friends.",
      viewMenu: "View Menu",
      bookTable: "Book a Table",
    },
    about: {
      title: "Tropical Rhythm",
      description: "Every detail of our bar is crafted for your perfect getaway. From crystal clear sound to the unique aesthetic of the night jungle.",
      cocktailsTitle: "Exotic Cocktails",
      cocktailsDesc: "Signature mixes of fresh fruits and premium spirits from our head bartender.",
      soundTitle: "Sound",
      soundDesc: "Perfect acoustics and the latest hits.",
      atmosphereTitle: "Atmosphere",
      atmosphereDesc: "Amber glow and an unmistakable vibe.",
    },
    menu: {
      title: "Our Menu",
      subtitle: "Stylish mixes, light snacks, and thick smoke.",
      viewAll: "View Full Menu",
      categories: {
        cocktails: "Cocktails",
        snacks: "Snacks",
        hookah: "Hookah",
      },
      items: {
        "Белый русский": {
          name: "White Russian",
          description: "x"
        },
        "Лонг айленд": {
          name: "Long Island",
          description: "x"
        },
        "Мохито": {
          name: "Mojito",
          description: "x"
        },
        "Виски кола": { name: "Whiskey Cola", description: "x" },
        "Джин тоник": { name: "Gin Tonic", description: "x" },
        "Текила санрайз": { name: "Tequila Sunrise", description: "x" },
        "Голубая лагуна": { name: "Blue Lagoon", description: "x" },
        "Май тай": { name: "Mai Tai", description: "x" },
        "Куба либре": { name: "Cuba Libre", description: "x" },
        "Апероль шприц": { name: "Aperol Spritz", description: "x" },
        "Пина колада": { name: "Piña Colada", description: "x" },
        "Секс на пляже": { name: "Sex on the Beach", description: "x" },
        "Отвертка": { name: "Screwdriver", description: "x" },
        "Мартини фиеро тоник": { name: "Martini Fiero Tonic", description: "x" },
        "Малибу": { name: "Malibu", description: "x" },
        "Ассорти Брускетт": {
          name: "Bruschetta Platter",
          description: "Crispy baguette with salmon and tomatoes."
        },
        "Сырное Плато": {
          name: "Cheese Board",
          description: "Premium cheeses served with honey."
        },
        "Тропический Дым": {
          name: "Tropical Smoke",
          description: "Premium tobacco with notes of pineapple."
        }
      }
    },
    footer: {
      tagline: "© 2026 Malibu Karaoke Bar. A tropical night awaits in every sound.",
      reserve: "Reserve:",
      delivery: "Delivery:",
      address: "Northern Communal Zone, 7",
      socials: "Follow Us",
    },
    common: {
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    }
  }
};

export const getTranslation = (lang: Language, path: string): string => {
  const keys = path.split('.');
  let result: any = translations[lang];
  let fallback: any = translations['ru'];

  for (const key of keys) {
    if (result && result[key]) {
      result = result[key];
    } else {
      result = null;
      break;
    }
  }

  if (result !== null && typeof result === 'string') return result;

  // Fallback to Russian
  for (const key of keys) {
    if (fallback && fallback[key]) {
      fallback = fallback[key];
    } else {
      return path; // Return key if not found in fallback either
    }
  }

  return typeof fallback === 'string' ? fallback : path;
};
