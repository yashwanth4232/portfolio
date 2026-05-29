"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SkillCategory } from "@/components/ui/SkillCategory";
import type { CategorySkill } from "@/components/ui/SkillCategory";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  TailwindIcon,
  FramerIcon,
  NodejsIcon,
  ExpressIcon,
  RestApiIcon,
  PythonIcon,
  TensorFlowIcon,
  BrainIcon,
  VectorIcon,
  PromptIcon,
  AWSIcon,
  FirebaseIcon,
  MongoDBIcon,
  PostgreSQLIcon,
  GitIcon,
  GitHubIcon,
  PostmanIcon,
  VSCodeIcon,
  LinuxIcon,
} from "./skill-icons";

// ─── Skill data ───────────────────────────────────────────────────────────────

interface SkillCategoryDef {
  title: string;
  icon: string;
  wide?: boolean;
  skills: CategorySkill[];
}

const SKILL_CATEGORIES: SkillCategoryDef[] = [
  {
    title: "Frontend",
    icon: "◈",
    skills: [
      {
        name: "React.js",
        icon: <ReactIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "4+ yrs",
      },
      {
        name: "Next.js",
        icon: <NextjsIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "3 yrs",
      },
      {
        name: "TypeScript",
        icon: <TypeScriptIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "daily use",
      },
      {
        name: "Tailwind CSS",
        icon: <TailwindIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "3 yrs",
      },
      {
        name: "Framer Motion",
        icon: <FramerIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "2 yrs",
      },
    ],
  },
  {
    title: "Backend",
    icon: "⬡",
    skills: [
      {
        name: "Node.js",
        icon: <NodejsIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "4 yrs",
      },
      {
        name: "Express.js",
        icon: <ExpressIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "4 yrs",
      },
      {
        name: "REST APIs",
        icon: <RestApiIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "design + build",
      },
    ],
  },
  {
    title: "AI / Machine Learning",
    icon: "⟁",
    wide: true,
    skills: [
      {
        name: "Python",
        icon: <PythonIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "3+ yrs",
      },
      {
        name: "TensorFlow",
        icon: <TensorFlowIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "2 yrs",
      },
      {
        name: "NLP",
        icon: <BrainIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "text + embeddings",
      },
      {
        name: "RAG",
        icon: <VectorIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "production",
      },
      {
        name: "Prompt Eng.",
        icon: <PromptIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "LLM APIs",
      },
    ],
  },
  {
    title: "Cloud",
    icon: "◎",
    skills: [
      {
        name: "AWS",
        icon: <AWSIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "S3, EC2, Lambda",
      },
      {
        name: "Firebase",
        icon: <FirebaseIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "Auth + DB",
      },
    ],
  },
  {
    title: "Databases",
    icon: "▦",
    skills: [
      {
        name: "MongoDB",
        icon: <MongoDBIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "3+ yrs",
      },
      {
        name: "PostgreSQL",
        icon: <PostgreSQLIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "2 yrs",
      },
    ],
  },
  {
    title: "DevOps / Tools",
    icon: "⌬",
    wide: true,
    skills: [
      {
        name: "Git",
        icon: <GitIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "daily use",
      },
      {
        name: "GitHub",
        icon: <GitHubIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "CI/CD + PRs",
      },
      {
        name: "Postman",
        icon: <PostmanIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "API testing",
      },
      {
        name: "VS Code",
        icon: <VSCodeIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "expert",
        descriptor: "primary IDE",
      },
      {
        name: "Linux",
        icon: <LinuxIcon className="h-full w-full" style={{ color: "var(--color-text-secondary)" }} />,
        proficiency: "proficient",
        descriptor: "bash + CLI",
      },
    ],
  },
];

// ─── Proficiency legend ───────────────────────────────────────────────────────

function Legend() {
  const items = [
    { level: "Familiar", dots: 1 },
    { level: "Proficient", dots: 2 },
    { level: "Expert", dots: 3 },
  ] as const;

  return (
    <div
      className="flex flex-wrap items-center gap-4"
      role="note"
      aria-label="Proficiency legend"
    >
      {items.map(({ level, dots }) => (
        <div key={level} className="flex items-center gap-2">
          <div className="flex items-center gap-[3px]" aria-hidden>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="block h-[5px] w-[5px] rounded-full"
                style={{
                  background:
                    i < dots
                      ? dots === 3
                        ? "var(--color-accent)"
                        : dots === 2
                          ? "var(--color-text-secondary)"
                          : "var(--color-text-tertiary)"
                      : "var(--color-bg-muted)",
                  border:
                    i < dots ? "none" : "1px solid var(--color-border)",
                }}
              />
            ))}
          </div>
          <span
            className="text-[11px]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-tertiary)",
            }}
          >
            {level}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...VIEWPORT_ONCE });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-5"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
    >
      {/* Eyebrow */}
      <span className="section-label">Skills &amp; Stack</span>

      {/* Heading + legend row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          className="text-[var(--color-text-primary)]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
          id="skills-heading"
        >
          Technologies I work with.
        </h2>

        <Legend />
      </div>

      {/* Description */}
      <p
        className="max-w-[52ch] text-[15px] leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
        }}
      >
        A curated set of tools I rely on across the full stack — from
        interactive UIs to ML inference pipelines. Depth over breadth.
      </p>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ background: "var(--color-border)" }}
        aria-hidden
      />
    </motion.div>
  );
}

// ─── Category grid ────────────────────────────────────────────────────────────

function CategoryGrid() {
  return (
    /*
     * Responsive CSS grid:
     *  - mobile: 1 column
     *  - sm: 2 columns
     *  - lg: 3 columns
     *
     * Wide categories (AI, DevOps) get col-span-2 at lg,
     * handled inside SkillCategory via the `wide` prop.
     */
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-labelledby="skills-heading"
    >
      {SKILL_CATEGORIES.map((category, i) => (
        <div
          key={category.title}
          role="listitem"
          className={cn(category.wide ? "sm:col-span-2 lg:col-span-2" : "")}
        >
          <SkillCategory
            title={category.title}
            icon={category.icon}
            skills={category.skills}
            wide={false} /* grid handles span; SkillCategory handles internal layout */
            categoryIndex={i}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Skills section ───────────────────────────────────────────────────────────

export function Skills() {
  return (
    <section
      id="stack"
      aria-labelledby="skills-heading"
      className="relative"
      style={{ paddingBlock: "var(--section-padding-y)" }}
    >
      {/* Very faint ambient gradient — top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--color-border)" }}
        aria-hidden
      />

      <div className="container-site relative flex flex-col gap-12">
        <SectionHeader />
        <CategoryGrid />
      </div>
    </section>
  );
}
