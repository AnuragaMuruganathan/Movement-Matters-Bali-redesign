import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { CONTACT, VIDEOS, legacy } from "@/content/site";

export const metadata: Metadata = {
  title: "Rolfing® Structural Integration",
  description: "Rolfing® Structural Integration in Ubud with Certified Rolfer™ Sook Fun Chen. Realign the body's fascia to relieve chronic pain.",
};

const STEPS = [
  { title: "What is fascia?", line: "A web of connective tissue linking the whole body. Dr. Ida Rolf called it the “organ of form”." },
  { title: "Why it matters", line: "After injury, fascia over-thickens, limiting mobility and changing posture and movement patterns." },
  { title: "The process", line: "Release holding patterns part by part, then integrate each through movement with the whole body." },
  { title: "Rolf Movement", line: "Across the 10-series, re-educate breathing, walking, standing and sitting from the ground up." },
];

export default function RolfingPage() {
  return (
    <>
      <PageHero
        image={IMG.handsOn}
        position="center 40%"
        title="Rolfing® Structural Integration"
        lead="When pain won't go away, look at it from a different angle. Realign the whole body through its fascia."
        actions={
          <>
            <Button href={CONTACT.whatsapp}>Book via WhatsApp</Button>
            <Button href={legacy("rolfing-10-series")} variant="outline">
              The 10-Series
            </Button>
          </>
        }
      />

      <SplitFeature bg="bg-bone" media={<VideoPlayer src={VIDEOS.rolfing} poster={IMG.rolfing} title="A Rolfing® client story" className="!absolute inset-0" />}>
        <h2 className="h-section">The body as a whole</h2>
        <p className="mt-5 text-lg leading-relaxed text-brown-soft">
          A tight foot can affect your neck. A shock can constrict your chest for years. By manually releasing and realigning fascia, Rolfing® reduces
          compensations, eases pain and restores freedom of movement.
        </p>
      </SplitFeature>

      <section className="section">
        <div className="container-x">
          <SectionHeading title="How it works" />
          <ol className="grid border-t border-line md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.08}
                className="border-b border-line py-8 md:pr-8 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <span className="text-[3rem] leading-none text-green-deep">0{i + 1}</span>
                <h3 className="h-card mt-6">{s.title}</h3>
                <p className="mt-2 text-brown-soft">{s.line}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <BenefitsGrid
        accent="green"
        title="Rolfing® is for you if you want to…"
        items={["Realign and free your body", "Gain lasting postural change", "Be free from chronic pain", "Recover from injuries", "Heighten body awareness", "Increase well-being"]}
      />

      <CTABand mode="private" image={IMG.studio} position="35% center" />
    </>
  );
}
