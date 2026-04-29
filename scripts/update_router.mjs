import fs from 'fs';
import path from 'path';

// 1. Update translations.ts
const transPath = path.resolve('src', 'translations.ts');
let transContent = fs.readFileSync(transPath, 'utf-8');
transContent = transContent.replace(/subtitle: "Стильные миксы, легкие закуски и густой дым.",/, 'subtitle: "Стильные миксы, легкие закуски и густой дым.",\n      viewAll: "Посмотреть все меню",');
transContent = transContent.replace(/subtitle: "Stylish mixes, light snacks, and thick smoke.",/, 'subtitle: "Stylish mixes, light snacks, and thick smoke.",\n      viewAll: "View Full Menu",');
fs.writeFileSync(transPath, transContent);

// 2. Update App.tsx
const appPath = path.resolve('src', 'App.tsx');
let appContent = fs.readFileSync(appPath, 'utf-8');

appContent = `import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";\n` + appContent;

// Update Nav Links
appContent = appContent.replace(/href=\{\['#hero', '#about', '#menu'\]\[i\]\}/g, `href={['/#hero', '/#about', '/#menu'][i]}`);
appContent = appContent.replace(/href="#hero"/g, `href="/#hero"`);
appContent = appContent.replace(/href="#about"/g, `href="/#about"`);
appContent = appContent.replace(/href="#menu"/g, `href="/#menu"`);

// Update RestaurantMenu
appContent = appContent.replace(/const RestaurantMenu: React\.FC<\{ t: any \}> = \(\{ t \}\) => \{/, `const RestaurantMenu: React.FC<{ t: any; limit?: number }> = ({ t, limit }) => {`);
appContent = appContent.replace(/\{filteredItems\.map\(item => \(/, `{const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems; return displayedItems.map(item => (`);
appContent = appContent.replace(/\{t\(\`menu\.items\.\$\{item\.name\}\.description\`\)\}/g, `</p>\n              </div>\n            </motion.div>\n          ));}`);
// Actually replacing the map is safer via regex:
// We'll replace the map portion specifically
appContent = appContent.replace(/\{filteredItems\.map\(item => \(([\s\S]*?)\)\)\}/, `{(limit ? filteredItems.slice(0, limit) : filteredItems).map(item => ($1))}`);

appContent = appContent.replace(/<\/motion\.div>\n    <\/motion\.section>/, `</motion.div>\n\n      {limit && filteredItems.length > limit && (\n        <div className="mt-12 flex justify-center">\n          <Link to="/menu" className="glass-panel text-primary border border-primary/30 px-8 py-4 rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary">\n            {t('menu.viewAll')}\n          </Link>\n        </div>\n      )}\n    </motion.section>`);


// Update App component
const appComponentStart = `export default function App() {`;
const routerWrapperStart = `export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {`;

appContent = appContent.replace(appComponentStart, routerWrapperStart);

const homeMenuPages = `
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
`;

appContent = appContent.replace(/export default function App\(\) \{/, homeMenuPages + '\nexport default function App() {');

const mainReplace = `<main className="relative z-10 w-full flex-grow transition-colors duration-500 text-on-surface">
        <Hero t={t} lang={lang} />
        <BentoGrid t={t} />
        <RestaurantMenu t={t} />
      </main>`;
const mainNew = `<main className="relative z-10 w-full flex-grow transition-colors duration-500 text-on-surface">
        <Routes>
          <Route path="/" element={<HomePage t={t} lang={lang} />} />
          <Route path="/menu" element={<MenuPage t={t} />} />
        </Routes>
      </main>`;
appContent = appContent.replace(mainReplace, mainNew);

fs.writeFileSync(appPath, appContent);
console.log('App.tsx and translations.ts updated');
