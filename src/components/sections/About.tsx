"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { cn } from "@/lib/utils";
import {
  EASE_OUT, DUR,
  fadeUp,
  staggerContainer,
  staggerItem,
  VIEWPORT_ONCE,
} from "@/lib/motion";

// ─── Section data ─────────────────────────────────────────────────────────────

const STATS = [
  {
    value: 4,
    suffix: "+",
    label: "Years of experience",
    sublabel: "Full stack + AI",
  },
  {
    value: 30,
    suffix: "+",
    label: "Projects shipped",
    sublabel: "Production & client work",
  },
  {
    value: 12,
    suffix: "+",
    label: "AI/ML integrations",
    sublabel: "LLMs, RAG, agents",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client satisfaction",
    sublabel: "Based on project reviews",
  },
] as const;

const CERTIFICATIONS = [
  {
    category: "Certification",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    period: "2023",
    icon: "☁️",
    url: "https://aws.amazon.com/certification/",
  },
  {
    category: "Certification",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Coursera",
    period: "2022",
    icon: "🧠",
    url: "https://www.coursera.org/specializations/deep-learning",
  },
  {
    category: "Certification",
    title: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    period: "2023",
    icon: "⚡",
  },
] as const;

const EDUCATION = [
  {
    category: "Education",
    title: "B.Tech in Computer Science & Engineering",
    issuer: "Jawaharlal Nehru Technological University",
    period: "2018 – 2022",
    icon: "🎓",
  },
] as const;

const SKILLS_BY_DOMAIN = [
  {
    domain: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    domain: "Backend",
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    domain: "AI / ML",
    skills: ["LangChain", "OpenAI API", "RAG", "Fine-tuning", "Vector DBs"],
  },
  {
    domain: "Infrastructure",
    skills: ["AWS", "Docker", "Vercel", "GitHub Actions", "Supabase"],
  },
] as const;

// ─── Reusable sub-components ─────────────────────────────────────────────────

/** Thin horizontal rule with optional label */
function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <div className="h-px flex-1" style={{ background: "var(--color-border)" }} />
      {label && (
        <span
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
        >
          {label}
        </span>
      )}
      <div className="h-px flex-1" style={{ background: "var(--color-border)" }} />
    </div>
  );
}

/** Section eyebrow label — reuses the .section-label CSS class */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label">{children}</span>;
}

// ─── Skills grid ──────────────────────────────────────────────────────────────

function SkillsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {SKILLS_BY_DOMAIN.map((domain, domainIndex) => (
        <motion.div
          key={domain.domain}
          className="flex flex-col gap-2"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.45,
            delay: domainIndex * 0.06,
            ease: EASE_OUT,
          }}
        >
          {/* Domain label */}
          <span
            className="text-[11px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
          >
            {domain.domain}
          </span>

          {/* Skill chips */}
          <div className="flex flex-wrap gap-1.5">
            {domain.skills.map((skill) => (
              <span key={skill} className="badge">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Left column — biography ──────────────────────────────────────────────────

function AboutLeft() {
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
      <motion.div variants={reduced ? {} : staggerItem}>
        <SectionLabel>About</SectionLabel>
      </motion.div>

      {/* Heading */}
      <motion.h2
        id="about-heading"
        className="text-[var(--color-text-primary)]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
        }}
        variants={reduced ? {} : staggerItem}
      >
        Building products at the
        <br />
        <span style={{ color: "var(--color-accent)", opacity: 0.9 }}>
          intersection of AI and UX.
        </span>
      </motion.h2>

      {/* Bio paragraphs */}
      <motion.div
        className="flex flex-col gap-4"
        variants={reduced ? {} : staggerItem}
      >
        <p
          className="text-[15px] leading-[1.75]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", maxWidth: "52ch" }}
        >
          I&apos;m a Full Stack Developer and AI Engineer with four years of experience
          turning complex problems into clean, scalable products. My work spans
          end-to-end — from designing component systems in Figma to deploying
          LLM-powered backends in production.
        </p>
        <p
          className="text-[15px] leading-[1.75]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", maxWidth: "52ch" }}
        >
          I believe the best software is invisible — it gets out of the user&apos;s way
          and solves the right problem at the right time. Whether it&apos;s a React
          interface or a retrieval-augmented generation pipeline, I hold the bar
          equally high.
        </p>
        <p
          className="text-[15px] leading-[1.75]"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)", maxWidth: "52ch" }}
        >
          Currently focused on building AI-native applications and developer
          tools — products where intelligence is a first-class feature, not
          an afterthought.
        </p>
      </motion.div>

      {/* Philosophy callout */}
      <motion.blockquote
        className="relative rounded-xl py-4 pl-5 pr-4"
        style={{
          borderLeft: "2px solid var(--color-accent)",
          background: "var(--color-accent-muted)",
        }}
        variants={reduced ? {} : staggerItem}
      >
        <p
          className="text-[14px] leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-primary)",
            fontStyle: "italic",
            opacity: 0.85,
          }}
        >
          &ldquo;I write code that I&apos;d be comfortable inheriting myself —
          readable, tested, and built to last longer than the sprint it shipped in.&rdquo;
        </p>
      </motion.blockquote>

      {/* Divider */}
      <motion.div variants={reduced ? {} : staggerItem}>
        <Divider label="Core skills" />
      </motion.div>

      {/* Skills */}
      <motion.div variants={reduced ? {} : staggerItem}>
        <SkillsGrid />
      </motion.div>
    </motion.div>
  );
}

