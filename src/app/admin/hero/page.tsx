"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Edit2, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const ICON_MAP: Record<string, any> = {
  SiGithub: FaGithub,
  SiLinkedin: FaLinkedin,
  SiInstagram: FaInstagram,
  SiTwitter: FaTwitter,
};

type Photo = { src: string; label: string };
type Social = { label: string; url: string; icon: string };

export default function AdminHeroPage() {
  const [data, setData] = useState<{
    name: string; nickname: string; tagline: string; bio: string;
    cvUrl: string; photos: Photo[]; socials: Social[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 40, color: "#6b7280" }}>Memuat data...</div>;
  if (!data) return <div style={{ padding: 40, color: "#6b7280" }}>Data tidak ditemukan.</div>;

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Hero Section</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>Informasi utama di halaman beranda</p>
        </div>
        <Link href="/admin/hero/edit" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#0c1f3f", color: "#fff", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
          <Edit2 style={{ width: 14, height: 14 }} /> Edit Data
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 20px", borderBottom: "1px solid #f3f4f6", paddingBottom: 12 }}>Informasi Dasar</h2>
          
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Nama Lengkap</p>
            <p style={{ fontSize: 15, color: "#111827", margin: 0, fontWeight: 500 }}>{data.name || "-"}</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Nickname</p>
            <p style={{ fontSize: 15, color: "#111827", margin: 0, fontWeight: 500 }}>{data.nickname || "-"}</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Tagline</p>
            <p style={{ fontSize: 15, color: "#111827", margin: 0, fontWeight: 500 }}>{data.tagline || "-"}</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Bio</p>
            <p style={{ fontSize: 14, color: "#374151", margin: 0, lineHeight: 1.6 }}>{data.bio || "-"}</p>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>Link CV</p>
            {data.cvUrl ? (
              <a href={data.cvUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#2563eb", textDecoration: "none", fontSize: 14, fontWeight: 500, marginTop: 4 }}>
                Lihat Dokumen <ExternalLink style={{ width: 14, height: 14 }} />
              </a>
            ) : <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>-</p>}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Photos */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px", borderBottom: "1px solid #f3f4f6", paddingBottom: 12 }}>Foto Slideshow</h2>
            {data.photos && data.photos.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12 }}>
                {data.photos.map((p, i) => (
                  <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb", aspectRatio: "1/1", position: "relative" }}>
                    <img src={p.src} alt="Slideshow" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Belum ada foto.</p>
            )}
          </div>

          {/* Socials */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px", borderBottom: "1px solid #f3f4f6", paddingBottom: 12 }}>Social Links</h2>
            {data.socials && data.socials.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {data.socials.map((s, i) => {
                  const Icon = ICON_MAP[s.icon] || FaGithub;
                  return (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f9fafb", borderRadius: 10, textDecoration: "none", border: "1px solid #f3f4f6", transition: "border-color 0.2s" }}>
                      <Icon style={{ width: 18, height: 18, color: "#374151" }} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827", flex: 1 }}>{s.label}</span>
                      <ExternalLink style={{ width: 14, height: 14, color: "#9ca3af" }} />
                    </a>
                  );
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>Belum ada social links.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
