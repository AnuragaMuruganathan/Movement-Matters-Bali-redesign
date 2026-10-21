import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

type Props = {
  src: StaticImageData;
  alt?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  position?: string;
  delay?: number;
  /** Above-the-fold photo: visible at once with a gentle settle, so it never delays LCP. */
  immediate?: boolean;
};

/** Photo that wipes open from the bottom while settling from a slight zoom. */
export function ImageReveal({ src, alt = "", sizes, className = "", imgClassName = "", priority, position, delay = 0, immediate = false }: Props) {
  const trigger = immediate ? { "data-reveal-now": "image" } : { "data-reveal": "image" };
  return (
    <div {...trigger} className={`relative overflow-hidden bg-sand ${className}`} style={{ "--d": `${delay}s` } as CSSProperties}>
      <div className="ir-in absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={`photo object-cover ${imgClassName}`}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    </div>
  );
}
