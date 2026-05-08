import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.join(__dirname, '../public/images/leaders');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.google.com/'
};

const leaders = [
  { name: 'president-murmu.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/e/e3/Droupadi_Murmu_official_portrait_2022.jpg' },
  { name: 'pm-modi.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/c/c4/Narendra_Modi_Official_Portrait_2022.jpg' },
  { name: 'amit-shah.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/1/1d/Amit_Shah_2023.jpg' },
  { name: 'nirmala-sitharaman.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/d/d1/Smt._Nirmala_Sitharaman%2C_Hon%27ble_Finance_Minister_of_India.jpg' },
  { name: 's-jaishankar.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/b/b0/S._Jaishankar_official_portrait%2C_2023.jpg' },
  { name: 'yogi-adityanath.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/e/e0/Yogi_Adityanath_Official_Portrait.jpg' },
  { name: 'devendra-fadnavis.jpg', url: 'https://cdn.statically.io/img/upload.wikimedia.org/wikipedia/commons/f/f1/Devendra_Fadnavis_2019_Official_Portrail.jpg' }
];

async function download(leader) {
  try {
    console.log(`Downloading ${leader.name}...`);
    const response = await fetch(leader.url, { headers });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(path.join(targetDir, leader.name), Buffer.from(buffer));
    console.log(`Successfully saved ${leader.name}`);
  } catch (error) {
    console.error(`Failed to download ${leader.name}:`, error.message);
  }
}

async function main() {
  for (const leader of leaders) {
    await download(leader);
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
  }
}

main();
