"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimelineItemType = "work" | "education" | "certification" | "milestone";

export interface TimelineItemData {
  id: string;
  type: TimelineItemType;
  title: string;
  organization: string;
  period: string;
  /** Shown as right-aligned year tag */
  year: string;
  location?: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  url?: string;
  /** Whether this is a key career event — renders accent treatment */
  featured?: boolean;
}

// ─── Type config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  TimelineItemType,
  { label: string; dotColor: string; iconGlyph: string }
> = {
  work:          { label: "Work",          dotColor: "var(--color-accent)",  iconGlyph: "◈" },
  education:     { label: "Education",     dotColor: "#10b981",               iconGlyph: "◎" },
  certification: { label: "Certification", dotColor: "#f59e0b",               iconGlyph: "⬡" },
  milestone:     { label: "Milestone",     dotColor: "#64748b",               iconGlyph: "◇" },
};

// ─── Dot node ─────────────────────────────────────────────────────────────────

interface DotProps {
  type: TimelineItemType;
  featured?: boolean;
  isInView: boolean;
}

function TimelineDot({ type, featured, isInView }: DotProps) {
  const { dotColor } = TYPE_CONFIG[type];
  const reduced = useReducedMotion();

  return (
    <div className="relative z-10 flex shrink-0 items-center justify-center">
      {/* Outer ring — only on featured items */}
      {featured && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 28,
            height: 28,
            border: `1px solid ${dotColor}40`,
          }}
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: EASE_OUT_EXPO }}
          aria-hidden
        />
      )}

      {/* Main dot */}
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{
          width: featured ? 16 : 10,
          height: featured ? 16 : 10,
          background: featured ? dotColor : "var(--color-bg-muted)",
          border: `1.5px solid ${featured ? dotColor : "var(--color-border)"}`,
          boxShadow: featured ? `0 0 12px ${dotColor}30` : "none",
        }}
        initial={reduced ? false : { scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.1, ease: EASE_OUT_EXPO }}
        aria-hidden
      />
    </div>
  );
}

// ─── Connector line ───────────────────────────────────────────────────────────

interface ConnectorProps {
  isLast: boolean;
  isInView: boolean;
}

function TimelineConnector({ isLast, isInView }: ConnectorProps) {
  const reduced = useReducedMotion();
  if (isLast) return null;

  return (
    <div
      className="absolute left-[19px] top-[28px] w-px"
      style={{
        height: "calc(100% - 4px)",
        background: "var(--color-border)",
        zIndex: 0,
      }}
      aria-hidden
    >
      {/* Animated fill — draws downward on scroll */}
      <motion.div
        className="absolute inset-x-0 top-0 origin-top"
        style={{ background: "var(--color-border)" }}
        initial={reduced ? false : { scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_EXPO }}
      />
    </div>
  );
}

// ─── TimelineItem ─────────────────────────────────────────────────────────────

interface TimelineItemProps {
  item: TimelineItemData;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReducedMotion();

  const { label, dotColor } = TYPE_CONFIG[item.type];

  return (
    <div
      ref={ref}
      className="relative flex gap-5 pb-10 last:pb-0"
      role="listitem"
    >
      {/* ── Left column: dot + connector ── */}
      <div className="relative flex flex-col items-center" style={{ width: 40, minWidth: 40 }}>
        <TimelineDot type={item.type} featured={item.featured} isInView={isInView} />
        <TimelineConnector isLast={isLast} isInView={isInView} />
      </div>

      {/* ── Right column: content card ── */}
      <motion.div
        className="flex min-w-0 flex-1 flex-col"
        initial={reduced ? false : { opacity: 0, x: 16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.07,
          ease: EASE_OUT_EXPO,
        }}
      >
        <div
          className={cn(
            "group relative flex flex-col gap-3 rounded-xl p-4",
            "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
            "transition-[border-color,background-color] duration-200",
            "hover:border-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.01)]",
            item.url && "cursor-pointer"
          )}
        >
          {/* Accent left border on featured */}
          {item.featured && (
            <div
              className="absolute bottom-4 left-0 top-4 w-[2px] rounded-full"
              style={{ background: dotColor, opacity: 0.6 }}
              aria-hidden
            />
          )}

          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              {/* Type label */}
              <span
                className="text-[10px] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: dotColor, opacity: 0.85 }}
              >
                {label}
              </span>

              {/* Title */}
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 outline-none focus-visible:underline"
                  aria-label={`${item.title} at ${item.organization} (opens in new tab)`}
                >
                  <h3
                    className="text-[15px] font-[600] leading-tight tracking-[-0.02em] group-hover/link:text-[var(--color-text-primary)]"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text-primary)",
                      transition: "opacity 150ms",
                    }}
                  >
                    {item.title}
                  </h3>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 shrink-0 opacity-0 transition-opacity duration-150 group-hover/link:opacity-40"
                    style={{ color: "var(--color-text-secondary)" }}
                    aria-hidden
                  >
                    <path d="M3 1h8v8M11 1l-9 9" />
                  </svg>
                </a>
              ) : (
                <h3
                  className="text-[15px] font-[600] leading-tight tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
                >
                  {item.title}
                </h3>
              )}
            </div>

            {/* Period chip */}
            <span
              className="shrink-0 rounded-md px-2 py-1 text-[11px] leading-none tracking-[0.02em]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-tertiary)",
                background: "var(--color-bg-muted)",
                border: "1px solid var(--color-border)",
              }}
              aria-label={`Period: ${item.period}`}
            >
              {item.period}
            </span>
          </div>

          {/* Organisation + location */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-[13px] font-[450]"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
            >
              {item.organization}
            </span>
            {item.location && (
              <>
                <span
                  className="h-[3px] w-[3px] rounded-full"
                  style={{ background: "var(--color-text-tertiary)" }}
                  aria-hidden
                />
                <span
                  className="text-[12px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
                >
                  {item.location}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p
            className="text-[13.5px] leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
          >
            {item.description}
          </p>

          {/* Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <ul className="flex flex-col gap-1.5" aria-label="Key highlights">
              {item.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-[13px] leading-snug"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
                >
                  <span
                    className="mt-[5px] h-1 w-1 shrink-0 rounded-full"
                    style={{ background: dotColor, opacity: 0.7 }}
                    aria-hidden
                  />
                  {h}
                </li>
              ))}
            </ul>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Related technologies">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  role="listitem"
                  className="rounded-md px-2 py-0.5 text-[11px] tracking-[0.02em]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-text-tertiary)",
                    background: "var(--color-bg-muted)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
