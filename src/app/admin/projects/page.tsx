"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, Search } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Toast from "@/components/admin/Toast";

type Project = { id: number; title: string; type: string; slug: string; isVisible: boolean; client?: string; image?: string; order: number };

const TYPE_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  freelance: { label: "Freelance", color: "#0c1f3f", bg: "#e8edf5" },
  side: { label: "Side Project", color: "#1e40af", bg: "#dbeafe" },
  social: { label: "Social Impact", color: "#166534", bg: "#dcfce7" },
};

function ProjectRow({ p, i, toggleVisible, setDeleteId, total }: { p: Project; i: number; toggleVisible: (id: number, c: boolean) => void; setDeleteId: (id: number) => void; total: number }) {
  const controls = useDragControls();
  const badge = TYPE_BADGE[p.type] ?? { label: p.type, color: "#374151", bg: "#f3f4f6" };
  const isHighlight = i < 3;

  return (
    <Reorder.Item
      value={p}
      dragListener={false}
      dragControls={controls}
      style={{
        display: "grid", gridTemplateColumns: "40px minmax(200px, 1.5fr) 1fr 1fr 100px 180px",
        alignItems: "center", padding: "14px 16px",
        background: isHighlight ? "#fdfdfa" : "#fff",
        borderBottom: i < total - 1 ? "1px solid #f3f4f6" : "none",
        position: "relative",
      }}
    >
      {/* Drag Handle */}
      <div
        onPointerDown={(e) => controls.start(e)}
        style={{ cursor: "grab", color: "#9ca3af", display: "flex", alignItems: "center" }}
      >
        <GripVertical style={{ width: 18, height: 18 }} />
      </div>

      {/* Project */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, overflow: "hidden" }}>
        {p.image ? (
          <img src={p.image} alt={p.title} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid #e5e7eb", flexShrink: 0 }} />
        ) : (
          <div style={{ width: 56, height: 40, borderRadius: 6, background: "#f3f4f6", border: "1px dashed #d1d5db", flexShrink: 0 }} />
        )}
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <p style={{ fontWeight: 600, color: "#0c1f3f", margin: 0, fontSize: 14, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{p.title}</p>
            {isHighlight && (
              <span style={{ fontSize: 9, background: "#fef3c7", color: "#b45309", padding: "2px 6px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em", flexShrink: 0 }}>⭐️ HIGHLIGHT</span>
            )}
          </div>
          <p style={{ color: "#9ca3af", margin: 0, fontSize: 12, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>/projects/{p.slug}</p>
        </div>
      </div>

      {/* Tipe */}
      <div>
        <span style={{ padding: "3px 10px", borderRadius: 6, background: badge.bg, color: badge.color, fontSize: 12, fontWeight: 600 }}>{badge.label}</span>
      </div>

      {/* Client */}
      <div style={{ fontSize: 14, color: "#6b7280", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>
        {p.client ?? "-"}
      </div>

      {/* Status */}
      <div>
        <button onClick={() => toggleVisible(p.id, p.isVisible)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: p.isVisible ? "#dcfce7" : "#f3f4f6", color: p.isVisible ? "#166534" : "#6b7280" }}>
          {p.isVisible ? <Eye style={{ width: 13, height: 13 }} /> : <EyeOff style={{ width: 13, height: 13 }} />}
          {p.isVisible ? "Aktif" : "Hidden"}
        </button>
      </div>

      {/* Aksi */}
      <div style={{ display: "flex", gap: 8 }}>
        <Link href={`/admin/projects/${p.id}`} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#f0f2f5", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#374151" }}>
          <Edit2 style={{ width: 13, height: 13 }} /> Edit
        </Link>
        <button onClick={() => setDeleteId(p.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#fee2e2", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626", fontFamily: "inherit" }}>
          <Trash2 style={{ width: 13, height: 13 }} /> Hapus
        </button>
      </div>
    </Reorder.Item>
  );
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/projects").then((r) => r.json()).then((d) => { setProjects(d); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    if (res.ok) { setToast({ msg: "Project berhasil dihapus!", type: "success" }); load(); }
    else setToast({ msg: "Gagal menghapus project", type: "error" });
  };

  const toggleVisible = async (id: number, current: boolean) => {
    await fetch(`/api/admin/projects/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isVisible: !current }) });
    load();
  };

  const handleReorder = async (newOrder: Project[]) => {
    setProjects(newOrder); // Optimistic UI update
    
    // Convert to API payload
    const items = newOrder.map((p, index) => ({ id: p.id, order: index }));
    
    const res = await fetch("/api/admin/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) {
      setToast({ msg: "Gagal menyimpan urutan", type: "error" });
      load(); // Revert
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.client?.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType ? p.type === filterType : true;
    return matchSearch && matchType;
  });

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Projects</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>{projects.length} project terdaftar</p>
        </div>
        <Link href="/admin/projects/new" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#0c1f3f", color: "#fff", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah Project
        </Link>
      </div>

      {/* Filter & Search */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
          <Search style={{ position: "absolute", left: 14, top: 11, width: 16, height: 16, color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Cari project / client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, outline: "none", fontFamily: "inherit" }}
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff", cursor: "pointer" }}
        >
          <option value="">Semua Tipe</option>
          <option value="freelance">Freelance</option>
          <option value="side">Side Project</option>
          <option value="social">Social Impact</option>
        </select>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        {/* Header Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "40px minmax(200px, 1.5fr) 1fr 1fr 100px 180px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "12px 16px" }}>
          <div /> {/* Handle */}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Project</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Tipe</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Client</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Status</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Aksi</div>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Memuat...</div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Tidak ada project ditemukan.</div>
        ) : (
          <Reorder.Group axis="y" values={filteredProjects} onReorder={handleReorder} style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {filteredProjects.map((p, i) => (
              <ProjectRow key={p.id} p={p} i={i} toggleVisible={toggleVisible} setDeleteId={setDeleteId} total={filteredProjects.length} />
            ))}
          </Reorder.Group>
        )}
      </div>

      {deleteId && (
        <ConfirmModal
          title="Hapus Project?"
          message={`Project "${projects.find((p) => p.id === deleteId)?.title}" akan dihapus permanen.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          loading={deleting}
        />
      )}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
