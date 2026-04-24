"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Briefcase,
  Gamepad2,
  Layers,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

// Data dummy untuk featured projects
const featuredProjects = {
  freelance: [
    {
      id: 1,
      title: "Laundry Management System",
      category: "Freelance Project",
      client: "LaundryKilat UMKM",
      description:
        "Sistem manajemen laundry online dengan fitur tracking pesanan, invoice otomatis, dan laporan keuangan.",
      image: "/images/projects/laundry-app.jpg",
      tech: ["Next.js", "TailwindCSS", "Supabase"],
      liveUrl: "https://example.com",
      type: "freelance",
    },
    {
      id: 2,
      title: "School Landing Page",
      category: "Freelance Project",
      client: "SDIT Bina Bangsa",
      description:
        "Landing page profesional untuk sekolah dengan formulir pendaftaran online dan galeri kegiatan.",
      image: "/images/projects/school-web.jpg",
      tech: ["React", "TailwindCSS", "EmailJS"],
      liveUrl: "https://example.com",
      type: "freelance",
    },
    {
      id: 3,
      title: "E-Commerce Dashboard",
      category: "Freelance Project",
      client: "Toko Maju Jaya",
      description:
        "Dashboard admin untuk manajemen produk, pesanan, dan laporan penjualan real-time.",
      image: "/images/projects/ecommerce-dashboard.jpg",
      tech: ["Next.js", "TailwindCSS", "Prisma", "PostgreSQL"],
      liveUrl: "https://example.com",
      type: "freelance",
    },
  ],
  side: [
    {
      id: 4,
      title: "English Test Game",
      category: "Side Project",
      description:
        "Game interaktif untuk tes bahasa Inggris dengan timer, skor, dan level kesulitan berbeda.",
      image: "/images/projects/english-game.jpg",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      liveUrl: "https://english-game.vercel.app",
      githubUrl: "https://github.com/aanjardev/english-game",
      type: "side",
    },
    {
      id: 5,
      title: "Typing Speed Test",
      category: "Side Project",
      description:
        "Uji kecepatan mengetik dengan kutipan random, statistik WPM, dan riwayat percobaan.",
      image: "/images/projects/typing-test.jpg",
      tech: ["React", "TailwindCSS", "LocalStorage"],
      liveUrl: "https://typing-test.vercel.app",
      githubUrl: "https://github.com/aanjardev/typing-test",
      type: "side",
    },
    {
      id: 6,
      title: "Daily Quote Generator",
      category: "Side Project",
      description:
        "Generator kutipan inspiratif harian dengan fitur copy & share ke media sosial.",
      image: "/images/projects/quote-generator.jpg",
      tech: ["Next.js", "TailwindCSS", "API"],
      liveUrl: "https://quote-generator.vercel.app",
      githubUrl: "https://github.com/aanjardev/quote-generator",
      type: "side",
    },
  ],
};

export default function PortfolioPreview() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[#1E3A5F]/[0.01] pointer-events-none" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold mb-4">
            <Layers className="w-4 h-4" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projects I've Built
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From professional client work to experimental fun tools — each
            project is built with care and purpose.
          </p>
        </div>

        {/* FREELANCE PROJECTS SECTION */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-[#1E3A5F]" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Freelance Projects
                </h3>
              </div>
              <p className="text-gray-500 text-sm ml-7">
                Real client work with measurable results
              </p>
            </div>
            <div className="w-12 h-0.5 bg-[#1E3A5F]/20 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.freelance.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* SIDE PROJECTS SECTION */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Gamepad2 className="w-5 h-5 text-[#1E3A5F]" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Side Projects
                </h3>
              </div>
              <p className="text-gray-500 text-sm ml-7">
                Fun, interactive tools for everyone to try
              </p>
            </div>
            <div className="w-12 h-0.5 bg-[#1E3A5F]/20 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.side.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#152C48] transition-all duration-300 shadow-lg shadow-[#1E3A5F]/20 hover:shadow-xl hover:shadow-[#1E3A5F]/30 hover:-translate-y-0.5"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Sub-component untuk Project Card
function ProjectCard({ project }) {
  const isSideProject = project.type === "side";
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isSideProject
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-[#1E3A5F]/10 text-[#1E3A5F] border border-[#1E3A5F]/20"
          }`}
        >
          {isSideProject ? (
            <Gamepad2 className="w-3 h-3" />
          ) : (
            <Briefcase className="w-3 h-3" />
          )}
          {isSideProject ? "Side Project" : "Freelance"}
        </span>
      </div>

      {/* Image Container with 16:9 Aspect Ratio */}
      <div
        className="relative w-full bg-gray-100 flex-shrink-0"
        style={{ aspectRatio: "16 / 9" }}
      >
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100">
            <Layers className="w-10 h-10 text-gray-300" />
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content - flex-grow untuk tinggi seragam */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Client name (for freelance) */}
        {project.client && (
          <p className="text-xs text-gray-400 mb-1">{project.client}</p>
        )}

        {/* Title */}
        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4 pt-2 mt-auto">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F] hover:gap-2 transition-all"
            >
              Live Demo
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#1E3A5F] transition-all"
            >
              <SiGithub className="w-3.5 h-3.5" />
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
