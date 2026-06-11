import { notFound } from "next/navigation";
import { projectsData } from "@/data/projectsData";
import type { Project } from "@/types/project";
import ProjectDetailContent from "@/components/ProjectDetailContent";

// Generate static params for all projects
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// Get project by slug
function getProject(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug);
}

// Get adjacent projects
function getAdjacentProjects(currentSlug: string) {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);
  const prev = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const next = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;
  return { prev, next };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
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
  const project = getProject(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

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
