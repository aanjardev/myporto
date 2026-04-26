"use client";
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  Cloud,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiLaravel,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiOpenjdk,
  SiCplusplus,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiGooglesheets,
  SiEspressif,
  SiFirebase,
  SiWordpress,
} from "react-icons/si";

// Data skills - berdasarkan project & experience real
const skillCategories = [
  {
    name: "Frontend Development",
    icon: <Layout className="w-5 h-5" />,
    skills: [
      {
        name: "Next.js",
        icon: <SiNextdotjs className="w-5 h-5" />,
        experience: "> 1 years",
        projects: "1+ projects",
      },
      {
        name: "React",
        icon: <SiReact className="w-5 h-5" />,
        experience: "1+ years",
        projects: "3+ projects",
      },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss className="w-5 h-5" />,
        experience: "2+ years",
        projects: "4+ projects",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript className="w-5 h-5" />,
        experience: "1+ years",
        projects: "3+ projects",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="w-5 h-5" />,
        experience: "3+ years",
        projects: "10+ projects",
      },
      // {
      //   name: "HTML/CSS",
      //   icon: <Code2 className="w-5 h-5" />,
      //   experience: "3+ years",
      //   projects: "10+ projects",
      // },
      {
        name: "WordPress",
        icon: <SiWordpress className="w-5 h-5" />,
        experience: "3+ years",
        projects: "7+ projects",
      },
    ],
  },
  {
    name: "Backend Development",
    icon: <Server className="w-5 h-5" />,
    skills: [
      {
        name: "Laravel",
        icon: <SiLaravel className="w-5 h-5" />,
        experience: "3+ years",
        projects: "6+ projects",
      },
      {
        name: "Node.js",
        icon: <SiNodedotjs className="w-5 h-5" />,
        experience: "2+ years",
        projects: "3+ projects",
      },
      {
        name: "PHP",
        icon: <SiPhp className="w-5 h-5" />,
        experience: "3+ years",
        projects: "5+ projects",
      },
      {
        name: "Python",
        icon: <SiPython className="w-5 h-5" />,
        experience: "2+ years",
        projects: "2+ projects",
      },
      {
        name: "Java",
        icon: <SiOpenjdk className="w-5 h-5" />,
        experience: "1+ years",
        projects: "2+ projects",
      },
      {
        name: "C++",
        icon: <SiCplusplus className="w-5 h-5" />,
        experience: "1+ years",
        projects: "1+ projects",
      },
    ],
  },
  {
    name: "Database & Cloud",
    icon: <Database className="w-5 h-5" />,
    skills: [
      {
        name: "MySQL",
        icon: <SiMysql className="w-5 h-5" />,
        experience: "3+ years",
        projects: "10+ projects",
      },
      {
        name: "Firebase",
        icon: <SiFirebase className="w-5 h-5" />,
        experience: "2+ years",
        projects: "3+ projects",
      },
      {
        name: "Supabase",
        icon: <SiSupabase className="w-5 h-5" />,
        experience: "2+ years",
        projects: "4+ projects",
      },
      {
        name: "Google Sheets API",
        icon: <SiGooglesheets className="w-5 h-5" />,
        experience: "2+ years",
        projects: "4+ projects",
      },
    ],
  },
  {
    name: "Tools & IoT",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      {
        name: "Git/GitHub",
        icon: <SiGithub className="w-5 h-5" />,
        experience: "3+ years",
        projects: "15+ projects",
      },
      {
        name: "Figma",
        icon: <SiFigma className="w-5 h-5" />,
        experience: "2+ years",
        projects: "5+ projects",
      },
      // {
      //   name: "Vercel",
      //   icon: <SiVercel className="w-5 h-5" />,
      //   experience: "1+ years",
      //   projects: "3+ projects",
      // },
      {
        name: "ESP32 / IoT",
        icon: <SiEspressif className="w-5 h-5" />,
        experience: "1+ years",
        projects: "3+ projects",
      },
      {
        name: "Google Apps Script",
        icon: <SiGooglesheets className="w-5 h-5" />,
        experience: "1+ years",
        projects: "5+ projects",
      },
    ],
  },
];

// Technology logos untuk marquee
const techLogos = [
  {
    name: "Next.js",
    icon: <SiNextdotjs className="w-8 h-8 md:w-10 md:h-10" />,
  },
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
    name: "JavaScript",
    icon: <SiJavascript className="w-8 h-8 md:w-10 md:h-10" />,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="w-8 h-8 md:w-10 md:h-10" />,
  },
  { name: "PHP", icon: <SiPhp className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Python", icon: <SiPython className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Java", icon: <SiOpenjdk className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "C++", icon: <SiCplusplus className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "MySQL", icon: <SiMysql className="w-8 h-8 md:w-10 md:h-10" /> },
  {
    name: "WordPress",
    icon: <SiWordpress className="w-8 h-8 md:w-10 md:h-10" />,
  },
  {
    name: "Firebase",
    icon: <SiFirebase className="w-8 h-8 md:w-10 md:h-10" />,
  },
  {
    name: "Supabase",
    icon: <SiSupabase className="w-8 h-8 md:w-10 md:h-10" />,
  },
  { name: "Git", icon: <SiGit className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "GitHub", icon: <SiGithub className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Figma", icon: <SiFigma className="w-8 h-8 md:w-10 md:h-10" /> },
  { name: "Vercel", icon: <SiVercel className="w-8 h-8 md:w-10 md:h-10" /> },
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
            Tools and technologies I actively use to build web applications,
            from frontend to backend and IoT integration.
          </p>
        </div>

        {/* MARQUEE */}
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, idx) => (
            <div
              key={category.name}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                <div className="p-2 rounded-lg bg-[#1E3A5F]/10 text-[#1E3A5F]">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 group-hover:text-[#1E3A5F] transition-colors">
                        {skill.icon}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 text-sm">
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

        {/* Tools Cloud - Disesuaikan dengan skill real */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              RESTful APIs
            </span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              JWT Authentication
            </span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              IoT (ESP32)
            </span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              Google Apps Script
            </span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              WordPress Development
            </span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all cursor-default">
              Firebase Integration
            </span>
          </div>
        </div>
      </div>

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
