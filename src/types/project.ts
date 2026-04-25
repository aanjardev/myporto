// types/project.ts
export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  client?: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  type: "freelance" | "side";
  featured?: boolean;
}
