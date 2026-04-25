"use client";
import {
  Briefcase,
  BookOpen,
  Code,
  DollarSign,
  GraduationCap,
  Calendar,
  MapPin,
} from "lucide-react";
import { experiences } from "./workExperienceData";

const getIcon = (index: number) => {
  const icons = [
    <Briefcase key="briefcase" className="w-5 h-5" />,
    <BookOpen key="book" className="w-5 h-5" />,
    <DollarSign key="dollar" className="w-5 h-5" />,
    <GraduationCap key="grad" className="w-5 h-5" />,
    <Code key="code" className="w-5 h-5" />,
  ];
  return icons[index % icons.length];
};

const getIconColor = (index: number) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
    "bg-purple-100 text-purple-600",
    "bg-rose-100 text-rose-600",
  ];
  return colors[index % colors.length];
};

export default function WorkExperience() {
  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="hidden md:block absolute left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-[#1E3A5F]/20 via-[#1E3A5F]/40 to-[#1E3A5F]/20" />

      <div className="space-y-8 md:space-y-0 relative">
        {experiences.map((exp, index) => (
          <div key={exp.title} className="relative md:pb-12 last:pb-0">
            {/* Timeline Dot with Icon */}
            <div className="absolute left-0 top-0 md:left-[7px] z-10">
              <div
                className={`flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full shadow-md ${getIconColor(index)} border-4 border-white`}
              >
                {getIcon(index)}
              </div>
            </div>

            {/* Content Card */}
            <div className="ml-16 md:ml-16 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
              <div className="relative">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-1 h-full bg-[#1E3A5F] rounded-l-2xl group-hover:w-2 transition-all duration-300" />

                <div className="p-6 md:p-7">
                  {/* Title & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#1E3A5F] transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <p className="text-sm text-gray-500">{exp.company}</p>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tech Stack */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
