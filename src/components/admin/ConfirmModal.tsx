"use client";
import { Trash2, AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmModal({ title, message, onConfirm, onCancel, loading }: ConfirmModalProps) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.5)", display: "flex",
      alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "#fff", borderRadius: 14, padding: 28, maxWidth: 420, width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AlertTriangle style={{ width: 20, height: 20, color: "#dc2626" }} />
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#111" }}>{title}</h3>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 24 }}>{message}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              padding: "9px 18px", borderRadius: 8, border: "1px solid #d1d5db",
              background: "#fff", color: "#374151", fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >Batal</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              padding: "9px 18px", borderRadius: 8, border: "none",
              background: loading ? "#fca5a5" : "#dc2626", color: "#fff", fontSize: 14, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <Trash2 style={{ width: 14, height: 14 }} />
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
