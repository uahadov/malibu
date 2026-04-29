import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimize(fileName) {
  const inputPath = path.resolve('public', `${fileName}.jpg`);
  const outputPath = path.resolve('public', `${fileName}.webp`);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`${inputPath} does not exist.`);
    return;
  }

  try {
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Optimized ${fileName} successfully`);
    fs.unlinkSync(inputPath);
  } catch (error) {
    console.error(`Optimization failed for ${fileName}:`, error);
  }
}

async function run() {
  await optimize('2');
  await optimize('3');
}

run();
