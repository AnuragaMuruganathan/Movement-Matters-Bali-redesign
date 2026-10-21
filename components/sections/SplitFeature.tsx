import type { StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

type Props = {
  image?: StaticImageData;
  media?: ReactNode;
  children: ReactNode;
  reverse?: boolean;
  bg?: string;
  position?: string;
};

// The text column keeps the page container's outer edge, so it lines up with everything above and below.
const EDGE = "max(2.5rem, calc((100vw - 90rem) / 2 + 2.5rem))";

/** Edge-to-edge image on one half, content on the other: no dead margins. */
export function SplitFeature({ image, media, children, reverse = false, bg = "bg-white", position = "center" }: Props) {
  return (
    <section className={`${bg} border-y border-line`}>
      <div className="grid lg:grid-cols-2">
        <div className={`relative min-h-[22rem] md:min-h-[32rem] ${reverse ? "lg:order-2" : ""}`}>
          {media ?? (image && <ImageReveal src={image} position={position} sizes="(min-width: 1024px) 50vw, 100vw" className="!absolute inset-0" />)}
        </div>
        <div
          className={`flex flex-col justify-center px-5 py-12 md:px-10 md:py-16 ${
            reverse ? "lg:order-1 lg:pl-[var(--edge)] lg:pr-16 xl:pr-24" : "lg:pl-16 lg:pr-[var(--edge)] xl:pl-24"
          }`}
          style={{ "--edge": EDGE } as CSSProperties}
        >
          <Reveal className="max-w-xl">{children}</Reveal>
        </div>
      </div>
    </section>
  );
}
