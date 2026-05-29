"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface ParallaxOptions {
  /**
   * Parallax strength — how far the element moves relative to scroll distance.
   * Range 0–1. Values above 0.15 start to feel like an "effect"; keep subtle.
   * - 0.04 → barely perceptible depth (backgrounds)
   * - 0.08 → gentle foreground depth (cards, panels)
   * - 0.12 → noticeable but calm (hero visual elements)
   */
  strength?: number;
  /** "up" = element moves opposite to scroll (standard parallax). "down" = follows scroll. */
  direction?: "up" | "down";
  /**
   * Scrub lag in seconds — how long the animation takes to "catch up" to scroll.
   * Higher = smoother but more behind. Lower = more responsive but can jitter.
   * 0.5–0.8 is the sweet spot.
   */
  scrub?: number;
}

/**
 * Attaches a GSAP ScrollTrigger parallax effect to a DOM element.
 *
 * PERFORMANCE CONTRACT:
 * - Uses `transform: translateY` only — compositor layer, no layout/paint
 * - `force3D: true` promotes element to its own GPU layer
 * - Cleans up the ScrollTrigger on unmount to prevent memory leaks
 * - No-ops on reduced-motion or touch devices (mobile parallax is expensive)
 * - No-ops on server (no window)
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useScrollParallax(ref, { strength: 0.08 });
 * return <div ref={ref}>content</div>;
 */
export function useScrollParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { strength = 0.08, direction = "up", scrub = 0.6 }: ParallaxOptions = {}
): void {
  useEffect(() => {
    // Skip on server
    if (typeof window === "undefined") return;

    // Respect reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Skip on touch-primary devices — parallax on touch is
    // computationally expensive and can cause scroll jitter
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    const clampedStrength = Math.min(Math.abs(strength), 0.15);
    const multiplier = direction === "up" ? -clampedStrength : clampedStrength;

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const setup = async () => {
      try {
        const { gsap, ScrollTrigger, initGSAP } = await import("@/lib/gsap");
        initGSAP();

        trigger = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const distance = (el.offsetHeight + window.innerHeight) * multiplier;
            gsap.set(el, {
              y: distance * self.progress,
              force3D: true,
            });
          },
        });
      } catch (err) {
        // Silently degrade if GSAP fails
        console.warn("[useScrollParallax] GSAP setup failed:", err);
      }
    };

    setup();

    return () => {
      trigger?.kill();
      // Reset the transform so the element returns to its natural position
      if (el) {
        el.style.transform = "";
      }
    };
  }, [ref, strength, direction, scrub]);
}
