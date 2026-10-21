// Trims the white Instagram-style frame from gallery PNGs and saves them as JPG.
// Usage: node scripts/trim-frames.mjs
import sharp from "sharp";
import { readdir, unlink } from "node:fs/promises";
import { join } from "node:path";

const dir = join(process.cwd(), "assets", "images", "gallery");
for (const f of (await readdir(dir)).filter((f) => f.endsWith(".png"))) {
  const src = join(dir, f);
  const out = src.replace(/\.png$/, ".jpg");
  const info = await sharp(src).trim({ background: "#ffffff", threshold: 18 }).flatten({ background: "#ffffff" }).jpeg({ quality: 88 }).toFile(out);
  await unlink(src);
  console.log(`${f} -> ${info.width}x${info.height}`);
}

// Trim the padding around the header logo so it can render larger in the same height.
const logo = join(process.cwd(), "assets", "images", "logo-wordmark.png");
const trimmed = await sharp(logo).trim({ threshold: 10 }).png().toBuffer({ resolveWithObject: true });
await sharp(trimmed.data).toFile(logo);
console.log(`logo-wordmark.png -> ${trimmed.info.width}x${trimmed.info.height}`);
