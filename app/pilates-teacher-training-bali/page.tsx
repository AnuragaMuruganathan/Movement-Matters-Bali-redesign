import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/sections/PageHero";
import { StatsBand } from "@/components/sections/StatsBand";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StickySection } from "@/components/sections/StickySection";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoTabs } from "@/components/sections/VideoTabs";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { VIDEOS, legacy } from "@/content/site";

export const metadata: Metadata = {
  title: "Pilates Teacher Training Bali",
  description: "Body Harmonics® Pilates Comprehensive Track in Ubud: Mat, Reformer and CCSB. PMA-standard teacher training.",
};

const LEVELS = [
  { n: "Level 1", title: "Mat", line: "Your first step: make a positive impact on healthy people with basic movement challenges.", href: legacy("body-harmonics-level-1"), image: IMG.gallery[11] },
  { n: "Level 2", title: "Reformer", line: "Refine your teaching, observation and analysis across the full Reformer repertoire.", href: legacy("body-harmonic-level-2"), image: IMG.gallery[8] },
  { n: "Level 3", title: "Cadillac, Chair, Springboard & Barrels", line: "Complete the equipment repertoire and solve almost any movement issue.", href: legacy("body-harmonics-level-3"), image: IMG.gallery[3] },
];

const WHY = ["Turn your training into employment anywhere", "Work with all ages and abilities", "A flexible career on your terms", "Full-time income with part-time hours"];

const CHECKLIST = [
  "Committed to becoming a confident, competent teacher",
  "Proficient in reading and writing English",
  "Benefited from Pilates and want to help others",
  "Ready to invest 100% focus in the learning process",
];

export default function TeacherTrainingPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[10]}
        title="Pilates Teacher Training"
        lead="Body Harmonics® Comprehensive Track in Ubud. Graduate as a certified teacher and human movement specialist."
        actions={
          <>
            <Button href={legacy("pilates-teacher-training-registrationform")}>Register</Button>
            <Button href={legacy("teacher-training-course-calendar")} variant="outline">
              Training Calendar
            </Button>
          </>
        }
        aside={<Image src={IMG.bhLogo} alt="Body Harmonics Education Partner" className="h-12 w-auto" sizes="200px" />}
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Three levels to certification" lead="Meets Pilates Method Alliance (PMA) international standards." />
          <ol className="grid gap-2 lg:grid-cols-3">
            {LEVELS.map((l, i) => (
              <Reveal as="li" key={l.n} delay={i * 0.08}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[16/11] overflow-hidden bg-sand">
                    <Image src={l.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="photo object-cover transition-transform duration-1000 group-hover:scale-[1.05]" placeholder="blur" />
                    <span className="absolute left-0 top-0 bg-white px-4 py-2 text-sm">{l.n}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 border-b border-line py-5">
                    <div>
                      <h3 className="h-card lg:min-h-[2.1em]">
                        <span className="link-sweep">{l.title}</span>
                      </h3>
                      <p className="mt-2 text-brown-soft">{l.line}</p>
                    </div>
                    <ArrowUpRight aria-hidden weight="bold" className="mt-1 size-5 shrink-0 text-orange-deep transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <StatsBand
        tone="ink"
        items={[
          { value: "216", label: "Classroom hours" },
          { value: "220+", label: "Self-practice hours" },
          { value: "240+", label: "Practice-teaching hours" },
          { value: "115", label: "Home-study hours" },
        ]}
      />

      <StickySection
        title="Why the full track"
        lead="Written and practical exams at each level. 12 CECs every two years keep your certification current."
      >
        <ol className="mb-10 border-t border-line">
          {WHY.map((w, i) => (
            <Reveal as="li" key={w} delay={i * 0.05} className="flex gap-5 border-b border-line py-4 text-[1.3rem]">
              <span className="w-6 shrink-0 pt-1.5 text-sm tabular-nums text-orange-deep">0{i + 1}</span>
              {w}
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <VideoTabs
            items={[
              { label: "Graduate stories", src: VIDEOS.ttTestimonials, poster: IMG.gallery[18], position: "center 15%" },
              { label: "Become a teacher", src: VIDEOS.ttEducator, poster: IMG.gallery[13], position: "center 20%" },
              { label: "The program", src: VIDEOS.ttProgram, poster: IMG.gallery[4] },
            ]}
          />
        </Reveal>
      </StickySection>

      <SplitFeature image={IMG.studioEntrance} bg="bg-bone">
        <h2 className="h-section">Is this program for you?</h2>
        <ol className="mt-8 border-t border-line">
          {CHECKLIST.map((c, i) => (
            <li key={c} className="flex gap-5 border-b border-line py-3.5 text-lg">
              <span className="w-6 shrink-0 pt-1 text-sm tabular-nums text-teal-deep">0{i + 1}</span>
              {c}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-brown-soft">Train in our light-filled studio in Ubud. Mentoring sessions available on request.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={legacy("pilates-teacher-training-registrationform")}>Join Now</Button>
          <Button href="/continuing-education" variant="outline">
            Continuing Education
          </Button>
        </div>
      </SplitFeature>

      <CTABand mode="training" image={IMG.gallery[5]} />
    </>
  );
}
