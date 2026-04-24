// workExperienceData.ts
export interface Experience {
  title: string;
  company: string;
  period: string;
  slug?: string;
  description: string;
  tech?: string[];
}

export const experiences: Experience[] = [
  {
    title: "Freelance Web Developer",
    company: "Self-employed / Upwork",
    period: "2023 - Present",
    slug: "freelance-web-developer",
    description:
      "Build responsive websites for small businesses and individual clients. Handle full project from design to deployment.",
    tech: ["Next.js", "TailwindCSS", "Laravel", "Node.js"],
  },
  {
    title: "Math & English Tutor",
    company: "Private Tutoring",
    period: "2024 - Present",
    slug: "math-english-tutor",
    description:
      "Teach students from elementary to high school level. Create personalized learning materials and track progress.",
    tech: ["Curriculum Design", "Student Assessment"],
  },
  {
    title: "Web Development Intern",
    company: "Tech Company XYZ",
    period: "2022 - 2023",
    slug: "web-development-intern",
    description:
      "Assisted senior developers in building internal tools and fixing bugs. Gained hands-on experience with React and Laravel.",
    tech: ["React", "Laravel", "MySQL"],
  },
  // Tambahkan data lain sesuai kebutuhan
];
