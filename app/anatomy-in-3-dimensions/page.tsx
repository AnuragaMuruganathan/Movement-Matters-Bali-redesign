import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { StickySection } from "@/components/sections/StickySection";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { legacy } from "@/content/site";

export const metadata: Metadata = {
  title: "Anatomy in Three Dimensions™",
  description: "Balanced Body® Anatomy in Three Dimensions™ in Bali: build muscles in clay on a model skeleton. 21-hour comprehensive course.",
};

const AUDIENCE = ["Pilates & yoga instructors", "Movement educators", "Personal & athletic trainers", "Health care professionals", "Bodywork therapists", "Fitness enthusiasts"];

export default function AI3DPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[15]}
        position="center 12%"
        title="Anatomy in Three Dimensions™"
        lead="Beyond anatomy. Build the body's muscles in clay, layer by layer, and see movement in a whole new way."
        actions={
          <>
            <Button href={legacy("teacher-training-course-calendar")}>Course Calendar</Button>
            <Button href={legacy("continuing-education-registration-form")} variant="outline">
              Register
            </Button>
          </>
        }
        aside={<Image src={IMG.bbLogo} alt="Balanced Body" className="h-12 w-auto" sizes="200px" />}
      />

      <StickySection title="For beginners and anatomy nerds" lead="Hands-on, personal and rich in meaning. Learn how muscles coordinate so we move the way we move.">
        <Reveal className="relative aspect-video overflow-hidden bg-sand">
          <iframe
            src="https://www.youtube-nocookie.com/embed/qW0KGHSFIkY"
            title="Anatomy in Three Dimensions on YouTube"
            className="absolute inset-0 size-full"
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Reveal>
        <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
          {AUDIENCE.map((a, i) => (
            <Reveal as="li" key={a} delay={(i % 2) * 0.05} className="flex gap-5 border-b border-line py-4 text-lg">
              <span className="w-6 shrink-0 pt-1 text-sm tabular-nums text-teal-deep">0{i + 1}</span>
              {a}
            </Reveal>
          ))}
        </ul>
      </StickySection>

      <section className="section border-t border-line bg-bone">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <RevealText text="Comprehensive Course" className="h-section" />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl text-lg text-brown-soft">
                Pelvis, legs, abdominals, spine, back and shoulder girdle, built from the deep muscles out, with movement-based lectures woven into every build.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="border-l-2 border-orange pl-6 lg:col-span-5">
            <p className="meta">Course fee</p>
            <p className="mt-1 text-[clamp(2.2rem,4vw,3.4rem)] leading-none tracking-[-0.02em]">IDR 12,600,000</p>
            <Button href={legacy("continuing-education-registration-form")} className="mt-6">
              Join Now
            </Button>
          </Reveal>
        </div>
      </section>

      <StatsBand
        tone="teal"
        items={[
          { value: "21", label: "Hours" },
          { value: "3", label: "Days" },
          { value: "6", label: "Body regions built" },
        ]}
      />
    </>
  );
}
