import { CONTACT, HOURS } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

export function LocationBlock() {
  return (
    <section className="border-t border-line">
      <div className="grid lg:grid-cols-2">
        <div className="px-5 py-12 md:px-10 md:py-16 lg:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] lg:pr-16">
          <RevealText text="Find us in Nyuh Kuning" className="h-section" />
          <Reveal delay={0.15}>
            <address className="mt-6 text-xl not-italic leading-relaxed text-brown-soft">{CONTACT.address.join(", ")}</address>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {(
                [
                  ["Appointments", HOURS.appointments],
                  ["Front desk", HOURS.frontDesk],
                ] as const
              ).map(([label, rows]) => (
                <div key={label}>
                  <h3 className="meta">{label}</h3>
                  <dl className="mt-3 border-t border-line">
                    {rows.map(([d, h]) => (
                      <div key={d} className="flex justify-between gap-3 border-b border-line py-2.5">
                        <dt className="text-brown-soft">{d}</dt>
                        <dd>{h}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={CONTACT.whatsapp}>{CONTACT.phoneDisplay}</Button>
              <Button href={CONTACT.maps} variant="outline">
                Directions
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-[24rem] border-t border-line lg:min-h-full lg:border-l lg:border-t-0">
          <iframe
            title="Movement Matters Bali on Google Maps"
            src={CONTACT.mapEmbed}
            className="absolute inset-0 size-full border-0 grayscale-[60%] sepia-[10%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
