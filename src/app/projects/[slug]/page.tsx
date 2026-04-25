// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, User } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectsData } from "@/components/projectsData";
import { Project } from "@/types/project";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#1E3A5F] hover:text-[#1E3A5F]/80 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  project.type === "freelance"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {project.type === "freelance"
                  ? "Client Project"
                  : "For Fun Project"}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  {project.client && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{project.client}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{project.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1E3A5F]/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SiGithub className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Content Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Project Details
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              This is a detailed view of the {project.title} project. Here you
              could add more information about:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Project challenges and solutions</li>
              <li>Key features implemented</li>
              <li>Performance optimizations</li>
              <li>Lessons learned</li>
              <li>Screenshots or additional images</li>
            </ul>
            <p className="text-gray-600">
              You can expand this section with more detailed information about
              the project, including technical implementation details, design
              decisions, and outcomes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
