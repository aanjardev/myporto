import Link from "next/link";
import ProjectCardDescription from "./ProjectCardDescription";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/types/project";
import {
  PortfolioBadge,
  PortfolioImage,
  PortfolioTags,
  projectTypeLabel,
} from "./PortfolioUI";
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="portfolio-card portfolio-card-compact portfolio-project-card">
      <Link
        href={`/projects/${project.slug}`}
        className="portfolio-card-image"
        aria-label={`View ${project.title}`}
      >
        <PortfolioImage
          src={project.image}
          alt={project.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 400px"
        />
        <span className="portfolio-card-overlay">
          <PortfolioBadge>{projectTypeLabel(project.type)}</PortfolioBadge>
        </span>
      </Link>
      <div className="portfolio-card-body">
        {project.client && (
          <p className="portfolio-card-meta">{project.client}</p>
        )}
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <ProjectCardDescription>{project.description}</ProjectCardDescription>
        <PortfolioTags tags={project.tech} limit={2} />
        <footer className="portfolio-card-footer">
          <Link href={`/projects/${project.slug}`} className="portfolio-card-primary-link" aria-label={`View details: ${project.title}`}>
            View details{" "}
            <span className="interaction-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <div>
            {project.liveUrl && (
              <a
                className="interaction-icon"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo: ${project.title}`}
                title="Live demo"
              >
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a
                className="interaction-icon"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source code: ${project.title}`}
                title="Source code"
              >
                <SiGithub size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
}
