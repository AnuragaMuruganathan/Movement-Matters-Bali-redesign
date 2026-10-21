import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Gallery } from "@/components/sections/Gallery";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { IMG } from "@/content/media";

export const metadata: Metadata = {
  title: "Media",
  description: "Movement Matters Bali in the press, featured in Hello Bali magazine.",
};

export default function MediaPage() {
  return (
    <>
      <PageHero title="Media" lead="Movement Matters Bali, as featured in Hello Bali magazine." />
      <section className="section">
        <div className="container-x">
          <SectionHeading title="In the press" lead="Tap a page to read it full size." />
          <Gallery images={IMG.press} alt="Hello Bali magazine feature, page" columns="columns-1 md:columns-3" />
        </div>
      </section>
    </>
  );
}
