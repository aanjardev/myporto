"use client";
import { useState, useEffect, FormEvent } from "react";
import { Plus, Trash2, Save, Edit2, X, Check } from "lucide-react";
import Toast from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";

type TechItem = { id: number; name: string; icon: string; category: string; experience: string; projects: string; isVisible: boolean; order: number };
type TechForm = Omit<TechItem, "id">;
const EMPTY_TECH: TechForm = { name: "", icon: "", category: "Frontend & UI", experience: "", projects: "", isVisible: true, order: 0 };

type FamiliarItem = { id: number; name: string; order: number };
type FamiliarForm = Omit<FamiliarItem, "id">;
const EMPTY_FAMILIAR: FamiliarForm = { name: "", order: 0 };

const inputStyle = { width: "100%", padding: "9px 11px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" as const };
const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 };

export default function AdminTechStackPage() {
  const [techs, setTechs] = useState<TechItem[]>([]);
  const [familiars, setFamiliars] = useState<FamiliarItem[]>([]);
  const [loading, setLoading] = useState(true);

  // States for Tech Stack
  const [techEditId, setTechEditId] = useState<number | null>(null);
  const [showTechForm, setShowTechForm] = useState(false);
  const [techForm, setTechForm] = useState<TechForm>(EMPTY_TECH);

  // States for Familiar Tech
  const [famEditId, setFamEditId] = useState<number | null>(null);
  const [showFamForm, setShowFamForm] = useState(false);
  const [famForm, setFamForm] = useState<FamiliarForm>(EMPTY_FAMILIAR);

  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<{ id: number; type: "tech" | "familiar" } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const load = async () => {
    setLoading(true);
    const [tRes, fRes] = await Promise.all([fetch("/api/admin/tech-stack"), fetch("/api/admin/familiar-tech")]);
    setTechs(await tRes.json());
    setFamiliars(await fRes.json());
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  // Handlers for Tech Stack
  const setT = (k: keyof TechForm, v: unknown) => setTechForm((p) => ({ ...p, [k]: v }));
  const startEditTech = (item: TechItem) => {
    setTechForm({ name: item.name, icon: item.icon, category: item.category, experience: item.experience, projects: item.projects, isVisible: item.isVisible, order: item.order });
    setTechEditId(item.id); setShowTechForm(true);
  };
  const startNewTech = () => { setTechForm(EMPTY_TECH); setTechEditId(null); setShowTechForm(true); };
  const cancelTech = () => { setShowTechForm(false); setTechEditId(null); };

  const handleTechSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const url = techEditId ? `/api/admin/tech-stack/${techEditId}` : "/api/admin/tech-stack";
    const method = techEditId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(techForm) });
    setSaving(false);
    if (res.ok) { setToast({ msg: "Tech item berhasil disimpan!", type: "success" }); cancelTech(); load(); }
    else setToast({ msg: "Gagal menyimpan tech item", type: "error" });
  };

  // Handlers for Familiar Tech
  const setF = (k: keyof FamiliarForm, v: unknown) => setFamForm((p) => ({ ...p, [k]: v }));
  const startEditFam = (item: FamiliarItem) => {
    setFamForm({ name: item.name, order: item.order });
    setFamEditId(item.id); setShowFamForm(true);
  };
  const startNewFam = () => { setFamForm(EMPTY_FAMILIAR); setFamEditId(null); setShowFamForm(true); };
  const cancelFam = () => { setShowFamForm(false); setFamEditId(null); };

  const handleFamSubmit = async (e: FormEvent) => {
    e.preventDefault(); setSaving(true);
    const url = famEditId ? `/api/admin/familiar-tech/${famEditId}` : "/api/admin/familiar-tech";
    const method = famEditId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(famForm) });
    setSaving(false);
    if (res.ok) { setToast({ msg: "Familiar tech berhasil disimpan!", type: "success" }); cancelFam(); load(); }
    else setToast({ msg: "Gagal menyimpan familiar tech", type: "error" });
  };

  const handleDelete = async () => {
    if (!deleteId) return; setDeleting(true);
    const url = deleteId.type === "tech" ? `/api/admin/tech-stack/${deleteId.id}` : `/api/admin/familiar-tech/${deleteId.id}`;
    const res = await fetch(url, { method: "DELETE" });
    setDeleting(false); setDeleteId(null);
    if (res.ok) { setToast({ msg: "Berhasil dihapus!", type: "success" }); load(); }
    else setToast({ msg: "Gagal menghapus", type: "error" });
  };

  const CATEGORIES = [...new Set(techs.map((x) => x.category).filter(Boolean))];
  if (!CATEGORIES.includes("Frontend & UI")) CATEGORIES.push("Frontend & UI");
  if (!CATEGORIES.includes("Backend & DB")) CATEGORIES.push("Backend & DB");
  if (!CATEGORIES.includes("Tools & Others")) CATEGORIES.push("Tools & Others");

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto" }}>
      {/* ─────────────────────────────────────────────────────────────
          TECH STACK SECTION
      ────────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Tech Stack</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>{techs.length} item utama</p>
        </div>
        <button onClick={startNewTech} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#0c1f3f", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah Tech
        </button>
      </div>

      {showTechForm && (
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #e5e7eb", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>
              {techEditId ? "Edit Tech Item" : "Tambah Tech Item"}
            </h2>
            <button onClick={cancelTech} style={{ border: "none", background: "none", cursor: "pointer", color: "#9ca3af" }}><X style={{ width: 16, height: 16 }} /></button>
          </div>
          <form onSubmit={handleTechSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
              <div><label style={labelStyle}>Nama *</label><input required style={inputStyle} value={techForm.name} onChange={(e) => setT("name", e.target.value)} placeholder="Next.js" /></div>
              <div><label style={labelStyle}>Icon (React Icon class)</label><input required style={inputStyle} value={techForm.icon} onChange={(e) => setT("icon", e.target.value)} placeholder="SiNextdotjs" /></div>
              <div>
                <label style={labelStyle}>Kategori</label>
                <input required style={inputStyle} list="cats" value={techForm.category} onChange={(e) => setT("category", e.target.value)} />
                <datalist id="cats">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
              </div>
              <div><label style={labelStyle}>Experience</label><input required style={inputStyle} value={techForm.experience} onChange={(e) => setT("experience", e.target.value)} placeholder=">1 years" /></div>
              <div><label style={labelStyle}>Projects</label><input required style={inputStyle} value={techForm.projects} onChange={(e) => setT("projects", e.target.value)} placeholder="3+ projects" /></div>
              <div><label style={labelStyle}>Urutan</label><input type="number" style={inputStyle} value={techForm.order} onChange={(e) => setT("order", Number(e.target.value))} /></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Tampilkan</label>
                <button type="button" onClick={() => setT("isVisible", !techForm.isVisible)} style={{ width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", background: techForm.isVisible ? "#0c1f3f" : "#d1d5db", position: "relative" }}>
                  <span style={{ position: "absolute", top: 2, left: techForm.isVisible ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "0.2s" }} />
                </button>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <button type="button" onClick={cancelTech} style={{ padding: "9px 16px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Batal</button>
                <button type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "none", borderRadius: 8, background: "#0c1f3f", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  <Save style={{ width: 14, height: 14 }} /> {saving ? "..." : "Simpan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden", marginBottom: 40 }}>
        {loading ? <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Memuat...</div> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Nama", "Kategori", "Experience", "Projects", "Status", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {techs.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < techs.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0c1f3f", fontSize: 14 }}>{item.name}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 6, background: "#f0f2f5", color: "#374151", fontSize: 12, fontWeight: 600 }}>{item.category}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#6b7280" }}>{item.experience}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#6b7280" }}>{item.projects}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 8px", borderRadius: 6, background: item.isVisible ? "#dcfce7" : "#f3f4f6", color: item.isVisible ? "#166534" : "#6b7280", fontSize: 12, fontWeight: 600 }}>
                      {item.isVisible ? "Aktif" : "Hidden"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => startEditTech(item)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", background: "#f0f2f5", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#374151", fontFamily: "inherit" }}>
                        <Edit2 style={{ width: 12, height: 12 }} /> Edit
                      </button>
                      <button onClick={() => setDeleteId({ id: item.id, type: "tech" })} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", background: "#fee2e2", border: "none", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#dc2626", fontFamily: "inherit" }}>
                        <Trash2 style={{ width: 12, height: 12 }} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {techs.length === 0 && !loading && (
                <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Belum ada data tech stack</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FAMILIAR TECH SECTION
      ────────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Also Familiar With</h2>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>{familiars.length} item terdaftar</p>
        </div>
        <button onClick={startNewFam} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#f0f2f5", color: "#374151", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah Familiar Tech
        </button>
      </div>

      {showFamForm && (
        <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px dashed #d1d5db", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>
              {famEditId ? "Edit Familiar Tech" : "Tambah Familiar Tech"}
            </h2>
            <button onClick={cancelFam} style={{ border: "none", background: "none", cursor: "pointer", color: "#9ca3af" }}><X style={{ width: 16, height: 16 }} /></button>
          </div>
          <form onSubmit={handleFamSubmit} style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Nama Skill / Tool *</label>
              <input required style={inputStyle} value={famForm.name} onChange={(e) => setF("name", e.target.value)} placeholder="RESTful APIs" />
            </div>
            <div style={{ width: 100 }}>
              <label style={labelStyle}>Urutan</label>
              <input type="number" style={inputStyle} value={famForm.order} onChange={(e) => setF("order", Number(e.target.value))} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={cancelFam} style={{ padding: "9px 16px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Batal</button>
              <button type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "none", borderRadius: 8, background: "#0c1f3f", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                <Check style={{ width: 16, height: 16 }} /> Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {loading ? (
          <div style={{ color: "#9ca3af" }}>Memuat...</div>
        ) : familiars.length === 0 ? (
          <div style={{ color: "#9ca3af" }}>Belum ada data familiar tech</div>
        ) : (
          familiars.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px 6px 14px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 30 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{item.name}</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button onClick={() => startEditFam(item)} style={{ padding: 4, background: "none", border: "none", cursor: "pointer", color: "#6b7280", borderRadius: "50%" }}>
                  <Edit2 style={{ width: 12, height: 12 }} />
                </button>
                <button onClick={() => setDeleteId({ id: item.id, type: "familiar" })} style={{ padding: 4, background: "none", border: "none", cursor: "pointer", color: "#ef4444", borderRadius: "50%" }}>
                  <X style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteId && (
        <ConfirmModal
          title={`Hapus ${deleteId.type === "tech" ? "Tech Item" : "Familiar Tech"}?`}
          message="Item ini akan dihapus permanen."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          loading={deleting}
        />
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
