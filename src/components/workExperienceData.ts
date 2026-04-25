export interface Experience {
  title: string;
  company: string;
  period: string;
  slug?: string;
  description: string;
  tech?: string[];
  highlight?: string;
}

export const experiences: Experience[] = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed / Upwork",
    period: "2023 - Present",
    slug: "freelance-web-developer",
    description:
      "Build responsive websites for small businesses and individual clients. Handle full project from design to deployment. Deliver high-quality solutions that meet client needs and deadlines.",
    tech: ["Next.js", "TailwindCSS", "Laravel", "Node.js", "TypeScript"],
    highlight: "Completed 7+ projects with 100% client satisfaction",
  },
  {
    title: "Math & English Tutor",
    company: "Private Tutoring",
    period: "2024 - Present",
    slug: "math-english-tutor",
    description:
      "Teach students from elementary to high school level. Create personalized learning materials and track progress. Help students improve their grades and build confidence.",
    tech: ["Curriculum Design", "Student Assessment", "One-on-One Teaching"],
    highlight: "Improved average student grades by 15%",
  },
  {
    title: "Web Development Intern",
    company: "Tech Company XYZ",
    period: "2022 - 2023",
    slug: "web-development-intern",
    description:
      "Assisted senior developers in building internal tools and fixing bugs. Gained hands-on experience with React and Laravel. Participated in daily stand-ups and code reviews.",
    tech: ["React", "Laravel", "MySQL", "Git"],
  },
  // Tambahkan data lain sesuai kebutuhan
];
