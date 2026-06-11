"use client";
import Link from "next/link";
import { experiences, Experience } from "../data/workExperienceData";
import { Briefcase, ExternalLink, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function WorkExperienceSummary() {
  const summary = experiences.slice(0, 3);

  return (
    <section
      id="work"
      style={{
        padding: "96px 24px",
        background: "var(--canvas-light)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--hairline-cloud)",
          pointerEvents: "none",
        }}
      />

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
            <Briefcase style={{ width: 12, height: 12 }} />
            My Journey
          </span>
          <h2
            className="text-heading-xl"
            style={{
              color: "var(--ink)",
              margin: "0 0 8px",
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontWeight: 600,
              fontSize: "clamp(24px, 3vw, 32px)",
            }}
          >
           - Work Experience -
          </h2>
          {/* <div className="section-divider" /> */}
          {/* <p
            style={{
              color: "#64748b",
              maxWidth: 520,
              margin: "16px auto 0",
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            3+ years of professional experience across freelance, tutoring, and
            internships — building real solutions for real people.
          </p> */}
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {summary.map((ex: Experience, index: number) => (
            <div
              key={ex.title}
              className="card-light"
              style={{
                padding: 28,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar (appears on hover via CSS) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: "var(--canvas-dark)",
                  borderRadius: "var(--r-xl) var(--r-xl) 0 0",
                  opacity: 0.8,
                }}
              />

              {/* Period Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: "var(--r-xs)",
                  background: "rgba(12,31,63,0.07)",
                  color: "var(--canvas-dark)",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  marginBottom: 16,
                }}
              >
                <Calendar style={{ width: 11, height: 11 }} />
                {ex.period}
              </div>

              {/* Title */}
              <h3
                className="text-heading-sm"
                style={{
                  color: "var(--ink)",
                  margin: "0 0 4px",
                  fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                }}
              >
                {ex.title}
              </h3>

              {/* Company */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "#64748b",
                  fontSize: 13,
                  marginBottom: 14,
                }}
              >
                <MapPin style={{ width: 12, height: 12 }} />
                {ex.company}
              </div>

              {/* Description */}
              <p
                style={{
                  color: "#475569",
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginBottom: 16,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {ex.description}
              </p>

              {/* Tech Tags */}
              {ex.tech && ex.tech.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ex.tech.slice(0, 3).map((t: string) => (
                    <span
                      key={t}
                      style={{
                        padding: "3px 10px",
                        borderRadius: "var(--r-xs)",
                        background: "var(--canvas-press)",
                        color: "var(--canvas-dark)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.03em",
                        border: "1px solid var(--hairline-cloud)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {ex.tech.length > 3 && (
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
                      +{ex.tech.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/work"
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
            View Full Work History
            <ExternalLink style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
