"use client";
import { Briefcase, BookOpen, Camera, Code, DollarSign } from "lucide-react";
import { experiences } from "./workExperienceData";

const iconFor = (idx: number) => {
  switch (idx) {
    case 0:
      return <Briefcase className="w-5 h-5" />;
    case 1:
      return <BookOpen className="w-5 h-5" />;
    case 2:
      return <DollarSign className="w-5 h-5" />;
    case 3:
      return <Camera className="w-5 h-5" />;
    default:
      return <Code className="w-5 h-5" />;
  }
};

export default function WorkExperience() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* vertical line */}
          <div className="hidden md:block absolute left-5 top-0 bottom-0 w-px bg-gray-200" />

          <ul className="space-y-10">
            {experiences.map((ex, idx) => (
              <li key={ex.title} className="relative md:pl-12">
                <div className="absolute -left-1.5 md:left-[-10px] top-1">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm text-[#1E3A5F]">
                    {iconFor(idx)}
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {ex.title}
                      </h3>
                      <p className="text-sm text-gray-500">{ex.company}</p>
                    </div>
                    <div className="text-sm text-gray-400 whitespace-nowrap">
                      {ex.period}
                    </div>
                  </div>

                  <p className="mt-3 text-gray-600 text-sm">{ex.description}</p>

                  {ex.tech && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ex.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
