"use client";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft } from "lucide-react";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";

type FormData = { title: string; company: string; period: string; description: string; isVisible: boolean; order: number; tech: string[] };
const EMPTY: FormData = { title: "", company: "", period: "", description: "", isVisible: true, order: 0, tech: [] };

const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const };
const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

interface ExperienceFormProps { initial?: Partial<FormData>; expId?: number }

export function ExperienceForm({ initial, expId }: ExperienceFormProps) {
  const [form, setForm] = useState<FormData>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const set = (k: keyof FormData, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const url = expId ? `/api/admin/experiences/${expId}` : "/api/admin/experiences";
    const res = await fetch(url, { method: expId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) { setToast({ msg: "Berhasil disimpan!", type: "success" }); setTimeout(() => router.push("/admin/experiences"), 1200); }
    else setToast({ msg: "Gagal menyimpan", type: "error" });
  };

  return (
    <div style={{ padding: "32px 36px", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/experiences" style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7280", textDecoration: "none", fontSize: 14 }}><ArrowLeft style={{ width: 16, height: 16 }} /> Kembali</Link>
          <span style={{ color: "#d1d5db" }}>/</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>{expId ? "Edit Experience" : "Tambah Experience"}</h1>
        </div>
        <button form="exp-form" type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#0c1f3f", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Save style={{ width: 16, height: 16 }} /> {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <form id="exp-form" onSubmit={handleSubmit}>
        <div style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1px solid #e5e7eb", maxWidth: 700 }}>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Posisi / Jabatan *</label><input required style={inputStyle} value={form.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Perusahaan / Institusi *</label><input required style={inputStyle} value={form.company} onChange={(e) => set("company", e.target.value)} /></div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Periode *</label><input required style={inputStyle} value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="Jan 2024 – Sekarang" /></div>
          <div style={{ marginBottom: 20 }}><label style={labelStyle}>Deskripsi *</label><textarea required rows={5} style={{ ...inputStyle, resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} /></div>
          <div style={{ marginBottom: 20 }}><TagInput label="Tech Stack" tags={form.tech} onChange={(v) => set("tech", v)} placeholder="Laravel, Next.js..." /></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Tampilkan</label>
            <button type="button" onClick={() => set("isVisible", !form.isVisible)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: form.isVisible ? "#0c1f3f" : "#d1d5db", position: "relative" }}>
              <span style={{ position: "absolute", top: 2, left: form.isVisible ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff" }} />
            </button>
          </div>
        </div>
      </form>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default function NewExperiencePage() {
  return <ExperienceForm />;
}
