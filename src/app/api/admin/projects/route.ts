import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET() {
  const projects = await jsonStore.project.findMany({
    orderBy: { order: "asc" },
    include: { tech: { orderBy: { order: "asc" } }, screenshots: { orderBy: { order: "asc" } }, features: true, responsibilities: true, highlights: true },
  });
  return Response.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tech, screenshots, features, responsibilities, highlights, ...data } = body;

  const project = await jsonStore.project.create({
    data: {
      ...data,
      tech: { createMany: { data: (tech ?? []).map((n: string, i: number) => ({ name: n, order: i })) } },
      screenshots: { createMany: { data: (screenshots ?? []).map((s: string, i: number) => ({ src: s, order: i })) } },
      features: { createMany: { data: (features ?? []).map((t: string, i: number) => ({ text: t, order: i })) } },
      responsibilities: { createMany: { data: (responsibilities ?? []).map((t: string, i: number) => ({ text: t, order: i })) } },
      highlights: { createMany: { data: (highlights ?? []).map((t: string, i: number) => ({ text: t, order: i })) } },
    },
  });

  return Response.json(project, { status: 201 });
}
