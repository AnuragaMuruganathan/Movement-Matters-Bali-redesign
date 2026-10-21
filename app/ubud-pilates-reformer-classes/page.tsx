import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";

export const metadata: Metadata = {
  title: "Ubud Pilates Reformer Classes",
  description: "Reformer Pilates in Ubud since 2013 on STOTT Merrithew Reformers, for general fitness and rehabilitation.",
};

// A curated set from one shoot: same grade and 3:2 frame, so the grid reads as one story.
const STUDIO_PHOTOS = [1, 2, 7, 8, 10, 15, 16, 17, 18].map((n) => IMG.gallery[n]);

const FACTS = [
  { title: "Since 2013", line: "Ubud's original Reformer classes for residents and visitors." },
  { title: "Head to toe", line: "One machine works every joint through its full range of motion." },
  { title: "Rehab ready", line: "Consistent spring resistance with no jarring of the joints." },
  { title: "STOTT Merrithew", line: "International-standard Reformers built for comfort and smooth glide." },
];

export default function ReformerClassesPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[6]}
        title="Reformer Classes"
        lead="Low impact, challenging and fun: the Reformer is our most-loved piece of equipment."
        actions={
          <>
            <Button href="/group-class-schedule">View Schedule</Button>
            <Button href="/pricing-policies-list" variant="outline">
              Pricing
            </Button>
          </>
        }
      />

      <section className="border-b border-line">
        <ul className="container-x grid sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.06} className="border-b border-line py-10 pr-6 last:border-b-0 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <span className="text-sm tabular-nums text-teal-deep">0{i + 1}</span>
              <h2 className="h-card mt-3">{f.title}</h2>
              <p className="mt-2 text-brown-soft">{f.line}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Inside the studio" lead="Light-filled, open-air and fully equipped in the heart of Nyuh Kuning." />
          <Gallery images={STUDIO_PHOTOS} layout="grid" alt="Reformer Pilates at Movement Matters Bali" />
        </div>
      </section>

      <CTABand mode="group" image={IMG.gallery[14]} position="center 25%" />
    </>
  );
}
