/**
 * motion.ts — Unified motion system for the portfolio
 *
 * PHILOSOPHY
 * ──────────
 * Every animation token in this file corresponds to a deliberate decision.
 * The goal is to feel like Linear or Vercel: confident, restrained, precise.
 *
 * HIERARCHY
 * ─────────
 * 1. Easings      — the DNA of all curves
 * 2. Durations    — a strict timing scale (no arbitrary values)
 * 3. Offsets      — consistent translate distances
 * 4. Transitions  — pre-built transition objects (import and spread)
 * 5. Variants     — reusable Framer Motion variant maps
 * 6. Hover        — standardized interactive states
 * 7. Viewport     — shared IntersectionObserver config
 */

import type { Variants, Transition, TargetAndTransition } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// 1. EASINGS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Primary easing — fast start, long tail.
 * Use for: entrances, reveals, exits, most animations.
 * Feels like: Apple, Vercel, Linear.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Balanced easing — symmetrical, deliberate.
 * Use for: page transitions, modal enters, state changes with weight.
 */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/**
 * Subtle ease-out — gentler than EASE_OUT, less dramatic.
 * Use for: micro-interactions, color transitions, opacity-only fades.
 */
export const EASE_SOFT = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Spring — used sparingly for positive feedback (e.g. form success).
 * Intentionally has a small overshoot to feel "alive".
 */
export const SPRING_BOUNCE = { type: "spring", stiffness: 280, damping: 22, mass: 0.8 } as const;

/**
 * Spring — damped, no overshoot. Use for hover scale on interactive elements.
 */
export const SPRING_SMOOTH = { type: "spring", stiffness: 260, damping: 28, mass: 0.6 } as const;

// Aliases kept for backward-compat with existing components
/** @deprecated Use EASE_OUT */
export const EASE_OUT_EXPO = EASE_OUT;
/** @deprecated Use EASE_IN_OUT */
export const EASE_IN_OUT_QUART = EASE_IN_OUT;
/** @deprecated Use SPRING_SMOOTH */
export const EASE_SPRING = { stiffness: 260, damping: 28, mass: 0.6 };

// ─────────────────────────────────────────────────────────────────────────────
// 2. DURATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strict duration scale — never use arbitrary values outside these.
 *
 *  XS  → micro-interactions (hover colour, opacity toggle)
 *  SM  → hover transforms, quick state changes
 *  MD  → component entrances, card reveals
 *  LG  → section reveals, headline animation
 *  XL  → complex staggered sequences
 */
export const DUR = {
  XS:  0.12,
  SM:  0.2,
  MD:  0.45,
  LG:  0.6,
  XL:  0.75,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 3. TRANSLATE OFFSETS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standardized translate-Y offsets for entrance animations.
 * Always pair with opacity: 0→1.
 *
 *  SM  → subtle card reveals, inline elements
 *  MD  → standard section content
 *  LG  → section headings, hero elements
 */
export const OFFSET = {
  SM: 12,
  MD: 20,
  LG: 32,
} as const;

/**
 * Hover lift — how far an interactive element rises on hover.
 * Use consistently across ALL cards and buttons.
 */
export const HOVER_LIFT = -3 as const;
export const HOVER_LIFT_SM = -2 as const; // compact elements (nav, badges)

// ─────────────────────────────────────────────────────────────────────────────
// 4. TRANSITION OBJECTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pre-built transition objects — spread directly into `transition` props.
 *
 * Usage: <motion.div transition={T.entrance} />
 */
export const T = {
  // Component entrances
  entrance: { duration: DUR.MD, ease: EASE_OUT } as Transition,
  entranceSlow: { duration: DUR.LG, ease: EASE_OUT } as Transition,
  entranceFast: { duration: DUR.SM, ease: EASE_OUT } as Transition,

  // Stagger orchestration
  stagger: (delay = 0): Transition => ({
    duration: DUR.MD,
    ease: EASE_OUT,
    delay,
  }),

  // Hover interactions — fast, responsive
  hover: { duration: DUR.SM, ease: EASE_SOFT } as Transition,
  hoverSpring: SPRING_SMOOTH as Transition,

  // Colour/opacity transitions (CSS handles these, but for motion.div)
  colorFast: { duration: DUR.XS, ease: EASE_SOFT } as Transition,
  color: { duration: DUR.SM, ease: EASE_SOFT } as Transition,

  // Spring feedback (success state, bouncy icons)
  bounce: SPRING_BOUNCE as Transition,

  // Layout animations
  layout: { duration: DUR.SM, ease: EASE_IN_OUT } as Transition,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 5. VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

// ── Fade variants ─────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: OFFSET.MD },
  visible: { opacity: 1, y: 0, transition: T.entrance },
};

export const fadeUpSm: Variants = {
  hidden:  { opacity: 0, y: OFFSET.SM },
  visible: { opacity: 1, y: 0, transition: T.entrance },
};

export const fadeUpLg: Variants = {
  hidden:  { opacity: 0, y: OFFSET.LG },
  visible: { opacity: 1, y: 0, transition: T.entranceSlow },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: T.entrance },
};

