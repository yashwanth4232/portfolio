"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section ID is currently most visible in the viewport.
 * Uses IntersectionObserver for zero scroll-listener overhead.
 *
 * @param sectionIds - Array of element IDs to observe (without #)
 * @param rootMargin - IntersectionObserver rootMargin (default biases toward top)
 *
 * @example
 * const active = useActiveSection(["hero", "about", "work", "contact"]);
 */
export function useActiveSection(
  sectionIds: string[],
  rootMargin = "-20% 0px -60% 0px"
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIds, rootMargin]);

  return activeId;
}
