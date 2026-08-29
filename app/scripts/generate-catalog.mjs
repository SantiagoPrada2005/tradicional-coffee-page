import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://tradicional-coffee.shop';
const DEFAULT_IMAGE = `${BASE_URL}/images/logo.webp`;

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
}

function escapeCsv(text) {
  if (text === null || text === undefined) return '""';
  const str = String(text).replace(/"/g, '""').trim();
  return `"${str}"`;
}

function extractObjects(content) {
  const objects = [];
  let braceDepth = 0;
  let currentStart = -1;

  for (let i = 0; i < content.length; i++) {
    if (content[i] === '{' && (i === 0 || (content[i - 1] !== '$' && content[i - 1] !== '\\'))) {
      if (braceDepth === 0) {
        currentStart = i;
      }
      braceDepth++;
    } else if (content[i] === '}') {
      braceDepth--;
      if (braceDepth === 0 && currentStart !== -1) {
        objects.push(content.substring(currentStart, i + 1));
        currentStart = -1;
      }
    }
  }
  return objects;
}

function parseProductsFromSource(filePath, defaultCategory = 'coffee') {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const rawBlocks = extractObjects(content);
  const products = [];

  for (const block of rawBlocks) {
    const idMatch = block.match(/id:\s*(\d+)/);
    const nameMatch = block.match(/name:\s*["']([^"']+)["']/);
    const descMatch = block.match(/description:\s*["']([^"']+)["']/);
    const priceMatch = block.match(/price:\s*["']([^"']+)["']/);
    const imageMatch = block.match(/image:\s*["']([^"']*)["']/);
    const categoryMatch = block.match(/category:\s*["']([^"']+)["']/);

    if (idMatch && nameMatch && priceMatch) {
      products.push({
        id: idMatch[1],
        name: nameMatch[1],
        description: descMatch ? descMatch[1] : '',
        price: priceMatch[1],
        image: imageMatch ? imageMatch[1] : '',
        category: categoryMatch ? categoryMatch[1] : defaultCategory
      });
    }
  }
  return products;
}

async function generateCatalog() {
  const productsFile = path.resolve(__dirname, '../src/data/products.ts');
  const frappesFile = path.resolve(__dirname, '../src/data/frappes.ts');

  const exploreList = parseProductsFromSource(productsFile);
  const orderList = parseProductsFromSource(frappesFile, 'frappe');

  // Map to deduplicate by ID, prioritizing orderList details if present
  const productMap = new Map();
  for (const item of exploreList) {
    productMap.set(item.id, item);
  }
  for (const item of orderList) {
    productMap.set(item.id, { ...(productMap.get(item.id) || {}), ...item });
  }

  const allProducts = Array.from(productMap.values());

  const headers = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'link',
    'image_link',
    'brand',
    'item_group_id'
  ];

  const rows = [headers.join(',')];

  for (const p of allProducts) {
    const numericPrice = parsePrice(p.price);
    const itemPrice = `${numericPrice} COP`;
    const itemLink = p.category === 'frappe' ? `${BASE_URL}/order` : `${BASE_URL}/menu#prod-${p.id}`;
    const imageLink = p.image && p.image.trim().length > 0 ? `${BASE_URL}${p.image}` : DEFAULT_IMAGE;

    const row = [
      p.id,
      escapeCsv(p.name),
      escapeCsv(p.description || `${p.name} en Tradicional Coffee`),
      'in stock',
      'new',
      itemPrice,
      escapeCsv(itemLink),
      escapeCsv(imageLink),
      escapeCsv('Tradicional Coffee'),
      escapeCsv(p.category)
    ];
    rows.push(row.join(','));
  }

  const outDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outputPath = path.join(outDir, 'catalog.csv');
  fs.writeFileSync(outputPath, rows.join('\n'), 'utf-8');
  console.log(`[Meta Catalog] Generated ${outputPath} with ${allProducts.length} items.`);
}

generateCatalog();
