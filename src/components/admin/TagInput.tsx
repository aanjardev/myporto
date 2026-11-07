"use client";
import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ label, tags, onChange, placeholder = "Tambah..." }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
    }
    setInput("");
  };

  const removeTag = (idx: number) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
    if (e.key === "Backspace" && !input && tags.length) { onChange(tags.slice(0, -1)); }
  };

  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6, padding: "8px 10px",
        border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", minHeight: 42,
        alignItems: "center",
      }}>
        {tags.map((tag, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "3px 8px", borderRadius: 6, background: "#e8edf5",
            color: "#0c1f3f", fontSize: 12, fontWeight: 600,
          }}>
            {tag}
            <button type="button" onClick={() => removeTag(i)} style={{ border: "none", background: "none", cursor: "pointer", padding: 0, display: "flex", color: "#6b7280" }}>
              <X style={{ width: 12, height: 12 }} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ""}
          style={{ border: "none", outline: "none", fontSize: 13, flex: 1, minWidth: 80, background: "transparent", fontFamily: "inherit" }}
        />
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Tekan Enter atau koma untuk menambahkan</p>
    </div>
  );
}