// ─── Stats grid ───────────────────────────────────────────────────────────────

function StatsGrid() {
  return (
    <div
      className="grid grid-cols-2 gap-3"
      role="list"
      aria-label="Career statistics"
    >
      {STATS.map((stat) => (
        <div key={stat.label} role="listitem">
          <StatCard
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            sublabel={stat.sublabel}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Right column — highlights ────────────────────────────────────────────────

function AboutRight() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-8"
      initial={reduced ? false : { opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.15, ease: EASE_OUT }}
    >
      {/* ── Stats ── */}
      <div className="flex flex-col gap-4">
        <span
          className="text-[11px] uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
        >
          By the numbers
        </span>
        <StatsGrid />
      </div>

      {/* ── Divider ── */}
      <Divider label="Education" />

      {/* ── Education ── */}
      <div
        className="flex flex-col gap-2.5"
        role="list"
        aria-label="Education"
      >
        {EDUCATION.map((item, i) => (
          <div key={item.title} role="listitem">
            <HighlightCard
              category={item.category}
              title={item.title}
              issuer={item.issuer}
              period={item.period}
              icon={item.icon}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* ── Divider ── */}
      <Divider label="Certifications" />

      {/* ── Certifications ── */}
      <div
        className="flex flex-col gap-2.5"
        role="list"
        aria-label="Certifications"
      >
        {CERTIFICATIONS.map((cert, i) => (
          <div key={cert.title} role="listitem">
            <HighlightCard
              category={cert.category}
              title={cert.title}
              issuer={cert.issuer}
              period={cert.period}
              icon={cert.icon}
              url={"url" in cert ? cert.url : undefined}
              index={i}
            />
          </div>
        ))}
      </div>

      {/* ── Currently reading / working on ── */}
      <motion.div
        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
      >
        <div className="flex flex-col gap-3">
          <span
            className="text-[10px] uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
          >
            Currently exploring
          </span>

          <div className="flex flex-col gap-2">
            {[
              { label: "Multimodal LLM architectures", tag: "Research" },
              { label: "AI agent orchestration patterns", tag: "Building" },
              { label: "WebGPU & browser ML inference", tag: "Learning" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3">
                <span
                  className="text-[13px]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
                >
                  {item.label}
                </span>
                <span
                  className="shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-accent)",
                    background: "var(--color-accent-muted)",
                    border: "1px solid rgba(124,106,255,0.2)",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── About section ────────────────────────────────────────────────────────────

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative"
      style={{ paddingBlock: "var(--section-padding-y)" }}
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,106,255,0.03) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container-site relative">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <AboutLeft />
          <AboutRight />
        </div>
      </div>
    </section>
  );
}
