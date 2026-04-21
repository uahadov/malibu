import sharp from 'sharp';
import { statSync, writeFileSync } from 'fs';

const optimizations = [
  { input: './public/back2.webp', output: './public/back2_new.webp', width: 2560, quality: 80 }, // Hero needs high quality
  { input: './public/logo.webp', output: './public/logo_new.webp', width: 800, quality: 100 },  // Logo must be crisp (High DPI)
  { input: './public/karaoke.webp', output: './public/karaoke_new.webp', width: 1200, quality: 80 },
];

for (const opt of optimizations) {
  try {
    const before = statSync(opt.input).size;
    
    await sharp(opt.input)
      .resize({ 
        width: opt.width, 
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3 // Better quality downscaling
      })
      .webp({ 
        quality: opt.quality, 
        lossless: opt.quality === 100 // Use lossless for logo if requested
      })
      .toFile(opt.output);
    
    const after = statSync(opt.output).size;
    const saving = (((before - after) / before) * 100).toFixed(0);
    console.log(`${opt.input}: ${(before/1024).toFixed(1)}KB → ${(after/1024).toFixed(1)}KB (${saving}% saved)`);
  } catch (err) {
    console.error(`Failed to optimize ${opt.input}:`, err.message);
  }
}

console.log('\nDone! Rename _new files manually or re-run with overwrite.');
