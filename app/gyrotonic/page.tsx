import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { CONTACT, VIDEOS } from "@/content/site";

export const metadata: Metadata = {
  title: "GYROTONIC® Method",
  description: "The pioneer of the GYROTONIC® Method in Bali. Spiralling, flowing movement on specialised equipment in Ubud.",
};

const PILLARS = [
  { title: "The Founder", line: "Created by Juliu Horvath, a Hungarian-Romanian dancer, to heal himself after debilitating injuries." },
  { title: "The Method", line: "Spiralling, circling, flowing movement in rhythm with the breath. Think of it as movement of the fascia." },
  { title: "The Result", line: "Stronger muscles and connective tissue, joints moving freely without jarring or compression." },
];

const EQUIPMENT = ["Pulley Tower", "Jumping Stretching Board", "Archway", "Leg Extension Unit", "GYROTONER®"];

export default function GyrotonicPage() {
  return (
    <>
      <PageHero
        image={IMG.gyrotonic}
        position="60% 45%"
        title="GYROTONIC® Method"
        lead="The pioneer of this evolved exercise method in Bali. Free your spine and move with grace."
        actions={<Button href={CONTACT.whatsapp}>Book a Private Session</Button>}
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <blockquote className="text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.02em]">
              <span className="text-orange">“</span>I want music in my body and poetry in my body, and I want to be skillful without struggle.
              <span className="text-orange">”</span>
            </blockquote>
            <p className="meta mt-6">Juliu Horvath, founder</p>
          </Reveal>
          <ol className="border-t border-line lg:col-span-5">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="flex gap-5 border-b border-line py-5">
                <span className="w-6 shrink-0 text-sm tabular-nums text-orange-deep">0{i + 1}</span>
                <span>
                  <span className="h-card block">{p.title}</span>
                  <span className="mt-1 block text-brown-soft">{p.line}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Marquee items={EQUIPMENT} />

      <SplitFeature media={<VideoPlayer src={VIDEOS.gyrotonic} poster={IMG.trapTable} position="center 35%" title="GYROTONIC® at Movement Matters" className="!absolute inset-0" />}>
        <h2 className="h-section">Hand-crafted equipment</h2>
        <p className="mt-5 text-lg leading-relaxed text-brown-soft">
          Beautiful wood, cable and weight resistance, with handles that move in smooth circles so the body works as one harmonious system.
        </p>
      </SplitFeature>

      <BenefitsGrid
        accent="orange"
        title="GYROTONIC® is for you if you want to…"
        items={[
          "Free your spine",
          "Increase energy & vitality",
          "Gain flexibility & strength",
          "Improve cardiovascular health",
          "Improve posture",
          "Recover from injuries",
          "Improve self-esteem",
          "Heighten body awareness",
          "Gain mental clarity",
          "Live mindfully",
        ]}
      />

      <CTABand mode="private" image={IMG.gallery[7]} />
    </>
  );
}
