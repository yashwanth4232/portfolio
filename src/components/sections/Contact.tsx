"use client";

import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useCallback, useId } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { ContactCard } from "@/components/ui/ContactCard";
import { cn } from "@/lib/utils";
import {
  EASE_OUT_EXPO,
  staggerContainer,
  staggerItem,
  VIEWPORT_ONCE,
} from "@/lib/motion";

// ─── Icons ────────────────────────────────────────────────────────────────────

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m2 7 9.5 6.5a1 1 0 0 0 1 0L22 7" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 12 6 12s6-7.582 6-12c0-3.314-2.686-6-6-6z" />
      <circle cx="12" cy="8" r="2" />
    </svg>
  );
}

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2.5 8.5l4 4 7-8" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className={cn("animate-spin", className)} aria-hidden>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// ─── Contact data ─────────────────────────────────────────────────────────────

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "yashwanth.kumar@example.com", // TODO: update with real email
    description: "Best way to reach me",
    href: "mailto:yashwanth.kumar@example.com",
    external: false,
    icon: <EmailIcon className="h-full w-full" />,
    accentColor: "var(--color-accent)",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yashwanthkumar",
    description: "Professional profile",
    href: "https://linkedin.com/in/yashwanthkumar", // TODO: update
    external: true,
    icon: <LinkedInIcon className="h-full w-full" />,
    accentColor: "#0a66c2",
  },
  {
    label: "GitHub",
    value: "github.com/yashwanthkumar",
    description: "Open source & projects",
    href: "https://github.com/yashwanthkumar", // TODO: update
    external: true,
    icon: <GitHubIcon className="h-full w-full" />,
    accentColor: "#e0e0e0",
  },
  {
    label: "Location",
    value: "Hyderabad, India",
    description: "Open to remote worldwide",
    href: "https://maps.google.com/?q=Hyderabad,India",
    external: true,
    icon: <LocationIcon className="h-full w-full" />,
    accentColor: "#10b981",
  },
] as const;

// ─── Form types ───────────────────────────────────────────────────────────────

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// ─── Contact form ─────────────────────────────────────────────────────────────

/**
 * Lightweight contact form.
 *
 * Architecture notes for backend integration:
 * - Replace the simulated fetch in `handleSubmit` with a real POST to your
 *   API route: `await fetch("/api/contact", { method: "POST", body })`
 * - Create `src/app/api/contact/route.ts` using Next.js Route Handlers
 * - Connect to Resend, SendGrid, Nodemailer, or Formspree
 * - Add server-side validation with Zod
 * - Add rate limiting (e.g. Upstash Redis) to prevent spam
 * - Consider honeypot field for bot protection
 */
function ContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const reduced = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  // Generate unique IDs for label-input association
  const uid = useId();
  const ids = {
    name:    `${uid}-name`,
    email:   `${uid}-email`,
    subject: `${uid}-subject`,
    message: `${uid}-message`,
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = useCallback((data: FormFields): Partial<FormFields> => {
    const errs: Partial<FormFields> = {};
    if (!data.name.trim()) errs.name = "Name is required";
    if (!data.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!data.message.trim()) errs.message = "Message is required";
    else if (data.message.trim().length < 20)
      errs.message = "Message must be at least 20 characters";
    return errs;
  }, []);

  // ── Field change ────────────────────────────────────────────────────────────
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      if (errors[name as keyof FormFields]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validate(fields);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        // Focus first invalid field for accessibility
        const firstErrorKey = Object.keys(validationErrors)[0] as keyof FormFields;
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstErrorKey}"]`)
          ?.focus();
        return;
      }

      setStatus("submitting");

      try {
        /**
         * ── INTEGRATION POINT ────────────────────────────────────────────────
         * Replace this simulation with your actual API call:
         *
         * const res = await fetch("/api/contact", {
         *   method: "POST",
         *   headers: { "Content-Type": "application/json" },
         *   body: JSON.stringify(fields),
         * });
         * if (!res.ok) throw new Error("Failed to send");
         */
        await new Promise((resolve) => setTimeout(resolve, 1200));

        setStatus("success");
        setFields(INITIAL_FIELDS);
      } catch {
        setStatus("error");
      }
    },
    [fields, validate]
  );

  const inputBase = cn(
    "w-full rounded-lg px-3.5 py-3 text-[14px] leading-snug",
    "border bg-[var(--color-bg-muted)]",
    "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
    "outline-none transition-[border-color,background-color] duration-150",
    "focus:border-[var(--color-accent)] focus:bg-[var(--color-bg-surface)]",
  );

  const labelBase = cn(
    "block text-[12px] font-[500] uppercase tracking-[0.07em] mb-1.5",
  );

  return (
    <div
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6"
      aria-label="Contact form"
    >
      {/* Form header */}
      <div className="mb-6 flex flex-col gap-1">
        <h3
          className="text-[15px] font-[600] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
        >
          Send a message
        </h3>
        <p
          className="text-[13px]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
        >
          I&apos;ll respond within 24 hours.
        </p>
      </div>

      {/* Success state */}
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            className="flex flex-col items-center gap-4 py-8 text-center"
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            role="status"
            aria-live="polite"
          >
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
              initial={reduced ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <CheckIcon className="h-5 w-5" style={{ color: "#10b981" }} />
            </motion.div>
            <div className="flex flex-col gap-1">
              <p
                className="text-[15px] font-[600]"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                Message sent!
              </p>
              <p
                className="text-[13px]"
                style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
              >
                Thanks for reaching out. I&apos;ll be in touch soon.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-[12px] underline-offset-2 hover:underline"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Contact form fields"
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="flex flex-col">
                <label
                  htmlFor={ids.name}
                  className={labelBase}
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}
                >
                  Name <span style={{ color: "var(--color-accent)" }} aria-hidden>*</span>
                </label>
                <input
                  id={ids.name}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-required="true"
                  aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                  aria-invalid={!!errors.name}
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={cn(
                    inputBase,
                    errors.name
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-[var(--color-border)]"
                  )}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.name && (
                  <p
                    id={`${ids.name}-error`}
                    role="alert"
                    className="mt-1 text-[11px]"
                    style={{ fontFamily: "var(--font-mono)", color: "#f87171" }}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor={ids.email}
                  className={labelBase}
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}
                >
                  Email <span style={{ color: "var(--color-accent)" }} aria-hidden>*</span>
                </label>
                <input
                  id={ids.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-describedby={errors.email ? `${ids.email}-error` : undefined}
                  aria-invalid={!!errors.email}
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={cn(
                    inputBase,
                    errors.email
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-[var(--color-border)]"
                  )}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.email && (
                  <p
                    id={`${ids.email}-error`}
                    role="alert"
                    className="mt-1 text-[11px]"
                    style={{ fontFamily: "var(--font-mono)", color: "#f87171" }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label
                htmlFor={ids.subject}
                className={labelBase}
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}
              >
                Subject
              </label>
              <input
                id={ids.subject}
                name="subject"
                type="text"
                value={fields.subject}
                onChange={handleChange}
                placeholder="Project inquiry, collaboration, role opportunity…"
                className={cn(inputBase, "border-[var(--color-border)]")}
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label
                htmlFor={ids.message}
                className={labelBase}
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)" }}
              >
                Message <span style={{ color: "var(--color-accent)" }} aria-hidden>*</span>
              </label>
              <textarea
                id={ids.message}
                name="message"
                rows={5}
                required
                aria-required="true"
                aria-describedby={errors.message ? `${ids.message}-error` : undefined}
                aria-invalid={!!errors.message}
                value={fields.message}
                onChange={handleChange}
                placeholder="Tell me about your project, idea, or opportunity…"
                className={cn(
                  inputBase,
                  "resize-none",
                  errors.message
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-[var(--color-border)]"
                )}
                style={{ fontFamily: "var(--font-body)" }}
              />
              <div className="mt-1 flex items-start justify-between gap-2">
                {errors.message ? (
                  <p
                    id={`${ids.message}-error`}
                    role="alert"
                    className="text-[11px]"
                    style={{ fontFamily: "var(--font-mono)", color: "#f87171" }}
                  >
                    {errors.message}
                  </p>
                ) : <span />}
                <span
                  className="shrink-0 text-[11px] tabular-nums"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: fields.message.length > 800
                      ? "#f87171"
                      : "var(--color-text-tertiary)",
                  }}
                  aria-live="polite"
                  aria-label={`${fields.message.length} characters entered`}
                >
                  {fields.message.length}/1000
                </span>
              </div>
            </div>

            {/* Error state */}
            {status === "error" && (
              <motion.p
                className="rounded-lg px-3.5 py-3 text-[13px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#fca5a5",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
                initial={reduced ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                aria-live="assertive"
              >
                Something went wrong. Please try again or email me directly.
              </motion.p>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === "submitting"}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3",
                "text-[14px] font-[500] text-white",
                "transition-opacity duration-150",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-surface)]",
                "outline-none disabled:cursor-not-allowed disabled:opacity-60"
              )}
              style={{
                fontFamily: "var(--font-body)",
                background: "var(--color-accent)",
              }}
              whileHover={reduced || status === "submitting" ? {} : { scale: 1.01, opacity: 0.92 }}
              whileTap={reduced || status === "submitting" ? {} : { scale: 0.99 }}
              transition={{ duration: 0.15 }}
              aria-disabled={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <SpinnerIcon className="h-4 w-4" />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Left column — copy ───────────────────────────────────────────────────────

function ContactLeft() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-8"
      variants={reduced ? {} : staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Eyebrow */}
      <motion.span className="section-label" variants={reduced ? {} : staggerItem}>
        Contact
      </motion.span>

      {/* Heading */}
      <motion.h2
        id="contact-heading"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "var(--color-text-primary)",
        }}
        variants={reduced ? {} : staggerItem}
      >
        Let&apos;s build something
        <br />
        <span style={{ color: "var(--color-accent)", opacity: 0.9 }}>
          meaningful.
        </span>
      </motion.h2>

      {/* Description */}
      <motion.div
        className="flex flex-col gap-4"
        variants={reduced ? {} : staggerItem}
      >
        <p
          className="max-w-[44ch] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
        >
          Whether you&apos;re hiring, have a project in mind, or want to collaborate
          on something new — I&apos;m open to the conversation. I work best on
          problems where engineering and thoughtful design intersect.
        </p>
        <p
          className="max-w-[44ch] text-[15px] leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
        >
          Currently available for full-time roles, freelance engagements,
          and selected open-source collaborations.
        </p>
      </motion.div>

      {/* Availability badge */}
      <motion.div
        className="flex items-center gap-3 self-start rounded-xl px-4 py-3"
        style={{
          background: "var(--color-bg-surface)",
          border: "1px solid var(--color-border)",
        }}
        variants={reduced ? {} : staggerItem}
        role="status"
        aria-label="Availability status"
      >
        <span className="relative flex h-2.5 w-2.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[13px] font-[500]"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
          >
            Available for work
          </span>
          <span
            className="text-[11px]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
          >
            Full-time · Freelance · Remote
          </span>
        </div>
      </motion.div>

      {/* Contact cards */}
      <motion.div
        className="flex flex-col gap-2.5"
        variants={reduced ? {} : staggerItem}
        role="list"
        aria-label="Contact options"
      >
        {CONTACT_LINKS.map((link, i) => (
          <div key={link.label} role="listitem">
            <ContactCard
              label={link.label}
              value={link.value}
              description={link.description}
              href={link.href}
              external={link.external}
              icon={link.icon}
              accentColor={link.accentColor}
              index={i}
              isVisible={isInView}
            />
          </div>
        ))}
      </motion.div>

      {/* Resume CTA */}
      <motion.div variants={reduced ? {} : staggerItem}>
        <motion.a
          href="/resume-yashwanth-kumar.pdf" // TODO: add real PDF to /public
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download resume (PDF, opens in new tab)"
          className={cn(
            "inline-flex items-center gap-2.5 rounded-xl px-5 py-3",
            "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
            "text-[14px] font-[500] text-[var(--color-text-secondary)]",
            "transition-[border-color,background-color,color] duration-150",
            "hover:border-[rgba(255,255,255,0.12)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text-primary)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]",
            "outline-none"
          )}
          style={{ fontFamily: "var(--font-body)", alignSelf: "flex-start" }}
          whileHover={reduced ? {} : { scale: 1.02, y: -1 }}
          whileTap={reduced ? {} : { scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <ResumeIcon className="h-4 w-4 shrink-0" />
          Download resume
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            className="h-3 w-3 shrink-0 opacity-50" aria-hidden>
            <path d="M8 3v8M4 8l4 4 4-4" />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

// ─── Right column — form ──────────────────────────────────────────────────────

function ContactRight() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-6"
      initial={reduced ? false : { opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT_EXPO }}
    >
      <ContactForm />

      {/* Response time note */}
      <p
        className="text-center text-[12px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
      >
        Typical response time: &lt; 24 hours
      </p>
    </motion.div>
  );
}

// ─── Footer strip ─────────────────────────────────────────────────────────────

function FooterStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-3 border-t pt-8"
      style={{ borderColor: "var(--color-border)" }}
      initial={reduced ? false : { opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
    >
      <p
        className="text-[12px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
      >
        Designed &amp; built by Yashwanth Kumar · {new Date().getFullYear()}
      </p>
      <p
        className="text-[11px]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)", opacity: 0.6 }}
      >
        Next.js · TypeScript · Tailwind CSS · Framer Motion
      </p>
    </motion.div>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative"
      style={{ paddingBlock: "var(--section-padding-y)" }}
    >
      {/* Top rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-border)" }}
        aria-hidden
      />

      {/* Subtle radial — bottom right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px]"
        style={{
          background:
            "radial-gradient(circle at 100% 100%, rgba(124,106,255,0.04) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-site relative flex flex-col gap-16">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <ContactLeft />
          <ContactRight />
        </div>

        {/* Footer strip */}
        <FooterStrip />
      </div>
    </section>
  );
}
