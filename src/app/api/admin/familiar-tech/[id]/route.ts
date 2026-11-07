import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const item = await jsonStore.familiarTech.update({ where: { id: Number(id) }, data: body });
  return Response.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await jsonStore.familiarTech.delete({ where: { id: Number(id) } });
  return Response.json({ success: true });
}
