"use client";
import { useState, useMemo } from "react";
import {
  Search,
  X,
  ChevronDown,
  Award,
  Trophy,
  BookOpen,
  Target,
} from "lucide-react";
import CredentialCard from "@/components/CredentialCard";
import { credentialsData } from "@/data/credentialsData";
import { Credential } from "@/types/credential";

export default function CredentialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | Credential["type"]>(
    "all",
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all unique skills
  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    credentialsData.forEach((credential) => {
      credential.skills.forEach((skill) => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);

  // Filter credentials
  const filteredCredentials = useMemo(() => {
    return credentialsData.filter((credential) => {
      const matchesSearch =
        searchQuery === "" ||
        credential.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        credential.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        credential.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesType =
        selectedType === "all" || credential.type === selectedType;

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => credential.skills.includes(skill));

      return matchesSearch && matchesType && matchesSkills;
    });
  }, [searchQuery, selectedType, selectedSkills]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedSkills([]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedType !== "all" || selectedSkills.length > 0;

  // Type filter pills
  const typePills = [
    { value: "all", label: "All", icon: null },
    { value: "certification", label: "Certifications", icon: Award },
    { value: "award", label: "Awards", icon: Trophy },
    { value: "achievement", label: "Achievements", icon: Target },
    { value: "competition", label: "Competitions", icon: Trophy },
    { value: "course", label: "Courses", icon: BookOpen },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>My Journey</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Credentials & Achievements
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Professional certifications, awards, and achievements that validate
            my skills and dedication to continuous learning.
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, issuer, or skill..."
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

            {/* Type Filters - Compact Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              {typePills.map((pill) => {
                const Icon = pill.icon;
                const isActive = selectedType === pill.value;
                return (
                  <button
                    key={pill.value}
                    onClick={() =>
                      setSelectedType(pill.value as "all" | Credential["type"])
                    }
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#1E3A5F] text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {pill.label}
                  </button>
                );
              })}

              {/* Skills Filter Toggle Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSkills.length > 0
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>Skills</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
                {selectedSkills.length > 0 && (
                  <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                    {selectedSkills.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Skills Filter Dropdown */}
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? "bg-[#1E3A5F] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {skill}
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
                {filteredCredentials.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {credentialsData.length}
              </span>{" "}
              credentials
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

          {/* Credentials Grid */}
          {filteredCredentials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCredentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No credentials found
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
