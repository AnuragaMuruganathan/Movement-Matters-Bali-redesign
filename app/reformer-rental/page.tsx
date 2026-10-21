import type { Metadata } from "next";
import { DownloadSimple } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/sections/PageHero";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { VideoPlayer } from "@/components/sections/VideoPlayer";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { IMG } from "@/content/media";
import { CONTACT, VIDEOS } from "@/content/site";

export const metadata: Metadata = {
  title: "Reformer Rental",
  description: "Rent a STOTT Reformer at our Ubud studio for your own practice, online sessions or teaching.",
};

const REASONS = [
  { title: "Keep practising", line: "Continue your Reformer routine during your Bali visit." },
  { title: "Online sessions", line: "Join your home teacher live from our studio." },
  { title: "Teach clients", line: "Available to Indonesian instructors." },
  { title: "Practice teaching", line: "Build hours and confidence as a new teacher." },
];

const RATES = [
  ["Single", "257,000"],
  ["5-pass", "1,120,000"],
  ["10-pass", "2,016,000"],
];

export default function RentalPage() {
  return (
    <>
      <PageHero
        image={IMG.gallery[7]}
        position="center 40%"
        title="Reformer Rental"
        lead="Your own Reformer, in a beautiful open-air studio in Ubud."
        actions={
          <>
            <Button href={CONTACT.whatsapp}>Reserve a Reformer</Button>
            <Button href="/assets/equipment-rental-tc.pdf" variant="outline">
              Terms & Conditions
            </Button>
          </>
        }
      />

      <section className="border-b border-line">
        <ul className="container-x grid sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 0.06} className="border-b border-line py-10 pr-6 last:border-b-0 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <span className="text-sm tabular-nums text-teal-deep">0{i + 1}</span>
              <h2 className="h-card mt-3">{r.title}</h2>
              <p className="mt-2 text-brown-soft">{r.line}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <SplitFeature reverse media={<VideoPlayer src={VIDEOS.rental} poster={IMG.gallery[4]} title="Reformer rental at our studio" className="!absolute inset-0" />}>
        <h2 className="h-section">Rates</h2>
        <p className="mt-3 text-brown-soft">Per Reformer, 55 minutes. Prices in IDR.</p>
        <dl className="mt-8 border-t border-line">
          {RATES.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-line py-4">
              <dt className="text-xl">{k}</dt>
              <dd className="text-2xl tabular-nums">Rp {v}</dd>
            </div>
          ))}
        </dl>
        <a href="/assets/equipment-rental-tc.pdf" target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex min-h-11 items-center gap-2 text-lg">
          <DownloadSimple aria-hidden weight="bold" className="size-5 text-orange-deep" /> <span className="link-sweep">Download rental terms (PDF)</span>
        </a>
      </SplitFeature>
    </>
  );
}
