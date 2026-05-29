"use client";

import { useEffect, useRef } from "react";

/**
 * useLenis — refined smooth scroll initialisation
 *
 * DESIGN DECISIONS
 * ────────────────
 * - duration: 0.9 (was 1.2) — feels snappier, less "floaty"
 * - easing: exponential ease-out — natural deceleration
 * - smoothWheel: true — only smooth on wheel, not touch (touch is already smooth)
 * - touchMultiplier: 1.5 — slightly amplified so mobile doesn't feel sluggish
 * - syncWithGSAP: Lenis drives GSAP ScrollTrigger via the ticker,
 *   NOT via a scroll event listener — avoids a 1-frame lag between
 *   smooth scroll position and trigger calculations
 * - lagSmoothing(0): disables GSAP's frame-drop compensation which would
 *   cause jumps when combined with Lenis
 *
 * CLEANUP
 * ───────
 * lenis.destroy() is called on unmount — removes all event listeners,
 * RAF callbacks, and GSAP ticker integrations cleanly.
 *
 * ACCESSIBILITY
 * ─────────────
 * On reduced-motion: Lenis is not initialised. Native scroll is used.
 * This ensures `prefers-reduced-motion` users always get instant, native scroll.
 */
export function useLenis(): void {
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference — use native scroll
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Prevent double-initialisation in StrictMode
    if (lenisRef.current) return;

    let gsapTickerCallback: ((time: number) => void) | null = null;

    const init = async () => {
      try {
        const [{ default: Lenis }, { gsap, ScrollTrigger, initGSAP }] =
          await Promise.all([
            import("lenis"),
            import("@/lib/gsap"),
          ]);

        initGSAP();

        const lenis = new Lenis({
          duration: 0.9,                           // tight, snappy — not floaty
          easing: (t: number) => 1 - Math.pow(1 - t, 4), // quartic ease-out
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 1.5,                    // feel on mobile
          infinite: false,
        });

        lenisRef.current = lenis;

        // ── GSAP ticker integration ──────────────────────────────────────
        // Lenis RAF must run inside GSAP's ticker so ScrollTrigger reads
        // the exact same scroll position Lenis has calculated for this frame.
        gsapTickerCallback = (time: number) => {
          lenis.raf(time * 1000); // gsap.ticker gives seconds, lenis wants ms
        };

        gsap.ticker.add(gsapTickerCallback);
        gsap.ticker.lagSmoothing(0); // disable lag compensation

        // Keep ScrollTrigger in sync on every Lenis scroll event
        lenis.on("scroll", ScrollTrigger.update);

      } catch (err) {
        // If Lenis or GSAP fails to load, silently fall back to native scroll
        console.warn("[useLenis] Failed to initialise smooth scroll:", err);
      }
    };

    init();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Remove ticker callback if it was registered
      if (gsapTickerCallback) {
        import("@/lib/gsap").then(({ gsap }) => {
          if (gsapTickerCallback) gsap.ticker.remove(gsapTickerCallback);
        });
      }
    };
  }, []);
}
