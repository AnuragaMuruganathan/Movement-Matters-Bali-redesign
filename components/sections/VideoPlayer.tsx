"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Play } from "@phosphor-icons/react/ssr";

type Props = {
  src: string;
  poster: StaticImageData;
  title: string;
  className?: string;
  sizes?: string;
  /** object-position for the poster crop */
  position?: string;
};

/** Poster-first video: the (large) MP4 only loads once the visitor presses play. */
export function VideoPlayer({ src, poster, title, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", position }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-brown ${className}`}>
      {playing ? (
        <video src={src} controls autoPlay playsInline className="absolute inset-0 size-full bg-black object-contain" aria-label={title} />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 cursor-pointer" aria-label={`Play video: ${title}`}>
          <Image src={poster} alt="" fill sizes={sizes} className="photo object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" placeholder="blur" style={position ? { objectPosition: position } : undefined} />
          <span className="absolute inset-0 bg-brown/25 transition-colors duration-500 group-hover:bg-brown/10" />
          <span className="absolute bottom-0 left-0 flex max-w-[calc(100%-1rem)] items-center gap-4 bg-white py-3 pl-3 pr-6 text-left text-brown">
            <span className="grid size-11 place-items-center bg-brown text-white transition-colors duration-300 group-hover:bg-orange">
              <Play aria-hidden weight="fill" className="size-4" />
            </span>
            <span className="text-[1.05rem]">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
