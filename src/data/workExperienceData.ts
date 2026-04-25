export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  tech?: string[];
}

export const experiences: Experience[] = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed",
    period: "2023 - Present",
    description:
      "Build responsive websites for small businesses and individual clients. Handle full project lifecycle from design to deployment, delivering high-quality solutions that meet client needs and deadlines.",
    tech: ["Next.js", "TailwindCSS", "Laravel", "Node.js", "TypeScript", "React"],
  },
  {
    title: "Math & English Tutor",
    company: "Private Tutoring",
    period: "2025 - Present",
    description:
      "Teach students from elementary to high school level. Create personalized learning materials and track progress. Help students improve their academic performance and build confidence in both math and English.",
    tech: ["Curriculum Design", "Student Assessment", "One-on-One Teaching"],
  },
  {
    title: "Finance Staff",
    company: "Dinoyo Kamera",
    period: "August 2024 – July 2025",
    description:
      "Managed full-scope financial reporting including daily, monthly, and annual reports. Handled balance sheets, cash flow statements, and profit & loss statements. Monitored financial discrepancies, ensured transaction accuracy, and compiled income and expense records with high attention to detail.",
    tech: [
      "Financial Reporting",
      "Balance Sheet",
      "Cash Flow Management",
      "P&L Analysis",
    ],
  },
  {
    title: "Web & Social Media Admin",
    company: "Dinoyo Kamera",
    period: "August 2023 – July 2024",
    description:
      "Managed customer service on social media and e-commerce platforms (Shopee, Instagram, WhatsApp). Uploaded and maintained product listings on company website and marketplaces. Handled product photography, video editing, and designed marketing visuals to improve brand engagement.",
    tech: [
      "E-commerce Management",
      "Social Media",
      "Product Photography",
      "Content Creation",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "PT Universal Big Data",
    period: "May – October 2022",
    description:
      "Built web applications using Serenity Framework (.NET, TypeScript). Designed approximately 60 FastReport templates integrated with enterprise database systems. Contributed to educational, reporting, and development teams simultaneously.",
    tech: [".NET", "TypeScript", "FastReport", "Serenity Framework", "Database Integration"],
  },
];
