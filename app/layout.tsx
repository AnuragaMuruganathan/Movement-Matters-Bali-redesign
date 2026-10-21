import type { Metadata, Viewport } from "next";
import { Marcellus, Raleway } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";

const marcellus = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-marcellus", display: "swap" });
const raleway = Raleway({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-raleway", display: "swap" });

// Hide reveal-on-scroll blocks only when JS runs, and give up after 3s if RevealObserver never starts.
const REVEAL_BOOT = `document.documentElement.classList.add("js");setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove("js")},3000);`;

export const metadata: Metadata = {
  metadataBase: new URL("https://movementmatters-bali.com"),
  title: {
    default: "Movement Matters Bali | Premier Ubud Pilates Studio",
    template: "%s | Movement Matters Bali",
  },
  description:
    "Ubud's first fully equipped Pilates studio: Reformer classes, private Pilates, GYROTONIC® Method, Rolfing® Structural Integration and Pilates Teacher Training in Nyuh Kuning, Bali.",
  icons: { icon: "/assets/logo-icon.png", apple: "/assets/logo-icon.png" },
  openGraph: {
    type: "website",
    siteName: "Movement Matters Bali",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${raleway.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll />
          <RevealObserver />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  );
}
