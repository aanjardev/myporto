"use client";
import { useState, useMemo } from "react";
import {
  Search,
  X,
  Award,
  Briefcase,
  Gamepad2,
  Heart,
  ChevronDown,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projectsData";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "freelance" | "side" | "social"
  >("all");
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all unique tech stacks
  const allStacks = useMemo(() => {
    const stacks = new Set<string>();
    projectsData.forEach((project) => {
      project.tech.forEach((tech) => stacks.add(tech));
    });
    return Array.from(stacks).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesType =
        selectedType === "all" || project.type === selectedType;

      const matchesStacks =
        selectedStacks.length === 0 ||
        selectedStacks.some((stack) => project.tech.includes(stack));

      return matchesSearch && matchesType && matchesStacks;
    });
  }, [searchQuery, selectedType, selectedStacks]);

  const handleStackToggle = (stack: string) => {
    setSelectedStacks((prev) =>
      prev.includes(stack) ? prev.filter((s) => s !== stack) : [...prev, stack],
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedStacks([]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedType !== "all" || selectedStacks.length > 0;

  // Helper untuk mendapatkan icon dan label type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "freelance":
        return <Briefcase className="w-3.5 h-3.5" />;
      case "side":
        return <Gamepad2 className="w-3.5 h-3.5" />;
      case "social":
        return <Heart className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "freelance":
        return "Client Project";
      case "side":
        return "Side Project";
      case "social":
        return "Social Impact";
      default:
        return "";
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--canvas-press)" }}>
      {/* Hero Banner */}
      {/* <section
        style={{
          background: "var(--canvas-dark)",
          padding: "72px 24px 80px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 10 }}>
          <span
            className="eyebrow-pill"
            style={{
              background: "var(--on-dark-faint)",
              color: "var(--on-dark-muted)",
              border: "1px solid rgba(255,255,255,0.10)",
              marginBottom: 20,
              display: "inline-flex",
            }}
          >
            <Award style={{ width: 12, height: 12 }} />
            My Portfolio
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(32px, 6vw, 52px)",
              fontWeight: 700,
              color: "var(--on-dark)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            All Projects
          </h1>
          <p className="text-body-lg" style={{ color: "var(--on-dark-muted)", maxWidth: 520, margin: "0 auto" }}>
            Explore my complete portfolio — from professional client work and
            experimental side projects to social impact initiatives.
          </p>
        </div>
      </section> */}

      {/* Search & Filter Section */}
      <section style={{ position: "sticky", top: 64, zIndex: 20, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--hairline-cloud)", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div className="px-6 lg:px-0 py-4" style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects by name or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", padding: "10px 16px 10px 44px", background: "var(--canvas-press)", border: "1px solid var(--hairline-cloud)", borderRadius: "var(--r-md)", fontSize: 14, fontFamily: "var(--font-body)", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Type Filters - Compact Chips */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setSelectedType("all")}
                style={{
                  padding: "6px 16px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: selectedType === "all" ? "var(--canvas-dark)" : "var(--canvas-press)",
                  color: selectedType === "all" ? "#fff" : "#475569",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                All
              </button>
              {(["freelance", "side", "social"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 14px",
                    borderRadius: "var(--r-full)",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: selectedType === type ? "var(--canvas-dark)" : "var(--canvas-press)",
                    color: selectedType === type ? "#fff" : "#475569",
                    transition: "background 0.18s, color 0.18s",
                  }}
                >
                  {getTypeIcon(type)}
                  {type === "freelance" ? "Client" : type === "side" ? "For Fun" : "Social"}
                </button>
              ))}

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 14px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: selectedStacks.length > 0 ? "var(--canvas-dark)" : "var(--canvas-press)",
                  color: selectedStacks.length > 0 ? "#fff" : "#475569",
                }}
              >
                Stack
                <ChevronDown style={{ width: 13, height: 13, transform: isFilterOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                {selectedStacks.length > 0 && (
                  <span style={{ marginLeft: 2, background: "rgba(255,255,255,0.25)", padding: "1px 6px", borderRadius: 999, fontSize: 11 }}>
                    {selectedStacks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--hairline-cloud)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {allStacks.map((stack) => (
                  <button
                    key={stack}
                    onClick={() => handleStackToggle(stack)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "var(--r-xs)",
                      fontSize: 12,
                      fontWeight: 600,
                      border: "1px solid var(--hairline-cloud)",
                      cursor: "pointer",
                      background: selectedStacks.includes(stack) ? "var(--canvas-dark)" : "var(--canvas-light)",
                      color: selectedStacks.includes(stack) ? "#fff" : "#475569",
                    }}
                  >
                    {stack}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="px-6 lg:px-0" style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <p className="text-gray-500 text-sm">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {projectsData.length}
              </span>{" "}
              projects
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#1E3A5F] hover:text-[#152C48] font-medium inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearAllFilters}
                className="text-[#1E3A5F] hover:text-[#152C48] font-semibold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
