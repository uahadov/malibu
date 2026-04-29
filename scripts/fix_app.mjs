import fs from 'fs';
import path from 'path';

const appPath = path.resolve('src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf-8');

const regex = /<AnimatePresence mode="popLayout">[\s\S]*?<\/AnimatePresence>/;

const correctCode = `<AnimatePresence mode="popLayout">
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
                <img src={item.image.includes('unsplash') ? \`\${item.image}&fm=webp\` : item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" loading="lazy" width="400" height="400" />
              </div>
               <div className="flex flex-col flex-grow justify-center py-1">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-headline text-lg sm:text-xl text-on-surface leading-tight">
                    {t(\`menu.items.\${item.name}.name\`)}
                  </h3>
                  <span className="text-primary font-headline text-lg sm:text-xl whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-on-surface-variant text-sm sm:text-base font-light leading-snug line-clamp-2">
                  {t(\`menu.items.\${item.name}.description\`)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>`;

content = content.replace(regex, correctCode);
fs.writeFileSync(appPath, content);
