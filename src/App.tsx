import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
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
  ShoppingBag,
  Sun,
  Moon,
  Globe
} from "lucide-react";
import { Language, getTranslation } from "./translations";

// --- TypeScript Interfaces ---
interface MenuItem {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly image: string;
  readonly category: string;
}

const LanguageSwitcher: React.FC<{ lang: Language; setLang: (l: Language) => void }> = ({ lang, setLang }) => {
  return (
    <div 
      className="flex items-center bg-surface-container-low rounded-full p-1 border border-on-surface/5"
      role="radiogroup"
      aria-label="Select Language"
    >
      {(['ru', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => {
            if (!document.startViewTransition) {
              setLang(l);
              return;
            }
            document.startViewTransition(() => setLang(l));
          }}
          aria-checked={lang === l}
          role="radio"
          className={`
            px-3 py-1 rounded-full text-xs font-bold transition-all duration-300
            ${lang === l 
              ? "bg-primary text-on-primary shadow-lg shadow-primary/20" 
              : "text-on-surface-variant hover:text-on-surface"}
          `}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

const Nav: React.FC<{ t: any; lang: Language; setLang: (l: Language) => void }> = ({ t, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-lg shadow-2xl shadow-amber-900/10 transition-all duration-300"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 py-4 relative">
        <motion.a whileHover={{ scale: 1.05 }} href="#" className="flex items-center">
          <img src="/logo.webp" alt="Malibu Logo" className="h-[75px] sm:h-[85px] md:h-[64px] lg:h-[72px] w-auto object-contain drop-shadow-md origin-left md:pl-4 lg:pl-6" />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8 absolute left-1/2 -translate-x-1/2">
          {[t('nav.home'), t('nav.about'), t('nav.menu')].map((item, i) => (
            <motion.a 
              key={item}
              whileHover={{ y: -2, color: 'var(--color-primary)' }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-on-surface-variant transition-colors duration-300 text-sm tracking-wide" 
              href={['/#hero', '/#about', '/#menu'][i]}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} setLang={setLang} />
          </div>

          {/* Contact Dropdown Integration */}
          <div className="relative" onMouseEnter={() => setIsContactOpen(true)} onMouseLeave={() => setIsContactOpen(false)}>
            <motion.button 
              onClick={() => setIsContactOpen(!isContactOpen)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t('nav.contact')}
              aria-expanded={isContactOpen}
              className="flex bg-primary hover:bg-primary-container text-on-primary font-medium px-4 md:px-6 py-2 sm:py-2.5 rounded-xl transition-all items-center gap-2 ambient-shadow-primary text-sm md:text-base whitespace-nowrap hover-glow-primary"
            >
              <Phone size={18} /> {t('nav.contact')}
            </motion.button>

            <AnimatePresence>
              {isContactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 200 }}
                  className="absolute right-0 mt-3 w-[260px] bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 z-[60]"
                >
                  <a href={`https://wa.me/79220898090?text=${encodeURIComponent(lang === 'ru' ? 'Здравствуйте! Я хочу забронировать столик.' : 'Hello! I would like to book a table.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <Wine size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface text-sm font-medium">{t('nav.reserve')}</span>
                      <span className="text-on-surface-variant text-xs mt-0.5">{t('nav.reserveNote')}</span>
                    </div>
                  </a>
                  
                  <a href={`https://wa.me/79642090707?text=${encodeURIComponent(lang === 'ru' ? 'Здравствуйте! Я хочу сделать заказ на доставку.' : 'Hello! I would like to place an order for delivery.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500/20 transition-all">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface text-sm font-medium">{t('nav.delivery')}</span>
                      <span className="text-on-surface-variant text-xs mt-0.5">{t('nav.deliveryNote')}</span>
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
            className="md:hidden bg-surface/95 border-t border-on-surface/10 overflow-hidden backdrop-blur-xl"
          >
            <nav className="flex flex-col items-center py-6 space-y-6">
              <a href="/#hero" onClick={(e) => {
                e.preventDefault();
                closeMenu();
                setTimeout(() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }} className="text-on-surface-variant hover:text-primary transition-colors text-lg">{t('nav.home')}</a>
              
              <a href="/#about" onClick={(e) => {
                e.preventDefault();
                closeMenu();
                setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }} className="text-on-surface-variant hover:text-primary transition-colors text-lg">{t('nav.about')}</a>
              
              <a href="/#menu" onClick={(e) => {
                e.preventDefault();
                closeMenu();
                setTimeout(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }} className="text-on-surface-variant hover:text-primary transition-colors text-lg">{t('nav.menu')}</a>

              <div className="pt-4 border-t border-on-surface/10 w-full flex justify-center">
                <LanguageSwitcher lang={lang} setLang={setLang} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Removed Framer Motion variants for Hero to use CSS instead for instant LCP

const Hero: React.FC<{ t: any; lang: Language }> = ({ t, lang }) => (
  <section id="hero" className="relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-surface">
      {/* Absolute exact image from your screenshot, full cover */}
        <img
          alt="Tropical sunset beach bar"
          className="w-full h-full object-cover hero-bg-fade"
          src="/back2.webp"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--surface)_90%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none"></div>
    </div>

    <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center mt-12">
      <span className="text-primary font-body uppercase tracking-[0.3em] text-sm mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>{t('hero.subtitle')}</span>
      <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-surface mb-6 tracking-tight leading-[1.1] opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {t('hero.title1')} <br />
        <span className="text-primary italic font-light">{t('hero.title2')}</span>
      </h1>
      <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        {t('hero.description')}
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <motion.a 
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href="/#menu" 
          className="bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg shadow-lg shadow-primary/20 text-center hover-glow-primary"
        >
          {t('hero.viewMenu')}
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05, y: -5, backgroundColor: 'var(--surface-bright)' }}
          whileTap={{ scale: 0.95 }}
          href={`https://wa.me/79220898090?text=${encodeURIComponent(lang === 'ru' ? 'Здравствуйте! Я хочу забронировать столик.' : 'Hello! I would like to book a table.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel text-primary border border-primary/30 px-8 py-4 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2"
        >
          {t('hero.bookTable')}
        </motion.a>
      </div>
    </div>
  </section>
);

const BentoGrid: React.FC<{ t: any }> = ({ t }) => (
  <section id="about" className="py-24 px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 md:w-2/3">
        <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">{t('about.title')}</h2>
        <p className="text-on-surface-variant text-lg">{t('about.description')}</p>
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
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop&fm=webp"
            referrerPolicy="no-referrer"
            loading="lazy"
            width="800"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h3 className="font-headline text-3xl text-on-surface mb-3">{t('about.cocktailsTitle')}</h3>
            <p className="text-on-surface-variant max-w-md">{t('about.cocktailsDesc')}</p>
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
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface/40 to-transparent"></div>
          <div className="absolute top-6 right-6 text-primary/50 z-10 drop-shadow-md">
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Mic size={40} strokeWidth={1.5} />
            </motion.div>
          </div>
          <div className="relative z-10 p-8">
            <h3 className="font-headline text-2xl text-on-surface mb-2">{t('about.soundTitle')}</h3>
            <p className="text-on-surface-variant text-sm">{t('about.soundDesc')}</p>
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
            src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=400&auto=format&fit=crop&fm=webp"
            referrerPolicy="no-referrer"
            loading="lazy"
            width="800"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface/40 to-transparent"></div>
          <div className="absolute top-6 right-6 text-secondary/50 z-10 drop-shadow-md">
            <motion.div style={{ originX: 0.5, originY: 1 }} whileHover={{ rotate: [-5, 5, -5] }} transition={{ duration: 0.4 }}>
              <Wine size={40} strokeWidth={1.5} />
            </motion.div>
          </div>
          <div className="relative z-10 p-8">
            <h3 className="font-headline text-2xl text-on-surface mb-2">{t('about.atmosphereTitle')}</h3>
            <p className="text-on-surface-variant text-sm">{t('about.atmosphereDesc')}</p>
          </div>
        </motion.div>


      </motion.div>
    </div>
  </section>
);

// --- Меню Данные ---
const MENU_CATEGORIES = (t: any) => [
  t('menu.categories.cocktails'), 
  t('menu.categories.snacks'), 
  t('menu.categories.hookah')
];

const MENU_ITEMS: readonly MenuItem[] = [
  { id: 1, name: "Белый русский", description: "x", price: "600 ₽", image: "/1.webp", category: "Коктейли" },
  { id: 2, name: "Лонг айленд", description: "x", price: "850 ₽", image: "/2.webp", category: "Коктейли" },
  { id: 3, name: "Мохито", description: "x", price: "600 ₽", image: "/3.webp", category: "Коктейли" },
  { id: 4, name: "Виски кола", description: "x", price: "600 ₽", image: "/4-k.webp", category: "Коктейли" },
  { id: 5, name: "Джин тоник", description: "x", price: "600 ₽", image: "/5.webp", category: "Коктейли" },
  { id: 6, name: "Текила санрайз", description: "x", price: "600 ₽", image: "/6.webp", category: "Коктейли" },
  { id: 7, name: "Голубая лагуна", description: "x", price: "500 ₽", image: "/7.webp", category: "Коктейли" },
  { id: 8, name: "Май тай", description: "x", price: "600 ₽", image: "/8.webp", category: "Коктейли" },
  { id: 9, name: "Куба либре", description: "x", price: "500 ₽", image: "/9.webp", category: "Коктейли" },
  { id: 10, name: "Апероль шприц", description: "x", price: "700 ₽", image: "/10.webp", category: "Коктейли" },
  { id: 14, name: "Пина колада", description: "x", price: "600 ₽", image: "/11.webp", category: "Коктейли" },
  { id: 15, name: "Секс на пляже", description: "x", price: "600 ₽", image: "/12.webp", category: "Коктейли" },
  { id: 16, name: "Отвертка", description: "x", price: "500 ₽", image: "/13.webp", category: "Коктейли" },
  { id: 17, name: "Мартини фиеро тоник", description: "x", price: "600 ₽", image: "/14.webp", category: "Коктейли" },
  { id: 18, name: "Малибу", description: "x", price: "900 ₽", image: "/15.webp", category: "Коктейли" },
  { id: 11, name: "Ассорти Брускетт", description: "Хрустящий багет с лососем и томатами.", price: "850 ₽", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=400", category: "Закуски" },
  { id: 12, name: "Сырное Плато", description: "Премиальные сыры с медом.", price: "1800 ₽", image: "https://images.unsplash.com/photo-1631379578201-1cbda8b0e7cb?q=80&w=400", category: "Закуски" },
  { id: 13, name: "Тропический Дым", description: "Премиум табак с нотками ананаса.", price: "2500 ₽", image: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400", category: "Кальян" }
] as const;

const RestaurantMenu: React.FC<{ t: any; limit?: number }> = ({ t, limit }) => {
  const categories = MENU_CATEGORIES(t);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  
  // Track current category index to handle language changes
  useEffect(() => {
    // If language changes, make sure we still have a valid active category
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [t]);

  const filteredItems = MENU_ITEMS.filter(item => {
    // Check if the current translated category matches the item source category's translation
    const ruCategory = item.category;
    let fallbackKey = 'cocktails';
    if (ruCategory === 'Закуски') fallbackKey = 'snacks';
    if (ruCategory === 'Кальян') fallbackKey = 'hookah';
    
    return t(`menu.categories.${fallbackKey}`) === activeCategory;
  });

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
        <h2 className="font-headline text-4xl text-on-surface mb-4 tracking-tight">{t('menu.title')}</h2>
        <p className="text-on-surface-variant text-lg max-w-2xl">
          {t('menu.subtitle')}
        </p>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4 mb-10 w-full no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`whitespace-nowrap pb-2 text-lg font-medium transition-all duration-300 ease-in-out ${activeCategory === category ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {(limit ? filteredItems.slice(0, limit) : filteredItems).map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
              key={item.id}
              className="flex items-center gap-4 p-4 ghost-border bg-surface-container-low hover:bg-surface-container transition-all duration-300 rounded-2xl group cursor-pointer"
            >
              <div className="flex-shrink-0 w-20 h-28 sm:w-24 sm:h-32 overflow-hidden rounded-xl bg-surface">
                <img src={item.image.includes('unsplash') ? `${item.image}&fm=webp` : item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" loading="lazy" width="400" height="400" />
              </div>
               <div className="flex flex-col flex-grow justify-center py-1">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-headline text-lg sm:text-xl text-on-surface leading-tight">
                    {t(`menu.items.${item.name}.name`)}
                  </h3>
                  <span className="text-primary font-headline text-lg sm:text-xl whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm sm:text-base font-light leading-snug line-clamp-2">
                  {t(`menu.items.${item.name}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {limit && filteredItems.length > limit && (
        <div className="mt-12 flex justify-center">
          <Link to="/menu" className="glass-panel text-primary border border-primary/30 px-8 py-4 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary">
            {t('menu.viewAll')}
          </Link>
        </div>
      )}
    </motion.section>
  );
};

const Footer: React.FC<{ t: any }> = ({ t }) => (
  <motion.footer 
    initial="hidden" 
    whileInView="visible" 
    viewport={{ once: true }} 
    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }} 
    className="w-full pt-20 pb-10 px-8 rounded-t-[32px] bg-surface-dim relative z-10"
  >
    <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto mb-16 text-left">
      <div className="flex-1" style={{ textAlign: 'left', display: 'block' }}>
        <div className="mb-6" style={{ textAlign: 'left' }}>
          <a href="#" className="inline-block">
            <img src="/logo.webp" alt="Malibu Logo" className="h-[70px] md:h-[90px] w-auto object-contain drop-shadow-md origin-left hover:scale-105 transition-all" style={{ display: 'block', marginLeft: '-195px' }} loading="lazy" />
          </a>
        </div>
        <p className="text-on-surface-variant max-w-sm mb-6 leading-relaxed" style={{ textAlign: 'left', marginLeft: '0', display: 'block' }}>
          {t('footer.tagline')}
        </p>
        <div className="flex flex-col space-y-2" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
          <div className="flex items-center gap-2 text-on-surface text-sm" style={{ justifyContent: 'flex-start' }}>
            <Phone size={16} className="text-on-surface-variant" /> 
            <span className="text-on-surface-variant">{t('footer.reserve')}</span>
            <a href="tel:+79220898090" className="hover:text-primary transition-colors">+7 922 089-80-90</a>
          </div>
          <div className="flex items-center gap-2 text-on-surface text-sm" style={{ justifyContent: 'flex-start' }}>
            <Phone size={16} className="text-on-surface-variant" /> 
            <span className="text-on-surface-variant">{t('footer.delivery')}</span>
            <a href="tel:+79642090707" className="hover:text-primary transition-colors">+7 964 209-07-07</a>
          </div>
          <a href="https://2gis.ru/n_urengoy/firm/70000001109629339" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors group mt-2" style={{ justifyContent: 'flex-start' }}>
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="text-on-surface-variant group-hover:text-primary">
              <MapPin size={16} />
            </motion.div>
            <span>{t('footer.address')}</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end">
        <h4 className="font-headline text-lg text-primary mb-6">{t('footer.socials')}</h4>
        <div className="flex gap-4">
          <motion.a 
            whileHover={{ scale: 1.1, rotate: 5, backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }} 
            whileTap={{ scale: 0.9 }} 
            href="https://www.instagram.com/karaokemalibu89" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-on-surface-variant transition-all hover-glow-primary"
          >
            <Instagram size={20} />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.1, rotate: -5, backgroundColor: '#0088cc', color: '#ffffff' }} 
            whileTap={{ scale: 0.9 }} 
            href="https://t.me/karaokemaliby89" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center text-on-surface-variant transition-all group" title="Telegram"
          >
            <motion.div whileHover={{ scale: 1.1, rotate: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Send size={20} className="-ml-1" />
            </motion.div>
          </motion.a>
        </div>
      </div>

    </div>
  </motion.footer>
);


const HomePage = ({ t, lang }: { t: any; lang: Language }) => (
  <>
    <Hero t={t} lang={lang} />
    <BentoGrid t={t} />
    <RestaurantMenu t={t} limit={6} />
  </>
);

const MenuPage = ({ t }: { t: any }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-24 min-h-screen">
      <RestaurantMenu t={t} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ru');
  const t = (path: string) => getTranslation(lang, path);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      return;
    }
    document.startViewTransition(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    });
  };

  return (
    <div className="relative min-h-screen bg-surface">
      <div className="wood-texture-overlay z-0 opacity-5" />
      <Nav t={t} lang={lang} setLang={setLang} />
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
        title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-surface-container hover:bg-surface-container-high text-primary rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ambient-shadow-primary border border-primary/20"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </motion.div>
      </button>

      <main className="relative z-10 w-full flex-grow transition-colors duration-500 text-on-surface">
        <Routes>
          <Route path="/" element={<HomePage t={t} lang={lang} />} />
          <Route path="/menu" element={<MenuPage t={t} />} />
        </Routes>
      </main>
      <Footer t={t} />
    </div>
  );
}
