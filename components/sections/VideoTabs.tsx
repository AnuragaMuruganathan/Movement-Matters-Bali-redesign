"use client";

import type { StaticImageData } from "next/image";
import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

type Item = { label: string; src: string; poster: StaticImageData; position?: string };

export function VideoTabs({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Videos" className="mb-5 flex flex-wrap gap-x-6 border-b border-line">
        {items.map((it, n) => (
          <button
            key={it.label}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={`-mb-px min-h-12 cursor-pointer border-b text-lg transition-colors ${n === i ? "border-orange text-brown" : "border-transparent text-muted hover:text-brown"}`}
          >
            {it.label}
          </button>
        ))}
      </div>
      <VideoPlayer key={items[i].src} src={items[i].src} poster={items[i].poster} position={items[i].position} title={items[i].label} className="aspect-video" sizes="(min-width: 1024px) 60vw, 100vw" />
    </div>
  );
}
