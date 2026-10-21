# Movement Matters Bali

Next.js 16 rebuild of movementmatters-bali.com (App Router, Tailwind v4, Motion, GSAP, Lenis).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # all routes prerender as static pages
```

## Content

- Copy and data live in `content/` (`site.ts` for contact, hours and nav; `instructors.ts`, `schedule.ts`, `pricing.ts`, `courses.ts`).
- The weekly timetable is `content/schedule.ts`. Prices are `content/pricing.ts`.
- Photos and logos are in `assets/images/` (imported through `content/media.ts`, so `next/image` bundles and optimises them). Only files linked by URL (PDFs, favicon, `og.jpg`) live in `public/assets/`. Don't put imported images in `public/`, or every photo ships twice.
- `npm run assets` re-downloads the originals from the WordPress site, trims the white frames off the gallery photos and runs `scripts/optimize-images.mjs`, which caps photos at 2048px wide (1800px tall for portraits) and recompresses them.
- Videos (≈650 MB) stream from the WordPress uploads folder via `MEDIA_BASE` in `content/site.ts`. Move them to a CDN and update that constant before the WordPress site is retired.
- Pages not rebuilt yet (specialised programs, Body Harmonics levels, registration forms, FAQ, blog posts) link to the live WordPress URLs through `legacy()` in `content/site.ts`.
- The contact form has no backend: it opens a pre-filled WhatsApp message or email draft.

## Design

- Clean, minimal system: white and warm off-white (`bone`) canvases, 1px hairlines, crisp 4px buttons, brand colours used only as accents.
- One typeface everywhere: Marcellus (closest Google match to the logo wordmark).
- Motion: word-by-word headline reveals, photo wipe reveals, a pinned horizontal services scroll (desktop), scroll-scrubbed statement text, counters and a text marquee. All of it respects `prefers-reduced-motion`.
- Icons: Phosphor (bold). Tokens live in `app/globals.css`.
- URLs keep the WordPress slugs and trailing slashes (`trailingSlash: true`).
