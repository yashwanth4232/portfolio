import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    description:
      "A brief one-sentence description of what this project does and why it matters.",
    longDescription:
      "Extended description for the case study page. Explain the problem, your approach, the stack, and the outcome.",
    tags: ["Next.js", "TypeScript", "Postgres"],
    year: 2024,
    url: "https://project-one.com",
    repoUrl: "https://github.com/yourname/project-one",
    image: "/projects/project-one.jpg",
    featured: true,
  },
  {
    id: "project-two",
    title: "Project Two",
    description:
      "A brief one-sentence description of what this project does and why it matters.",
    tags: ["React", "Node.js", "GraphQL"],
    year: 2024,
    url: "https://project-two.com",
    image: "/projects/project-two.jpg",
    featured: true,
  },
  {
    id: "project-three",
    title: "Project Three",
    description:
      "A brief one-sentence description of what this project does and why it matters.",
    tags: ["Python", "FastAPI", "React"],
    year: 2023,
    repoUrl: "https://github.com/yourname/project-three",
    image: "/projects/project-three.jpg",
    featured: false,
  },
];

// Helper: only featured projects for the main grid
export const featuredProjects = projects.filter((p) => p.featured);
