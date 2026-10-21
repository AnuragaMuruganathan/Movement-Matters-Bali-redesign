import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Hotels & Services",
  description: "Hotels, transport, restaurants and wellness services within walking distance of our Nyuh Kuning studio in Ubud.",
};

const HOTELS: [string, string][] = [
  ["Weda Cita", "$100–170"],
  ["Beji Indah", "$170–200"],
  ["Kuna Hostels", "$30–50"],
  ["Labak River", "$50–80"],
  ["Budhi Ayu", "$30–50"],
  ["Puri Asri", "$70–100"],
  ["Eco Swasti Cottage", "$40–80"],
  ["Ubud Wana", "$70–100"],
  ["Villa Sonia", "$50–80"],
  ["Bali Bohemia", "$50–80"],
  ["Ubud Village Resort & Spa", "$200–300"],
  ["Outpost Ubud Coliving", "$35–50"],
  ["Umaya Villa", "$50–60"],
];

const FOOD: [string, string][] = [
  ["Sage", "Tasty vegan food"],
  ["Mother", "Western menu, great coffee"],
  ["Bali Soul", "Balinese & western, locally owned"],
  ["Kagemusha", "Japanese home cooking"],
  ["Warung Pasih", "Simple, great seafood"],
  ["Black Sheep", "Pizza & bakery"],
  ["Blend Cafe", "Smoothie bowls, Asian & western"],
  ["La Cantine", "French eatery & wine bar"],
  ["Bali Bohemia", "Middle Eastern, open mic nights"],
  ["Rajarani", "Indian"],
];

const TRANSPORT: [string, string][] = [
  ["Gojek & Grab", "Ride-hailing and delivery apps"],
  ["Made Darta, private driver", "WhatsApp +62 813 3714 2830"],
  ["Airport → Ubud", "$30"],
  ["Short trip in Ubud", "$6"],
  ["Half day (5 hrs)", "$35"],
  ["Full day (10 hrs)", "$65"],
];

const WELLNESS: [string, string][] = [
  ["Out-Post Co-Working", "Co-working space, ATM in the same building"],
  ["Bumi Sehat", "Non-profit clinic & natural birthing centre"],
  ["AmrtaSiddhi", "Ayurvedic treatment, detox & spa"],
  ["Ubud Wana Resort", "Spa"],
  ["Eco Swasti Cottage", "Spa"],
];

const GROUPS = [
  { title: "Stay", note: "Per night, nearest first", items: HOTELS, dot: "bg-teal" },
  { title: "Eat", note: "A short walk away", items: FOOD, dot: "bg-orange" },
  { title: "Getting around", note: "Apps and a trusted driver", items: TRANSPORT, dot: "bg-green" },
  { title: "Work & wellness", note: "Clinic, spa and co-working", items: WELLNESS, dot: "bg-brown" },
];

export default function HotelsPage() {
  return (
    <>
      <PageHero title="Hotels & Services" lead="Everything you need in Nyuh Kuning village, all within walking distance of the studio." />

      <section className="section">
        <div className="container-x">
          <SectionHeading title="Around the studio" lead="Prices are estimates in US dollars. We haven’t personally used every service listed." />
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {GROUPS.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.06}>
                <h3 className="h-card flex items-center gap-3 border-b border-brown/20 pb-3">
                  <span aria-hidden className={`size-2 rounded-full ${g.dot}`} />
                  {g.title}
                </h3>
                <p className="meta mt-3">{g.note}</p>
                <dl className="mt-3">
                  {g.items.map(([k, v]) => {
                    // Prices sit on the right as a tag; descriptions read underneath the name.
                    const price = v.startsWith("$");
                    return (
                      <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                        <dt className="text-[1.15rem] leading-snug">
                          {k}
                          {!price && <span className="mt-0.5 block text-sm text-muted">{v}</span>}
                        </dt>
                        {price && <dd className="font-ui shrink-0 text-[0.95rem] tabular-nums text-brown-soft">{v}</dd>}
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-brown-soft">More options from homestays to luxury hotels: search “Nyuh Kuning, Ubud” on Agoda or Booking.com.</p>
        </div>
      </section>
    </>
  );
}
