"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Override the default fadeUp variant */
  variants?: typeof fadeUp;
  /** How much of the element must be visible before animating (0–1) */
  threshold?: number;
}

/**
 * Wraps any element in a scroll-triggered fade+slide entrance.
 * Respects prefers-reduced-motion automatically.
 *
 * @example
 * <RevealOnScroll delay={0.2}>
 *   <h2>Section Title</h2>
 * </RevealOnScroll>
 */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  threshold = 0.1,
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE, amount: threshold });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={reduced ? {} : variants}
      custom={delay}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  );
}
