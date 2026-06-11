"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--canvas-light)",
        borderTop: "1px solid var(--hairline-cloud)",
        padding: "32px 24px",
        display: "none",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--canvas-dark)",
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}
        >
          Aanjar<span style={{ color: "var(--accent-navy-mid)" }}>.</span>
        </Link>

        {/* Copyright */}
        <p
          className="text-caption"
          style={{ color: "#94a3b8", margin: 0, textAlign: "center" }}
        >
          © {currentYear} Aanjar Portfolio. All rights reserved.
        </p>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 20 }}>
          {[
            { href: "/projects", label: "Projects" },
            { href: "/work", label: "Work" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: "#94a3b8",
                textDecoration: "none",
                transition: "color 0.18s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#94a3b8";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
