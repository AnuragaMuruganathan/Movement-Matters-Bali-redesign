/** Slow, endless text band. Pure CSS; stops under reduced motion. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((it) => (
        <li key={it} className="flex items-center whitespace-nowrap">
          <span className="px-8">{it}</span>
          <span aria-hidden className="size-2 rounded-full bg-orange" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden border-y border-line py-6 ${className}`}>
      <div className="flex w-max animate-[marquee_40s_linear_infinite] font-display text-[clamp(1.8rem,3.6vw,3.2rem)] text-brown/85">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
