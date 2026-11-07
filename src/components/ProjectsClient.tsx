"use client";
import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { matchesTechFilter } from "@/lib/tech-filter";
import { Search, X, ChevronDown } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/project";

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({
  initialProjects,
}: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "freelance" | "side" | "social"
  >("all");
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedStacks = useMemo(
    () => params.getAll("stack").filter(Boolean),
    [params],
  );
  const setSelectedStacks = (stacks: string[]) => {
    const next = new URLSearchParams(params.toString());
    next.delete("stack");
    stacks.forEach((stack) => next.append("stack", stack));
    router.replace(`${pathname}${next.size ? `?${next}` : ""}`, {
      scroll: false,
    });
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all unique tech stacks
  const allStacks = useMemo(() => {
    const stacks = new Set<string>();
    initialProjects.forEach((project) => {
      project.tech.forEach((tech) => stacks.add(tech));
    });
    return Array.from(stacks).sort();
  }, [initialProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
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
        selectedStacks.some((stack) =>
          project.tech.some((tech) => matchesTechFilter(tech, stack)),
        );

      return matchesSearch && matchesType && matchesStacks;
    });
  }, [searchQuery, selectedType, selectedStacks, initialProjects]);

  const handleStackToggle = (stack: string) => {
    setSelectedStacks(
      selectedStacks.includes(stack)
        ? selectedStacks.filter((item) => item !== stack)
        : [...selectedStacks, stack],
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedStacks([]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedType !== "all" || selectedStacks.length > 0;

  return (
    <main
      className="portfolio-list"
      style={{ minHeight: "100vh", background: "var(--canvas-press)" }}
    >
      {/* Search & Filter Section */}
      <section
        style={{
          position: "sticky",
          top: 64,
          zIndex: 20,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--hairline-cloud)",
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="px-6 lg:px-0 py-4"
          style={{ maxWidth: 1152, margin: "0 auto" }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                aria-label="Search projects"
                type="text"
                placeholder="Search projects by name or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 16px 10px 44px",
                  background: "var(--canvas-press)",
                  border: "1px solid var(--hairline-cloud)",
                  borderRadius: "var(--r-md)",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
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

            {/* Type Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                aria-pressed={selectedType === "all"}
                onClick={() => setSelectedType("all")}
                style={{
                  padding: "6px 16px",
                  borderRadius: "var(--r-full)",
                  fontSize: 13,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background:
                    selectedType === "all"
                      ? "var(--canvas-dark)"
                      : "var(--canvas-press)",
                  color: selectedType === "all" ? "#fff" : "#475569",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                All
              </button>
              {(["freelance", "side", "social"] as const).map((type) => (
                <button
                  key={type}
                  aria-pressed={selectedType === type}
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
                    background:
                      selectedType === type
                        ? "var(--canvas-dark)"
                        : "var(--canvas-press)",
                    color: selectedType === type ? "#fff" : "#475569",
                    transition: "background 0.18s, color 0.18s",
                  }}
                >
                  {type === "freelance"
                    ? "Client"
                    : type === "side"
                      ? "For Fun"
                      : "Social"}
                </button>
              ))}

              <button
                className="portfolio-filter-toggle"
                aria-expanded={isFilterOpen}
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
                  background:
                    selectedStacks.length > 0
                      ? "var(--canvas-dark)"
                      : "var(--canvas-press)",
                  color: selectedStacks.length > 0 ? "#fff" : "#475569",
                }}
              >
                Stack
                <ChevronDown
                  style={{
                    width: 13,
                    height: 13,
                    transform: isFilterOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                />
                {selectedStacks.length > 0 && (
                  <span
                    style={{
                      marginLeft: 2,
                      background: "rgba(255,255,255,0.25)",
                      padding: "1px 6px",
                      borderRadius: 999,
                      fontSize: 11,
                    }}
                  >
                    {selectedStacks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <div
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTop: "1px solid var(--hairline-cloud)",
              }}
            >
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
                      background: selectedStacks.includes(stack)
                        ? "var(--canvas-dark)"
                        : "var(--canvas-light)",
                      color: selectedStacks.includes(stack)
                        ? "#fff"
                        : "#475569",
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
      <section style={{ padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          {hasActiveFilters && (
            <div className="active-filter-bar" aria-label="Active filters">
              <span className="active-filter-label">Filtered by</span>
              <div className="active-filter-chips">
                {searchQuery && <button className="active-filter-chip" onClick={() => setSearchQuery("")} aria-label="Remove search filter"><span>Search: {searchQuery}</span><X size={12} aria-hidden="true" /></button>}
                {selectedType !== "all" && <button className="active-filter-chip" onClick={() => setSelectedType("all")} aria-label="Remove project type filter"><span>{selectedType === "freelance" ? "Client" : selectedType === "side" ? "For Fun" : "Social"}</span><X size={12} aria-hidden="true" /></button>}
                {selectedStacks.map(stack => <button key={stack} className="active-filter-chip" onClick={() => handleStackToggle(stack)} aria-label={`Remove ${stack} filter`}><span>{stack}</span><X size={12} aria-hidden="true" /></button>)}
              </div>
              <button className="active-filter-clear" onClick={clearAllFilters} aria-label="Clear all filters">Clear all</button>
            </div>
          )}

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
