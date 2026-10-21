"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, List, X } from "@phosphor-icons/react/ssr";
import { CONTACT, NAV } from "@/content/site";
import { IMG } from "@/content/media";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state reset during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const norm = (p: string) => p.replace(/\/$/, "") || "/";
  const here = norm(pathname);
  const isActive = (href: string, children?: { href: string }[]) => here === href || children?.some((c) => c.href === here);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-[border-color] duration-500 ${scrolled || open ? "border-b border-line" : "border-b border-transparent"}`}>
      <div className="container-x flex h-[76px] items-center justify-between gap-6 md:h-[84px]">
        <Link href="/" aria-label="Movement Matters Bali, home" className="shrink-0">
          <Image src={IMG.logoHeader} alt="Movement Matters Bali" priority className="h-[52px] w-auto md:h-[60px]" sizes="(min-width: 768px) 160px, 140px" />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7 2xl:gap-9">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1.5 py-7 text-[1.0625rem] tracking-[0.02em] 2xl:text-[1.125rem] transition-colors hover:text-orange-deep ${
                    isActive(item.href, item.children) ? "text-brown" : "text-brown/85"
                  }`}
                >
                  {item.label}
                  {item.children && <CaretDown aria-hidden weight="bold" className="size-3 transition-transform duration-300 group-hover:rotate-180" />}
                  {isActive(item.href, item.children) && <span className="absolute inset-x-0 bottom-5 h-px bg-orange" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="min-w-64 border border-line bg-white py-2 shadow-[0_12px_32px_-12px_rgba(84,48,15,0.12)]">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`flex items-center justify-between px-5 py-2.5 text-[0.98rem] transition-colors hover:bg-bone ${here === c.href ? "text-orange-deep" : "text-brown"}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-[4px] bg-brown px-5 text-[0.98rem] tracking-wide text-white transition-colors hover:bg-[#3e230a] sm:inline-flex"
          >
            Book Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center border border-line text-brown xl:hidden"
          >
            {open ? <X weight="bold" className="size-5" /> : <List weight="bold" className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain bg-white xl:hidden"
          >
            <ul className="container-x py-2">
              {[{ label: "Home", href: "/" }, ...NAV].map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  className="border-b border-line"
                >
                  {"children" in item && item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                        aria-expanded={expanded === item.label}
                        className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-[1.7rem]"
                      >
                        {item.label}
                        <CaretDown aria-hidden weight="bold" className={`size-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {expanded === item.label && (
                        <ul className="pb-4">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="block py-2 text-lg text-brown-soft">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 text-[1.7rem]">
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="container-x pb-10 pt-4">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-[4px] bg-brown text-lg text-white">
                Book via WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
