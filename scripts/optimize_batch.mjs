import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const filesToOptimize = [
  '4-k.png',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg'
];

async function optimize(fileName) {
  const inputPath = path.resolve('public', fileName);
  const nameWithoutExt = path.parse(fileName).name;
  const outputPath = path.resolve('public', `${nameWithoutExt}.webp`);
  
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
  for (const file of filesToOptimize) {
    await optimize(file);
  }
}

run();
