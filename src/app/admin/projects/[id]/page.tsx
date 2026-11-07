"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`).then((r) => r.json()).then((d) => {
      setData({
        ...d,
        tech: d.tech?.map((t: { name: string }) => t.name) ?? [],
        screenshots: d.screenshots?.map((s: { src: string }) => s.src) ?? [],
        features: d.features?.map((f: { text: string }) => f.text) ?? [],
        responsibilities: d.responsibilities?.map((r: { text: string }) => r.text) ?? [],
        highlights: d.highlights?.map((h: { text: string }) => h.text) ?? [],
      });
    });
  }, [id]);

  if (!data) return <div style={{ padding: 40, color: "#6b7280" }}>Memuat data project...</div>;

  return <ProjectForm initial={data} projectId={Number(id)} />;
}
