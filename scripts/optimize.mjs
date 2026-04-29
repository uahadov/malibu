import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.resolve('public', '1.jpg');
const outputPath = path.resolve('public', '1.webp');

async function optimize() {
  try {
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log('Optimized successfully');
    fs.unlinkSync(inputPath);
    console.log('Original deleted');
  } catch (error) {
    console.error('Optimization failed:', error);
  }
}

optimize();
