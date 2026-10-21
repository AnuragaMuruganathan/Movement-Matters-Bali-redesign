import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "outline-light" | "text";

const styles: Record<Variant, string> = {
  primary: "bg-brown text-white hover:bg-[#3e230a]",
  outline: "border border-brown/25 text-brown hover:border-brown",
  light: "bg-white text-brown hover:bg-bone",
  "outline-light": "border border-white/40 text-white hover:border-white",
  text: "!min-h-11 !px-0 !justify-start self-start text-brown",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", icon = true, className = "" }: Props) {
  const external = /^(https?:|mailto:|tel:)/.test(href) || href.endsWith(".pdf");
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[4px] px-6 text-[1rem] tracking-wide transition-[background-color,border-color,transform] duration-300 active:scale-[0.98] cursor-pointer ${styles[variant]} ${className}`;
  const content = (
    <>
      <span className={variant === "text" ? "link-sweep" : ""}>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden
          weight="bold"
          className={`size-4 ${variant === "primary" || variant === "outline-light" ? "text-orange" : "text-orange-deep"} transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
