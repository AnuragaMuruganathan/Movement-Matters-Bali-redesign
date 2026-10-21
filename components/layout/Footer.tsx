import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react/ssr";
import { CONTACT, FOOTER_LINKS, NAV } from "@/content/site";
import { IMG } from "@/content/media";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { BackToTop, CurrentYear, OpenStatus } from "@/components/layout/FooterLive";

const children = (label: string) => NAV.find((n) => n.label === label)?.children ?? [];

const COLUMNS = [
  { title: "Studio", links: [...children("Pilates & Gyrotonic®"), { label: "Rolfing®", href: "/rolfing-structural-integration" }] },
  { title: "Training", links: children("Teacher Training") },
  { title: "Instructors", links: children("Instructors") },
  { title: "Info", links: FOOTER_LINKS },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cocoa text-white/75">
      {/* Brand + visit */}
      <div className="container-x grid gap-8 pb-8 pt-10 md:pt-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <Link href="/" aria-label="Movement Matters Bali, home" className="flex w-fit">
            <Image src={IMG.logoWordmarkReverse} alt="Movement Matters Bali" className="h-[4.5rem] w-auto md:h-20" sizes="200px" />
          </Link>
          <p className="mt-6 max-w-md text-[clamp(1.6rem,2.2vw,2.15rem)] leading-[1.12] tracking-[-0.02em] text-white [text-wrap:balance]">
            Pilates, GYROTONIC® and Rolfing® in the village of <span className="text-orange">Nyuh Kuning, Ubud.</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 text-[1.25rem] text-white"
            >
              <span className="link-sweep">{CONTACT.phoneDisplay}</span>
              <ArrowUpRight aria-hidden weight="bold" className="size-4 text-orange transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(WhatsApp)</span>
            </a>
            <a href={`mailto:${CONTACT.emails.general}`} className="link-sweep inline-flex min-h-11 items-center break-all text-white/75 hover:text-white">
              {CONTACT.emails.general}
            </a>
          </div>
          <SocialLinks tone="light" className="mt-3" />
        </div>

        <div className="lg:col-span-7">
          {/* Opening hours live on Contact and the location block; here just status and the way in. */}
          <div className="flex flex-col gap-5 rounded-[6px] border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h2 className="text-[0.8125rem] uppercase tracking-[0.12em] text-orange">Visit the studio</h2>
              <address className="mt-2 not-italic leading-relaxed text-white">{CONTACT.address.join(", ")}</address>
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 text-white/75 hover:text-white"
              >
                <span className="link-sweep">Get directions</span>
                <ArrowUpRight aria-hidden weight="bold" className="size-4 text-orange" />
              </a>
            </div>
            <div className="shrink-0">
              <OpenStatus />
              <p className="mt-2 text-[0.8125rem] text-white/60">Bali time (WITA)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns: open on tablet and up, collapsible on phones so the footer stays short */}
      <nav aria-label="Footer" className="container-x">
        <div className="border-t border-white/10 py-4 md:grid md:grid-cols-4 md:gap-10 md:py-8">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <details className="group border-b border-white/10 md:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[0.8125rem] uppercase tracking-[0.12em] text-white/60 [&::-webkit-details-marker]:hidden">
                  {col.title}
                  <CaretDown aria-hidden weight="bold" className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <FooterLinks links={col.links} />
              </details>
              <div className="hidden md:block">
                <h2 className="text-[0.8125rem] uppercase tracking-[0.12em] text-white/60">{col.title}</h2>
                <FooterLinks links={col.links} />
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom bar */}
      <div className="container-x">
        <div className="flex flex-col gap-2 border-t border-white/10 py-3 text-sm md:py-2 text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> Movement Matters Bali · Premier Ubud Pilates Studio
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="pb-3 md:mt-3 md:pb-0">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="flex min-h-11 items-center transition-colors hover:text-white md:min-h-9">
            <span className="link-sweep">{l.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
