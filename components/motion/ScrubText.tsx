"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Large statement whose words darken one by one as you scroll through it. */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = ref.current!.querySelectorAll("[data-w]");
      gsap.fromTo(
        words,
        { opacity: 0.4 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 85%", end: "bottom 65%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className="inline">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
