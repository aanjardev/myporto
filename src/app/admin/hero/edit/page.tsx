"use client";
import { useState, useEffect, FormEvent } from "react";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "@/components/admin/Toast";
import FileUpload from "@/components/admin/FileUpload";

type Photo = { src: string; label: string };
type Social = { label: string; url: string; icon: string };

export default function EditHeroPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([{ src: "", label: "" }]);
  const [socials, setSocials] = useState<Social[]>([{ label: "GitHub", url: "", icon: "SiGithub" }]);

  useEffect(() => {
    fetch("/api/admin/hero")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setName(data.name ?? ""); setNickname(data.nickname ?? "");
          setTagline(data.tagline ?? ""); setBio(data.bio ?? "");
          setCvUrl(data.cvUrl ?? "");
          if (data.photos?.length) setPhotos(data.photos);
          if (data.socials?.length) setSocials(data.socials.map((s: { label: string; url: string; icon: string }) => ({ label: s.label, url: s.url, icon: s.icon })));
        }
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nickname, tagline, bio, cvUrl: cvUrl || null, photos, socials }),
    });
    setSaving(false);
    if (res.ok) {
      setToast({ msg: "Hero berhasil disimpan!", type: "success" });
      setTimeout(() => router.push("/admin/hero"), 1200);
    } else {
      setToast({ msg: "Gagal menyimpan", type: "error" });
    }
  };

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };
  const fieldStyle = { marginBottom: 20 };

  if (loading) return <div style={{ padding: 40, color: "#6b7280" }}>Memuat data...</div>;

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/hero" style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7280", textDecoration: "none", fontSize: 14 }}>
            <ArrowLeft style={{ width: 16, height: 16 }} /> Kembali
          </Link>
          <span style={{ color: "#d1d5db" }}>/</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Edit Hero Section</h1>
        </div>
        <button form="hero-form" type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#0c1f3f", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: saving ? 0.7 : 1 }}>
          <Save style={{ width: 16, height: 16 }} /> {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <form id="hero-form" onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Left */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 20px" }}>Informasi Dasar</h2>
            <div style={fieldStyle}><label style={labelStyle}>Nama Lengkap</label><input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Aan Anjar Setyowati" /></div>
            <div style={fieldStyle}><label style={labelStyle}>Nickname / Display Name</label><input style={inputStyle} value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Aanjar" /></div>
            <div style={fieldStyle}><label style={labelStyle}>Tagline</label><input style={inputStyle} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Web Developer & Private Tutor" /></div>
            <div style={fieldStyle}><label style={labelStyle}>Bio</label><textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Cerita singkat tentang dirimu..." /></div>
            <div style={fieldStyle}>
              <FileUpload 
                value={cvUrl} 
                onChange={setCvUrl} 
                label="Link CV (PDF/Docs)" 
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Photos */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Foto Slideshow</h2>
                <button type="button" onClick={() => setPhotos([...photos, { src: "", label: "" }])} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#f0f2f5", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}>
                  <Plus style={{ width: 12, height: 12 }} /> Tambah
                </button>
              </div>
              {photos.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <FileUpload 
                      value={p.src} 
                      onChange={(url) => { const n = [...photos]; n[i].src = url; n[i].label = ""; setPhotos(n); }} 
                      label={`Foto ${i + 1}`} 
                      accept="image/*"
                    />
                  </div>
                  {photos.length > 1 && (
                    <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))} style={{ padding: "8px", background: "#fee2e2", border: "none", borderRadius: 8, cursor: "pointer", color: "#dc2626", flexShrink: 0, marginTop: 24 }}>
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Social Links</h2>
                <button type="button" onClick={() => setSocials([...socials, { label: "", url: "", icon: "SiGithub" }])} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#f0f2f5", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}>
                  <Plus style={{ width: 12, height: 12 }} /> Tambah
                </button>
              </div>
              {socials.map((s, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr auto", gap: 6, marginBottom: 10, alignItems: "center" }}>
                  <input style={inputStyle} value={s.label} onChange={(e) => { const n = [...socials]; n[i].label = e.target.value; setSocials(n); }} placeholder="GitHub" />
                  <input style={inputStyle} value={s.url} onChange={(e) => { const n = [...socials]; n[i].url = e.target.value; setSocials(n); }} placeholder="https://github.com/..." />
                  <select style={{ ...inputStyle, background: "#fff" }} value={s.icon} onChange={(e) => { const n = [...socials]; n[i].icon = e.target.value; setSocials(n); }}>
                    <option value="SiGithub">GitHub</option>
                    <option value="SiLinkedin">LinkedIn</option>
                    <option value="SiInstagram">Instagram</option>
                    <option value="SiTwitter">Twitter</option>
                  </select>
                  {socials.length > 1 && (
                    <button type="button" onClick={() => setSocials(socials.filter((_, j) => j !== i))} style={{ padding: "8px", background: "#fee2e2", border: "none", borderRadius: 8, cursor: "pointer", color: "#dc2626" }}>
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
