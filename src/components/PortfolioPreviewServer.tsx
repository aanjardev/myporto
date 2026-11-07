import { getAllProjects } from "@/lib/db/projects";
import PortfolioPreview from "./PortfolioPreview";

export default async function PortfolioPreviewServer() {
  const projects = await getAllProjects();
  return <PortfolioPreview projects={projects} />;
}
