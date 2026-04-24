import WorkExperience from "@/components/WorkExperience";

export default function WorkPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#1E3A5F]">Work Experience</h1>
          <p className="text-[#374151] text-lg mt-2">
            Professional experience including work, internships, freelance, and
            tutoring.
          </p>
        </header>

        <WorkExperience />
      </div>
    </main>
  );
}
