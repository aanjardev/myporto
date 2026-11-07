"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, GripVertical, Search } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Toast from "@/components/admin/Toast";

type Cred = { id: number; title: string; type: string; issuer: string; date: string; image?: string; order: number };

const TYPE_COLORS: Record<string, { label: string; color: string; bg: string }> = {
  certification: { label: "Sertifikasi", color: "#1e40af", bg: "#dbeafe" },
  award:         { label: "Award", color: "#7c3aed", bg: "#ede9fe" },
  achievement:   { label: "Prestasi", color: "#166534", bg: "#dcfce7" },
  competition:   { label: "Kompetisi", color: "#b45309", bg: "#fef3c7" },
  course:        { label: "Kursus", color: "#0e7490", bg: "#cffafe" },
  license:       { label: "Lisensi", color: "#374151", bg: "#f3f4f6" },
};

function CredRow({ item, i, setDeleteId, total }: { item: Cred; i: number; setDeleteId: (id: number) => void; total: number }) {
  const controls = useDragControls();
  const badge = TYPE_COLORS[item.type] ?? { label: item.type, color: "#374151", bg: "#f3f4f6" };

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      style={{
        display: "grid", gridTemplateColumns: "40px minmax(200px, 1.5fr) 120px 1fr 1fr 180px",
        alignItems: "center", padding: "14px 16px",
        background: "#fff",
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

      {/* Credential */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, overflow: "hidden" }}>
        {item.image ? (
          <img src={item.image} alt={item.title} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid #e5e7eb", flexShrink: 0 }} />
        ) : (
          <div style={{ width: 56, height: 40, borderRadius: 6, background: "#f3f4f6", border: "1px dashed #d1d5db", flexShrink: 0 }} />
        )}
        <div style={{ maxWidth: 220, overflow: "hidden" }}>
          <p style={{ fontWeight: 600, color: "#0c1f3f", margin: 0, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</p>
        </div>
      </div>

      {/* Tipe */}
      <div>
        <span style={{ padding: "3px 10px", borderRadius: 6, background: badge.bg, color: badge.color, fontSize: 12, fontWeight: 600 }}>{badge.label}</span>
      </div>

      {/* Penerbit */}
      <div style={{ fontSize: 13, color: "#6b7280", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", paddingRight: 10 }}>
        {item.issuer}
      </div>

      {/* Tanggal */}
      <div style={{ fontSize: 13, color: "#9ca3af" }}>
        {item.date}
      </div>

      {/* Aksi */}
      <div style={{ display: "flex", gap: 8 }}>
        <Link href={`/admin/credentials/${item.id}`} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#f0f2f5", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#374151" }}>
          <Edit2 style={{ width: 13, height: 13 }} /> Edit
        </Link>
        <button onClick={() => setDeleteId(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#fee2e2", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626", fontFamily: "inherit" }}>
          <Trash2 style={{ width: 13, height: 13 }} /> Hapus
        </button>
      </div>
    </Reorder.Item>
  );
}

export default function AdminCredentialsPage() {
  const [items, setItems] = useState<Cred[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const load = () => { setLoading(true); fetch("/api/admin/credentials").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }); };
  useEffect(load, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/credentials/${deleteId}`, { method: "DELETE" });
    setDeleting(false); setDeleteId(null);
    if (res.ok) { setToast({ msg: "Berhasil dihapus!", type: "success" }); load(); }
    else setToast({ msg: "Gagal menghapus", type: "error" });
  };

  const handleReorder = async (newOrder: Cred[]) => {
    setItems(newOrder); // Optimistic UI update
    
    // Convert to API payload
    const payload = newOrder.map((p, index) => ({ id: p.id, order: index }));
    
    const res = await fetch("/api/admin/credentials/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: payload }),
    });

    if (!res.ok) {
      setToast({ msg: "Gagal menyimpan urutan", type: "error" });
      load(); // Revert
    }
  };

  const filteredItems = items.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || (item.issuer.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType ? item.type === filterType : true;
    return matchSearch && matchType;
  });

  return (
    <div style={{ padding: "32px 36px", flex: 1, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Credentials</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>{items.length} item</p>
        </div>
        <Link href="/admin/credentials/new" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#0c1f3f", color: "#fff", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah
        </Link>
      </div>

      {/* Filter & Search */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 300 }}>
          <Search style={{ position: "absolute", left: 14, top: 11, width: 16, height: 16, color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Cari judul / penerbit..."
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
          <option value="certification">Sertifikasi</option>
          <option value="course">Kursus</option>
          <option value="award">Award</option>
          <option value="achievement">Prestasi</option>
          <option value="competition">Kompetisi</option>
          <option value="license">Lisensi</option>
        </select>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        {/* Header Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "40px minmax(200px, 1.5fr) 120px 1fr 1fr 180px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "12px 16px" }}>
          <div /> {/* Handle */}
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Credential</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Tipe</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Penerbit</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Tanggal</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>Aksi</div>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Memuat...</div>
        ) : filteredItems.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Tidak ada item ditemukan.</div>
        ) : (
          <Reorder.Group axis="y" values={filteredItems} onReorder={handleReorder} style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {filteredItems.map((item, i) => (
              <CredRow key={item.id} item={item} i={i} setDeleteId={setDeleteId} total={filteredItems.length} />
            ))}
          </Reorder.Group>
        )}
      </div>

      {deleteId && <ConfirmModal title="Hapus Credential?" message={`"${items.find((x) => x.id === deleteId)?.title}" akan dihapus permanen.`} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} loading={deleting} />}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
