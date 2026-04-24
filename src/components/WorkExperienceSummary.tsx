"use client";
import Link from "next/link";
import { experiences } from "./workExperienceData";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function WorkExperienceSummary() {
  const summary = experiences.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-gray-100" id="work">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold mb-4">
            <Briefcase className="w-4 h-4" />
            My Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            3+ years of professional experience across freelance, tutoring, and
            internships. Building real solutions for real people.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {summary.map((ex, index) => (
            <div
              key={ex.title}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E3A5F] rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Period Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-4">
                <Calendar className="w-3 h-3" />
                {ex.period}
              </div>

              {/* Title & Company */}
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#1E3A5F] transition-colors">
                {ex.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {ex.company}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {ex.description}
              </p>

              {/* Tech Stack */}
              {ex.tech && ex.tech.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {ex.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium"
                      >
                        {t}
                      </span>
                    ))}
                    {ex.tech.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                        +{ex.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Optional: Achievement highlight */}
              {ex.highlight && (
                <div className="mb-4 p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <p className="text-xs text-emerald-700 font-medium">
                    ✨ {ex.highlight}
                  </p>
                </div>
              )}

              {/* View Details Link */}
              <Link
                href={`/work/${ex.slug || ex.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A5F] hover:gap-2 transition-all mt-2"
              >
                View Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#152C48] transition-all duration-300 shadow-lg shadow-[#1E3A5F]/20 hover:shadow-xl hover:shadow-[#1E3A5F]/30 hover:-translate-y-0.5"
          >
            View Full Work History
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
