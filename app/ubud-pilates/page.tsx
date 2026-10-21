import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StickySection } from "@/components/sections/StickySection";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { CONTACT, VIDEOS, legacy } from "@/content/site";

export const metadata: Metadata = {
  title: "Ubud Pilates",
  description: "Private, duet and group Reformer Pilates in Ubud with 12 Reformers, Trap Tables, Chairs and Barrels, taught by certified instructors.",
};

const SESSIONS = [
  { title: "One-on-One", line: "Fully tailored to your body and goals.", image: IMG.gallery[5] },
  { title: "Private Duet", line: "Train with a partner, still fully guided.", image: IMG.gallery[16] },
  { title: "Private Group", line: "3–4 people, your own private class.", image: IMG.gallery[2] },
  { title: "Group Reformer", line: "Energising scheduled classes, 55 minutes.", image: IMG.gallery[9] },
];

const PROGRAMS = [
  { title: "Post-Rehab & Injury", format: "One-on-One", href: legacy("post-rehab-program") },
  { title: "Pre-Natal Pilates", format: "One-on-One & Duet", href: legacy("pre-natal-pilates") },
  { title: "Post-Natal Pilates", format: "One-on-One", href: legacy("post-natal-pilates") },
  { title: "Pilates for Scoliosis", format: "One-on-One", href: legacy("pilates-for-scoliosis") },
  { title: "Senior Fitness", format: "1:1, Duet, Group of 3–4", href: legacy("senior-fitness") },
  { title: "Teenage Pilates", format: "1:1, Duet, Group of 3–4", href: legacy("kids-pilates") },
  { title: "Athletic Conditioning", format: "1:1, Duet, Group of 3–4", href: "/contact" },
  { title: "Holiday Intensive", format: "1:1, Duet, Group of 3–4", href: legacy("holiday-intensive-program") },
  { title: "Group Reformer", format: "Scheduled classes", href: "/group-class-schedule" },
];

const APPROACH = [
  "The body as one integrated system",
  "Core control and optimal spinal movement",
  "Stabilise first, then release tight muscles",
  "Always individual, never one-size-fits-all",
];

export default function UbudPilatesPage() {
  return (
    <>
      <PageHero
        image={IMG.ubudPilates}
        position="center 30%"
        title="Ubud Pilates"
        lead="Ubud's premier Pilates studio: highly experienced teachers and world-class equipment."
        actions={
          <>
            <Button href={CONTACT.whatsapp}>Book a Session</Button>
            <Button href="/group-class-schedule" variant="outline">
              Class Schedule
            </Button>
          </>
        }
      />

      <StatsBand
        tone="teal"
        items={[
          { value: "12", label: "Reformers" },
          { value: "2", label: "Trap Tables" },
          { value: "5", label: "Pilates Chairs" },
          { value: "2", label: "Ladder Barrels" },
          { value: "2", label: "GYROTONIC® machines" },
        ]}
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Ways to train" lead="Core strength, stability, flexibility, post-rehab and postural realignment." />
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SESSIONS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.07} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="photo object-cover transition-transform duration-1000 group-hover:scale-[1.05]" placeholder="blur" />
                </div>
                <div className="border-b border-line py-4">
                  <h3 className="h-card">{s.title}</h3>
                  <p className="mt-1 text-brown-soft">{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <SplitFeature
        bg="bg-bone"
        media={<VideoPlayer src={VIDEOS.couple} poster={IMG.gallery[1]} title="Hear from our clients" className="!absolute inset-0" />}
      >
        <h2 className="h-section">How we teach</h2>
        <ol className="mt-8 border-t border-line">
          {APPROACH.map((a, i) => (
            <li key={a} className="flex gap-5 border-b border-line py-4 text-lg">
              <span className="w-6 text-sm tabular-nums text-teal-deep">0{i + 1}</span>
              {a}
            </li>
          ))}
        </ol>
      </SplitFeature>

      <StickySection title="Specialised programs" lead="Focused programs for every body and every stage of life.">
        <ul className="border-t border-line">
          {PROGRAMS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 0.04}>
              <Link href={p.href} className="group flex items-center justify-between gap-6 border-b border-line py-5 transition-colors hover:bg-bone md:px-4">
                <span className="flex items-baseline gap-5">
                  <span className="w-6 text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.5rem] leading-tight md:text-[1.8rem]">{p.title}</span>
                </span>
                <span className="flex items-center gap-5">
                  <span className="hidden text-brown-soft sm:inline">{p.format}</span>
                  <ArrowUpRight aria-hidden weight="bold" className="size-5 text-orange-deep transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </StickySection>

      <BenefitsGrid
        title="Pilates is for you if you want to…"
        items={[
          "Improve core strength",
          "Improve posture",
          "Improve fitness level",
          "Improve balance & coordination",
          "Recover from an injury",
          "Prevent injury",
          "Improve sport skills",
          "Heighten body awareness",
          "Gain mental clarity",
          "Live mindfully",
        ]}
      />

      <CTABand mode="pilates" image={IMG.gallery[15]} position="center 15%" />
    </>
  );
}
