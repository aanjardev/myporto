import { getAllProjects } from "@/lib/db/projects";
import ProjectsClient from "@/components/ProjectsClient";

export const metadata = {
  title: "Projects | Aanjar Portfolio",
  description:
    "Explore Aanjar's complete portfolio of web development projects — from professional client work to social impact initiatives.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ stack?: string | string[] }>;
}) {
  await searchParams;
  const projects = await getAllProjects();

  return <ProjectsClient initialProjects={projects} />;
}
