import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET() {
  const items = await jsonStore.techStackItem.findMany({ orderBy: { order: "asc" } });
  return Response.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const item = await jsonStore.techStackItem.create({ data: body });
  return Response.json(item, { status: 201 });
}
