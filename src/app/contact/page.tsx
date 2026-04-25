import { Mail, MessageCircle, Clock } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const metadata = {
  title: "Contact | Aanjar Portfolio",
  description:
    "Get in touch with me for freelance work, collaborations, or just to say hello.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4">
            <MessageCircle className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Let's Talk</h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind? Looking for a freelance developer? I'd love
            to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Email Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center mb-8 hover:shadow-md transition-all">
            <div className="w-14 h-14 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-[#1E3A5F]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Email Me
            </h2>
            <a
              href="mailto:aanjardev@gmail.com"
              className="text-2xl md:text-3xl font-bold text-[#1E3A5F] hover:underline break-all"
            >
              aanjardev@gmail.com
            </a>
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>Usually responds within 24 hours</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Connect Online
            </h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/aanjardev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-[#1E3A5F] group-hover:text-white transition-all duration-300">
                  <FaGithub className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-500 group-hover:text-[#1E3A5F] transition-colors">
                  GitHub
                </span>
              </a>
              <a
                href="https://linkedin.com/in/aan-anjar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-[#1E3A5F] group-hover:text-white transition-all duration-300">
                  <FaLinkedin className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-500 group-hover:text-[#1E3A5F] transition-colors">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://twitter.com/aanjar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-[#1E3A5F] group-hover:text-white transition-all duration-300">
                  <FaTwitter className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-500 group-hover:text-[#1E3A5F] transition-colors">
                  Twitter
                </span>
              </a>
            </div>
          </div>

          {/* Availability Note */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Open for freelance work and collaboration opportunities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
