import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";

export type Service = {
  title: string;
  line: string;
  points: string[];
  href: string;
  image: StaticImageData;
  position?: string;
  dot: string;
};

/** The four disciplines as a plain grid: all visible at once, no scroll-jacking. */
export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="section border-t border-line">
      <div className="container-x">
        <SectionHeading title="Four ways to move better" lead="One studio, four complementary disciplines, each taught by specialists." />
        <ul className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, idx) => (
            <Reveal as="li" key={s.title} delay={idx * 0.07}>
              <Link href={s.href} className="group flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    className="photo object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    style={s.position ? { objectPosition: s.position } : undefined}
                  />
                  <span className="absolute left-0 top-0 bg-white px-4 py-2 text-sm tabular-nums">0{idx + 1}</span>
                </div>
                <div className="flex flex-1 flex-col border-b border-line py-5">
                  <h3 className="flex items-center justify-between gap-3 text-[clamp(1.7rem,2.2vw,2.2rem)] leading-none tracking-[-0.02em]">
                    <span className="flex items-center gap-3">
                      <span aria-hidden className={`size-2.5 shrink-0 rounded-full ${s.dot}`} />
                      <span className="link-sweep">{s.title}</span>
                    </span>
                    <ArrowUpRight aria-hidden weight="bold" className="size-5 shrink-0 text-orange-deep transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-3 flex-1 text-brown-soft">{s.line}</p>
                  <p className="mt-4 text-sm text-muted">{s.points.join(" · ")}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
