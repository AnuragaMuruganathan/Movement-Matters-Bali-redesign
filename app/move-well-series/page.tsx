import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { CONTACT } from "@/content/site";
import { EventDate } from "@/components/sections/EventDate";

export const metadata: Metadata = {
  title: "Move Well Series",
  description: "Hands-on workshops in Ubud for pain-free movement: core & spine, hips, knees & ankles, shoulders & neck. Led by Pei Khoek.",
};

const WORKSHOPS = [
  {
    n: "Workshop 1",
    title: "Pilates Core & Spinal Mobility",
    line: "A strong, stable core and healthy spine to ease back pain and restore posture.",
    forYou: "Mid or lower back pain or stiffness",
    date: "Thu 7 May 2026 · 1–3:30pm",
    ends: "2026-05-07T15:30:00+08:00",
    image: IMG.gallery[11],
    dot: "bg-teal",
  },
  {
    n: "Workshop 2",
    title: "Hip, Knees & Ankle Strengthening",
    line: "Strengthen and stabilise the lower body to move with confidence.",
    forYou: "Pain or limited movement in hips, knees or ankles",
    date: "Thu 14 May 2026 · 1–3:30pm",
    ends: "2026-05-14T15:30:00+08:00",
    image: IMG.gallery[16],
    dot: "bg-orange",
  },
  {
    n: "Workshop 3",
    title: "Understanding Shoulder & Neck",
    line: "Release tension, restore mobility and improve posture through the upper body.",
    forYou: "Upper back, neck or shoulder pain, limited arm movement",
    date: "Thu 21 May 2026 · 1–3:30pm",
    ends: "2026-05-21T15:30:00+08:00",
    image: IMG.gallery[14],
    dot: "bg-green",
  },
];

const FULL_DAY = [
  ["8:00am", "Core & Spinal Mobility"],
  ["10:30am", "Hip, Knees & Ankle"],
  ["1:30pm", "Shoulder & Neck"],
  ["3:30pm", "Finish"],
];

const PRICES = [
  ["1 workshop", "600,000"],
  ["2 workshops", "1,100,000"],
  ["3 workshops or Full Day", "1,500,000"],
];

export default function MoveWellPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[2]}
        title="Move Well Series"
        lead="Transform your movement patterns for pain-free living. Instruction, demos and hands-on practice with take-home exercises."
        actions={
          <>
            <Button href={CONTACT.whatsapp}>Book via WhatsApp</Button>
            <Button href={`mailto:${CONTACT.emails.general}`} variant="outline">
              Book via Email
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Three workshops" lead="Ideal if you've done physio exercises and want the what, why and how." />
          <ul className="grid gap-2 lg:grid-cols-3">
            {WORKSHOPS.map((w, i) => (
              <Reveal as="li" key={w.n} delay={i * 0.08} className="flex flex-col">
                <div className="relative aspect-[16/11] overflow-hidden bg-sand">
                  <Image src={w.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="photo object-cover" placeholder="blur" />
                </div>
                <div className="flex flex-1 flex-col border-b border-line py-5">
                  <span className="meta flex items-center gap-2">
                    <span aria-hidden className={`size-1.5 rounded-full ${w.dot}`} />
                    {w.n}
                  </span>
                  <h3 className="h-card mt-2">{w.title}</h3>
                  <p className="mt-2 flex-1 text-brown-soft">{w.line}</p>
                  <p className="mt-4 text-sm text-muted">For: {w.forYou}</p>
                </div>
                <EventDate label={w.date} ends={w.ends} className="py-3 text-lg" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-bone">
        <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <RevealText text="Full Day Program" className="h-section" />
            <EventDate label="Saturday, 24 October 2026 · 8:00am–3:30pm" ends="2026-10-24T15:30:00+08:00" className="mt-3 text-lg text-orange-deep" />
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              <Reveal>
                <h2 className="meta">Schedule</h2>
                <dl className="mt-3 border-t border-line">
                  {FULL_DAY.map(([t, s]) => (
                    <div key={t} className="flex gap-5 border-b border-line py-3.5">
                      <dt className="w-20 shrink-0 tabular-nums text-muted">{t}</dt>
                      <dd>{s}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="meta">Prices · per person, IDR</h2>
                <dl className="mt-3 border-t border-line">
                  {PRICES.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                      <dt>{k}</dt>
                      <dd className="text-xl tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-sm text-muted">Handout included, food not included.</p>
              </Reveal>
            </div>
            <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
              <Button href={CONTACT.whatsapp}>Book on WhatsApp</Button>
              <Button href={`mailto:${CONTACT.emails.general}`} variant="outline">
                Book via Email
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4">
            <Link href="/pei-khoek" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image src={IMG.portraits.pei} alt="Pei Khoek" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-top grayscale-[40%] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" placeholder="blur" />
              </div>
              <div className="border-b border-line py-4">
                <p className="meta">Your instructor</p>
                <p className="h-card mt-1">
                  <span className="link-sweep">Pei Khoek</span>
                </p>
                <p className="text-brown-soft">PHI Pilates Master Trainer</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
