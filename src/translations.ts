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
      categories: {
        cocktails: "Коктейли",
        snacks: "Закуски",
        hookah: "Кальян",
      },
      items: {
        "Тропический Шторм": {
          name: "Тропический Шторм",
          description: "Свежий микс манго, маракуйи и рома."
        },
        "Неоновый Закат": {
          name: "Неоновый Закат",
          description: "Классический Апероль с грейпфрутом."
        },
        "Полуночный Оазис": {
          name: "Полуночный Оазис",
          description: "Джин, свежий огурец, биттер."
        },
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
      categories: {
        cocktails: "Cocktails",
        snacks: "Snacks",
        hookah: "Hookah",
      },
      items: {
        "Тропический Шторм": {
          name: "Tropical Storm",
          description: "A fresh blend of mango, passion fruit, and rum."
        },
        "Неоновый Закат": {
          name: "Neon Sunset",
          description: "Classic Aperol with grapefruit."
        },
        "Полуночный Оазис": {
          name: "Midnight Oasis",
          description: "Gin, fresh cucumber, bitters."
        },
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
