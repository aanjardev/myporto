"use client";
import { use, useEffect, useState } from "react";
import { CredentialForm } from "../new/page";

export default function EditCredentialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/credentials/${id}`).then((r) => r.json()).then((d) => {
      setData({ ...d, skills: d.skills?.map((s: { name: string }) => s.name) ?? [] });
    });
  }, [id]);

  if (!data) return <div style={{ padding: 40, color: "#6b7280" }}>Memuat...</div>;
  return <CredentialForm initial={data} credId={Number(id)} />;
}
