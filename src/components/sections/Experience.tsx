"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { TimelineItem } from "@/components/ui/TimelineItem";
import type { TimelineItemData } from "@/components/ui/TimelineItem";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, staggerContainer, staggerItem, VIEWPORT_ONCE } from "@/lib/motion";

// ─── Timeline data ────────────────────────────────────────────────────────────

const TIMELINE_ITEMS: TimelineItemData[] = [
  // ── Work ──────────────────────────────────────────────────────────────────
  {
    id: "freelance",
    type: "work",
    featured: true,
    title: "Freelance Web Developer",
    organization: "Self-employed",
    period: "2022 – Present",
    year: "2022",
    location: "Remote",
    description:
      "Designing and shipping responsive, production-grade websites and web applications for clients across e-commerce, professional services, and tech. Covering the full lifecycle — from scoping and design to deployment and post-launch optimization.",
    highlights: [
      "Delivered 10+ client projects with measurable improvements in page load and conversion",
      "Managed client communication, requirements gathering, and iterative feedback cycles",
      "Implemented CI/CD pipelines and deployed on Vercel, Netlify, and AWS",
      "Conducted performance audits — improved Lighthouse scores to 90+ on all projects",
      "Provided UX consulting and A/B testing guidance alongside development",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Vercel"],
  },

  // ── AI / Full Stack journey ────────────────────────────────────────────────
  {
    id: "ai-engineering",
    type: "milestone",
    featured: true,
    title: "AI & Full Stack Engineering",
    organization: "Independent Projects & Open Source",
    period: "2023 – Present",
    year: "2023",
    description:
      "Deep-diving into production AI systems — building end-to-end RAG workflows, LLM-powered automation tools, and intelligent agents. Focused on the intersection of strong frontend engineering and real-world AI integration.",
    highlights: [
      "Built and deployed 3 production AI applications (AutoFlowAI, Lexis, and internal tools)",
      "Designed multi-document RAG pipelines with Pinecone, LangChain, and OpenAI APIs",
      "Engineered email automation workflows reducing client response time by 70%",
      "Contributed to open-source LangChain integrations and prompt engineering research",
      "Explored agent orchestration, tool use, and multimodal LLM architectures",
    ],
    tags: ["Python", "LangChain", "OpenAI", "Pinecone", "RAG", "FastAPI", "Agents"],
  },

  // ── Education ─────────────────────────────────────────────────────────────
  {
    id: "btech",
    type: "education",
    featured: true,
    title: "B.Tech in Artificial Intelligence & Machine Learning",
    organization: "Jawaharlal Nehru Technological University",
    period: "2020 – 2024",
    year: "2024",
    location: "India",
    description:
      "Four-year undergraduate programme with a curriculum spanning machine learning theory, deep learning architectures, computer vision, NLP, and software engineering. Graduated with a CGPA of 8.8/10.",
    highlights: [
      "CGPA 8.8 / 10 — top 15% of graduating cohort",
      "Final year project: Intelligent document retrieval system using transformer-based embeddings",
      "Coursework: ML, Deep Learning, Computer Vision, NLP, Data Structures, OS, DBMS",
      "Active member of the university's AI research club",
    ],
    tags: ["Machine Learning", "Deep Learning", "Python", "TensorFlow", "Data Science"],
  },

  // ── Certifications ────────────────────────────────────────────────────────
  {
    id: "cert-oracle",
    type: "certification",
    title: "Oracle Cloud Infrastructure — AI Foundations Associate",
    organization: "Oracle",
    period: "2024",
    year: "2024",
    description:
      "Validated foundational knowledge of AI and ML services on Oracle Cloud Infrastructure, covering generative AI, machine learning pipelines, and cloud deployment patterns.",
    tags: ["Oracle Cloud", "AI/ML", "Generative AI"],
    url: "https://education.oracle.com/oracle-cloud-infrastructure-ai-foundations-associate",
  },
  {
    id: "cert-google",
    type: "certification",
    title: "Prompt Design in Vertex AI",
    organization: "Google Cloud",
    period: "2024",
    year: "2024",
    description:
      "Completed Google Cloud's hands-on training on designing, evaluating, and optimising prompts for large language models in production using Vertex AI and PaLM APIs.",
    tags: ["Vertex AI", "Prompt Engineering", "LLMs", "Google Cloud"],
    url: "https://cloud.google.com/learn/training/machinelearning-ai",
  },
  {
    id: "cert-ibm",
    type: "certification",
    title: "Machine Learning with Python",
    organization: "IBM · Coursera",
    period: "2023",
    year: "2023",
    description:
      "IBM professional certification covering supervised and unsupervised learning, model evaluation, regression, classification, clustering, and recommender systems using scikit-learn.",
    tags: ["Python", "scikit-learn", "ML Algorithms", "IBM"],
    url: "https://www.coursera.org/learn/machine-learning-with-python",
  },
  {
    id: "cert-postman",
    type: "certification",
    title: "API Fundamentals Student Expert",
    organization: "Postman",
    period: "2023",
    year: "2023",
    description:
      "Demonstrated expertise in REST API design, testing, documentation, and tooling — covering authentication patterns, collections, environments, and automated test suites.",
    tags: ["REST APIs", "Postman", "API Testing", "Documentation"],
    url: "https://www.postman.com/student-program/",
  },
  {
    id: "cert-aws",
    type: "certification",
    title: "AWS Solutions Architecture Job Simulation",
    organization: "Amazon Web Services · Forage",
    period: "2023",
    year: "2023",
    description:
      "Completed AWS's job simulation on Forage — designing scalable, cost-optimised cloud architectures for realistic enterprise use cases using core AWS services.",
    tags: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
    url: "https://www.theforage.com/simulations/amazon-web-services/solutions-architecting-l97g",
  },
];

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-5"
      variants={reduced ? {} : staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Eyebrow */}
      <motion.span
        className="section-label"
        variants={reduced ? {} : staggerItem}
      >
        Experience
      </motion.span>

      {/* Heading + subhead */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <motion.h2
          id="experience-heading"
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
          Journey &amp; credentials.
        </motion.h2>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          variants={reduced ? {} : staggerItem}
          role="note"
          aria-label="Timeline legend"
        >
          {(
            [
              { type: "Work",          color: "var(--color-accent)" },
              { type: "Milestone",     color: "#64748b" },
              { type: "Education",     color: "#10b981" },
              { type: "Certification", color: "#f59e0b" },
            ] as const
          ).map(({ type, color }) => (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
                aria-hidden
              />
              <span
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                {type}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Description */}
      <motion.p
        className="max-w-[52ch] text-[15px] leading-relaxed"
        style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
        variants={reduced ? {} : staggerItem}
      >
        A chronological record of work, independent engineering, formal education,
        and industry certifications — from first client to production AI systems.
      </motion.p>

      {/* Divider */}
      <motion.div
        className="h-px w-full"
        style={{ background: "var(--color-border)" }}
        variants={reduced ? {} : staggerItem}
        aria-hidden
      />
    </motion.div>
  );
}

// ─── Timeline split layout ────────────────────────────────────────────────────

/**
 * Splits timeline items into two groups for the two-column desktop view:
 *  - Left:  work + milestone (the "story")
 *  - Right: education + certifications (the "credentials")
 *
 * On mobile both columns collapse to a single sequential list.
 */
function splitTimeline(items: TimelineItemData[]) {
  const story = items.filter((i) => i.type === "work" || i.type === "milestone");
  const credentials = items.filter(
    (i) => i.type === "education" || i.type === "certification"
  );
  return { story, credentials };
}

// ─── Timeline column ──────────────────────────────────────────────────────────

interface TimelineColumnProps {
  items: TimelineItemData[];
  label: string;
  /** Delay offset so the two columns don't start animating simultaneously */
  delayOffset?: number;
}

function TimelineColumn({ items, label, delayOffset = 0 }: TimelineColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* Column label */}
      <motion.p
        className="text-[11px] uppercase tracking-[0.12em]"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-tertiary)" }}
        initial={reduced ? false : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delayOffset, ease: EASE_OUT_EXPO }}
        aria-hidden
      >
        {label}
      </motion.p>

      {/* Items */}
      <div role="list" aria-label={label}>
        {items.map((item, i) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={i + Math.round(delayOffset / 0.06)}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Summary strip ────────────────────────────────────────────────────────────

function SummaryStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  const items = [
    { value: "2+",  label: "Years professional work" },
    { value: "10+", label: "Client projects" },
    { value: "5",   label: "Certifications" },
    { value: "8.8", label: "B.Tech CGPA" },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      role="list"
      aria-label="Career summary statistics"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          role="listitem"
          className="flex flex-col gap-1 rounded-xl p-4"
          style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
          }}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.06, ease: EASE_OUT_EXPO }}
        >
          <span
            className="text-[1.625rem] font-[700] leading-none tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            {item.value}
          </span>
          <span
            className="text-[12px] leading-snug"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Experience section ───────────────────────────────────────────────────────

export function Experience() {
  const { story, credentials } = splitTimeline(TIMELINE_ITEMS);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative"
      style={{ paddingBlock: "var(--section-padding-y)" }}
    >
      {/* Top rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-border)" }}
        aria-hidden
      />

      {/* Very faint radial at bottom-left */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px]"
        style={{
          background:
            "radial-gradient(circle at 0% 100%, rgba(124,106,255,0.03) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="container-site relative flex flex-col gap-14">
        {/* Header */}
        <SectionHeader />

        {/* Summary strip */}
        <SummaryStrip />

        {/*
         * Two-column layout on lg+:
         *   Left  → Work & Milestone  (the journey narrative)
         *   Right → Education & Certs (the formal credentials)
         *
         * On mobile they stack: story first, then credentials.
         * The columns are independent — each has its own IntersectionObserver
         * so they animate in as they scroll into view.
         */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <TimelineColumn
            items={story}
            label="Work & Milestones"
            delayOffset={0}
          />
          <TimelineColumn
            items={credentials}
            label="Education & Certifications"
            delayOffset={0.06}
          />
        </div>
      </div>
    </section>
  );
}
