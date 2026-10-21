"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "@phosphor-icons/react/ssr";
import { IMG } from "@/content/media";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";

gsap.registerPlugin(ScrollTrigger);

const INTERVAL = 6500;

// The sharpest wide shots first; each slide names what it shows.
const SLIDES = [
  { image: IMG.gallery[18], method: "Group Reformer", detail: "Small classes", position: "center 30%" },
  { image: IMG.ladderBarrel, method: "Pilates", detail: "Ladder Barrel", position: "center 60%" },
  { image: IMG.trapTable, method: "Pilates", detail: "Trap Table", position: "center 40%" },
  { image: IMG.handsOn, method: "Rolfing®", detail: "Structural Integration", position: "center 40%" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const slides = SLIDES;

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, reduce, slides.length]);

  // The inset frame opens out to full bleed while the photo drifts and the copy lifts away.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.fromTo(frame.current, { clipPath: "inset(0rem 2.5rem 1.5rem 2.5rem round 6px)" }, { clipPath: "inset(0rem 0rem 0rem 0rem round 0px)", ease: "none", duration: 0.4 }, 0)
        .fromTo(inner.current, { yPercent: 0 }, { yPercent: 14, ease: "none", duration: 1 }, 0)
        .to(copy.current, { y: -60, opacity: 0, ease: "none", duration: 0.6 }, 0);
    });
    return () => mm.revert();
  }, []);

  const cap = SLIDES[i];

  return (
    <section ref={section} data-hide-fab className="relative pt-[76px] md:pt-[84px]" aria-label="Welcome">
      <div ref={frame} className="relative h-[calc(100svh-76px)] min-h-[34rem] overflow-hidden bg-brown md:h-[calc(100svh-84px)] md:min-h-[40rem]">
        {/* Photos */}
        <div ref={inner} className="absolute inset-x-0 -top-[7%] h-[114%]">
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
            >
              <Image
                src={cap.image}
                alt=""
                fill
                priority={i === 0}
                placeholder="blur"
                sizes="100vw"
                className="photo object-cover"
                style={{ objectPosition: cap.position }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Warm scrim: heavy at the bottom-left where the type sits, clear elsewhere */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,22,7,0.88)_0%,rgba(38,22,7,0.55)_38%,rgba(38,22,7,0)_72%)]" />
        <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(38,22,7,0.45)_0%,rgba(38,22,7,0)_55%)] md:block" />

        {/* Location tag */}
        <p
          className="hero-in absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[0.8125rem] tracking-[0.06em] text-brown backdrop-blur md:left-16 md:top-8"
          style={{ "--d": "0.9s", "--y": "0px" } as CSSProperties}
        >
          <MapPin aria-hidden weight="fill" className="size-3.5 text-orange-deep" />
          Nyuh Kuning, Ubud
        </p>

        {/* Copy + controls */}
        <div className="absolute inset-x-0 bottom-0">
          <div ref={copy} className="container-x grid gap-8 pb-10 md:px-16 md:pb-16 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <p
          className="hero-in mb-5 text-[0.8125rem] uppercase tracking-[0.14em] text-white/80"
          style={{ "--d": "0.2s", "--y": "10px" } as CSSProperties}
        >
                Pilates · GYROTONIC® · Rolfing®
              </p>
              <RevealText
                as="h1"
                immediate
                delay={0.25}
                text="Premier Ubud Pilates Studio"
                accent={{ 1: "text-orange", 2: "text-orange" }}
                className="text-[clamp(2.9rem,7.6vw,8rem)] leading-[0.95] tracking-[-0.035em] text-white"
              />
              <div
          className="hero-in mt-7 flex flex-col gap-6 md:flex-row md:items-center md:gap-10"
          style={{ "--d": "0.75s", "--y": "14px" } as CSSProperties}
        >
                <p className="max-w-sm text-lg leading-relaxed text-white/85">
                  Three methods under one roof, in Ubud&rsquo;s first fully equipped studio.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button href="/group-class-schedule" variant="light">
                    Book a Class
                  </Button>
                  <Button href={CONTACT.whatsapp} variant="outline-light">
                    Private Session
                  </Button>
                </div>
              </div>
            </div>

            {/* Named slide index */}
            <div
          className="hero-in lg:col-span-4 lg:justify-self-end"
          style={{ "--d": "1s", "--y": "0px" } as CSSProperties}
        >
              <p className="sr-only" aria-live="polite">
                {`Photo ${i + 1} of ${slides.length}: ${cap.method}, ${cap.detail}`}
              </p>
              <div role="tablist" aria-label="Studio photos" className="flex gap-2 lg:w-80 lg:flex-col lg:gap-0">
                {slides.map((_, n) => {
                  const c = SLIDES[n];
                  const active = n === i;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-label={`${c.method}, ${c.detail}`}
                      onClick={() => setI(n)}
                      className="group relative flex min-h-11 flex-1 cursor-pointer items-center text-left lg:flex-none lg:border-t lg:border-white/20 lg:py-2.5"
                    >
                      {/* Progress line (mobile) / top rule (desktop) */}
                      <span className="absolute inset-x-0 top-1/2 h-px overflow-hidden bg-white/30 lg:-top-px lg:bg-transparent">
                        {active && !reduce && (
                          <motion.span
                            key={i}
                            className="absolute inset-0 origin-left bg-orange"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                          />
                        )}
                        {active && reduce && <span className="absolute inset-0 bg-orange" />}
                      </span>
                      <span
                        className={`hidden w-full items-baseline gap-3 transition-colors duration-500 lg:flex ${
                          active ? "text-white" : "text-white/65 group-hover:text-white"
                        }`}
                      >
                        <span className="w-7 font-ui text-[0.8125rem] tabular-nums tracking-[0.06em]">{String(n + 1).padStart(2, "0")}</span>
                        <span className="text-[1.05rem]">{c.method}</span>
                        <span className="ml-auto text-[0.8125rem] text-white/60">{c.detail}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-1 text-[0.8125rem] tracking-[0.06em] text-white/70 lg:hidden">
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-white/40">/</span>
                {cap.method} · {cap.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
