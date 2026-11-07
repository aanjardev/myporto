import { jsonStore } from "@/lib/json-store";
import Link from "next/link";
import { FolderOpen, Briefcase, Award, Code2, ArrowRight, User } from "lucide-react";

async function getStats() {
  const [projects, experiences, credentials, techStack] = await Promise.all([
    jsonStore.project.count(),
    jsonStore.workExperience.count(),
    jsonStore.credential.count(),
    jsonStore.techStackItem.count(),
  ]);
  return { projects, experiences, credentials, techStack };
}

const STAT_CARDS = [
  { key: "projects", label: "Projects", href: "/admin/projects", icon: FolderOpen, color: "#2d5a8e", bg: "#e8edf5" },
  { key: "experiences", label: "Work Experience", href: "/admin/experiences", icon: Briefcase, color: "#0c1f3f", bg: "#e8edf5" },
  { key: "credentials", label: "Credentials", href: "/admin/credentials", icon: Award, color: "#1a6b3c", bg: "#dcfce7" },
  { key: "techStack", label: "Tech Stack", href: "/admin/tech-stack", icon: Code2, color: "#7c3aed", bg: "#ede9fe" },
];

const QUICK_LINKS = [
  { label: "Edit Hero Section", href: "/admin/hero", icon: User, desc: "Nama, tagline, bio, foto, sosial" },
  { label: "Tambah Project", href: "/admin/projects/new", icon: FolderOpen, desc: "Buat entri project baru" },
  { label: "Tambah Credential", href: "/admin/credentials/new", icon: Award, desc: "Tambah sertifikat atau prestasi" },
  { label: "Tambah Experience", href: "/admin/experiences/new", icon: Briefcase, desc: "Tambah riwayat pekerjaan" },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div style={{ padding: "32px 36px", flex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>
          Selamat datang kembali! Kelola konten portofoliomu di sini.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {STAT_CARDS.map(({ key, label, href, icon: Icon, color, bg }) => (
          <Link key={key} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              background: "#fff", borderRadius: 14, padding: "22px 24px",
              border: "1px solid #e5e7eb", transition: "box-shadow 0.2s",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 6px" }}>{label}</p>
                <p style={{ fontSize: 36, fontWeight: 700, color, fontFamily: "var(--font-display)", margin: 0, lineHeight: 1 }}>
                  {stats[key as keyof typeof stats]}
                </p>
              </div>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon style={{ width: 22, height: 22, color }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px" }}>
        Aksi Cepat
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {QUICK_LINKS.map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
            textDecoration: "none", transition: "border-color 0.2s",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f0f2f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon style={{ width: 18, height: 18, color: "#0c1f3f" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#0c1f3f", margin: 0 }}>{label}</p>
              <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{desc}</p>
            </div>
            <ArrowRight style={{ width: 16, height: 16, color: "#d1d5db" }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