export const fadeInSlow: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: T.entranceSlow },
};

// ── Slide variants ────────────────────────────────────────────────────────────

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -OFFSET.LG },
  visible: { opacity: 1, x: 0, transition: T.entranceSlow },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: OFFSET.LG },
  visible: { opacity: 1, x: 0, transition: T.entranceSlow },
};

export const slideInRightSm: Variants = {
  hidden:  { opacity: 0, x: OFFSET.MD },
  visible: { opacity: 1, x: 0, transition: T.entrance },
};

// ── Scale variants ────────────────────────────────────────────────────────────

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: T.entrance },
};

export const scaleInBounce: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: T.bounce },
};

// ── Stagger containers ────────────────────────────────────────────────────────

/**
 * Standard stagger — 80ms between children.
 * Use for: section content, card grids, nav items.
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/**
 * Tight stagger — 55ms between children.
 * Use for: skill chips, badge lists, dense grids.
 */
export const staggerTight: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

/**
 * Relaxed stagger — 110ms between children.
 * Use for: timeline items, large cards, spaced content.
 */
export const staggerRelaxed: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.1 },
  },
};

/**
 * Default stagger item — pairs with any stagger container.
 */
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: OFFSET.SM },
  visible: { opacity: 1, y: 0, transition: T.entrance },
};

// ── Hero-specific variants ────────────────────────────────────────────────────

/**
 * Hero word reveal — clips from below, gives a "mask" effect without clip-path.
 * Wrap each word in overflow-hidden.
 */
export const heroWord: Variants = {
  hidden:  { opacity: 0, y: "105%" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: "0%",
    transition: { ...T.entranceSlow, delay: 0.3 + i * 0.1 },
  }),
};

/**
 * @deprecated Renamed to heroWord
 */
export const charReveal = heroWord;

// ── Nav variants ──────────────────────────────────────────────────────────────

export const navEntrance: Variants = {
  hidden:  { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: T.entranceSlow },
};

export const mobileMenuEntrance: Variants = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,  transition: T.entranceFast },
  exit:    { opacity: 0, y: -8, scale: 0.97, transition: T.entranceFast },
};

export const mobileMenuItemEntrance: Variants = {
  hidden:  { opacity: 0, x: -8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DUR.SM, delay: i * 0.04, ease: EASE_OUT },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. HOVER PRESETS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard card lift — used by ProjectCard, SkillCard, ContactCard, StatCard.
 * Call with `whileHover={HOVER.lift}` and `transition={T.hover}`.
 */
export const HOVER = {
  /** Standard card — lifts 3px */
  lift:    { y: HOVER_LIFT }    as TargetAndTransition,
  /** Compact element — lifts 2px (nav links, badges) */
  liftSm:  { y: HOVER_LIFT_SM } as TargetAndTransition,
  /** Icon / logo — subtle scale */
  scale:   { scale: 1.06 }      as TargetAndTransition,
  /** Button — scale + tiny lift */
  button:  { scale: 1.02, y: -1 } as TargetAndTransition,
  /** Pressed / tap feedback */
  tap:     { scale: 0.97 }        as TargetAndTransition,
  /** Ghost — no transform, colour change only via CSS */
  none:    {}                     as TargetAndTransition,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 7. VIEWPORT CONFIG
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard IntersectionObserver config for scroll-triggered animations.
 * Triggers when 10% of the element has entered the viewport from either side.
 */
export const VIEWPORT_ONCE = { once: true, margin: "-10% 0px" } as const;

/**
 * Early trigger — for large sections where you want animation to start
 * before the element fully enters the viewport.
 */
export const VIEWPORT_EARLY = { once: true, margin: "0% 0px" } as const;

/**
 * Late trigger — for elements that should animate only when well in view.
 * Good for below-fold content where you want more visual confirmation.
 */
export const VIEWPORT_LATE = { once: true, margin: "-20% 0px" } as const;
