export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export const TIMES = ["8am", "9am", "10am", "11am"] as const;

export type Level = "All levels" | "Intermediate" | "Advanced";
export type Slot = { day: (typeof DAYS)[number]; time: (typeof TIMES)[number]; cls: string; level: Level; teacher: string };

export const SCHEDULE: Slot[] = [
  { day: "Monday", time: "8am", cls: "Sculpt & Stretch", level: "All levels", teacher: "Ratna" },
  { day: "Monday", time: "10am", cls: "Pilates Sculpt", level: "Advanced", teacher: "Sook" },
  { day: "Tuesday", time: "9am", cls: "Core Blast", level: "Intermediate", teacher: "Irene" },
  { day: "Tuesday", time: "11am", cls: "Total Body Tone", level: "All levels", teacher: "Pei" },
  { day: "Wednesday", time: "8am", cls: "Total Body Tone", level: "All levels", teacher: "Ratna" },
  { day: "Wednesday", time: "9am", cls: "Upper Body Strength", level: "All levels", teacher: "Ratna" },
  { day: "Wednesday", time: "11am", cls: "Sculpt & Stretch", level: "All levels", teacher: "Ratna" },
  { day: "Thursday", time: "9am", cls: "Sculpt & Stretch", level: "All levels", teacher: "Pei" },
  { day: "Thursday", time: "11am", cls: "Lower Body Sculpt", level: "All levels", teacher: "Irene" },
  { day: "Friday", time: "8am", cls: "Sculpt & Stretch", level: "All levels", teacher: "Ratna" },
  { day: "Friday", time: "9am", cls: "Core Blast", level: "Intermediate", teacher: "Ratna" },
  { day: "Friday", time: "11am", cls: "Pilates Sculpt", level: "Advanced", teacher: "Ray" },
  { day: "Saturday", time: "10am", cls: "Lower Body Sculpt", level: "All levels", teacher: "Irene" },
  { day: "Saturday", time: "11am", cls: "Upper Body Strength", level: "All levels", teacher: "Pei" },
];

export const CLASSES: { name: string; level: Level; line: string; entry?: string }[] = [
  { name: "Core Blast", level: "Intermediate", line: "Targets every core muscle, abs, lower back and spinal stabilisers, to protect your back.", entry: "10+ recent Reformer classes" },
  { name: "Pilates Sculpt", level: "Advanced", line: "Classical principles at a moderate-to-slow pace for deep body connection.", entry: "40+ recent Reformer classes" },
  { name: "Sculpt & Stretch", level: "All levels", line: "Dynamic toning that transitions into deep stretching for balance and release." },
  { name: "Total Body Tone", level: "All levels", line: "Strong, lean muscles, better posture and precise alignment from head to toe." },
  { name: "Lower Body Sculpt", level: "All levels", line: "Glutes, thighs and hip mobility: your foundation. Great for runners." },
  { name: "Upper Body Strength", level: "All levels", line: "Arms and shoulders for neck, back health and an upright posture." },
  { name: "Jumpboard", level: "All levels", line: "Energetic, cardio jump sequences to build power through the whole body." },
];

export const CLASS_POLICY = [
  "Clean socks are compulsory for all classes.",
  "Advance payment secures your booking.",
  "22-hour cancellation cut-off, otherwise the full fee applies.",
  "Packages are non-refundable and expire in 12 months.",
  "Classes are 55 minutes. Arrive 10–15 minutes early.",
  "Instructors and classes are subject to change.",
];

export const ONE_ON_ONE_FIRST = [
  "Spine pathologies (stenosis, herniated disc, SI joint pain, spinal surgery)",
  "Recent or unhealed surgeries",
  "Any joint pain: hips, knees, wrists, neck, shoulders",
  "Osteoporosis",
  "Pregnancy",
];
