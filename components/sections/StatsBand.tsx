import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";

type Tone = "teal" | "orange" | "green" | "ink";
const dot: Record<Tone, string> = {
  teal: "bg-teal",
  orange: "bg-orange",
  green: "bg-green",
  ink: "bg-brown",
};

/** Hairline row of animated figures. */
export function StatsBand({ items, tone = "orange" }: { items: { value: string; label: string }[]; tone?: Tone }) {
  const cols = items.length === 5 ? "md:grid-cols-3 lg:grid-cols-5" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4";
  return (
    <section className="border-y border-line">
      <ul className={`container-x grid grid-cols-2 ${cols} max-md:[&>li:last-child:nth-child(odd)]:col-span-2`}>
        {items.map((s, i) => (
          <Reveal
            as="li"
            key={s.label}
            delay={i * 0.06}
            className="flex flex-col gap-3 border-b border-line py-8 pr-4 last:border-b-0 md:py-10 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <Counter value={s.value} className="text-[clamp(2.8rem,5vw,4.6rem)] leading-none tracking-[-0.03em]" />
            <span className="flex items-center gap-2 text-brown-soft">
              <span aria-hidden className={`size-1.5 rounded-full ${dot[tone]}`} />
              {s.label}
            </span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
