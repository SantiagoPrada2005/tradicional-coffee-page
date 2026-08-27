import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');

// Mapping of custom normalized output names if needed
const NAME_MAP = {
  'latte-pequeño.jpeg': 'latte-pequeno.webp',
  'frappe-oreo -fondoblanco.jpeg': 'frappe-oreo-fondoblanco.webp',
  'frappe-techai.jpeg': 'frappe-te-chai.webp',
};

async function optimizeImage(filePath, relativePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return null;

  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  
  let targetName = NAME_MAP[fileName] || `${path.parse(fileName).name}.webp`;
  const targetPath = path.join(dirName, targetName);

  const initialStat = fs.statSync(filePath);
  const initialSize = initialStat.size;

  const image = sharp(filePath);
  const metadata = await image.metadata();

  // Determine max width based on usage
  let maxWidth = 800; // default for product cards
  let quality = 80;

  if (fileName.includes('fondo-hero')) {
    maxWidth = 1600;
    quality = 80;
  } else if (fileName.includes('hero') || fileName.includes('3d')) {
    maxWidth = 1200;
    quality = 82;
  } else if (fileName.includes('logo')) {
    maxWidth = 500;
    quality = 90;
  }

  let transform = image.rotate(); // auto-rotate based on EXIF

  if (metadata.width && metadata.width > maxWidth) {
    transform = transform.resize({ width: maxWidth, withoutEnlargement: true });
  }

  // Convert to webp
  const buffer = await transform
    .webp({ quality, effort: 6 })
    .toBuffer();

  // If replacing same file path, write safely
  const tempPath = targetPath + '.tmp';
  fs.writeFileSync(tempPath, buffer);

  // If target is different from source, remove source unless it was already target
  if (filePath !== targetPath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.renameSync(tempPath, targetPath);

  const finalStat = fs.statSync(targetPath);
  const finalSize = finalStat.size;

  return {
    source: relativePath,
    target: path.relative(IMAGES_DIR, targetPath),
    initialSize,
    finalSize,
    reduction: (((initialSize - finalSize) / initialSize) * 100).toFixed(1)
  };
}

async function run() {
  console.log('🚀 Starting image optimization in', IMAGES_DIR);

  function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.startsWith('.') || file.endsWith('.tmp')) continue;
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, fileList);
      } else {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const allFiles = getAllFiles(IMAGES_DIR);
  let totalInitial = 0;
  let totalFinal = 0;
  const results = [];

  for (const file of allFiles) {
    const rel = path.relative(IMAGES_DIR, file);
    try {
      const result = await optimizeImage(file, rel);
      if (result) {
        results.push(result);
        totalInitial += result.initialSize;
        totalFinal += result.finalSize;
        console.log(
          `✓ ${result.source.padEnd(35)} -> ${result.target.padEnd(30)} | ${(result.initialSize / 1024).toFixed(1)} KB -> ${(result.finalSize / 1024).toFixed(1)} KB (-${result.reduction}%)`
        );
      }
    } catch (err) {
      console.error(`✗ Error processing ${rel}:`, err.message);
    }
  }

  console.log('\n=======================================');
  console.log(`🎉 Optimization Complete!`);
  console.log(`Original total size: ${(totalInitial / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(totalFinal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total space saved:    ${(((totalInitial - totalFinal) / totalInitial) * 100).toFixed(1)}%`);
  console.log('=======================================\n');
}

run();
