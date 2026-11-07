import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await jsonStore.project.findUnique({
    where: { id: Number(id) },
    include: { tech: { orderBy: { order: "asc" } }, screenshots: { orderBy: { order: "asc" } }, features: true, responsibilities: true, highlights: true },
  });
  if (!project) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(project);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { tech, screenshots, features, responsibilities, highlights, ...data } = body;
  const pid = Number(id);

  // Delete & recreate related rows

  const project = await jsonStore.project.update({
    where: { id: pid },
    data: {
      ...data,
      tech: { createMany: { data: (tech ?? []).map((n: string, i: number) => ({ name: n, order: i })) } },
      screenshots: { createMany: { data: (screenshots ?? []).map((s: string, i: number) => ({ src: s, order: i })) } },
      features: { createMany: { data: (features ?? []).map((t: string, i: number) => ({ text: t, order: i })) } },
      responsibilities: { createMany: { data: (responsibilities ?? []).map((t: string, i: number) => ({ text: t, order: i })) } },
      highlights: { createMany: { data: (highlights ?? []).map((t: string, i: number) => ({ text: t, order: i })) } },
    },
  });

  return Response.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await jsonStore.project.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
