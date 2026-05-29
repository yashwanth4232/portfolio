import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Languages
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "SQL", category: "language" },

  // Frameworks
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "Tailwind CSS", category: "framework" },

  // Tools
  { name: "Git", category: "tool" },
  { name: "Docker", category: "tool" },
  { name: "Figma", category: "tool" },
  { name: "Vitest", category: "tool" },

  // Platforms
  { name: "Vercel", category: "platform" },
  { name: "AWS", category: "platform" },
  { name: "Supabase", category: "platform" },
  { name: "GitHub", category: "platform" },
];

// Flat list for the marquee / scroll strip
export const skillNames = skills.map((s) => s.name);
