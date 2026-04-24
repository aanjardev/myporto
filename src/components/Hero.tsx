"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Users,
  Code,
  BookOpen,
  Star,
  Calendar,
} from "lucide-react";
import { SiGithub } from "react-icons/si";

const Hero = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="min-h-screen flex items-start px-4 sm:px-6 lg:px-8 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background - solid color only, no gradient */}
      <div className="absolute inset-0 bg-[#1E3A5F]/[0.02] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN - TEXT CONTENT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Freelance
            </div>

            {/* Heading - ZERO GRADIENT */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1]">
                Hi, I'm <span className="text-[#1E3A5F]">Aanjar</span>
              </h1>
              <div className="relative inline-block">
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-600">
                  Web Developer
                </h2>
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#1E3A5F] rounded-full"></div>
              </div>
            </div>

            {/* Role tags - redesigned lebih rapi */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
                <BookOpen className="w-3.5 h-3.5 text-[#1E3A5F]" />
                Informatics Student
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
                <Briefcase className="w-3.5 h-3.5 text-[#1E3A5F]" />
                Freelancer
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium">
                <Star className="w-3.5 h-3.5 text-[#1E3A5F]" />
                Private Tutor
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-lg max-w-xl">
              I build websites for clients and create fun interactive tools that
              anyone can use for free.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#152C48] transition-all duration-300 shadow-lg shadow-[#1E3A5F]/20 hover:shadow-xl hover:shadow-[#1E3A5F]/30 hover:-translate-y-0.5"
              >
                See My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="https://github.com/aanjardev"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-all duration-300 hover:-translate-y-0.5"
              >
                <SiGithub className="w-5 h-5" />
                GitHub
              </Link>
            </div>

            {/* STATISTICS - REDESIGNED (lebih terintegrasi) */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-start gap-6 md:gap-10">
                {/* Item 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E3A5F]/10">
                    <Calendar className="w-4 h-4 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">3+</div>
                    <div className="text-xs text-gray-500">
                      Years Experience
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="w-px h-8 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E3A5F]/10">
                    <Users className="w-4 h-4 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">7+</div>
                    <div className="text-xs text-gray-500">Clients</div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="w-px h-8 bg-gray-200 hidden md:block" />

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E3A5F]/10">
                    <Code className="w-4 h-4 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">10+</div>
                    <div className="text-xs text-gray-500">Projects Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - PROFILE IMAGE */}
          <div className="flex justify-center lg:justify-end relative order-first lg:order-last">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-[#1E3A5F]/5 rounded-full blur-3xl"></div>

            {/* Main image card */}
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#1E3A5F]/20 rounded-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#1E3A5F]/20 rounded-3xl"></div>

              {/* Image container */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                {imageError ? (
                  <div className="w-80 md:w-96 h-[420px] bg-gray-100 flex flex-col items-center justify-center gap-3">
                    <div className="w-24 h-24 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-[#1E3A5F]">📸</span>
                    </div>
                    <span className="text-gray-400 font-medium">Aanjar</span>
                  </div>
                ) : (
                  <div className="relative w-80 md:w-96 h-[420px] overflow-hidden">
                    <Image
                      src="/images/profil.jpg"
                      alt="Aanjar - Web Developer & Tutor"
                      width={400}
                      height={420}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                      onError={() => setImageError(true)}
                      priority
                    />
                  </div>
                )}
              </div>

              {/* Floating badge - uncomment if desired */}
              {/* 
              <div className="absolute -bottom-3 -right-3 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-200 flex items-center gap-2 z-20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Open to Work</span>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
