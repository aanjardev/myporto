import { Briefcase } from "lucide-react";
import WorkExperience from "@/components/WorkExperience";

export const metadata = {
  title: "Work Experience | Aanjar Portfolio",
  description:
    "Professional experience including work, internships, freelance, and tutoring.",
};

export default function WorkPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--canvas-press)" }}>
      {/* Dark navy hero banner */}
      {/* <section
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
          <span
            className="eyebrow-pill"
            style={{
              background: "var(--on-dark-faint)",
              color: "var(--on-dark-muted)",
              border: "1px solid rgba(255,255,255,0.10)",
              marginBottom: 20,
              display: "inline-flex",
            }}
          >
            <Briefcase style={{ width: 12, height: 12 }} />
            My Career Journey
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 700,
              color: "var(--on-dark)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Work Experience
          </h1>
          <p
            className="text-body-lg"
            style={{ color: "var(--on-dark-muted)", maxWidth: 520, margin: "0 auto" }}
          >
            Professional experience including full-time work, internships,
            freelance projects, and tutoring. Each role has contributed to my
            growth as a developer and educator.
          </p>
        </div>
      </section> */}

      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <WorkExperience />
        </div>
      </section>
    </main>
  );
}
