import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Fades and lifts in when scrolled into view (see RevealObserver and the [data-reveal] rules in globals.css). */
export function Reveal({ children, className, delay = 0, y = 14, as: Comp = "div" }: Props) {
  return (
    <Comp data-reveal="" className={className} style={{ "--d": `${delay}s`, "--y": `${y}px` } as CSSProperties}>
      {children}
    </Comp>
  );
}
