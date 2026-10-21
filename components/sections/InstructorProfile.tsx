import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { INSTRUCTORS, type Instructor } from "@/content/instructors";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Button } from "@/components/ui/Button";
import { TeamStrip } from "@/components/home/TeamStrip";
import { StickySection } from "./StickySection";
import { CONTACT } from "@/content/site";

export function InstructorProfile({ person }: { person: Instructor }) {
  const idx = INSTRUCTORS.findIndex((i) => i.slug === person.slug);
  const prev = INSTRUCTORS[(idx - 1 + INSTRUCTORS.length) % INSTRUCTORS.length];
  const next = INSTRUCTORS[(idx + 1) % INSTRUCTORS.length];

  return (
    <>
      <section data-hide-fab className="grid border-b border-line pt-[76px] md:pt-[84px] lg:grid-cols-12">
        <ImageReveal
          src={person.image}
          alt={person.name}
          priority
          immediate
          sizes="(min-width: 1024px) 42vw, 100vw"
          imgClassName="object-top"
          className="min-h-[52svh] lg:col-span-5 lg:min-h-[calc(100svh-84px)]"
        />
        <div className="flex flex-col justify-center px-5 py-12 md:px-10 md:py-16 lg:col-span-7 lg:px-16 xl:px-24">
          <Reveal>
            <p className="meta">{person.role}</p>
          </Reveal>
          <RevealText as="h1" immediate text={person.name} className="h-display mt-4" />
          <Reveal delay={0.3}>
            <dl className="mt-8 grid border-t border-line sm:grid-cols-2">
              <div className="border-b border-line py-3 sm:pr-6">
                <dt className="meta">Languages</dt>
                <dd className="mt-1">{person.languages.join(", ")}</dd>
              </div>
              {person.since && (
                <div className="border-b border-line py-3 sm:border-l sm:pl-6">
                  <dt className="meta">Experience</dt>
                  <dd className="mt-1">{person.since}</dd>
                </div>
              )}
            </dl>
            <blockquote className="mt-8 text-[1.6rem] leading-snug md:text-[1.9rem]">
              <span className="text-orange">“</span>
              {person.quote}
              <span className="text-orange">”</span>
            </blockquote>
            <div className="mt-6 max-w-xl space-y-3 text-lg leading-relaxed text-brown-soft">
              {person.bio.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={CONTACT.whatsapp}>Book with {person.name.split(" ")[0]}</Button>
              <Button href="/pricing-policies-list" variant="outline">
                Pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <StickySection
        title="Credentials"
        lead={
          <span className="block border-l-2 border-orange pl-5">
            <span className="block text-[1.2rem] leading-snug text-brown">
              <span className="text-orange-deep">“</span>
              {person.testimonial.text}
              <span className="text-orange-deep">”</span>
            </span>
            <span className="meta mt-3 block">{person.testimonial.by}</span>
          </span>
        }
      >
        <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
          {person.credentials.map((c, i) => (
            <Reveal as="li" key={c} delay={(i % 2) * 0.05} className="flex gap-5 border-b border-line py-4">
              <span className="w-6 shrink-0 text-sm tabular-nums text-orange-deep">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[1.1rem] leading-snug">{c}</span>
            </Reveal>
          ))}
        </ol>
      </StickySection>

      <section className="section border-t border-line bg-bone">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <RevealText text="Meet the team" className="h-section" />
            <nav aria-label="Instructor navigation" className="flex gap-2">
              <Link href={`/${prev.slug}`} className="inline-flex min-h-11 items-center gap-2 border border-line bg-white px-4 transition-colors hover:border-brown">
                <ArrowLeft aria-hidden weight="bold" className="size-4" /> {prev.name.split(" ")[0]}
              </Link>
              <Link href={`/${next.slug}`} className="inline-flex min-h-11 items-center gap-2 border border-line bg-white px-4 transition-colors hover:border-brown">
                {next.name.split(" ")[0]} <ArrowRight aria-hidden weight="bold" className="size-4" />
              </Link>
            </nav>
          </div>
          <TeamStrip exclude={person.slug} />
        </div>
      </section>
    </>
  );
}
