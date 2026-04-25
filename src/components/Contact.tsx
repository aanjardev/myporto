"use client";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactCTA() {
  return (
    <section className="py-20 md:py-28 bg-[#1E3A5F] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[#0F2A40] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-6">
          <MessageCircle className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Let's Work Together
        </h2>

        {/* Description */}
        <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
          Have a project in mind? Looking for a freelance web developer? I'm
          just a message away.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#1E3A5F] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            Contact Me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="mailto:aanjardev@gmail.com"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            aanjardev@gmail.com
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <Link
            href="https://github.com/aanjardev"
            target="_blank"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/aan-anjar"
            target="_blank"
            className="text-white/60 hover:text-white transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:aanjardev@gmail.com"
            className="text-white/60 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
