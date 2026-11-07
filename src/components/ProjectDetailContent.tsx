"use client";
import Link from "next/link";
import ProjectNarrative from "./ProjectNarrative";
import ImageCarousel from "./ImageCarousel";
import { PortfolioBadge, PortfolioTags, projectTypeLabel } from "./PortfolioUI";
import type { Project } from "@/types/project";
interface Props {
  project: Project;
  prevSlug: string | null;
  nextSlug: string | null;
  prevTitle: string | null;
  nextTitle: string | null;
  carouselImages: string[];
}
export default function ProjectDetailContent({
  project,
  prevSlug,
  nextSlug,
  prevTitle,
  nextTitle,
  carouselImages,
}: Props) {
  return (
    <main className="portfolio-detail portfolio-project-detail">
      <header className="portfolio-detail-header">
        <div className="portfolio-container">
          <div className="portfolio-detail-topline">
          <Link href="/projects" className="portfolio-back interaction-link">
            &larr; Back to Projects
          </Link>
          <PortfolioBadge>{projectTypeLabel(project.type)}</PortfolioBadge>
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </header>
      <div className="portfolio-container portfolio-detail-body">
        <ImageCarousel images={carouselImages} title={project.title} />
        <div className="portfolio-detail-grid">
          <ProjectNarrative key={project.slug} project={project} />
          <aside className="portfolio-info">
            <h2>Project information</h2>
            <dl>
              {[
                ["Client", project.client],
                ["Period", project.period],
                ["My role", project.myRole],
                ["Team size", project.teamSize],
              ].map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ) : null,
              )}
            </dl>
            {project.tech.length > 0 && (
              <>
                <h3>Tech stack</h3>
                <PortfolioTags tags={project.tech} />
              </>
            )}
            <div className="portfolio-actions">
              {project.liveUrl && (
                <a
                  className="portfolio-button"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo &#8599;
                </a>
              )}
              {project.githubUrl && (
                <a
                  className="portfolio-button portfolio-button-secondary"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code &#8599;
                </a>
              )}
            </div>
          </aside>
        </div>
        <nav className="portfolio-adjacent" aria-label="Project navigation">
          {prevSlug ? (
            <Link className="interaction-link" href={`/projects/${prevSlug}`}>
              <span>&larr; Previous Project</span>
              <strong>{prevTitle}</strong>
            </Link>
          ) : (
            <div />
          )}
          {nextSlug && (
            <Link className="interaction-link" href={`/projects/${nextSlug}`}>
              <span>Next Project &rarr;</span>
              <strong>{nextTitle}</strong>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
