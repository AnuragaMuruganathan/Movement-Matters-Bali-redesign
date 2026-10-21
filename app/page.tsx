import { HeroSlider } from "@/components/home/HeroSlider";
import { ServicesGrid, type Service } from "@/components/home/ServicesGrid";
import { TeamStrip } from "@/components/home/TeamStrip";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { ScrubText } from "@/components/motion/ScrubText";
import { Marquee } from "@/components/motion/Marquee";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StatsBand } from "@/components/sections/StatsBand";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { LocationBlock } from "@/components/sections/LocationBlock";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { VIDEOS } from "@/content/site";
import { INSTRUCTORS } from "@/content/instructors";

const SERVICES: Service[] = [
  {
    title: "Pilates",
    line: "Strengthen and tone your postural and core muscles, loosen your joints, and improve breathing and body awareness.",
    points: ["Private & Duet", "Group Reformer", "Post-Rehab", "Pre & Post-Natal"],
    href: "/ubud-pilates",
    image: IMG.gallery[0],
    dot: "bg-teal",
  },
  {
    title: "GYROTONIC®",
    line: "Spiralling, flowing movement that frees the spine and joints, without jarring or compression.",
    points: ["Pulley Tower", "Jumping Stretching Board", "Archway", "GYROTONER®"],
    href: "/gyrotonic",
    image: IMG.gyrotonic,
    position: "62% 50%",
    dot: "bg-orange",
  },
  {
    title: "Rolfing®",
    line: "Restructure and realign your body for ease of movement. Heal old injuries and manage chronic pain.",
    points: ["Structural Integration", "10-Series", "Rolf Movement"],
    href: "/rolfing-structural-integration",
    image: IMG.handsOn,
    position: "35% 50%",
    dot: "bg-green",
  },
  {
    title: "Teacher Training",
    line: "Internationally recognised Body Harmonics® training that brings out the best teacher in you.",
    points: ["Mat", "Reformer", "CCSB", "Continuing Education"],
    href: "/pilates-teacher-training-bali",
    image: IMG.gallery[3],
    dot: "bg-brown",
  },
];

const STORY = [
  ["First", "fully equipped Pilates studio in Ubud"],
  ["3-in-1", "Pilates, GYROTONIC® and Rolfing® under one roof"],
  ["2017", "Nominee, Asia Powerhouse Award: Pilates Studio of the Year"],
];

export default function Home() {
  return (
    <>
      <HeroSlider />

      {/* Intro statement */}
      <section className="section">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-10">
          <ScrubText
            text="We want to empower you with the knowledge that you can change your body for the better. Stand taller, be stronger, feel greater."
            className="text-[clamp(1.9rem,3.9vw,3.6rem)] leading-[1.12] tracking-[-0.02em] lg:col-span-9"
          />
          <Reveal className="flex flex-col justify-end gap-6 lg:col-span-3">
            <p className="text-lg text-brown-soft">Get out of pain and step into the joy of living.</p>
            <Button href="/contact" variant="text">
              Plan your first visit
            </Button>
          </Reveal>
        </div>
      </section>

      <ServicesGrid services={SERVICES} />

      <Marquee items={["Pilates", "GYROTONIC®", "Rolfing®", "Reformer", "Teacher Training", "Anatomy in 3D", "Nyuh Kuning, Ubud"]} />

      {/* Our story */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <RevealText text="Our story" className="h-section" />
            <Reveal delay={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-brown-soft">
                Custom built in the village of Nyuh Kuning with imported Balanced Body®, STOTT PILATES® and GYROTONIC® equipment, and a team that works
                alongside local health professionals.
              </p>
              <dl className="mt-10 border-t border-line">
                {STORY.map(([v, l]) => (
                  <div key={v} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-line py-4">
                    <dt className="text-[1.8rem] leading-none text-orange-deep">{v}</dt>
                    <dd className="text-brown-soft">{l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <VideoPlayer src={VIDEOS.promo} poster={IMG.studio} title="Watch our story" className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" sizes="(min-width: 1024px) 58vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <StatsBand
        items={[
          { value: "12", label: "Reformers" },
          { value: "2", label: "Trap Tables" },
          { value: "5", label: "Pilates Chairs" },
          { value: "2", label: "Ladder Barrels" },
          { value: "2", label: "GYROTONIC® Towers" },
        ]}
      />

      {/* Team */}
      <section className="section">
        <div className="container-x">
          <SectionHeading title="Our team" lead="Certified, compassionate instructors with decades of combined experience." />
          <ImageReveal src={IMG.team} alt="The Movement Matters Bali team" sizes="100vw" position="center 35%" className="mb-2 aspect-[16/9] md:aspect-[21/9]" />
          <TeamStrip />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section border-t border-line bg-bone">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <RevealText text="In their words" className="h-section" />
            <ul className="mt-8 border-t border-line">
              {INSTRUCTORS.slice(0, 3).map(({ testimonial: q }, i) => (
                <Reveal as="li" key={q.by} delay={i * 0.08} className="border-b border-line py-6">
                  <blockquote className="text-[1.3rem] leading-snug">
                    <span className="text-orange">“</span>
                    {q.text}
                    <span className="text-orange">”</span>
                  </blockquote>
                  <p className="meta mt-3">{q.by}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <VideoPlayer src={VIDEOS.testimonials} poster={IMG.gallery[8]} title="Client stories" className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[32rem]" sizes="(min-width: 1024px) 58vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <LocationBlock />
    </>
  );
}
