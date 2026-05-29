"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProficiencyLevel = "familiar" | "proficient" | "expert";

export interface SkillCardProps {
  name: string;
  /** SVG path string or component — keep to a single colour */
  icon: React.ReactNode;
  proficiency: ProficiencyLevel;
  /** Optional short descriptor e.g. "4 yrs" or "daily use" */
  descriptor?: string;
  /** Stagger delay index — parent controls ordering */
  index?: number;
  isVisible?: boolean;
  className?: string;
}

// ─── Proficiency config ───────────────────────────────────────────────────────

const PROFICIENCY_META: Record<
  ProficiencyLevel,
  { label: string; dots: number; color: string }
> = {
  familiar: {
    label: "Familiar",
    dots: 1,
    color: "var(--color-text-tertiary)",
  },
  proficient: {
    label: "Proficient",
    dots: 2,
    color: "var(--color-text-secondary)",
  },
  expert: {
    label: "Expert",
    dots: 3,
    color: "var(--color-accent)",
  },
};

// ─── Dot indicator ────────────────────────────────────────────────────────────

function ProficiencyDots({
  level,
  isVisible,
}: {
  level: ProficiencyLevel;
  isVisible: boolean;
}) {
  const { dots, color, label } = PROFICIENCY_META[level];
  const reduced = useReducedMotion();
  const total = 3;

  return (
    <div
      className="flex items-center gap-[3px]"
      role="img"
      aria-label={`Proficiency: ${label}`}
      title={label}
    >
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < dots;
        return (
          <motion.span
            key={i}
            className="block h-[5px] w-[5px] rounded-full"
            style={{
              background: filled ? color : "var(--color-bg-muted)",
              border: filled ? "none" : "1px solid var(--color-border)",
            }}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={
              isVisible
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.25,
              delay: 0.05 * i,
              ease: EASE_OUT_EXPO,
            }}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

// ─── SkillCard ────────────────────────────────────────────────────────────────

export function SkillCard({
  name,
  icon,
  proficiency,
  descriptor,
  index = 0,
  isVisible = true,
  className,
}: SkillCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl p-3.5",
        "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        "transition-[border-color,background-color,transform] duration-200",
        "hover:border-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.02)]",
        "cursor-default select-none",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      whileHover={reduced ? {} : { y: -2 }}
      transition={{
        default: { duration: 0.45, delay: index * 0.045, ease: EASE_OUT_EXPO },
        y: { duration: 0.18, ease: EASE_OUT_EXPO },
      }}
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          background: "var(--color-bg-muted)",
          border: "1px solid var(--color-border)",
        }}
        aria-hidden
      >
        <span className="flex h-[18px] w-[18px] items-center justify-center">
          {icon}
        </span>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <span
          className="text-[13px] font-[500] leading-none tracking-[-0.01em]"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-primary)",
          }}
        >
          {name}
        </span>

        {descriptor && (
          <span
            className="text-[11px] leading-none"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-tertiary)",
            }}
          >
            {descriptor}
          </span>
        )}
      </div>

      {/* Proficiency dots — bottom */}
      <ProficiencyDots level={proficiency} isVisible={isVisible} />
    </motion.div>
  );
}
