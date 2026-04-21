import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Send,
  Wine,
  Mic,
  Menu,
  X,
  ShoppingBag
} from "lucide-react";

// --- TypeScript Interfaces ---
interface MenuItem {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly image: string;
  readonly category: string;
}

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 bg-stone-950/80 backdrop-blur-lg shadow-2xl shadow-amber-900/10 transition-all duration-300"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 py-4 relative">
        <motion.a whileHover={{ scale: 1.05 }} href="#" className="flex items-center md:ml-10 lg:ml-16">
          <img src="/logo.webp" alt="Malibu Logo" className="h-10 sm:h-12 md:h-16 object-contain drop-shadow-md" width="128" height="64" />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8 absolute left-1/2 -translate-x-1/2">
          <a className="text-stone-300 hover:text-primary transition-all duration-300 text-sm tracking-wide" href="#hero">Главная</a>
          <a className="text-stone-300 hover:text-primary transition-all duration-300 text-sm tracking-wide" href="#about">О нас</a>
          <a className="text-stone-300 hover:text-primary transition-all duration-300 text-sm tracking-wide" href="#menu">Меню</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Contact Dropdown Integration */}
          <div className="relative" onMouseEnter={() => setIsContactOpen(true)} onMouseLeave={() => setIsContactOpen(false)}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Связаться с нами"
              aria-expanded={isContactOpen}
              className="flex bg-primary hover:bg-primary-container text-on-primary font-medium px-4 md:px-6 py-2 sm:py-2.5 rounded-xl transition-colors items-center gap-2 ambient-shadow-primary text-sm md:text-base whitespace-nowrap"
            >
              <Phone size={18} /> СВЯЗЬ
            </motion.button>

            <AnimatePresence>
              {isContactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute right-0 mt-3 w-[260px] bg-stone-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 z-[60]"
                >
                  <a href="https://wa.me/79220898090?text=Здравствуйте! Я хочу забронировать столик." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <Wine size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface text-sm font-medium">Резерв столика</span>
                      <span className="text-stone-400 text-xs mt-0.5">Ежедневно с 11:00</span>
                    </div>
                  </a>
                  
                  <a href="https://wa.me/79642090707?text=Здравствуйте! Я хочу сделать заказ на доставку." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500/20 transition-all">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface text-sm font-medium">Заказ & Доставка</span>
                      <span className="text-stone-400 text-xs mt-0.5">Напишите нам для заказа</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-on-surface hover:text-primary transition-colors p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-stone-950/95 border-t border-white/5 overflow-hidden backdrop-blur-xl"
          >
            <nav className="flex flex-col items-center py-6 space-y-6">
              <a onClick={closeMenu} className="text-stone-300 hover:text-primary transition-colors text-lg" href="#hero">Главная</a>
              <a onClick={closeMenu} className="text-stone-300 hover:text-primary transition-colors text-lg" href="#about">О нас</a>
              <a onClick={closeMenu} className="text-stone-300 hover:text-primary transition-colors text-lg" href="#menu">Меню</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

const Hero = () => (
  <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
      {/* Absolute exact image from your screenshot, full cover */}
        <img
          alt="Tropical sunset beach bar"
          className="w-full h-full object-cover hero-bg-fade"
          src="/back2.webp"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0a_90%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none"></div>
    </div>

    <motion.div
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center mt-12"
    >
      <motion.span variants={itemVariants} className="text-primary font-body uppercase tracking-[0.3em] text-sm mb-6 opacity-90">ОТКРЫТИЕ СЕЗОНА</motion.span>
      <motion.h1 variants={itemVariants} className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-surface mb-6 tracking-tight leading-[1.1]">
        Караоке-бар <br />
        <span className="text-primary italic font-light">с атмосферой вечера</span>
      </motion.h1>
      <motion.p variants={itemVariants} className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
        Профессиональный звук, авторские коктейли и стильный интерьер. Погрузитесь в магию вечера и насладитесь отдыхом в кругу друзей.
      </motion.p>
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#menu" className="bg-primary hover:bg-primary-container text-on-primary font-semibold px-8 py-4 rounded-xl transition-colors text-lg shadow-lg shadow-primary/20 text-center">
          Посмотреть меню
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          href="https://wa.me/79220898090?text=Здравствуйте! Я хочу забронировать столик."
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel text-primary border border-primary/30 hover:bg-surface-bright/80 px-8 py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
        >
          Забронировать столик
        </motion.a>
      </motion.div>
    </motion.div>
  </section>
);

const BentoGrid = () => (
  <section id="about" className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 md:w-2/3">
        <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">Ритм Тропиков</h2>
        <p className="text-on-surface-variant text-lg">Каждая деталь нашего бара создана для вашего идеального отдыха. От кристально чистого звучания до уникальной эстетики ночных джунглей.</p>
      </div>

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]"
      >
        {/* Large Card */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } }}
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-xl overflow-hidden relative group ghost-border"
        >
          <img
            alt="Exotic tropical cocktail"
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop&fm=webp"
            referrerPolicy="no-referrer"
            loading="lazy"
            width="800"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="font-headline text-3xl text-on-surface mb-3">Экзотические Коктейли</h3>
            <p className="text-on-surface-variant max-w-md">Авторские миксы из свежих фруктов и премиального алкоголя от нашего шеф-бармена.</p>
          </div>
        </motion.div>

        {/* Small Card 1 */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } }}
          whileHover={{ y: -5 }}
          className="bg-surface-container-low rounded-xl overflow-hidden relative group ghost-border flex flex-col justify-end"
        >
          <img
            alt="Karaoke Microphone"
            className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
            src="/karaoke.webp"
            loading="lazy"
            width="800"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-[#0a0a0a]/40 to-transparent"></div>
          <div className="absolute top-6 right-6 text-primary/50 z-10 drop-shadow-md">
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Mic size={40} strokeWidth={1.5} />
            </motion.div>
          </div>
          <div className="relative z-10 p-8">
            <h3 className="font-headline text-2xl text-on-surface mb-2">Звук</h3>
            <p className="text-on-surface-variant text-sm">Идеальная акустика и новые хиты.</p>
          </div>
        </motion.div>

        {/* Small Card 2 */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
          whileHover={{ y: -5 }}
          className="bg-surface-container-low rounded-xl overflow-hidden relative group ghost-border flex flex-col justify-end"
        >
          <img
            alt="Bar Atmosphere"
            className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop&fm=webp"
            referrerPolicy="no-referrer"
            loading="lazy"
            width="800"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-[#0a0a0a]/40 to-transparent"></div>
          <div className="absolute top-6 right-6 text-secondary/50 z-10 drop-shadow-md">
            <motion.div style={{ originX: 0.5, originY: 1 }} whileHover={{ rotate: [-5, 5, -5] }} transition={{ duration: 0.4 }}>
              <Wine size={40} strokeWidth={1.5} />
            </motion.div>
          </div>
          <div className="relative z-10 p-8">
            <h3 className="font-headline text-2xl text-on-surface mb-2">Атмосфера</h3>
            <p className="text-on-surface-variant text-sm">Янтарный свет и неповторимый вайб.</p>
          </div>
        </motion.div>


      </motion.div>
    </div>
  </section>
);

// --- Меню Данные ---
const MENU_CATEGORIES = ["Коктейли", "Закуски", "Кальян"];

const MENU_ITEMS: readonly MenuItem[] = [
  { id: 1, name: "Тропический Шторм", description: "Свежий микс манго, маракуйи и рома.", price: "1250 ₽", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400", category: "Коктейли" },
  { id: 2, name: "Неоновый Закат", description: "Классический Апероль с грейпфрутом.", price: "950 ₽", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400", category: "Коктейли" },
  { id: 3, name: "Полуночный Оазис", description: "Джин, свежий огурец, биттер.", price: "1100 ₽", image: "https://images.unsplash.com/photo-1575037614876-c385cc82db67?q=80&w=400", category: "Коктейли" },
  { id: 4, name: "Ассорти Брускетт", description: "Хрустящий багет с лососем и томатами.", price: "850 ₽", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=400", category: "Закуски" },
  { id: 5, name: "Сырное Плато", description: "Премиальные сыры с медом.", price: "1800 ₽", image: "https://images.unsplash.com/photo-1631379578201-1cbda8b0e7cb?q=80&w=400", category: "Закуски" },
  { id: 6, name: "Тропический Дым", description: "Премиум табак с нотками ананаса.", price: "2500 ₽", image: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400", category: "Кальян" }
] as const;

const RestaurantMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
      id="menu" 
      className="py-24 px-6 relative max-w-7xl mx-auto"
    >
      <div className="mb-12 text-center md:text-left">
        <h2 className="font-headline text-4xl text-on-surface mb-4 tracking-tight">Наше Меню</h2>
        <p className="text-on-surface-variant text-lg max-w-2xl">
          Стильные миксы, легкие закуски и густой дым.
        </p>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4 mb-10 w-full no-scrollbar">
        {MENU_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`whitespace-nowrap pb-2 text-lg font-medium transition-all duration-300 ease-in-out
              ${activeCategory === category ? "text-primary border-b-2 border-primary" : "text-stone-400 hover:text-stone-200"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="flex items-center gap-4 p-4 ghost-border bg-surface-container-low hover:bg-surface-container transition-colors rounded-2xl group"
            >
              <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 overflow-hidden rounded-xl bg-surface">
                <img src={`${item.image}&fm=webp`} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" loading="lazy" width="400" height="400" />
              </div>
              <div className="flex flex-col flex-grow justify-center py-1">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-headline text-lg sm:text-xl text-on-surface leading-tight">{item.name}</h3>
                  <span className="text-primary font-headline text-lg sm:text-xl whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm sm:text-base font-light leading-snug line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

const Footer: React.FC = () => (
  <motion.footer 
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: true }} 
    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }} 
    className="w-full pt-20 pb-10 px-8 rounded-t-[32px] bg-stone-950 relative z-10"
  >
    <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto mb-16">
      <div className="flex-1">
        <a href="#" className="inline-block mb-6">
          <img src="/logo.webp" alt="Malibu Logo" className="h-10 md:h-12 object-contain drop-shadow-md" width="128" height="48" loading="lazy" />
        </a>
        <p className="text-stone-400 max-w-sm mb-6 leading-relaxed">
          © 2026 Malibu Karaoke Bar. Тропическая ночь ждет вас в каждом звуке.
        </p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2 text-stone-300 text-sm">
            <Phone size={16} /> 
            <span className="text-stone-500">Резерв:</span>
            <a href="tel:+79220898090" className="hover:text-primary transition-colors">+7 922 089-80-90</a>
          </div>
          <div className="flex items-center gap-2 text-stone-300 text-sm">
            <Phone size={16} /> 
            <span className="text-stone-500">Доставка:</span>
            <a href="tel:+79642090707" className="hover:text-primary transition-colors">+7 964 209-07-07</a>
          </div>
          <a href="https://2gis.ru/n_urengoy/firm/70000001109629339" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-primary transition-colors group mt-2">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <MapPin size={16} />
            </motion.div>
            <span>Северная коммунальная зона, 7</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end">
        <h4 className="font-headline text-lg text-primary mb-6">Социальные сети</h4>
        <div className="flex gap-4">
          <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://www.instagram.com/karaokemalibu89" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-stone-400 hover:bg-primary hover:text-on-primary transition-colors">
            <Instagram size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://t.me/karaokemaliby89" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-stone-400 hover:bg-blue-500 hover:text-white transition-colors group" title="Telegram">
            <motion.div whileHover={{ scale: 1.1, rotate: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Send size={20} className="-ml-1" />
            </motion.div>
          </motion.a>
        </div>
      </div>

    </div>
  </motion.footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-surface">
      <div className="wood-texture-overlay z-0" />
      <Nav />
      <main className="relative z-10 w-full flex-grow">
        <Hero />
        <BentoGrid />
        <RestaurantMenu />
      </main>
      <Footer />
    </div>
  );
}
