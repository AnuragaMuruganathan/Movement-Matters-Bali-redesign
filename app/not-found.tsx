import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-[84px]">
      <div className="container-x py-16">
        <p className="meta">404</p>
        <RevealText as="h1" immediate text="Page not found" className="h-display mt-4" />
        <p className="mt-6 max-w-lg text-lg text-brown-soft">This page has moved or no longer exists.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
