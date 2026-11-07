"use client";
import { use, useEffect, useState } from "react";
import { ExperienceForm } from "../new/page";

export default function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/experiences/${id}`).then((r) => r.json()).then((d) => {
      setData({ ...d, tech: d.tech?.map((t: { name: string }) => t.name) ?? [] });
    });
  }, [id]);

  if (!data) return <div style={{ padding: 40, color: "#6b7280" }}>Memuat...</div>;
  return <ExperienceForm initial={data} expId={Number(id)} />;
}
