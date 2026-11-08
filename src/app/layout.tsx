import type { Metadata } from "next";
import { Rubik, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import Breadcrumbs from "@/components/Breadcrumbs";

const rubik = Rubik({ variable: "--font-rubik", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Aanjar — Web Developer & Tutor",
  description:
    "Portfolio of Aanjar — Full Stack Web Developer specializing in Next.js, Laravel, and modern web technologies. Available for freelance projects.",
  keywords: ["Aan Anjar", "Aan Anjar Setyowati", "Aanjar", "Aanjardev", "Web Developer", "Full Stack Developer", "Next.js", "Laravel", "Portfolio", "Tutor"],
  authors: [{ name: "Aan Anjar Setyowati" }],
  openGraph: {
    title: "Aanjar — Web Developer & Tutor",
    description: "Portfolio of Aan Anjar Setyowati (Aanjar) — Full Stack Web Developer.",
    type: "website",
    siteName: "Aanjar Portfolio",
    images: [{ url: "/images/profil1.jpg", width: 800, height: 800, alt: "Aan Anjar Setyowati Profile Picture" }],
  },
  icons: {
    icon: { url: "/icon.svg?v=3", type: "image/svg+xml", sizes: "any" },
    apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("next-url") ?? "";
  const isAdmin = pathname.startsWith("/admin");
  const publicInteractions = !isAdmin && !pathname.startsWith("/invoice");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aan Anjar Setyowati",
    alternateName: "Aanjar",
    image: "/images/profil.jpg",
    jobTitle: "Full Stack Web Developer",
    knowsAbout: ["Next.js", "Laravel", "Web Development", "Tutor"],
  };

  return (
    <html lang="en" className={`${rubik.variable} ${spaceGrotesk.variable}`}>
      <head>
        {!isAdmin && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
      </head>
      <body className={publicInteractions ? "portfolio-interactions" : undefined}>
        {!isAdmin && (
          <div className="print:hidden">
            <Navbar />
            <div style={{ height: 64 }} />
            {/* <Breadcrumbs /> */}
          </div>
        )}
        {children}
        {!isAdmin && (
          <div className="print:hidden">
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
