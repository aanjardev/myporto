import { Briefcase } from "lucide-react";
import WorkExperience from "@/components/WorkExperience";

export const metadata = {
  title: "Work Experience | Aanjar Portfolio",
  description:
    "Professional experience including work, internships, freelance, and tutoring.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-[#1E3A5F] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4">
            <Briefcase className="w-4 h-4" />
            <span>My Career Journey</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Work Experience
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Professional experience including full-time work, internships,
            freelance projects, and tutoring. Each role has contributed to my
            growth as a developer and educator.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkExperience />
        </div>
      </section>
    </main>
  );
}
