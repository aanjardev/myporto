export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  tech?: string[];
};

export const experiences: Experience[] = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "2023 - Present",
    description:
      "Build responsive websites for small businesses and individual clients. Handle full project from design to deployment.",
    tech: ["Next.js", "TailwindCSS", "Laravel", "React"],
  },
  {
    title: "Math & English Tutor",
    company: "Private Tutoring",
    period: "2025 - Present",
    description:
      "Teach 2+ students, improve average grades by 15%. Create personalized learning materials.",
    tech: ["Lesson Plans", "Assessment", "1:1 Coaching"],
  },
  {
    title: "Finance Staff",
    company: "Dinoyo Kamera",
    period: "August 2024 – July 2025",
    description:
      "Managed financial reporting, prepared balance sheets, cash flow statements, and reconciled records with high attention to detail.",
    tech: ["Reporting", "Reconciliation", "Financial Ops"],
  },
  {
    title: "Website & Social Media Admin",
    company: "Dinoyo Kamera",
    period: "August 2023 – July 2024",
    description:
      "Managed customer service, product listings, photography, and scheduled social content to improve engagement.",
    tech: ["Content Ops", "Photography", "E‑commerce"],
  },
  {
    title: "Software Engineering Intern",
    company: "PT Universal Big Data",
    period: "May – October 2022",
    description:
      "Built web applications and reporting templates; contributed to educational and development teams.",
    tech: [".NET", "TypeScript", "Reporting"],
  },
];
