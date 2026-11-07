import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, getAllProjects } from "@/lib/db/projects";
import type { Project } from "@/types/project";
import ProjectDetailContent from "@/components/ProjectDetailContent";

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Get adjacent projects
async function getAdjacentProjects(currentSlug: string) {
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  return { prev, next };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Aanjar Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);

  const carouselImages =
    project.screenshots && project.screenshots.length > 0
      ? [project.image, ...project.screenshots]
      : [project.image];

  return (
    <ProjectDetailContent
      project={project}
      prevSlug={prev?.slug ?? null}
      nextSlug={next?.slug ?? null}
      prevTitle={prev?.title ?? null}
      nextTitle={next?.title ?? null}
      carouselImages={carouselImages}
    />
  );
}
