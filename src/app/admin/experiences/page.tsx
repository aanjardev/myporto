"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Toast from "@/components/admin/Toast";

type Exp = { id: number; title: string; company: string; period: string; isVisible: boolean; description: string };

export default function AdminExperiencesPage() {
  const [items, setItems] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const load = () => { setLoading(true); fetch("/api/admin/experiences").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); }); };
  useEffect(load, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/experiences/${deleteId}`, { method: "DELETE" });
    setDeleting(false); setDeleteId(null);
    if (res.ok) { setToast({ msg: "Berhasil dihapus!", type: "success" }); load(); }
    else setToast({ msg: "Gagal menghapus", type: "error" });
  };

  return (
    <div style={{ padding: "32px 36px", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#0c1f3f", margin: 0 }}>Work Experience</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>{items.length} entri</p>
        </div>
        <Link href="/admin/experiences/new" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#0c1f3f", color: "#fff", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
          <Plus style={{ width: 16, height: 16 }} /> Tambah
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        {loading ? <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Memuat...</div> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Posisi", "Perusahaan", "Deskripsi", "Periode", "Aksi"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: i < items.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, color: "#0c1f3f", fontSize: 14 }}>{item.title}</td>
                  <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: 14 }}>{item.company}</td>
                  <td style={{ padding: "14px 16px", color: "#6b7280", fontSize: 13, maxWidth: 300 }}>
                    <div style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal" }}>
                      {item.description}
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#9ca3af", fontSize: 13 }}>{item.period}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link href={`/admin/experiences/${item.id}`} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#f0f2f5", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#374151" }}>
                        <Edit2 style={{ width: 13, height: 13 }} /> Edit
                      </Link>
                      <button onClick={() => setDeleteId(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "#fee2e2", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#dc2626", fontFamily: "inherit" }}>
                        <Trash2 style={{ width: 13, height: 13 }} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteId && <ConfirmModal title="Hapus Experience?" message={`"${items.find((x) => x.id === deleteId)?.title}" akan dihapus permanen.`} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} loading={deleting} />}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
