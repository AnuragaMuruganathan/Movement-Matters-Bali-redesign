"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRICING, type PriceRow } from "@/content/pricing";

const COLS = [
  ["single", "Single"],
  ["five", "5-pack"],
  ["ten", "10-pack"],
] as const satisfies readonly (readonly [keyof PriceRow, string])[];

export function PricingTabs() {
  const [id, setId] = useState(PRICING[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = PRICING.find((g) => g.id === id)!;
  const cols = COLS.filter(([k]) => group.rows.some((r) => r[k]));

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onKey = (e: KeyboardEvent, n: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = (n + d + PRICING.length) % PRICING.length;
    setId(PRICING[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Pricing category" className="scroll-fade -mx-5 flex snap-x scroll-px-5 overflow-x-auto border-b border-line px-5 md:mx-0 md:px-0">
        {PRICING.map((g, n) => (
          <button
            key={g.id}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${g.id}`}
            aria-selected={g.id === id}
            aria-controls="price-panel"
            tabIndex={g.id === id ? 0 : -1}
            onClick={() => setId(g.id)}
            onKeyDown={(e) => onKey(e, n)}
            className={`relative mr-6 min-h-14 shrink-0 snap-start cursor-pointer whitespace-nowrap text-lg transition-colors last:mr-12 md:mr-9 md:text-xl md:last:mr-0 ${
              g.id === id ? "text-brown" : "text-muted hover:text-brown"
            }`}
          >
            {g.label}
            {g.id === id && <motion.span layoutId="price-tab" className="absolute inset-x-0 bottom-[-1px] h-px bg-orange" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          id="price-panel"
          role="tabpanel"
          aria-labelledby={`tab-${id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 pt-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <h3 className="text-[2.2rem] leading-none tracking-[-0.02em]">{group.label}</h3>
            {group.intro && <p className="mt-3 max-w-sm text-brown-soft">{group.intro}</p>}
            {group.jumpstart && (
              <div className="mt-8 border-l-2 border-orange pl-5">
                <p className="meta !text-orange-deep">New clients only</p>
                <p className="mt-1 text-brown-soft">{group.jumpstart.label}</p>
                <dl className="mt-2">
                  {group.jumpstart.prices.map((p) => (
                    <div key={p.price} className="flex items-baseline justify-between gap-4 py-1">
                      {p.who && <dt className="text-brown-soft">{p.who}</dt>}
                      <dd className="text-[1.6rem] leading-tight tabular-nums">Rp {p.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <div className="lg:col-span-8">
            {/* Desktop and tablet: one table */}
            <table className="hidden w-full border-collapse text-left md:table">
              <caption className="sr-only">{group.label} prices in Rupiah</caption>
              <thead>
                <tr className="border-b border-brown/20">
                  <th scope="col" className="meta py-3">
                    Session
                  </th>
                  {cols.map(([k, label]) => (
                    <th key={k} scope="col" className="meta py-3 text-right">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.rows.map((r) => (
                  <tr key={r.name} className="border-b border-line transition-colors hover:bg-bone">
                    <th scope="row" className="py-4 pr-4 font-normal">
                      <span className="block text-[1.15rem]">{r.name}</span>
                      {r.note && <span className="text-sm text-muted">{r.note}</span>}
                    </th>
                    {cols.map(([k]) => (
                      <td key={k} className="py-4 pl-4 text-right tabular-nums">
                        {r[k] ?? "–"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phones: each session is a card, so no price column is ever cut off */}
            <ul className="border-t border-brown/20 md:hidden">
              {group.rows.map((r) => (
                <li key={r.name} className="border-b border-line py-4">
                  <p className="text-[1.15rem] leading-snug">{r.name}</p>
                  {r.note && <p className="text-sm text-muted">{r.note}</p>}
                  <dl className="mt-3 grid grid-cols-3 gap-2">
                    {cols.map(([k, label]) => (
                      <div key={k} className="rounded-[4px] bg-bone px-3 py-2">
                        <dt className="meta">{label}</dt>
                        <dd className="font-ui mt-0.5 text-[0.95rem] tabular-nums">{r[k] ?? "–"}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Prices in Indonesian Rupiah (IDR).</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
