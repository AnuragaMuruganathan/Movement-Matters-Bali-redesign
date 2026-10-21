import Image from "next/image";
import Link from "next/link";
import { INSTRUCTORS } from "@/content/instructors";
import { Reveal } from "@/components/motion/Reveal";

/** Instructor cards: a swipeable row on phones (kept on the page gutter), a grid from tablet up. Pass `exclude` on a profile page. */
export function TeamStrip({ exclude }: { exclude?: string }) {
  const people = INSTRUCTORS.filter((p) => p.slug !== exclude);
  return (
    <ul
      className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 ${
        people.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-6"
      }`}
    >
      {people.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={i * 0.07} className="w-[64%] shrink-0 snap-start sm:w-[40%] md:w-auto">
          <Link href={`/${p.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-sand">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(min-width: 1024px) 18vw, (min-width: 768px) 33vw, 64vw"
                className="object-cover object-top grayscale-[45%] transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                placeholder="blur"
              />
            </div>
            <p className="border-b border-line py-3 text-[1.15rem] leading-tight">
              <span className="link-sweep">{p.name}</span>
            </p>
            <p className="pt-1.5 text-sm text-muted">{p.role}</p>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
