// types/project.ts
export interface Project {
  id: number;
  title: string;
  slug: string;
  category?: string;
  client?: string | null;
  description: string;
  longDescription?: string | null;
  challenge?: string | null;
  solution?: string | null;
  image: string;
  screenshots?: string[] | null;
  tech: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  period?: string | null;
  features?: string[] | null;
  type: "freelance" | "side" | "social";

  // Additional fields for portfolio
  myRole?: string | null; // Peranmu dalam project
  teamSize?: string | null; // Jumlah tim
  responsibilities?: string[] | null; // Apa saja yang dikerjakan
  highlights?: string[] | null; // Pencapaian/keunggulan project
  goal?: string | null; // Tujuan project
  outcome?: string | null; // Hasil yang dicapai
}
