"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";
import { COURSES } from "@/content/courses";

const PREVIEW = 12;

const FILTERS = [
  { label: "All", test: () => true },
  { label: "2–4 hours", test: (h: number) => h <= 4 },
  { label: "6 hours", test: (h: number) => h === 6 },
  { label: "12 hours", test: (h: number) => h === 12 },
];

export function CourseList() {
  const [q, setQ] = useState("");
  const [f, setF] = useState(0);
  const [all, setAll] = useState(false);
  const list = useMemo(
    () => COURSES.filter(([name, h]) => FILTERS[f].test(h) && name.toLowerCase().includes(q.trim().toLowerCase())),
    [q, f],
  );
  // Searching or filtering always shows every match; the default view is a short, scannable preview.
  const narrowed = q.trim() !== "" || f !== 0;
  const shown = all || narrowed ? list : list.slice(0, PREVIEW);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="relative block md:w-96">
          <span className="sr-only">Search courses</span>
          <MagnifyingGlass aria-hidden weight="bold" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brown-soft" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${COURSES.length} courses…`}
            className="min-h-12 w-full border-b border-brown/25 bg-transparent pl-11 pr-4 text-lg outline-none focus:border-brown"
          />
        </label>
        <div role="group" aria-label="Filter by length" className="flex flex-wrap gap-2">
          {FILTERS.map((fl, n) => (
            <button
              key={fl.label}
              type="button"
              aria-pressed={f === n}
              onClick={() => setF(n)}
              className={`min-h-11 cursor-pointer border px-4 transition-colors ${f === n ? "border-brown bg-brown text-white" : "border-line text-brown hover:border-brown"}`}
            >
              {fl.label}
            </button>
          ))}
        </div>
      </div>
      <p className="meta mt-6" aria-live="polite">
        {shown.length < list.length ? `Showing ${shown.length} of ${list.length} courses` : `${list.length} course${list.length === 1 ? "" : "s"}`}
      </p>
      <ul id="course-list" className="mt-3 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
        {shown.map(([name, h]) => (
          <li key={name} className="flex items-center justify-between gap-4 border-b border-line py-4">
            <span className="leading-snug">{name}</span>
            <span className="shrink-0 text-sm tabular-nums text-muted">{h} hrs</span>
          </li>
        ))}
      </ul>
      {shown.length < list.length && (
        <button
          type="button"
          onClick={() => setAll(true)}
          aria-controls="course-list"
          className="mt-8 inline-flex min-h-12 cursor-pointer items-center rounded-[4px] border border-brown/25 px-6 transition-colors hover:border-brown"
        >
          Show all {list.length} courses
        </button>
      )}
    </div>
  );
}
