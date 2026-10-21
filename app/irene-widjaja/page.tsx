import type { Metadata } from "next";
import { InstructorProfile } from "@/components/sections/InstructorProfile";
import { getInstructor } from "@/content/instructors";

const person = getInstructor("irene-widjaja");

export const metadata: Metadata = {
  title: `${person.name}, ${person.role}`,
  description: `${person.name}: ${person.credentials.slice(0, 3).join(", ")}.`,
  openGraph: { images: [person.image.src] },
};

export default function Page() {
  return <InstructorProfile person={person} />;
}
