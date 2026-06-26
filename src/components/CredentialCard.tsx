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
    case "certification": return <Award style={{ width: 11, height: 11 }} />;
    case "award":         return <Trophy style={{ width: 11, height: 11 }} />;
    case "achievement":   return <Target style={{ width: 11, height: 11 }} />;
    case "competition":   return <Trophy style={{ width: 11, height: 11 }} />;
    case "course":        return <BookOpen style={{ width: 11, height: 11 }} />;
    case "license":       return <FileText style={{ width: 11, height: 11 }} />;
    default:              return <Award style={{ width: 11, height: 11 }} />;
  }
};

const getTypeColor = (type: Credential["type"]): { bg: string; text: string; border: string } => {
  switch (type) {
    case "certification": return { bg: "rgba(12,31,63,0.85)",   text: "#fff",    border: "rgba(255,255,255,0.15)" };
    case "award":         return { bg: "rgba(120,70,0,0.85)",   text: "#fde68a", border: "rgba(253,230,138,0.25)" };
    case "achievement":   return { bg: "rgba(6,78,59,0.85)",    text: "#6ee7b7", border: "rgba(110,231,183,0.25)" };
    case "competition":   return { bg: "rgba(59,7,100,0.85)",   text: "#e9d5ff", border: "rgba(233,213,255,0.25)" };
    case "course":        return { bg: "rgba(29,31,97,0.85)",   text: "#c7d2fe", border: "rgba(199,210,254,0.25)" };
    case "license":       return { bg: "rgba(8,23,46,0.85)",    text: "#94d4ff", border: "rgba(148,212,255,0.2)"  };
    default:              return { bg: "rgba(12,31,63,0.85)",   text: "#fff",    border: "rgba(255,255,255,0.15)" };
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

  const typeColor = getTypeColor(credential.type);
  const typeLabel = credential.type.charAt(0).toUpperCase() + credential.type.slice(1);

  return (
    <div
      onClick={() => router.push(`/credentials/${credential.slug}`)}
      className="card-light"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        height: "100%",
      }}
    >
      {/* Image Container — A4 Landscape Ratio (7:5) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "7 / 5",
          background: "var(--canvas-press)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {imageError ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--canvas-press)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "var(--hairline-cloud)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Award style={{ width: 20, height: 20, color: "#94a3b8" }} />
            </div>
            <span style={{ color: "#94a3b8", fontSize: 12 }}>Certificate Image</span>
          </div>
        ) : (
          <>
            <Image
              src={credential.image}
              alt={credential.title}
              fill
              className="object-contain"
              style={{
                background: "white",
                padding: 8,
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Subtle frame effect */}
            <div
              style={{
                position: "absolute",
                inset: 4,
                pointerEvents: "none",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--hairline-cloud)",
              }}
            />
          </>
        )}

        {/* Type Badge */}
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 10 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: "var(--r-xs)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              background: typeColor.bg,
              color: typeColor.text,
              border: `1px solid ${typeColor.border}`,
              backdropFilter: "blur(4px)",
            }}
          >
            {getTypeIcon(credential.type)}
            {typeLabel}
          </span>
        </div>

        {/* Expiry Status Badge */}
        {credential.expiryDate && (
          <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: "var(--r-xs)",
                fontSize: 11,
                fontWeight: 600,
                backdropFilter: "blur(4px)",
                background: isExpired ? "rgba(127,29,29,0.85)" : "rgba(6,78,59,0.85)",
                color: isExpired ? "#fca5a5" : "#6ee7b7",
                border: isExpired ? "1px solid rgba(252,165,165,0.25)" : "1px solid rgba(110,231,183,0.25)",
              }}
            >
              {isExpired ? "Expired" : "Active"}
            </span>
          </div>
        )}

        {/* External Link Button — top right if no expiry */}
        {credential.credentialUrl && !credential.expiryDate && (
          <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}>
            <a
              href={credential.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Verify Credential"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 32,
                height: 32,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                borderRadius: "var(--r-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--canvas-dark)",
                transition: "background 0.2s",
              }}
            >
              <ExternalLink style={{ width: 14, height: 14 }} />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Issuer */}
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>{credential.issuer}</p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
            fontSize: 17,
            fontWeight: 600,
            color: "var(--ink)",
            margin: "0 0 8px",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {credential.title}
        </h3>

        {/* Date */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>
          <Calendar style={{ width: 13, height: 13 }} />
          <span>{formatDate(credential.date)}</span>
          {credential.expiryDate && (
            <>
              <span style={{ margin: "0 2px" }}>→</span>
              <span style={{ color: isExpired ? "#f87171" : undefined }}>
                {formatDate(credential.expiryDate)}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            color: "#64748b",
            fontSize: 14,
            lineHeight: 1.65,
            marginBottom: 14,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          {credential.description}
        </p>

        {/* Skills Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {credential.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              style={{
                padding: "3px 10px",
                borderRadius: "var(--r-xs)",
                background: "var(--canvas-press)",
                color: "var(--canvas-dark)",
                fontSize: 11,
                fontWeight: 600,
                border: "1px solid var(--hairline-cloud)",
              }}
            >
              {skill}
            </span>
          ))}
          {credential.skills.length > 3 && (
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "var(--r-xs)",
                background: "var(--canvas-press)",
                color: "#94a3b8",
                fontSize: 11,
                border: "1px solid var(--hairline-cloud)",
              }}
            >
              +{credential.skills.length - 3}
            </span>
          )}
        </div>

        {/* View Details */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase" as const,
            color: "var(--canvas-dark)",
          }}
        >
          View Details
          <ArrowRight style={{ width: 14, height: 14 }} />
        </div>
      </div>
    </div>
  );
}
