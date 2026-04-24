"use client";
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiLaravel,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiSupabase,
  SiVercel,
} from "react-icons/si";

// Data skills - tanpa persentase, pakai pengalaman nyata
const skillCategories = [
  {
    name: "Frontend Development",
    icon: <Layout className="w-5 h-5" />,
    skills: [
      {
        name: "Next.js",
        icon: <SiNextdotjs className="w-6 h-6" />,
        experience: "2+ years",
        projects: "5+ projects",
      },
      {
        name: "React",
        icon: <SiReact className="w-6 h-6" />,
        experience: "2+ years",
        projects: "4+ projects",
      },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss className="w-6 h-6" />,
        experience: "2+ years",
        projects: "8+ projects",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="w-6 h-6" />,
        experience: "1+ years",
        projects: "3+ projects",
      },
    ],
  },
  {
    name: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    skills: [
      {
        name: "Laravel",
        icon: <SiLaravel className="w-6 h-6" />,
        experience: "1+ years",
        projects: "3+ projects",
      },
      {
        name: "Node.js",
        icon: <SiNodedotjs className="w-6 h-6" />,
        experience: "1+ years",
        projects: "2+ projects",
      },
      {
        name: "Prisma",
        icon: <SiPrisma className="w-6 h-6" />,
        experience: "1+ years",
        projects: "2+ projects",
      },
    ],
  },
  {
    name: "Database & Cloud",
    icon: <Database className="w-5 h-5" />,
    skills: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql className="w-6 h-6" />,
        experience: "1+ years",
        projects: "3+ projects",
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="w-6 h-6" />,
        experience: "1+ years",
        projects: "2+ projects",
      },
      {
        name: "Supabase",
        icon: <SiSupabase className="w-6 h-6" />,
        experience: "1+ years",
        projects: "4+ projects",
      },
    ],
  },
  {
    name: "Tools & DevOps",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      {
        name: "Git/GitHub",
        icon: <SiGithub className="w-6 h-6" />,
        experience: "2+ years",
        projects: "10+ projects",
      },
      {
        name: "Figma",
        icon: <SiFigma className="w-6 h-6" />,
        experience: "1+ years",
        projects: "5+ projects",
      },
      {
        name: "Docker",
        icon: <SiDocker className="w-6 h-6" />,
        experience: "< 1 year",
        projects: "1+ projects",
      },
      {
        name: "Vercel",
        icon: <SiVercel className="w-6 h-6" />,
        experience: "2+ years",
        projects: "8+ projects",
      },
    ],
  },
];

// Technology logos for marquee section (smooth looping)
const techLogos = [
  { name: "Next.js", icon: <SiNextdotjs className="w-8 h-8 md:w-10 md:h-10" /> },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="w-8 h-8 md:w-10 md:h-10" />,
  },
  { name: "Laravel", icon: <SiLaravel className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "React", icon: <SiReact className="w-8 h-8 md:w-10 md:h-10" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript className="w-8 h-8 md:w-10 md:h-10" />,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="w-8 h-8 md:w-10 md:h-10" />,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="w-8 h-8 md:w-10 md:h-10" />,
  },
  { name: "MongoDB", icon: <SiMongodb className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Git", icon: <SiGit className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Figma", icon: <SiFigma className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Docker", icon: <SiDocker className="w-8 h-8 md:w-10 md:h-10" /> },
  {
    name: "Supabase",
    icon: <SiSupabase className="w-8 h-8 md:w-10 md:h-10" />,
  },
];

export default function SkillsTools() {
  return (
    <section className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[#1E3A5F]/[0.01] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-sm font-semibold mb-4">
            <Code2 className="w-4 h-4" />
            <span>Tech Stack & Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Tools and technologies I work with daily to build modern, scalable
            web applications.
          </p>
        </div>

        {/* MARQUEE - Smooth Infinite Looping Logos */}
        <div className="mb-16">
          <div className="relative overflow-hidden py-6">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...techLogos, ...techLogos, ...techLogos].map((tech, idx) => (
                  <div
                    key={idx}
                    className="inline-flex flex-col items-center gap-2 mx-4 md:mx-6 group"
                  >
                    <div className="text-gray-400 group-hover:text-[#1E3A5F] transition-colors duration-300">
                      {tech.icon}
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid - Tanpa Persentase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, idx) => (
            <div
              key={category.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                <div className="p-2 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F]">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category.name}
                </h3>
              </div>

              {/* Skills List - Tanpa Progress Bar, Pakai Experience & Projects */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 group-hover:text-[#1E3A5F] transition-colors">
                        {skill.icon}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {skill.experience}
                          </span>
                          <span className="text-xs text-gray-400">
                            {skill.projects}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools Cloud */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              RESTful APIs
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              JWT Authentication
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              WebSocket
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              SEO Optimization
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              Responsive Design
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              Performance Optimization
            </span>
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              Unit Testing
            </span>
          </div>
        </div>
      </div>

      {/* CSS for Smooth Infinite Marquee */}
      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .marquee-track {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </section>
  );
}
