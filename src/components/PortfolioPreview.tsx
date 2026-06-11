"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { ArrowRight, ExternalLink, Briefcase, Gamepad2, Heart, Layers } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectsData } from "@/data/projectsData";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  getTypeIcon: (type: string) => React.ReactNode;
  getTypeLabel: (type: string) => string;
  getTypeColor: (type: string) => { bg: string; text: string; border: string };
}

export default function PortfolioPreview() {
  const featuredProjects = projectsData.slice(0, 3);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "freelance": return <Briefcase style={{ width: 11, height: 11 }} />;
      case "side":      return <Gamepad2 style={{ width: 11, height: 11 }} />;
      case "social":    return <Heart style={{ width: 11, height: 11 }} />;
      default:          return <Briefcase style={{ width: 11, height: 11 }} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "freelance": return "Freelance";
      case "side":      return "Side Project";
      case "social":    return "Social Impact";
      default:          return "Project";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "freelance": return { bg: "rgba(12,31,63,0.85)", text: "#fff", border: "rgba(255,255,255,0.15)" };
      case "side":      return { bg: "rgba(8,23,46,0.85)", text: "#94d4ff", border: "rgba(148,212,255,0.2)" };
      case "social":    return { bg: "rgba(45,90,142,0.85)", text: "#fff", border: "rgba(255,255,255,0.15)" };
      default:          return { bg: "rgba(12,31,63,0.85)", text: "#fff", border: "rgba(255,255,255,0.15)" };
    }
  };

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
            <ProjectCard
              key={project.id}
              project={project}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
              getTypeColor={getTypeColor}
            />
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
          >
            View All Projects
            <ExternalLink style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, getTypeIcon, getTypeLabel, getTypeColor }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const typeColor = getTypeColor(project.type);

  return (
    <div
      onClick={() => { window.location.href = `/projects/${project.slug}`; }}
      className="card-light"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        height: "100%",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "var(--canvas-press)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {imageError ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--canvas-press)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--hairline-cloud)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              📷
            </div>
            <span style={{ color: "#94a3b8", fontSize: 12 }}>No image</span>
          </div>
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              style={{ transition: "transform 0.5s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {/* Type badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: "var(--r-xs)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase" as const,
              background: typeColor.bg,
              color: typeColor.text,
              border: `1px solid ${typeColor.border}`,
              backdropFilter: "blur(4px)",
            }}
          >
            {getTypeIcon(project.type)}
            {getTypeLabel(project.type)}
          </span>
        </div>

        {/* Action icons */}
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Live Demo"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                borderRadius: "var(--r-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--canvas-dark)",
                transition: "background 0.2s",
              }}
            >
              <ExternalLink style={{ width: 14, height: 14 }} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Source Code"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                borderRadius: "var(--r-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a1a1a",
                transition: "background 0.2s",
              }}
            >
              <SiGithub style={{ width: 14, height: 14 }} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {project.client && (
          <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{project.client}</p>
        )}

        <h3
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontSize: 17,
            fontWeight: 600,
            color: "var(--ink)",
            margin: "0 0 8px",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            color: "#64748b",
            fontSize: 14,
            lineHeight: 1.65,
            marginBottom: 14,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              style={{
                padding: "3px 10px",
                borderRadius: "var(--r-xs)",
                background: "var(--canvas-press)",
                color: "var(--canvas-dark)",
                fontSize: 11,
                fontWeight: 600,
                border: "1px solid var(--hairline-cloud)",
              }}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "var(--r-xs)",
                background: "var(--canvas-press)",
                color: "#94a3b8",
                fontSize: 11,
                border: "1px solid var(--hairline-cloud)",
              }}
            >
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* View Details */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
            color: "var(--canvas-dark)",
          }}
        >
          View Details
          <ArrowRight style={{ width: 14, height: 14 }} />
        </div>
      </div>
    </div>
  );
}
