/**
 * gsap.ts — Centralised GSAP setup and scroll utilities
 *
 * ARCHITECTURE RULES
 * ──────────────────
 * 1. Import this file in CLIENT components only — never in server components.
 * 2. Call `initGSAP()` once at the app root via the SmoothScrollProvider.
 * 3. All ScrollTrigger instances must be created inside useEffect and
 *    returned in the cleanup function to prevent memory leaks.
 * 4. Only use transform: translateY/X/scale — never top/left/margin.
 *    These are compositor-only and skip layout + paint.
 * 5. Keep parallax multipliers ≤ 0.15. Anything higher reads as "effect",
 *    not "depth" — the goal is invisible polish, not visible motion.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── One-time setup ───────────────────────────────────────────────────────────

let initialized = false;

export function initGSAP(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger);

  // Global GSAP defaults — these are the baseline for all tweens
  gsap.defaults({
    ease: "power2.out",
    duration: 0.5,
    overwrite: "auto", // prevent conflicting tweens on the same property
  });

  // ScrollTrigger global config
  ScrollTrigger.config({
    ignoreMobileResize: true,                              // don't recompute on iOS toolbar hide/show
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // reduced from default for performance
  });
}

export { gsap, ScrollTrigger };

// ─── Cleanup helper ───────────────────────────────────────────────────────────

/**
 * Kills an array of ScrollTrigger instances and removes them from memory.
 * Always call this in the useEffect cleanup function.
 *
 * @example
 * return () => killTriggers(triggers);
 */
export function killTriggers(triggers: ScrollTrigger[]): void {
  triggers.forEach((t) => t.kill());
}

// ─── Parallax builder ─────────────────────────────────────────────────────────

/**
 * Creates a restrained parallax effect on an element.
 *
 * DELIBERATE CONSTRAINTS:
 * - `strength` is capped at 0.15 internally — prevents heavy effect
 * - Uses `translateY` only — compositor-only, never triggers layout
 * - `invalidateOnRefresh` ensures positions recalculate after resize
 * - Returns the ScrollTrigger instance for cleanup
 *
 * @param element  - The DOM element to animate
 * @param strength - How far the element moves relative to scroll (0–1).
 *                   0.05 = barely visible depth, 0.12 = noticeable but calm.
 *                   Clamped to 0.15 max.
 * @param direction - "up" (element moves opposite scroll) or "down"
 */
export function createParallax(
  element: HTMLElement,
  strength = 0.08,
  direction: "up" | "down" = "up"
): ScrollTrigger {
  const clampedStrength = Math.min(Math.abs(strength), 0.15);
  const multiplier = direction === "up" ? -clampedStrength : clampedStrength;

  // Calculate travel distance based on element height + viewport
  const distance = () =>
    (element.offsetHeight + window.innerHeight) * multiplier;

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom top",
    scrub: 0.6,          // 0.6s lag — feels smooth, not rubbery
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      // Direct GSAP set — avoids React re-render for every scroll tick
      gsap.set(element, {
        y: distance() * self.progress,
        force3D: true,   // hint to browser: keep on GPU compositor layer
      });
    },
  });

  return trigger;
}

// ─── Fade-in-on-scroll builder ────────────────────────────────────────────────

/**
 * Creates a scroll-triggered fade + slide entrance for a single element.
 * Use this for elements that Framer Motion doesn't already handle.
 *
 * @param element   - Target element
 * @param delay     - Optional delay (seconds) within a stagger sequence
 */
export function createScrollReveal(
  element: HTMLElement,
  delay = 0
): ScrollTrigger {
  // Set initial state
  gsap.set(element, { opacity: 0, y: 16 });

  const tween = gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: "power2.out",
    delay,
    paused: true,
  });

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: "top 88%",
    once: true,          // fire once — better performance than toggle
    onEnter: () => tween.play(),
  });

  return trigger;
}

// ─── Staggered children reveal ────────────────────────────────────────────────

/**
 * Scroll-triggers a staggered reveal on a container's direct children.
 * Useful for grids of cards where Framer Motion staggerContainer
 * would be wasteful (too many IntersectionObservers).
 *
 * @param container     - Parent element
 * @param childSelector - CSS selector for children (default: "> *")
 * @param stagger       - Seconds between each child (default: 0.065)
 */
export function createStaggerReveal(
  container: HTMLElement,
  childSelector = "> *",
  stagger = 0.065
): ScrollTrigger {
  const children = container.querySelectorAll<HTMLElement>(childSelector);

  gsap.set(children, { opacity: 0, y: 14 });

  const tween = gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger,
    paused: true,
  });

  const trigger = ScrollTrigger.create({
    trigger: container,
    start: "top 85%",
    once: true,
    onEnter: () => tween.play(),
  });

  return trigger;
}

// ─── Section fade-in ──────────────────────────────────────────────────────────

/**
 * Fades an entire section in as it enters the viewport.
 * Very subtle — opacity goes from 0.0 to 1.0 over a short scrub distance.
 * This adds "weight" to section transitions without being dramatic.
 *
 * @param section - The <section> element
 */
export function createSectionEntrance(section: HTMLElement): ScrollTrigger {
  gsap.set(section, { opacity: 0 });

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: "top 92%",
    end: "top 60%",
    scrub: false,
    once: true,
    onEnter: () => {
      gsap.to(section, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      });
    },
  });

  return trigger;
}
