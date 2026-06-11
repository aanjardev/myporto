"use client";
import {
  Briefcase, BookOpen, Code, DollarSign, GraduationCap,
  MonitorSmartphone, Calendar, MapPin,
} from "lucide-react";
import { experiences } from "../data/workExperienceData";

// const ICONS = [
//   <Briefcase key="b" style={{ width: 16, height: 16 }} />,
//   <BookOpen key="bo" style={{ width: 16, height: 16 }} />,
//   <DollarSign key="d" style={{ width: 16, height: 16 }} />,
//   <MonitorSmartphone key="m" style={{ width: 16, height: 16 }} />,
//   <GraduationCap key="g" style={{ width: 16, height: 16 }} />,
//   <Code key="c" style={{ width: 16, height: 16 }} />,
// ];

// const getIcon = (i: number) => ICONS[i % ICONS.length];

export default function WorkExperience() {
  return (
    <div style={{ position: "relative" }}>
      {/* Timeline line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 19,
          top: 24,
          bottom: 24,
          width: 1,
          background: "linear-gradient(to bottom, transparent, var(--hairline-cloud) 10%, var(--hairline-cloud) 90%, transparent)",
        }}
        className="hidden md:block"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {experiences.map((exp, index) => (
          <div
            key={exp.title}
            style={{
              position: "relative",
              paddingBottom: index < experiences.length - 1 ? 24 : 0,
            }}
          >
            {/* Dot
            <div
              className="hidden md:flex"
              style={{
                position: "absolute",
                left: 7,
                top: 0,
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "var(--canvas-dark)",
                border: "3px solid var(--canvas-light)",
                boxShadow: "0 0 0 1px var(--hairline-cloud)",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--on-dark)",
                zIndex: 2,
                flexShrink: 0,
              }}
            >
              
             {getIcon(index)} 
            </div> */}

            {/* Card */}
            <div
              className="card-light"
              style={{
                marginLeft: 0,
                overflow: "hidden",
              }}
              /* md:ml-12 handled by className below */
            >
              <div
                style={{
                  display: "flex",
                  position: "relative",
                }}
              >
                {/* Left accent */}
                <div
                  style={{
                    width: 3,
                    flexShrink: 0,
                    background: "var(--canvas-dark)",
                    borderRadius: "var(--r-xl) 0 0 var(--r-xl)",
                    minHeight: "100%",
                    opacity: 0.7,
                  }}
                />

                <div style={{ padding: "22px 24px", width: "100%" }}>
                  {/* Header row */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                          fontSize: 18,
                          fontWeight: 600,
                          color: "var(--ink)",
                          margin: "0 0 4px",
                        }}
                      >
                        {exp.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 13,
                          color: "#64748b",
                        }}
                      >
                        <MapPin style={{ width: 12, height: 12 }} />
                        {exp.company}
                      </div>
                    </div>

                    {/* Period */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "4px 10px",
                        borderRadius: "var(--r-xs)",
                        background: "rgba(12,31,63,0.07)",
                        color: "var(--canvas-dark)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        whiteSpace: "nowrap" as const,
                      }}
                    >
                      <Calendar style={{ width: 11, height: 11 }} />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      color: "#475569",
                      fontSize: 14,
                      lineHeight: 1.7,
                      marginBottom: 14,
                    }}
                  >
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {exp.tech.map((tech) => (
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
