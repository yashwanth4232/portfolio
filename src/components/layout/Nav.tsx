"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "Experience", href: "#experience", id: "experience" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

// ─── Smooth scroll handler ────────────────────────────────────────────────────

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  // Works whether Lenis is active or not
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Back to top"
      className="group flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
    >
      {/* Geometric mark */}
      <div className="relative h-[22px] w-[22px]">
        <motion.div
          className="absolute inset-0 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-bg-muted)]"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-[4px] rounded-[2px] bg-[var(--color-accent)]"
          whileHover={{ scale: 0.85 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Name */}
      <span
        className="font-display text-[15px] font-600 tracking-[-0.02em] text-[var(--color-text-primary)] transition-opacity duration-150 group-hover:opacity-80"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        Your Name
      </span>
    </a>
  );
}

// ─── Desktop nav link ─────────────────────────────────────────────────────────

interface NavLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}

function DesktopNavLink({ label, href, isActive, onClick }: NavLinkProps) {
  const reduced = useReducedMotion();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "relative px-3 py-1.5 text-[13.5px] font-[450] tracking-[-0.01em] outline-none",
        "transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded-md",
        isActive
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      )}
      style={{ fontFamily: "var(--font-body)" }}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Active indicator pill — sits behind the text */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-md bg-[var(--color-bg-muted)]"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      {label}
    </a>
  );
}

// ─── Mobile menu ──────────────────────────────────────────────────────────────

interface MobileMenuProps {
  isOpen: boolean;
  activeId: string;
  onLinkClick: (href: string) => void;
  onClose: () => void;
}

function MobileMenu({ isOpen, activeId, onLinkClick, onClose }: MobileMenuProps) {
  const reduced = useReducedMotion();

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[390] bg-black/60 backdrop-blur-sm md:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* Drawer */}
          <motion.nav
            className="fixed inset-x-4 top-[72px] z-[395] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/95 backdrop-blur-xl md:hidden"
            initial={reduced ? false : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col p-2" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reduced ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick(link.href);
                      onClose();
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5",
                      "text-[14px] font-[450] tracking-[-0.01em]",
                      "transition-colors duration-100",
                      "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] outline-none",
                      activeId === link.id
                        ? "bg-[var(--color-bg-muted)] text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]"
                    )}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    {activeId === link.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    )}
                  </a>
                </motion.li>
              ))}

              {/* CTA inside mobile menu */}
              <motion.li
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.2,
                  delay: NAV_LINKS.length * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-2 border-t border-[var(--color-border)] pt-2"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick("#contact");
                    onClose();
                  }}
                  className="flex w-full items-center justify-center rounded-xl bg-[var(--color-accent)] px-4 py-3.5 text-[14px] font-[500] text-white transition-opacity duration-150 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 outline-none"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Get in touch
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Hamburger icon ───────────────────────────────────────────────────────────

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={cn(
        "relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg",
        "border border-[var(--color-border)] bg-[var(--color-bg-muted)]",
        "transition-colors duration-150 hover:border-[rgba(255,255,255,0.12)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] outline-none",
        "md:hidden"
      )}
    >
      <motion.span
        className="block h-px w-[14px] bg-[var(--color-text-primary)] origin-center"
        animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="block h-px w-[14px] bg-[var(--color-text-primary)] origin-center"
        animate={isOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </button>
  );
}

// ─── Main Nav component ───────────────────────────────────────────────────────

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();
  const navRef = useRef<HTMLDivElement>(null);

  const activeId = useActiveSection(SECTION_IDS);

  // ── Scroll detection ──
  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleLinkClick = useCallback((href: string) => {
    scrollToSection(href);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ── Entrance animation ──
  const navVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
    },
  };

  return (
    <>
      <motion.header
        ref={navRef}
        role="banner"
        className="fixed left-0 right-0 top-0 z-[var(--z-nav)] flex justify-center px-4 pt-4"
        initial={reduced ? false : "hidden"}
        animate="visible"
        variants={navVariants}
      >
        <div
          className={cn(
            // Base shape
            "relative flex h-[52px] w-full max-w-[640px] items-center justify-between rounded-2xl px-3",
            // Border — always visible, strengthens on scroll
            "border",
            scrolled
              ? "border-[rgba(255,255,255,0.09)] bg-[rgba(10,10,10,0.82)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "border-[var(--color-border)] bg-[rgba(10,10,10,0.55)]",
            // Backdrop blur
            "backdrop-blur-[18px] [-webkit-backdrop-blur:18px]",
            // Smooth border/bg transition
            "transition-[background-color,border-color,box-shadow] duration-300"
          )}
        >
          {/* Subtle inner top highlight — one pixel */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
            }}
            aria-hidden
          />

          {/* Logo */}
          <Logo />

          {/* Desktop links */}
          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <DesktopNavLink
                key={link.id}
                label={link.label}
                href={link.href}
                isActive={activeId === link.id}
                onClick={() => handleLinkClick(link.href)}
              />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5",
                "border border-[rgba(255,255,255,0.10)] bg-[var(--color-bg-muted)]",
                "text-[13px] font-[500] text-[var(--color-text-primary)]",
                "transition-[background-color,border-color,transform] duration-150",
                "hover:border-[rgba(255,255,255,0.16)] hover:bg-[rgba(255,255,255,0.06)]",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] outline-none"
              )}
              style={{ fontFamily: "var(--font-body)" }}
              whileHover={reduced ? {} : { scale: 1.02 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              {/* Status dot */}
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-500" />
              </span>
              Available
            </motion.a>
          </div>

          {/* Hamburger — mobile only */}
          <Hamburger isOpen={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>
      </motion.header>

      {/* Mobile slide-down menu */}
      <MobileMenu
        isOpen={menuOpen}
        activeId={activeId}
        onLinkClick={handleLinkClick}
        onClose={closeMenu}
      />
    </>
  );
}
