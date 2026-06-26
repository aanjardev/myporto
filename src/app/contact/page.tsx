"use client";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--canvas-press)" }}>
      {/* Hero Banner — dark canvas */}
      <section
        style={{
          background: "var(--canvas-dark)",
          padding: "72px 24px 80px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
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
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 10 }}>
          {/* <span
            className="eyebrow-pill"
            style={{
              background: "var(--on-dark-faint)",
              color: "var(--on-dark-muted)",
              border: "1px solid rgba(255,255,255,0.10)",
              marginBottom: 20,
              display: "inline-flex",
            }}
          >
            <MessageCircle style={{ width: 12, height: 12 }} />
            Get in Touch
          </span> */}
          <h1
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 700,
              color: "var(--on-dark)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s Talk
          </h1>
          <p
            className="text-body-lg"
            style={{ color: "var(--on-dark-muted)", maxWidth: 480, margin: "0 auto" }}
          >
            Have a project in mind? Looking for a freelance developer? I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Email Card */}
          <div
            className="card-light"
            style={{ padding: 36, textAlign: "center" }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(12,31,63,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "var(--canvas-dark)",
              }}
            >
              <Mail style={{ width: 22, height: 22 }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 8,
              }}
            >
              Email Me
            </h2>
            <a
              href="mailto:aanjardev@gmail.com"
              style={{
                fontSize: "clamp(18px, 3vw, 26px)",
                fontWeight: 700,
                color: "var(--canvas-dark)",
                textDecoration: "none",
                fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                wordBreak: "break-all" as const,
              }}
            >
              aanjardev@gmail.com
            </a>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 12,
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              <Clock style={{ width: 13, height: 13 }} />
              Usually responds within 24 hours
            </div>
          </div>

          {/* Social Card */}
          <div className="card-light" style={{ padding: 32, textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 24,
              }}
            >
              Connect Online
            </h2>
            <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
              {[
                { href: "https://github.com/aanjardev", icon: <FaGithub style={{ width: 22, height: 22 }} />, label: "GitHub" },
                { href: "https://linkedin.com/in/aan-anjar", icon: <FaLinkedin style={{ width: 22, height: 22 }} />, label: "LinkedIn" },
                { href: "https://twitter.com/aanjar", icon: <FaTwitter style={{ width: 22, height: 22 }} />, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: "var(--canvas-press)",
                      border: "1px solid var(--hairline-cloud)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "var(--canvas-dark)";
                      el.style.color = "#fff";
                      el.style.borderColor = "var(--canvas-dark)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "var(--canvas-press)";
                      el.style.color = "#64748b";
                      el.style.borderColor = "var(--hairline-cloud)";
                    }}
                  >
                    {social.icon}
                  </div>
                  <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Note */}
          <p
            className="text-caption"
            style={{ color: "#94a3b8", textAlign: "center" }}
          >
            Open for freelance work and collaboration opportunities.
          </p>
        </div>
      </section>
    </main>
  );
}
