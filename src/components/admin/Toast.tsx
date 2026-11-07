"use client";
import { useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 2000,
      background: isSuccess ? "#f0fdf4" : "#fef2f2",
      border: `1px solid ${isSuccess ? "#86efac" : "#fca5a5"}`,
      borderRadius: 12, padding: "14px 18px",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      maxWidth: 360, animation: "slideIn 0.2s ease",
    }}>
      {isSuccess
        ? <CheckCircle style={{ width: 18, height: 18, color: "#16a34a", flexShrink: 0 }} />
        : <XCircle style={{ width: 18, height: 18, color: "#dc2626", flexShrink: 0 }} />}
      <span style={{ fontSize: 14, color: isSuccess ? "#15803d" : "#991b1b", flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, color: "#9ca3af" }}>
        <X style={{ width: 14, height: 14 }} />
      </button>
    </div>
  );
}
