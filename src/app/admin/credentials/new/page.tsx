"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";
import FileUpload from "@/components/admin/FileUpload";

type FormData = { title: string; slug: string; type: string; issuer: string; date: string; expiryDate: string; credentialId: string; credentialUrl: string; description: string; image: string; isVisible: boolean; order: number; skills: string[] };
const EMPTY: FormData = { title: "", slug: "", type: "certification", issuer: "", date: "", expiryDate: "", credentialId: "", credentialUrl: "", description: "", image: "", isVisible: true, order: 0, skills: [] };

const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const };
const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

export interface CredentialFormProps { initial?: Partial<FormData>; credId?: number }

export function CredentialForm({ initial, credId }: CredentialFormProps) {
  const [form, setForm] = useState<FormData>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const set = (k: keyof FormData, v: unknown) => setForm((p) => ({ ...p, [k]: v }));
  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").substring(0, 60);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const url = credId ? `/api/admin/credentials/${credId}` : "/api/admin/credentials";
    const res = await fetch(url, { method: credId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setToast({ msg: "Berhasil disimpan!", type: "success" }); setTimeout(() => router.push("/admin/credentials"), 1200); }
    else setToast({ msg: "Gagal menyimpan", type: "error" });
  };

  return (
    <div style={{ padding: "32px 36px", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/credentials" style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7280", textDecoration: "none", fontSize: 14 }}><ArrowLeft style={{ width: 16, height: 16 }} /> Kembali</Link>
          <span style={{ color: "#d1d5db" }}>/</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>{credId ? "Edit Credential" : "Tambah Credential"}</h1>
        </div>
        <button form="cred-form" type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#0c1f3f", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Save style={{ width: 16, height: 16 }} /> {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <form id="cred-form" onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Judul *</label>
              <input required style={inputStyle} value={form.title} onChange={(e) => { set("title", e.target.value); if (!credId) set("slug", autoSlug(e.target.value)); }} />
            </div>
            <div style={{ marginBottom: 16 }}><label style={labelStyle}>Slug *</label><input required style={inputStyle} value={form.slug} onChange={(e) => set("slug", e.target.value)} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={labelStyle}>Tipe *</label>
                <select style={{ ...inputStyle, background: "#fff" }} value={form.type} onChange={(e) => set("type", e.target.value)}>
                  <option value="certification">Sertifikasi</option>
                  <option value="award">Award</option>
                  <option value="achievement">Prestasi</option>
                  <option value="competition">Kompetisi</option>
                  <option value="course">Kursus</option>
                  <option value="license">Lisensi</option>
                </select>
              </div>
              <div><label style={labelStyle}>Penerbit *</label><input required style={inputStyle} value={form.issuer} onChange={(e) => set("issuer", e.target.value)} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div><label style={labelStyle}>Tanggal *</label><input required style={inputStyle} value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="2025" /></div>
              <div><label style={labelStyle}>Expired</label><input style={inputStyle} value={form.expiryDate} onChange={(e) => set("expiryDate", e.target.value)} placeholder="2028 (opsional)" /></div>
            </div>
            <div style={{ marginBottom: 16 }}><label style={labelStyle}>Deskripsi *</label><textarea required rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
            <div style={{ marginBottom: 16 }}><label style={labelStyle}>Credential ID</label><input style={inputStyle} value={form.credentialId} onChange={(e) => set("credentialId", e.target.value)} /></div>
            <div style={{ marginBottom: 20 }}><label style={labelStyle}>Credential URL</label><input style={inputStyle} type="url" value={form.credentialUrl} onChange={(e) => set("credentialUrl", e.target.value)} placeholder="https://..." /></div>
            <TagInput label="Skills" tags={form.skills} onChange={(v) => set("skills", v)} placeholder="React, Node.js..." />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
              <FileUpload 
                value={form.image} 
                onChange={(url) => set("image", url)} 
                label="Gambar / Sertifikat *" 
                accept="image/*"
              />
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Tampilkan</label>
                <button type="button" onClick={() => set("isVisible", !form.isVisible)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: form.isVisible ? "#0c1f3f" : "#d1d5db", position: "relative" }}>
                  <span style={{ position: "absolute", top: 2, left: form.isVisible ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff" }} />
                </button>
              </div>
              <label style={labelStyle}>Urutan</label>
              <input type="number" style={inputStyle} value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
            </div>
          </div>
        </div>
      </form>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default function NewCredentialPage() {
  return <CredentialForm />;
}
