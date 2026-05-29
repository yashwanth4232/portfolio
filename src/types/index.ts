// ─── Project ──────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  year: number;
  url?: string;
  repoUrl?: string;
  image?: string;
  featured: boolean;
}

// ─── Experience ───────────────────────────────────────────────────────────
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startYear: number;
  endYear: number | null; // null = present
  description: string;
  highlights: string[];
  url?: string;
}

// ─── Skill ────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "platform";
  icon?: string; // SVG path or icon component key
}

// ─── Navigation ───────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Motion variants (Framer Motion) ──────────────────────────────────────
export interface MotionVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
}
