import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = await jsonStore.workExperience.findUnique({
    where: { id: Number(id) },
    include: { tech: { orderBy: { order: "asc" } } },
  });
  if (!exp) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(exp);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { tech, ...data } = body;
  const eid = Number(id);

  const exp = await jsonStore.workExperience.update({
    where: { id: eid },
    data: {
      ...data,
      tech: { createMany: { data: (tech ?? []).map((n: string, i: number) => ({ name: n, order: i })) } },
    },
  });
  return Response.json(exp);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await jsonStore.workExperience.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
