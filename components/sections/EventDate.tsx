"use client";

import { useSyncExternalStore } from "react";

// The page is prerendered, so "has this passed?" is answered in the browser.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60 * 60_000);
  return () => clearInterval(t);
};
const hourNow = () => Math.floor(Date.now() / 3_600_000);

/** A session date that marks itself as past once `ends` (ISO, with Bali offset) is behind us. */
export function EventDate({ label, ends, className = "" }: { label: string; ends: string; className?: string }) {
  const hour = useSyncExternalStore(subscribe, hourNow, () => null);
  const past = hour !== null && hour * 3_600_000 > Date.parse(ends);
  return (
    <p className={className}>
      <time dateTime={ends} className={past ? "text-muted line-through decoration-1" : ""}>
        {label}
      </time>
      {past && <span className="mt-1 block text-sm text-orange-deep">Date passed · new dates coming soon</span>}
    </p>
  );
}
