"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ExternalLink,
  ArrowRight,
  Calendar,
  Award,
  Trophy,
  BookOpen,
  Target,
  FileText,
} from "lucide-react";
import { Credential } from "@/types/credential";

interface CredentialCardProps {
  credential: Credential;
}

const getTypeIcon = (type: Credential["type"]) => {
  switch (type) {
    case "certification":
      return <Award className="w-3.5 h-3.5" />;
    case "award":
      return <Trophy className="w-3.5 h-3.5" />;
    case "achievement":
      return <Target className="w-3.5 h-3.5" />;
    case "competition":
      return <Trophy className="w-3.5 h-3.5" />;
    case "course":
      return <BookOpen className="w-3.5 h-3.5" />;
    case "license":
      return <FileText className="w-3.5 h-3.5" />;
    default:
      return <Award className="w-3.5 h-3.5" />;
  }
};

const getTypeColor = (type: Credential["type"]) => {
  switch (type) {
    case "certification":
      return "bg-blue-900/80 text-blue-100 border border-blue-700";
    case "award":
      return "bg-amber-900/80 text-amber-100 border border-amber-700";
    case "achievement":
      return "bg-emerald-900/80 text-emerald-100 border border-emerald-700";
    case "competition":
      return "bg-purple-900/80 text-purple-100 border border-purple-700";
    case "course":
      return "bg-indigo-900/80 text-indigo-100 border border-indigo-700";
    case "license":
      return "bg-gray-900/80 text-gray-100 border border-gray-700";
    default:
      return "bg-gray-900/80 text-gray-100 border border-gray-700";
  }
};

export default function CredentialCard({ credential }: CredentialCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const isExpired = credential.expiryDate
    ? new Date(credential.expiryDate) < new Date()
    : false;

  const handleCardClick = () => {
    router.push(`/credentials/${credential.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer"
    >
      {/* Image Container - A4 Landscape Ratio (7:5) */}
      <div
        className="relative w-full bg-gray-100 overflow-hidden"
        style={{ aspectRatio: "7 / 5" }}
      >
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-gray-400" />
            </div>
            <span className="text-gray-400 text-sm">Certificate Image</span>
          </div>
        ) : (
          <>
            <Image
              src={credential.image}
              alt={credential.title}
              fill
              className="object-contain bg-white p-2 group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle frame effect like real certificate */}
            <div className="absolute inset-1 pointer-events-none rounded-lg border border-gray-200" />
            <div className="absolute inset-2 pointer-events-none rounded-md border border-gray-100" />
          </>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getTypeColor(credential.type)}`}
          >
            {getTypeIcon(credential.type)}
            {credential.type.charAt(0).toUpperCase() + credential.type.slice(1)}
          </span>
        </div>

        {/* Expiry Status Badge */}
        {credential.expiryDate && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
                isExpired
                  ? "bg-red-900/80 text-red-100 border border-red-700"
                  : "bg-emerald-900/80 text-emerald-100 border border-emerald-700"
              }`}
            >
              {isExpired ? "Expired" : "Active"}
            </span>
          </div>
        )}

        {/* External Link Button - Top Right if no expiry */}
        {credential.credentialUrl && !credential.expiryDate && (
          <div className="absolute top-3 right-3 z-10">
            <a
              href={credential.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg text-gray-600 hover:text-[#1E3A5F] hover:bg-white transition-all"
              title="Verify Credential"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Issuer */}
        <p className="text-xs text-gray-400 mb-1">{credential.issuer}</p>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
          {credential.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatDate(credential.date)}</span>
          {credential.expiryDate && (
            <>
              <span className="mx-1">→</span>
              <span className={isExpired ? "text-red-400" : ""}>
                {formatDate(credential.expiryDate)}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
          {credential.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {credential.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
          {credential.skills.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-xs rounded-md">
              +{credential.skills.length - 3}
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
