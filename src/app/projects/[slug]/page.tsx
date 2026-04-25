import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Briefcase,
  Gamepad2,
  User,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Layers,
  Code2,
  Sparkles,
  Share2,
  Heart,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectsData } from "@/components/projectsData";
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

  // Prepare images for carousel
  const carouselImages = project.screenshots
    ? [project.image, ...project.screenshots]
    : [project.image];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient Overlay */}
      <section className="relative bg-[#1E3A5F] text-white overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="max-w-3xl">
            {/* Type Badge with Icon */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold mb-5 border border-white/20">
              {isFreelance ? (
                <Briefcase className="w-3.5 h-3.5" />
              ) : (
                <Gamepad2 className="w-3.5 h-3.5" />
              )}
              {isFreelance ? "Freelance Project" : "Side Project"}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-white/80 text-lg md:text-xl mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Client / Info */}
            {project.client && (
              <div className="flex items-center gap-3 text-white/60">
                <User className="w-4 h-4" />
                <span>Client: {project.client}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Carousel */}
          <div className="mb-12">
            <ImageCarousel images={carouselImages} title={project.title} />
          </div>

          {/* Stats Bar - Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {project.period && (
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <CalendarDays className="w-5 h-5 text-[#1E3A5F] mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">COMPLETED</p>
                <p className="text-sm font-semibold text-gray-900">
                  {project.period}
                </p>
              </div>
            )}

            {project.tech && (
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <Code2 className="w-5 h-5 text-[#1E3A5F] mx-auto mb-2" />
                <p className="text-xs text-gray-400 font-medium">TECH STACK</p>
                <p className="text-sm font-semibold text-gray-900">
                  {project.tech.length}+ tools
                </p>
              </div>
            )}

            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-medium">STATUS</p>
              <p className="text-sm font-semibold text-gray-900">
                {project.liveUrl ? "Live" : "Completed"}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-medium">TYPE</p>
              <p className="text-sm font-semibold text-gray-900">
                {isFreelance ? "Client Work" : "Personal Project"}
              </p>
            </div>
          </div>

          {/* Tech Stack Section - Detailed */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#1E3A5F]/10 rounded-xl">
                <Layers className="w-5 h-5 text-[#1E3A5F]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Technologies Used
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-[#1E3A5F]/5 to-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold rounded-xl border border-[#1E3A5F]/20 hover:border-[#1E3A5F]/40 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* About Section - Enhanced */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#1E3A5F]/10 rounded-xl">
                <Sparkles className="w-5 h-5 text-[#1E3A5F]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                About This Project
              </h2>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">
                {project.longDescription || project.description}
              </p>

              {project.challenge && (
                <div className="mt-6 p-5 bg-amber-50 rounded-xl border border-amber-100">
                  <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <span>🎯</span> Challenge
                  </h3>
                  <p className="text-amber-700 text-sm">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div className="mt-4 p-5 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h3 className="font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                    <span>💡</span> Solution
                  </h3>
                  <p className="text-emerald-700 text-sm">{project.solution}</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Features - Enhanced */}
          {project.features && project.features.length > 0 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#1E3A5F]/10 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-[#1E3A5F]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Key Features
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center mt-0.5">
                      <span className="text-[#1E3A5F] text-xs font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons - Enhanced */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="bg-gradient-to-r from-[#1E3A5F]/5 to-transparent rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Ready to see it in action?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#152C48] transition-all duration-300 shadow-lg shadow-[#1E3A5F]/20 hover:shadow-xl hover:shadow-[#1E3A5F]/30 hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <SiGithub className="w-4 h-4" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Navigation - Prev/Next Project
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1E3A5F] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold hover:gap-3 transition-all group"
            >
              Explore More Projects
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div> */}
        </div>
      </section>
    </main>
  );
}
