"use client";
import React from "react";
import Link from "next/link";
import { Code2, Layout, Server, Terminal, CheckCircle2 } from "lucide-react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiLaravel,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiOpenjdk,
  SiCplusplus,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiGooglesheets,
  SiEspressif,
  SiFirebase,
  SiWordpress,
} from "react-icons/si";

type TechStackProps = {
  techs: {
    id: number;
    name: string;
    icon: string;
    category: string;
    experience: string;
    projects: string;
    order: number;
  }[];
  familiars: { id: number; name: string; order: number }[];
};

const iconMap: Record<string, React.ReactNode> = {
  SiNextdotjs: <SiNextdotjs />,
  SiTailwindcss: <SiTailwindcss />,
  SiLaravel: <SiLaravel />,
  SiReact: <SiReact />,
  SiTypescript: <SiTypescript />,
  SiJavascript: <SiJavascript />,
  SiNodedotjs: <SiNodedotjs />,
  SiPhp: <SiPhp />,
  SiPython: <SiPython />,
  SiOpenjdk: <SiOpenjdk />,
  SiCplusplus: <SiCplusplus />,
  SiMysql: <SiMysql />,
  SiSupabase: <SiSupabase />,
  SiGit: <SiGit />,
  SiGithub: <SiGithub />,
  SiFigma: <SiFigma />,
  SiVercel: <SiVercel />,
  SiGooglesheets: <SiGooglesheets />,
  SiEspressif: <SiEspressif />,
  SiFirebase: <SiFirebase />,
  SiWordpress: <SiWordpress />,
};

const catIconMap: Record<string, React.ReactNode> = {
  "Frontend & UI": <Layout style={{ width: 18, height: 18 }} />,
  "Backend & DB": <Server style={{ width: 18, height: 18 }} />,
  "Tools & Others": <Terminal style={{ width: 18, height: 18 }} />,
};

export default function TechStack({ techs, familiars }: TechStackProps) {
  const marqueeItems = techs.flatMap(tech => {
    const separate: Record<string, { name: string; icon: string }[]> = {
      "Firebase / Supabase": [{ name: "Firebase", icon: "SiFirebase" }, { name: "Supabase", icon: "SiSupabase" }],
      "Git & GitHub": [{ name: "Git", icon: "SiGit" }, { name: "GitHub", icon: "SiGithub" }],
      "Sheets & Apps Script": [{ name: "Google Sheets", icon: "SiGooglesheets" }, { name: "Google Apps Script", icon: "SiGooglesheets" }],
      "ESP32 / IoT": [{ name: "ESP32", icon: "SiEspressif" }, { name: "IoT", icon: "SiEspressif" }],
    };
    return (separate[tech.name] || [{ name: tech.name, icon: tech.icon }]).map(item => ({ ...tech, ...item }));
  });
  // Group techs by category
  const categoriesMap = techs.reduce(
    (acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = [];
      acc[curr.category].push(curr);
      return acc;
    },
    {} as Record<string, typeof techs>,
  );

  // Render icons with correct sizes
  const getIcon = (name: string, size: number) => {
    const el = iconMap[name] || <Code2 />;
    return React.cloneElement(
      el as React.ReactElement<{ style?: React.CSSProperties }>,
      { style: { width: size, height: size } },
    );
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
        {/* Header */}
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
            <Code2 style={{ width: 12, height: 12 }} /> Tech Stack & Tools
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
            - Skills & Technologies -
          </h2>
        </div>

        {/* Marquee */}
        {techs.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0 auto 0 0",
                  width: 80,
                  background:
                    "linear-gradient(to right, var(--canvas-press), transparent)",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "0 0 0 auto",
                  width: 80,
                  background:
                    "linear-gradient(to left, var(--canvas-press), transparent)",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
              <div className="marquee-wrapper">
                <div className="marquee-track">
                  {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((tech, idx) => (
                    <Link
                      href={`/projects?stack=${encodeURIComponent(tech.name)}`}
                      className="skill-project-link"
                      tabIndex={idx >= marqueeItems.length ? -1 : 0}
                      key={idx}
                      style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        margin: "0 24px",
                        color: "var(--hairline-cool)",
                        cursor: "pointer",
                        transition: "color 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--canvas-dark)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--hairline-cool)";
                      }}
                    >
                      {getIcon(tech.icon, 32)}
                      <span className="skill-tool-name"
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {tech.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {Object.entries(categoriesMap).map(([catName, skills]) => (
            <div key={catName} className="card-light" style={{ padding: 24 }}>
              {/* Category Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  paddingBottom: 16,
                  marginBottom: 16,
                  borderBottom: "1px solid var(--hairline-cloud)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--r-md)",
                    background: "rgba(12,31,63,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--canvas-dark)",
                    flexShrink: 0,
                  }}
                >
                  {catIconMap[catName] || (
                    <Terminal style={{ width: 18, height: 18 }} />
                  )}
                </div>
                <h3
                  style={{
                    fontFamily:
                      "var(--font-display, 'Space Grotesk', sans-serif)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {catName}
                </h3>
              </div>

              {/* Skills List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {skills.map((skill) => (
                  <Link
                    href={`/projects?stack=${encodeURIComponent(skill.name)}`}
                    className="skill-project-link"
                    aria-label={`View projects using ${skill.name}`}
                    key={skill.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: "var(--r-md)",
                      transition: "background 0.18s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--canvas-press)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span style={{ color: "#94a3b8", flexShrink: 0 }}>
                        {getIcon(skill.icon, 18)}
                      </span>
                      <div>
                        <div className="skill-tool-name"
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--ink)",
                          }}
                        >
                          {skill.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 2,
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 11,
                              color: "#94a3b8",
                            }}
                          >
                            <CheckCircle2 style={{ width: 10, height: 10 }} />{" "}
                            {skill.experience}
                          </span>
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>
                            {skill.projects}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Tools */}
        {familiars.length > 0 && (
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <p
              className="text-eyebrow"
              style={{ color: "#94a3b8", marginBottom: 14 }}
            >
              Also familiar with
            </p>
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {familiars.map((tool) => (
                <Link
                  href={`/projects?stack=${encodeURIComponent(tool.name)}`}
                  className="skill-project-link"
                  key={tool.id}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "var(--r-full)",
                    border: "1px solid var(--hairline-cloud)",
                    background: "var(--canvas-light)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#475569",
                    transition: "border-color 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--canvas-dark)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--canvas-dark)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--hairline-cloud)";
                    (e.currentTarget as HTMLElement).style.color = "#475569";
                  }}
                >
                  <span className="skill-tool-name">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
