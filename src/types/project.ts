export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  client?: string;
  description: string;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  period?: string;
  features?: string[];
  screenshots?: string[];
  type: "freelance" | "side";
}
