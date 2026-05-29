"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SkillCard } from "./SkillCard";
import type { SkillCardProps } from "./SkillCard";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategorySkill
  extends Omit<SkillCardProps, "index" | "isVisible"> {
  name: string;
}

export interface SkillCategoryProps {
  title: string;
  /** Single emoji or SVG element for the category header */
  icon: string;
  skills: CategorySkill[];
  /** Grid column span hint — controls how many columns this category occupies */
  wide?: boolean;
  className?: string;
  /** Used to stagger the category cards themselves */
  categoryIndex?: number;
}

// ─── SkillCategory ────────────────────────────────────────────────────────────

export function SkillCategory({
  title,
  icon,
  skills,
  wide = false,
  className,
  categoryIndex = 0,
}: SkillCategoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "flex flex-col gap-4 rounded-2xl p-5",
        "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        wide && "lg:col-span-2",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: categoryIndex * 0.08,
        ease: EASE_OUT_EXPO,
      }}
      role="region"
      aria-labelledby={`category-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {/* Category header */}
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md text-[14px]"
          style={{
            background: "var(--color-bg-muted)",
            border: "1px solid var(--color-border)",
          }}
          aria-hidden
        >
          {icon}
        </span>
        <h3
          id={`category-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-[13px] font-[600] uppercase tracking-[0.08em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-secondary)",
          }}
        >
          {title}
        </h3>
        {/* Skill count chip */}
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-[10px] tracking-wide"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-tertiary)",
            background: "var(--color-bg-muted)",
            border: "1px solid var(--color-border)",
          }}
          aria-label={`${skills.length} skills`}
        >
          {skills.length}
        </span>
      </div>

      {/* Thin divider */}
      <div
        className="h-px w-full"
        style={{ background: "var(--color-border)" }}
        aria-hidden
      />

      {/* Skills grid — fluid, wraps naturally */}
      <div
        className={cn(
          "grid gap-2.5",
          wide
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            : "grid-cols-2 sm:grid-cols-3"
        )}
        role="list"
        aria-label={`${title} skills`}
      >
        {skills.map((skill, i) => (
          <div key={skill.name} role="listitem">
            <SkillCard
              {...skill}
              index={i}
              isVisible={isInView}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
