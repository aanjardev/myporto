"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Briefcase, Users, Code, BookOpen, Star, Calendar } from "lucide-react";
import { SiGithub } from "react-icons/si";

// ─── Foto slideshow — sementara pakai 1 foto, tambah profil2.jpg & profil3.jpg di public/images/
const PHOTOS = [
  { src: "/images/profil1.jpg", label: "Casual" },
  { src: "/images/profil2.jpg", label: "Professional" },
  { src: "/images/profil3.jpg", label: "Creative" },
];

const SLIDE_INTERVAL = 4000; // ms

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [imageErrors, setImageErrors] = useState<boolean[]>([false, false, false]);

  // Auto-slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PHOTOS.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleImageError = (idx: number) => {
    setImageErrors((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <section
      style={{
        background: "var(--canvas-dark)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid texture overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0) 1px, transparent 5%)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      {/* Glowing orbs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          right: "-20%",
          width: 1000,
          height: 1000,
          background: "radial-gradient(circle, rgba(45, 90, 142, 0.36) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(12, 31, 63, 1) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          width: "100%",
          padding: "80px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Text Content ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Eyebrow */}
            {/* <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.05s" }}
            >
              <span
                className="eyebrow-pill"
                style={{
                  background: "var(--on-dark-faint)",
                  color: "var(--on-dark-muted)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
                Available for Freelance
              </span>
            </div> */}

            {/* Heading */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.12s", display: "flex", flexDirection: "column", gap: 8 }}
            >
              <h1
                className="text-display-hero"
                style={{
                  fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                  color: "var(--on-dark)",
                  margin: 0,
                }}
              >
                Hi! I&apos;m{" "}
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    borderRadius: "var(--r-xs)",
                    padding: "0 14px",
                  }}
                >
                  Aanjar
                </span>
              </h1>

              <div style={{ position: "relative", display: "inline-block" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 400,
                    color: "var(--on-dark-muted)",
                    margin: 0,
                  }}
                >
                  Web Developer & Private Tutor
                </h2>
              </div>
            </div>

            {/* Role Tags */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.18s", display: "flex", flexWrap: "wrap", gap: 8 }}
            >
              {[
                { icon: <BookOpen style={{ width: 13, height: 13 }} />, label: "Informatics Student" },
                { icon: <Briefcase style={{ width: 13, height: 13 }} />, label: "Freelancer" },
                { icon: <Star style={{ width: 13, height: 13 }} />, label: "Private Tutor" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: "var(--r-xs)",
                    fontSize: 13,
                    background: "var(--on-dark-faint)",
                    color: "var(--on-dark)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {tag.icon}
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              className="text-body-lg animate-fade-in-up"
              style={{
                color: "var(--on-dark-muted)",
                maxWidth: 500,
                margin: 0,
                animationDelay: "0.22s",
              }}
            >
              I build websites for clients and create fun interactive tools that
              anyone can use for free.
            </p>

            {/* Buttons */}
            <div
              className="animate-fade-in-up"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                animationDelay: "0.28s",
              }}
            >
              <Link href="/projects" className="btn-inverted" style={{ textDecoration: "none" }}>
                See My Work
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link
                href="https://github.com/aanjardev"
                target="_blank"
                className="btn-ghost-dark"
                style={{ textDecoration: "none" }}
              >
                <SiGithub style={{ width: 16, height: 16 }} />
                GitHub
              </Link>
            </div>

            {/* Stats */}
            {/* <div
              className="animate-fade-in-up"
              style={{
                paddingTop: 24,
                borderTop: "1px solid rgba(255,255,255,0.10)",
                animationDelay: "0.34s",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
                {[
                  { icon: <Calendar style={{ width: 14, height: 14 }} />, value: "3+", label: "Years Exp." },
                  { icon: <Users style={{ width: 14, height: 14 }} />, value: "7+", label: "Clients" },
                  { icon: <Code style={{ width: 14, height: 14 }} />, value: "10+", label: "Projects" },
                ].map((stat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "var(--r-full)",
                        background: "var(--on-dark-faint)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--on-dark-muted)",
                        flexShrink: 0,
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--on-dark)",
                          fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--on-dark-muted)", marginTop: 2 }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* ── RIGHT: Photo Slideshow ── */}
          <div
            className="animate-fade-in hero-photo-col"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 16,
              animationDelay: "0.01s",
            }}
          >
            {/* Frame */}
            <div
              className="hero-photo-wrapper"
              style={{
                position: "relative",
              }}
            >
              {/* Decorative back layers */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  right: 20,
                  bottom: 20,
                  border: "1px solid rgba(255,255,255,0.32)",
                  borderRadius: "var(--r-xxl)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  right: 10,
                  bottom: 10,
                  border: "1px solid rgba(255, 255, 255, 0.32)",
                  borderRadius: "var(--r-xxl)",
                  pointerEvents: "none",
                }}
              />

              {/* Photo container */}
              <div
                className="hero-photo-container"
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "var(--r-xxl)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "var(--canvas-night)",
                }}
              >
                {PHOTOS.map((photo, idx) => (
                  <div
                    key={photo.src}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: current === idx ? 1 : 0,
                      transition: "opacity 0.001s ease-in-out",
                      zIndex: current === idx ? 2 : 1,
                    }}
                  >
                    {imageErrors[idx] ? (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          color: "var(--on-dark-muted)",
                        }}
                      >
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: "var(--on-dark-faint)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 28,
                          }}
                        >
                          📸
                        </div>
                        <span style={{ fontSize: 13 }}>Aanjar</span>
                      </div>
                    ) : (
                      <Image
                        src={photo.src}
                        alt={`Aanjar — ${photo.label}`}
                        fill
                        className="object-cover object-top"
                        onError={() => handleImageError(idx)}
                        priority={idx === 0}
                        sizes="440px"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            {/* <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  id={`hero-dot-${idx}`}
                  aria-label={`Photo ${idx + 1}`}
                  onClick={() => setCurrent(idx)}
                  style={{
                    width: current === idx ? 24 : 8,
                    height: 8,
                    borderRadius: "var(--r-full)",
                    background: current === idx ? "var(--on-dark)" : "rgba(255,255,255,0.25)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-photo-wrapper {
          width: min(440px, 90vw);
        }
        .hero-photo-container {
          height: 560px;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .hero-photo-col {
            order: -1;
          }
          .hero-photo-wrapper {
            width: min(300px, 80vw);
          }
          .hero-photo-container {
            height: 380px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
