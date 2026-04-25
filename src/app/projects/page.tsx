"use client";
import { useState, useMemo } from "react";
import {
  Search,
  X,
  Award,
  Briefcase,
  Gamepad2,
  ChevronDown,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projectsData";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "freelance" | "side"
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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>Featured Work</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Explore my complete portfolio of freelance work and side projects.
            Each project is built with care and purpose.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar - Expanded */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects by name or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] focus:bg-white focus:border-transparent outline-none transition-all"
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
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === "all"
                    ? "bg-[#1E3A5F] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType("freelance")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === "freelance"
                    ? "bg-[#1E3A5F] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Client
              </button>
              <button
                onClick={() => setSelectedType("side")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedType === "side"
                    ? "bg-[#1E3A5F] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                For Fun
              </button>

              {/* Stack Filter Toggle Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedStacks.length > 0
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>Stack</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
                {selectedStacks.length > 0 && (
                  <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {selectedStacks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Stack Filter Dropdown */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {allStacks.map((stack) => (
                  <button
                    key={stack}
                    onClick={() => handleStackToggle(stack)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedStacks.includes(stack)
                        ? "bg-[#1E3A5F] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
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
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
