"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

interface RevealOptions {
  /** Y offset to start from (px). Default: 16 */
  yOffset?: number;
  /** Animation duration (seconds). Default: 0.55 */
  duration?: number;
  /** Stagger between children (seconds). 0 = no stagger, animate container as one */
  stagger?: number;
  /** CSS selector for children to stagger. Only used when stagger > 0 */
  childSelector?: string;
  /** ScrollTrigger start. Default: "top 88%" */
  start?: string;
  /** Delay before animation fires (seconds). Default: 0 */
  delay?: number;
}

/**
 * Attaches a GSAP scroll-triggered fade+slide reveal.
 * Designed for elements that already use Framer Motion in some states
 * but need GSAP's scrub or precise timing control.
 *
 * KEY DIFFERENCE from Framer Motion's useInView:
 * - GSAP fires synchronously with the GSAP ticker, so if Lenis is active,
 *   the reveal fires at the exact interpolated scroll position — not the
 *   raw scroll event position. This produces smoother visual results.
 *
 * PERFORMANCE:
 * - `once: true` — trigger fires once, is then removed from the update loop
 * - Initial state is set with gsap.set (synchronous, no RAF) — prevents FOUC
 * - Reduced-motion: no-ops, leaving Framer Motion to handle accessibility
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useGSAPReveal(ref, { stagger: 0.065, childSelector: ".card" });
 * return <div ref={ref}><div className="card" /><div className="card" /></div>;
 */
export function useGSAPReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  {
    yOffset = 16,
    duration = 0.55,
    stagger = 0,
    childSelector = "> *",
    start = "top 88%",
    delay = 0,
  }: RevealOptions = {}
): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const setup = async () => {
      try {
        const { gsap, ScrollTrigger, initGSAP } = await import("@/lib/gsap");
        initGSAP();

        if (stagger > 0) {
          // Staggered children reveal
          const children = el.querySelectorAll<HTMLElement>(childSelector);
          if (children.length === 0) return;

          gsap.set(children, { opacity: 0, y: yOffset });
          const tween = gsap.to(children, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            stagger,
            delay,
            paused: true,
            force3D: true,
          });

          trigger = ScrollTrigger.create({
            trigger: el,
            start,
            once: true,
            onEnter: () => tween.play(),
          });
        } else {
          // Single element reveal
          gsap.set(el, { opacity: 0, y: yOffset });
          const tween = gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            delay,
            paused: true,
            force3D: true,
          });

          trigger = ScrollTrigger.create({
            trigger: el,
            start,
            once: true,
            onEnter: () => tween.play(),
          });
        }
      } catch (err) {
        console.warn("[useGSAPReveal] GSAP setup failed:", err);
      }
    };

    setup();

    return () => {
      trigger?.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
