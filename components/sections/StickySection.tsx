import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

type Props = {
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  bg?: string;
};

/** Sticky title column on the left, content on the right: no dead space beside short headings. */
export function StickySection({ title, lead, actions, children, bg = "bg-white" }: Props) {
  return (
    <section className={`section ${bg}`}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <RevealText text={title} className="h-section" />
            {lead && (
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-sm text-lg leading-relaxed text-brown-soft">{lead}</p>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={0.25} className="mt-7 flex flex-wrap gap-3">
                {actions}
              </Reveal>
            )}
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
