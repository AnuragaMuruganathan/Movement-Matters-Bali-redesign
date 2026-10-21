import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StickySection } from "@/components/sections/StickySection";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { CourseList } from "@/components/sections/CourseList";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { VIDEOS, legacy } from "@/content/site";
import { CERTIFICATES, CE_FAQ } from "@/content/courses";

export const metadata: Metadata = {
  title: "Continuing Education & Specialist Certificates",
  description: "Body Harmonics® continuing education in Bali and online: 43 courses and six specialist certificates taught by Sook Fun Chen.",
};

export default function ContinuingEducationPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[13]}
        position="center 15%"
        title="Continuing Education"
        lead="One of the world's most comprehensive Pilates continuing education and specialist certificate programs."
        actions={
          <>
            <Button href={legacy("continuing-education-registration-form")}>Register</Button>
            <Button href={legacy("teacher-training-course-calendar")} variant="outline">
              Course Calendar
            </Button>
          </>
        }
        aside={<Image src={IMG.bhLogo} alt="Body Harmonics" className="h-12 w-auto" sizes="200px" />}
      />

      <SplitFeature bg="bg-bone" media={<VideoPlayer src={VIDEOS.continuingEd} poster={IMG.gallery[4]} title="Body Harmonics® education" className="!absolute inset-0" />}>
        <h2 className="h-section">Science-based, hands-on</h2>
        <p className="mt-5 text-lg leading-relaxed text-brown-soft">
          Lectures, observation and movement labs give you clear, simple tools you can apply immediately, from anatomy to post-rehab and special populations.
        </p>
      </SplitFeature>

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Specialist certificates" lead="Earned by completing part or all of the course list. Take courses in any order." />
          <div className="grid gap-10 lg:grid-cols-12">
            {(
              [
                ["Essential", CERTIFICATES.essential, "lg:col-span-8", "sm:grid-cols-2"],
                ["Advanced", CERTIFICATES.advanced, "lg:col-span-4", ""],
              ] as const
            ).map(([label, certs, span, cols]) => (
              <Reveal key={label} className={span}>
                <h3 className="meta">{label} certificates</h3>
                <ul className={`mt-3 grid border-t border-line sm:gap-x-10 ${cols}`}>
                  {certs.map((c) => (
                    <li key={c.name}>
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-4 border-b border-line py-5">
                        <span>
                          <span className="link-sweep text-[1.4rem] leading-tight">{c.name}</span>
                          <span className="mt-1 block text-brown-soft">{c.line}</span>
                        </span>
                        <ArrowUpRight aria-hidden weight="bold" className="mt-1 size-5 shrink-0 text-orange-deep transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-bone">
        <div className="container-x">
          <SectionHeading
            title="Course list"
            lead={
              <>
                Online and in-person one-on-one available for every course.{" "}
                <a href="/assets/body-harmonics-catalogue.pdf" target="_blank" rel="noopener noreferrer" className="link-sweep text-orange-deep">
                  Download the catalogue
                </a>
              </>
            }
          />
          <CourseList />
        </div>
      </section>

      <StickySection title="FAQ" lead="Taught by Sook Fun Chen, Body Harmonics® Education Partner.">
        <Accordion items={CE_FAQ.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
      </StickySection>

      <CTABand mode="training" image={IMG.gallery[2]} />
    </>
  );
}
