import { jsonStore } from "@/lib/json-store";
import { Experience } from "@/data/workExperienceData";

function mapExperience(exp: {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  tech: { name: string }[];
}): Experience {
  return {
    title: exp.title,
    company: exp.company,
    period: exp.period,
    description: exp.description,
    tech: exp.tech.map((t) => t.name),
  };
}

export async function getAllExperiences(): Promise<Experience[]> {
  const experiences = await jsonStore.workExperience.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
    include: {
      tech: { orderBy: { order: "asc" } },
    },
  });
  return experiences.map(mapExperience);
}
