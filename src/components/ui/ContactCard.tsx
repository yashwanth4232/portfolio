"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactCardProps {
  /** Platform or contact type label — e.g. "Email", "LinkedIn" */
  label: string;
  /** The visible display value — e.g. email address, username */
  value: string;
  /** Optional short descriptor below the value */
  description?: string;
  /** Where the card links to */
  href: string;
  /** Whether to open in a new tab */
  external?: boolean;
  /** Icon element — keep to 18×18 */
  icon: ReactNode;
  /** Accent colour for hover state icon tint */
  accentColor?: string;
  /** Stagger index — drives entrance delay */
  index?: number;
  /** Whether this card is visible (controlled by parent IntersectionObserver) */
  isVisible?: boolean;
  className?: string;
}

// ─── ContactCard ──────────────────────────────────────────────────────────────

export function ContactCard({
  label,
  value,
  description,
  href,
  external = false,
  icon,
  accentColor = "var(--color-accent)",
  index = 0,
  isVisible = true,
  className,
}: ContactCardProps) {
  const reduced = useReducedMotion();

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.a
      href={href}
      {...linkProps}
      aria-label={`${label}: ${value}${description ? ` — ${description}` : ""}${external ? " (opens in new tab)" : ""}`}
      className={cn(
        "group relative flex items-center gap-4 rounded-xl p-4",
        "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        "transition-[border-color,background-color] duration-200",
        "hover:border-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.02)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]",
        "outline-none",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      whileHover={reduced ? {} : { y: -2 }}
      transition={{
        default: { duration: 0.45, delay: index * 0.07, ease: EASE_OUT_EXPO },
        y: { duration: 0.18, ease: EASE_OUT_EXPO },
      }}
    >
      {/* Icon container */}
      <motion.div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: "var(--color-bg-muted)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-tertiary)",
        }}
        whileHover={reduced ? {} : { backgroundColor: accentColor + "18" }}
        transition={{ duration: 0.2 }}
        aria-hidden
      >
        <motion.span
          className="flex h-[18px] w-[18px] items-center justify-center"
          style={{ color: "var(--color-text-secondary)" }}
          whileHover={reduced ? {} : { color: accentColor }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      </motion.div>

      {/* Text content */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {/* Label */}
        <span
          className="text-[10px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
        >
          {label}
        </span>

        {/* Value — truncate long email addresses on small screens */}
        <span
          className="truncate text-[13.5px] font-[500] leading-tight tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
        >
          {value}
        </span>

        {/* Description */}
        {description && (
          <span
            className="text-[12px] leading-snug"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-tertiary)" }}
          >
            {description}
          </span>
        )}
      </div>

      {/* Arrow — appears on hover */}
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 shrink-0 opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0.5 group-hover:opacity-40"
        style={{ color: "var(--color-text-secondary)" }}
        aria-hidden
      >
        <path d="M3 13L13 3M5 3h8v8" />
      </svg>
    </motion.a>
  );
}
