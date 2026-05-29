"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface MagneticOptions {
  strength?: number; // How far the element moves (default 0.35)
  ease?: number;     // Lerp factor for smoothness (default 0.1)
}

/**
 * Attaches a GSAP-powered magnetic effect to a DOM element.
 * On hover, the element softly follows the cursor.
 * Automatically cleaned up on unmount.
 *
 * Only active on pointer:fine devices (not touch).
 *
 * @example
 * const ref = useCursorMagnetic<HTMLButtonElement>();
 * return <button ref={ref}>Hover me</button>;
 */
export function useCursorMagnetic<T extends HTMLElement>(
  options: MagneticOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { strength = 0.35, ease = 0.1 } = options;

  useEffect(() => {
    // Skip on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    // Import GSAP lazily so it only loads client-side
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovered = false;

    const onEnter = () => { isHovered = true; };

    const onMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = (e.clientX - cx) * strength;
      targetY = (e.clientY - cy) * strength;
    };

    const onLeave = () => {
      isHovered = false;
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01 || isHovered) {
        el.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
      el.style.transform = "";
    };
  }, [strength, ease]);

  return ref;
}
