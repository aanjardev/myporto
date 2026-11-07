"use client";
import { useState, useRef, ChangeEvent } from "react";
import { UploadCloud, X, File as FileIcon, Loader2 } from "lucide-react";
import Image from "next/image";

type FileUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
};

export default function FileUpload({ value, onChange, label = "Upload File", accept = "image/*" }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengunggah file");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const isImage = value && value.match(/\.(jpeg|jpg|gif|png|webp|svg)/i) != null || accept.includes("image");

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
        {label}
      </label>

      {error && (
        <div style={{ color: "#ef4444", fontSize: 12, marginBottom: 8 }}>{error}</div>
      )}

      {value ? (
        <div style={{ position: "relative", border: "1px solid #d1d5db", borderRadius: 8, padding: 8, display: "flex", alignItems: "center", gap: 12, background: "#f9fafb" }}>
          {isImage ? (
            <div style={{ width: 60, height: 60, position: "relative", borderRadius: 6, overflow: "hidden", background: "#e5e7eb" }}>
              <Image src={value} alt="Preview" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
          ) : (
            <div style={{ width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "#e5e7eb", borderRadius: 6 }}>
              <FileIcon style={{ width: 24, height: 24, color: "#6b7280" }} />
            </div>
          )}
          
          <div style={{ flex: 1, overflow: "hidden" }}>
            <a href={value} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2563eb", textDecoration: "none", wordBreak: "break-all", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {value}
            </a>
          </div>

          <button
            type="button"
            onClick={() => onChange("")}
            style={{ padding: 6, background: "#fee2e2", border: "none", borderRadius: 6, cursor: "pointer", color: "#dc2626", display: "flex", alignItems: "center" }}
            title="Hapus"
          >
            <X style={{ width: 16, height: 16 }} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            border: "2px dashed #d1d5db",
            borderRadius: 8,
            padding: "24px 16px",
            textAlign: "center",
            cursor: uploading ? "not-allowed" : "pointer",
            background: uploading ? "#f3f4f6" : "#fff",
            transition: "all 0.2s",
          }}
        >
          {uploading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#6b7280" }}>
              <Loader2 style={{ width: 24, height: 24, animation: "spin 1s linear infinite", marginBottom: 8 }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>Mengunggah...</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#6b7280" }}>
              <UploadCloud style={{ width: 28, height: 28, marginBottom: 8, color: "#9ca3af" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#4b5563" }}>Klik untuk mengunggah file</span>
              <span style={{ fontSize: 11, marginTop: 4 }}>Batas ukuran disarankan: 2MB</span>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
