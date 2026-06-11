"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";
import { credentialsData } from "@/data/credentialsData";
import { Credential } from "@/types/credential";

interface CredentialCardProps {
  credential: Credential;
  onHoverChange: (isHovered: boolean) => void;
}

function CredentialCard({ credential, onHoverChange }: CredentialCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isCertification = credential.type === "certification";
  const year = new Date(credential.date).getFullYear().toString();

  const handleMouseEnter = () => { setIsHovered(true); onHoverChange(true); };
  const handleMouseLeave = () => { setIsHovered(false); onHoverChange(false); };

  return (
    <Link
      href={`/credentials/${credential.slug}`}
      style={{
        flexShrink: 0,
        width: 288,
        borderRadius: "var(--r-xl)",
        overflow: "hidden",
        background: "var(--canvas-light)",
        border: "1px solid var(--hairline-cloud)",
        // boxShadow: isHovered ? "var(--shadow-2)" : "var(--shadow-1)",
        // transform: isHovered ? "translateY(-4px)" : "none",
        // transition: "box-shadow 0.3s, transform 0.3s",
        display: "block",
        textDecoration: "none",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "var(--canvas-press)" }}>
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
            }}
          >
            <Award style={{ width: 36, height: 36, color: "var(--hairline-cool)" }} />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>No image</span>
          </div>
        ) : (
          <Image
            src={credential.image}
            alt={credential.title}
            fill
            className="object-cover"
            // style={{ transform: isHovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }}
            onError={() => setImageError(true)}
            sizes="288px"
          />
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--canvas-dark)",
            opacity: isHovered ? 0.90 : 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 10px",
              borderRadius: "var(--r-xs)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              background: isCertification ? "rgba(74,222,128,0.2)" : "rgba(250,204,21,0.2)",
              color: isCertification ? "#4ade80" : "#facc15",
              border: `1px solid ${isCertification ? "rgba(74,222,128,0.3)" : "rgba(250,204,21,0.3)"}`,
              marginBottom: 12,
            }}
          >
            {isCertification ? "Certification" : "Achievement"}
          </span>
          <h4
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--on-dark)",
              marginBottom: 8,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
            }}
          >
            {credential.title}
          </h4>
          <p style={{ fontSize: 13, color: "var(--on-dark-muted)", marginBottom: 16 }}>
            {credential.issuer} · {year}
          </p>
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 28,
              height: 28,
              borderRadius: "10%",
              background: "var(--canvas-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExternalLink style={{ width: 16, height: 16, color: "var(--canvas-dark)" }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CredentialsSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  const sliderCredentials = credentialsData.slice(0, 11);
  const CARD_WIDTH = 312;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = setInterval(() => {
      if (!isCardHovered && scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const originalWidth = scrollWidth / 2;
        if (scrollLeft + clientWidth >= scrollWidth - 100) {
          el.style.scrollBehavior = "auto";
          el.scrollLeft = scrollLeft - originalWidth;
          el.style.scrollBehavior = "smooth";
        } else {
          el.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
        }
      }
    }, 1800);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) { clearInterval(autoSlideInterval.current); autoSlideInterval.current = null; }
  };

  useEffect(() => { startAutoSlide(); return () => stopAutoSlide(); }, []);
  useEffect(() => { if (!isCardHovered) startAutoSlide(); else stopAutoSlide(); }, [isCardHovered]);

  return (
    <section
      style={{
        padding: "96px 24px",
        background: "var(--canvas-light)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--hairline-cloud)",
        }}
      />

      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <span
            className="eyebrow-pill"
            style={{
              background: "rgba(12,31,63,0.07)",
              color: "var(--canvas-dark)",
              marginBottom: 5,
              display: "inline-flex",
            }}
          >
            <Award style={{ width: 12, height: 12 }} />
            Credentials
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              color: "var(--ink)",
              margin: "0 0 8px",
            }}
          >
            - Certifications & Awards -
          </h2>
          {/* <p
            style={{
              color: "#64748b",
              maxWidth: 480,
              margin: "16px auto 0",
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            Professional certifications, awards, and competition achievements
            that validate my skills and dedication.
          </p> */}
        </div>

        {/* Slider */}
        <div style={{ position: "relative" }}>
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            id="cred-scroll-left"
            aria-label="Scroll left"
            style={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--canvas-light)",
              border: "1px solid var(--hairline-cloud)",
              boxShadow: "var(--shadow-1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--canvas-dark)",
              opacity: showLeftArrow ? 1 : 0,
              visibility: showLeftArrow ? "visible" : "hidden",
              transition: "opacity 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--canvas-dark)"; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "var(--canvas-dark)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--canvas-light)"; (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--hairline-cloud)"; }}
          >
            <ChevronLeft style={{ width: 18, height: 18 }} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            id="cred-scroll-right"
            aria-label="Scroll right"
            style={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--canvas-light)",
              border: "1px solid var(--hairline-cloud)",
              boxShadow: "var(--shadow-1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--canvas-dark)",
              opacity: showRightArrow ? 1 : 0,
              visibility: showRightArrow ? "visible" : "hidden",
              transition: "opacity 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--canvas-dark)"; (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "var(--canvas-dark)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--canvas-light)"; (e.currentTarget as HTMLElement).style.color = "var(--canvas-dark)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--hairline-cloud)"; }}
          >
            <ChevronRight style={{ width: 18, height: 18 }} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: 20,
              overflowX: "auto",
              paddingBottom: 4,
              scrollBehavior: "smooth",
            }}
          >
            {[...sliderCredentials, ...sliderCredentials].map((cred, idx) => (
              <CredentialCard
                key={`${cred.id}-${idx}`}
                credential={cred}
                onHoverChange={setIsCardHovered}
              />
            ))}
          </div>
        </div>

        {/* View All */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/credentials"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              color: "var(--canvas-dark)",
              textDecoration: "none",
              borderBottom: "2px solid var(--canvas-dark)",
              paddingBottom: 2,
              transition: "gap 0.2s",
            }}
          >
            View All Certifications & Achievements
            <ExternalLink style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
