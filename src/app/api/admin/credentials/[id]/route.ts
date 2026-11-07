import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cred = await jsonStore.credential.findUnique({
    where: { id: Number(id) },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  if (!cred) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(cred);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { skills, ...data } = body;
  const cid = Number(id);

  const cred = await jsonStore.credential.update({
    where: { id: cid },
    data: {
      ...data,
      skills: { createMany: { data: (skills ?? []).map((n: string, i: number) => ({ name: n, order: i })) } },
    },
  });
  return Response.json(cred);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await jsonStore.credential.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
