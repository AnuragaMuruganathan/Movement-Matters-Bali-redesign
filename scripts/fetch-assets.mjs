// Downloads the original Movement Matters Bali images into assets/images (imported by next/image)
// and the PDFs/favicon, which are linked by URL, into public/assets.
// Videos are streamed from the original host (see MEDIA_BASE in content/site.ts).
// Usage: node scripts/fetch-assets.mjs
import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://movementmatters-bali.com/wp-content/uploads/";
const IMAGES = join(process.cwd(), "assets", "images");
const PUBLIC = join(process.cwd(), "public", "assets");
const outDir = (name) => (name.endsWith(".pdf") || name === "logo-icon.png" ? PUBLIC : IMAGES);

// [source path, local name]. Large photos use WP's "-scaled" (2560px) version.
const ASSETS = [
  ["2015/10/12d583_41d261916a064c8e911d109d7db43659.png_400.png", "logo-wordmark.png"],
  ["2020/05/cropped-Logo_Color_3-01.png", "logo-icon.png"],
  ["2013/05/12d583_84fe6a1be62c443cb9d3f7b339124339.jpg_srz_1423_948_75_22_0.5_1.2_75_jpg_srz.jpg", "slide-1.jpg"],
  ["2015/10/SLIDER2.jpg", "slide-2.jpg"],
  ["2015/10/SLIDE3.jpg", "slide-3.jpg"],
  ["2015/10/SLIDER4.jpg", "slide-4.jpg"],
  ["2015/10/slide5.jpg", "slide-5.jpg"],
  ["2026/06/Ubud-May-2026-53-scaled.jpg", "team.jpg", "2026/06/Ubud-May-2026-53-1024x683.jpg"],
  ["2026/06/Photo-6-4-26-8-16-33-AM-scaled.jpg", "sook-fun-chen.jpg"],
  ["2026/06/Ubud-May-2026-60-scaled.jpg", "irene-widjaja.jpg"],
  ["2026/06/Ubud-May-2026-62-scaled.jpg", "ratna-swastika.jpg"],
  ["2026/06/Ubud-May-2026-65-scaled.jpg", "ray-subrata.jpg"],
  ["2026/08/1000059865-1-scaled.jpg", "pei-khoek.jpg"],
  ["2026/06/Ubud-May-2026-68-scaled.jpg", "dewi.jpg"],
  ["2022/04/ubud-pilates-min2.jpg", "ubud-pilates.jpg"],
  ["2019/05/IMG_2123-e1470996635983.jpg", "group-class.jpg"],
  ["2019/05/IMG_1998-e1471007957542.jpg", "gyrotonic.jpg"],
  ["2019/05/rolfing.jpg", "rolfing.jpg"],
  ["2015/10/12d583_d549d0a3bc444158b744a4378b75ec04.jpg", "studio.jpg"],
  ["2016/09/studiosign.jpg", "studio-sign.jpg"],
  ["2019/01/studioentrance2.jpg", "studio-entrance.jpg"],
  ["2020/05/New-BH_Logo_Tagline_CMYK.png", "body-harmonics-logo.png"],
  ["2016/03/balanced-body-logo-100904b.png", "balanced-body-logo.png"],
  ["2019/02/Hello-Bali01-1.jpg", "press-1.jpg"],
  ["2019/02/HelloBali02-1.jpg", "press-2.jpg"],
  ["2019/02/HelloBali03-1.jpg", "press-3.jpg"],
  ["2024/03/Equipment-Rental-TC-2024.pdf", "equipment-rental-tc.pdf"],
  ["2024/10/BODY-HARMONICS-PAGE-LINK.pdf", "body-harmonics-catalogue.pdf"],
  ...[
    "2023/10/25.png", "2023/10/IMG_1724.jpg", "2023/10/p44.jpg",
    "2023/10/Screen-Shot-2020-05-16-at-11.12.23.png", "2023/10/47.png", "2023/10/56.png",
    "2023/10/p05.jpg", "2023/10/IMG_2182.jpg", "2023/10/IMG_1721.jpg", "2023/10/pil1.jpg",
    "2023/10/IMG_2153.jpg", "2023/10/45.png", "2023/10/Screen-Shot-2020-05-16-at-11.11.30.png",
    "2023/10/21.png", "2023/10/33.png", "2023/10/IMG_1733.jpg",
    "2018/01/IMG_1709.jpg", "2018/01/IMG_2144.jpg", "2018/01/IMG_1038.jpg",
  ].map((p, i) => [p, `gallery/reformer-${String(i + 1).padStart(2, "0")}${p.slice(p.lastIndexOf("."))}`]),
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(src) {
  const res = await fetch(ORIGIN + src, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${src}`);
  return Buffer.from(await res.arrayBuffer());
}

let failed = 0;
for (const [src, name, fallback] of ASSETS) {
  const dest = join(outDir(name), name);
  if (await exists(dest)) continue;
  await mkdir(dirname(dest), { recursive: true });
  try {
    let buf;
    try {
      buf = await download(src);
    } catch (err) {
      if (!fallback) throw err;
      buf = await download(fallback);
    }
    await writeFile(dest, buf);
    console.log(`ok   ${name} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${name}: ${err.message}`);
  }
}
process.exitCode = failed ? 1 : 0;
