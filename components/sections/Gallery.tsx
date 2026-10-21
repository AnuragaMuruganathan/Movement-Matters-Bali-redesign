"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react/ssr";

type Props = {
  images: StaticImageData[];
  alt: string;
  /** Masonry column classes (layout="masonry"). */
  columns?: string;
  /** "grid" crops every photo to the same 3:2 frame for an even, calm grid. */
  layout?: "masonry" | "grid";
};

export function Gallery({ images, alt, columns = "columns-2 md:columns-3 lg:columns-4", layout = "masonry" }: Props) {
  const grid = layout === "grid";
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <ul className={grid ? "grid grid-cols-2 gap-2 lg:grid-cols-3 max-lg:[&>li:last-child:nth-child(odd)]:col-span-2" : `${columns} gap-2 [&>li]:mb-2`}>
        {images.map((img, i) => (
          <li key={img.src} className={grid ? "" : "break-inside-avoid"}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group block w-full cursor-zoom-in overflow-hidden ${grid ? "relative aspect-[3/2]" : ""}`}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                sizes={grid ? "(min-width: 1024px) 33vw, 50vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"}
                placeholder="blur"
                fill={grid}
                className={`photo transition-transform duration-1000 group-hover:scale-[1.04] ${grid ? "object-cover" : "h-auto w-full"}`}
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/97 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-[80vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[index]} alt={`${alt} ${index + 1}`} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 grid size-12 cursor-pointer place-items-center border border-line bg-white text-brown hover:border-brown">
              <X weight="bold" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center border border-line bg-white text-brown hover:border-brown"
            >
              <CaretLeft weight="bold" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center border border-line bg-white text-brown hover:border-brown"
            >
              <CaretRight weight="bold" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted">
              {index + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
