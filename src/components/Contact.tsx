"use client";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactCTA() {
  return (
    <section
      style={{
        background: "var(--canvas-dark)",
        padding: "96px 24px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      {/* Glow orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse, rgba(45,90,142,0.3) 0%, transparent 65%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Eyebrow */}
        {/* <span
          className="eyebrow-pill"
          style={{
            background: "var(--on-dark-faint)",
            color: "var(--on-dark-muted)",
            border: "1px solid rgba(255,255,255,0.10)",
            marginBottom: 24,
            display: "inline-flex",
          }}
        >
          <MessageCircle style={{ width: 12, height: 12 }} />
          Get in Touch
        </span> */}

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 700,
            color: "var(--on-dark)",
            margin: "0 0 16px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Let&apos;s Work Together
        </h2>

        {/* Body */}
        <p
          className="text-body-lg"
          style={{
            color: "var(--on-dark-muted)",
            maxWidth: 480,
            margin: "0 auto 36px",
          }}
        >
          Have a project in mind? Looking for a freelance web developer? I&apos;m
          just a message away.
        </p>

        {/* Buttons */}
        {/* <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Link href="/contact" className="btn-inverted" style={{ textDecoration: "none" }}>
            Contact Me
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
          <Link
            href="mailto:aanjardev@gmail.com"
            className="btn-ghost-dark"
            style={{ textDecoration: "none" }}
          >
            <Mail style={{ width: 16, height: 16 }} />
            Email Directly
          </Link>
        </div> */}

        {/* Social */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {[
            { href: "https://github.com/aanjardev", icon: <FaGithub style={{ width: 18, height: 18 }} />, label: "GitHub" },
            { href: "https://linkedin.com/in/aan-anjar", icon: <FaLinkedin style={{ width: 18, height: 18 }} />, label: "LinkedIn" },
            { href: "mailto:aanjardev@gmail.com", icon: <Mail style={{ width: 18, height: 18 }} />, label: "Email" },
          ].map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              aria-label={social.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "var(--on-dark-faint)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "var(--on-dark-muted)",
                transition: "background 0.2s, color 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--canvas-light)";
                (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--on-dark-faint)";
                (e.currentTarget as HTMLElement).style.color = "var(--on-dark-muted)";
              }}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
