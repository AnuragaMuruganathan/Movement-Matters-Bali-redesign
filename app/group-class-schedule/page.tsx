import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ScheduleGrid, LevelBadge } from "@/components/sections/ScheduleGrid";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StickySection } from "@/components/sections/StickySection";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { CLASSES, CLASS_POLICY, ONE_ON_ONE_FIRST } from "@/content/schedule";
import { CONTACT, VIDEOS } from "@/content/site";

export const metadata: Metadata = {
  title: "Group Class Schedule",
  description: "Weekly group Reformer Pilates classes in Ubud, Monday to Saturday. Class levels, descriptions and booking.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        image={IMG.groupClass}
        title="Group Class Schedule"
        lead="Group Reformer classes, Monday to Saturday. 55 minutes, limited spots."
        actions={
          <>
            <Button href={CONTACT.mindbody}>Book on Mindbody</Button>
            <Button href={CONTACT.whatsapp} variant="outline">
              Ask on WhatsApp
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading title="This week" lead="All classes are on the Reformer. Instructors and classes may change." />
          <ScheduleGrid />
        </div>
      </section>

      <StickySection
        bg="bg-bone border-t border-line"
        title="Classes"
        lead="Every class requires you to be injury-free."
        actions={
          <div className="border-l-2 border-orange pl-5">
            <p className="text-xl">New to our studio?</p>
            <p className="mt-1 text-brown-soft">Jumpstart 5-packs for brand-new clients.</p>
            <Button href="/pricing-policies-list" variant="text" className="mt-2">
              See Jumpstart
            </Button>
          </div>
        }
      >
        <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
          {CLASSES.map((c, i) => (
            <Reveal as="li" key={c.name} delay={(i % 2) * 0.06} className="flex flex-col gap-3 border-b border-line py-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="h-card">{c.name}</h3>
                <LevelBadge level={c.level} />
              </div>
              <p className="max-w-xl text-brown-soft">{c.line}</p>
              {c.entry && <p className="text-sm text-muted">Requires {c.entry}</p>}
            </Reveal>
          ))}
        </ul>
      </StickySection>

      <SplitFeature media={<VideoPlayer src={VIDEOS.groupPromo} poster={IMG.gallery[17]} title="Group Reformer at Movement Matters" className="!absolute inset-0" />}>
        <h2 className="h-section">Class policy</h2>
        <ol className="mt-8 border-t border-line">
          {CLASS_POLICY.map((p, i) => (
            <li key={p} className="flex gap-5 border-b border-line py-3.5">
              <span className="w-6 shrink-0 text-sm tabular-nums text-orange-deep">0{i + 1}</span>
              {p}
            </li>
          ))}
        </ol>
        <p className="meta mt-10">One-on-one first if you have</p>
        <p className="mt-3 text-brown-soft">{ONE_ON_ONE_FIRST.join(" · ")}</p>
      </SplitFeature>
    </>
  );
}
