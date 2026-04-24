"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, ExternalLink } from "lucide-react";

// Data dummy untuk credentials (sertifikat & achievement)
const credentialsData = [
  {
    id: 1,
    title: "Microsoft Certified: Data Analyst Associate",
    issuer: "Microsoft",
    year: "2024",
    type: "certification",
    slug: "microsoft-data-analyst",
    image: "/images/credentials/microsoft-data-analyst.jpg",
    description:
      "Validated skills in data analysis, visualization, and business intelligence using Microsoft Power BI.",
  },
  {
    id: 2,
    title: "English Proficiency Certificate",
    issuer: "University Language Center",
    year: "2023",
    type: "certification",
    slug: "english-proficiency",
    image: "/images/credentials/english-certificate.jpg",
    description:
      "TOEFL equivalent score of 550. Demonstrates professional working proficiency in English.",
  },
  {
    id: 3,
    title: "Web Development Competition",
    issuer: "National Informatics Competition",
    year: "2024",
    type: "achievement",
    slug: "web-dev-competition",
    image: "/images/credentials/web-comp-award.jpg",
    description:
      "2nd Place Winner. Built a waste management platform with integrated maps and real-time reporting.",
  },
  {
    id: 4,
    title: "Hackathon Finalist",
    issuer: "TechFest 2024",
    year: "2024",
    type: "achievement",
    slug: "hackathon-finalist",
    image: "/images/credentials/hackathon.jpg",
    description:
      "Top 10 finalist among 200+ teams. Developed an AI-powered learning assistant.",
  },
  {
    id: 5,
    title: "Next.js & TailwindCSS Course",
    issuer: "BuildWith Angga",
    year: "2023",
    type: "certification",
    slug: "nextjs-tailwind-course",
    image: "/images/credentials/nextjs-course.jpg",
    description:
      "Completed full-stack development course with multiple real-world projects.",
  },
  {
    id: 6,
    title: "Best Graduation Project",
    issuer: "Faculty of Computer Science",
    year: "2024",
    type: "achievement",
    slug: "best-graduation-project",
    image: "/images/credentials/best-project.jpg",
    description:
      "Awarded for innovative e-learning platform with gamification features.",
  },
];

// Interface untuk Credential
interface Credential {
  id: number;
  title: string;
  issuer: string;
  year: string;
  type: string;
  slug: string;
  image: string;
  description: string;
}

// Interface untuk CredentialCard Props
interface CredentialCardProps {
  credential: Credential;
  onHoverChange: (isHovered: boolean) => void;
}

// Card Component
function CredentialCard({ credential, onHoverChange }: CredentialCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const isCertification = credential.type === "certification";

  const handleMouseEnter = () => {
    setIsCardHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsCardHovered(false);
    onHoverChange(false);
  };

  return (
    <Link
      href={`/credentials/${credential.slug}`}
      className="group relative flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full bg-gray-100"
        style={{ aspectRatio: "4 / 3" }}
      >
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100">
            <Award className="w-10 h-10 text-gray-300" />
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        ) : (
          <Image
            src={credential.image}
            alt={credential.title}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isCardHovered ? "scale(1.05)" : "scale(1)" }}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 80vw, 320px"
          />
        )}

        {isCardHovered && (
          <div className="absolute inset-0 bg-[#1E3A5F]/95 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${
                isCertification
                  ? "bg-emerald-500 text-white"
                  : "bg-amber-500 text-white"
              }`}
            >
              {isCertification ? "Certification" : "Achievement"}
            </span>
            <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">
              {credential.title}
            </h4>
            <p className="text-white/80 text-sm mb-4">
              {credential.issuer} • {credential.year}
            </p>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#1E3A5F] rounded-lg text-sm font-semibold hover:gap-2 transition-all">
              View Details
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
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

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 344;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
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

  const startAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);

    autoSlideInterval.current = setInterval(() => {
      if (!isCardHovered && scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const cardWidth = 344;
        const originalWidth = scrollWidth / 2;

        if (scrollLeft + clientWidth >= scrollWidth - 100) {
          el.style.scrollBehavior = "auto";
          el.scrollLeft = scrollLeft - originalWidth;
          el.style.scrollBehavior = "smooth";
        } else {
          el.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 1000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  useEffect(() => {
    if (!isCardHovered) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  }, [isCardHovered]);

  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[#1E3A5F]/[0.01] pointer-events-none" />
      <div className="absolute -top-40 left-40 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-40 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>Credentials & Achievements</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certifications & Awards
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Professional certifications and competition achievements that
            validate my skills and dedication.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg border border-gray-200 text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-all duration-300 -translate-x-1/2 ${
              showLeftArrow ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-lg border border-gray-200 text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white transition-all duration-300 translate-x-1/2 ${
              showRightArrow ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...credentialsData, ...credentialsData].map((cred, idx) => (
              <CredentialCard
                key={`${cred.id}-${idx}`}
                credential={cred}
                onHoverChange={setIsCardHovered}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/credentials"
            className="group inline-flex items-center gap-2 text-[#1E3A5F] font-semibold hover:gap-3 transition-all"
          >
            View All Certifications & Achievements
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
