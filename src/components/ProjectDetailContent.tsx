"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Calendar, ExternalLink,
  Briefcase, Gamepad2, User, CheckCircle2,
  Code2, Sparkles, Users, Award, Target,
  Lightbulb, Zap, Globe, Shield,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import ImageCarousel from "@/components/ImageCarousel";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
  prevSlug: string | null;
  nextSlug: string | null;
  prevTitle: string | null;
  nextTitle: string | null;
  carouselImages: string[];
}

function NavLink({
  href,
  children,
  style,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      href={href}
      style={{ color: "#64748b", textDecoration: "none", transition: "color 0.2s", ...style }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
    >
      {children}
    </Link>
  );
}

function BackLink() {
  return (
    <Link
      href="/projects"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        color: "var(--on-dark-muted)",
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 24,
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--on-dark)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--on-dark-muted)"; }}
    >
      <ArrowLeft style={{ width: 14, height: 14 }} />
      Back to Projects
    </Link>
  );
}

export default function ProjectDetailContent({
  project,
  prevSlug,
  nextSlug,
  prevTitle,
  nextTitle,
  carouselImages,
}: Props) {
  const isFreelance = project.type === "freelance";

  return (
    <main style={{ minHeight: "100vh", background: "var(--canvas-press)" }}>
      {/* Hero Banner */}
      <section
        className="px-6 lg:px-0"
        style={{
          background: "var(--canvas-dark)",
          paddingTop: 48,
          paddingBottom: 56,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1152, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <BackLink />

          <span
            className="eyebrow-pill"
            style={{
              background: "var(--on-dark-faint)",
              color: "var(--on-dark-muted)",
              border: "1px solid rgba(255,255,255,0.10)",
              marginBottom: 14,
              display: "inline-flex",
            }}
          >
            {isFreelance
              ? <Briefcase style={{ width: 12, height: 12 }} />
              : <Gamepad2 style={{ width: 12, height: 12 }} />}
            {isFreelance ? "Freelance Project" : "Side Project"}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              color: "var(--on-dark)",
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, color: "var(--on-dark-muted)", fontSize: 13 }}>
            {project.period && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Calendar style={{ width: 13, height: 13 }} />
                {project.period}
              </span>
            )}
            {project.myRole && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Award style={{ width: 13, height: 13 }} />
                {project.myRole}
              </span>
            )}
            {project.teamSize && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Users style={{ width: 13, height: 13 }} />
                {project.teamSize}
              </span>
            )}
            {project.client && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <User style={{ width: 13, height: 13 }} />
                {project.client}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 lg:px-0" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Image Carousel */}
          <div style={{ marginBottom: 40, borderRadius: "var(--r-xxl)", overflow: "hidden" }}>
            <ImageCarousel images={carouselImages} title={project.title} />
          </div>

          {/* Action Buttons */}
          {(project.liveUrl || project.githubUrl) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <ExternalLink style={{ width: 15, height: 15 }} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-dark"
                  style={{
                    textDecoration: "none",
                    background: "var(--canvas-press)",
                    color: "var(--canvas-dark)",
                    border: "1px solid var(--hairline-cloud)",
                  }}
                >
                  <SiGithub style={{ width: 15, height: 15 }} />
                  Source Code
                </a>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ padding: 6, background: "rgba(12,31,63,0.07)", borderRadius: "var(--r-md)" }}>
                <Code2 style={{ width: 16, height: 16, color: "var(--canvas-dark)" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                Tech Stack
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "var(--r-full)",
                    border: "1px solid var(--hairline-cloud)",
                    background: "var(--canvas-light)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--canvas-dark)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ padding: 6, background: "rgba(12,31,63,0.07)", borderRadius: "var(--r-md)" }}>
                <Sparkles style={{ width: 16, height: 16, color: "var(--canvas-dark)" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                Overview
              </h2>
            </div>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.8 }}>
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 40 }}>
              {project.challenge && (
                <div className="card-light" style={{ padding: 22, borderLeft: "3px solid #f59e0b" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Target style={{ width: 14, height: 14, color: "#d97706" }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 15, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Challenge</h3>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="card-light" style={{ padding: 22, borderLeft: "3px solid #10b981" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Lightbulb style={{ width: 14, height: 14, color: "#059669" }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 15, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Solution</h3>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Responsibilities */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ padding: 6, background: "rgba(12,31,63,0.07)", borderRadius: "var(--r-md)" }}>
                  <CheckCircle2 style={{ width: 16, height: 16, color: "var(--canvas-dark)" }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0 }}>What I Did</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 8 }}>
                {project.responsibilities.map((item, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(12,31,63,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <CheckCircle2 style={{ width: 11, height: 11, color: "var(--canvas-dark)" }} />
                    </div>
                    <span style={{ color: "#475569", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ padding: 6, background: "rgba(12,31,63,0.07)", borderRadius: "var(--r-md)" }}>
                  <Zap style={{ width: 16, height: 16, color: "var(--canvas-dark)" }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Key Features</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                {project.features.map((feature, index) => (
                  <div key={index} className="card-light" style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px" }}>
                    <span style={{ color: "var(--canvas-dark)", fontWeight: 700, fontSize: 14 }}>✓</span>
                    <span style={{ color: "#475569", fontSize: 14 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ padding: 6, background: "rgba(245,158,11,0.1)", borderRadius: "var(--r-md)" }}>
                  <Award style={{ width: 16, height: 16, color: "#d97706" }} />
                </div>
                <h2 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Impact & Achievements</h2>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {project.highlights.map((highlight, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: "var(--r-full)", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.06)" }}>
                    <Award style={{ width: 13, height: 13, color: "#d97706" }} />
                    <span style={{ fontSize: 13, color: "#92400e" }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goal & Outcome */}
          {(project.goal || project.outcome) && (
            <div className="card-light" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, padding: 24, marginBottom: 40 }}>
              {project.goal && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Globe style={{ width: 14, height: 14, color: "var(--canvas-dark)" }} />
                    <h3 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Goal</h3>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{project.goal}</p>
                </div>
              )}
              {project.outcome && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Shield style={{ width: 14, height: 14, color: "var(--canvas-dark)" }} />
                    <h3 style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)", fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: 0 }}>Outcome</h3>
                  </div>
                  <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>{project.outcome}</p>
                </div>
              )}
            </div>
          )}

          {/* Prev / Next Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, borderTop: "1px solid var(--hairline-cloud)", marginTop: 8 }}>
            {prevSlug ? (
              <NavLink
                href={`/projects/${prevSlug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}
              >
                <ArrowLeft style={{ width: 14, height: 14 }} />
                Previous Project
              </NavLink>
            ) : <div />}

            {nextSlug ? (
              <NavLink
                href={`/projects/${nextSlug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}
              >
                Next Project
                <ArrowRight style={{ width: 14, height: 14 }} />
              </NavLink>
            ) : <div />}
          </div>
        </div>
      </section>
    </main>
  );
}
