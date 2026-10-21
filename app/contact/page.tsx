import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Accordion } from "@/components/sections/Accordion";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { StickySection } from "@/components/sections/StickySection";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { IMG } from "@/content/media";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Movement Matters Bali in Nyuh Kuning, Ubud. WhatsApp, email, studio hours, directions and parking.",
};

const EMAILS = [
  ["General & private sessions", CONTACT.emails.general],
  ["Group classes", CONTACT.emails.groupClass],
  ["Teacher training", CONTACT.emails.teacherTraining],
];

const DIRECTIONS = [
  {
    title: "From Ubud, heading east",
    content: "Drive along Jl. Raya Nyuh Kuning. At Bali Spirit Hotel on your left, turn right into Jl. Nyuh Bulan (monkey statues, Sage Restaurant). We're behind the second house on your left.",
  },
  {
    title: "From Singakerta / Sayan",
    content: "After the bridge, turn left into Jl. Nyuh Bulan at the top of the hill by Sage Restaurant. We're behind the second house on your left.",
  },
  {
    title: "Via Monkey Forest (bikes & walkers only)",
    content: "Pass the football field on your right, turn right and follow the road around it. Continue to the end of Jl. Nyuh Bulan. We're behind the second-to-last house on your right.",
  },
  {
    title: "Parking",
    content: "Motorbikes park in front of the studio, down the driveway on the left. Cars park on the right-hand side of the street (the village is strict about this), about a 30m walk.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" lead="Email, WhatsApp or send the form. We'll be in touch within 24 hours." />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="group block border-b border-t border-line py-6">
                <span className="meta">WhatsApp, text only</span>
                <span className="mt-2 block text-[clamp(2rem,3.4vw,2.8rem)] leading-none tracking-[-0.02em]">
                  <span className="link-sweep">{CONTACT.phoneDisplay}</span>
                </span>
              </a>
              <ul>
                {EMAILS.map(([label, email]) => (
                  <li key={email} className="border-b border-line py-4">
                    <span className="meta">{label}</span>
                    <a href={`mailto:${email}`} className="flex min-h-11 items-center break-all text-lg">
                      <span className="link-sweep">{email}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <ImageReveal src={IMG.studioEntrance} alt="The garden path and wooden sign at the studio entrance" position="center 35%" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-8 aspect-[4/5]" />
          </div>
          <div className="min-w-0 lg:col-span-7">
            <RevealText text="Send an enquiry" className="h-section mb-10" />
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <LocationBlock />

      <StickySection
        bg="bg-bone border-t border-line"
        title="Getting here"
        lead="Same village as Bumi Sehat, under 100m from Bali Spirit Hotel. Look for our stone sign at the driveway of house No. 5."
        actions={<ImageReveal src={IMG.studioSign} alt="The Movement Matters Bali stone sign at the driveway" position="55% 60%" sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-square w-full max-w-sm" />}
      >
        <Accordion items={DIRECTIONS.map((d) => ({ title: d.title, content: <p>{d.content}</p> }))} />
      </StickySection>
    </>
  );
}
