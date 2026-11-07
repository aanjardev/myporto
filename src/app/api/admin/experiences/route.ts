import { jsonStore } from "@/lib/json-store";
import { NextRequest } from "next/server";

export async function GET() {
  const experiences = await jsonStore.workExperience.findMany({
    orderBy: { order: "asc" },
    include: { tech: { orderBy: { order: "asc" } } },
  });
  return Response.json(experiences);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tech, ...data } = body;

  const exp = await jsonStore.workExperience.create({
    data: {
      ...data,
      tech: { createMany: { data: (tech ?? []).map((n: string, i: number) => ({ name: n, order: i })) } },
    },
  });
  return Response.json(exp, { status: 201 });
}
