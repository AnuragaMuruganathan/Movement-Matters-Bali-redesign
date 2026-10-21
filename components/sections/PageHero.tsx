import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";

type Props = {
  title: string;
  lead?: ReactNode;
  /** Optional: pages without a fitting photograph get a type-only hero. */
  image?: StaticImageData;
  actions?: ReactNode;
  aside?: ReactNode;
  position?: string;
};

/** Type on white, then a full-bleed photograph beneath it. The lead column always sits on the title's baseline. */
export function PageHero({ title, lead, image, actions, aside, position = "center" }: Props) {
  return (
    <section data-hide-fab className={`pt-[76px] md:pt-[84px] ${image ? "" : "border-b border-line"}`}>
      <div className="container-x grid gap-8 pb-10 pt-10 md:pb-12 md:pt-16 lg:grid-cols-12 lg:items-end lg:gap-10">
        <RevealText as="h1" immediate text={title} className="h-display lg:col-span-8" />
        <Reveal delay={0.35} className="lg:col-span-4 lg:pb-3">
          {aside && <div className="mb-6">{aside}</div>}
          {lead && <p className="max-w-md text-lg leading-relaxed text-brown-soft md:text-xl">{lead}</p>}
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </Reveal>
      </div>
      {image && (
        <ImageReveal src={image} priority immediate sizes="100vw" position={position} className="aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[21/8]" />
      )}
    </section>
  );
}
