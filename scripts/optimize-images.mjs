// Resizes and recompresses the source photos in assets/images so the repo and the
// Vercel deployment stay small. next/image still serves WebP at the right width;
// this only caps what we store. Safe to re-run: files already within limits are skipped
// unless recompressing saves at least 10%.
// Usage: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";

const dir = join(process.cwd(), "assets", "images");
const MAX_LANDSCAPE_W = 2048; // largest next/image deviceSize we serve
const MAX_PORTRAIT_H = 1800; // portraits never render taller than ~1 viewport at 2x

async function* walk(d) {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let before = 0;
let after = 0;
for await (const file of walk(dir)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const input = await readFile(file);
  const { width, height } = await sharp(input).metadata();
  const portrait = height > width;
  const resize = portrait ? { height: Math.min(height, MAX_PORTRAIT_H) } : { width: Math.min(width, MAX_LANDSCAPE_W) };
  const img = sharp(input).rotate().resize({ ...resize, withoutEnlargement: true });
  const output = ext === ".png" ? await img.png({ compressionLevel: 9, effort: 10 }).toBuffer() : await img.jpeg({ quality: 80, mozjpeg: true, progressive: true }).toBuffer();
  before += input.length;
  if (output.length < input.length * 0.9) {
    await writeFile(file, output);
    after += output.length;
    const meta = await sharp(output).metadata();
    console.log(`${file.slice(dir.length + 1).padEnd(32)} ${(input.length / 1024).toFixed(0).padStart(5)} KB -> ${(output.length / 1024).toFixed(0).padStart(4)} KB  ${meta.width}x${meta.height}`);
  } else after += (await stat(file)).size;
}
console.log(`\nTotal ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
