import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('public/Footage Produk');
const assetUrl = (...parts) => `/Footage%20Produk/${parts.map(encodeURIComponent).join('/')}`;
const folders = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && / - ALL$/i.test(entry.name) && !/OLD/i.test(entry.name))
  .map((entry) => entry.name).sort();
const photos = {};
for (const folder of folders) {
  const files = (await readdir(resolve(root, folder)))
    .filter((file) => /\.(png|jpe?g|webp)$/i.test(file)).sort();
  if (!files.length) throw new Error(`No photos in ${folder}`);
  photos[folder.replace(/ - ALL$/i, '')] = files.map((file) => assetUrl(folder, file));
}

// Prefer descriptive filenames when the same video was supplied more than once.
const hashes = new Set();
const videos = [];
for (const file of (await readdir(resolve(root, 'VIDEO'))).filter((file) => /\.mp4$/i.test(file)).sort()) {
  const hash = createHash('sha256').update(await readFile(resolve(root, 'VIDEO', file))).digest('hex');
  if (hashes.has(hash)) continue;
  hashes.add(hash);
  videos.push({
    title: file.replace(/\.mp4$/i, '').replace('Video Pintu Kaca MAM - ', 'Pintu kaca — cuplikan '),
    src: assetUrl('VIDEO', file),
    poster: `/video-posters/${hash.slice(0, 12)}.jpg`,
  });
}
await writeFile('lib/product-media.json', JSON.stringify(photos, null, 2) + '\n');
await writeFile('lib/portfolio-videos.json', JSON.stringify(videos, null, 2) + '\n');
console.log(`${folders.length} products, ${Object.values(photos).flat().length} photos, ${videos.length} unique videos`);
