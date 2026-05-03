"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import {
  ArrowRight,
  ExternalLink,
  Briefcase,
  Gamepad2,
  Heart,
  Layers,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectsData } from "@/data/projectsData";
import type { Project } from "@/types/project";

// Interface untuk ProjectCard Props
interface ProjectCardProps {
  project: Project;
}

export default function PortfolioPreview() {
  // Ambil 3 project teratas (sudah diurutkan berdasarkan prioritas di projectsData)
  const featuredProjects = projectsData.slice(0, 3);

  // Helper untuk mendapatkan icon berdasarkan type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "freelance":
        return <Briefcase className="w-3 h-3" />;
      case "side":
        return <Gamepad2 className="w-3 h-3" />;
      case "social":
        return <Heart className="w-3 h-3" />;
      default:
        return <Briefcase className="w-3 h-3" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "freelance":
        return "Freelance";
      case "side":
        return "Side Project";
      case "social":
        return "Social Impact";
      default:
        return "Project";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "freelance":
        return "bg-blue-900/80 text-blue-100 border border-blue-700";
      case "side":
        return "bg-emerald-900/80 text-emerald-100 border border-emerald-700";
      case "social":
        return "bg-purple-900/80 text-purple-100 border border-purple-700";
      default:
        return "bg-gray-900/80 text-gray-100 border border-gray-700";
    }
  };

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
            Featured Work
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A selection of projects from freelance, side experiments, and social
            initiatives.
          </p>
        </div>

        {/* Featured Projects Grid - 3 teratas campur */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
              getTypeColor={getTypeColor}
            />
          ))}
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
function ProjectCard({
  project,
  getTypeIcon,
  getTypeLabel,
  getTypeColor,
}: {
  project: Project;
  getTypeIcon: (type: string) => React.ReactNode;
  getTypeLabel: (type: string) => string;
  getTypeColor: (type: string) => string;
}) {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    window.location.href = `/projects/${project.slug}`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col cursor-pointer"
    >
      {/* Image Container - 16:9 */}
      <div
        className="relative w-full bg-gray-100 overflow-hidden"
        style={{ aspectRatio: "16 / 9" }}
      >
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-400">📷</span>
            </div>
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </>
        )}

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getTypeColor(project.type)}`}
          >
            {getTypeIcon(project.type)}
            {getTypeLabel(project.type)}
          </span>
        </div>

        {/* Action Icons - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-[#1E3A5F] hover:bg-white transition-all z-10 relative"
              title="Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-all z-10 relative"
              title="Source Code"
              onClick={(e) => e.stopPropagation()}
            >
              <SiGithub className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Client Name (for freelance) */}
        {project.client && (
          <p className="text-xs text-gray-400 mb-1">{project.client}</p>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs rounded-md">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* View Details Indicator */}
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F] group-hover:gap-2 transition-all cursor-pointer">
          View Details
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
