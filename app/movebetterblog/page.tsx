import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { IMG } from "@/content/media";
import { legacy } from "@/content/site";

export const metadata: Metadata = {
  title: "Move Better Blog",
  description: "Articles on Pilates, core strength, pain relief and wellness in Ubud from Movement Matters Bali.",
};

// Posts still live on the WordPress site.
const POSTS = [
  { title: "Movement Matters Bali's Story", slug: "our-story", image: IMG.team, topic: "Studio" },
  { title: "Your Deep Core Muscles, Part 1", slug: "your-deep-core-muscles-where-is-it-part-1", image: IMG.gallery[11], topic: "Core" },
  { title: "Your Deep Core Muscles, Part 2", slug: "your-deep-core-muscles-where-is-it-part-2", image: IMG.gallery[13], topic: "Core" },
  { title: "2-Minute Exercises for a Sore Neck & Shoulders", slug: "2-minutes-exercises-for-sore-neck-and-shoulder", image: IMG.gallery[14], topic: "Pain relief" },
  { title: "Bali Pilates Retreat", slug: "bali-pilates-retreat", image: IMG.gallery[0], topic: "Retreats" },
  { title: "Physical Therapy in Ubud", slug: "physical-therapy-in-ubud", image: IMG.gallery[5], topic: "Wellness" },
  { title: "Yoga in Ubud", slug: "yoga-in-ubud", image: IMG.gallery[9], topic: "Wellness" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero image={IMG.gallery[18]} title="Move Better Blog" lead="Practical insights on posture, core and pain-free movement." />
      <section className="section">
        <div className="container-x grid gap-x-2 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.06} className={i === 0 ? "md:col-span-2 md:row-span-2" : i >= 5 ? "lg:col-span-2" : ""}>
              <a href={legacy(p.slug)} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
                <div className={`relative overflow-hidden bg-sand ${i === 0 ? "aspect-[4/3] md:aspect-auto md:flex-1" : i >= 5 ? "aspect-[4/3] lg:aspect-[2/1]" : "aspect-[4/3]"}`}>
                  <Image src={p.image} alt="" fill sizes={i === 0 || i >= 5 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} className="photo object-cover transition-transform duration-1000 group-hover:scale-[1.05]" placeholder="blur" />
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-line py-4">
                  <div>
                    <p className="meta">{p.topic}</p>
                    <h2 className={`mt-1 ${i === 0 ? "text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight tracking-[-0.02em]" : "h-card"}`}>
                      <span className="link-sweep">{p.title}</span>
                    </h2>
                  </div>
                  <ArrowUpRight aria-hidden weight="bold" className="mt-1 size-5 shrink-0 text-orange-deep transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
