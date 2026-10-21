// Builds a transparent logo for dark backgrounds from logo-wordmark.png.
// The white around the circles is removed (but not the white figures inside them),
// and the grey tagline and rule are recoloured to cream so they read on dark.
// Usage: node scripts/make-logo-reverse.mjs (run after trim-frames.mjs)
import sharp from "sharp";
import { join } from "node:path";

const dir = join(process.cwd(), "assets", "images");
const { data, info } = await sharp(join(dir, "logo-wordmark.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const at = (x, y) => (y * w + x) * 4;

// Rows below the circles hold only lettering on white.
let textTop = h;
for (let y = h - 1, seenGap = false; y >= 0; y--) {
  let coloured = false;
  for (let x = 0; x < w && !coloured; x++) {
    const i = at(x, y);
    coloured = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) > 60;
  }
  if (!coloured && !seenGap && y < h * 0.8) seenGap = true;
  if (coloured && seenGap) {
    textTop = y + 4;
    break;
  }
}

// Flood-fill the near-white background from the image edges.
const whiteish = (i) => Math.min(data[i], data[i + 1], data[i + 2]) >= 225;
const bg = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push([x, 0], [x, h - 1]);
for (let y = 0; y < h; y++) stack.push([0, y], [w - 1, y]);
while (stack.length) {
  const [x, y] = stack.pop();
  if (x < 0 || y < 0 || x >= w || y >= h || bg[y * w + x] || !whiteish(at(x, y))) continue;
  bg[y * w + x] = 1;
  stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}
const nearBg = (x, y) => {
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < w && ny < h && bg[ny * w + nx]) return true;
    }
  return false;
};

// Un-premultiply a pixel from white so anti-aliased edges keep their colour.
const fromWhite = (i) => {
  // Solid fills (≥100 away from white) stay opaque in their true colour; only blends fade.
  const a = Math.min(1, Math.max(255 - data[i], 255 - data[i + 1], 255 - data[i + 2]) / 100);
  if (a <= 0) return void (data[i + 3] = 0);
  for (let c = 0; c < 3; c++) data[i + c] = Math.max(0, Math.round((data[i + c] - 255 * (1 - a)) / a));
  data[i + 3] = Math.round(a * 255);
};

const CREAM = [245, 238, 228];
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = at(x, y);
    if (y >= textTop) {
      const grey = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]) < 30;
      if (grey) {
        const a = (255 - (data[i] + data[i + 1] + data[i + 2]) / 3) / 255;
        [data[i], data[i + 1], data[i + 2]] = CREAM;
        data[i + 3] = Math.round(Math.min(1, a * 1.6) * 255);
      } else fromWhite(i);
    } else if (bg[y * w + x]) data[i + 3] = 0;
    else if (nearBg(x, y)) fromWhite(i);
  }
}

const out = join(dir, "logo-wordmark-reverse.png");
await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toFile(out);
console.log(`logo-wordmark-reverse.png -> ${w}x${h}, text from row ${textTop}`);
