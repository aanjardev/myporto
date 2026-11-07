import { Briefcase } from "lucide-react";
import WorkExperience from "@/components/WorkExperience";
import { getAllExperiences } from "@/lib/db/experiences";

export const metadata = {
  title: "Work Experience | Aanjar Portfolio",
  description:
    "Professional experience including work, internships, freelance, and tutoring.",
};

export default async function WorkPage() {
  const experiences = await getAllExperiences();

  return (
    <main style={{ minHeight: "100vh", background: "var(--canvas-press)" }}>
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <WorkExperience experiences={experiences} />
        </div>
      </section>
    </main>
  );
}
