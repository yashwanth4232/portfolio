"use client";

import { motion, useReducedMotion as useFramerReduced } from "framer-motion";
import { useRef } from "react";
import { TerminalCard } from "./TerminalCard";
import { ScenePlaceholder } from "./ScenePlaceholder";
import { cn } from "@/lib/utils";
import {
  EASE_OUT_EXPO,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { useScrollParallax } from "@/hooks/useScrollParallax";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/yashwanthkumar",  // TODO: update URL
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yashwanthkumar", // TODO: update URL
    icon: LinkedInIcon,
  },
] as const;

// ─── Icon components ──────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 3H3v10h10v-3M10 3h3v3M13 3l-6 6" />
    </svg>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3.5 py-1.5"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
    >
      {/* Pulse dot */}
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span
        className="text-[12px] font-[450] tracking-wide"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}
      >
        Open to opportunities
      </span>
    </motion.div>
  );
}

// ─── Headline ─────────────────────────────────────────────────────────────────

interface HeadlineProps {
  reduced: boolean;
}

function Headline({ reduced }: HeadlineProps) {
  // Word-level animation — smoother than char, more controlled
  const words = ["Yashwanth", "Kumar"];

  if (reduced) {
    return (
      <h1
        className="font-display text-[var(--color-text-primary)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.035em",
        }}
      >
        Yashwanth Kumar
      </h1>
    );
  }

  return (
    <h1
      className="overflow-hidden font-display text-[var(--color-text-primary)]"
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        fontWeight: 700,
        lineHeight: 1.0,
        letterSpacing: "-0.035em",
      }}
      aria-label="Yashwanth Kumar"
    >
      {words.map((word, i) => (
        <span key={word} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.35 + i * 0.1,
              ease: EASE_OUT_EXPO,
            }}
            aria-hidden
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

// ─── Social link ──────────────────────────────────────────────────────────────

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

function SocialLink({ href, label, icon: Icon }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} profile (opens in new tab)`}
      className={cn(
        "group flex h-9 w-9 items-center justify-center rounded-lg",
        "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        "text-[var(--color-text-tertiary)]",
        "transition-colors duration-150",
        "hover:border-[rgba(255,255,255,0.12)] hover:text-[var(--color-text-secondary)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-bg-primary)] outline-none"
      )}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
    >
      <Icon className="h-[17px] w-[17px]" />
    </motion.a>
  );
}

// ─── CTA group ────────────────────────────────────────────────────────────────

function CTAGroup() {
  const reduced = useFramerReduced();

  const handleWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Primary */}
      <motion.a
        href="#work"
        onClick={handleWorkClick}
        className={cn(
          "group relative flex items-center gap-2 overflow-hidden rounded-lg px-5 py-2.5",
          "bg-[var(--color-accent)] text-white",
          "text-[14px] font-[500] tracking-[-0.01em]",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[var(--color-bg-primary)] outline-none"
        )}
        style={{ fontFamily: "var(--font-body)" }}
        whileHover={reduced ? {} : { scale: 1.02, y: -1 }}
        whileTap={reduced ? {} : { scale: 0.98, y: 0 }}
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
      >
        {/* Subtle shimmer overlay */}
        <motion.span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          initial={{ backgroundPosition: "200% 0" }}
          whileHover={{ backgroundPosition: "-200% 0" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-hidden
        />
        View my work
        <ArrowRightIcon className="h-[14px] w-[14px] transition-transform duration-150 group-hover:translate-x-0.5" />
      </motion.a>

      {/* Secondary */}
      <motion.a
        href="#contact"
        onClick={handleContactClick}
        className={cn(
          "flex items-center gap-2 rounded-lg px-5 py-2.5",
          "border border-[var(--color-border)] bg-transparent",
          "text-[14px] font-[500] tracking-[-0.01em] text-[var(--color-text-primary)]",
          "transition-[background-color,border-color] duration-150",
          "hover:border-[rgba(255,255,255,0.12)] hover:bg-[var(--color-bg-muted)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
          "focus-visible:ring-offset-[var(--color-bg-primary)] outline-none"
        )}
        style={{ fontFamily: "var(--font-body)" }}
        whileHover={reduced ? {} : { scale: 1.02, y: -1 }}
        whileTap={reduced ? {} : { scale: 0.98, y: 0 }}
        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
      >
        Get in touch
        <ExternalIcon className="h-[13px] w-[13px] opacity-60" />
      </motion.a>
    </div>
  );
}

// ─── Left column ──────────────────────────────────────────────────────────────

function HeroLeft({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="flex flex-col gap-7 lg:max-w-[520px]"
      variants={reduced ? {} : staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Status */}
      <motion.div variants={reduced ? {} : staggerItem}>
        <StatusBadge />
      </motion.div>

      {/* Headline */}
      <div>
        <Headline reduced={reduced} />
      </div>

      {/* Subtitle */}
      <motion.p
        className="text-[15px] font-[450] tracking-[-0.01em]"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-accent)",
          opacity: 0.9,
        }}
        variants={reduced ? {} : staggerItem}
      >
        Full Stack Developer &amp; AI Engineer
      </motion.p>

      {/* Description */}
      <motion.p
        className="max-w-[440px] text-[15px] leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
          fontWeight: 400,
        }}
        variants={reduced ? {} : staggerItem}
      >
        I design and build end-to-end products — from pixel-precise interfaces
        to production AI systems. Currently focused on the intersection of
        great UX and thoughtful engineering.
      </motion.p>

      {/* CTA */}
      <motion.div variants={reduced ? {} : staggerItem}>
        <CTAGroup />
      </motion.div>

      {/* Divider + Social */}
      <motion.div
        className="flex items-center gap-4"
        variants={reduced ? {} : staggerItem}
      >
        <div
          className="h-px flex-1 max-w-[40px]"
          style={{ background: "var(--color-border)" }}
          aria-hidden
        />
        <div className="flex items-center gap-2" role="list" aria-label="Social links">
          {SOCIAL_LINKS.map((link) => (
            <div key={link.label} role="listitem">
              <SocialLink
                href={link.href}
                label={link.label}
                icon={link.icon}
              />
            </div>
          ))}
        </div>
        <span
          className="text-[12px] tracking-wide"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-tertiary)",
          }}
        >
          @yashwanthkumar
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── Right column ─────────────────────────────────────────────────────────────

function HeroRight() {
  return (
    <div className="flex w-full flex-col gap-4 lg:max-w-[520px]">
      {/* 3D Scene placeholder — swap children for <HeroCanvas /> when ready */}
      <ScenePlaceholder
        className="h-[280px] sm:h-[320px] lg:h-[340px]"
      >
        {/* When R3F is ready, add:
          const HeroCanvas = dynamic(
            () => import("@/components/three/HeroCanvas"),
            { ssr: false, loading: () => null }
          );
          Then replace this comment with: <HeroCanvas />
        */}
      </ScenePlaceholder>

      {/* Terminal card */}
      <TerminalCard startDelay={900} />
    </div>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollHint() {
  const reduced = useFramerReduced();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6, ease: EASE_OUT_EXPO }}
      aria-hidden
    >
      <span
        className="text-[10px] uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
      >
        Scroll
      </span>
      {/* Animated line */}
      <div className="relative h-8 w-px overflow-hidden" style={{ background: "var(--color-border)" }}>
        <motion.div
          className="absolute inset-x-0 top-0 h-full"
          style={{ background: "var(--color-text-tertiary)" }}
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Background ambient ───────────────────────────────────────────────────────

function HeroBackground({ bgRef }: { bgRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={bgRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Top-left subtle radial */}
      <div
        className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,106,255,0.04) 0%, transparent 65%)",
        }}
      />
      {/* Bottom-right subtle radial */}
      <div
        className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,106,255,0.03) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const reduced = useFramerReduced() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Subtle parallax — background drifts up slightly slower than content,
  // right column drifts a touch faster. Creates depth without drama.
  // Both no-op on reduced-motion and touch devices (handled inside hook).
  useScrollParallax(bgRef, { strength: 0.04, direction: "up", scrub: 0.8 });
  useScrollParallax(rightColRef, { strength: 0.06, direction: "up", scrub: 0.5 });

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
      style={{ paddingBlockStart: "96px" }} // clear the fixed navbar
    >
      <HeroBackground bgRef={bgRef} />

      {/* ── Main content grid ── */}
      <div className="container-site relative z-10 w-full">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
          {/* Left: text — no parallax, anchored for readability */}
          <div className="flex-1">
            <HeroLeft reduced={reduced} />
          </div>

          {/* Right: visuals — gentle drift creates depth layer */}
          <div ref={rightColRef} className="w-full flex-1">
            <HeroRight />
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <ScrollHint />
    </section>
  );
}
