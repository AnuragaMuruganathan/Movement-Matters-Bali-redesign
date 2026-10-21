import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { PricingTabs } from "@/components/sections/PricingTabs";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { POLICIES } from "@/content/pricing";
import { CONTACT, legacy } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing & Policies",
  description: "Prices for private Pilates, GYROTONIC®, Rolfing®, group Reformer classes and Reformer rental in Ubud, plus studio policies.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[1]}
        position="center 35%"
        title="Pricing & Policies"
        lead="All sessions are 55 minutes. Prices in Indonesian Rupiah."
        actions={
          <>
            <Button href={CONTACT.whatsapp}>Book Now</Button>
            <Button href={legacy("confidential-client-profile")} variant="outline">
              Sign Up
            </Button>
          </>
        }
      />

      <section className="section">
        <div className="container-x">
          <PricingTabs />
        </div>
      </section>

      <section className="section border-t border-line bg-bone">
        <div className="container-x">
          <SectionHeading title="Policies" lead="Advance payment secures every booking. Packages expire in 12 months." />
          {/* Equal-height cards so lists of different lengths still read as one tidy row. */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {POLICIES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="h-full rounded-[6px] border border-line bg-white p-6">
                <h3 className="h-card border-b border-brown/20 pb-3">{p.title}</h3>
                <ul className="text-brown-soft">
                  {p.items.map((it) => (
                    <li key={it} className="border-b border-line py-3 last:border-b-0 last:pb-0">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grid border-t border-line md:grid-cols-2">
        {[
          { title: "Gift certificates", line: "Any value, valid for any session type.", cta: "Buy a Gift", href: CONTACT.whatsapp },
          { title: "Ready to join?", line: "Complete your client profile before your first session.", cta: "Sign Up", href: legacy("confidential-client-profile") },
        ].map((b, i) => (
          <div key={b.title} className={`px-5 py-14 md:px-10 md:py-16 ${i === 0 ? "lg:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]" : "border-t border-line md:border-l md:border-t-0"}`}>
            <RevealText text={b.title} className="h-section" />
            <Reveal delay={0.15}>
              <p className="mt-3 max-w-md text-lg text-brown-soft">{b.line}</p>
              <Button href={b.href} variant={i === 0 ? "primary" : "outline"} className="mt-7">
                {b.cta}
              </Button>
            </Reveal>
          </div>
        ))}
      </section>
    </>
  );
}
