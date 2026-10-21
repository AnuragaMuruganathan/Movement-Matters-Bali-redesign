import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

/** Title left, short lead right on desktop, so heading rows use the full width. */
export function SectionHeading({ title, lead, className = "" }: { title: string; lead?: ReactNode; className?: string }) {
  return (
    <div className={`mb-10 grid gap-4 md:mb-12 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <RevealText text={title} className="h-section lg:col-span-7" />
      {lead && (
        <Reveal delay={0.15} className="lg:col-span-5 lg:justify-self-end">
          <p className="max-w-md text-lg leading-relaxed text-brown-soft">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
