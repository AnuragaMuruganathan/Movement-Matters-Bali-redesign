"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "@phosphor-icons/react/ssr";
import { HOURS } from "@/content/site";

const TZ = "Asia/Makassar"; // Bali, UTC+8
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Re-render once a minute; the snapshot is a primitive so unchanged minutes don't re-render.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};
const baliNow = () => {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23", year: "numeric" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${DAYS.indexOf(get("weekday"))}|${Number(get("hour")) * 60 + Number(get("minute"))}|${get("year")}`;
};
const useBaliNow = () => useSyncExternalStore(subscribe, baliNow, () => null);

const toMinutes = (t: string) => {
  const [, h, m, ap] = t.match(/(\d+):(\d+)(am|pm)/) ?? [];
  return ((Number(h) % 12) + (ap === "pm" ? 12 : 0)) * 60 + Number(m);
};

// HOURS.appointments rows are Mon–Fri, Saturday, Sunday.
const hoursFor = (day: number) => {
  const [, range] = HOURS.appointments[day === 0 ? 2 : day === 6 ? 1 : 0];
  if (!range.includes("–")) return null;
  const [open, close] = range.split("–").map((s) => s.trim());
  return { open, close, from: toMinutes(open), to: toMinutes(close) };
};

function status(day: number, mins: number) {
  const today = hoursFor(day);
  if (today && mins >= today.from && mins < today.to) return { open: true, text: `Open now · until ${today.close}` };
  if (today && mins < today.from) return { open: false, text: `Closed · opens ${today.open} today` };
  for (let k = 1; k <= 7; k++) {
    const d = (day + k) % 7;
    const h = hoursFor(d);
    if (h) return { open: false, text: `Closed · opens ${k === 1 ? "tomorrow" : DAYS[d]} ${h.open}` };
  }
  return { open: false, text: "Closed" };
}

export function OpenStatus() {
  const now = useBaliNow();
  if (!now) return <span className="block h-8" aria-hidden />;
  const [day, mins] = now.split("|").map(Number);
  const s = status(day, mins);
  return (
    <p className="inline-flex min-h-8 items-center gap-2.5 rounded-full border border-white/15 px-3.5 text-[0.875rem] text-white">
      <span className={`relative size-2 shrink-0 rounded-full ${s.open ? "bg-green" : "bg-white/40"}`}>
        {s.open && <span className="absolute inset-0 animate-ping rounded-full bg-green/70" />}
      </span>
      {s.text}
    </p>
  );
}

export function CurrentYear() {
  const now = useBaliNow();
  return <>{now?.split("|")[2]}</>;
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="group inline-flex min-h-11 cursor-pointer items-center gap-2 text-white/70 md:min-h-0 transition-colors hover:text-white"
    >
      Back to top
      <ArrowUp aria-hidden weight="bold" className="size-4 text-orange transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
