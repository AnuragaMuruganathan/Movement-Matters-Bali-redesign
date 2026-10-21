// Builds the header logo from logo-wordmark.png without the small tagline under the rule,
// which is unreadable at header size (~5px). The footer keeps the full lockup.
// Usage: node scripts/make-logo-header.mjs (run after trim-frames.mjs)
import sharp from "sharp";
import { join } from "node:path";

const dir = join(process.cwd(), "assets", "images");
const { data, info } = await sharp(join(dir, "logo-wordmark.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;

// The thin grey rule above the tagline: the lowest-half row that is mostly grey ink.
let rule = h;
for (let y = Math.floor(h * 0.6); y < h; y++) {
  let grey = 0;
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a > 0 && r < 225 && Math.max(r, g, b) - Math.min(r, g, b) < 20) grey++;
  }
  if (grey > w * 0.6) {
    rule = y;
    break;
  }
}

const out = join(dir, "logo-header.png");
const cropped = await sharp(join(dir, "logo-wordmark.png")).extract({ left: 0, top: 0, width: w, height: rule - 2 }).png().toBuffer();
const info2 = await sharp(cropped).trim({ threshold: 10 }).png({ compressionLevel: 9 }).toFile(out);
console.log(`logo-header.png -> ${info2.width}x${info2.height} (cut at rule row ${rule})`);
