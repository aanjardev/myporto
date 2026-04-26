import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Briefcase,
  Gamepad2,
  User,
  CheckCircle2,
  CalendarDays,
  Layers,
  Code2,
  Sparkles,
  Users,
  Award,
  Target,
  Lightbulb,
  Zap,
  Globe,
  Shield,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectsData } from "@/data/projectsData";
import type { Project } from "@/types/project";
import ImageCarousel from "@/components/ImageCarousel";

// Generate static params for all projects
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// Get project by slug
function getProject(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug);
}

// Get adjacent projects
function getAdjacentProjects(currentSlug: string) {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : null;
  return { prevProject, nextProject };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Aanjar Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const isFreelance = project.type === "freelance";
  const { prevProject, nextProject } = getAdjacentProjects(slug);

  // Prepare images for carousel
  const carouselImages =
    project.screenshots && project.screenshots.length > 0
      ? [project.image, ...project.screenshots]
      : [project.image];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 me-5 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold mb-4 border border-white/20">
            {isFreelance ? (
              <Briefcase className="w-3 h-3" />
            ) : (
              <Gamepad2 className="w-3 h-3" />
            )}
            {isFreelance ? "Freelance Project" : "Side Project"}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-sm text-white/60">
            {project.period && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.period}
              </span>
            )}
            {project.myRole && (
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                {project.myRole}
              </span>
            )}
            {project.teamSize && (
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {project.teamSize}
              </span>
            )}
            {project.client && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {project.client}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Carousel */}
          <div className="mb-10">
            <ImageCarousel images={carouselImages} title={project.title} />
          </div>

          {/* Action Buttons */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-4 mb-12">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#152C48] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <SiGithub className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          )}

          {/* ========== REDESIGNED SECTIONS ========== */}

          {/* Tech Stack - Enhanced dengan visual pill */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-1.5 bg-[#1E3A5F]/10 rounded-lg">
                <Code2 className="w-4 h-4 text-[#1E3A5F]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Tech Stack
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="group px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-full hover:border-[#1E3A5F] hover:text-[#1E3A5F] hover:shadow-sm transition-all duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* About - Clean typography */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#1E3A5F]/10 rounded-lg">
                <Sparkles className="w-4 h-4 text-[#1E3A5F]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>
          </div>

          {/* Challenge & Solution - Side by Side Layout */}
          {(project.challenge || project.solution) && (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {project.challenge && (
                <div className="bg-white rounded-xl border-l-4 border-l-amber-400 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Target className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Challenge</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-10">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="bg-white rounded-xl border-l-4 border-l-emerald-400 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Solution</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pl-10">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Responsibilities - Clean list with check icon */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-[#1E3A5F]/10 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3A5F]" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  What I Did
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.responsibilities.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#1E3A5F]" />
                    </div>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features - Card grid */}
          {project.features && project.features.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-[#1E3A5F]/10 rounded-lg">
                  <Zap className="w-4 h-4 text-[#1E3A5F]" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Key Features
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <div className="w-6 h-6 rounded bg-[#1E3A5F]/5 flex items-center justify-center">
                      <span className="text-[#1E3A5F] text-xs font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights - Achievement badges */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-1.5 bg-amber-100 rounded-lg">
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Impact & Achievements
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-transparent rounded-full border border-amber-200"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-amber-700 text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goal & Outcome - If available */}
          {(project.goal || project.outcome) && (
            <div className="grid md:grid-cols-2 gap-6 mb-12 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
              {project.goal && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-[#1E3A5F]" />
                    <h3 className="font-semibold text-gray-800 text-sm">
                      Goal
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm">{project.goal}</p>
                </div>
              )}
              {project.outcome && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-[#1E3A5F]" />
                    <h3 className="font-semibold text-gray-800 text-sm">
                      Outcome
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm">{project.outcome}</p>
                </div>
              )}
            </div>
          )}

          {/* Prev / Next Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-6">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group inline-flex items-center gap-2 text-gray-500 hover:text-[#1E3A5F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Previous Project</span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex items-center gap-2 text-gray-500 hover:text-[#1E3A5F] transition-colors"
              >
                <span className="text-sm">Next Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
