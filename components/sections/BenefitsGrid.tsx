import { Reveal } from "@/components/motion/Reveal";
import { StickySection } from "./StickySection";

type Accent = "teal" | "orange" | "green";
const accents: Record<Accent, string> = {
  teal: "text-teal-deep",
  orange: "text-orange-deep",
  green: "text-green-deep",
};

/** "X is for you if you want to…" as a numbered hairline list. */
export function BenefitsGrid({ title, items, accent = "teal" }: { title: string; items: string[]; accent?: Accent }) {
  return (
    <StickySection title={title} bg="bg-bone">
      <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
        {items.map((b, i) => (
          <Reveal as="li" key={b} delay={(i % 2) * 0.06} className="flex items-baseline gap-5 border-b border-line py-5">
            <span className={`w-8 shrink-0 text-sm tabular-nums ${accents[accent]}`}>{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[1.4rem] leading-snug md:text-[1.6rem]">{b}</span>
          </Reveal>
        ))}
      </ol>
    </StickySection>
  );
}
