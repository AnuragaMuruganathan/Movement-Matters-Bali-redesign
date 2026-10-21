import { Plus } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";

export function Accordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((it) => (
        <details key={it.title} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-xl transition-colors hover:text-orange-deep md:text-2xl [&::-webkit-details-marker]:hidden">
            {it.title}
            <Plus aria-hidden weight="bold" className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="max-w-2xl pb-6 text-lg text-brown-soft">{it.content}</div>
        </details>
      ))}
    </div>
  );
}
