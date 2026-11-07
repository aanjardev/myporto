"use client";
import Link from "next/link";
import { PortfolioImage, credentialTypeLabel } from "./PortfolioUI";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";
import { Credential } from "@/types/credential";

export default function CredentialsSlider({
  credentials,
}: {
  credentials: Credential[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);

  const sliderCredentials = credentials.slice(0, 11);
  const CARD_WIDTH = 312;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    };
    const start = () => {
      stop();
      if (isCardHovered || preference.matches) return;
      autoSlideInterval.current = setInterval(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        if (scrollLeft + clientWidth >= scrollWidth - 100) {
          el.scrollTo({
            left: scrollLeft - scrollWidth / 2,
            behavior: "instant",
          });
        } else el.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
      }, 1800);
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      stop();
      preference.removeEventListener("change", start);
    };
  }, [isCardHovered]);

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
            className="interaction-icon interaction-prev"
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
          >
            <ChevronLeft style={{ width: 18, height: 18 }} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            id="cred-scroll-right"
            className="interaction-icon interaction-next"
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
              <div
                key={`${cred.id}-${idx}`}
                className="home-credential-slide"
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                onFocus={() => setIsCardHovered(true)}
                onBlur={() => setIsCardHovered(false)}
              >
                <Link href={`/credentials/${cred.slug}`} className="home-credential-preview" aria-label={`View credential: ${cred.title}`}>
                  <PortfolioImage src={cred.image} alt={cred.title} />
                  <div className="home-credential-overlay">
                    <span className="home-credential-type">{credentialTypeLabel(cred.type)}</span>
                    <h3>{cred.title}</h3>
                    <p>{cred.issuer} &middot; {new Date(cred.date).getUTCFullYear()}</p>
                    <span className="home-credential-action">View credential <ExternalLink size={14} aria-hidden="true" /></span>
                  </div>
                </Link>
              </div>
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
            className="interaction-link"
          >
            View All Certifications & Achievements
            <ExternalLink style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
