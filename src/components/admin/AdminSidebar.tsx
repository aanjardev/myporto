"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, User, FolderOpen, Briefcase, Award, Code2, LogOut, X, FileText
} from "lucide-react";
import { useState } from "react";

const MENU_GROUPS: { title: string; items: { icon: typeof LayoutDashboard; label: string; href: string; disabled?: boolean }[] }[] = [
  {
    title: "Portfolio",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
      { icon: User, label: "Hero Section", href: "/admin/hero" },
      { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
      { icon: Briefcase, label: "Work Experience", href: "/admin/experiences" },
      { icon: Award, label: "Credentials", href: "/admin/credentials" },
      { icon: Code2, label: "Tech Stack", href: "/admin/tech-stack" },
    ]
  },
  {
    title: "Sistem & Layanan",
    items: [
      { icon: FolderOpen, label: "Order & Arsip", href: "#", disabled: true },
      { icon: FileText, label: "Invoices", href: "#", disabled: true },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <aside style={{
      width: 240, flexShrink: 0, background: "#0c1f3f",
      display: "flex", flexDirection: "column", minHeight: "100vh",
      position: "sticky", top: 0, height: "100vh", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 700, color: "#fff",
            }}>A</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#fff" }}>Aanjar</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>Admin Panel</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        {MENU_GROUPS.map((group, gIdx) => (
          <div key={gIdx} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "8px 10px 4px" }}>
              {group.title}
            </p>
            {group.items.map(({ icon: Icon, label, href, disabled }) => {
              const isActive = href !== "#" && (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
              return disabled ? (
                <div
                  key={label}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                    borderRadius: 8, color: "rgba(255,255,255,0.2)", fontSize: 14,
                    cursor: "not-allowed",
                  }}
                  title="Coming Soon"
                >
                  <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                  {label}
                  <span style={{ marginLeft: "auto", fontSize: 9, background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>Soon</span>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                    borderRadius: 8, textDecoration: "none",
                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                    fontSize: 14, fontWeight: isActive ? 600 : 400,
                    transition: "all 0.15s",
                  }}
                >
                  <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                  {label}
                  {isActive && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" target="_blank" style={{
          display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
          borderRadius: 8, textDecoration: "none",
          color: "rgba(255,255,255,0.45)", fontSize: 13,
        }}>
          <X style={{ width: 15, height: 15 }} />
          Lihat Portfolio
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: 13,
            fontFamily: "inherit", textAlign: "left",
          }}
        >
          <LogOut style={{ width: 15, height: 15 }} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
