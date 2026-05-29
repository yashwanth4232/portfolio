import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    id: "company-a",
    company: "Company A",
    role: "Senior Frontend Engineer",
    period: "2023 — Present",
    startYear: 2023,
    endYear: null,
    description:
      "One sentence about the role, the team, and the product you built.",
    highlights: [
      "Led migration from CRA to Next.js, reducing LCP by 42%",
      "Built a design system adopted across 4 product teams",
      "Mentored 3 junior engineers",
    ],
    url: "https://company-a.com",
  },
  {
    id: "company-b",
    company: "Company B",
    role: "Frontend Engineer",
    period: "2021 — 2023",
    startYear: 2021,
    endYear: 2023,
    description:
      "One sentence about the role, the team, and the product you built.",
    highlights: [
      "Built core dashboard features used by 50k+ users",
      "Improved test coverage from 20% to 78%",
      "Integrated real-time features with WebSockets",
    ],
    url: "https://company-b.com",
  },
  {
    id: "company-c",
    company: "Company C",
    role: "Junior Developer",
    period: "2019 — 2021",
    startYear: 2019,
    endYear: 2021,
    description:
      "One sentence about the role, the team, and the product you built.",
    highlights: [
      "Delivered client-facing features across 6 projects",
      "Maintained and extended a legacy PHP codebase",
    ],
    url: "https://company-c.com",
  },
];
