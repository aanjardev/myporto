"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink, ArrowRight, Briefcase, Gamepad2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const isFreelance = project.type === "freelance";

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-100">
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
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </>
        )}

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              isFreelance
                ? "bg-blue-900/80 text-blue-100 border border-blue-700"
                : "bg-emerald-900/80 text-emerald-100 border border-emerald-700"
            }`}
          >
            {isFreelance ? (
              <Briefcase className="w-3 h-3" />
            ) : (
              <Gamepad2 className="w-3 h-3" />
            )}
            {isFreelance ? "Client Project" : "Side Project"}
          </span>
        </div>

        {/* Action Icons - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-[#1E3A5F] hover:bg-white transition-all"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
              title="Source Code"
            >
              <SiGithub className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Client Name */}
        {project.client && (
          <p className="text-xs text-gray-400 mb-1">{project.client}</p>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
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

        {/* View Details Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A5F] hover:gap-2 transition-all"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
