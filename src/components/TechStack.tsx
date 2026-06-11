"use client";
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import {
  SiNextdotjs, SiTailwindcss, SiLaravel, SiReact, SiTypescript,
  SiJavascript, SiNodedotjs, SiPhp, SiPython, SiOpenjdk, SiCplusplus,
  SiMysql, SiSupabase, SiGit, SiGithub, SiFigma, SiVercel,
  SiGooglesheets, SiEspressif, SiFirebase, SiWordpress,
} from "react-icons/si";

const skillCategories = [
  {
    name: "Frontend & UI",
    icon: <Layout style={{ width: 18, height: 18 }} />,
    skills: [
      { name: "Next.js", icon: <SiNextdotjs style={{ width: 18, height: 18 }} />, experience: ">1 years", projects: "3+ projects" },
      { name: "React", icon: <SiReact style={{ width: 18, height: 18 }} />, experience: "1+ years", projects: "3+ projects" },
      { name: "TailwindCSS", icon: <SiTailwindcss style={{ width: 18, height: 18 }} />, experience: "2+ years", projects: "4+ projects" },
      { name: "TypeScript", icon: <SiTypescript style={{ width: 18, height: 18 }} />, experience: "1+ years", projects: "3+ projects" },
      { name: "JavaScript", icon: <SiJavascript style={{ width: 18, height: 18 }} />, experience: "3+ years", projects: "10+ projects" },
      { name: "Figma", icon: <SiFigma style={{ width: 18, height: 18 }} />, experience: "2+ years", projects: "5+ projects" },
    ],
  },
  {
    name: "Backend & DB",
    icon: <Server style={{ width: 18, height: 18 }} />,
    skills: [
      { name: "Laravel", icon: <SiLaravel style={{ width: 18, height: 18 }} />, experience: "3+ years", projects: "6+ projects" },
      { name: "Node.js", icon: <SiNodedotjs style={{ width: 18, height: 18 }} />, experience: "2+ years", projects: "3+ projects" },
      { name: "PHP", icon: <SiPhp style={{ width: 18, height: 18 }} />, experience: "3+ years", projects: "5+ projects" },
      { name: "MySQL", icon: <SiMysql style={{ width: 18, height: 18 }} />, experience: "3+ years", projects: "10+ projects" },
      { name: "Firebase / Supabase", icon: <SiFirebase style={{ width: 18, height: 18 }} />, experience: "2+ years", projects: "7+ projects" },
      { name: "Python", icon: <SiPython style={{ width: 18, height: 18 }} />, experience: "2+ years", projects: "2+ projects" },
    ],
  },
  {
    name: "Tools & Others",
    icon: <Terminal style={{ width: 18, height: 18 }} />,
    skills: [
      { name: "Git & GitHub", icon: <SiGithub style={{ width: 18, height: 18 }} />, experience: "3+ years", projects: "15+ projects" },
      { name: "WordPress", icon: <SiWordpress style={{ width: 18, height: 18 }} />, experience: "3+ years", projects: "7+ projects" },
      { name: "Sheets & Apps Script", icon: <SiGooglesheets style={{ width: 18, height: 18 }} />, experience: "2+ years", projects: "9+ projects" },
      { name: "ESP32 / IoT", icon: <SiEspressif style={{ width: 18, height: 18 }} />, experience: "1+ years", projects: "3+ projects" },
      { name: "Java", icon: <SiOpenjdk style={{ width: 18, height: 18 }} />, experience: "1+ years", projects: "2+ projects" },
      { name: "C++", icon: <SiCplusplus style={{ width: 18, height: 18 }} />, experience: "1+ years", projects: "1+ projects" },
    ],
  },
];

const techLogos = [
  { name: "Next.js", icon: <SiNextdotjs style={{ width: 32, height: 32 }} /> },
  { name: "TailwindCSS", icon: <SiTailwindcss style={{ width: 32, height: 32 }} /> },
  { name: "Laravel", icon: <SiLaravel style={{ width: 32, height: 32 }} /> },
  { name: "React", icon: <SiReact style={{ width: 32, height: 32 }} /> },
  { name: "TypeScript", icon: <SiTypescript style={{ width: 32, height: 32 }} /> },
  { name: "JavaScript", icon: <SiJavascript style={{ width: 32, height: 32 }} /> },
  { name: "Node.js", icon: <SiNodedotjs style={{ width: 32, height: 32 }} /> },
  { name: "PHP", icon: <SiPhp style={{ width: 32, height: 32 }} /> },
  { name: "Python", icon: <SiPython style={{ width: 32, height: 32 }} /> },
  { name: "MySQL", icon: <SiMysql style={{ width: 32, height: 32 }} /> },
  { name: "WordPress", icon: <SiWordpress style={{ width: 32, height: 32 }} /> },
  { name: "Firebase", icon: <SiFirebase style={{ width: 32, height: 32 }} /> },
  { name: "Supabase", icon: <SiSupabase style={{ width: 32, height: 32 }} /> },
  { name: "Git", icon: <SiGit style={{ width: 32, height: 32 }} /> },
  { name: "GitHub", icon: <SiGithub style={{ width: 32, height: 32 }} /> },
  { name: "Figma", icon: <SiFigma style={{ width: 32, height: 32 }} /> },
  { name: "Vercel", icon: <SiVercel style={{ width: 32, height: 32 }} /> },
];

const otherTools = [
  "RESTful APIs", "JWT Authentication", "IoT (ESP32)",
  "Google Apps Script", "WordPress Dev", "Firebase Integration",
];

export default function SkillsTools() {
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
            <Code2 style={{ width: 12, height: 12 }} />
            Tech Stack & Tools
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
        <div style={{ marginBottom: 56 }}>
          <div style={{ position: "relative", overflow: "hidden", padding: "20px 0" }}>
            {/* Fade masks */}
            <div
              style={{
                position: "absolute",
                inset: "0 auto 0 0",
                width: 80,
                background: "linear-gradient(to right, var(--canvas-press), transparent)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "0 0 0 auto",
                width: 80,
                background: "linear-gradient(to left, var(--canvas-press), transparent)",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...techLogos, ...techLogos, ...techLogos].map((tech, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      margin: "0 24px",
                      color: "var(--hairline-cool)",
                      cursor: "default",
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "var(--hairline-cool)";
                    }}
                  >
                    {tech.icon}
                    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.03em" }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="card-light"
              style={{ padding: 24 }}
            >
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
                  {category.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: 0,
                  }}
                >
                  {category.name}
                </h3>
              </div>

              {/* Skills List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: "var(--r-md)",
                      transition: "background 0.18s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "var(--canvas-press)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#94a3b8", flexShrink: 0 }}>{skill.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                          {skill.name}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 11,
                              color: "#94a3b8",
                            }}
                          >
                            <CheckCircle2 style={{ width: 10, height: 10 }} />
                            {skill.experience}
                          </span>
                          <span style={{ fontSize: 11, color: "#94a3b8" }}>{skill.projects}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Tools */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p
            className="text-eyebrow"
            style={{ color: "#94a3b8", marginBottom: 14 }}
          >
            Also familiar with
          </p>
          <div style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {otherTools.map((tool) => (
              <span
                key={tool}
                style={{
                  padding: "5px 14px",
                  borderRadius: "var(--r-full)",
                  border: "1px solid var(--hairline-cloud)",
                  background: "var(--canvas-light)",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#475569",
                  transition: "border-color 0.2s, color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--canvas-dark)";
                  (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--hairline-cloud)";
                  (e.currentTarget as HTMLElement).style.color = "#475569";
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
