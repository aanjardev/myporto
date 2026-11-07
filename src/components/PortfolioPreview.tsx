"use client";
import Link from "next/link";
import { ExternalLink, Layers } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/project";

export default function PortfolioPreview({
  projects,
}: {
  projects: Project[];
}) {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      style={{
        padding: "96px 24px",
        background: "var(--canvas-press)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span
            className="eyebrow-pill"
            style={{
              background: "rgba(12,31,63,0.07)",
              color: "var(--canvas-dark)",
              marginBottom: 5,
              display: "inline-flex",
            }}
          >
            <Layers style={{ width: 12, height: 12 }} />
            Featured Work
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              color: "var(--ink)",
              margin: "0 0 8px",
            }}
          >
            - Selected Projects -
          </h2>
          {/* <p
            style={{
              color: "#64748b",
              maxWidth: 480,
              margin: "16px auto 0",
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            A selection of projects from freelance, side experiments, and social
            initiatives.
          </p> */}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              color: "var(--canvas-dark)",
              textDecoration: "none",
              borderBottom: "2px solid var(--canvas-dark)",
              paddingBottom: 2,
              transition: "gap 0.2s",
            }}
            className="interaction-link"
          >
            View All Projects
            <ExternalLink style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
