import { jsonStore } from "@/lib/json-store";
import { Project } from "@/types/project";

// ─── Helper: map Prisma Project → our Project type ──────────────
function mapProject(p: Awaited<ReturnType<typeof getRawProject>>): Project {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    type: p.type as Project["type"],
    category: p.category ?? undefined,
    client: p.client,
    period: p.period,
    description: p.description,
    longDescription: p.longDescription,
    challenge: p.challenge,
    solution: p.solution,
    image: p.image,
    screenshots: p.screenshots.map((s) => s.src),
    tech: p.tech.map((t) => t.name),
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    myRole: p.myRole,
    teamSize: p.teamSize,
    responsibilities: p.responsibilities.map((r) => r.text),
    highlights: p.highlights.map((h) => h.text),
    features: p.features.map((f) => f.text),
    goal: p.goal,
    outcome: p.outcome,
  };
}

async function getRawProject(slug: string) {
  return jsonStore.project.findUniqueOrThrow({
    where: { slug },
    include: {
      screenshots: { orderBy: { order: "asc" } },
      tech: { orderBy: { order: "asc" } },
      features: { orderBy: { order: "asc" } },
      responsibilities: { orderBy: { order: "asc" } },
      highlights: { orderBy: { order: "asc" } },
    },
  });
}

// ─── Exported Query Functions ────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const projects = await jsonStore.project.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" },
    include: {
      screenshots: { orderBy: { order: "asc" } },
      tech: { orderBy: { order: "asc" } },
      features: { orderBy: { order: "asc" } },
      responsibilities: { orderBy: { order: "asc" } },
      highlights: { orderBy: { order: "asc" } },
    },
  });
  return projects.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const p = await getRawProject(slug);
    return mapProject(p);
  } catch {
    return null;
  }
}

export async function getProjectsByType(
  type: "freelance" | "side" | "social"
): Promise<Project[]> {
  const projects = await jsonStore.project.findMany({
    where: { isVisible: true, type },
    orderBy: { order: "asc" },
    include: {
      screenshots: { orderBy: { order: "asc" } },
      tech: { orderBy: { order: "asc" } },
      features: { orderBy: { order: "asc" } },
      responsibilities: { orderBy: { order: "asc" } },
      highlights: { orderBy: { order: "asc" } },
    },
  });
  return projects.map(mapProject);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await jsonStore.project.findMany({
    where: { isVisible: true },
    select: { slug: true },
  });
  return projects.map((p) => p.slug);
}
