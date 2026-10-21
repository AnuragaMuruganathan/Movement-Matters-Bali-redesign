"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * One observer for every [data-reveal] element. Content is visible by default; it is only
 * hidden under `html.js` (set by the inline head script), so no-JS visitors, crawlers and
 * slow hydration never see blank sections. Anything already above the viewport is shown
 * at once, so fast scrolling or jump links can't skip past hidden blocks.
 */
export function RevealObserver() {
  useEffect(() => {
    window.__revealReady = true;
    const show = (el: Element) => el.setAttribute("data-shown", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < window.innerHeight) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const scan = (root: ParentNode) => root.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    scan(document);

    // Client-side navigation swaps page content in; pick up the new blocks.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches("[data-reveal]") ? io.observe(n) : scan(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
