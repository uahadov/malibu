import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const files = readdirSync(PUBLIC_DIR);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue;

  const inputPath = join(PUBLIC_DIR, file);
  const stat = statSync(inputPath);
  const sizeMB = (stat.size / 1024 / 1024).toFixed(2);
  const name = basename(file, ext);
  const outputPath = join(PUBLIC_DIR, `${name}.webp`);

  console.log(`Converting ${file} (${sizeMB} MB) -> ${name}.webp`);

  await sharp(inputPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(outputPath);

  const outStat = statSync(outputPath);
  const outSizeMB = (outStat.size / 1024 / 1024).toFixed(2);
  console.log(`  -> ${outSizeMB} MB (saved ${(((stat.size - outStat.size) / stat.size) * 100).toFixed(0)}%)`);
}

console.log('\nDone! All images converted to WebP.');
