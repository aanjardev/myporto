import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Award,
  Trophy,
  BookOpen,
  Target,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Globe,
  Hash,
} from "lucide-react";
import { credentialsData } from "@/components/credentialsData";
import { Credential } from "@/types/credential";

// Generate static params for all credentials
export async function generateStaticParams() {
  return credentialsData.map((credential) => ({
    slug: credential.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const credential = credentialsData.find((c) => c.slug === slug);

  if (!credential) {
    return {
      title: "Credential Not Found",
    };
  }

  return {
    title: `${credential.title} | Aanjar Portfolio`,
    description: credential.description,
  };
}

const getTypeIcon = (type: Credential["type"]) => {
  switch (type) {
    case "certification":
      return <Award className="w-6 h-6" />;
    case "award":
      return <Trophy className="w-6 h-6" />;
    case "achievement":
      return <Target className="w-6 h-6" />;
    case "competition":
      return <Trophy className="w-6 h-6" />;
    case "course":
      return <BookOpen className="w-6 h-6" />;
    case "license":
      return <FileText className="w-6 h-6" />;
    default:
      return <Award className="w-6 h-6" />;
  }
};

const getTypeColor = (type: Credential["type"]) => {
  switch (type) {
    case "certification":
      return "bg-blue-600";
    case "award":
      return "bg-amber-500";
    case "achievement":
      return "bg-emerald-500";
    case "competition":
      return "bg-purple-500";
    case "course":
      return "bg-indigo-500";
    case "license":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
};

const getTypeBgLight = (type: Credential["type"]) => {
  switch (type) {
    case "certification":
      return "bg-blue-50 border-blue-200";
    case "award":
      return "bg-amber-50 border-amber-200";
    case "achievement":
      return "bg-emerald-50 border-emerald-200";
    case "competition":
      return "bg-purple-50 border-purple-200";
    case "course":
      return "bg-indigo-50 border-indigo-200";
    case "license":
      return "bg-gray-50 border-gray-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

export default async function CredentialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const credential = credentialsData.find((c) => c.slug === slug);

  if (!credential) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = credential.expiryDate
    ? new Date(credential.expiryDate) < new Date()
    : false;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#1E3A5F] text-white py-12 md:py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/credentials"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Credentials
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm`}>
              {getTypeIcon(credential.type)}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold">
                {credential.type.charAt(0).toUpperCase() +
                  credential.type.slice(1)}
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
            {credential.title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            {credential.issuer}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Image Container - A4 Landscape Ratio (1.414 : 1) */}
            <div
              className="relative w-full bg-gray-100 rounded-t-2xl overflow-hidden"
              style={{ aspectRatio: "7 / 5" }}
            >
              <Image
                src={credential.image}
                alt={credential.title}
                fill
                className="object-contain bg-white"
                priority
              />
              {/* Optional: subtle border effect like real certificate */}
              <div className="absolute inset-0 pointer-events-none border-8 border-white/20 rounded-t-2xl" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Status Badge */}
              {credential.expiryDate && (
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                      isExpired
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {isExpired ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {isExpired ? "Expired" : "Active"}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {credential.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Issued Date */}
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl ${getTypeBgLight(credential.type)}`}
                >
                  <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      ISSUED DATE
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {formatDate(credential.date)}
                    </p>
                  </div>
                </div>

                {/* Expiry Date */}
                {credential.expiryDate && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl ${getTypeBgLight(credential.type)}`}
                  >
                    <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        EXPIRY DATE
                      </p>
                      <p
                        className={`font-semibold ${isExpired ? "text-red-600" : "text-gray-900"}`}
                      >
                        {formatDate(credential.expiryDate)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Credential ID */}
                {credential.credentialId && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl ${getTypeBgLight(credential.type)}`}
                  >
                    <Hash className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        CREDENTIAL ID
                      </p>
                      <p className="text-gray-900 font-mono text-sm">
                        {credential.credentialId}
                      </p>
                    </div>
                  </div>
                )}

                {/* Issuer Type */}
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl ${getTypeBgLight(credential.type)}`}
                >
                  <UserCheck className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      ISSUER TYPE
                    </p>
                    <p className="text-gray-900 font-semibold">
                      Professional Organization
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {credential.skills && credential.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#1E3A5F]" />
                    Skills & Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {credential.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium hover:bg-[#1E3A5F]/10 hover:text-[#1E3A5F] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Verify Button Card */}
          {credential.credentialUrl && (
            <div className="bg-gradient-to-r from-[#1E3A5F]/5 to-transparent rounded-2xl p-6 md:p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Verify this credential
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Click the button below to verify this credential on the issuer's
                official website.
              </p>
              <a
                href={credential.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white font-semibold rounded-xl hover:bg-[#152C48] transition-all duration-300 shadow-lg shadow-[#1E3A5F]/20 hover:shadow-xl hover:shadow-[#1E3A5F]/30 hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" />
                Verify Credential
              </a>
            </div>
          )}

          {/* Navigation */}
          {/* <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
            <Link
              href="/credentials"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1E3A5F] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Credentials
            </Link>

            <Link
              href="/credentials"
              className="inline-flex items-center gap-2 text-[#1E3A5F] font-semibold hover:gap-3 transition-all group"
            >
              Explore More Credentials
              <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div> */}
        </div>
      </section>
    </main>
  );
}
