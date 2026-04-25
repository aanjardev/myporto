// app/credentials/[slug]/page.tsx
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
} from "lucide-react";
import { credentialsData } from "@/components/credentialsData";
import { Credential } from "@/types/credential";

interface CredentialPageProps {
  params: {
    slug: string;
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
      return "bg-blue-100 text-blue-800";
    case "award":
      return "bg-yellow-100 text-yellow-800";
    case "achievement":
      return "bg-green-100 text-green-800";
    case "competition":
      return "bg-purple-100 text-purple-800";
    case "course":
      return "bg-indigo-100 text-indigo-800";
    case "license":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CredentialPage({ params }: CredentialPageProps) {
  const credential = credentialsData.find((c) => c.slug === params.slug);

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
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/credentials"
          className="inline-flex items-center gap-2 text-[#1E3A5F] hover:text-[#1E3A5F]/80 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Credentials
        </Link>

        {/* Credential Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <Image
              src={credential.image}
              alt={credential.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getTypeColor(credential.type)}`}
              >
                {getTypeIcon(credential.type)}
                {credential.type.charAt(0).toUpperCase() +
                  credential.type.slice(1)}
              </span>
            </div>
            {credential.expiryDate && (
              <div className="absolute top-4 right-4">
                <div
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    isExpired
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
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
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {credential.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  {credential.issuer}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">
                      Issued: {formatDate(credential.date)}
                    </span>
                  </div>
                  {credential.expiryDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span
                        className={`text-sm ${isExpired ? "text-red-600" : ""}`}
                      >
                        Expires: {formatDate(credential.expiryDate)}
                      </span>
                    </div>
                  )}
                  {credential.credentialId && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        ID: {credential.credentialId}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {credential.credentialUrl && (
                <div className="mt-4 md:mt-0">
                  <a
                    href={credential.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#1E3A5F]/90 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Verify Credential
                  </a>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {credential.description}
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Skills & Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {credential.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Credential Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About This Credential
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  This {credential.type} represents my dedication to
                  professional development and continuous learning in the field
                  of technology and software development.
                </p>
                <p>
                  {credential.type === "certification" &&
                    "Certifications validate specific technical skills and knowledge in industry-standard tools and practices."}
                  {credential.type === "award" &&
                    "Awards recognize outstanding achievements and contributions to projects or competitions."}
                  {credential.type === "achievement" &&
                    "Achievements highlight significant accomplishments and milestones in my career journey."}
                  {credential.type === "competition" &&
                    "Competition participations demonstrate problem-solving skills and ability to work under pressure."}
                  {credential.type === "course" &&
                    "Courses provide foundational knowledge and practical skills in various technologies."}
                  {credential.type === "license" &&
                    "Licenses authorize professional practice and validate compliance with industry standards."}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Status & Validity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${isExpired ? "bg-red-500" : "bg-green-500"}`}
                  />
                  <span className="text-gray-600">
                    {isExpired ? "Expired" : "Currently Valid"}
                  </span>
                </div>
                {credential.expiryDate && (
                  <p className="text-sm text-gray-500">
                    {isExpired
                      ? `Expired on ${formatDate(credential.expiryDate)}`
                      : `Valid until ${formatDate(credential.expiryDate)}`}
                  </p>
                )}
                {credential.credentialId && (
                  <p className="text-sm text-gray-500">
                    Credential ID: {credential.credentialId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Generate static params for all credentials
export async function generateStaticParams() {
  return credentialsData.map((credential) => ({
    slug: credential.slug,
  }));
}
