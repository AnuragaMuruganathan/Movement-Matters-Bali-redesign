"use client";

import { useState } from "react";
import { DAYS, SCHEDULE, TIMES, type Level } from "@/content/schedule";

const levelStyle: Record<Level, string> = {
  "All levels": "bg-pale-green text-green-deep",
  Intermediate: "bg-pale-orange text-orange-deep",
  Advanced: "bg-pale-teal text-teal-deep",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={`inline-block w-fit self-start whitespace-nowrap font-ui rounded-full px-2.5 py-0.5 text-[0.8125rem] font-medium ${levelStyle[level]}`}>
      {level}
    </span>
  );
}

export function ScheduleGrid() {
  const [day, setDay] = useState<(typeof DAYS)[number]>("Monday");

  return (
    <>
      {/* Desktop week grid */}
      <div className="hidden border-t border-line md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">Weekly group Reformer class schedule</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-20 py-4 font-normal">
                <span className="sr-only">Time</span>
              </th>
              {DAYS.map((d) => (
                <th key={d} scope="col" className="px-3 py-4 text-[1.15rem] font-normal">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMES.map((t) => (
              <tr key={t} className="border-b border-line">
                <th scope="row" className="py-4 align-top text-[1.15rem] font-normal text-muted">
                  {t}
                </th>
                {DAYS.map((d) => {
                  const s = SCHEDULE.find((x) => x.day === d && x.time === t);
                  return (
                    <td key={d} className="border-l border-line px-3 py-4 align-top">
                      {s && (
                        <div className="flex flex-col gap-1.5">
                          <p className="text-[1.08rem] leading-tight">{s.cls}</p>
                          <p className="text-sm text-muted">with {s.teacher}</p>
                          <LevelBadge level={s.level} />
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile day tabs */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Day" className="-mx-5 flex scroll-px-5 overflow-x-auto border-b border-line px-5">
          {DAYS.map((d) => (
            <button
              key={d}
              role="tab"
              type="button"
              aria-selected={day === d}
              onClick={() => setDay(d)}
              className={`relative min-h-12 shrink-0 cursor-pointer px-4 text-lg transition-colors ${day === d ? "text-brown" : "text-muted"}`}
            >
              {d.slice(0, 3)}
              {day === d && <span className="absolute inset-x-3 bottom-0 h-px bg-orange" />}
            </button>
          ))}
        </div>
        <ul role="tabpanel">
          {SCHEDULE.filter((s) => s.day === day).map((s) => (
            <li key={s.time} className="flex items-center gap-4 border-b border-line py-4">
              <span className="w-14 text-xl text-muted">{s.time}</span>
              <span className="flex-1">
                <span className="block text-lg leading-tight">{s.cls}</span>
                <span className="text-sm text-muted">with {s.teacher}</span>
              </span>
              <LevelBadge level={s.level} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
