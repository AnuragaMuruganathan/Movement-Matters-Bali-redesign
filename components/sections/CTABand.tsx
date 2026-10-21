import type { StaticImageData } from "next/image";
import Link from "next/link";
import { CONTACT, legacy } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { ImageReveal } from "@/components/motion/ImageReveal";

type Mode = "pilates" | "private" | "group" | "training";

// One primary action per intent: private work is booked on WhatsApp, group classes on Mindbody,
// training through the registration form. Everything else is a quiet secondary option.
const copy: Record<Mode, { title: string; lead: string; primary: [string, string]; secondary: [string, string] }> = {
  pilates: {
    title: "Begin your journey",
    lead: "Private sessions are booked on WhatsApp; group Reformer classes on Mindbody.",
    primary: ["Book on WhatsApp", CONTACT.whatsapp],
    secondary: ["Group classes on Mindbody", CONTACT.mindbody],
  },
  private: {
    title: "Book a private session",
    lead: "One-on-one attention, tailored to your body. Message us to find a time.",
    primary: ["Book on WhatsApp", CONTACT.whatsapp],
    secondary: ["See pricing", "/pricing-policies-list"],
  },
  group: {
    title: "Save your spot",
    lead: "Prepay to reserve. Classes run 55 minutes.",
    primary: ["Book on Mindbody", CONTACT.mindbody],
    secondary: ["Ask on WhatsApp", CONTACT.whatsapp],
  },
  training: {
    title: "Start your teaching path",
    lead: "Register online, or talk to us first about dates and levels.",
    primary: ["Register", legacy("pilates-teacher-training-registrationform")],
    secondary: ["Ask on WhatsApp", CONTACT.whatsapp],
  },
};

const link = "link-sweep inline-flex min-h-11 items-center hover:text-brown";

export function CTABand({ mode = "pilates", image, position, email }: { mode?: Mode; image: StaticImageData; position?: string; email?: string }) {
  const { title, lead, primary, secondary } = copy[mode];
  const mail = email ?? (mode === "group" ? CONTACT.emails.groupClass : mode === "training" ? CONTACT.emails.teacherTraining : CONTACT.emails.general);
  return (
    <section className="border-t border-line bg-bone">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-12 md:px-10 md:py-16 lg:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] lg:pr-16">
          <RevealText text={title} className="h-section" />
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-md text-lg text-brown-soft">{lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primary[1]}>{primary[0]}</Button>
              <Button href={secondary[1]} variant="outline">
                {secondary[0]}
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 border-t border-line pt-3 text-brown-soft">
              <a href={`mailto:${mail}`} className={link}>
                Email us
              </a>
              {secondary[1] !== "/pricing-policies-list" && (
                <Link href="/pricing-policies-list" className={link}>
                  Pricing & Policies
                </Link>
              )}
              {mode !== "training" && mode !== "group" && (
                <Link href="/group-class-schedule" className={link}>
                  Group Class Schedule
                </Link>
              )}
            </div>
          </Reveal>
        </div>
        <ImageReveal src={image} position={position} sizes="(min-width: 1024px) 50vw, 100vw" className="min-h-72 lg:min-h-[32rem]" />
      </div>
    </section>
  );
}
