"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import TagInput from "@/components/admin/TagInput";
import Toast from "@/components/admin/Toast";
import FileUpload from "@/components/admin/FileUpload";

type ProjectFormData = {
  title: string; slug: string; type: string; category: string; client: string;
  period: string; description: string; longDescription: string; challenge: string;
  solution: string; image: string; liveUrl: string; githubUrl: string;
  myRole: string; teamSize: string; goal: string; outcome: string;
  isVisible: boolean; order: number;
  tech: string[]; screenshots: string[]; features: string[];
  responsibilities: string[]; highlights: string[];
};

const EMPTY: ProjectFormData = {
  title: "", slug: "", type: "freelance", category: "", client: "",
  period: "", description: "", longDescription: "", challenge: "",
  solution: "", image: "", liveUrl: "", githubUrl: "",
  myRole: "", teamSize: "", goal: "", outcome: "",
  isVisible: true, order: 0,
  tech: [], screenshots: [], features: [], responsibilities: [], highlights: [],
};

interface ProjectFormProps { initial?: Partial<ProjectFormData>; projectId?: number; }

const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const };
const labelStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };
const cardStyle = { background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", marginBottom: 20 };

export default function ProjectForm({ initial, projectId }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>({ ...EMPTY, ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const set = (key: keyof ProjectFormData, val: unknown) => setForm((prev) => ({ ...prev, [key]: val }));

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = projectId ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
    const method = projectId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false);
    if (res.ok) {
      setToast({ msg: projectId ? "Project berhasil diupdate!" : "Project berhasil dibuat!", type: "success" });
      setTimeout(() => router.push("/admin/projects"), 1200);
    } else {
      setToast({ msg: "Gagal menyimpan project", type: "error" });
    }
  };

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/projects" style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7280", textDecoration: "none", fontSize: 14 }}>
            <ArrowLeft style={{ width: 16, height: 16 }} /> Kembali
          </Link>
          <span style={{ color: "#d1d5db" }}>/</span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>
            {projectId ? "Edit Project" : "Tambah Project"}
          </h1>
        </div>
        <button form="project-form" type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#0c1f3f", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: saving ? 0.7 : 1 }}>
          <Save style={{ width: 16, height: 16 }} /> {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      <form id="project-form" onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          {/* Left */}
          <div>
            <div style={cardStyle}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px" }}>Informasi Utama</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Judul Project *</label>
                <input style={inputStyle} required value={form.title} onChange={(e) => { set("title", e.target.value); if (!projectId) set("slug", autoSlug(e.target.value)); }} placeholder="Nama project" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Slug (URL) *</label>
                <input style={inputStyle} required value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="nama-project" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Tipe *</label>
                  <select style={{ ...inputStyle, background: "#fff" }} value={form.type} onChange={(e) => set("type", e.target.value)}>
                    <option value="freelance">Freelance</option>
                    <option value="side">Side Project</option>
                    <option value="social">Social Impact</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Kategori</label>
                  <input style={inputStyle} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Web App" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={labelStyle}>Client</label><input style={inputStyle} value={form.client} onChange={(e) => set("client", e.target.value)} placeholder="Nama client" /></div>
                <div><label style={labelStyle}>Periode</label><input style={inputStyle} value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="Jan – Mar 2024" /></div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Deskripsi Singkat *</label>
                <textarea rows={3} required style={{ ...inputStyle, resize: "vertical" }} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Penjelasan singkat project" />
              </div>
              <div>
                <label style={labelStyle}>Deskripsi Panjang</label>
                <textarea rows={5} style={{ ...inputStyle, resize: "vertical" }} value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} placeholder="Penjelasan detail project..." />
              </div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px" }}>Detail Teknis</h2>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Tantangan</label><textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={form.challenge} onChange={(e) => set("challenge", e.target.value)} /></div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Solusi</label><textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={form.solution} onChange={(e) => set("solution", e.target.value)} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div><label style={labelStyle}>Role Saya</label><input style={inputStyle} value={form.myRole} onChange={(e) => set("myRole", e.target.value)} /></div>
                <div><label style={labelStyle}>Ukuran Tim</label><input style={inputStyle} value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Goal</label><input style={inputStyle} value={form.goal} onChange={(e) => set("goal", e.target.value)} /></div>
              <div><label style={labelStyle}>Outcome</label><input style={inputStyle} value={form.outcome} onChange={(e) => set("outcome", e.target.value)} /></div>
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px" }}>List Items</h2>
              <div style={{ marginBottom: 20 }}><TagInput label="Tech Stack" tags={form.tech} onChange={(v) => set("tech", v)} placeholder="Next.js, Laravel..." /></div>
              <div style={{ marginBottom: 20 }}><TagInput label="Fitur Utama" tags={form.features} onChange={(v) => set("features", v)} placeholder="Fitur 1..." /></div>
              <div style={{ marginBottom: 20 }}><TagInput label="Tanggung Jawab" tags={form.responsibilities} onChange={(v) => set("responsibilities", v)} /></div>
              <TagInput label="Highlights" tags={form.highlights} onChange={(v) => set("highlights", v)} />
            </div>
          </div>

          {/* Right */}
          <div>
            <div style={cardStyle}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px" }}>Media & Link</h2>
              <div style={{ marginBottom: 16 }}>
                <FileUpload 
                  value={form.image} 
                  onChange={(url) => set("image", url)} 
                  label="Thumbnail Image *" 
                  accept="image/*"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Live URL</label>
                <input style={inputStyle} type="url" value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label style={labelStyle}>GitHub URL</label>
                <input style={inputStyle} type="url" value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} placeholder="https://github.com/..." />
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Screenshots</h2>
                <button type="button" onClick={() => set("screenshots", [...form.screenshots, ""])} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: "#f0f2f5", border: "1px solid #e5e7eb", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <Plus style={{ width: 12, height: 12 }} /> Add
                </button>
              </div>
              {form.screenshots.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <FileUpload 
                      value={s} 
                      onChange={(url) => { const n = [...form.screenshots]; n[i] = url; set("screenshots", n); }} 
                      label={`Screenshot ${i + 1}`} 
                      accept="image/*"
                    />
                  </div>
                  <button type="button" onClick={() => set("screenshots", form.screenshots.filter((_, j) => j !== i))} style={{ padding: "8px", background: "#fee2e2", border: "none", borderRadius: 7, cursor: "pointer", color: "#dc2626", flexShrink: 0, marginTop: 24 }}>
                    <Trash2 style={{ width: 13, height: 13 }} />
                  </button>
                </div>
              ))}
            </div>

            <div style={cardStyle}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: "0 0 16px" }}>Pengaturan</h2>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Tampilkan di Portfolio</label>
                <button type="button" onClick={() => set("isVisible", !form.isVisible)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: form.isVisible ? "#0c1f3f" : "#d1d5db", position: "relative", transition: "background 0.2s" }}>
                  <span style={{ position: "absolute", top: 2, left: form.isVisible ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                </button>
              </div>
              <div>
                <label style={labelStyle}>Urutan</label>
                <input type="number" style={inputStyle} value={form.order} onChange={(e) => set("order", Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>
      </form>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
